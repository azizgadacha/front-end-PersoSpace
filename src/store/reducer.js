import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customizationReducer from './customizationReducer';
import accountReducer from './accountReducer';
import cardReducer from './cardReducer';
import SnackbarReducer from "./SnackbarReducer";
import ModalReducer from "./ModalReducer";
import WorkspaceStore from "./WorkspaceStore";
import UserReducer from "./UserReducer";
import Widget_transition_Reducer from "./Widget_transition_Reducer";
import WidgetStore from "./WidgetStore";

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
    workspace:WorkspaceStore,
    user:UserReducer,
    widget:Widget_transition_Reducer,
widgetstore:WidgetStore
});

export default reducer;