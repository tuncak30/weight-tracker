import React, {useContext} from 'react';
import {Redirect, Route} from "react-router-dom";
import {GlobalContext} from "./context/GlobalContext";

export default function PrivateRoute({ component: Component, ...children }){
    const {initialState} = useContext(GlobalContext);
    const loggedIn = JSON.parse(localStorage.getItem('WEIGHT_TRACKER_DATA')) === null ? initialState.loggedIn : JSON.parse(localStorage.getItem('WEIGHT_TRACKER_DATA')).loggedIn;
    return(
        <Route
            {...children}
            render={props => {
                return loggedIn ? <Component {...props} /> : <Redirect to="/welcome#welcome" />
            }}>
        </Route>
    )
}