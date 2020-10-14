import React, {useContext, useState} from 'react';
import {GlobalContext} from "../../context/GlobalContext";
import {MONTHS, THEMES} from "../../StaticData";
import {Animated} from "react-animated-css";
import './PastDaysView.scss';
import {Table, Col, Row} from "react-bootstrap";
import ExerciseResults from "../ExerciseResults/ExerciseResults";

export default function PastDaysView(selectedDate){
    const {state} = useContext(GlobalContext);
    const date = new Date(selectedDate.date);
    const [consumedMeals, setConsumedMeals] = useState(state.meals);
    const [finishedExercises, setfinishedExercises] = useState(state.exercises);

    const variant = document.body.classList.contains(THEMES.LIGHT_THEME) ? '' : 'dark';
    let [totalCalories, setTotalCalories] = useState(0);
    for(let i=0; i<state.meals.length; i++){
        totalCalories = totalCalories + (isToday(state.meals[i].consumed) ? state.meals[i].meal.nf_calories : 0);
    }
    let [totalCaloriesBurnt, setTotalCaloriesBurnt] = useState(0);
    for(let i=0; i<state.exercises.length; i++){
        totalCaloriesBurnt = totalCaloriesBurnt + (isToday(state.exercises[i].timestamp) ? state.exercises[i].exercise.nf_calories : 0);
    }

    function getTodaysMeals(meals){
        let todaysMeals = new Array();
        for(var i=0; i<meals.length; i++){
            if(isToday(meals[i].consumed)){
                todaysMeals.push(meals[i]);
            }
        }
        return todaysMeals;
    }

    function getTodaysExercises(exercises){
        let todaysExercises = new Array();
        for(var i=0; i<exercises.length; i++){
            if(isToday(exercises[i].timestamp)){
                todaysExercises.push(exercises[i]);
            }
        }
        return todaysExercises;
    }

    function isToday (date){
        const d = new Date(date);
        const s = new Date(selectedDate.date)
        return d.getDate() == s.getDate() &&
            d.getMonth() == s.getMonth() &&
            d.getFullYear() == s.getFullYear()
    }

    function findTodaysDifference(){
        for(let i=0; i<state.kgs.length; i++){
            if(isToday(state.kgs[i].start)){
                return state.kgs[i].difference;
            }
        }
    }

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
                    <div>Summary</div>
                    <Row>

                        <Col>
                            <div className="summary-containers calories mt-2 mb-2"><div className="text">{totalCaloriesBurnt} kcal burnt</div></div>
                        </Col>
                        <Col>
                            <div className="summary-containers exercises mt-2 mb-2"><div className="text">{totalCalories} kcal taken</div></div>
                        </Col>
                        <Col>
                            <div className="summary-containers overall mt-2 mb-2">
                                <div className="text">
                                {
                                    isNaN(findTodaysDifference()) ? 'N/A' :
                                    findTodaysDifference() == 0 ? 'Maintaned weight' :
                                        findTodaysDifference() < 0 ?
                                            'Lost ' + Math.abs(findTodaysDifference()) + ' kgs' :
                                            'Gained ' + Math.abs(findTodaysDifference()) + ' kgs'

                                }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Animated>
            <Animated
                className="mt-2"
                animationIn="fadeIn"
                animationOut="fadeOut"
                animationInDelay={500}
                isVisible={true}>
                <div className="custom-section-containers clearfix">
                    <div className="custom-section-headers">Meals</div>
                    {

                        getTodaysMeals(consumedMeals).length === 0 ?
                            <p className="welcome-texts smaller-texts-subpages text-center pt-1 pb-1 mt-3 mb-3">You haven't enter any data for this day</p> :
                            <>
                                <p className="welcome-texts smaller-texts-subpages pt-1 pb-1 mt-1 mb-1">You entered foods listed below for this day</p>
                                <Table variant={variant} striped bordered hover size="sm">
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
                                    {
                                        getTodaysMeals(consumedMeals).map((item, i) =>

                                            item.meal.customFood ?
                                                <tr>
                                                    <td className="img-container">N/A</td>
                                                    <td>N/A</td>
                                                    <td>N/A</td>
                                                    <td>{item.meal.food_name}</td>
                                                    <td>{item.meal.nf_calories}</td>
                                                    <td>N/A</td>
                                                </tr> :
                                                <tr key={i}>
                                                    <td className="img-container"><img className="img-fluid" src={item.meal.photo.thumb} alt={item.meal.food_name} /></td>
                                                    <td>{item.meal.serving_qty}</td>
                                                    <td>{item.meal.serving_unit}</td>
                                                    <td>{item.meal.food_name}</td>
                                                    <td>{item.meal.nf_calories}</td>
                                                    <td>{item.meal.serving_weight_grams}</td>
                                                </tr>
                                        )
                                    }
                                    </tbody>
                                </Table>
                                <p className="welcome-texts smaller-texts-subpages pt-1 pb-1 mt-1 mb-3"><b>Total Calories:</b> {Math.round(totalCalories * 10) / 10} kcal</p>
                            </>
                    }
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
                    {

                        getTodaysExercises(finishedExercises).length === 0 ?
                            <p className="welcome-texts smaller-texts-subpages text-center pt-1 pb-1 mt-3 mb-3">You haven't enter any data for this day</p> :
                            <>
                                <p className="welcome-texts smaller-texts-subpages pt-1 pb-1 mt-1 mb-1">You entered foods listed below for this day</p>

                                {getTodaysExercises(finishedExercises).map((item, i) => <ExerciseResults key={item.exercise.name} data={item.exercise}/>)}

                                <p className="welcome-texts smaller-texts-subpages pt-1 pb-1 mt-1 mb-3"><b>Total Calories Burnt:</b> {Math.round(totalCaloriesBurnt * 10) / 10} kcal</p>
                            </>
                    }
                </div>
            </Animated>

        </>
    )
}