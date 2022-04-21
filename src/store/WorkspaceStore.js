
import {
    ADD,
    ADDINSIDEWORKSPACE,
    CLICK, CLICKED, CLICKED_INISIALIZE,
    CLOSE,
    DELETE, DELETEINSIDEWORKSPACE,
    IDWORKSPACE,
    INISIALIZE,
    INISIALIZEINSIDEWORKSPACE
} from './actions';





export const initialState = {
   Workspace:[],
    id:null,
    clicked:false,
    listeName:[]

};

//-----------------------|| CARD REDUCER ||-----------------------//

const WorkspaceStore = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {

        case CLICKED:
            state.clicked =true


            return{
            ...state

        };
        case CLICKED_INISIALIZE:
            state.clicked =false
            return{
                ...state

            };

        case INISIALIZE:


            state.Workspace=action.payload.work
            state. listeName=action.payload.listeName
            return {

                ...state,

            };

        case ADD:



            state.Workspace=state.Workspace.concat(action.payload.work)
            return {

                ...state,

            };


        case DELETE:

            const deleteWork=action.payload.work

        let index = 0;
            var filteredObj = state.Workspace.find(function(item, i){
                if((item.WorkspaceName === deleteWork[0].WorkspaceName)&&(item.description===deleteWork[0].description)){
                    index = i;
                    return i;
                    //console.log(i)

                }
            });
            state.Workspace.splice(index,1)

            return {
                ...state
            }
        case DELETEINSIDEWORKSPACE:
            const deleteinsideWork=action.payload.work

            let index1 = 0;
            var filteredObj = state.InsideWorkspace.find(function(item, i){
                if((item.WorkspaceName === deleteinsideWork[0].WorkspaceName)&&(item.description===deleteinsideWork[0].description)){
                    index1 = i;
                    return i;
                    //console.log(i)

                }
            });
            state.InsideWorkspace.splice(index1,1)

            return {



                ...state
            }

        case IDWORKSPACE :
            state.id = action.payload;
            return {
                ...state
            }


        default:

            return {...state};


    }};

export default WorkspaceStore;
