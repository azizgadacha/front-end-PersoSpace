import {

    CHANGE_TYPE
    ,
    CHANGE_SUCCESS, INIZIALIZE_STEPS, RETURN_BACK, IMPORT_DATA, CHANGE_NAME,
} from './actions';
import {useParams} from "react-router-dom";




export const initialState = {
  Type:null,
    Place:0,
    label:null,
    dataWidget:null,
    WidgetName:'',
    superior_id:null,
    sourceDB:null,
idData:null

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
            state.dataWidget=null
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

            state.Place=state.Place+1
            state.Type=action.payload.Type


            return {

                ...state,


            };

            case CHANGE_NAME:
                console.log('hroo')
            let {WidgetName}=action.payload

            return {

                ...state,
                WidgetName

            };

        case IMPORT_DATA:
            state.Place = state.Place + 1;
            state.superior_id = action.payload.superior_id
            state.sourceDB=action.payload.sourceDB
             if (action.payload.sourceDB){
state.label=action.payload.label
                state.dataWidget=action.payload.data
                 state.idData=action.payload.idData
}
else{
    state.label = action.payload.Data[0];
    let numberArray = [];
    let length = (action.payload.Data[1]).length;

    for (let i = 0; i < length; i++)
        numberArray.push(parseInt((action.payload.Data[1])[i]));

    state.dataWidget = numberArray;
}


            return {

                ...state,


            };








        default:
            return {...state};


    }};

export default Widget_transition_Reducer;
