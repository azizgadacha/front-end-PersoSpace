import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

//-----------------------|| AUTH GUARD ||-----------------------//

const AdministratorGuard = ({ children }) => {
    const account = useSelector((state) => state.account);
    const arr = ["viewAll", "VisualizationOfWorkspace"]
    const  isAdministrator  = (account.user.role=='administrateur'?true:false);
    const contains = arr.some(element => {
        if ((window.location.pathname).includes(element)) {
            return true;
        }
        return false;
    });
    if (!(isAdministrator)&&(contains)) {


        return <Redirect to="/404Page" />;
    }


    return children;
};

AdministratorGuard.propTypes = {
    children: PropTypes.node
};

export default AdministratorGuard;
