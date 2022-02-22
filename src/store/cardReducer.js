



export const initialState = {
    cards:[{id:1},{id:1},{id:1}]
};


//-----------------------|| CARD REDUCER ||-----------------------//

const cardReducer = (state = initialState, action) => {

    //const [listecard, addcart] = useState({cards:});

    switch (action.type) {
        case "ajout":
            console.log(state.cards.push(action.card))
console.log(state)
            return {
             ...state

            };
        case "supprimer":
            const index = state.cards.indexOf({id:1});
console.log("index is "+index)
                state.cards.splice(index, 1);


            return {
                ...state

            };
        default:
            return state;


}};

export default cardReducer;
