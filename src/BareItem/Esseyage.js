import {dashboard} from './dashboard';
import {utilities} from './utilities';
import {useSelector} from "react-redux";
import {ShareWorkspace} from "./ShareWorkspace";


//-----------------------|| MENU ITEMS ||-----------------------//


//     const account = useSelector((state) => state.account);
const Essayage=()=>{
    const account = useSelector((state) => state.account);
if (!account.user){

   return { items: [dashboard, utilities]}
}else
{    if (account.user.role==="administrateur")
    return {
    items: [dashboard, utilities,ShareWorkspace]
}
else
    return {
        items: [dashboard,ShareWorkspace]
}}}
export default Essayage
