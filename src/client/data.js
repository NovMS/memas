export default {

    //  ***   Message Struct Begin
    //  *
    //  *   message_id
    //  *   channel_id
    //  *   answer_to_id
    //  *   user_id
    //  *   date_time
    //  *   text
    //  *
    //  ***   Message Struct End


    message:{
        "1.0.1" : {
            id : "1.0.1",
            channel_id : "11_3",
            user_id    : "11",
            date_time  : "1999-11-18T00:00:00",
            text       : "NikiTa Lox"
        },
        "1.0.2" : {
            id : "1.0.2",
            answer_to_id : "1.0.1",
            channel_id : "11_3",
            user_id    : "11",
            date_time  : "1999-11-18T00:00:00",
            text       : "NikiTa Double Lox"
        },

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
