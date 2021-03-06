import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customizationReducer from './customizationReducer';
import accountReducer from './accountReducer';
import cardReducer from './cardReducer';
import SnackbarReducer from "./SnackbarReducer";
import ModalReducer from "./ModalReducer";
import WorkspaceReducer from "./WorkspaceReducer";
import UserReducer from "./UserReducer";
import Widget_transition_Reducer from "./Widget_transition_Reducer";
import WidgetReducer from "./WidgetReducer";
import DataReducer from "./DataReducer";
import NotificationReducer from "./NotificationReducer";
import SocketReducer from "./SocketReducer";

//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'berry-'
        },
        accountReducer
    ),

    customization: customizationReducer,
    card:cardReducer,
    snack:SnackbarReducer,
    modal:ModalReducer,
    workspace:WorkspaceReducer,
    user:UserReducer,
    socket:SocketReducer,

    data:DataReducer,
    notification:NotificationReducer,
    widget:Widget_transition_Reducer,
widgetstore:WidgetReducer
});

export default reducer;