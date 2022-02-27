



export const initialState = {
   open:false,
    text:""

};


//-----------------------|| CARD REDUCER ||-----------------------//

const SnackbarReducer = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {
        case "Click":
      const  {text}=action.payload

            return {

                ...state,
                open:true,
text
            };
        case "Close":

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
