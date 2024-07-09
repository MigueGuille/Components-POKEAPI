import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Home from './pages/Home'
import Page from './pages/Page/Page'
import { Route, Routes, useNavigate } from 'react-router-dom'

//This is a test

function App() {
  // const navigate = useNavigate();

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Pokemon/:id" element={<Page />} />
    </Routes>
    </>
  )
}

export default App;

