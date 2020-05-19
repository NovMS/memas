export default (store, action) => {

  switch (action.type) {

    case 'replaceMessages' : {
        return action.mySet;
    }

    default : {
      return store.msi;
    }
  };
};
