import {
    ADD_USER,
    DELETE_USER,
      INISIALIZE_POSSIBLE_SHARE_USER,
    INISIALIZE_SHARED_USER,
    INISIALIZE_USER,
    USER_DELETE,
    USER_UPDATE
} from './actions';






export const initialState = {
    users:[],
    User_Specified_Columns:[],
    possibleShare:[],
    Shared:[],

};

//-----------------------|| CARD REDUCER ||-----------------------//

const UserReducer = (state = initialState, action) => {

    let share
    let supId
    var alam=[]
    switch (action.type) {



        case INISIALIZE_SHARED_USER:
            share=action.payload.card.Share
             supId=action.payload.card.superior_id
            state.Shared=[]
            alam=[]

                for(let i of share){
                    alam.push(i.sharedWith)
                }
                for (let item of state.users) {
                    if (((alam.includes(item._id))) && (!(item.role == 'administrateur')) ||((share.includes(item._id)))) {
                        state.Shared.push(item)
                    }
                }

            return {

                ...state,

            }
    case INISIALIZE_POSSIBLE_SHARE_USER  :
            share=action.payload.card.Share
             supId=action.payload.card.superior_id
            state.possibleShare=[]

                for (let i of share) {
                    alam.push(i.sharedWith)
                }
                if (share.length == 0) {
                    for (let item2 of state.users) {
                        if ((!(item2.role == 'administrateur'))&&(item2._id!=supId)) {

                            state.possibleShare.push(item2)
                        }
                    }
                } else {
                    for (let item of state.users) {
                        if ((!(alam.includes(item._id))) && (!(item.role == 'administrateur')) &&(item._id!=supId)) {
                            state.possibleShare.push(item)
                        }

                }
            }



            return {

                ...state,

            };

        case INISIALIZE_USER:
            state.users=action.payload.users
            for (let user of state.users )
            {
                state.User_Specified_Columns.push([user._id,user.username,user.role])
            }
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
