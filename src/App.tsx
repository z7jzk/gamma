import React  from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './shared/nav'
import Home from './home/home'
import Bom from './bom/bom'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="bom" element={<Bom />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
