import { CLICK, CLOSE  } from './actions';




export const initialState = {
   open:false,
    text:"",
    severity:""

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

        default:
            return {...state};


    }};

export default SnackbarReducer;
