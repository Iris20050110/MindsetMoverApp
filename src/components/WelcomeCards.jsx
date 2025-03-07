import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import WelcomeCard from './WelcomeCard'
import onboarding1 from '../img/onboarding1.png'
import onboarding2 from '../img/onboarding2.png'
import onboarding3 from '../img/onboarding3.png'
import onboarding4 from '../img/onboarding4.png'

const WelcomeCards = () => {
const [id, setID] = useState(0)
const [buttonHidden, setButtonHidden] = useState(false);
const contentls = ['Choose relationships to nurture.', 'Guide your\ngrowth with tailored goals.',
    'Quickly access key details, milestones, and updates for each relationship -- all in one place.',
    'Never miss key moments with timely reminders.'
]
const imgls = [onboarding1, onboarding2, onboarding3, onboarding4]

const handleClick = () => {
    setID(id + 1)
    if (id === 2) {
        setButtonHidden(true)
    }
    console.log(id)
}

  return (
    <div className="container-fluid d-flex flex-column align-items-center min-vh-100 p-0">
        <WelcomeCard id={id} content={contentls[id]} img={imgls[id]}/>
        {
            buttonHidden ?
            <Link to="/firstprofile"><button style={{ width: '100%' }}className="btn btn-secondary mt-3">
                Continue</button></Link>
            :
            <button onClick={handleClick} 
            className="btn btn-secondary w-10 mt-3">Next &gt; &gt;</button>
        }
    </div>
  )
}

export default WelcomeCards