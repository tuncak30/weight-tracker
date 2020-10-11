import React from 'react'
import './ExerciseResults.scss';

export default function ExerciseResults(props){
    function addDefaultSrc(ev){
        ev.target.src = document.location.origin + '/img/workouts/other.png';

    }

    return(
        <div className="exercise-results mt-1 mb-2">
            <div className="exercise-thumbs">
                <img onError={addDefaultSrc}className="img-fluid exercise-icons" src={document.location.origin + '/img/workouts/' + props.data.name.replace(/ /g,'') + '.png'} alt={props.data.name}/>
            </div>
            <div className="exercise-rows exercise-name">
                {props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)}
                {props.data.duration_min ? <span className="exercise-duration">({props.data.duration_min} mins)</span> : null}
            </div>
            <div className="exercise-rows exercise-calories">{props.data.nf_calories} kcal</div>

        </div>
    )
}