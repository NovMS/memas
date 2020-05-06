export default {

    //  ***   Message Struct Begin
    //  *
    //  *   message_id
    //  *   channel_id
    //  *   answer_to_id
    //  *   user_id
    //  *   date
    //  *   time
    //  *   Avatar url;
    //  *   text
    //  *
    //  ***   Message Struct End

    message:{
        "1.0.0" : {
            id : "1.0.0",
            channel_id : "0",
            user_id    : "11",
            date  : { "d": 18, "m" : 11, "y" : 1999 },
            time  : { "h" : 1, "m" : 2, "s":3} ,
            text       : "My First Note",

        },
        "1.0.1" : {
            id : "1.0.1",
            channel_id : "11_3",
            user_id    : "11",
            date  : { "d": 18, "m" : 11, "y" : 1999 },
            time  : { "h" : 1, "m" : 2, "s":3} ,
            text       : "some text",

        },
        "1.0.2" : {
            id : "1.0.2",
            channel_id : "11_3",
            user_id    : "11",
            date  : { "d": 18, "m" : 11, "y" : 1999 },
            time : { "h" : 1, "m" : 2, "s":3} ,
            text       : "double some text"
        },
        "1.0.3" : {
            id : "1.0.3",
            answer_to_id : "1.0.1",
            channel_id : "11_3",
            user_id    : "11",
            date  : { "d": 18, "m" : 11, "y" : 1999 },
            time : { "h" : 1, "m" : 2, "s":3} ,
            text       : "some reply text"
        },
        "1.0.4" : {
            id : "1.0.4",
            answer_to_id : "1.0.1",
            channel_id : "11_3",
            user_id    : "11",
            date  : { "d": 18, "m" : 11, "y" : 1999 },
            time : { "h" : 1, "m" : 2, "s":3} ,
            text       : "double some reply text"
        },
        "1.0.5" : {
            id : "1.0.5",
            answer_to_id : "1.0.4",
            channel_id : "11_3",
            user_id    : "11",
            date  : { "d": 18, "m" : 11, "y" : 1999 },
            time : { "h" : 1, "m" : 2, "s":3} ,
            text       : "LongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongText"
        },
        "1.0.6" : {
            id : "1.0.6",
            answer_to_id : "1.0.5",
            channel_id : "11_3",
            user_id    : "11",
            date  : { "d": 18, "m" : 11, "y" : 1999 },
            time : { "h" : 1, "m" : 2, "s":3} ,
            text       : "LongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongText"
        },
        "1.0.7" : {
            id : "1.0.7",
            answer_to_id : "",
            channel_id : "21_5",
            user_id    : "11",
            date  : { "d": 18, "m" : 11, "y" : 1999 },
            time : { "h" : 1, "m" : 2, "s":3} ,
            text       : "RandomMessageForTest"
        }
    },

    user: {
        id: '11',
        name: 'Main User',
        channels_number: 10,
        messages_number: 100
    },    
    channels: {
        /* id канала = id пользователя + порядковый номер канала, созданный этим пользователем*/
        // Struct Channel
        //   
        //  id 
        //  name - our name, nothink more
        //  isImportant
        //  isMembers
        //  isTimeUpdate
        //  is_showed - use when we want show child, now it impprtant without this not, work
        //  parent_id - use when we want know who parent
        //
        //  Start Channel
        //
        //  Important :::  NEW CHANNEL MUST ADD UNDER OLD CHANNEL
        //  Important :::  CHILD MUST BE UNDER HIS FATHER ( we can ignore this rule, but it overload our interface)
        //  Hint      :::  Rule always work if we add channel using only interface
        //
        "0": { //Always Must Be i think we need add this on data form point
            id: "0",
            name: "Заметки",
            // для новых непрочитанных сообщений отправляем уведомление на почту
            isImportant: true,
            members: [],
            "updated_at": "2019-12-01T12:00:00",
            channel_ids: []
        },
        "11_3": {
            id: "11_3",
            name: "Top Channel",
            // для новых непрочитанных сообщений отправляем уведомление на почту
            isImportant: true,
            members: ["11", "21", "34"],
            "updated_at": "2019-12-01T12:00:00",
            channel_ids: ["21_6", "34_2"]
        },
        "21_6": {
            id: "21_6",
            name: "Подканал 1",
            members: ["21", "55"],
            "updated_at": "2019-12-03T12:00:00",
            parent_id: "11_3"
        },
        "21_9": {
            id: "21_9",
            name: "SOmeNAme",
            members: ["21", "55"],
            "updated_at": "2019-12-03T12:00:00",
            parent_id: "21_6"
        },
        "34_2": {
            id: "34_2",
            name: "Подканал 2",
            isImportant: true,
            members: ["34"],
            "updated_at": "2019-12-02T12:00:00",
            parent_id: "11_3"
        },
        "77_7": {
            id: "77_7",
            name: "Under2",
            isImportant: true,
            members: ["34"],
            "updated_at": "2019-12-02T12:00:00",
            parent_id: "21_4"
        },
        "21_5": {
            id: "21_5",
            name: "Random",
            members: ["11", "21"],
            "updated_at": "2019-12-01T12:00:00"
        },
        "77_8": {
            id: "77_8",
            name: "Under1",
            isImportant: true,
            members: ["34"],
            "updated_at": "2019-12-02T12:00:00",
            parent_id: "21_4"
        },
        "21_4": {
            id: "21_4",
            name: "New",
            members: ["11", "21"],
            "updated_at": "2019-12-01T12:00:00"
        },
        "21_2": {
            id: "21_2",
            name: "Lost",
            members: ["11", "21"],
            "updated_at": "2019-12-01T12:00:00"
        }
    },
    //End Channel
    "profile": {
        id: "11",
        name: "Вася Пупкин",
        messages: [
            {
                id: "11_5350",
                text: "Послание себе",
                created_at: "2019-12-01T11:02:00"
            }
        ],
        email: "vasa@pupkin.ru",
        delayNoticeInMinutes: 10
    },
    "users": {
        "21": {
            id: "21",
            name: "Гена",
            "updated_at": "2019-12-01T14:00:00",
            messages: []
        },
        "34": {
            id: "34",
            name: "Дениска",
            "updated_at": "2019-12-01T13:00:00",
            messages: []
        },
        "55": {
            id: "55",
            name: "Володя",
            "updated_at": "2019-12-01T12:00:00",
            messages: []
        }    
    },
    "updated_at": "2019-12-01T12:00:00"
}
