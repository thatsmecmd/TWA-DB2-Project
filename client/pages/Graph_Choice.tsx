import React from 'react'

function Graph_Choice() {
    const handleBack = () => {
        window.location.href = "/home"
    }
    const handleGraph1 = () => {
        window.location.href = "/graph1"
    }
    const handleGraph2 = () => {
        window.location.href = "/graph2"
    }
    const handleGraph3 = () => {
        window.location.href = "/"
    }
    const handleGraph4 = () => {
        window.location.href = "/"
    }
  return (
    <div>
        <button onClick={handleBack}>Back</button>
        <div>
            <br/>
            <br/>
            <div>graph 1 name</div>
            <div><img src="../sample_graphs/graph1.png" alt="graph 1 sample image" style={{width : "200px"}} /></div>
            <button onClick={handleGraph1}>Select</button>
        </div>

        <div>
            <br/>
            <br/>
            <div>graph 2 name</div>
            <div><img src="../sample_graphs/graph2.png" alt="graph 2 sample image" style={{width : "200px"}} /></div>
            <button onClick={handleGraph2}>Select</button>
        </div>

        <div>
            <br/>
            <br/>
            <div>graph 3 name</div>
            <div><img src="../sample_graphs/graph3.png" alt="graph 3 sample image" style={{width : "200px"}} /></div>
            <button onClick={handleGraph3}>Select</button>
        </div>

        <div>
            <br/>
            <br/>
            <div>graph 4 name</div>
            <div><img src="../sample_graphs/graph4.png" alt="graph 4 sample image" style={{width : "200px"}} /></div>
            <button onClick={handleGraph4}>Select</button>
        </div>
    </div>
  )
}

export default Graph_Choice