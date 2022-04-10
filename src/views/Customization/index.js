import React, {useEffect} from 'react';
import {useDispatch, useSelector,} from 'react-redux';

// material-ui
import {makeStyles, useTheme} from '@material-ui/styles';
import {
    Fab, Grid,

    IconButton,

    Tooltip,

} from '@material-ui/core';

// third-party

// project imports
import AnimateButton from '../../animation/AnimateButton';


// assets
import { IconPlus } from '@tabler/icons';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {Box, Button, Modal, Stack, Typography, useMediaQuery} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import ThemeConfig from "../../themes/theme2";
import Chose from "./Chose/Chose";
import {Cancel, Edit_Information, Edit_Password} from "../Button/actionButton";
import Import from "./Import/import";
import {
    CHANGE_PLACE,
    CLOSE_DELETE_MODAL,
    CLOSE_MODAL,
    CLOSE_WIDGET_MODAL,
    OPEN_EDIT_MODAL,
    OPEN_MODAL,
    OPEN_WIDGET_MODAL
} from "../../store/actions";


// concat 'px'



const OVERLAY_Styles ={
    position: 'fixed',
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0, .2)',
    zIndex:100

}
const style = {

    padding:'50px',
    zIndex:100,

    borderRadius: 5,

    position: 'absolute',
    top: '50%',
    left: '50%',
    radius:3,
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

//-----------------------|| LIVE CUSTOMIZATION ||-----------------------//

const Customization = () => {
    const [open, setOpen] = React.useState(false);

    const dispatcher = useDispatch();
    const handleCloseback = (event, reason) => {
        if (reason && reason == "backdropClick")
       setOpen(false)
    }
    const handleClose=()=>{

setOpen(false)
    }
    const [activeStep, setactiveStep] = React.useState(0);

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();

    // drawer on/off
    const steps = ["chose the widget", "chose data source"];
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Chose/> ;
            case 1:
                return <Import />;



            default:
                throw new Error("Unknown step");
        }
    }
    const handleNext = () => {
        setactiveStep(activeStep + 1)



    };
    let open1 = useSelector((state) => state.modal);

    const handleBack = () => {
        dispatcher({
            type:CHANGE_PLACE,

        });
        };


    // state - border radius
    const handleToggle = () => {
       setOpen(true)    };
    let widget = useSelector((state) => state.widget);

    return (
        <React.Fragment>
            {/* toggle button */}

            <Tooltip title="Add Widget">
                <Fab
                    component="div"
                    onClick={handleToggle}

                    size="medium"
                    variant="string"
                    color="secondary"
                    sx={{
                        bottom: 0,
                        m: 4,
                        position: 'fixed',
                        right: 20,
                        zIndex: (theme) => theme.zIndex.speedDial,
                        boxShadow: theme.shadows[8]
                    }}
                >
                    <AnimateButton >
                        <IconButton color="inherit" size="large" disableRipple>
                            <IconPlus />
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            {console.log("salem")}
            {open&&(
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"

                open={open}
                onClose={handleCloseback}


                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>

                    <Fade in={open}>


                        <Box sx={{ ...style,  }}>
                            <ThemeConfig>
                                {console.log("salem2.0")}

                                <Grid container spacing={2} alignItems="center" justifyContent="center" stroke-linecap="round">
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item sx={{mt: 3, mb:3}}>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography

                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Chose a widget
                                                    </Typography>

                                                </Stack>
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid xs={{padding: "3px 5px",mb:8}}>
                                <Stepper activeStep={widget.Place} xs={{padding: "3px 5px"}}>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}

                                </Stepper>
                                </Grid>

                            {getStepContent(widget.Place)}




                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',

                                    }}
                                >
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>



                                        {widget.Place !== 0 && (
                                            <Button
                                                onClick={handleBack}
                                             xs={3}>

                                                Back
                                            </Button>
                                        )}





                                    </Stack>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'block',
                                        justifyContent: 'block-end',
                                    }}
                                >




                                    <Button   onClick={handleClose}  variant="contained" color="error">{Cancel}</Button>




                                </Box>




                            </ThemeConfig>

                        </Box>
                    </Fade>

                </div>

            </Modal>
                )}



        </React.Fragment>
    );
};

export default Customization;
