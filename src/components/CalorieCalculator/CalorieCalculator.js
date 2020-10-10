import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row, Container, Table, Toast, ToastBody, ToastHeader} from "react-bootstrap";
import ReactDOM from 'react-dom';
import './CalorieCalculator.scss';
import SearchResults from "../SearchResults/SearchResults";
import useSpinner from "../../hooks/useSpinner";
import {THEMES} from "../../StaticData";
import {GlobalContext} from "../../context/GlobalContext";

export default function CalorieCalculator(props){
    const {state, addMeal} = useContext(GlobalContext);
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState('');
    const [customFoodName, setCustomFoodName] = useState('');
    const [customFoodCalorie, setCustomFoodCalorie] = useState('');
    let [totalCalories, setTotalCalories] = useState(0);
    const variant = document.body.classList.contains(THEMES.LIGHT_THEME) ? '' : 'dark';
    const [spinner, showSpinner, hideSpinner] = useSpinner();
    const [consumedMeals, setConsumedMeals] = useState(state.meals);

    const handleShow = () => setShow(true);
    const [queryFormValidated, setQueryFormValidated] = useState(false);
    const [customQueryFormValidated, setCustomQueryFormValidated] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState('');
    const [toastVariant, setToastVariant] = useState('toast-success');

    for(let i=0; i<state.meals.length; i++){
        totalCalories = totalCalories + state.meals[i].meal.nf_calories;
    }

    const handleClose = () => {
        setShow(false);
        setSearchResults([]);
    }

    useEffect(() => {
        setConsumedMeals(state.meals)
    }, [state.meals])

    const customQueryFormSubmit = (event) => {
        const customQueryForm = event.currentTarget;
        if (customQueryForm.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (customQueryForm.checkValidity() === true) {
            event.preventDefault();
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
                    query: query
                }
                fetch('https://trackapi.nutritionix.com/v2/natural/nutrients' , {
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
                        if(data.foods){
                            hideSpinner();
                            setQuery('');
                            setSearchResults(data.foods)
                        }
                    }).catch(function() {
                            hideSpinner();
                            setQuery('');
                            setShow(false);
                            setShowToast(true);
                            setToastVariant('toast-fail');
                            setToastBody('Your search query doesn\'t have any results, you can try a different one or enter your own custom food name and calorie')
                        });
            }
            else{
                setSearchResults([]);
            }
        }
        setQueryFormValidated(true);
    }

    function openFoodSelectPopup(){
        setShow(true);
    }

    function setSelectedFoods(meal){
        addMeal(meal);
        setShowToast(true);
        setShow(false);
        setToastVariant('toast-success');
        setToastBody('Meal successfully added!');
    }

    return(
        <>
            {ReactDOM.createPortal(<Toast className={toastVariant} onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
                                    <Toast.Body>{toastBody}</Toast.Body>
                                </Toast>, document.getElementById('portal'))}

            <div className="custom-section-containers clearfix">
                {ReactDOM.createPortal(spinner, document.getElementById('portal'))}
                <div className="custom-section-headers">Calorie Calculator</div>

                <Modal
                    show={show}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    size="lg"
                    onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Food Entry</Modal.Title>
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
                                        <th></th>
                                        <th>Qty</th>
                                        <th>Unit</th>
                                        <th>Food</th>
                                        <th>Calories</th>
                                        <th>Weight</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {searchResults.map((item, i) =>
                                        <SearchResults
                                            key={item.food_name}
                                            handleClick={() => setSelectedFoods(item)}
                                            data={item}>
                                        </SearchResults>
                                    )}
                                    </tbody>
                                </Table>
                                :
                                <>
                                    <p className="welcome-texts smaller-texts-subpages">Enter a query like "1 cup mashed potatoes and 2 tbsp gravy" to see how it works. We support tens of thousands of foods, including international dishes.</p>
                                        <div id="divider"><span>OR</span></div>
                                    <p className="welcome-texts smaller-texts-subpages">You can enter a custom entry</p>
                                    <Form
                                        noValidate
                                        validated={customQueryFormValidated}
                                        onSubmit={customQueryFormSubmit}>
                                        <Form.Row>
                                            <Col xl={6} lg={6} md={5}>
                                                <Form.Control
                                                    size="sm"
                                                    required
                                                    placeholder="Food name..."
                                                    type="text"
                                                    defaultValue={customFoodName}
                                                    onChange={(e) => {
                                                        setCustomFoodName(e.target.value);
                                                    }}/>
                                            </Col>
                                            <Col xl={4} lg={4} md={4}>
                                                <Form.Control
                                                    size="sm"
                                                    required
                                                    placeholder="Food Calorie..."
                                                    type="text"
                                                    defaultValue={customFoodCalorie}
                                                    onChange={(e) => {
                                                        setCustomFoodCalorie(e.target.value);
                                                    }}/>
                                            </Col>
                                            <Col xl={2} lg={2} md={3}>
                                                <Button
                                                    block
                                                    variant={"link"}
                                                    type="submit"
                                                    size="sm"
                                                    className="add-buttons">
                                                    Add Food
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
                    consumedMeals.length === 0 ?
                        <p className="welcome-texts smaller-texts-subpages text-center pt-1 pb-1 mt-3 mb-3">You haven't enter any data for today yet</p> :
                        <>
                            <p className="welcome-texts smaller-texts-subpages pt-1 pb-1 mt-1 mb-1">You entered foods listed below for today</p>
                            <Table variant={variant} striped bordered hover size="sm">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Qty</th>
                                    <th>Unit</th>
                                    <th>Food</th>
                                    <th>Calories</th>
                                    <th>Weight</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    consumedMeals.map((item, i) =>
                                        <tr>
                                            <td className="img-container"><img className="img-fluid" src={item.meal.photo.thumb} alt={item.meal.food_name} /></td>
                                            <td>{item.meal.serving_qty}</td>
                                            <td>{item.meal.serving_unit}</td>
                                            <td>{item.meal.food_name}</td>
                                            <td>{item.meal.nf_calories}</td>
                                            <td>{item.meal.serving_weight_grams}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                            <p className="welcome-texts smaller-texts-subpages pt-1 pb-1 mt-1 mb-3">Total Calories: {Math.round(totalCalories * 10) / 10} kcal</p>

                        </>
                }
                <Button
                    variant={"link"}
                    size="sm"
                    onClick={openFoodSelectPopup}
                    className="dark-button float-right">New Food Entry
                </Button>
            </div>
        </>
    )
}