import { OPEN_MODAL, CLOSE_MODAL,  } from './actions';




export const initialState = {
    ModalState:false

};


//-----------------------|| CARD REDUCER ||-----------------------//

const ModalReducer = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {
        case OPEN_MODAL:


            return {

                ...state,
                ModalState:true,

            };
        case CLOSE_MODAL:

            return {
                ...state,
                ModalState:false


            };

        default:
            return {...state};


    }};

export default ModalReducer;
