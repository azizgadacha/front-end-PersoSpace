import {ADD_USER, DELETE_USER, INISIALIZE_FILTRED_USER, INISIALIZE_USER, USER_DELETE} from './actions';





export const initialState = {
    users:[],
    filtred:[]

};

//-----------------------|| CARD REDUCER ||-----------------------//

const UserReducer = (state = initialState, action) => {



    switch (action.type) {
        case INISIALIZE_FILTRED_USER:
            let share=action.payload.card
            state.filtred=[]
            for(let item of state.users){
                console.log("kkkkkkkkkkk")
                console.log(item)

                if(!share.includes(item._id)){
                    state.filtred.push(item)
                }

            }

            return {

                ...state,

            };

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


        default:
            return {...state};


    }};

export default UserReducer;
