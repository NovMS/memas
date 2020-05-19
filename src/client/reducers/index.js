import updateData from './data';
import updateState from './state';
import updateEnc   from './key';
import updateMsi from './msi.js';
import updateChannels from './initChannels';
import updCh from './channels.js'
import updMs from './messages.js'

const reducer = (state, action) => {
  return {
    encKey : updateEnc(state, action),
    data: updateData(state, action),
    state: updateState(state, action),
    msi : updMs( state , action ),
    channelsXPEHb : updCh( state , action ),
  };
};

export default reducer;
