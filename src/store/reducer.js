import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customizationReducer from './customizationReducer';
import accountReducer from './accountReducer';
import cardReducer from './cardReducer';
import SnackbarReducer from "./SnackbarReducer";
import ModalReducer from "./ModalReducer";

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
    modal:ModalReducer
});

export default reducer;