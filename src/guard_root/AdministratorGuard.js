import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

//-----------------------|| AUTH GUARD ||-----------------------//

const AdministratorGuard = ({ children }) => {
    const account = useSelector((state) => state.account);
console.log("je suuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuus")
console.log(window.location.pathname)
    const  isAdministrator  = (account.user.role=='administrateur'?true:false);

    if (!(isAdministrator)) {


        return <Redirect to="/404Page" />;
    }


    return children;
};

AdministratorGuard.propTypes = {
    children: PropTypes.node
};

export default AdministratorGuard;
