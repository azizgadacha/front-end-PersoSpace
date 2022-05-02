import {ADD_USER, DELETE_USER, INISIALIZE_FILTRED_USER, INISIALIZE_USER, USER_DELETE, USER_UPDATE} from './actions';






export const initialState = {
    users:[],
    filtred:[]

};

//-----------------------|| CARD REDUCER ||-----------------------//

const UserReducer = (state = initialState, action) => {



    switch (action.type) {
        case INISIALIZE_FILTRED_USER:
            let share=action.payload.card.Share
            console.log(share)
            let userId=action.payload.userId
            console.log("im the userId")
            state.filtred=[]
            var alam=[]
            if(action.payload.location=='Remove'){
                for(let i of share){
                    alam.push(i[0])
                }
                for (let item of state.users) {
                    if (((alam.includes(item._id))) && (!(item.role == 'administrateur')) ||((share.includes(item._id)))) {
                        state.filtred.push(item)
                    }
                }

            }
            else {
                if (userId != null)
                    share.push(userId)
                for (let i of share) {
                    alam.push(i[0])
                }
                if (share.length == 0) {
                    for (let item2 of state.users) {
                        if (!(item2.role == 'administrateur')) {

                            state.filtred.push(item2)
                        }
                    }
                } else {
                    console.log("alam")
                    for (let item of state.users) {
                        if ((!(alam.includes(item._id))) && (!(item.role == 'administrateur')) && ((!share.includes(item._id)))) {
                            state.filtred.push(item)
                        }
                    }
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
                if((item._id===deleteUser._id)){
                    index = i;
                    return i;

                }
            });
            state.users.splice(index,1)





            return {
                ...state
            }
        case USER_UPDATE:
           // deleteUser=action.payload.user

            let {user}=action.payload

             let index1 = 0;
            state.users.find(function(item, i){
                if((item._id===user._id)){
                    index1 = i;
                    return i;

                }
            });



            state.users[index1]=user
            return {
                ...state
            }


        default:
            return {...state};


    }};

export default UserReducer;
