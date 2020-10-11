import React, {useContext, useState} from 'react';
import {GlobalContext} from "../../context/GlobalContext";
import {MONTHS, THEMES} from "../../StaticData";
import {Animated} from "react-animated-css";
import './PastDaysView.scss';
import {Table} from "react-bootstrap";

export default function PastDaysView(selectedDate){
    const {state} = useContext(GlobalContext);
    const date = new Date(selectedDate.date);
    const [consumedMeals, setConsumedMeals] = useState(state.meals);
    const variant = document.body.classList.contains(THEMES.LIGHT_THEME) ? '' : 'dark';
    let [totalCalories, setTotalCalories] = useState(0);
    for(let i=0; i<state.meals.length; i++){
        totalCalories = totalCalories + (isToday(state.meals[i].consumed) ? state.meals[i].meal.nf_calories : 0);
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
    function isToday (date){
        const d = new Date(date);
        const s = new Date(selectedDate.date)
        return d.getDate() == s.getDate() &&
            d.getMonth() == s.getMonth() &&
            d.getFullYear() == s.getFullYear()
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
                            <p className="welcome-texts smaller-texts-subpages text-center pt-1 pb-1 mt-3 mb-3">You haven't enter any data for this dat</p> :
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
                                <p className="welcome-texts smaller-texts-subpages pt-1 pb-1 mt-1 mb-3">Total Calories: {Math.round(totalCalories * 10) / 10} kcal</p>
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
                </div>
            </Animated>

        </>
    )
}