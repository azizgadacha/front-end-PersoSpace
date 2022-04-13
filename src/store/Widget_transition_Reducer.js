import {

    CHANGE_TYPE
    ,
    CHANGE_SUCCESS, INIZIALIZE_STEPS, RETURN_BACK, IMPORT_DATA, CHANGE_NAME,
} from './actions';




export const initialState = {
  Type:null,
    Place:0,
    label:null,
    Data:null,
    WidgetNamee:''

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

            state.label=null
            state.Data=null
            state.WidgetNamee=''

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
            console.log("test2 "+state.Place)
            console.log("test3 "+state.Type)

            return {

                ...state,


            };
        case IMPORT_DATA:

console.log(action.payload.Data)
         let {Data}=action.payload
            state.Place=state.Place+1;
            console.log("test4 "+state.Type);
            state.label=action.payload.Data[0];
            state.Data=action.payload.Data[1];
            return {

                ...state,


            };
            case CHANGE_NAME:

            let {WidgetNamee}=action.payload

            return {

                ...state,
                WidgetNamee

            };

        case IMPORT_DATA:

            state.Place=state.Place+1;
            console.log("test4 "+state.Type);
            state.label=action.payload.Data[0];
            state.Data=action.payload.Data[1];
            return {

                ...state,


            };








        default:
            return {...state};


    }};

export default Widget_transition_Reducer;
