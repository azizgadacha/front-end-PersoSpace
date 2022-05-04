import {

    INISIALIZE_SOCKET,

} from './actions';






export const initialState = {
socket:null

};

//-----------------------|| CARD REDUCER ||-----------------------//

const SocketReducer = (state = initialState, action) => {



    switch (action.type) {
        case INISIALIZE_SOCKET:
            state.socket=action.payload.socket

            return {

                ...state,
            };

        default:
            return {...state};


    }};

export default SocketReducer;
