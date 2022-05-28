import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

//-----------------------|| AUTH GUARD ||-----------------------//

const SimpleUserGuard = ({ children }) => {
    const account = useSelector((state) => state.account);
    console.log("je qqqqqqqqqqqqqqqqqqqqqqqqqs")
    console.log(window.location.pathname)
    const  isSimpleEmployer  = (account.user.role==='simple employer'?true:false);
    console.log("alam")
    console.log(account.user.role)


    if (!(isSimpleEmployer)) {


        return <Redirect to="/404Page" />;
    }


    return children;
};

SimpleUserGuard.propTypes = {
    children: PropTypes.node
};

export default SimpleUserGuard;
