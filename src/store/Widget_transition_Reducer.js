import {
    OPEN_MODAL,
    CLOSE_MODAL,
    OPEN_DELETE_MODAL,
    CLOSE_DELETE_MODAL,
    OPEN_INSIDE_DELETE_MODAL,
    CLOSE_INSIDE_DELETE_MODAL,
    OPEN_EDIT_MODAL,
    OPEN_WIDGET_MODAL,
    CLOSE_WIDGET_MODAL,
    CHANGE_TYPE,
    CHANGE_PLACE,
    CHANGE_SUCCESS,
} from './actions';




export const initialState = {
  Type:null,
    Place:0


};


//-----------------------|| CARD REDUCER ||-----------------------//

const Widget_transition_Reducer = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {
        case CHANGE_PLACE:
            let newPlacce=state.Place-1
            return {

                ...state,
                Place:newPlacce,



            };
        case CHANGE_TYPE:
            let  {Type}=action.payload

            return {
                ...state,
                Type



            };
        case CHANGE_SUCCESS:

console.log("test "+state.Place)
             newPlacce=state.Place+1
            Type=action.payload.Type

            return {

                ...state,
                Type,
                Place:newPlacce,

            };


        default:
            return {...state};


    }};

export default Widget_transition_Reducer;
