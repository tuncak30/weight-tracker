import React, {useContext} from 'react';
import {GlobalContext, GlobalProvider} from "./context/GlobalContext";
import {Col, Container, Row} from "react-bootstrap";
import {Switch, BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";

function App(){
    const context = useContext(GlobalContext);
    const loggedIn = JSON.parse(localStorage.getItem('WEIGHT_TRACKER_DATA')) === null ? context.loggedIn : JSON.parse(localStorage.getItem('WEIGHT_TRACKER_DATA')).loggedIn;
    return(
        <GlobalProvider>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => {
                        return(
                            loggedIn ?
                                <Redirect to="/home" component={Home} /> :
                                <Redirect to="/welcome#welcome" component={Welcome} />
                        )
                    }} />

                    <Route exact path="/home" component={Home}></Route>
                    <Route exact path="/welcome" component={Welcome}></Route>
                </Switch>
            </Router>
        </GlobalProvider>
    )
}

export default App;