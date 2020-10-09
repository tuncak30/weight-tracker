import React, {useContext, useState} from 'react';
import {GlobalContext} from "../../context/GlobalContext";
import {MONTHS} from "../../StaticData";
import {Animated} from "react-animated-css";
import './PastDaysView.scss';

export default function PastDaysView(selectedDate){
    const {state} = useContext(GlobalContext);
    const date = new Date(selectedDate.date);

    return(
        <>
            <Animated
                animationIn="fadeIn"
                animationOut="fadeOut"
                animationInDelay={100}
                isVisible={true}>
                <p className="welcome-texts smaller-texts-subpages">
                    Summary of <b>{date.getDate() + ' ' + MONTHS[date.getMonth() + 1] + ', ' + date.getFullYear()}</b>
                </p>
            </Animated>

            <Animated
                animationIn="fadeIn"
                animationOut="fadeOut"
                animationInDelay={400}
                className="mt-2"
                isVisible={true}>
                <div className="custom-section-containers clearfix">
                    <div>Bir şeyler</div>
                </div>
            </Animated>
            <Animated
                className="mt-2"
                animationIn="fadeIn"
                animationOut="fadeOut"
                animationInDelay={500}
                isVisible={true}>
                <div className="custom-section-containers clearfix">
                    <div className="custom-section-headers">What you ate?</div>
                </div>
            </Animated>
            <Animated
                className="mt-2"
                animationIn="fadeIn"
                animationOut="fadeOut"
                animationInDelay={600}
                isVisible={true}>
                <div className="custom-section-containers clearfix">
                    <div className="custom-section-headers">Exercises</div>
                </div>
            </Animated>

        </>
    )
}