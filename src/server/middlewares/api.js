const { client } = require('./pg');

module.exports = function(app) {

    // app.get('/api/test', async (req, res) => {
    //     console.log(req.query.testParam);
    //     try {
    //         const { rows } = await client.query(`
    //             select 1 as test
    //         `);
    //         rows.map((row) => {
    //             console.log(row.test);
    //         })
    //         res.send(rows);
    //     } catch(err) {
    //       console.log(err.stack)
    //       res.send("Error");
    //     }
    // });

    // channels
    app.post('/api/channels', async (req, res) => {
        try {
            let name = req.body.name;
            let parent_id = req.body.parent_id || "DEFAULT";
            await client.query(`
                INSERT INTO channels (id, name, parent_id)
                    VALUES(DEFAULT, '${name}', ${parent_id})
            `);
            console.log("\ncreated channel " + name);
            res.send("\nchannel created\n");
        } catch(err) {
            console.log(err.stack);
            res.send("Error");
        }
    });

    app.get('/api/channels/', async (req, res) => {
        try {
            const { rows } = await client.query(`
                SELECT * FROM channels
            `);
            res.send(rows);
        } catch(err) {
          console.log(err.stack)
          res.send("Error");
        }
    });


    app.get('/api/channels/:channelId', async (req, res) => {
        try {
            let channel_id = req.params.channelId;
            const { rows } = await client.query(`
                SELECT * FROM channels WHERE id=${channel_id}
            `);
            res.send(rows[0]);
        } catch(err) {
          console.log(err.stack);
          res.send("Error");
        }
    });

    // messages
    app.post('/api/channels/:channelId/messages', async (req, res) => {
        try {
            let channel_id = req.params.channelId;
            let answer_to_id = req.body.answer_to_id || "DEFAULT";
            let user_id = req.body.user_id;
            let _text = req.body._text;

            await client.query(`
                INSERT INTO messages(id, channel_id, answer_to_id, user_id,
                                     date_time, _text)
                    VALUES(DEFAULT, ${channel_id}, ${answer_to_id}, ${user_id},
                           DEFAULT, '${_text}')
            `);
            console.log("message posted to channel " + channel_id);
            res.send("\nmessage posted\n");
        } catch(err) {
          console.log(err.stack)
          res.send("Error");
        }
    });

    app.get('/api/channels/:channelId/messages', async (req, res) => {
        try {
            const { rows } = await client.query(`
                SELECT * FROM messages WHERE channel_id=${req.params.channelId}
            `);
            res.send(rows);
        } catch(err) {
          console.log(err.stack);
          res.send("Error");
        }
    });

    // users
    app.post('/api/users', async (req, res) => {
        try {
            let email=req.body.email;
            let name=req.body.name;
            let surname=req.body.surname;
            let avatar_url=req.body.avatar_url;

            await client.query(`
                INSERT INTO users (id, email, name, surname, avatar_url)
                    VALUES(DEFAULT, '${email}', '${name}', '${surname}', '${avatar_url}')
            `);
            console.log("user created");
            res.send("\nuser created\n");
        } catch(err) {
          console.log(err.stack)
          res.send("Error");
        }
    });

    app.get('/api/users', async (req, res) => {
        try {
            const { rows } = await client.query(`
                SELECT * FROM users
            `);
            res.send(rows);
        } catch(err) {
          console.log(err.stack);
          res.send("Error");
        }
    });

    app.get('/api/users/:userId', async (req, res) => {
        try {
            let id = req.params.userId;
            const { rows } = await client.query(`
                SELECT * FROM users WHERE id=${id}
            `);
            console.log(`requested user with id = ${id}`)
            res.send(rows[0]);
        } catch(err) {
          console.log(err.stack);
          res.send("Error");
        }
    });

    // user_in_channel
    app.post('/api/channels/:channelId/users/:userId', async (req, res) => {
        try {
            let channel_id = req.params.channelId;
            let user_id = req.params.userId;
            let preferences = (req.body.preferences)? "'"+req.body.preferences+"'": "DEFAULT";

            await client.query(`
                INSERT INTO user_in_channel (user_id, channel_id, preferences)
                    VALUES(${user_id}, ${channel_id}, ${preferences})
            `);
            console.log(`user with id=${user_id} added to channel with id=${channel_id}`);
            res.send(`\nuser with id=${user_id} added to channel with id=${channel_id}\n`);
        } catch(err) {
          console.log(err.stack)
          res.send("Error");
        }
    });

    app.get('/api/channels/:channelId/users/', async (req, res) => {
        try {
            let channel_id = req.params.channelId;
            const { rows } = await client.query(`
                SELECT u.* FROM user_in_channel uic INNER JOIN users u
                              ON (uic.user_id = u.id) WHERE channel_id=${channel_id}
            `);
            console.log(`requested users for channel with id = ${channel_id}`)
            res.send(rows);
        } catch(err) {
          console.log(err.stack);
          res.send("Error");
        }
    });

    app.get('/api/users/:userId/channels/', async (req, res) => {
        try {
            let user_id = req.params.userId;
            const { rows } = await client.query(`
                SELECT c.* FROM user_in_channel uic INNER JOIN channels c
                              ON (uic.channel_id = c.id) WHERE user_id=${user_id}
            `);
            console.log(`requested channels for user with id = ${user_id}`)
            res.send(rows);
        } catch(err) {
          console.log(err.stack);
          res.send("Error");
        }
    });

    // badapi

    app.get('/badapi/users/:userId/channels/', async (req, res) => {
        try {
            let user_id = req.params.userId;
            let { rows: channels }  = await client.query(`
                SELECT c.*, uic.preferences
                    FROM user_in_channel uic INNER JOIN channels c
                        ON (uic.channel_id = c.id) WHERE user_id=${user_id}
            `);

            let ret = {};
            for (let i = 0; i < channels.length; i++)
            {
                let x = channels[i];
                let { rows: members } = await client.query(`
                    SELECT users.* FROM user_in_channel uic INNER JOIN users
                        ON (uic.user_id = users.id) WHERE channel_id=${x.id}
                `);
                x.members = members;
                let { rows: subchannel_ids } = await client.query(`
                    SELECT id FROM channels
                        WHERE parent_id=${x.id}
                `);
                x.subchannel_ids = [];
                subchannel_ids.forEach(s => x.subchannel_ids.push(s.id));

                ret[`${x.id}`] = x;
            };
            console.log(`requested badapi for channels`);

            res.send(ret);
        } catch(err) {
          console.log(err.stack);
          res.send("Error");
        }
    });

    app.get('/badapi/channels/:channelId/messages', async (req, res) => {
        try {
            const { rows: messages } = await client.query(`
                SELECT * FROM messages WHERE channel_id=${req.params.channelId}
            `);

            let ret = {};
            messages.forEach(x => ret[`${x.id}`] = x);

            res.send(ret);
        } catch(err) {
          console.log(err.stack);
          res.send("Error");
        }
    });

};
