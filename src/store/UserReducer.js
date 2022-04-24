
import {ADD_USER, DELETE_USER, INISIALIZE_USER, USER_DELETE, USER_UPDATE} from './actions';





export const initialState = {
    users:[]

};

//-----------------------|| CARD REDUCER ||-----------------------//

const UserReducer = (state = initialState, action) => {



    switch (action.type) {
        case INISIALIZE_USER:



            state.users=action.payload.users
            return {

                ...state,

            };
        case ADD_USER:



            state.users=state.users.concat(action.payload.user)

            return {

                ...state,

            };

        case USER_DELETE:
            const deleteUser=action.payload.user



            let index = 0;
            var filteredObj = state.users.find(function(item, i){
                if((item.email===deleteUser.email)){
                    index = i;
                    return i;

                }
            });
            state.users.splice(index,1)





            return {
                ...state
            }
        case USER_UPDATE:
             deleteUser=action.payload.user



             index = 0;
            var filteredObj = state.users.find(function(item, i){
                if((item.email===deleteUser.email)){
                    index = i;
                    return i;

                }
            });
            state.users.splice(index,1)





            return {
                ...state
            }


        default:
            return {...state};


    }};

export default UserReducer;
