import React from 'react'
import { Link } from 'react-router-dom';
import ellipse from '../img/ellipse.png'

var sectionStyle = {
  backgroundImage: `url(${ellipse})`,
  backgroundSize: 'cover',
  width: '100vw',
  backgroundPosition: '0 120%',
  backgroundRepeat: 'no-repeat'
}

const Journey = () => {
  return (
    <div style={sectionStyle} className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center mt-5">
        <h1 className="fw-bold mt-5">Your New Journey</h1>
        <p className="text-muted">3 Simple Steps to Follow</p>

        <div className="mt-3 w-100">
        <div className="p-3 fw-bold bg-light rounded shadow-sm mb-3">
          Schedule a <span style={{color: '#6633FF'}}>call</span> with your person
        </div>
        <div className="p-3 fw-bold bg-light rounded shadow-sm mb-3">
          Get a personalized reminder from Nurture <span style={{color: '#6633FF'}}>24 hours</span> before your call
        </div>
        <div className="p-3 fw-bold bg-light rounded shadow-sm mb-3">
          Reflect on your recent call and follow your progress with <span style={{color: '#6633FF'}}>your tracker</span>!
        </div>
      </div>

        <Link className="mt-5 text-white text-decoration-none" to="/profile">
        <button style={{backgroundColor: '#D0D7C4'}} className="btn .text-dark fw-bold w-100">
          Let's go!</button></Link>
      </div>
    </div>
  )
}

export default Journey