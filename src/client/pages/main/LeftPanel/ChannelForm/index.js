import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import './index.scss';
import moment from 'moment';
import {selectActiveChatId, showChannel, hideChannel, addChannel} from '../../../../actions/';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
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
import Button from '@material-ui/core/Button';
import {dateToString} from '../../../../utils';
import Box from '@material-ui/core/Box';
import {spacing} from '@material-ui/system';
import {sizing} from '@material-ui/system';
import {positions} from '@material-ui/system';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {
    green,
    purple,
    red,
    blue,
    grey,
    orange
} from '@material-ui/core/colors';
import {Input} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import GradeIcon from '@material-ui/icons/Grade';
import {style} from "redux-logger/src/diff";
import {addTab, replaceMessages, replaceChannels, selectTab, setUpTabs} from "../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        maxWidth: 360,
        overflowY: 'auto',
        overflowX: 'auto',
        backgroundColor: theme.palette.background.paper
    },
    root2: {
        width: '100%',
        height: '368%',
        maxWidth: 360,
        overflowX: 'auto',
        overflowY: 'auto',
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
    MyButton: {
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
        color: 'white',
        height: 24,
        padding: '0 1px',
        margin: 1
    },
    MyButtonAll: {
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
        color: 'white',
        height: 24,
        width: 75,
        padding: '0 1px',
        margin: 4
    },
    InputLabel: {
        color: grey[900],
        '& .Mui-focused': {
            color: orange[500]
        }
    },
    InputIcon: {
        color: orange[500]
    },
    InputIcon2: {
        color: grey[500]
    },
    ListIcon: {
        color: grey[900],
        background: grey[100]
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        fontSize: theme.spacing(1.5),
        background: orange[500]
    },
    small2: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        fontSize: theme.spacing(1.5),
        background: grey[500]
    },
    small3: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        fontSize: theme.spacing(1.5),
        background: blue[500]
    }
}));

const MyTheme = createMuiTheme({
    palette: {
        primary: grey,
        secondary: {
            main: orange[500]
        },
        error: green,
        myColor: orange
    }
});

const MyThemeInput = createMuiTheme({
    palette: {
        primary: grey,
        secondary: orange
    }
})

const MyThemeB = createMuiTheme({
    palette: {
        primary: grey,
        secondary: {
            main: orange[500]
        }
    }
})

