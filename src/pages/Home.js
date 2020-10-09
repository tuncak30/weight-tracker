import React, {useContext, useEffect, useState} from 'react';
import useTheme from "../hooks/useTheme";
import {GlobalContext} from "../context/GlobalContext";
import {Form, Col, Row, Button, Container} from 'react-bootstrap';
import HomeHeader from "../components/HomeHeader/HomeHeader";
import {MONTHS, onlyNumbers} from "../StaticData";
import {Animated} from "react-animated-css";
import '../styles/Home.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalorieCalculator from "../components/CalorieCalculator/CalorieCalculator";
import SportTracker from "../components/SportTracker/SportTracker";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import WeightFluctuation from "../components/WeightFluctuation/WeightFluctuation";
function Home(){
    const {
        initialState,
        state,
        addCurrentWeight,
        addTodaysWeight
    } = useContext(GlobalContext);

    const [todaysWeight, setTodaysWeight] = useState('');
    const localizer = momentLocalizer(moment)
    const date = new Date();
    const myEventsList = alterWeightArray(state.kgs);
    const [theme, setTheme] = useTheme(localStorage.getItem('WEIGHT_TRACKER_THEME') === null ? state.theme : localStorage.getItem('WEIGHT_TRACKER_THEME'));

    useEffect(() => {
        fetch('https://trackapi.nutritionix.com/v2/search/instant?query=apple', {
            method: 'GET',
            headers: {
                'x-app-id' : '584f030a',
                'x-app-key': '58d2f134b9af844489da96d2a5e14202'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }, [])

    function alterWeightArray(array){
        for(let i=0; i<array.length; i++){
            if(array[i+1]){
                let fluctuation = (Math.round(parseFloat(array[i+1].title.split(" ")[0]) - parseFloat(array[i].title.split(" ")[0])) * 10) / 10;
                let sign = '';
                if(fluctuation > 0){
                    sign = '+';
                }
                if(parseFloat(array[i+1].title.split(" ")[0]) <= parseFloat(array[i].title.split(" ")[0])){
                    array[i+1] = {...array[i+1], fluctuation: 'down'}
                }
                else{
                    array[i+1] = {...array[i+1], fluctuation: 'up'}
                }
                array[i+1] = {...array[i+1], difference: fluctuation}
                array[i+1] = {...array[i+1], title: array[i+1].title + sign + fluctuation +' kg)'}
            }
        }
        return array;
    }

    function determineBg(event) {
        let backgroundColor = '';
        if(event.fluctuation === 'down'){
            backgroundColor =  '#04DC71';
        }
        else{
            backgroundColor = '#FA114F';
        }
        let style = {
            backgroundColor: backgroundColor,
        };
        return {
            style: style
        };
    }

    return(
        <>
            <Container fluid>
                <Row>
                    <Col className="p-0" xl={6} lg={6} md={6} sm={6} xs={12}>
                        <div id="calendar-container">
                            <Animated
                                animationIn="fadeIn"
                                animationOut="fadeOut"
                                animationInDelay={100}
                                isVisible={true}>
                            <Calendar
                                localizer={localizer}
                                events={myEventsList}
                                startAccessor="start"
                                endAccessor="end"
                                eventPropGetter={(determineBg)}
                                style={{ height: window.innerHeight }}
                            />
                            </Animated>
                        </div>
                    </Col>
                    <Col className="p-0" xl={6} lg={6} md={6} sm={6} xs={12}>
                        <HomeHeader/>
                        <div id="weight-track-container">
                            <Animated
                                animationIn="fadeIn"
                                animationOut="fadeOut"
                                animationInDelay={100}
                                isVisible={true}>

                                <p
                                    className="welcome-texts smaller-texts">
                                    Today is <span id="current-date">{date.getDate() + " " + MONTHS[date.getMonth() + 1] + " " + date.getFullYear()}</span>
                                    {
                                        isNaN(myEventsList[myEventsList.length - 1].difference) ? null :
                                            myEventsList[myEventsList.length - 1].difference < 0 ?
                                            <p>You lost <b>{Math.abs(myEventsList[myEventsList.length - 1].difference)}</b> kg yesterday! This is awesome!</p> :
                                            <p>You gained <b>{Math.abs(myEventsList[myEventsList.length - 1].difference)}</b> kg yesterday! Don't worry, you'll do better today!</p>
                                    }

                                </p>
                                {
                                    (state.user.currentWeight - state.user.targetWeight <=0 ) ?
                                        <p className="welcome-texts smaller-texts">Congratulations! You did it! You have reached your target weight!</p>
                                        :
                                        <p className="welcome-texts smaller-texts">You are <b id="weight-difference">{Math.round((state.user.currentWeight - state.user.targetWeight) * 10 ) / 10} kgs</b>  away from your goal! Get on that scale right now and kick its ass!</p>
                                }
                            </Animated>
                            <Animated
                                className="mt-2"
                                animationIn="fadeIn"
                                animationOut="fadeOut"
                                animationInDelay={400}
                                isVisible={true}>
                                <Form className="clearfix">
                                    <Form.Group>
                                        <Form.Row>
                                            <Col className="weight">
                                                <Form.Control
                                                    className="form-control"
                                                    placeholder="Today's weight..."
                                                    maxLength="5"
                                                    type="text" value={todaysWeight}
                                                    onChange={(e) => {
                                                        if (e.target.value === '' || onlyNumbers.test(e.target.value)) {
                                                            setTodaysWeight(e.target.value);
                                                        }
                                                    }}/>
                                            </Col>
                                        </Form.Row>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Row className="float-right">
                                            <Col>
                                                <Button
                                                    variant={"link"}
                                                    onClick={() => {
                                                        setTodaysWeight('');
                                                        addTodaysWeight(todaysWeight);
                                                        addCurrentWeight(todaysWeight);
                                                    }}
                                                    className="dark-button">Add Weight
                                                </Button>
                                            </Col>
                                        </Form.Row>
                                    </Form.Group>
                                </Form>
                            </Animated>
                            <Animated
                                className="mt-4"
                                animationIn="fadeIn"
                                animationOut="fadeOut"
                                animationInDelay={600}
                                isVisible={true}>
                                <WeightFluctuation/>
                            </Animated>
                            <Animated
                                className="mt-4"
                                animationIn="fadeIn"
                                animationOut="fadeOut"
                                animationInDelay={800}
                                isVisible={true}>
                                <CalorieCalculator/>
                            </Animated>
                            <Animated
                                className="mt-4"
                                animationIn="fadeIn"
                                animationOut="fadeOut"
                                animationInDelay={1000}
                                isVisible={true}>
                                <SportTracker/>
                            </Animated>
                        </div>

                    </Col>

                </Row>
            </Container>
        </>
    );
}

export default Home;