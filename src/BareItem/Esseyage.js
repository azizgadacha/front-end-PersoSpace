import {dashboard} from './dashboard';
import {utilities} from './utilities';
import {useSelector} from "react-redux";


//-----------------------|| MENU ITEMS ||-----------------------//


//     const account = useSelector((state) => state.account);
const Essayage=()=>{
    const account = useSelector((state) => state.account);
if (!account.user){

   return { items: [dashboard, utilities]}
}else
{    if (account.user.role==="administrateur")
    return {
    items: [dashboard, utilities]
}
else
    return {
        items: [dashboard]
}}}
export default Essayage
