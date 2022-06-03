import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    CardActions,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '../../../../composant_de_style/cards/MainCard';
import Transitions_menu_dash from '../../../../animation/Transitions_menu_dash';
import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons';
import axios from "axios";
import configData from "../../../../config";
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_NOTIFICATION,
    CLICK,
    EDIT_NOTIFICATION,
    INISIALIZE_NOTIFICATION,
    INISIALIZE_SOCKET,
    LOGOUT
} from "../../../../store/actions";
import {Badge} from "@mui/material";
import {io} from "socket.io-client";

// style constant
const useStyles = makeStyles((theme) => ({
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 205px)',
        overflowX: 'hidden'
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        '&[aria-controls="menu-list-grow"],&:hover': {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light
        }
    },
    cardContent: {
        padding: '0px !important'
    },
    notificationChip: {
        color: theme.palette.background.default,
        backgroundColor: theme.palette.warning.dark
    },
    divider: {
        marginTop: 0,
        marginBottom: 0
    },
    cardAction: {
        padding: '10px',
        justifyContent: 'center'
    },
    paddingBottom: {
        paddingBottom: '16px'
    },
    box: {
        marginLeft: '16px',
        marginRight: '24px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '16px'
        }
    },
    bodyPPacing: {
        padding: '16px 16px 0'
    },
    textBoxSpacing: {
        padding: '0px 16px'
    }
}));



//-----------------------|| NOTIFICATION ||-----------------------//

const NotificationSection = () => {
    const dispatcher = useDispatch();
    const notification = useSelector((state) => state.notification);
    const [OccurenceNotification, setOccurenceNotification] = React.useState(0);
let values=0
    let v=0
    useEffect(() => {
        v++

        let i=0
        values=0
        setOccurenceNotification(values)

        for(let element of notification.notificationListe){
            i++

 if(!element[1].read){
     values++
     setOccurenceNotification(values)

 }}
    });







    const account = useSelector((state) => state.account);

    const classes = useStyles();
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const anchorRef = React.useRef(null);

    const [TestClose, setTestClose] = React.useState(false);
    let socket = useSelector((state) => state.socket);
    useEffect(async () => {

        let ss = await io(configData.API_SERVER)
        dispatcher({
            type: INISIALIZE_SOCKET, payload: {socket: ss}
        }, []);


    },[])
    useEffect(async () => {
        await socket.socket?.emit('add_User', account.user._id)


    },[socket.socket])
    let k=0
    useEffect(async () => {

        await socket.socket?.on("send_Notification_to_user", (data) => {


            dispatcher({
                type: ADD_NOTIFICATION, payload: {notification: data.notification}
            });
        })
    },[socket.socket])


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const prevOpen = React.useRef(open);
    React.useEffect(async () => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;

        let IdListe = []

        if ((open == true) && (TestClose == false)) {
            setTestClose(true)
        } else if ((open == false) && (TestClose == true)) {
            let i = 0
            i++

            let j = 0
            let parcour = async () => {
                for (let elem of (notification.notificationListe)) {
                    j++

                    if (!elem[1].read) {
console.log('salut')
                        //elem[1].read=!elem[1].read
                        IdListe.push(elem[1]._id)
                    }
                }
            }
            await parcour()


            if (IdListe.length >= 1) {

                let result =await axios.post(configData.API_SERVER + 'api/Notification/editNotification', {token: account.token, IdListe})

                    if (result.data.notConnected) {
                        dispatcher({type: LOGOUT});
                        history.push("/login");
                    } else {

                        dispatcher({
                            type: EDIT_NOTIFICATION, payload: {listNotification: IdListe}
                        });
                        setTestClose(false)
                    }
            }
    }
    }, [open]);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const [Loading, setLoading] = React.useState(true);
    let history=useHistory()

    useEffect(()=>{

        const activationmail=async ()=>{


                try {
                    axios
                        .post(configData.API_SERVER + 'api/Notification/getNotification', {token:account.token, id:account.user._id}).then((result)=>{
                        if(result.data.notConnected){
                            dispatcher({ type: LOGOUT });
                            history.push("/login");
                            dispatcher({
                                type:CLICK,
                                payload: {text:"You are no longer connected",severity:"error"}
                            })
                        }
                        else {

                            if (result.data.success) {
                                dispatcher({
                                    type: INISIALIZE_NOTIFICATION,
                                    payload: {notificationListe: result.data.notifFound}
                                });
                            }


                            setLoading(false)
                        }
                    }).catch(()=>{
                        setLoading(true)

                    })
                }
                catch (err)
                    {
                        setLoading(true)

                    }}



        activationmail()

    },[])








    return (
        <React.Fragment>
            <Box component="span" className={classes.box}>
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Badge badgeContent={OccurenceNotification} color="error">

                    <Avatar
                        variant="rounded"
                        className={classes.headerAvatar}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >

                        <IconBell stroke={1.5} size="1.3rem" />

                    </Avatar>
                    </Badge>

                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions_menu_dash in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <CardContent className={classes.cardContent}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item xs={12}>
                                                <div className={classes.bodyPPacing}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Stack direction="row" spacing={2}>
                                                                <Typography variant="subtitle1">All Notification</Typography>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item>

                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <PerfectScrollbar className={classes.ScrollHeight}>
                                                    <Grid container direction="column" spacing={2}>

                                                        {/* <Grid item xs={12} p={0}>
                                                            <Divider className={classes.divider} />
                                                        </Grid>*/}
                                                        <Grid item xs={12}>
                                                            <NotificationList open={open} Loading={Loading}   />
                                                        </Grid>
                                                    </Grid>
                                                </PerfectScrollbar>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    {/*<Divider />

                                    <CardActions className={classes.cardAction}>
                                        <Button size="small" disableElevation>
                                            View All
                                        </Button>
                                    </CardActions>*/}
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions_menu_dash>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default NotificationSection;
