import {
    OPEN_MODAL,
    CLOSE_MODAL,
    OPEN_DELETE_MODAL,
    CLOSE_DELETE_MODAL,
    OPEN_INSIDE_DELETE_MODAL,
    CLOSE_INSIDE_DELETE_MODAL, OPEN_EDIT_MODAL, OPEN_WIDGET_MODAL, CLOSE_WIDGET_MODAL,
} from './actions';




export const initialState = {
    ModalState:false,
    ModalDeleteState:false,

    ModalInsideDeleteState:false,
ModalWidget:false,
    card1:null,

    objet:null


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
        case OPEN_DELETE_MODAL:

            const  {objet}=action.payload


            return {

                ...state,
               objet,
                ModalDeleteState:true,

            };
        case CLOSE_DELETE_MODAL:

            return {
                ...state,
                ModalDeleteState:false


            };
        case OPEN_INSIDE_DELETE_MODAL:
            const  {card1}=action.payload

            return {

                ...state,
                card1,
                ModalInsideDeleteState:true,

            };
        case OPEN_WIDGET_MODAL:

            return {
                ...state,

                ModalWidget:true


            };
        case CLOSE_WIDGET_MODAL:

            return {
                ...state,
                ModalWidget:false


            };


        default:
            return {...state};


    }};

export default ModalReducer;
