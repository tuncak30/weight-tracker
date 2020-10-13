import React, {useContext} from 'react';
import {GlobalContext} from "../../context/GlobalContext";
import './HomeHeader.scss';

export default function HomeHeader(){
    const {state} = useContext(GlobalContext);

    return(
        <header id="home-header" className="clearfix">
            <span id="menu-trigger">{state.user.name}</span>
        </header>
    )
}