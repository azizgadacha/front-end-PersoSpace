import {ADD, CLICK, CLOSE  } from './actions';




export const initialState = {
   Workspace:[]

};

//-----------------------|| CARD REDUCER ||-----------------------//

const WorkspaceStore = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {
        case ADD:
         const work=action.payload.work
            console.log("apartir")

            console.log(work)
         state.Workspace=state.Workspace.concat(work)
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
