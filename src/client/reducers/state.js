export default (store, action) => {


    switch (action.type) {
        case 'selectActiveChatId':
            return {
                ...store.state,
                active_chat_id: action.chat_id
            };
        case 'activateUser': {
            let set = new Set(store.state.active_users);
            set.add(action.user_id);
            return {
                ...store.state,
                active_users: set
            };
        }
        case 'deactivateUser': {
            let set = new Set(store.state.active_users);
            set.delete(action.user_id);
            return {
                ...store.state,
                active_users: set
            };
        }
        case 'addTab' : {
            let set = new Set(store.state.activeTabs)
            let elem = { id : action.chatId , name : action.name }
            set.add(elem)
            return  {
                ...store.state,
                activeTabs : set
            }
        };
        case 'deleteTab' : {
          let set = new Set(store.state.activeTabs)
            let curr_id;
            let curr_num;
            let last_id;
            let last_num;
          set.forEach( (el) =>{
              if ( el.id === action.chatId ){
                  let ct = 0
                  set.forEach( (e) => {
                      if ( el.id == e.id ){
                          if ( ct > 0){
                              curr_id = last_id;
                              curr_num = last_num;
                          }
                          else {
                              curr_id = "0";
                              curr_num = 0;
                          }
                      }
                      last_id = el.id;
                      last_num = ct ;
                          ct++
                  })

                  set.delete(el)

              }
          })
          return {
              ...store.state,
              active_chat_id: curr_id,
              activeTabs:   set,
              activeTab: curr_num,
          }
        };
        case 'selectTab' : {
            return {
                ...store.state,
                activeTab : action.num
            }
        }
        case 'setUpTabs' : {
            return {
                ...store.state,
                activeTabs : action.mySet,
                activeTab : action.actTab,
            }
        }

        default:
            {
            //  console.log("not dispatch in state.js")
              return store.state;
            }
    }
};
