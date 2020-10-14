import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row, Container, Table, Toast, ToastBody, ToastHeader} from "react-bootstrap";
import ReactDOM from 'react-dom';
import './SportTracker.scss';
import ExerciseSearchResults from "../SearchResults/ExerciseSearchResults";
import useSpinner from "../../hooks/useSpinner";
import {THEMES} from "../../StaticData";
import {GlobalContext} from "../../context/GlobalContext";
import ExerciseResults from "../ExerciseResults/ExerciseResults";

export default function SportTracker(props){
    const {state, addExercise} = useContext(GlobalContext);
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState('');
    const [customExerciseName, setCustomExerciseName] = useState('');
    const [customExerciseBurntCalorie, setCustomExerciseBurntCalorie] = useState('');
    let [totalCaloriesBurnt, setTotalCaloriesBurnt] = useState(0);
    const variant = document.body.classList.contains(THEMES.LIGHT_THEME) ? '' : 'dark';
    const [spinner, showSpinner, hideSpinner] = useSpinner();
    const [finishedExercises, setFinishedExercises] = useState(state.exercises);
    const handleShow = () => setShow(true);
    const [queryFormValidated, setQueryFormValidated] = useState(false);
    const [customQueryFormValidated, setCustomQueryFormValidated] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState('');
    const [toastVariant, setToastVariant] = useState('toast-success');
    for(let i=0; i<state.exercises.length; i++){
        totalCaloriesBurnt = totalCaloriesBurnt + (isToday(state.exercises[i].timestamp) ? state.exercises[i].exercise.nf_calories : 0);
    }
    const handleClose = () => {
        setShow(false);
        setSearchResults([]);
    }

    useEffect(() => {
        setFinishedExercises(state.exercises)
    }, [state.exercises])

    const customQueryFormSubmit = (event) => {
        const customQueryForm = event.currentTarget;
        if (customQueryForm.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (customQueryForm.checkValidity() === true) {
            event.preventDefault();
            addExercise({
                customExercise: true,
                name: customExerciseName,
                nf_calories: parseFloat(customExerciseBurntCalorie)
            });
            setSearchResults([]);
            setShowToast(true);
            setShow(false);
            setToastVariant('toast-success');
            setToastBody('Custom meal successfully added!');
            setCustomExerciseName('');
            setCustomExerciseBurntCalorie('');
        }

        setCustomQueryFormValidated(true);
    }

    const queryFormSubmit = (event) => {
        const queryForm = event.currentTarget;
        if (queryForm.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (queryForm.checkValidity() === true) {
            event.preventDefault();
            setQuery(query);

            if(query.length >= 2){
                showSpinner();
                let opts = {
                    query: query,
                    gender: state.user.gender,
                    weight_kg: state.user.currentWeight,
                    height_cm: state.user.height,
                    age: state.user.age
                }
                fetch('https://trackapi.nutritionix.com/v2/natural/exercise' , {
                    method: 'POST',
                    headers: {
                        'x-app-id' : '584f030a',
                        'x-app-key': '58d2f134b9af844489da96d2a5e14202',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(opts)
                })
                    .then(response => {
                        if(response.status == 404){
                            throw new Error();
                        }
                        else{
                            return response.json()
                        }
                    })
                    .then(data => {
                        if(data.exercises){
                            hideSpinner();
                            setQuery('');
                            setSearchResults(data.exercises)
                        }
                    }).catch(function() {
                    hideSpinner();
                    setQuery('');
                    setShow(false);
                    setShowToast(true);
                    setToastVariant('toast-fail');
                    setToastBody('Your search query doesn\'t have any results, you can try a different one or enter your own custom exercise name and burnt calories')
                });
            }
            else{
                setSearchResults([]);
            }
        }
        setQueryFormValidated(true);
    }

    function openExerciseSelectPopup(){
        setShow(true);
    }

    function setSelectedExercises(exercise){
        addExercise(exercise);
        setSearchResults([]);
        setShowToast(true);
        setShow(false);
        setToastVariant('toast-success');
        setToastBody('Exercise successfully added!');
    }

    function isToday (date){
        const d = new Date(date);
        const today = new Date();
        return d.getDate() == today.getDate() &&
            d.getMonth() == today.getMonth() &&
            d.getFullYear() == today.getFullYear()
    }

    function getTodaysExercise(exercises){
        let todaysExercises = new Array();
        for(var i=0; i<exercises.length; i++){
            if(isToday(exercises[i].timestamp)){
                todaysExercises.push(exercises[i]);
            }
        }
        return todaysExercises;
    }

    return(
        <>
            {ReactDOM.createPortal(<Toast className={toastVariant} onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
                <Toast.Body>{toastBody}</Toast.Body>
            </Toast>, document.getElementById('portal'))}

            <div className="custom-section-containers clearfix">
                {ReactDOM.createPortal(spinner, document.getElementById('portal'))}
                <div className="custom-section-headers">Exercise Tracker</div>

                <Modal
                    show={show}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    size="lg"
                    onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Exercise Entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            noValidate
                            validated={queryFormValidated}
                            onSubmit={queryFormSubmit}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Control
                                        size="sm"
                                        id="food-query-input"
                                        required
                                        placeholder="Enter query..."
                                        type="text"
                                        defaultValue={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                        }}/>
                                    <Button
                                        variant={"link"}
                                        id="search-food"
                                        type="submit"
                                        size="sm"
                                        className="dark-button">
                                        Search
                                    </Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        {
                            searchResults.length > 0 ?
                                <Table variant={variant} striped bordered hover size="sm">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Duration</th>
                                        <th>Calories</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {searchResults.map((item, i) =>
                                        <ExerciseSearchResults
                                            key={item.tag_id}
                                            handleClick={() => setSelectedExercises(item)}
                                            data={item}>
                                        </ExerciseSearchResults>
                                    )}
                                    </tbody>
                                </Table>
                                :
                                <>
                                    <p className="welcome-texts smaller-texts-subpages">Enter your workouts for example, "I ran 3 kms", "30 min weight lifting" or "25 min yoga"...</p>
                                    <div id="divider"><span>OR</span></div>
                                    <p className="welcome-texts smaller-texts-subpages">You can enter a custom exercise</p>
                                    <Form
                                        noValidate
                                        validated={customQueryFormValidated}
                                        onSubmit={customQueryFormSubmit}>
                                        <Form.Row>
                                            <Col xl={6} lg={6} md={5}>
                                                <Form.Control
                                                    size="sm"
                                                    required
                                                    placeholder="Exercise name..."
                                                    type="text"
                                                    defaultValue={customExerciseName}
                                                    onChange={(e) => {
                                                        setCustomExerciseName(e.target.value);
                                                    }}/>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <Form.Control
                                                    size="sm"
                                                    required
                                                    placeholder="Burnt Calories..."
                                                    type="text"
                                                    defaultValue={customExerciseBurntCalorie}
                                                    onChange={(e) => {
                                                        setCustomExerciseBurntCalorie(e.target.value);
                                                    }}/>
                                            </Col>
                                            <Col xl={2} lg={2} md={3}>
                                                <Button
                                                    block
                                                    variant={"link"}
                                                    type="submit"
                                                    size="sm"
                                                    className="add-buttons">
                                                    Add Exercise
                                                </Button>
                                            </Col>
                                        </Form.Row>
                                    </Form>
                                </>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant={"link"}
                            size="sm"
                            className="dark-button"
                            onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {

                    getTodaysExercise(finishedExercises).length === 0 ?
                        <p className="welcome-texts smaller-texts-subpages text-center pt-1 pb-1 mt-3 mb-3">You haven't enter any data for today yet</p> :
                        <>
                            <p className="welcome-texts smaller-texts-subpages pt-1 pb-1 mt-1 mb-1">You entered exercises listed below for today</p>
                            {
                                getTodaysExercise(finishedExercises).map((item, i) =>
                                    <ExerciseResults data={item.exercise} key={item.exercise.name} />
                                )
                            }
                            <p className="welcome-texts smaller-texts-subpages pt-1 pb-1 mt-1 mb-3"><b>Total Calories Burnt:</b> {Math.round(totalCaloriesBurnt * 10) / 10} kcal</p>

                        </>
                }
                <Button
                    variant={"link"}
                    size="sm"
                    onClick={openExerciseSelectPopup}
                    className="dark-button float-right">New Exercise Entry
                </Button>
            </div>
        </>
    )
}