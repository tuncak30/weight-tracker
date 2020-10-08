import React from 'react';
import './ScreenResolutionWarning.scss';
import {THEMES} from "../../StaticData";

export default function ScreenResolutionWarning(){
    let src = document.location.origin + '/img/devices-dark.png';
    if(document.body.className === THEMES.LIGHT_THEME){
        src = document.location.origin + '/img/devices-dark.png';
    }
    return(
        <div className="position-fixed d-md-none" id="screen-resolution-glass">
            <div id="screen-resolution-center">
                <img
                    className="screen-resolution-image img-fluid mb-2"
                    src={src}
                    alt="Only on bigger screens"
                />
                <p>Sorry, we need bigger screens to work properly :/</p>
            </div>
        </div>
    )
}