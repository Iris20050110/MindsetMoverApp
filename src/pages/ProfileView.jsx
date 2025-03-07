import React, {useState, useEffect} from 'react'
import { useKey } from '../context/KeyContext';
import { db } from '../config';
import { onValue, ref, get } from 'firebase/database';
import { useSession } from '@supabase/auth-helpers-react';
import { Link } from 'react-router-dom';
import { FaPhone, FaCalendarAlt, FaCommentDots, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import BottomNavBar from '../components/BottomNavBar';
import streak from '../img/streak.png'

const ProfileView = () => {
    const session = useSession()
    const { fKeys } = useKey()
    const user = new Date(session.user.created_at).getTime()
    const [name, setName] = useState([])

    //read name from db
    useEffect(() => {
        onValue(ref(db, `${user}/contact/${fKeys}`), (snapshot) => {
          setName(snapshot.child("1").val())
    })}, [])
    
  return (
    <div className="container-fluid w-100 d-flex flex-column vh-100 p-0 mb-4">
        
        <div className="bg-white text-center rounded-bottom shadow-sm">
        <h5 className="m-3">{name}</h5>
        <img style={{width: '100vw'}} src={streak}/>

        <div className="d-flex justify-content-center align-items-center gap-3 w-100 p-4 mt-3">
          <div className="d-flex align-items-center" style={{ width: '50%' }}>
            <FaPhone style={{color: '#6633FF'}} className="me-2" size={30} />
            <Link className="btn btn-light flex-grow-1" to="/event">
                <button className="btn fw-bold btn-light flex-grow-1">Schedule an Event</button>
            </Link>
          </div>
          <div className="d-flex align-items-center" style={{ width: '50%' }}>
            <FaCommentDots style={{color: '#6633FF'}} className="me-2" size={30}/>
            <Link className="btn btn-light flex-grow-1" to="/reflection">
                <button className="btn fw-bold btn-light flex-grow-1">Reflect on Latest Events</button>
            </Link>
          </div>
        </div>


        <div className="d-flex justify-content-center align-items-center gap-3 w-100 p-4">
          <div className="d-flex align-items-center" style={{ width: '50%' }}>
            <FaCalendarAlt style={{color: '#6633FF'}} className="me-2" size={30}/>
            <Link className="btn btn-light flex-grow-1" to="/upcoming">
                <button className="btn fw-bold btn-light flex-grow-1">View Events</button>
            </Link>
          </div>
          <div className="d-flex align-items-center" style={{ width: '50%' }}>
            <FaUser style={{color: '#6633FF'}} className="me-2" size={30}/>
            <Link className="shadow btn btn-light flex-grow-1" to="/profileinfo">
                <button className="btn fw-bold btn-light flex-grow-1 py-3">Profile</button>
            </Link>
          </div>
        </div>
      </div>

    {/* Bottom Navigation Bar */}
    <BottomNavBar/>
    </div>
  )
}

export default ProfileView