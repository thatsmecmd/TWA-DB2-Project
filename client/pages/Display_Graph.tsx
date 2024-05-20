//import React from 'react'

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Display_Graph() {
    const [graph, setGraph] = useState<string | null>('')
    const [source, setSource] = useState<string | null>('')
    const navigate = useNavigate();


    const data_source: {[key: string]:string} = {
        graph1: "Energy Institute - Statistical Review of World Energy (2023) [https://www.energyinst.org/statistical-review/]",
        graph2: "U.S. Energy Information Administration - International Energy Data (2023) [https://www.eia.gov/opendata/bulkfiles.php]; Energy Institute - Statistical Review of World Energy (2023) [https://www.energyinst.org/statistical-review/]; Population based on various sources (2023) [https://ourworldindata.org/population-sources]",
        graph3: "Population based on various sources (2023) [https://ourworldindata.org/population-sources]",
        graph4: "Energy Institute - Statistical Review of World Energy (2023) [https://www.energyinst.org/statistical-review/]",
    }

    useEffect(() => {
        const storageImg = localStorage.getItem("image")
        if (storageImg) {
            setGraph(storageImg)
            setSource(localStorage.getItem("source"))
        }
    }, [])

    const handleBack = () => {
        //window.location.href = "/graphs"
        navigate("/graphs");
    }

    const handleDownload = () => {
        if (graph){
            const link = document.createElement('a')
            link.href = graph
            link.download = "graph.png"
            link.click()
        }
    }

    return (
        <div>
            <button onClick={handleBack}>Back</button>
            <div>Data source: <br/>{source ? data_source[source] : "source error"}</div>
            {graph ? (
                <img src={graph} alt="Saved" style={{width:'500px'}} />
            ) : (
                <p>No image found</p>
            )}

            <div><button onClick={handleDownload}>Download</button></div>
        </div>
    )
}

export default Display_Graph