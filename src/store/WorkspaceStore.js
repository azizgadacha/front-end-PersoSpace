
import {ADD, CLICK, CLOSE, DELETE, INISIALIZE} from './actions';





export const initialState = {
   Workspace:[]

};

//-----------------------|| CARD REDUCER ||-----------------------//

const WorkspaceStore = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {
        case INISIALIZE:

console.log("rani fi workspace store fil inizialize")

            state.Workspace=action.payload.work
            return {

                ...state,

            };
        case ADD:


            console.log("rani fi workspace store fil add")

            state.Workspace=state.Workspace.concat(action.payload.work)
            return {

                ...state,

            };

        case DELETE:
            console.log("rani fi workspace store fil delete")

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


        {/*if (index > -1) {
                state.Workspace.splice(index, 1); // 2nd parameter means remove one item only
            }
            */}

            return {



                ...state
            }

        /*      case "supprimer":
                  const index = state.cards.indexOf({id:1});
                  console.log("index is "+index)
                  state.cards.splice(index, 1);


                  return {
                      ...state

                  };
      */
        default:
            console.log("rani fi workspace store fil return")

            return {...state};


    }};

export default WorkspaceStore;
