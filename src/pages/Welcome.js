import React, {useEffect, useState, useContext} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { HashNavigation } from 'swiper';

import {Form, Col, Row, Button, Container} from 'react-bootstrap';
import {BrowserRouter as Router, NavLink, Switch} from 'react-router-dom';
import '../styles/Welcome.scss';
import 'swiper/swiper.scss';
import {GlobalContext} from "../context/GlobalContext";
import {Animated} from "react-animated-css";
import {THEMES, onlyNumbers} from "../StaticData";
import useTheme from "../hooks/useTheme";
SwiperCore.use([HashNavigation]);

function Welcome(){
    const {
        state,
        login,
        addName,
        addAge,
        addGender,
        addHeight,
        addCurrentWeight,
        addTodaysWeight,
        addTargetWeight,
        changeTheme} = useContext(GlobalContext);
    const [username, setUsername] = useState(state.user.name);
    const [gender, setGender] = useState(state.user.gender);
    const [theme, setTheme] = useTheme(localStorage.getItem('WEIGHT_TRACKER_THEME') === null ? state.theme : localStorage.getItem('WEIGHT_TRACKER_THEME'));
    const [age, setAge] = useState(state.user.age);
    const [height, setHeight] = useState(state.user.height);
    const [currentWeight, setCurrentWeight] = useState(state.user.currentWeight);
    const [targetWeight, setTargetWeight] = useState(state.user.targetWeight);
    const [swiper, setSwiper] = useState();

    function stepOneSubmitHandler(e){
        e.preventDefault();
        swiper.slideTo(1);
    }

    function stepTwoSubmitHandler(e){
        e.preventDefault();
        addTodaysWeight(currentWeight);
        swiper.slideTo(2);
    }

    function stepThreeSubmitHandler(e){
        login(true);
    }

    function handleTheme(theme){
        setTheme(theme);
        changeTheme(theme);
        localStorage.setItem('WEIGHT_TRACKER_THEME', theme);
    }

    return(
        <div className="vertical-center">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xl={6} lg={6} md={8} sm={10} xs={12}>
                        <Swiper
                            hashNavigation={{
                                watchState: true,
                            }}
                            spaceBetween={50}
                            slidesPerView={1}
                            allowTouchMove={false}
                            onSwiper={(swiper) => setSwiper(swiper)}
                        >
                            <SwiperSlide data-hash="welcome">
                                <Animated
                                    animationIn="fadeIn"
                                    animationOut="fadeOut"
                                    animationInDelay={100}
                                    isVisible={true}>
                                    <p className="text-center welcome-texts big-text">Welcome to weight tracker!</p>
                                </Animated>
                                <Animated
                                    animationIn="fadeIn"
                                    animationOut="fadeOut"
                                    animationInDelay={200}
                                    isVisible={true}>
                                    <p className="text-center welcome-texts smaller-texts">This app will help you lose weight, keep track of what you eat daily, all the exercises that you do and so much more!</p>
                                </Animated>
                                <Animated
                                    animationIn="fadeIn"
                                    animationOut="fadeOut"
                                    animationInDelay={400}
                                    isVisible={true}>
                                <p className="text-center welcome-texts smaller-texts">But before we start, lets know you a little bit more...</p>
                                </Animated>
                                <Animated
                                    animationIn="fadeIn"
                                    animationOut="fadeOut"
                                    animationInDelay={500}
                                    isVisible={true}>
                                    <p className="text-center welcome-texts smaller-texts">What is your name?</p>
                                </Animated>
                                <Animated
                                    animationIn="fadeIn"
                                    animationOut="fadeOut"
                                    animationInDelay={1000}
                                    isVisible={true}>
                                <Form onSubmit={stepOneSubmitHandler}>
                                    <Form.Group>
                                        <Form.Control
                                            name="username"
                                            className="form-control"
                                            placeholder="Your Name..."
                                            type="text" value={username}
                                            onChange={(e) => {
                                                addName(e.target.value);
                                                setUsername(e.target.value)
                                            }}/>
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Button
                                                type="submit"
                                                variant={"link"}
                                                className="dark-button mt-3 float-right">Next (1/3)
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                </Animated>
                            </SwiperSlide>
                            <SwiperSlide data-hash="personal-information">
                                <p className="text-center welcome-texts big-text">Welcome <span id="user-name">{username.charAt(0).toUpperCase() + username.slice(1)}</span>!</p>
                                <p className="text-center welcome-texts smaller-texts">In order to do our magic, we need a little bit more information about you</p>
                                <Form onSubmit={stepTwoSubmitHandler}>
                                    <Form.Group>
                                        <Form.Row>
                                            <Form.Control
                                                className="form-control"
                                                placeholder="Your Age..."
                                                maxLength="3"
                                                type="text" value={age}
                                                onChange={(e) => {
                                                    if (e.target.value === '' || onlyNumbers.test(e.target.value)) {
                                                        addAge(e.target.value);
                                                        setAge(e.target.value);
                                                    }
                                                }}/>
                                        </Form.Row>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control onChange={(e) => {
                                            addGender(e.target.value);
                                            setGender(e.target.value);
                                        }} as="select" value={gender}>
                                            <option value="default">Your Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Row className="height">
                                            <Form.Control
                                                className="form-control"
                                                placeholder="Your Height..."
                                                type="text" value={height}
                                                onChange={(e) => {
                                                    if (e.target.value === '' || onlyNumbers.test(e.target.value)) {
                                                        addHeight(e.target.value);
                                                        setHeight(e.target.value);
                                                    }
                                                }}/>
                                        </Form.Row>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Row>
                                            <Col className="weight">
                                                <Form.Control
                                                    className="form-control weight"
                                                    placeholder="Current Weight..."
                                                    maxLength="5"
                                                    type="text" value={currentWeight}
                                                    onChange={(e) => {
                                                        if (e.target.value === '' || onlyNumbers.test(e.target.value)) {
                                                            addCurrentWeight(e.target.value);
                                                            setCurrentWeight(e.target.value);
                                                        }
                                                    }}/>
                                            </Col>

                                            <Col className="weight">
                                                <Form.Control
                                                    className="form-control"
                                                    placeholder="Target Weight..."
                                                    maxLength="5"
                                                    type="text" value={targetWeight}
                                                    onChange={(e) => {
                                                        if (e.target.value === '' || onlyNumbers.test(e.target.value)) {
                                                            addTargetWeight(e.target.value);
                                                            setTargetWeight(e.target.value);
                                                        }
                                                    }}/>
                                            </Col>
                                        </Form.Row>
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Button
                                                variant={"link"}
                                                onClick={stepTwoSubmitHandler}
                                                className="dark-button mt-3 float-right">Next (2/3)
                                            </Button>
                                        </Col>
                                    </Row>

                                </Form>
                            </SwiperSlide>
                            <SwiperSlide data-hash="theme-selection">
                                <p className="text-center welcome-texts big-text">Okay then! One last step...</p>
                                <p className="text-center welcome-texts smaller-texts">Please select your prefered theme, or you can select <span>auto</span> to leave it to us!</p>
                                <Row className="mt-4">
                                    <Col className="text-center">
                                        <div
                                            className={theme === THEMES.LIGHT_THEME ? 'theme-selector selected-theme-selector' : 'theme-selector'}
                                            onClick={() => {
                                                handleTheme(THEMES.LIGHT_THEME)
                                            }}
                                        >
                                            <img
                                                className="theme-images img-fluid"
                                                src={document.location.origin + '/img/light.png'}
                                                alt="Light Theme"
                                            />
                                        </div>
                                    </Col>
                                    <Col className="text-center">
                                        <div
                                            className={theme === THEMES.DARK_THEME ? 'theme-selector selected-theme-selector' : 'theme-selector'}
                                            onClick={() => {
                                                handleTheme(THEMES.DARK_THEME )
                                            }}
                                        >
                                            <img
                                                className="theme-images img-fluid"
                                                src={document.location.origin + '/img/dark.png'}
                                                alt="Dark Theme"
                                            />
                                        </div>
                                    </Col>
                                    <Col className="text-center">
                                        <div
                                            className={theme === THEMES.AUTO ? 'theme-selector selected-theme-selector' : 'theme-selector'}
                                            onClick={() => {
                                                handleTheme(THEMES.AUTO)
                                            }}
                                        >
                                            <img
                                                className="theme-images img-fluid"
                                                src={document.location.origin + '/img/auto.png'}
                                                alt="Auto Theme"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <NavLink to={"/home"}>
                                        <Button
                                            variant={"link"}
                                            onClick={stepThreeSubmitHandler}
                                            className="dark-button mt-3 float-right">Finish
                                        </Button>
                                        </NavLink>
                                    </Col>
                                </Row>
                            </SwiperSlide>
                        </Swiper>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Welcome;