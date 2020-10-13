import React from 'react';
import './SearchResults.scss';
import {Button} from "react-bootstrap";

export default function ExerciseSearchResults(props){
    return(
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.duration_min} Minutes</td>
            <td>{props.data.nf_calories} kcal</td>
            <td>
                <Button
                    onClick={() => props.handleClick(props.data)}
                    block
                    variant={"link"}
                    type="submit"
                    size="sm"
                    className="add-buttons">
                    Add Exercise
                </Button>
            </td>
        </tr>
    )
}