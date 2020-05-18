import updateData from './data';
import updateState from './state';
import updateEnc   from './key';
import updateMsi from './msi.js';

const reducer = (state, action) => {
  return {
    encKey : updateEnc(state, action),
    data: updateData(state, action),
    state: updateState(state, action),
    msi : updateMsi( state , action )
  };
};

export default reducer;
