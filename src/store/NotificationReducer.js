
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

                let notification =action.payload.notification
console.log("rrrrzkk")
console.log(notification)
let elem ={user:notification.user,notification:notification.notification,NameShared:notification.name}
            console.log('mmmmmmmpppppeke')
            console.log(elem)
            state.notificationListe.splice(0, 0, elem)

            console.log('mmmmmmmpppppeke2')
            console.log(state.notificationListe)



            return {

                ...state,

            };


        case DELETE_NOTIFICATION:
            let deleteNotification=null
            console.log('dddddddddzezrzr')
try {


     deleteNotification = action.payload.notification
}catch (e) {
    console.log('ffeff')
    console.log(e)
}
    console.log(deleteNotification)

            let index = 0;
            let founded = false;

           state.notificationListe.find(function(item, i){
console.log(deleteNotification.notification)
console.log(item.notification._id)
                if(item.notification._id === deleteNotification){

                    index = i;
                    founded=true
                    return i;
                }
            });

           console.log(founded)
           if(founded)
            state.notificationListe.splice(index,1)

            return {
                ...state
            }
        case EDIT_NOTIFICATION:
            const editedNotification=action.payload.listNotification

            let indexEdited = 0;

            state.notificationListe.find(function(item, i){


                if(  editedNotification.includes(item.notification._id)){
                    item.notification.read = true;
                }
            });


            return {
                ...state
            }



        default:

            return {...state};


    }};

export default NotificationReducer;
