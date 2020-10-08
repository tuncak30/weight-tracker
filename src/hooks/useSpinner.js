import React, {useEffect, useState} from 'react';
import {Spinner} from "react-bootstrap";
import {Animated} from "react-animated-css";

function useSpinner(){
    const [showSpinner, setShowSpinner] = useState(false);
    return [
        showSpinner ?
            <div id="spinner-glass">
                <div id="spinner-container">
                    <Spinner animation="border" variant="primary" role="status"></Spinner>
                </div>
            </div>
            : null
        , () => setShowSpinner(true)
        , () => setShowSpinner(false)
    ];
}

export default useSpinner;