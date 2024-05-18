//import React from 'react'

function Display_Graph() {
    const data_source = {
        "graph1":"temp1",
        "graph2":"temp2",
        "graph3":"temp3",
        "graph4":"temp4",
    }

    const handleBack = () => {
        window.location.href = "/home"
    }

    const handleDownload = () => {

    }


    return (
        <div>
            <button onClick={handleBack}>Back</button>
            <div>Data source: {data_source["graph1"]}</div>
            <img src="" alt="graph with the params" />
            <button onClick={handleDownload}></button>
        </div>
    )
}

export default Display_Graph