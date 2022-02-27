import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

// project imports
import config from '../config';

//-----------------------|| GUEST GUARD ||-----------------------//

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */
const Verif_login_Guard = ({ children }) => {
    const account = useSelector((state) => state.account);
    const { isLoggedIn } = account;

    if (isLoggedIn) {


        return <Redirect to={config.defaultPath} />;
    }

    return children;
};

Verif_login_Guard.propTypes = {
    children: PropTypes.node
};

export default Verif_login_Guard;
