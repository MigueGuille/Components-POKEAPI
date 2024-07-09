import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Home from './pages/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Details from './pages/Details'
import Page from './pages/Page/Page'

//This is a test

function App() {
  // const navigate = useNavigate();

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Pokemon/:id" element={<Details />} />
    </Routes>
    </>
  )
}

export default App;

