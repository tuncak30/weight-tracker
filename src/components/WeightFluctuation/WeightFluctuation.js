import React, {useContext, useState} from 'react';
import {GlobalContext} from "../../context/GlobalContext";
import { LineChart, Legend, ResponsiveContainer, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {Button, Modal} from "react-bootstrap";

export default function WeightFluctuation(props){
    const { state } = useContext(GlobalContext);
    const minWeight = parseInt(state.user.targetWeight) - 10;
    const maxWeight = parseInt(state.user.currentWeight) + 10;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    function convertArray(array){
        let newArray = [];

        for(let i=0; i<array.length; i++){
            newArray.push({
                Date: new Date(array[i].start).toLocaleDateString(),
                Weight: parseFloat(array[i].title.split(" ")[0])
            })
        }
        return newArray;
    }
    const data = convertArray(state.kgs);

    function openBigger(){
        setShow(true);
    }

    return(
        <>
            <Modal
                show={show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="xl"
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Weight Fluctuation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={data} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Date" />
                            <YAxis domain={[minWeight, maxWeight]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Weight" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={"link"}
                        size="sm"
                        className="dark-button"
                        onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="custom-section-containers clearfix">
                <div className="custom-section-headers">Weight Fluctuation</div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Date" />
                        <YAxis domain={[minWeight, maxWeight]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Weight" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
                <Button
                    variant={"link"}
                    size="sm"
                    onClick={openBigger}
                    className="dark-button float-right">Open Bigger
                </Button>
            </div>
        </>
    )
}