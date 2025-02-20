import React,{ useContext } from 'react'
import { autContext } from './../contexts/autContext';
import { Navigate } from 'react-router-dom';

export default function ProtctedRoute({children}) {

    const {isLoggedIn} = useContext(autContext);

    return isLoggedIn? children : <Navigate to="/login"/>
}
