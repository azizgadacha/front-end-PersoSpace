
import {
     ADD_WIDGET,
    DELETE_WIDGET,  INISIALIZE_STORE,

} from './actions';





export const initialState = {
    widget:[],
    id:null

};

//-----------------------|| CARD REDUCER ||-----------------------//

const WidgetStore= (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {
        case INISIALIZE_STORE:

            state.widget=action.payload.widget
            return {

                ...state,

            };

        case ADD_WIDGET:

console.log(action.payload.widget)

            state.widget=state.widget.concat(action.payload.widget)
            return {

                ...state,

            };


        case DELETE_WIDGET:
            const deleteWidget=action.payload.widget


            let index = 0;

            var filteredObj = state.widget.find(function(item, i){

                if(item._id === deleteWidget._id){




                    index = i;
                    return i;

                }
            });

            state.widget.splice(index,1)

            return {
                ...state
            }



        default:

            return {...state};


    }};

export default WidgetStore;
