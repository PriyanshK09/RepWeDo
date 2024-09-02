import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ children, admin }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (admin && user.role !== 'admin') {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default PrivateRoute;
