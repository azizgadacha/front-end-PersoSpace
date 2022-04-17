import { dashboard } from './dashboard';
import { utilities } from './utilities';
import {useSelector} from "react-redux";
import MainLayout from "../views/Scolette_du_Dashboard";
import {ShareWorkspace} from "./ShareWorkspace";

//-----------------------|| MENU ITEMS ||-----------------------//


//     const account = useSelector((state) => state.account);
     const menuItems = {


         items: [dashboard, utilities,ShareWorkspace]
}
export default menuItems
