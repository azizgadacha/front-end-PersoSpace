import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Card, CardContent, Grid, Skeleton } from '@material-ui/core';
import EarningIcon from '../../../assets/images/icons/earning.svg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { MENU_OPEN } from '../../../store/actions';

// style constant
const useStyles = makeStyles({
    cardHeading: {
        marginRight: '8px',
        marginTop: '18px',
        marginBottom: '14px'
    }
});

//-----------------------|| SKELETON EARNING CARD ||-----------------------//

const PlusCard = () => {
    const dispatch = useDispatch();

    const listecard = useSelector((state) => state.card);

var i=3

    const classes = useStyles();
    const handleClick = () => {
        i=i+1

        dispatch({ type: "ajout", card:{id:i}} )


    };


    return (



        <Card>
            <CardContent>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container justifyContent="space-between">
                            <Grid item height={140} >

                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleClick}  fontSize="inherit"  className="icon icon-tabler icon-tabler-plus"
                                         width="290" height="150" viewBox="-12 -7 35 40" stroke-width="1.75" stroke="#2c3e50"
                                         fill="none" stroke-linecap="round" stroke-linejoin="round" >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>



                            </Grid>


                        </Grid>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
};

export default PlusCard;
