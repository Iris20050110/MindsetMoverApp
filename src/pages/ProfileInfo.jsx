import React, {useState, useEffect} from 'react'
import { useKey } from '../context/KeyContext';
import { useSession } from '@supabase/auth-helpers-react';
import { db } from '../config';
import { onValue, ref } from 'firebase/database';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import EditRelationship from '../components/EditRelationship';
import EditBirthday from '../components/EditBirthday';
import EditName from '../components/EditName';
import EditComm from '../components/EditComm';
import EditNotes from '../components/EditNotes'
import BottomNavBar from '../components/BottomNavBar';
import { FaUser } from "react-icons/fa";

const ProfileInfo = () => {
    const { fKeys } = useKey()
    const session = useSession()
        const user = new Date(session.user.created_at).getTime()
        const [name, setName] = useState("")
        const [relationship, setRelationship] = useState("")
        const [birthday, setBirthday] = useState("")
        const [communication, setComm] = useState("")
        const [notes, setNotes] = useState("")
        let contactData = null
    
          useEffect(() => {
             //read name
               onValue(ref(db, `${user}/contact/${fKeys}`), (snapshot) => {
                   setName(snapshot.child("1").val())
               }) 
            }, [])

  return (
    <div className="container-fluid w-100 d-flex flex-column vh-100 p-0">

        {/* Main Content */}
        <div className="bg-white text-center rounded-bottom shadow-sm mb-0">
        <div className="d-flex align-items-center px-1">
                    <Link className=" btn-secondary px-3 mt-3" to="/profileview">
                        <button className="btn btn-secondary btn-xs text-center">&lt;&lt;Back</button>
                    </Link>
                    <h2 className="flex-grow-1 me-2 my-3 text-center"><FaUser /> Profile &emsp;&emsp;&emsp;&emsp;</h2>
                  </div>
                  <h5 className="text-center">{name}</h5>
        <div className="fw-bold"><EditBirthday value={birthday} user={user}/></div>
        
        <div className="d-grid fw-bold gap-2 mt-3">
          <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded">
            <span className="fw-bold">Name</span>
            <span><EditName value={name} user={user}/><br/><br/></span>
          </div>
          <div className="d-flex fw-bold justify-content-between align-items-center bg-light p-2 rounded">
            <span className="fw-bold">Relationship type</span>
            <span><EditRelationship value={relationship} user={user}/><br/><br/></span>
          </div>
          <hr/>
          <div className="d-flex fw-bold flex-column bg-light p-2 rounded">
            <EditComm value={communication} user={user}/>
          </div>
          <div className="bg-light fw-bold p-3 rounded mb-5">
            <EditNotes value={notes} user={user}/>
          </div>
        </div>
      </div>


    {/* Bottom Navigation Bar */}
    <BottomNavBar/>
    </div>
  )
}

export default ProfileInfo