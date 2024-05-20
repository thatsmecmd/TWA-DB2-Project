import React, { useState } from 'react'
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";

function Graph3() {
    const [year, setYear] = useState("")
    const [type, setType] = useState("")
    const navigate = useNavigate();


    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value)
    }
    const handleDataTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value)
    }

    const handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (parseInt(year) > 1900 && parseInt(year) < 2024){
            if (type != ""){
                httpReq()
            }else{
                console.log("failed type")
                toast.error("incorrect type")
            }
        }else{
            console.log("failed year")
            toast.error("incorrect year")
        }
        //window.location.href = "/"
    }

    async function httpReq(){
        const url = `/greenhouse_emisions?mode=${type}&year=${year}`
        try {
            const response = await fetch(url)
            console.log('response: ', response)

            if (response.status == 400){
                const message = await response.json()
                console.log('message: ', message);
                toast.error("Error in response")
                return
            }

            const blobed = await response.blob()
            console.log('blobed: ', blobed)

            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                localStorage.setItem("source","graph3")
                localStorage.setItem("image",base64String)
                //window.location.href = "/display_graph"
                navigate("/display_graph");
            }

            reader.readAsDataURL(blobed)
        } catch (err) {
            console.log(err)
            toast.error("Server error")
        }
    }

    return (
        <div>
            <form onSubmit={handlSubmit}>
                <div>
                    Year
                    <input
                        type="text"
                        value={year}
                        onChange={handleYearChange}
                    />
                </div>

                <div>
                    Type of data
                    <select value={type} onChange={handleDataTypeChange} required>
                        <option value="" disabled>Select a type</option>
                        <option value="greenhouse_gas_emissions">Greenhouse Gas Emissions</option>
                        <option value="population">Population</option>
                        <option value="gdp">GDP</option>
                    </select>
                </div>

                <button type='submit'>Generate</button>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Graph3