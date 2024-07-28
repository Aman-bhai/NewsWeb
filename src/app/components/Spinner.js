import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center flex justify-between items-center'>
        <img src={"/giphy.gif"} alt="loading" className='h-52 mx-auto' />
      </div>
    )
  }
}

export default Spinner

