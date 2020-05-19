import updateData from './data';
import updateState from './state';
import updateEnc   from './key';
import updateMsi from './msi.js';
import updateChannels from './initChannels';

const reducer = (state, action) => {
  return {
    encKey : updateEnc(state, action),
    data: updateData(state, action),
    state: updateState(state, action),
    msi : updateMsi( state , action ),
    channelsXPEHb : updateChannels( state , action ),
  };
};

export default reducer;
