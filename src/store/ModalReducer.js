import {
    OPEN_MODAL,
    CLOSE_MODAL,
    OPEN_DELETE_MODAL,
    CLOSE_DELETE_MODAL,
    OPEN_INSIDE_DELETE_MODAL,
    CLOSE_INSIDE_DELETE_MODAL, OPEN_EDIT_MODAL, OPEN_MODAL_SHARE, CLOSE_MODAL_SHARE,
} from './actions';




export const initialState = {
    ModalState:false,
    ModalStateShare:false,
    ModalDeleteState:false,
    ModalInsideDeleteState:false,
    ModalEditState:false,
    card1:null,

    objet:null


};


//-----------------------|| CARD REDUCER ||-----------------------//

const ModalReducer = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {
        case OPEN_MODAL:
       console.log("salut")
            
console.log(state.ModalState)
            return {

                ...state,
                ModalState:true,
                


            };
        case OPEN_MODAL_SHARE:
            console.log("salut")

            console.log(state.ModalStateShare)
            return {

                ...state,
                ModalStateShare:true,



            };
        case CLOSE_MODAL:

            return {
                ...state,
                ModalState:false


            };
        case CLOSE_MODAL_SHARE:

            return {
                ...state,
                ModalStateShare:false


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
        case OPEN_EDIT_MODAL:
              let {obj}=action.payload

            return {
                ...state,
                objet:obj,

                ModalEditState:false


            };


        default:
            return {...state};


    }};

export default ModalReducer;
