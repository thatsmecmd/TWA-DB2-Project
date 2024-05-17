import React, { useState } from 'react'

function Graph1() {
    const [country, setCountry] = useState('');

    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
    };

    const handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(country);
        //window.location.href = "/"
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
        </div>
    )
}

export default Graph1