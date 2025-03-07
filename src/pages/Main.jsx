import React, {useEffect, useState} from 'react'
import { useKey } from '../context/KeyContext';
import { useSession } from '@supabase/auth-helpers-react';
import { db } from '../config';
import { get, ref, onValue } from 'firebase/database';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserPlus } from "react-icons/fa";
import { Link } from 'react-router-dom'
import medals from '../img/medals.png'

const Profile = () => {
  const session = useSession()
  const { setfKeys } = useKey();
  const user = new Date(session.user.created_at).getTime()
  const [names, setNames] = useState([])
  const [keys, setKeys] = useState([])
  const [time, setTime] = useState([])

  //read name and upcoming events from db
        useEffect(() => {
          const fetchContacts = async () => {
            const dbRef = ref(db, `${user}/contact`);
  
            try {
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    const contactsArray = [];
                    const keysArray = [];
                    const timeArray = [];
                    snapshot.forEach((childSnapshot) => {
                        const data = childSnapshot.val(); // Extract the name
                        contactsArray.push(data[1]); 
                        timeArray.push(data['starttime'])
                        const key = childSnapshot.key; // Extract the key
                        keysArray.push(key);
                    });
                    setKeys(keysArray);
                    setNames(contactsArray);
                    const timeArraym = timeArray.filter(element => element !== undefined);
                    //console.log(timeArraym)
                    setTime(timeArraym.map(obj => Object.values(obj)).flat())
                } else {
                    console.log("No data found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
          };

      fetchContacts();
      }, [])


  return (
    <div className="container-fluid w-100 d-flex flex-column vh-100 p-0">
      <img style={{width: "50vw", alignSelf: 'center'}} className="my-3 mt-5" src={medals}/>
      <div className="mb-3 ml-5" style={{ textAlign: "left", paddingLeft: "20px" }}>
        <h4>Hello,</h4>
        <p className="fw-bold">You're here &gt;&gt;</p>
      </div>

      {/* Main Content */}
      <div className="container text-center mt-3 d-flex flex-column align-items-center"
      style={{ alignItems: "center" }}>
        <div className="d-flex align-items-center">
        {names.map((name, index) => (
                <div key={index} className="d-flex justify-content-center mb-5">
                   <span className="fw-bold" style={{ fontSize: "16px", fontWeight: "bold"}}>
                    <Link to="/profileview">
                    <button onClick={() => {setfKeys(keys[index])}}
                    className="fw-bold me-5"
                    style={{
                    width: '80px', 
                    height: '80px', 
                    fontSize: '14px',
                    textAlign: 'center',
                    border: 'none',
                    marginLeft: '15%',
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: '50%',
                    }}>{name}</button>
                    </Link>
                    </span>
                </div>
            ))
        }
      </div>
      <div style={{ display: "block", alignItems: "center" }}>
        <h4 className="mb-4">All the Events</h4>
      {
         time.map((el, index) => (
          <div key={index} className="justify-content-center mb-4">
          <span className="px-5 fw-bold bg-light p-2 rounded">
            {el}
          </span>
          <br/>
          </div>
         ))
        } 
        <Link to='/firstprofile' className="link-secondary">
          <span style={{ fontSize: "20px", color: '#6633FF' }}><FaUserPlus size={40}/></span></Link>
      </div>
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center mt-3">
        <Link to="/event">
      <button style={{backgroundColor: '#6633FF'}} variant="secondary" 
      className="mt-100 btn btn-secondary w-35 mb-5">
        + Schedule your next event</button></Link>
      </div>
    

    </div>
  )
}

export default Profile;