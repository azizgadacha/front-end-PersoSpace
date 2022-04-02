
import {ADD_USER, DELETE_USER, INISIALIZE_USER, USER_DELETE} from './actions';





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

            console.log('err')
            console.log(state.users)
            return {

                ...state,

            };

        case USER_DELETE:
            const deleteUser=action.payload.user

            console.log(deleteUser)

            console.log(deleteUser.username)
            console.log(state.users)

            let index = 0;
            var filteredObj = state.users.find(function(item, i){
                if((item.email===deleteUser.email)){
                    index = i;
                    console.log("il index houwa"+i)
                    return i;
                    //console.log(i)

                }
            });
            state.users.splice(index,1)
            console.log(index, filteredObj);




            return {
                ...state
            }


        default:
            return {...state};


    }};

export default UserReducer;
