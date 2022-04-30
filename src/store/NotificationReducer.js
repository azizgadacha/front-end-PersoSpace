
import {
    ADD_NOTIFICATION,
    ADD_WIDGET, DELETE_NOTIFICATION,
    DELETE_WIDGET, EDIT_NOTIFICATION, INISIALIZE_NOTIFICATION, INISIALIZE_STORE, WIDGET_UPDATE,

} from './actions';





export const initialState = {
    notificationListe:[],


};

//-----------------------|| CARD REDUCER ||-----------------------//

const NotificationReducer= (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {
        case INISIALIZE_NOTIFICATION:

            state.notificationListe=action.payload.notificationListe
            return {

                ...state,

            };

        case ADD_NOTIFICATION:


            state.notificationListe=state.notificationListe.concat(action.payload.notification)
            return {

                ...state,

            };


        case DELETE_NOTIFICATION:
            const deleteNotification=action.payload.notification


            let index = 0;

           state.notificationListe.find(function(item, i){

                if(item._id === deleteNotification._id){
                    index = i;
                    return i;
                }
            });
            state.notificationListe.splice(index,1)

            return {
                ...state
            }
        case EDIT_NOTIFICATION:
            const editedNotification=action.payload.notification


            let indexEdited = 0;

            state.notificationListe.find(function(item, i){

                if(item._id === editedNotification._id){
                    indexEdited = i;
                    return i;
                }
            });
            state.notificationListe[indexEdited]=editedNotification


            return {
                ...state
            }



        default:

            return {...state};


    }};

export default NotificationReducer;
