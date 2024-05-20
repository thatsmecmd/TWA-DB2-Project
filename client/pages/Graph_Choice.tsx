//import React from 'react'
import { useNavigate } from "react-router-dom";

function Graph_Choice() {
    const navigate = useNavigate();
    
    const handleBack = () => {
        //window.location.href = "/home"
        navigate("/home");
    }
    const handleGraph1 = () => {
        //window.location.href = "/graph1"
        navigate("/graph1");
    }
    const handleGraph2 = () => {
        //window.location.href = "/graph2"
        navigate("/graph2");
    }
    const handleGraph3 = () => {
        //window.location.href = "/graph3"
        navigate("/graph3");
    }
    const handleGraph4 = () => {
        //window.location.href = "/graph4"
        navigate("/graph4");
    }
  return (
    <div>
        <button onClick={handleBack}>Back</button>
        <div>
            <br/>
            <br/>
            <div>Fossil fuel consumption</div>
            <div><img src="../sample_graphs/graph1.png" alt="graph 1 sample image" style={{width : "200"}} /></div>
            <button onClick={handleGraph1}>Select</button>
        </div>

        <div>
            <br/>
            <br/>
            <div>Energy types used per country</div>
            <div><img src="../sample_graphs/graph2.png" alt="graph 2 sample image" style={{width : "200"}} /></div>
            <button onClick={handleGraph2}>Select</button>
        </div>

        <div>
            <br/>
            <br/>
            <div>graph 3 </div>
            <div><img src="../sample_graphs/graph3.png" alt="graph 3 sample image" style={{width : "200"}} /></div>
            <button onClick={handleGraph3}>Select</button>
        </div>

        <div>
            <br/>
            <br/>
            <div>Energy consumption per capita</div>
            <div><img src="../sample_graphs/graph4.png" alt="graph 4 sample image" style={{width : "200"}} /></div>
            <button onClick={handleGraph4}>Select</button>
        </div>
    </div>
  )
}

export default Graph_Choice