import React, {useContext, useEffect, useState} from 'react';
import {Form, Col, Row, Button, Container, Toast} from 'react-bootstrap';
import '../styles/Welcome.scss';
import {Link, useHistory} from 'react-router-dom';
import {Animated} from "react-animated-css";
import useSpinner from "../hooks/useSpinner";
import ReactDOM from "react-dom";
import {GlobalContext} from "../context/GlobalContext";
import {auth} from '../firebase';
import firebase from "firebase";

function SignUp(){
    const {
        state,
        login,
        addSignedUpUser
    } = useContext(GlobalContext);

    const [spinner, showSpinner, hideSpinner] = useSpinner();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginormValidated, setLoginFormValidated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState('');
    const [toastVariant, setToastVariant] = useState('toast-success');
    const history = useHistory();

    const loginFormSubmitHandler = async(event) => {
        const loginForm = event.currentTarget;
        if (loginForm.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (loginForm.checkValidity() === true) {
            event.preventDefault();
            showSpinner();
            try{
                const user = await auth.signInWithEmailAndPassword(username, password);
                await login(true);
                let ref = firebase.database().ref("/users/" + user.user.uid);
                ref.on("value", snapshot => {
                    console.log(JSON.parse(snapshot.val()))

                    addSignedUpUser(JSON.parse(snapshot.val()));
                    setShowToast(true);
                    setToastVariant('toast-success');
                    setToastBody('You have successfully logged-in! Redirecting to app...');
                    hideSpinner();
                    history.push('/');
                });

            }
            catch (e){
                hideSpinner();
                setShowToast(true);
                setToastVariant('toast-fail');
                setToastBody(e.message);
            }
        }

        setLoginFormValidated(true);
    }

    useEffect(() => {
        document.title = 'Weight Tracker - Login';
    })

    return(
        <div className="vertical-center">
            {ReactDOM.createPortal(<Toast className={toastVariant} onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
                <Toast.Body>{toastBody}</Toast.Body>
            </Toast>, document.getElementById('portal'))}
            {ReactDOM.createPortal(spinner, document.getElementById('portal'))}
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xl={6} lg={6} md={8} sm={10} xs={12}>
                        <Animated
                            animationIn="fadeIn"
                            animationOut="fadeOut"
                            animationInDelay={100}
                            isVisible={true}>
                            <p className="text-center welcome-texts big-text gradient-text">Login to weight tracker app!</p>
                        </Animated>
                        <Animated
                            animationIn="fadeIn"
                            animationOut="fadeOut"
                            animationInDelay={400}
                            isVisible={true}>
                            <Form
                                noValidate
                                validated={loginormValidated}
                                onSubmit={loginFormSubmitHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Control
                                            required
                                            placeholder="E-mail..."
                                            type="email"
                                            value={username}
                                            onChange={(e) => {
                                                setUsername(e.target.value)
                                            }}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Control
                                            required
                                            placeholder="Password..."
                                            type="password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Button
                                            variant={"link"}
                                            type="submit"
                                            className="dark-button mt-3 float-right">Login
                                        </Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Animated>
                        <Animated
                            animationIn="fadeIn"
                            animationOut="fadeOut"
                            animationInDelay={600}
                            isVisible={true}>
                            <p className="text-center disclaimer">Don't have an account? <Link to="/signup">Sign up</Link> today!</p>
                        </Animated>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignUp;