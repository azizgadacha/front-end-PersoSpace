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
            url: '/dashboard/registre',
            icon: icons['IconUserPlus'],
            breadcrumbs: false
        }
    ]
};
