import { useContext } from 'react';
import { autContext } from './../contexts/autContext';
import { Navigate } from 'react-router-dom';

export default function ProtctedAuthRoute({children}) {
    const {isLoggedIn} = useContext(autContext);
  return isLoggedIn ? <Navigate to={"/"}/> : children
}