function ChannelForm(props) {
    const {
        channels,
        tmpChannels, /////
        active_chat_id,
        tabs,
        activeTab,
        selectActiveChatId,
        showChannel,
        hideChannel,
        addChannel,
        addTab,
        selectTab,
        setUpTabs,
        replaceMessages,
        replaceChannels
    } = props;

    const [open, setOpen] = React.useState(true);

    const [pickB1, setPickB1] = React.useState("secondary");
    const [pickB2, setPickB2] = React.useState("primary");
    const [pickB3, setPickB3] = React.useState("primary");
    const [pickB4, setPickB4] = React.useState("primary");
    const [openNum, setOpenNum] = React.useState(1);
    // Need For Many Channel List panel
    const [AllFilter, SetAllFilter] = React.useState('');
    const [AFilter, SetAFilter] = React.useState('');
    const [BFilter, SetBFilter] = React.useState('');
    const [CFilter, SetCFilter] = React.useState("");
    // some intresting but not useful text, best for me
    const [ActiveAll, SetActiveAll] = React.useState(new Set());
    const [ActiveAllNum, setActiveAllNum] = React.useState(0);
    const [ActiveA, SetActiveA] = React.useState(new Set());
    const [ActiveANum, setActiveANum] = React.useState(0);
    const [ActiveB, SetActiveB] = React.useState(new Set());
    const [ActiveBNum, setActiveBNum] = React.useState(0);
    const [ActiveC, SetActiveC] = React.useState(new Set());
    const [ActiveCNum, setActiveCNum] = React.useState(0);
    // SOme nothing
    const [LColor, SetLColor] = React.useState('grey');
    const [filter, setFilter] = useState('');
    const [channelNames, setChannelNames] = useState({});
    const classes = useStyles();
    const now = moment();
    const yesterday = moment().subtract(1, "days");
    const [reload, setReload] = React.useState(true);
    const [clack, setClack] = React.useState(false);

    const FatherChannelIds = new Set();
    const OpenAllChannelIds = new Set();
    const filteredAChannelIds = new Set();
    const filteredBChannelIds = new Set();
    const filteredCChannelIds = new Set();
    const filteredAllChannelIds = new Set();
    const filteredAllChannelIdsNotOpen = new Set();
    const tmpSetA = new Set();
    const tmpSetB = new Set();
    const tmpSetC = new Set();

    Object.entries(channels).forEach(([k, v]) => {
        if (v.parent_id) {
            FatherChannelIds.add(v.parent_id);
        }
    });
    Object.entries(channels).filter(([k, v]) => v.name.toLowerCase().includes(filter.toLowerCase())).forEach(([k, v]) => {
        filteredAllChannelIdsNotOpen.add(k)
        while (v.parent_id) {
            OpenAllChannelIds.add(v.parent_id);
            filteredAllChannelIds.add(v.parent_id);
            v = channels[v.parent_id];
        }
        Object.entries(channels).forEach(([l, u]) => {
            if (filteredAllChannelIdsNotOpen.has(u.parent_id)) {
                filteredAllChannelIdsNotOpen.add(l);
            }
        })
    });

    Object.entries(channels).filter(([k, v]) => v.name.toLowerCase().includes(AFilter.toLowerCase())).forEach(([k, v]) => {
        filteredAChannelIds.add(k);
        Object.entries(channels).forEach(([l, u]) => {
            if (filteredAChannelIds.has(u.parent_id)) {
                filteredAChannelIds.add(l);
            }
        })
    });

    Object.entries(channels).filter(([k, v]) => v.name.toLowerCase().includes(BFilter.toLowerCase())).forEach(([k, v]) => {
        filteredBChannelIds.add(k);
        Object.entries(channels).forEach(([l, u]) => {
            if (filteredBChannelIds.has(u.parent_id)) {
                filteredBChannelIds.add(l);
            }
        })
    });
    Object.entries(channels).filter(([k, v]) => v.name.toLowerCase().includes(CFilter.toLowerCase())).forEach(([k, v]) => {
        filteredCChannelIds.add(k);
        Object.entries(channels).forEach(([l, u]) => {
            if (filteredCChannelIds.has(u.parent_id)) {
                filteredCChannelIds.add(l);
            }
        })
    });

    function getMyList(channel_ids) {

        const list = [];

        if (!channel_ids) {
            return list;
        }

        // return if we don't have child

        channel_ids.forEach(id => {

            if ((openNum === 1) && !filteredAllChannelIds.has(id) && !filteredAllChannelIdsNotOpen.has(id)) {
                list.push(<Box>
                    {getMyList(Object.values(channels).filter(v => v.parent_id === id).map(v => v.id))}
                </Box>)
                return list;
            }

            if ((openNum === 2) && !filteredAChannelIds.has(id)) {
                list.push(<Box>
                    {getMyList(Object.values(channels).filter(v => v.parent_id === id).map(v => v.id))}
                </Box>)
                return list;
            }

            if ((openNum === 3) && !filteredBChannelIds.has(id)) {
                list.push(<Box>
                    {getMyList(Object.values(channels).filter(v => v.parent_id === id).map(v => v.id))}
                </Box>)
                return list;
            }
            if ((openNum === 4) && !filteredCChannelIds.has(id)) {
                list.push(<Box>
                    {getMyList(Object.values(channels).filter(v => v.parent_id === id).map(v => v.id))}
                </Box>)
                return list;
            }

            const v = channels[id];

            if (openNum === 1) {
                v.is_showed = v.is_showedALL
            }
            if (openNum === 2) {
                v.is_showed = v.is_showedA;
            }
            if (openNum === 3) {
                v.is_showed = v.is_showedB;
            }
            if (openNum === 4) {
                v.is_showed = v.is_showedC;
            }

            if (clack) {
                if (openNum === 1) {
                    setUpTabs(ActiveAll, ActiveAllNum);
                    if (ActiveAll.size == 0) {
                        selectActiveChatId("0")
                    } else {
                        let ct = 0
                        ActiveAll.forEach(el => {
                            if (ct == ActiveAllNum) {
                                selectActiveChatId(el.id)
                            }
                            ct++
                        })
                    }
                }
                if (openNum === 2) {
                    setUpTabs(ActiveA, ActiveANum)
                    if (ActiveA.size == 0) {
                        selectActiveChatId("0")
                    } else {
                        let ct = 0
                        ActiveA.forEach(el => {
                            if (ct == ActiveANum) {
                                selectActiveChatId(el.id)
                            }
                            ct++
                        })
                    }
                }
                if (openNum === 3) {
                    setUpTabs(ActiveB, ActiveBNum)
                    if (ActiveB.size == 0) {
                        selectActiveChatId("0")
                    } else {
                        let ct = 0
                        ActiveB.forEach(el => {
                            if (ct == ActiveBNum) {
                                selectActiveChatId(el.id)
                            }
                            ct++
                        })
                    }
                }
                if (openNum === 4) {
                    setUpTabs(ActiveC, ActiveCNum)
                    if (ActiveC.size == 0) {
                        selectActiveChatId("0")
                    } else {
                        let ct = 0
                        ActiveC.forEach(el => {
                            if (ct == ActiveCNum) {
                                selectActiveChatId(el.id)
                            }
                            ct++
                        })
                    }
                }
                setClack(false);
            }

            if (filteredAllChannelIds.has(id) && filter != '') {
                v.is_showed = true;
                v.is_focus = true;
            }

            let tmpUseTabs = new Set();
            tabs.forEach(el => {
                tmpUseTabs.add(el.id)
            });
            //console.log(tmpUseTabs);

            //onDoubleClick={ e => addChannel("*"+v.name , id, moment().toISOString())}>

            list.push(<ListItem autoFocus={v.is_focus}>
                <Box mr={1}>
                    <ListItemAvatar>
                        <Avatar variant="square" className={(
                                !tmpUseTabs.has(v.id))
                                ? (
                                    (v.name.toLowerCase().includes(filter.toLowerCase()) && filter != '')
                                    ? classes.small
                                    : classes.small2)
                                : classes.small3
} onDoubleClick={e => addChannel("NEW*" + v.name.substring(0, 10), id, moment().toISOString())}>
                            {v.name.substring(0, 3)}
                        </Avatar>
                    </ListItemAvatar>
                </Box>
                <Box mr={1}>
                    <ListItemText primary={(
                            v.name.length < 18)
                            ? /// I don't know why 18
                            <p className="TextStyle">{v.name}</p>
                            : <p>
                                {v.name.substring(0, 16) + " ..."}
                            </p>} onClick={e => {
                            let flag = true
                            tmpUseTabs.forEach(nm => {
                                if (nm == v.id)
                                    flag = false;
                                }
                            )
                            if (flag) {

                                addTab(v.id, v.name);
                                let ct = 0;
                                tmpUseTabs.forEach(nm => {
                                    if (nm != v.id)
                                        ct++;
                                    }
                                )
                                selectTab(ct * 2)

                                if (openNum === 1) {
                                    setActiveAllNum(ct);
                                    let tmp = ActiveAll;
                                    tmp.add({id: v.id, name: v.name})
                                    selectActiveChatId(v.id)
                                    SetActiveAll(tmp)
                                }
                                if (openNum === 2) {
                                    setActiveANum(ct);
                                    let tmp = ActiveA;
                                    tmp.add({id: v.id, name: v.name})
                                    selectActiveChatId(v.id)
                                    SetActiveA(tmp)
                                }
                                if (openNum === 3) {
                                    setActiveBNum(ct);
                                    let tmp = ActiveB;
                                    tmp.add({id: v.id, name: v.name})
                                    selectActiveChatId(v.id)
                                    SetActiveB(tmp)
                                }
                                if (openNum === 4) {
                                    setActiveCNum(ct);
                                    let tmp = ActiveC;
                                    tmp.add({id: v.id, name: v.name})
                                    selectActiveChatId(v.id)
                                    SetActiveC(tmp)
                                }
                            }

                        }}/>
                </Box>
                <Box mr={1}>
                    <IconButton edge="end" classes={{
                            root: classes.InputIcon2
                        }}><ViewComfyIcon style={{
                    fontSize: 20
                }}/></IconButton>
                </Box>

                {
                    FatherChannelIds.has(id)
                        ? <Box height="50%">
                                {
                                    v.is_showed
                                        ? <IconButton edge="end" onClick={e => {
                                                    e.stopPropagation();
                                                    hideChannel(v.id, openNum)
                                                }} classes={{
                                                    root: classes.InputIcon2
                                                }}><KeyboardArrowRightIcon style={{
                                                    fontSize: 35
                                                }}/></IconButton>
                                        : <IconButton edge="end" onClick={e => {
                                                    e.stopPropagation();
                                                    showChannel(v.id, openNum)
                                                }} classes={{
                                                    root: classes.InputIcon
                                                }}><KeyboardArrowDownIcon style={{
                                                    fontSize: 35
                                                }}/></IconButton>
                                }
                            </Box>
                        : <p></p>
                }
            </ListItem>)

            // Add Parent Channel
            ///
            list.push(<Collapse in={v.is_showed} timeout='auto'
                // timeout=1 broke everything
                style={{
                    width: 'calc(100% - 1.5vw)',
                    float: 'right',
                    position: 'relative'
                }}>
                <List>
                    {getMyList(Object.values(channels).filter(v => v.parent_id === id).map(v => v.id))}
                </List>
            </Collapse>)
            // Add Child Channel

        });

        return list;
    }

    function activate1(e) {
        e.preventDefault();
        setPickB4("primary");
        setPickB3("primary");
        setPickB2("primary");
        setPickB1("secondary");
        if (openNum === 1)
            setActiveAllNum(activeTab);
        if (openNum === 2)
            setActiveANum(activeTab);
        if (openNum === 3)
            setActiveBNum(activeTab)
        if (openNum === 4)
            setActiveCNum(activeTab);
        setOpenNum(1);
        setClack(true);
        setFilter(AllFilter);
    }
    function activate2(e) {
        e.preventDefault();
        setPickB4("primary");
        setPickB3("primary");
        setPickB2("secondary");
        setPickB1("primary");
        if (openNum === 1)
            setActiveAllNum(activeTab);
        if (openNum === 2)
            setActiveANum(activeTab);
        if (openNum === 3)
            setActiveBNum(activeTab)
        if (openNum === 4)
            setActiveCNum(activeTab);
        setClack(true);

        setOpenNum(2);
        setFilter(AFilter);
    }
    function activate3(e) {
        e.preventDefault();
        setPickB4("primary");
        setPickB3("secondary");
        setPickB2("primary");
        setPickB1("primary");
        if (openNum === 1)
            setActiveAllNum(activeTab);
        if (openNum === 2)
            setActiveANum(activeTab);
        if (openNum === 3)
            setActiveBNum(activeTab)
        if (openNum === 4)
            setActiveCNum(activeTab);
        setOpenNum(3);

        setClack(true);
        setFilter(BFilter);
    }
    function activate4(e) {
        e.preventDefault();
        setPickB4("secondary");
        setPickB3("primary");
        setPickB2("primary");
        setPickB1("primary");
        if (openNum === 1)
            setActiveAllNum(activeTab);
        if (openNum === 2)
            setActiveANum(activeTab);
        if (openNum === 3)
            setActiveBNum(activeTab)
        if (openNum === 4)
            setActiveCNum(activeTab);
        setClack(true);

        setOpenNum(4);
        setFilter(CFilter);
    }

    let tmpUseTabs = new Set();
    tabs.forEach(el => {
        tmpUseTabs.add(el.id)
    })

    return (<div className="ChannelForm">
        <div className={classes.root}>
            <div style={{
                    margin: '0.5vw',
                    marginTop: "0"
                }}>
                <Grid container="container" style={{
                        width: "25vw"
                    }}>
                    <Grid>
                        <p className="VisitText" style={{
                                borderBottom: "0.5vmin solid orange",
                                paddingBottom: "1vh",
                                paddingTop: "0.45vh",
                                paddingLeft: "3.8vw",
                                fontSize: "3vh",
                                fontWeight: '600',
                                width: "23vw"
                            }}>
                            Каналы
                            <IconButton onClick={e => {
                                    let flag = true

                                    tmpUseTabs.forEach(nm => {
                                        if (nm == "0")
                                            flag = false;
                                        }
                                    )
                                    if (flag) {

                                        addTab("0", "Заметки");
                                        let ct = 0;
                                        tmpUseTabs.forEach(nm => {
                                            if (nm != "0")
                                                ct++;
                                            }
                                        )
                                        selectTab(ct)

                                        if (openNum === 1) {
                                            setActiveAllNum(ct);
                                            let tmp = ActiveAll;
                                            tmp.add({id: "0", name: "Заметки"})
                                            selectActiveChatId("0")
                                            SetActiveAll(tmp)
                                        }
                                        if (openNum === 2) {
                                            setActiveANum(ct);
                                            let tmp = ActiveA;
                                            tmp.add({id: "0", name: "Заметки"})
                                            selectActiveChatId("0")
                                            SetActiveA(tmp)
                                        }
                                        if (openNum === 3) {
                                            setActiveBNum(ct);
                                            let tmp = ActiveB;
                                            tmp.add({id: "0", name: "Заметки"})
                                            selectActiveChatId("0")
                                            SetActiveB(tmp)
                                        }
                                        if (openNum === 4) {
                                            setActiveCNum(ct);
                                            let tmp = ActiveC;
                                            tmp.add({id: "0", name: "Заметки"})
                                            selectActiveChatId("0")
                                            SetActiveC(tmp)
                                        }
                                    }

                                }} style={{
                                    marginLeft: "6vw",
                                    marginTop: 0,
                                    marginBottom: 0,
                                    padding: 0,
                                    width: "2vw",
                                    height: "2vw"
                                }}>
                                <GradeIcon style={{
                                        color: (!tmpUseTabs.has("0"))
                                            ? "#FC8508"
                                            : "#1E80F0"
                                    }}></GradeIcon>
                            </IconButton>

                        </p>
                    </Grid>
                </Grid>
                <div >
                    <Box mt={-1} px={2} mb={0.5} ml={-2}>
                        <ThemeProvider theme={MyTheme}>
                            <ThemeProvider theme={MyThemeB}>
                                <Button variant="contained" color={pickB1} onClick={activate1} className={classes.MyButtonAll}>
                                    ALL
                                </Button>
                            </ThemeProvider>
                            <Button variant="contained" color={pickB2} onClick={activate2} className={classes.MyButton}>
                                A
                            </Button>
                            <Button variant="contained" color={pickB3} onClick={activate3} className={classes.MyButton}>
                                B
                            </Button>
                            <Button variant="contained" color={pickB4} onClick={activate4} className={classes.MyButton}>
                                C
                            </Button>
                        </ThemeProvider>
                    </Box>
                </div>
                <div>
                    <Box mt={1.5} mb={1.5}>
                        <ThemeProvider theme={MyThemeInput}>
                            <FormControl fullWidth="true" variant="standart" color="secondary">
                                <InputLabel variant="standart" color="primary" classes={{
                                        formControl: classes.InputLabel
                                    }}>
                                    Find...
                                </InputLabel>
                                <Input color="secondary" id="outlined-channels-search" onChange={e => {
                                        if (openNum === 1) {
                                            SetAllFilter(e.target.value);
                                            setFilter(e.target.value);
                                        }
                                        if (openNum === 2) {
                                            SetAFilter(e.target.value);
                                            setFilter(e.target.value);
                                        }
                                        if (openNum === 3) {
                                            SetBFilter(e.target.value);
                                            setFilter(e.target.value);
                                        }
                                        if (openNum === 4) {
                                            SetCFilter(e.target.value);
                                            setFilter(e.target.value);
                                        }
                                    }} value={filter} type={'text'} endAdornment={<InputAdornment position = "end" > <IconButton edge="end" onClick={e => {
                                            if (filter != '') {
                                                addChannel(filter, null, moment().toISOString());
                                            }
                                        }}>
                                        <AddBoxIcon classes={{
                                                root: classes.InputIcon
                                            }}/>
                                    </IconButton>
                                </InputAdornment>}></Input>
                            </FormControl>
                        </ThemeProvider>
                    </Box>
                </div>
            </div>
        </div>
        <div className={classes.root2}>
            <Box >
                <List>
                    {getMyList(Object.values(channels).filter(v => (!v.parent_id & (v.id != "0"))).map(v => v.id))}
                </List>
            </Box>
        </div>
    </div>);
}

///
export default connect(store => ({channels: store.data.channels, tmpChannels: store.channelsXPEHb, active_chat_id: store.state.active_chat_id, tabs: store.state.activeTabs, activeTab: store.state.activeTab}), {
    selectActiveChatId,
    showChannel,
    hideChannel,
    addChannel,
    addTab,
    selectTab,
    setUpTabs,
    replaceMessages,
    replaceChannels
})(ChannelForm)
