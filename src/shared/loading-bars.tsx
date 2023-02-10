import React from 'react'
import { Bars } from 'react-loader-spinner'
import './loading-bars.css'


class LoadingBars extends React.Component {
  constructor(props: any) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="row align-items-start mt-4 mx-5">
        <div className="col-5"></div>
        <div className="col-2 align-middle">
          <Bars height="100" width="120" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>
        <div className="col-5"></div>
      </div>
    )
  }
}

export default LoadingBars