import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes';

function Routes() {

    let isUserLoggedIn = false;

    if (localStorage.getItem("Token")){
        isUserLoggedIn = true
    }

    return isUserLoggedIn ? <PrivateRoutes /> : <PublicRoutes />;
}

export default Routes;
