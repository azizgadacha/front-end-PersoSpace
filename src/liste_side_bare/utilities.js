// assets
import { IconUserPlus, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconUserPlus: IconUserPlus,
    IconWindmill: IconWindmill,

};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'Add new User',
            title: 'Add new User',
            type: 'item',
            url: '/dashboard/nav/registre',
            icon: icons['IconUserPlus'],
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Icons',
            type: 'collapse',
            icon: icons['IconWindmill'],
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'item',
                    url: '/dashboard/nav/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/dashboard/nav/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        }
    ]
};
