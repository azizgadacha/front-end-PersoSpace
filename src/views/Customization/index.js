import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector,} from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
// material-ui
import { useTheme} from '@material-ui/styles';
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
import {Adding, AddWidget, Back, Cancel,} from "../Button/actionButton";
import Import from "./Import/import";
import WidgetName from "./WidgetName";

import {
    CLOSE_MODAL,
    CLOSE_WIDGET_MODAL,
    INIZIALIZE_STEPS, OPEN_WIDGET_MODAL,
    RETURN_BACK
} from "../../store/actions";
import {LoadingButton} from "@material-ui/lab";
import SaveIcon from "@mui/icons-material/Save";


// concat 'px'
const buttons = {


    display: "flex",
        justifyContent: "flex-end"
}


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
    let modal = useSelector((state) => state.modal);

    const [open, setOpen] = React.useState(false);

    const dispatcher = useDispatch();
    const handleCloseback = (event, reason) => {
        if (reason && reason == "backdropClick")
            dispatcher({
                type:OPEN_WIDGET_MODAL,

            });
    }
    const handleClose=()=>{

        dispatcher({
            type:INIZIALIZE_STEPS,

        })
        dispatcher({
            type:CLOSE_WIDGET_MODAL,

        });

    }
    const [activeStep, setactiveStep] = React.useState(0);

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const buttonRef = useRef();

    // drawer on/off
    const steps = ["chose the widget", "chose data source","chose a name"];
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Chose/> ;
            case 1:
                return <Import />;
            case 2:
                return <WidgetName buttonRef={buttonRef} />;



            default:
                throw new Error("Unknown step");
        }
    }
    const handleNext = () => {
        setactiveStep(activeStep + 1)



    };

    const handleBack = () => {
        dispatcher({
            type:RETURN_BACK,

        });
        };


    // state - border radius
    const handleToggle = () => {
        dispatcher({
            type:OPEN_WIDGET_MODAL,

        });    };
    let widget = useSelector((state) => state.widget);
    useEffect(() => {
        return () => {
            dispatcher({
                type:CLOSE_WIDGET_MODAL,
            });
        }
    }, [])
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

            {modal.ModalWidget&&(
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"

                open={modal.ModalWidget}
                onClose={handleCloseback}


                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <div style={OVERLAY_Styles}>

                    <Fade in={modal.ModalWidget}>


                        <Box sx={{ ...style,  }}>
                            <IconButton sx={{float:'right'}}               aria-label="close">
                                <CloseIcon onClick={handleClose}  color="disabled"      />
                            </IconButton>
                            <ThemeConfig>

                                <Grid container spacing={0} alignItems="center" justifyContent="center" stroke-linecap="round">
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item sx={{mt: 1, mb:3}}>
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



                                <Stack sx={{mt:4}} direction="row" alignItems="center" justifyContent="space-between" >
                                    <Box
                                        sx={{
                                            display: 'block',
                                            justifyContent: 'block-end',
                                        }}
                                    >




                                        <Button   onClick={handleClose}  variant="contained" color="error">{Cancel}</Button>




                                    </Box>
                                <Box

                                    sx={{
                                        display: 'block',
                                        justifyContent: 'block-end',
                                    }}

                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',

                                    }}
                                >
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>



                                        {widget.Place !== 0 && (
                                            <Button
                                                disabled={modal.isSubmitting}
                                                onClick={handleBack}
                                             sx={{mr:3}}>

                                                {Back}
                                            </Button>
                                        )}

                                        {(widget.Place === steps.length - 1)&&(
                                    (modal.isSubmitting)?(<LoadingButton
                                                variant="contained"
                                                loading loadingPosition="start"
                                                startIcon={<SaveIcon />}
                                                variant="outlined">{Adding}</LoadingButton>):


                                                    <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={()=>buttonRef.current.click()}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-end"
                                            }}
                                        >
                                                        {AddWidget}
                                        </Button>)}





                                    </Stack>
                                </Box>


                                </Stack>


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
