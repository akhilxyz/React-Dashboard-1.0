import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes';

function Routes() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    let isUserLoggedIn = true;

    if (localStorage.getItem("Token")){
        isUserLoggedIn = true
    }

    return isUserLoggedIn ? <PrivateRoutes /> : <PublicRoutes />;
}

export default Routes;
