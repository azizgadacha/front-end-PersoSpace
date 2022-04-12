import {

    CHANGE_TYPE
    ,
    CHANGE_SUCCESS, INIZIALIZE_STEPS, RETURN_BACK, IMPORT_DATA,
} from './actions';




export const initialState = {
  Type:null,
    Place:0,
Data:null

};


//-----------------------|| CARD REDUCER ||-----------------------//

const Widget_transition_Reducer = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {


        case RETURN_BACK:
            state.Place=state.Place-1


            return {

                ...state,




            }
        case INIZIALIZE_STEPS:
            state.Place=0
            state.Type=null

            return {

                ...state,




            };
        case CHANGE_TYPE:
            let  {Type}=action.payload

            return {
                ...state,
                Type



            };
        case CHANGE_SUCCESS:

console.log("test "+state.Place)
            state.Place=state.Place+1
            state.Type=action.payload.Type

            return {

                ...state,


            };
        case IMPORT_DATA:

console.log(action.payload.Data)
         let {Data}=action.payload

            return {

                ...state,
Data

            };


        default:
            return {...state};


    }};

export default Widget_transition_Reducer;
