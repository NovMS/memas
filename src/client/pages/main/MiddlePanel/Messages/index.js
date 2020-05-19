import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {addMessage, selectActiveChatId} from '../../../../actions/';
import TextField from '@material-ui/core/TextField';
import {createMuiTheme, makeStyles, ThemeProvider, withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormLabel from '@material-ui/core/FormLabel';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
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
import InboxIcon from '@material-ui/icons/Inbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { green, purple ,red , blue, grey, orange } from '@material-ui/core/colors';
import CropDinRoundedIcon from '@material-ui/icons/CropDinRounded';
import Grid from '@material-ui/core/Grid';
import {addTab, deleteTab, selectTab} from "../../../../actions";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CloseIcon from '@material-ui/icons/Close';


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

        "& $notchedOutline": {   //add this nested selector
            borderColor: "#9e9e9e",
            borderWidth : "0.3vmin"
        },

        "&:hover $notchedOutline": {   //add this nested selector
            borderColor: "orange",
            borderWidth : "0.5vmin"
        },



    },
    LabelSetting : {
      color : orange[500],
    },

    notchedOutline: {},
    Focus : {},
    mlt : {},


}));



function Messages(props) {
    const { message, user, users, channels, active_chat_id, encKey, tabs,activeTab ,addMessage,addTab,deleteTab,selectTab,selectActiveChatId } = props;
    const [text, setText] = React.useState("");
    const [size,setSize] = React.useState("86vh");
    const [flag,setFlag] = React.useState(1);
    const [rowws,setRowws] = React.useState(1);
    const [reload,setReload] = React.useState(false);
    const [tabsCount,setTabsCount] = React.useState(0);


    const [sendList , setSendList] = React.useState([]);
    const [sendListCount , setSendListCount] = React.useState(0);
    const [symbol , setSymbol] = React.useState(["A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]);
    const [usingSymbol,setUsingSymbol] = React.useState([]);


    const active = user;
    const classes = useStyles();
    const now = moment();
    const yesterday = moment().subtract(1, "days");
    const [text_size,setText_size] = React.useState("10px");
    const [reply, setReply] = React.useState(0);



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

    function getAnswerList( message_list , id_answer , depth ,color  ) {
        const list = [];
        if(!message_list){
            return list;
        }
        let widthTmpForm = (25 - depth*1.5)/45;
        const divStyle = {
            color: 'blue',
        };
        message_list.forEach( id => {
            const v = message[id];
            const tmpColor = color=="#F9F9F9"?"#F2F2F2":"#F9F9F9"
            if( active_chat_id === v.channel_id && v.answer_to_id == id_answer  ){
                list.push(
                    <ListItem>
                        <Box textAlign="left" style={{ backgroundColor : v.openReply? tmpColor : color}}  >
                            <Box textAlign="left" >
                                <div container style={{display : "flex"}}  >
                                        {
                                            v.isMark ?

                                                <Icon
                                                    onClick={ e =>{
                                                        if(v.isMark){
                                                            let i = symbol.indexOf(v.Mark);
                                                            let j = usingSymbol.indexOf(i);
                                                            let tmp = usingSymbol;
                                                            tmp.splice(j,1);
                                                            setUsingSymbol(tmp);
                                                            let k = -1
                                                            for ( let com = 0; com < sendList.length; com++){
                                                                if (  sendList[com].id == v.Mark ) { k = com }
                                                            }
                                                            let tmp2 = sendList;
                                                            tmp2.splice(k,1);
                                                            setSendList(tmp2);
                                                            v.Mark = "";
                                                            v.isMark = false;

                                                            setReload(!reload);
                                                            e.stopPropagation();
                                                        }
                                                    }}

                                                    style={{ margin:0, padding:0,width : "1.8vmin",height : "1.8vmin",backgroundColor : "#F2F2F2", border : "1px solid #1E80F0",borderRadius : "20px"}}


                                                >
                                                    <p style={{color : "#1E80F0",textAlign:"center",  fontSize : "1.5vmin", margin : "0", padding : "0"}}> { v.Mark } </p>
                                                </Icon>

                                                :

                                                <Icon

                                                    onClick={e => {
                                                        if (!!!v.isMark) {
                                                            for (let i = 0; i < 26; i++) {
                                                                if (usingSymbol.indexOf(i) == -1) {
                                                                    let newAr = usingSymbol
                                                                    newAr.push(i)
                                                                    setUsingSymbol(newAr);
                                                                    v.Mark = symbol[i];
                                                                    v.isMark = true;
                                                                    let MessageData = {}
                                                                    MessageData.acid = active_chat_id;
                                                                    MessageData.anid = v.id;
                                                                    MessageData.encKey = encKey;
                                                                    let PocketMSD = {}
                                                                    PocketMSD.id = v.Mark;
                                                                    PocketMSD.obj = MessageData;
                                                                    let tmp2 = sendList;
                                                                    tmp2.push(PocketMSD);
                                                                    setSendList(tmp2);
                                                                    break
                                                                }
                                                            }
                                                        } else if (!v.isMark) {
                                                            for (let i = 0; i < 26; i++) {
                                                                if (usingSymbol.indexOf(i) == -1) {
                                                                    let newAr = usingSymbol
                                                                    newAr.push(i)
                                                                    setUsingSymbol(newAr);
                                                                    v.Mark = symbol[i];
                                                                    v.isMark = true
                                                                    let MessageData = {}
                                                                    MessageData.acid = active_chat_id;
                                                                    MessageData.anid = v.id;
                                                                    MessageData.encKey = encKey;
                                                                    let PocketMSD = {}
                                                                    PocketMSD.id = v.Mark;
                                                                    PocketMSD.obj = MessageData;
                                                                    let tmp2 = sendList;
                                                                    tmp2.push(PocketMSD);
                                                                    setSendList(tmp2);
                                                                    break
                                                                    break
                                                                }
                                                            }
                                                        }

                                                        setReload(!reload);
                                                        e.stopPropagation();

                                                    }}

                                                    style={{
                                                        margin: 0,
                                                        padding: 0,
                                                        width: "1.8vmin",
                                                        height: "1.8vmin",
                                                        backgroundColor: "#F2F2F2",
                                                        border: "1px solid #4E4D4B",
                                                        borderRadius : "20px"
                                                    }}/>


                                        }
                                        <p
                                            style={{ paddingLeft:"0.5vw",fontSize : '2vh',fontWeight: '400', overflowWrap : 'break-word', margin : '0px', maxWidth : "38vw" }}
                                        >
                                            {Decrypt(v.text,encKey)}
                                        </p>
                                    </div>
                                <Box display="flex">
                                    <Box mr={3}
                                         onClick={event => {
                                             if(!!!v.openReply) {v.openReply=true} else
                                             if(v.openReply) {v.openReply = false} else
                                             {v.openReply = true;}
                                             setReload(!reload);
                                             event.stopPropagation();
                                         }}

                                    >
                                        <p style={{fontSize : "12px",paddingLeft : "1vw", color : getCountAnswer(message_list , v.id)!=0?"#1E80F0":"grey",display : "inline-block", }} >
                                            { "Reply :: "  + getCountAnswer(message_list , v.id) }
                                        </p>
                                    </Box>
                                    <Box mr={3}>
                                        <p style={{fontSize : "12px",paddingLeft : "1vw", color : "grey",display : "inline-block"}} >
                                            { "Time :: " +  (v.time.h.toString().length===1?"0"+v.time.h:v.time.h) +':'+(v.time.m.toString().length===1?"0"+v.time.m:v.time.m) + ':'+(v.time.s.toString().length===1?"0"+v.time.s:v.time.s) }
                                        </p>
                                    </Box>
                                    <Box textAlign="right">
                                        <p style={{fontSize : "12px", color : "grey",display : "inline-block"}} > { "Date :: " + (v.date.d.toString().length===1?"0"+v.date.d:v.date.d) + '.'+ (v.date.m.toString().length===1?"0"+v.date.m:v.date.m) +'.'+v.date.y }  </p>
                                    </Box>
                                </Box>
                            </Box>
                            <Box textAlign={"left"} ml={depth + 1}>
                                {
                                    v.openReply ?
                                    <List>
                                        {getAnswerList(message_list, v.id, depth + 1, tmpColor)}
                                    </List>  :
                                        <List></List>
                                }
                            </Box>
                        </Box>
                    </ListItem>
                )
            }
        })

        return list;
    }

    function getCountAnswer( message_list , id_Answer ){
        if(!message_list){
            return 0;
        }
        let count = 0;
        message_list.forEach( id => {
            const v = message[id];
            if( active_chat_id === v.channel_id && v.answer_to_id === id_Answer ){
                count ++ ;
            }
        })
        return count;
    }


    function getList( message_list ) {
        const list = [];
        if(!message_list){
            return list;
        }
        let countReply = 0;
        message_list.forEach( id => {
            const v = message[id];
            if( (active_chat_id ? active_chat_id : "0") == v.channel_id && !!!v.answer_to_id  ){
                list.push(
                    <ListItem>
                        <Box textAlign="left" style={{ backgroundColor : v.openReply?"#F2F2F2" : "white"}} >
                            <Box textAlign="left" >
                                <Grid container  >
                                    <Grid>
                                        {
                                            v.isMark ?

                                                <Icon
                                                    onClick={ e =>{
                                                        if(v.isMark){
                                                            let i = symbol.indexOf(v.Mark);
                                                            let j = usingSymbol.indexOf(i);
                                                            let tmp = usingSymbol;
                                                            tmp.splice(j,1);
                                                            setUsingSymbol(tmp);
                                                            let k = -1
                                                            for ( let com = 0; com < sendList.length; com++){
                                                                if (  sendList[com].id == v.Mark ) { k = com }
                                                            }
                                                            let tmp2 = sendList;
                                                            tmp2.splice(k,1);
                                                            setSendList(tmp2);
                                                            v.Mark = "";
                                                            v.isMark = false;

                                                            setReload(!reload);
                                                            e.stopPropagation();
                                                        }
                                                    }}

                                                    style={{ margin:0, padding:0,width : "1.8vmin",height : "1.8vmin",backgroundColor : "#F2F2F2", border : "1px solid #1E80F0", borderRadius : "20px"}}


                                                >
                                                    <p style={{color : "#1E80F0",textAlign:"center",  fontSize : "1.5vmin", margin : "0", padding : "0"}}> { v.Mark } </p>
                                                </Icon>

                                                :

                                                <Icon

                                                    onClick={e => {
                                                        if (!!!v.isMark) {
                                                            for (let i = 0; i < 26; i++) {
                                                                if (usingSymbol.indexOf(i) == -1) {
                                                                    let newAr = usingSymbol
                                                                    newAr.push(i)
                                                                    setUsingSymbol(newAr);
                                                                    v.Mark = symbol[i];
                                                                    v.isMark = true;
                                                                    let MessageData = {}
                                                                        MessageData.acid = active_chat_id;
                                                                        MessageData.anid = v.id;
                                                                        MessageData.encKey = encKey;
                                                                    let PocketMSD = {}
                                                                        PocketMSD.id = v.Mark;
                                                                        PocketMSD.obj = MessageData;
                                                                    let tmp2 = sendList;
                                                                        tmp2.push(PocketMSD);
                                                                        setSendList(tmp2);
                                                                    break
                                                                }
                                                            }
                                                        } else if (!v.isMark) {
                                                            for (let i = 0; i < 26; i++) {
                                                                if (usingSymbol.indexOf(i) == -1) {
                                                                    let newAr = usingSymbol
                                                                    newAr.push(i)
                                                                    setUsingSymbol(newAr);
                                                                    v.Mark = symbol[i];
                                                                    v.isMark = true
                                                                    let MessageData = {}
                                                                    MessageData.acid = active_chat_id;
                                                                    MessageData.anid = v.id;
                                                                    MessageData.encKey = encKey;
                                                                    let PocketMSD = {}
                                                                    PocketMSD.id = v.Mark;
                                                                    PocketMSD.obj = MessageData;
                                                                    let tmp2 = sendList;
                                                                    tmp2.push(PocketMSD);
                                                                    setSendList(tmp2);
                                                                    break
                                                                    break
                                                                }
                                                            }
                                                        }

                                                        setReload(!reload);
                                                        e.stopPropagation();

                                                    }}

                                                    style={{
                                                        margin: 0,
                                                        padding: 0,
                                                        width: "1.8vmin",
                                                        height: "1.8vmin",
                                                        backgroundColor: "#F2F2F2",
                                                        border: "1px solid #4E4D4B",
                                                        borderRadius : "20px"
                                                    }}/>


                                         }
                                    </Grid>
                                    <Grid>
                                        <p
                                            style={{ paddingLeft:"0.5vw",fontSize : '2vh',fontWeight: '400', overflowWrap : 'break-word', margin : '0px', maxWidth : "40vw" }}
                                        >
                                            {Decrypt(v.text,encKey)}
                                        </p>
                                    </Grid>
                                </Grid>

                                <Box display="flex">
                                    <Box mr={3}
                                         onClick={event => {
                                             if(!!!v.openReply) {v.openReply=true} else
                                             if(v.openReply) {v.openReply = false} else
                                             {v.openReply = true;}
                                             setReload(!reload);
                                             event.stopPropagation();
                                         }}>
                                        <p style={{fontSize : "12px",paddingLeft : "1vw", color : getCountAnswer(message_list , v.id)!=0?"#1E80F0":"grey",display : "inline-block", }} >
                                            { "Reply :: " + getCountAnswer(message_list , v.id) }
                                        </p>
                                    </Box>
                                    <Box mr={3}>
                                        <p style={{fontSize : "12px",paddingLeft : "1vw", color : "grey",display : "inline-block"}} >
                                            { "Time :: " +  (v.time.h.toString().length===1?"0"+v.time.h:v.time.h) +':'+(v.time.m.toString().length===1?"0"+v.time.m:v.time.m) + ':'+(v.time.s.toString().length===1?"0"+v.time.s:v.time.s) }
                                        </p>
                                    </Box>
                                    <Box textAlign="right">
                                        <p style={{fontSize : "12px", color : "grey",display : "inline-block"}} > { "Date :: " + (v.date.d.toString().length===1?"0"+v.date.d:v.date.d) + '.'+ (v.date.m.toString().length===1?"0"+v.date.m:v.date.m) +'.'+v.date.y }  </p>
                                    </Box>
                                </Box>
                            </Box>
                            <Box textAlign={"left"} ml={1}>
                                <div>
                                    {
                                        v.openReply ?
                                            <List>
                                                {getAnswerList(message_list, v.id, 1, "#F2F2F2")}
                                            </List>  :
                                            <List></List>
                                    }
                                </div>
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


    const MyThemeInput = createMuiTheme({
        palette: {
            primary: grey,
            secondary: green,
        }
    })

    const MyThemeTab = createMuiTheme({
        palette: {
            primary: grey,
            secondary: blue,
        }
    })

    function getTab( tabsList) {
        const list = [];
        if(!tabsList){
            return list;
        }
        let ct = 0
        tabsList.forEach( el => {
            list.push(
                <Tab label={el.name} onChange={e=> (console.log("HELP ME"))} >
                </Tab>
            )
            list.push(
                <IconButton>
                    <CloseIcon onClick={ e=> {deleteTab(el.id) }}/>
                </IconButton>
            )

        })
        return list
    }



    return (
        <div className="Messages" style={{height: '100vh' , width:"50vw", maxWidth:"50vw",maxHeight : '100vh'}}>
            <Box pl={1} pr={1} pt={0.6}>
                <div style={{background:'white', height : '98.2vh', maxWidth:"50vw", maxHeight:'98.2vh'}}>
                    <AppBar position="static" color="white" style={{borderBottom : "0.5vmin solid orange", height : "6.45vh"}}>
                        <ThemeProvider theme={MyThemeTab}>
                            <Tabs
                                value = { activeTab }
                                onChange={ (e,count)=>{
                                    let ct = 0;
                                    tabs.forEach( el=> {
                                        if ( ct == count){
                                            selectActiveChatId(el.id)

                                        }
                                        ct++;
                                    });

                                    // Update Message //
                                    selectTab(count);
                                    e.stopPropagation();
                                }}
                                indicatorColor="secondary"
                                textColor="secondary"
                                variant="scrollable"
                                scrollButtons="on"
                            >
                                {getTab(tabs)}
                            </Tabs>
                        </ThemeProvider>
                    </AppBar>
                    <div style={{background:'white', height : size,maxHeight:size, maxWidth:"50vw", overflowY:'auto',
                        paddingTop:"1vh", paddingLeft:"1vw", paddingRight:"1vw",display:'flex'}}>
                        <List>
                            {getList(Object.values(message).filter(v => v.channel_id === active_chat_id ? active_chat_id : "0" ).map( v => v.id ))}
                        </List>
                    </div>
                    <div style={{background:'white', height : '1vh',maxHeight:'1vh', maxWidth:"50vw"}}>
                        <ThemeProvider theme={MyThemeInput}>
                            <TextField
                                        placeholder="Введите сообщение"
                                            multiline
                                            value={text}
                                            onCopy={ e => {
                                                    const selection = document.getSelection();
                                                    e.clipboardData.setData('text', selection.toString());
                                                }
                                            }
                                            onPaste={ e=> {
                                                    setRowws(5)
                                                    setSize("77vh")
                                                    setText(text + e.clipboardData.getData('text'))

                                                }
                                            }
                                            onKeyDown={ e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    let tmp_active_chat_id
                                                    if(active_chat_id == ""){
                                                        tmp_active_chat_id = "0";
                                                    } else { tmp_active_chat_id = active_chat_id}
                                                    if( sendList.length == 0 ){
                                                        addMessage(getLength(Object.values(message).filter(v => v.channel_id === tmp_active_chat_id).map(v => v.id)) + 1, e.target.value,"",tmp_active_chat_id,"N");
                                                        let msg = new Message(user.id, null , e.target.value);
                                                        sendMessage( active_chat_id , msg , encKey);
                                                    } else {

                                                        for ( let i = 0 ; i < sendList.length ; i++){
                                                            addMessage(getLength(Object.values(message).filter(v => v.channel_id === tmp_active_chat_id).map(v => v.id)) + 1 , e.target.value,sendList[i].obj.anid,sendList[i].obj.acid, i );
                                                            let msg = new Message(user.id, sendList[i].obj.anid , e.target.value);
                                                            sendMessage( sendList[i].obj.acid , msg , sendList[i].obj.encKey);
                                                        }
                                                    }

                                                    setText("")
                                                    setSize("86vh")
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
                                                                && !e.metaKey && !e.ctrlKey && !e.altKey
                                                )
                                                {
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
                                                    focused : classes.Focus,
                                                    inputMultiline : classes.mlt,
                                                    notchedOutline: classes.notchedOutline,
                                                },
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            size='small'
                                            rows={rowws}
                                            rowsMax={5}
                                            style={{width: "48.8vw", maxWidth : "48.8vw",margin:'0px' }}>
                            </TextField>
                        </ThemeProvider>
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default connect(
    store => ({ message : store.msi, channels : store.data.channels,
        user: store.data.user, users : store.data.users, active_chat_id: store.state.active_chat_id, encKey : store.encKey,
        tabs : store.state.activeTabs , activeTab : store.state.activeTab
    }),
    {addMessage,addTab,deleteTab,selectTab,selectActiveChatId}
)(Messages)
