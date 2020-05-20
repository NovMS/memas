export default (store, action) => {

  switch (action.type) {

    case 'setEncKey' : {
        store.keyLace.encKey = action.encKey;
        return store.keyLace
    }


    default : {
      return store.keyLace;
    }

  };
};
