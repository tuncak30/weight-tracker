import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row, Container, Table} from "react-bootstrap";
import {Animated} from "react-animated-css";
import './CalorieCalculator.scss';
import SearchResults from "../SearchResults/SearchResults";

export default function CalorieCalculator(props){
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [queryFormValidated, setQueryFormValidated] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

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
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if(data.foods){
                            setSearchResults(data.foods)
                        }
                    })
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

    function setSelectedFoods(){

    }

    return(
        <div className="custom-section-containers clearfix">
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
                                    required
                                    placeholder="Enter food name..."
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
                    <Table striped bordered hover size="sm">
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
                            {searchResults.map((item, i) =>
                                <SearchResults key={item.food_name} data={item}></SearchResults>
                            )}
                        </tbody>
                    </Table>
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
            <Button
                variant={"link"}
                size="sm"
                onClick={openFoodSelectPopup}
                className="dark-button float-right">New Food Entry
            </Button>
        </div>
    )
}