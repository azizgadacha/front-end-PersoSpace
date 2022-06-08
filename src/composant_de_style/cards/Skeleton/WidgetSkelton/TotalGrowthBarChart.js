import React from 'react';

// material-ui
import { Card, CardContent, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/core/Skeleton';

// project imports
import { gridSpacing } from '../../../../store/constant';

//-----------------------|| SKELETON TOTAL GROWTH BAR CHART ||-----------------------//

const TotalGrowthBarChart = () => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>

                                    <Grid item xs={12}>
                                        <Skeleton variant="rect" height={20} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Skeleton variant="rect" height={30} width={60} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton variant="rect" height={330} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default TotalGrowthBarChart;
