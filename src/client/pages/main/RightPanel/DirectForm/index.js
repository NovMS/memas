import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import moment from 'moment';
import { selectActiveChatId } from '../../../../actions/';
import TextField from '@material-ui/core/TextField';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MoodIcon from '@material-ui/icons/Mood';
import {dateToString} from '../../../../utils';
import {grey, orange} from "@material-ui/core/colors";


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
      margin : 0,
      padding : 0,
    backgroundColor: theme.palette.background.paper,
  },
}));


const MyThemeInput = createMuiTheme({
    palette: {
        primary: grey,
        secondary: orange,
    }
})



function DirectForm(props) {
    const { users, active_chat_id, selectActiveChatId } = props;
    const [filter, setFilter] = useState('');
    const classes = useStyles();
    const now = moment();
    const yesterday = moment().subtract(1, "days");
    return (
        <div className="DirectForm" style={{margin:"0",padding:"0"}}>
            <div className={classes.root} >
                <div style={{margin: '0'}}>
                    <p className="VisitText" style={{borderBottom : "0.5vmin solid orange", paddingBottom : "1.2vh",
                        paddingTop : "1.2vh", textAlighn : "center", fontSize : "3vh" ,fontWeight: '600', width : "100%", margin : "0"
                    }} >
                        Беседы
                    </p>
                    <box>
                        <ThemeProvider theme={MyThemeInput}>
                            <TextField label="Найти собеседника" variant="outlined" onChange={e => setFilter(e.target.value)}/>
                        </ThemeProvider>
                    </box>
                </div>
                <List>
                {
                    Object.values(users).filter(v => v.name.toLowerCase().includes(filter.toLowerCase())).map(v => {
                        const updatedAt = moment(v.updated_at);
                        return (
                            <ListItem onClick={e => selectActiveChatId(v.id)} button selected={active_chat_id == v.id} key={v.id}>
                                <ListItemAvatar>
                                  <Avatar>
                                    <MoodIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={v.name} secondary={dateToString(now, yesterday, updatedAt)} />
                            </ListItem>
                        );
                    })
                }
                </List>  
            </div>        
        </div>
    );
}

export default connect(
    store => ({ users : store.data.users, active_chat_id: store.state.active_chat_id}), 
    {selectActiveChatId}
)(DirectForm)