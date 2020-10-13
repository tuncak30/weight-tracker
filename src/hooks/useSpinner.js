import React, {useState} from 'react';
import {Spinner} from "react-bootstrap";

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