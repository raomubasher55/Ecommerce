import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const { auth } = useAuth();
    
    useEffect(() => {
        const authCheck = async () => {
            const authData = localStorage.getItem('auth');
            if (authData) {
                const parsedData = JSON.parse(authData);
                const accessToken = parsedData.accessToken;

                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth-admin`, {
                        method: "GET",
                        headers: {
                            "Authorization": accessToken
                        },
                    });

                    const data = await response.json();
                    console.log(data);
                    if (data.success) {
                        setOk(true);
                    } else {
                        setOk(false);
                    }
                } catch (error) {
                    console.error('Error during auth check:', error);
                    setOk(false);
                }
            } else {
                setOk(false);
            }
        };

        authCheck();
    }, []);

    return (
        ok ? <Outlet /> : <Spinner path='' />
    );
};

export default AdminRoute;
