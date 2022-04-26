import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import {Redirect, useParams} from 'react-router-dom';
import axios from "axios";
import configData from "../config";

//-----------------------|| AUTH GUARD ||-----------------------//

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node

 */



 function traitement({children}, token) {
     axios
        .post(configData.API_SERVER + 'users/validation', {token})
        .then(function (response) {
            return children;


        })
        .catch(function (error) {

            return <Redirect to="/login"/>;


        });

}


const ValidationGuard =  ({children}) => {
    let {token} = useParams()
    let res = children


    let c = traitement({children}, token);


                 return <Redirect to="/login"/>;

}

ValidationGuard.propTypes = {
    children: PropTypes.node
};

export default ValidationGuard;
