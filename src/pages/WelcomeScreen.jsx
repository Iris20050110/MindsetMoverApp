import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeCards from '../components/WelcomeCards'
import image from '../img/logo.png'

const WelcomeScreen = () => {
const [clicked, setClicked] = useState(false)
  return (
    <div style={{backgroundColor: "#D0D7C4"}}>
    {
        clicked ? 
        <div 
        className="container d-flex justify-content-center align-items-center min-vh-100">
            <WelcomeCards />
        </div>
        :
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="text-center">
          <div className="logo-placeholder" style={{
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 55px',
                    borderRadius: '10px'
                }}>
                  <img src={image}/>
                </div>
            <h1 className="fw-bold">Nurture</h1>
            <h5 className="text-muted">Welcome to Nurture -- Your relationships, thoughtfully tended.</h5>
            <button onClick={() => setClicked(true)} style={{backgroundColor: '#6633FF'}} 
            className="btn btn-secondary w-100">Get Started</button>
            </div>
        </div>
    }
    </div>
  )
}

export default WelcomeScreen