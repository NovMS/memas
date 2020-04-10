const { client } = require('./pg');

module.exports = function(app) {

    app.get('/api/test', async (req, res) => {
        console.log(req.query.testParam);
        try {
            const { rows } = await client.query(`
                select 1 as test
            `);
            rows.map((row) => {
                console.log(row.test);
            })
            res.send(rows);
        } catch(err) {
          console.log(err.stack)
          res.send("Error");
        }
    });

    // channels
    app.post('/api/channels', async (req, res) => {
        try {
            let name = req.body.name;
			let parent_id = req.body.parent_id || "DEFAULT";
            const { rows } = await client.query(`
                INSERT INTO channels (id, name, parent_id)
                    VALUES(DEFAULT, '${name}', ${parent_id})
            `);
            // res.send(rows);
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
          console.log(err.stack)
          res.send("Error");
        }
    });

    // messages
    app.post('/api/channels/:channelId/messages', async (req, res) => {
        try {
            let channel_id = req.params.channelId;
            let answer_to_id = req.body.answer_to_id || 'DEFAULT';
            let user_id = req.body.user_id;
            let _message_text = req.body._message_text;

            const { rows } = await client.query(`
                INSERT INTO messages(id, channel_id, answer_to_id, user_id,
                                     date_time, _text)
                    VALUES(DEFAULT, ${channel_id}, ${answer_to_id}, ${user_id},
                           DEFAULT, '${_message_text}')
            `);
            console.log("message posted to channel " + channel_id);
            res.send("\nmessage posted\n");
            // res.send(rows);
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
            const { rows } = await client.query(`
                INSERT INTO users (id, email, name, surname)
                    VALUES(DEFAULT, '${email}', '${name}', '${surname}')
            `);
            console.log("user created");
            res.send("\nuser created\n");
            // res.send(rows);
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
            let preferences = req.body.preferences || "DEFAULT";

            const { rows } = await client.query(`
                INSERT INTO user_in_channel (user_id, channel_id, preferences)
                    VALUES(${user_id}, ${channel_id}, ${preferences})
            `);
            console.log(`user with id=${user_id} added to channel with id=${channel_id}`);
            res.send(`\nuser with id=${user_id} added to channel with id=${channel_id}\n`);
            // res.send(rows);
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
};
