import React, { useState } from 'react'
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function Graph3() {
    const [year, setYear] = useState("")
    const [type, setType] = useState("")


    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value)
    }
    const handleDataTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value)
    }

    const handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (parseInt(year) > 1700){
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
        //
        // TODO / To complete
        //
        const url = `http://localhost:8080/greenhouse_emisions?countries=${type}&year=${year}`
        console.log('year: ', year)
        try {
            const statCodes = await fetch(url)
            const response = await statCodes.json()
            console.log('response: ', response)

            if (statCodes.status == 400){
                console.log("Error: ", response.message)
                toast.error("Error")
            }
        } catch (err) {
            console.log(err)
            toast.error("Server error: ")
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
                        <option value="" disabled>Select a Country</option>
                        <option value="emission">emission</option>
                        <option value="population">population</option>
                        <option value="GDP">GDP</option>
                    </select>
                </div>

                <button type='submit'>Generate</button>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Graph3