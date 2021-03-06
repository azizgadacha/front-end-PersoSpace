import {
    OPEN_MODAL,
    CLOSE_MODAL,
    OPEN_DELETE_MODAL,
    CLOSE_DELETE_MODAL,

    OPEN_MODAL_SHARE,
    OPEN_MODAL_INFORMATION,
    CLOSE_MODAL_INFORMATION,
    CLOSE_MODAL_SHARE,
    Confirm_Share_Workspace_MODAL,
    CLOSE_Confirm_Share_Workspace_MODAL

    ,
    OPEN_WIDGET_MODAL,
    CLOSE_WIDGET_MODAL,
    IS_LOADING_CHANGE,
    OPEN_EDIT_MODAL,
    ClOSE_EDIT_MODAL,
    OPEN_MODAL_Remove,
    CLOSE_MODAL_REMOVE, OPEN_MODAL_REMOVE, Confirm_Remove_Share_MODAL, CLOSE_Confirm_Remove_Share_MODAL,

} from './actions';




export const initialState = {
    Modal_Edit_State:false,
    ModalState:false,
    ModalEditState:false,
    ModalInformation:false,
    ModalStateRemove:false,
    ModalStateShare:false,
    ModalConfirmShare:false,
    ModalConfirmRemove:false,
    ModalDeleteState:false,
    isSubmitting:false,
    ModalInsideDeleteState:false,
    card:null,
    ModalWidget:false,
    objet:null,
    user:null,



};


//-----------------------|| CARD REDUCER ||-----------------------//

const ModalReducer = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});
let objet;
let card;
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

             card=action.payload.card


            return {

                ...state,
                card,
                ModalStateShare:true,



            };
        case OPEN_MODAL_REMOVE:

            card=action.payload.card


            return {

                ...state,
                card,
                ModalStateRemove:true,



            };
        case CLOSE_MODAL:

            return {
                ...state,
                ModalState:false


            };
        case CLOSE_MODAL_REMOVE:

            return {
                ...state,
                ModalStateRemove:false


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
        case Confirm_Remove_Share_MODAL:
            objet=action.payload.objet
            return {

                ...state,
                objet,
                ModalConfirmRemove:true,

            };
        case CLOSE_Confirm_Share_Workspace_MODAL:
            return {

                ...state,
                ModalConfirmShare:false

            };
        case CLOSE_Confirm_Remove_Share_MODAL:
            return {

                ...state,
                ModalConfirmRemove:false

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
        case CLOSE_MODAL_INFORMATION:

            return {
                ...state,
                ModalInformation:false


            };
            case OPEN_MODAL_INFORMATION:
                state.user=action.payload.user

            return {
                ...state,
                ModalInformation:true


            };



        case IS_LOADING_CHANGE:
                return{
            ...state,
                    isSubmitting:!state.isSubmitting

            }

        case CLOSE_WIDGET_MODAL:

            return {
                ...state,
                ModalWidget:false


            };
        default:
            return {...state};


    }};

export default ModalReducer;
