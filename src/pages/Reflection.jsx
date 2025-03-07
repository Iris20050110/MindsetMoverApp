import React, {useState} from 'react'
import ReflectionQuestion from '../components/ReflectionQuestion';
import BottomNavBar from '../components/BottomNavBar';

const Reflection = () => {
  const [clicked, setClicked] = useState(1)
  
  return (
    <>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <ReflectionQuestion id={clicked}/>
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNavBar/>
    </>
  )
}

export default Reflection