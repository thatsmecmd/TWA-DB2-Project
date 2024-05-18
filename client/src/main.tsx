import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Graph_Choice from "../pages/Graph_Choice.tsx"
import Home from "../pages/Home.tsx"
import Graph1 from "../pages/Graph1.tsx"
import Graph2 from "../pages/Graph2.tsx"
import Graph3 from "../pages/Graph3.tsx"
//import Graph4 from "../pages/Graph4.tsx"



ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/graphs" element={<Graph_Choice />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/graph1" element={<Graph1/>} />
      <Route path="/graph2" element={<Graph2/>} />
      <Route path="/graph3" element={<Graph3/>} />
      {/*
      <Route path="/graph4" element={<Graph4/>} /> 
      */}

    </Routes>
  </BrowserRouter >
)
