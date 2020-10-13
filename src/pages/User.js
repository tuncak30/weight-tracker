import React, {useContext} from 'react';
import useTheme from "../hooks/useTheme";
import {GlobalContext} from "../context/GlobalContext";
import {Form, Col, Row, Button, Container} from 'react-bootstrap';
import HomeHeader from "../components/HomeHeader/HomeHeader";
import {Animated} from "react-animated-css";

function User(){
    const {
        state
    } = useContext(GlobalContext);

    return(
        <div>
            {<HomeHeader/>}
        </div>
    )
}

export default User;