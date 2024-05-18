import React, { useState } from 'react'
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


function Graph2() {
    const [country, setCountry] = useState("")
    const [year, setYear] = useState("")


    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
    };
    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value)
    }

    const handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (parseInt(year) > 1700){
            if (/^[a-zA-Z-]+(?:,[a-zA-Z-]+){0,3}$/.test(country)){
                console.log(country, year)
                toast("success")
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