// assets
import { IconUserPlus, IconWindmill,IconUserSearch} from '@tabler/icons';
// constant
const icons = {
    IconUserPlus: IconUserPlus,
    IconWindmill: IconWindmill,
    IconUserSearch:IconUserSearch,
};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const utilities = {
    id: 'utilities',
    //title: 'Utilities',
    type: 'group',
    children: [

        {
            id: 'Users',
            title: 'Users',
            type: 'item',
            url: '/dashboard/viewAll',
            icon: icons['IconUserSearch'],
            breadcrumbs: false
        },{
        id:'visualization of workspaces',
            title:'visualization of workspaces',
            type:'item',
            url:'/dashboard/VisualizationOfWorkspaces',
            icon:icons['IconUserSearch'],
            breadcrumbs: false

        }


    ]
};
