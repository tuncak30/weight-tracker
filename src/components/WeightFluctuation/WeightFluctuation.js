import React, {useContext} from 'react';
import {GlobalContext} from "../../context/GlobalContext";
import { LineChart, Legend, ResponsiveContainer, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function WeightFluctuation(props){
    const { state } = useContext(GlobalContext);

    function convertArray(array){
        let newArray = new Array();

        for(let i=0; i<array.length; i++){
            newArray.push({
                Date: new Date(array[i].start).toLocaleDateString(),
                Weight: parseFloat(array[i].title.split(" ")[0])
            })
        }
        return newArray;
    }
    const data = convertArray(state.kgs);
    return(
        <div className="custom-section-containers">
            <div className="custom-section-headers">Weight Fluctuation</div>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis domain={[65, 80]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Weight" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}