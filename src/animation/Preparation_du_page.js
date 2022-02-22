import React, { Suspense } from 'react';

// project imports
import BarDeChargement from './BarDeChargement';

//-----------------------|| LOADABLE - LAZY LOADING ||-----------------------//

const Preparation_du_page = (Component) => (props) => (
    <Suspense fallback={<BarDeChargement />}>
        <Component {...props} />
    </Suspense>
);

export default Preparation_du_page;
