//import React from 'react'


function First() {
    const handleClick = () =>{
        window.location.href = "/graphs"
    }
    return (
      <div>
          <img src={"../public/vite.svg"} className="logo" alt="logo" width={50}/>
          <div>This application searches a database for the chosen data, <br/> and parses it into a viewable graph<br/><b>Mention: Graph generation takes up to 20 seconds</b></div>
          <button onClick={handleClick} >Explore data</button>
      </div>
    )
  }
  
  export default First