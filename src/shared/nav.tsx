import React from 'react'
import polaris_logo from '../assets/images/polaris_logo.png'
import { Outlet, useLocation } from 'react-router-dom'
import './nav.css'

function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className='container-fluid'>
          <a className="navbar-brand" href="/">
            <img src={polaris_logo} className="nav-logo" alt="logo" />
            Sourcing Analytics
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav fw-bold">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
              <a className="nav-link" href="/bom">BOM</a>
              <a className="nav-link disabled">Not Yet Active</a>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

function HeaderView() {
  const location = useLocation()
  console.log(location.pathname)
  // return <span>Path : {location.pathname}</span>
}

export default Nav