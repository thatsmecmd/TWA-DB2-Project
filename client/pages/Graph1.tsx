import React, { useState } from 'react'
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function Graph1() {
    const [country, setCountry] = useState('');
    const [img, setImg] = useState('');


    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
    };

    const handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (/^[A-Za-z-]+$/.test(country) && country) {
            httpReq()
        }else{
            console.log("no country")
            toast.error("No country provided")
        }
        //window.location.href = "/display_graph"
    }

    async function httpReq(){
        const url = `http://localhost:8080/fossil_fuel?country=${country}`
        try {
            const statCodes = await fetch(url)
            const response = await statCodes.json()

            if (statCodes.status == 400){
                console.log("no country")
                toast.error("No country provided")
            }

            setImg(response)
            console.log('response: ', response);

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

                    <img src={img} alt="" />
                </div>
                <button type='submit'>Generate</button>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Graph1