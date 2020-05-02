import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { addMessage } from '../../../../actions/';
import TextField from '@material-ui/core/TextField';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormLabel from '@material-ui/core/FormLabel';
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
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';
import { sizing } from '@material-ui/system';
import { positions } from '@material-ui/system';
import { typography } from '@material-ui/system';
import { green, purple ,red , blue, grey, orange } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
      height:"100%",
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },



  nested: {
    paddingLeft: theme.spacing(4),
  },
    SomeBody:{
        backgroundColor: red,
        color : green,
    },
    TextSize:{
        fontSize: '2vh',


    },
    LabelSetting : {
      color : orange[500],
        '& fieldset' : {
          color : green[500],
        }
    }

}));



function Messages(props) {
    const { message, user, users, channels, active_chat_id, encKey ,addMessage } = props;
    const [open, setOpen] = React.useState(true);
    //const [sizeState, setSizeState] = React.useState(true);
    const [text, setText] = React.useState("");
    const [size,setSize] = React.useState("86.15vh");
    const [flag,setFlag] = React.useState(1);
    const [rowws,setRowws] = React.useState(1);
    const [filter, setFilter] = useState('');
    const active = user;
    const classes = useStyles();
    const now = moment();
    const yesterday = moment().subtract(1, "days");
    const [text_size,setText_size] = React.useState("10px");


/// HERE!!!!
    function Decrypt( cipher_text , key ) {
        return cipher_text;
    }

    async function sendMessage( channel_id , message , key ) {
        channel_id = 1;
        message._text = message.text;
        console.log(message);
        let response = await fetch(`/api/channels/${channel_id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(message)
        });
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
                        <Box textAlign="left" >
                            <Box textAlign="left" >
                                <p
                                    style={{ fontSize : '2vh',fontWeight: '400', overflowWrap : 'break-word', margin : '0px' }}
                                >
                                    {Decrypt(v.text,encKey)}
                                </p>
                                <Box display="flex">
                                    <Box mr={3}>
                                        <p style={{fontSize : "12px", color : "grey",display : "inline-block"}} > { v.time.h+':'+v.time.m+':'+v.time.s }  </p>
                                    </Box>
                                    <Box textAlign="right">
                                        <p style={{fontSize : "12px", color : "grey",display : "inline-block"}} > { v.date.d+'.'+v.date.m+'.'+v.date.y }  </p>
                                    </Box>
                                </Box>
                            </Box>
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

    function Message(uid , aid , text) {
        this.user_id = uid;
        this.answer_to_id = aid;
        this.text = text;
    }


    return (
        <div className="Messages" style={{height: '100vh' , width:"50vw", maxWidth:"50vw",maxHeight : '100vh'}}>
            <Box pl={1} pr={1} pt={0.6}>
                <div style={{background:'white', height : '98.2vh', maxWidth:"50vw", maxHeight:'98.2vh'}}>
                    <div style={{background:'#F5F5F5', height : '1vh', maxWidth:"50vw",paddingTop:'1vh',paddingBottom : '4vh',
                            fontSize:'3vh',fontWeight: '600'}}>
                        <p style={{textAlign : 'center',margin:'0px',}}>{
                            active_chat_id ?
                                channels[active_chat_id].name
                            :
                                "Please  Select  Channel" }
                        </p>
                    </div>
                    <div style={{background:'white', height : size,maxHeight:size, maxWidth:"50vw", overflowY:'auto',
                        paddingTop:"1vh", paddingLeft:"1vw", paddingRight:"1vw",display:'flex'}}>
                        <List>
                            {getList(Object.values(message).filter(v => v.channel_id=== active_chat_id).map( v => v.id ))}
                        </List>
                    </div>
                    <div style={{background:'white', height : '1vh',maxHeight:'1vh', maxWidth:"50vw"}}>
                        <TextField
                                    label = 'Some Text'
                                    placeholder="Введите сообщение"
                                        multiline
                                        value={text}
                                        onKeyDown={ e => {
                                            if (e.key === 'Enter' && e.shiftKey) {
                                                addMessage(getLength(Object.values(message).filter(v => v.channel_id === active_chat_id).map(v => v.id)) + 1, e.target.value);
                                                let msg = new Message(user.id, null , e.target.value);
                                                sendMessage( active_chat_id , msg , encKey);
                                                setText("")
                                                setSize("86.15vh")
                                                setRowws(1)
                                                setFlag(2)
                                            } else if (e.key === 'Enter') {
                                                setText(text + '\n');
                                                setRowws(5)
                                                setSize("77vh")
                                            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                                                setText(text.substring(0,text.length-1));
                                                setRowws(5)
                                                setSize("77vh")
                                            } else if (e.key != 'Shift' && e.key != 'Meta' && e.key != 'Control' && e.key !== 'Alt' && e.key != 'CapsLock' &&
                                                        e.key != 'ArrowLeft' && e.key != 'ArrowDown' && e.key != 'ArrowRight' && e.key != 'ArrowUp'
                                            ) {
                                                setText(text+e.key);
                                                setRowws(5)
                                                setSize("77vh")
                                            }
                                        }}
                                    classes={{ root : classes.test}}
                                        InputLabelProps={{
                                            classes: {
                                                focused : classes.LabelSetting,
                                            },
                                        }}
                                        InputProps={{
                                            classes: {
                                                root: classes.TextSize,
                                            },
                                        }}
                                        margin="normal"
                                        variant="outlined"
                                        size='small'
                                        rows={rowws}
                                        rowsMax={5}
                                        style={{width: "48.8vw", maxWidth : "48.8vw",margin:'0px' }}>
                        </TextField>
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default connect(
    store => ({ message : store.data.message,channels : store.data.channels,
        user: store.data.user, users : store.data.users, active_chat_id: store.state.active_chat_id, encKey : store.encKey,
    }),
    {addMessage}
)(Messages)
