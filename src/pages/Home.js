import React, {useContext, useState} from 'react';
import useTheme from "../hooks/useTheme";
import {GlobalContext} from "../context/GlobalContext";
import {Form, Col, Row, Button, Container} from 'react-bootstrap';
import HomeHeader from "../components/HomeHeader/HomeHeader";
import {MONTHS, onlyNumbers} from "../StaticData";
import {Animated} from "react-animated-css";
import '../styles/Home.scss';
import CalorieCalculator from "../components/CalorieCalculator/CalorieCalculator";
import SportTracker from "../components/SportTracker/SportTracker";
import WeightFluctuation from "../components/WeightFluctuation/WeightFluctuation";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import PastDaysView from "../components/PastDaysView/PastDaysView";
function Home(){
    const {
        state,
        addCurrentWeight,
        addTodaysWeight
    } = useContext(GlobalContext);

    const [todaysWeight, setTodaysWeight] = useState('');
    const date = new Date();
    const myEventsList = alterWeightArray(state.kgs);
    const [theme, setTheme] = useTheme(localStorage.getItem('WEIGHT_TRACKER_THEME') === null ? state.theme : localStorage.getItem('WEIGHT_TRACKER_THEME'));
    const [todaysWeightValidated, setTodaysWeightValidated] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const calendarRef = React.createRef()

    const todaysWeightFormSubmit = (event) => {
        const todaysWeightForm = event.currentTarget;
        if (todaysWeightForm.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (todaysWeightForm.checkValidity() === true) {
            event.preventDefault();
            setTodaysWeight('');
            addTodaysWeight(todaysWeight);
            addCurrentWeight(todaysWeight);
            let calendarApi = calendarRef.current.getApi();
            let lastWeightObj = state.kgs[state.kgs.length - 1];
            let lastWeight = parseFloat(lastWeightObj.title.split(" ")[0]);

            calendarApi.addEvent({
                backgroundColor: todaysWeight - lastWeight <= 0 ? "#04DC71" : "#FA114F",
                difference: Math.round((todaysWeight - lastWeight) * 10) / 10,
                end: new Date().getTime(),
                fluctuation: todaysWeight - lastWeight <= 0 ? "down" : "up",
                start: new Date().getTime(),
                title: todaysWeight + " (" + (todaysWeight - lastWeight <= 0 ? "-" : "+") + (Math.round(Math.abs(todaysWeight - lastWeight) * 10) / 10) + "kg)"
            })
        }
        setTodaysWeightValidated(true);
    }

    function alterWeightArray(array){
        for(let i=0; i<array.length; i++){
            if(array[i+1]){
                let last = parseFloat(array[i+1].title.split(" ")[0]);
                let prev = parseFloat(array[i].title.split(" ")[0]);
                let fluctuation = Number.isInteger(last - prev) ? (Math.round(last - prev) * 100) / 100 : last - prev;
                let sign = '';
                if(fluctuation > 0){
                    sign = '+';
                }
                if(parseFloat(array[i+1].title.split(" ")[0]) <= parseFloat(array[i].title.split(" ")[0])){
                    array[i+1] = {...array[i+1], fluctuation: 'down'}
                    array[i+1] = {...array[i+1], backgroundColor: '#04DC71'}
                }
                else{
                    array[i+1] = {...array[i+1], fluctuation: 'up'}
                    array[i+1] = {...array[i+1], backgroundColor: '#FA114F'}
                }
                array[i+1] = {...array[i+1], difference: fluctuation}
                array[i+1] = {
                    ...array[i+1],
                    title: array[i+1].title.indexOf('(') > 0 ?
                        array[i+1].title.substring(0, array[i+1].title.indexOf('(')).trim() + ' (' + sign + Math.round(fluctuation * 10) / 10 +' kg)' :
                        array[i+1].title + ' (' + sign + Math.round(fluctuation * 10) / 10 +' kg)'
                }
            }
        }
        return array;
    }

    function handleDateSelect(info){
        setSelectedDate(info.start)
    }

    function isToday (date){
        const today = new Date()
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    return(
        <>
            <Container fluid className="d-none d-md-block">
                <Row>
                    <Col className="p-0 position-fixed over-right-col" xl={6} lg={6} md={6} sm={6} xs={12}>
                        <div id="calendar-container">
                            <Animated
                                animationIn="fadeIn"
                                animationOut="fadeOut"
                                animationInDelay={100}
                                isVisible={true}>
                                <FullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: ''
                                    }}
                                    ref={calendarRef}
                                    height={window.innerHeight}
                                    initialView='dayGridMonth'
                                    select={handleDateSelect}
                                    editable={false}
                                    selectable={true}
                                    selectMirror={true}
                                    dayMaxEvents={true}
                                    weekends={true}
                                    initialEvents={myEventsList}
                                />
                            </Animated>
                        </div>
                    </Col>
                    <Col className="p-0 offset-6" xl={6} lg={6} md={6} sm={6} xs={12}>
                        <HomeHeader/>
                        <div id="weight-track-container">
                            {
                                isToday(selectedDate) ?
                                    <>
                                        <Animated
                                            animationIn="fadeIn"
                                            animationOut="fadeOut"
                                            animationInDelay={100}
                                            isVisible={true}>
                                            <p className="welcome-texts smaller-texts-subpages">
                                                Today is <span id="current-date">{date.getDate() + " " + MONTHS[date.getMonth() + 1] + " " + date.getFullYear()}</span>
                                            </p>
                                            {
                                                isNaN(myEventsList[myEventsList.length - 1].difference) ? null :
                                                    myEventsList[myEventsList.length - 1].difference === 0 ?
                                                        <p className="welcome-texts smaller-texts-subpages">You maintained your weight! That is still nice, at least you didn't gain weight, right? Hehe :)</p> :
                                                        myEventsList[myEventsList.length - 1].difference < 0 ?
                                                        <p className="welcome-texts smaller-texts-subpages">You lost <b>{Math.round(Math.abs(myEventsList[myEventsList.length - 1].difference) * 100) / 100}</b> kg! This is awesome!</p> :
                                                        <p className="welcome-texts smaller-texts-subpages">You gained <b>{Math.round(Math.abs(myEventsList[myEventsList.length - 1].difference) * 100) / 100}</b> kg! Don't worry, you'll do better!</p>
                                            }

                                            {
                                                (state.user.currentWeight - state.user.targetWeight <=0 ) ?
                                                    <p className="welcome-texts smaller-texts-subpages">Congratulations! You did it! You have reached your target weight!</p>
                                                    :
                                                    <p className="welcome-texts smaller-texts-subpages">You are <b id="weight-difference">{Math.round((state.user.currentWeight - state.user.targetWeight) * 10 ) / 10} kgs</b>  away from your goal! Get on that scale right now and kick its ass!</p>
                                            }
                                        </Animated>
                                        <Animated
                                            className="mt-2"
                                            animationIn="fadeIn"
                                            animationOut="fadeOut"
                                            animationInDelay={400}
                                            isVisible={true}>
                                            <Form
                                                noValidate
                                                validated={todaysWeightValidated}
                                                onSubmit={todaysWeightFormSubmit}>
                                                <Form.Row>
                                                    <Form.Group as={Col}>
                                                        <Form.Control
                                                            size="sm"
                                                            required
                                                            placeholder="Today's weight..."
                                                            maxLength="5"
                                                            type="text"
                                                            value={todaysWeight}
                                                            onChange={(e) => {
                                                                if (e.target.value === '' || onlyNumbers.test(e.target.value)) {
                                                                    setTodaysWeight(e.target.value);
                                                                }
                                                            }}/>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col}>
                                                        <Button
                                                            variant={"link"}
                                                            type="submit"
                                                            size="sm"
                                                            className="dark-button float-right">Add Weight
                                                        </Button>
                                                    </Form.Group>
                                                </Form.Row>
                                            </Form>
                                        </Animated>
                                        <Animated
                                            className="mt-2"
                                            animationIn="fadeIn"
                                            animationOut="fadeOut"
                                            animationInDelay={600}
                                            isVisible={true}>
                                            <WeightFluctuation/>
                                        </Animated>
                                        <Animated
                                            className="mt-2"
                                            animationIn="fadeIn"
                                            animationOut="fadeOut"
                                            animationInDelay={800}
                                            isVisible={true}>
                                            <CalorieCalculator/>
                                        </Animated>
                                        <Animated
                                            className="mt-2"
                                            animationIn="fadeIn"
                                            animationOut="fadeOut"
                                            animationInDelay={900}
                                            isVisible={true}>
                                            <SportTracker/>
                                        </Animated>
                                    </>
                                    :
                                    <>
                                        <PastDaysView date={selectedDate} />
                                    </>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;