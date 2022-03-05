import { CLICK, CLOSE  } from './actions';




export const initialState = {
   open:true,
    text:" sal  h",
    severity:"success"

};


//-----------------------|| CARD REDUCER ||-----------------------//

const SnackbarReducer = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {
        case CLICK:
      const  {text}=action.payload
            const  {severity}=action.payload

            return {

                ...state,
                open:true,
text,severity
            };
        case CLOSE:

            return {
                ...state,
                open:false


            };
  /*      case "supprimer":
            const index = state.cards.indexOf({id:1});
            console.log("index is "+index)
            state.cards.splice(index, 1);


            return {
                ...state

            };
*/
        default:
            return {...state};


    }};

export default SnackbarReducer;
