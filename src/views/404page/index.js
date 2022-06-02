
import { motion } from 'framer-motion';
import {Link as RouterLink, useHistory} from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {Box, Button, Typography, Container, Grid} from '@mui/material';
// components
import { MotionContainer, varBounceIn } from './animate';
import ThemeConfig from "../../themes/theme2";
import config from "../../config";
import {Fragment} from "react";
import {makeStyles} from "@material-ui/styles";
import AnimateButton from "../../animation/AnimateButton";

// ----------------------------------------------------------------------


const useStyles = makeStyles((theme) => ({
    red: {
        display: 'flex',
        minHeight: '100%',
        alignItems: 'center',
        paddingTop: theme.spacing(9),
        paddingBottom: theme.spacing(6)
    },

}));

// ----------------------------------------------------------------------

export default function Page404() {
    const classes = useStyles();

    let history =useHistory()

    const handleClick =()=>{

        history.push(config.defaultPath)
    }
    return (
        <Grid  className={classes.red} >
            <Container>
                <MotionContainer initial="initial" open>
                    <Box sx={{ maxWidth: "100%", margin: 'auto', textAlign: 'center' }}>
                        <motion.div variants={varBounceIn}>
                            <Typography variant="h1" paragraph>
                                Sorry, page not found!
                            </Typography>
                        </motion.div>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
                            Be sure to check your spelling.
                        </Typography>

                        <motion.div variants={varBounceIn}>
                            <Box
                                component="img"
                                src="/static/images/404.svg"
                                sx={{ height: "39%",width:'50%', mx: 'auto', my: { xs: 5, sm: 10 } }}
                            />
                        </motion.div>
                        <AnimateButton>

                        <Button  onClick={handleClick} size="large" variant="contained" color={"secondary"} >
                            Go to Home
                        </Button>
                        </AnimateButton>
                    </Box>
                </MotionContainer>
            </Container>
        </Grid>
    );
}





