import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
function Hero() {
  return (
    <>
    <div className="hero min-h-screen  max-w-[80%] bg-base">
    <div className="hero-content flex-col lg:flex-row">
      <img src="https://vistapointe.net/images/hotel-1.jpg" className="max-w-sm rounded-lg shadow-2xl" />
      <div>
        <h1 className="text-5xl font-bold">XHotel </h1>
        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <Link to='/rooms' >  <button className="btn btn-success hover:text-teal-300 hover:bg-neutral-900">Get Started</button> </Link>
      </div>
    </div>
  </div>
 
  </>
  )
}

export default Hero