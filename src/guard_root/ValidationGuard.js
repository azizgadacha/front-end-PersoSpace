import PropTypes from 'prop-types';
import React from 'react';

import {Redirect,  useParams} from 'react-router-dom';
import axios from "axios";
import config from "../config";


/**
 * Validation  guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */
const ValidationGuard = async ({ children }) => {
const {token}=   useParams();

    let validation={success:false}


        console.log("wasahbi salekha"+token)

    console.log("hani 3awedt d5alt")
       let response= await axios.post( config.API_SERVER + 'users/validation', {token:token})

                console.log("ilntija hya"+response.data.success)

                if (response.data.success) {
console.log(response.data.success)
                    validation.success=true;
                    return <Redirect to="/login"/>;}

    return <Redirect to="/login"/>;





};

ValidationGuard.propTypes = {
    children: PropTypes.node
};

export default ValidationGuard;
