import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const WelcomeCard = ({id, content, img}) => {
  return (
    <>
    <div className="position-relative w-100" style={{ height: '60vh', overflow: 'hidden' }}>
        <img 
                    src={img}
                    alt="Onboarding Background" 
                    className="w-100 h-100 object-fit-cover" 
                    style={{ borderBottomLeftRadius: '50% 100px', 
                      borderBottomRightRadius: '50% 100px', filter: 'opacity(0.9)' }}
                />
      </div>
    <div className="w-100 text-center py-4" >
        <h4 className="fw-bold">{content}</h4>
    </div>
    </>
  )
}

export default WelcomeCard