import React, {useContext} from 'react';
import {GlobalProvider} from "./context/GlobalContext";
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import ScreenResolutionWarning from "./components/ScreenResolutionWarning/ScreenResolutionWarning";
import PrivateRoute from "./PrivateRoute";
import User from "./pages/User";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
function App(){
    return(
        <GlobalProvider>
            <Router>
                <Switch>
                    <Route path="/welcome" component={Welcome}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <Route path="/login" component={Login}></Route>
                    <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                    <PrivateRoute exact path="/user" component={User}></PrivateRoute>
                </Switch>
            </Router>
            <ScreenResolutionWarning />
        </GlobalProvider>
    )
}

export default App;