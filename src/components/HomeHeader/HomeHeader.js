import React, {useContext} from 'react';
import {GlobalContext} from "../../context/GlobalContext";

import './HomeHeader.scss';

export default function HomeHeader(){
    const {initialState} = useContext(GlobalContext);

    return(
        <header id="home-header">
            Hello <span>{initialState.user.name}</span>
        </header>
    )
}