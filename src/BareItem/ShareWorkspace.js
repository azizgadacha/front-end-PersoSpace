// assets
import { IconShare } from '@tabler/icons';
// constant
const icons = {
    IconShare:IconShare
};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const ShareWorkspace = {
    id: 'Share Workspace',
    type: 'group',
    children: [
        {
            id:'Shared Workspaces',
            title:'Shared Workspaces',
            type: 'item',
            url: '/dashboard/SharedWorkspaces',
            icon: icons['IconShare'],
            breadcrumbs: false

        }


    ]
};
