import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import NavGroup from './NavGroup';
import Esseyage from '../../../../BareItem/Esseyage';

//-----------------------|| SIDEBAR MENU LIST ||-----------------------//

const MenuList = () => {
    const navItems = Esseyage().items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return navItems;
};

export default MenuList;
