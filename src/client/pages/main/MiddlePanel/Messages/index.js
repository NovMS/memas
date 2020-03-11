import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { addMessage } from '../../../../actions/';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import MoodIcon from '@material-ui/icons/Mood';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import {dateToString} from '../../../../utils';
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';
import { sizing } from '@material-ui/system';
import { positions } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
      height:"100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

function Messages(props) {
    const { message, user, users, channels, active_chat_id, addMessage } = props;
    const [open, setOpen] = React.useState(true);
    const [text, setText] = React.useState("There Must Be some Text");
    const [filter, setFilter] = useState('');
    const active = user;
    //if(channels[active_chat_id]){
    //    messages = channels[active_chat_id];
    //}
    //if(users[active_chat_id]){
    //    messages = users[active_chat_id];
    // }
    const classes = useStyles();
    const now = moment();
    const yesterday = moment().subtract(1, "days");



/// HERE!!!!
    function Decrypt( cipher_text) {
        return cipher_text;
    }
                                            //////  <<<<<<--------------------- HERE!!!
    function Encrypt( plain_text) {
        return plain_text;
    }
//// HERE!!!!



    function getList( message_list) {
        const list = [];
        if(!message_list){
            return list;
        }
        message_list.forEach( id => {
            const v = message[id];
            if( active_chat_id === v.channel_id){
                list.push(
                    <ListItem>
                        <Box ml={2} mr={2} mt={0.1}>
                            <p>
                                { Decrypt(v.text) }
                            </p>
                        </Box>
                    </ListItem>
                )
            }
        })

        return list;
    }

    function getLength( message_list) {
        if(!message_list){
            return 0;
        }
        let count = 0 ;
        message_list.forEach( id => {
            count++;
        })
        return count

    }


    return (
        <div className="Messages" style={{height: '1000vh' , width:"100%"}}>
            <Box mt={1} mr={1} mb={1}>
                <div className={classes.root} style={{display: 'table', height: '98vh'}}>
                    <div style={{margin: '1em', display: 'table-row', height: 'min-content'}}>
                        <h1 style={{ textAlign: "center" }} >{
                            active_chat_id ?
                                channels[active_chat_id].name
                            :
                                "Please  Select  Channel"
                        }</h1>
                    </div>
                    <div style={{margin: '1em', display: 'table-row'}}>
                        <List>
                            {getList(Object.values(message).filter(v => v.channel_id=== active_chat_id).map( v => v.id ))}
                        </List>
                    </div>
                    <div style={{margin: '1em', display: 'table-row', height: 'min-content'}}>
                        <TextField
                            label="Введите сообщение"
                            placeholder="Введите сообщение"
                            multiline
                            className={classes.textField}
                            value={text}
                            onChange={e => {setText(Encrypt(e.target.value))}}
                            onKeyPress={ e => {
                                if ( e.key === 'Enter' && e.shiftKey){
                                    addMessage(getLength(Object.values(message).filter(v => v.channel_id=== active_chat_id).map( v => v.id )) + 1,e.target.value);
                                    setText("");
                                }
                            }}
                            margin="normal"
                            variant="outlined"
                            style={{width: "100%"}}
                          />
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default connect(
    store => ({ message : store.data.message,channels : store.data.channels, user: store.data.user, users : store.data.users, active_chat_id: store.state.active_chat_id}),
    {addMessage}
)(Messages)