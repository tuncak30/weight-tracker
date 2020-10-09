import React from 'react';
import './SearchResults.scss';

export default function SearchResults(props){
    return(
        <tr>
            <td className="img-container"><img className="img-fluid" src={props.data.photo.thumb} alt={props.data.food_name} /></td>
            <td>{props.data.serving_qty}</td>
            <td>{props.data.serving_unit}</td>
            <td>{props.data.food_name}</td>
            <td>{props.data.nf_calories}</td>
            <td>{props.data.serving_weight_grams}</td>
        </tr>
    )
}