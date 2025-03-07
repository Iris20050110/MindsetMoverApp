import React, {useState} from 'react'
import FormQuestion from '../components/FormQuestion';
import ellipse from '../img/ellipse.png'

var sectionStyle = {
  backgroundImage: `url(${ellipse})`,
  backgroundSize: 'cover',
  width: '100vw',
  backgroundPosition: '0 120%',
  backgroundRepeat: 'no-repeat'
}

const Intro = () => {
  const [clicked, setClicked] = useState(0)
  const [buttonText, setButtonText] = useState('Add Contact');

  const handleClick = () => {
    setClicked(clicked + 1)
    if (buttonText === 'Add Contact') {
      setButtonText('Continue')
    }
}

  return (
    <div style={sectionStyle}> 
      {
        (clicked > 0) ? 
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <FormQuestion id={clicked}/>
        </div>
        :
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="text-center">
            <h2 className="fw-bold">"Let's start with someone important to you."</h2>
            <button style={{backgroundColor: '#6633FF'}} className="btn btn-secondary w-10 mt-3"
             onClick={handleClick}>{buttonText}</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Intro