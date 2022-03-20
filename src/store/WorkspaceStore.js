
import {
    ADD,
    ADDINSIDEWORKSPACE,
    CLICK,
    CLOSE,
    DELETE, DELETEINSIDEWORKSPACE,
    IDWORKSPACE,
    INISIALIZE,
    INISIALIZEINSIDEWORKSPACE
} from './actions';





export const initialState = {
   Workspace:[],
    InsideWorkspace:[],
    id:null

};

//-----------------------|| CARD REDUCER ||-----------------------//

const WorkspaceStore = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {
        case INISIALIZE:



            state.Workspace=action.payload.work
            return {

                ...state,

            };
        case INISIALIZEINSIDEWORKSPACE:



            state.InsideWorkspace=action.payload.work
            return {

                ...state,

            };
        case ADD:



            state.Workspace=state.Workspace.concat(action.payload.work)
            return {

                ...state,

            };
        case ADDINSIDEWORKSPACE:



            state.InsideWorkspace=state.InsideWorkspace.concat(action.payload.work)
            return {

                ...state,

            };

        case DELETE:
            const deleteWork=action.payload.work
            console.log("Store Delete")
            console.log(deleteWork[0].WorkspaceName)
            console.log(state.Workspace)
        let index = 0;
            var filteredObj = state.Workspace.find(function(item, i){
                if((item.WorkspaceName === deleteWork[0].WorkspaceName)&&(item.description===deleteWork[0].description)){
                    index = i;
                    return i;
                    //console.log(i)

                }
            });
            state.Workspace.splice(index,1)
            console.log(index, filteredObj);

            return {
                ...state
            }
        case DELETEINSIDEWORKSPACE:
            const deleteinsideWork=action.payload.work
            console.log("Store Delete")
            console.log(deleteinsideWork[0].WorkspaceName)
            console.log(state.Workspace)
            let index1 = 0;
            var filteredObj = state.InsideWorkspace.find(function(item, i){
                if((item.WorkspaceName === deleteinsideWork[0].WorkspaceName)&&(item.description===deleteinsideWork[0].description)){
                    index1 = i;
                    return i;
                    //console.log(i)

                }
            });
            state.InsideWorkspace.splice(index1,1)
            console.log(index1, filteredObj);

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
