export default (store, action) => {

  switch (action.type) {

    case 'replaceMessages' : {
        let tmp = new Set();

        for ( let i in action.mySet  ) {
          action.mySet[i].date = { "d": 18, "m" : 11, "y" : 1999 };
          action.mySet[i].time = { "h" : 1, "m" : 2, "s":3};
          action.mySet[i].text = action.mySet[i]._text;
        }
        return action.mySet;
    }

    default : {
      //console.log("not dispatch messages.js");
      return store.msi;
    }
  };
};
