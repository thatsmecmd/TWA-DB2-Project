import React, { useState } from 'react'
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";

function Graph1() {
    const [country, setCountry] = useState('')
    const navigate = useNavigate();

    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
    }

    const handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (/^[A-Za-z-]+$/.test(country) && country) {
            httpReq()
        }else{
            console.log("no country")
            toast.error("No country provided")
        }
    }

    async function httpReq(){
        const capCountry = country.charAt(0).toUpperCase() + country.slice(1)
        const url = `/per_capita_electricity?country=${capCountry}`
        try {
            const response = await fetch(url)
            console.log('response: ', response)
            if (response.status == 400){
                console.log("no country")
                toast.error("No country provided")
                return
            }

            const blobed = await response.blob()
            console.log('blobed: ', blobed)

            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                localStorage.setItem("source","graph1")
                localStorage.setItem("image",base64String)
                //window.location.href = "/display_graph"
                navigate("/display_graph");
            }

            reader.readAsDataURL(blobed)
        } catch (err) {
            console.log(err)
            toast.error("Server error: ")
        }
    }

    return (
        <div>
            <form onSubmit={handlSubmit}>
                <div>
                    Country name
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

export default Graph1