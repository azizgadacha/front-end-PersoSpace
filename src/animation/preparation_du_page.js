import React, { Suspense } from 'react';

// project imports
import bar_de_chargement from './bar_de_chargement';

//-----------------------|| LOADABLE - LAZY LOADING ||-----------------------//

const Preparation_du_page = (Component) => (props) => (
    <Suspense fallback={<bar_de_chargement />}>
        <Component {...props} />
    </Suspense>
);

export default Preparation_du_page;
