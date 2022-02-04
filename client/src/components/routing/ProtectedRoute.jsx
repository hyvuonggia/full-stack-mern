import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/esm/Spinner';
import NavbarMenu from '../layout/NavbarMenu';

const ProtectedRoute = () => {
    const { authState } = useContext(AuthContext);
    const { authLoading, isAuthenticated } = authState;

    if (authLoading) {
        return (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    }

    return isAuthenticated ? (
        <>
            <NavbarMenu />
            <Outlet />
        </>
    ) : (
        <Navigate to='/login' />
    );
};

export default ProtectedRoute;
