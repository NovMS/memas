export default (store, action) => {

    switch (action.type) {
    case 'showChannel':
        if ( action.option_type === 1){ store.data.channels[action.channel_id].is_showedALL=true; }
        if ( action.option_type === 2){ store.data.channels[action.channel_id].is_showedA=true; }
        if ( action.option_type === 3){ store.data.channels[action.channel_id].is_showedB=true; }
        if ( action.option_type === 4){ store.data.channels[action.channel_id].is_showedC=true; }
      return {...store.data,
            channels:{
                ...store.data.channels,
            }
      };
        case 'addMessage':
            const new_id = store.data.user.id + "." + action.id + "." + action.id_meta;
            //console.log(action.id);
            let today = new Date();
            const new_storeData = {
                ...store.data,
                message:{
                    ...store.data.message,
                    [new_id]:{
                        id: new_id,
                        channel_id : action.chid,
                        user_id    : store.data.user.id,
                        answer_to_id : action.anid,
                        date : { "d": today.getDate(), "m" : (today.getMonth() + 1), "y" : today.getFullYear() },
                        time : { "h" : today.getHours(), "m" : today.getMinutes(), "s":today.getSeconds()} ,
                        text       : action.text,
                    }
                }
            }
        return new_storeData;

    case 'hideChannel':
        if ( action.option_type === 1){ store.data.channels[action.channel_id].is_showedALL=false; }
        if ( action.option_type === 2){ store.data.channels[action.channel_id].is_showedA=false; }
        if ( action.option_type === 3){ store.data.channels[action.channel_id].is_showedB=false; }
        if ( action.option_type === 4){ store.data.channels[action.channel_id].is_showedC=false; }
      return {
        ...store.data,
        channels:{
            ... store.data.channels,
        }
      };
    case 'addChannel':
        const id = store.data.user.id + "_" + store.data.user.channels_number;
        const storeData = {
            ...store.data,
            channels:{
                ... store.data.channels,
                [id]: {
                    id: id,
                    name: action.name,
                    parent_id: action.parent_id,
                    messages: [],
                    updated_at: action.created_at,
                },
            },
            user:{
                ... store.data.user,
                channels_number: store.data.user.channels_number + 1
            }
        }
        const parent = store.data.channels[action.parent_id];
        if(parent){
            storeData.channels[action.parent_id] = {
                ... parent,
                channel_ids: !parent.channel_ids ? [id] : [id, ... parent.channel_ids]
            }
        }
        return storeData;
    default:{
      console.log("not dispatch in data.js")
      return store.data;
    }
  }
};
