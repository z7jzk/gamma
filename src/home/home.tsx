import React from 'react'
import './home.css'

function Home() {
  return (
    <div className="container-fluid">
      <div className="row align-items-start mt-4 mx-5">
        <div className="col">
          <h1>Welcome Home, Josh</h1>
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Resource</th>
                <th scope="col">Description</th>
                <th scope="col">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td><a className="nav-link" href="/bom">BOM</a></td>
                <td>Retrieve Bill of Material information for selected vehicle model</td>
                <td>1/19/2023</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>TBD</td>
                <td>TBD</td>
                <td>N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home