import React, {useContext} from 'react';
import {GlobalContext} from "../../context/GlobalContext";

import './HomeHeader.scss';

export default function HomeHeader(){
    const {initialState} = useContext(GlobalContext);

    return(
        <header id="home-header" className="clearfix">
            <span id="menu-trigger">{initialState.user.name}</span>
        </header>
    )
}