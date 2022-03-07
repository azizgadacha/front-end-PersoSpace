// assets
import { IconUserPlus, IconWindmill,IconUserSearch } from '@tabler/icons';
// constant
const icons = {
    IconUserPlus: IconUserPlus,
    IconWindmill: IconWindmill,
    IconUserSearch:IconUserSearch
};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [

        {
            id: 'View All user',
            title: 'View All user',
            type: 'item',
            url: '/dashboard/viewAll',
            icon: icons['IconUserSearch'],
            breadcrumbs: false
        },
        {
            id: 'Add new User',
            title: 'Add new User',
            type: 'item',
            url: '/dashboard/registre',
            icon: icons['IconUserPlus'],
            breadcrumbs: false
        },

    ]
};
