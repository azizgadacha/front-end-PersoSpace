import {
    OPEN_MODAL,
    CLOSE_MODAL,
    OPEN_DELETE_MODAL,
    CLOSE_DELETE_MODAL,

    OPEN_MODAL_SHARE,
    CLOSE_MODAL_SHARE,
    Confirm_Share_Workspace_MODAL,
    CLOSE_Confirm_Share_Workspace_MODAL

    , OPEN_WIDGET_MODAL, CLOSE_WIDGET_MODAL, IS_LOADING_CHANGE, OPEN_EDIT_MODAL, ClOSE_EDIT_MODAL,



    CLOSE_EDIT_MODAL,

} from './actions';




export const initialState = {
    Modal_Edit_State:false,
    ModalState:false,
    ModalEditState:false,

    ModalStateShare:false,
    ModalConfirmShare:false,
    ModalDeleteState:false,
    isSubmitting:false,
    ModalInsideDeleteState:false,
    card:null,
    ModalWidget:false,
    objet:null,



};


//-----------------------|| CARD REDUCER ||-----------------------//

const ModalReducer = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});
let objet;
    switch (action.type) {
        case OPEN_MODAL:

            return {

                ...state,
                ModalState:true,



            };
        /*case OPEN_EDIT_MODAL:
        objet=action.payload.objet
            return {
                 objet,
                ...state,
                Modal_Edit_State:true,



            };

        case CLOSE_EDIT_MODAL:


            return {

                ...state,
                Modal_Edit_State:true,



            };
        */case OPEN_MODAL_SHARE:

            console.log("salut")
            const card=action.payload.card
            console.log("eb3ed ********* ya 5ra")
            console.log(card)

            console.log(state.ModalStateShare)

            return {

                ...state,
                card,
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
        case Confirm_Share_Workspace_MODAL:
             objet=action.payload.objet
            return {

                ...state,
                objet,
                ModalConfirmShare:true,

            };
        case CLOSE_Confirm_Share_Workspace_MODAL:
            return {

                ...state,
                ModalConfirmShare:false

            };
        case OPEN_EDIT_MODAL:
            objet=action.payload.objet
            return {

                ...state,
                objet,
                ModalEditState:true,

            };
        case ClOSE_EDIT_MODAL:

            return {
                ...state,
                ModalEditState:false


            };
        case OPEN_DELETE_MODAL:
        objet=action.payload.objet
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

        case IS_LOADING_CHANGE:
                return{
            ...state,
                    isSubmitting:!state.isSubmitting

            }


        default:
            return {...state};


    }};

export default ModalReducer;
