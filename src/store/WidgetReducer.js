
import {
    ADD_WIDGET,
    DELETE_WIDGET, INISIALIZE_STORE, WIDGET_UPDATE,

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


            state.widget=state.widget.concat(action.payload.widget)
            return {

                ...state,

            };


        case WIDGET_UPDATE:
            const WidgeteEdited=action.payload.widget


            let index1 = 0;

             state.widget.find(function(item, i){

                if(item.WidgetName === WidgeteEdited.oldName){
                    index1 = i;
                    return i;

                }
            });
WidgeteEdited.oldName=undefined
            state.widget[index1]=WidgeteEdited

            return {
                ...state
            }
        case DELETE_WIDGET:
            const deleteWidget=action.payload.widget


            let index = 0;

            var filteredObj = state.widget.find(function(item, i){

                if(item.WidgetName === deleteWidget.WidgetName){




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
