
import { INISIALIZE_DATA} from './actions';





export const initialState = {
    data:[]

};

//-----------------------|| CARD REDUCER ||-----------------------//

const DataReducer = (state = initialState, action) => {



    switch (action.type) {
        case INISIALIZE_DATA:
            state.data=action.payload.data
            return {

                ...state,

            };



        default:
            return {...state};


    }};

export default DataReducer;
