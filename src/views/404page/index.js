
import { motion } from 'framer-motion';
import {Link as RouterLink, useHistory} from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from './animate';
import Page from './Page';
import ThemeConfig from "../../themes/theme2";
import config from "../../config";
import {Fragment} from "react";

// ----------------------------------------------------------------------

const RootStyle = styled(Fragment)(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page404() {

    let history =useHistory()

    const handleClick =()=>{

        history.push(config.defaultPath)
    }
    return (
        <ThemeConfig>
        <RootStyle >
            <Container>
                <MotionContainer initial="initial" open>
                    <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                        <motion.div variants={varBounceIn}>
                            <Typography variant="h3" paragraph>
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
                                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                            />
                        </motion.div>

                        <Button  onClick={handleClick} size="large" variant="contained" >
                            Go to Home
                        </Button>
                    </Box>
                </MotionContainer>
            </Container>
        </RootStyle>
        </ThemeConfig>
    );
}





