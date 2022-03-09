import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';


// material-ui
import { makeStyles } from '@material-ui/styles';
import {

    Grid,

    TextField, Typography,
    useMediaQuery
} from '@material-ui/core';



// project imports
import useScriptRef from '../../hooks/useScriptRef';


// assets

// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

//============================|| API JWT - LOGIN ||============================//

const RestProfile = (props, { ...others }) => {
    const classes = useStyles();
    const dispatcher = useDispatch();

    const scriptedRef = useScriptRef();
    const [checked, setChecked] = React.useState(true);

    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [info, setInfo] = useState('');
    const account = useSelector((state) => state.account);
    console.log(account)





    return (
        <React.Fragment>
            <form >
                <Grid container spacing={6} >

                    <Grid item   xs={12} >
                        <label>Username: </label>

                        <Typography margin="normal"
                                    name="username"
                                    id="username" color="black"  fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                            {account.user.username}
                        </Typography>


                    </Grid>
                    <Grid>

                    </Grid>

                    <Grid item xs={12} alignItems="baseline" >
                        <label>Email:      </label>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="email"
                            id="email"
                            type="text"
                            value={account.user.email}

                        />
                    </Grid>

                </Grid>

            </form>
        </React.Fragment>

    );
}

export default RestProfile;
