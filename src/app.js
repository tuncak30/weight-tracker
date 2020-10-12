import React, {useContext} from 'react';
import {GlobalProvider} from "./context/GlobalContext";
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import ScreenResolutionWarning from "./components/ScreenResolutionWarning/ScreenResolutionWarning";
import PrivateRoute from "./PrivateRoute";
function App(){
    return(
        <GlobalProvider>
            <Router>
                <Switch>
                    <Route path="/welcome" component={Welcome}></Route>
                    <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                </Switch>
            </Router>
            <ScreenResolutionWarning />
        </GlobalProvider>
    )
}

export default App;