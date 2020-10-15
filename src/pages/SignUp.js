import React, {useContext, useEffect, useState} from 'react';
import {Form, Col, Row, Button, Container, Toast} from 'react-bootstrap';
import '../styles/Welcome.scss';
import {Link, useHistory} from 'react-router-dom';
import {Animated} from "react-animated-css";
import useSpinner from "../hooks/useSpinner";
import ReactDOM from "react-dom";
import {GlobalContext} from "../context/GlobalContext";
import {auth, database} from '../firebase';
import firebase from "firebase";

function SignUp(){
    const {
        state,
        addSignedUpUser
    } = useContext(GlobalContext);

    const [spinner, showSpinner, hideSpinner] = useSpinner();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupFormValidated, setSignupFormValidated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState('');
    const [toastVariant, setToastVariant] = useState('toast-success');
    const history = useHistory();

    const signupFormSubmitHandler = async(event) => {
        const signupForm = event.currentTarget;
        if (signupForm.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (signupForm.checkValidity() === true) {
            event.preventDefault();
            showSpinner();
            try{
                const user = await auth.createUserWithEmailAndPassword(username, password);
                await addSignedUpUser(user);
                setShowToast(true);
                setToastVariant('toast-success');
                setToastBody('You have successfully signed-up! Redirecting to app...');
                hideSpinner();
                history.push('/');
            }
            catch (e){
                hideSpinner();
                setShowToast(true);
                setToastVariant('toast-fail');
                setToastBody(e.message);
            }
        }

        setSignupFormValidated(true);
    }

    useEffect(() => {
        document.title = 'Weight Tracker - Sign up';
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
                            <p className="text-center welcome-texts big-text gradient-text">Sign up to weight tracker today!</p>
                        </Animated>
                        <Animated
                            animationIn="fadeIn"
                            animationOut="fadeOut"
                            animationInDelay={200}
                            isVisible={true}>
                            <p className="text-center welcome-texts smaller-texts">Although weight tracker can keep your progress <b>offline on your computer,</b> it is always nice to be extra safe and sign-up to keep and reach your data everywhere!</p>
                        </Animated>
                        <Animated
                            animationIn="fadeIn"
                            animationOut="fadeOut"
                            animationInDelay={400}
                            isVisible={true}>
                            <Form
                                noValidate
                                validated={signupFormValidated}
                                onSubmit={signupFormSubmitHandler}>
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
                                            className="dark-button mt-3 float-right">Sign Up
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
                            <p className="text-center disclaimer">Already have an account? <Link to="/login">Login</Link></p>
                        </Animated>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignUp;