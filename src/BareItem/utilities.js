// assets
import { IconUserPlus, IconWindmill,IconUserSearch,IconSearch} from '@tabler/icons';

// constant
const icons = {
    IconUserPlus: IconUserPlus,
    IconWindmill: IconWindmill,
    IconUserSearch:IconUserSearch,
    IconSearch:IconSearch
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
            title:'Workspaces',
            type:'item',
            url:'/dashboard/VisualizationOfWorkspace',
            icon:icons['IconSearch'],
            breadcrumbs: false

        }


    ]
};
