import { dashboard } from './dashboard';
import { utilities } from './utilities';
import {useSelector} from "react-redux";
import MainLayout from "../views/Scolette_du_Dashboard";

//-----------------------|| MENU ITEMS ||-----------------------//


//     const account = useSelector((state) => state.account);
     const menuItems = {


         items: [dashboard, utilities]
}
export default menuItems
