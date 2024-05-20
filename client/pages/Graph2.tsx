import React, { useState } from 'react'
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";


function Graph2() {
    const [country, setCountry] = useState("")
    const [year, setYear] = useState("")
    const navigate = useNavigate();


    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
    };
    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value)
    }

    const handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (parseInt(year) > 1900 && parseInt(year) < 2024){
            if (/^[a-zA-Z-]+(?:,[a-zA-Z-]+){0,3}$/.test(country)){
                httpReq()
            }else{
            console.log("failed country")
            toast.error("Incorrect country format, Formating is without spacing: Country1,Country2,Country3")
            }
        }else{
            console.log("failed year")
            toast.error("Incorrect year")
        }
        //window.location.href = "/"
    }

    async function httpReq(){
        const capCountry = country.charAt(0).toUpperCase() + country.slice(1)
        const url = `/sustainable_energy?countries=${capCountry}&year=${year}`
        console.log('year: ', year)
        console.log('country: ', country)
        try {
            const response = await fetch(url)
            console.log('response: ', response)

            if (response.status == 400){
                console.log("Error in response")
                toast.error("Error in response")
                return
            }

            const blobed = await response.blob()
            console.log('blobed: ', blobed)

            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                localStorage.setItem("source","graph2")
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
                        required
                    />
                </div>
                <br/>

                <div>Country name (up to 4)<br />Seperate by commas ex: Canada,France,Brazil<br />
                    <input
                        type="text"
                        value={country}
                        onChange={handleCountryChange}
                        required
                    />
                </div>
                <button type='submit'>Generate</button>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Graph2