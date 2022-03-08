import {ADD,INISIALIZE} from './actions';




export const initialState = {
   Workspace:[]

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
        case ADD:



            state.Workspace=state.Workspace.concat(action.payload.work)
            return {

                ...state,

            };
        /*      case "supprimer":
                  const index = state.cards.indexOf({id:1});
                  console.log("index is "+index)
                  state.cards.splice(index, 1);


                  return {
                      ...state

                  };
      */
        default:
            return {...state};


    }};

export default WorkspaceStore;
