export default (store, action) => {

  switch (action.type) {

    case 'replaceChannels' : {
        return  action.mySet;
    }

    default : {
      //console.log("not dispatch channels.js");
      return store.channelsXPEHb;
    }
  };
};
