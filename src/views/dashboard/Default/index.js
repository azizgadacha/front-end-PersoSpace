import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import EarningCard from './EarningCard';

import { gridSpacing } from '../../../store/constant';
import PlusCard from './PlusCard';
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_INITIALIZE } from '../../../store/actions';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = (props, { ...others }) => {


    const [isLoading, setLoading] = useState(true);



    useEffect(() => {
        setLoading(false);
    }, []);

    var listecard = useSelector((state) => state.card);
    {console.log("salah1"+listecard)}

    var lc =   listecard.cards.map((card) => {
        {console.log("salah22"+card)}

return(

                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <EarningCard isLoading={isLoading} />
                </Grid>
                




)
         })
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
            {lc}


                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <PlusCard/>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>

    );

}
export default Dashboard;
