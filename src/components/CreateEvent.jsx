import React, { useState, useEffect } from 'react';
import { useKey } from '../context/KeyContext';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from '../config';
import { ref, update, onValue, push } from "firebase/database";
import { FaClock } from "react-icons/fa";
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import WelcomeScreen from '../pages/WelcomeScreen';
import BottomNavBar from './BottomNavBar';

const CreateEvent = () => {
const { fKeys } = useKey();
const session = useSession() //access tokens, when session exists, we have a user
//const supabase = useSupabaseClient()
//const navigate = useNavigate();
const user = new Date(session.user.created_at).getTime()

const [name, setName] = useState("")
const [ start, setStart ] = useState(new Date());
const [ end, setEnd ] = useState(new Date());
const [ eventName, setEventName ] = useState("");
const [ eventDescription, setEventDescription ] = useState("");

useEffect(() => {
  //read name
  onValue(ref(db, `${user}/contact/${fKeys}`), (snapshot) => {
      setName(snapshot.child("1").val())
  })
}, [])

const createCalendarEvent = async() => {
    const event = {
     'summary': eventName,
     'description': eventDescription,
     'start': {
         'dateTime': start.toISOString(), // Date.toISOString()
         'timeZone': 'America/Los_Angeles'
       },
       'end': {
         'dateTime': end.toISOString(), // Date.toISOString()
         'timeZone': 'America/Los_Angeles'
       }
    }

    try {
      await push(ref(db, `/${user}/contact/${fKeys}/events`), 
        [eventName, eventDescription, start.toDateString(), end.toDateString()] // Store as an array inside the object
      );
    } catch (error) {
      console.error(error);
    }

    try {
      await push(ref(db, `/${user}/contact/${fKeys}/starttime`), 
        start.toLocaleString()
      );
    } catch (error) {
      console.error(error);
    }
    
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
     method: "POST",
     headers: {
       'Authorization':'Bearer ' + session.provider_token // Access token for google
     },
     body: JSON.stringify(event)
   }).then((data) => {
     return data.json();
   }).then((data) => {
     console.log(data);
     alert("Event created, check your Google Calendar!");
   });
 
   }

  const firstSignin = () => {
    const current = new Date().getTime()
    const firstTime = new Date(session.user.created_at).getTime()
    const diff = current - firstTime
    console.log(session)
    return diff <= 10 * 1000
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
    { firstSignin() ? 
            <WelcomeScreen />
        :
           <div className="container-fluid w-100 d-flex flex-column vh-100 p-0">
              <Link className=" btn-secondary px-3 mt-2" to="/profile">
                <button className="btn btn-secondary btn-xs text-center">&lt;&lt;Back</button>
              </Link>
            <div className="text-center">
              <h2 className="fw-bold"><FaClock/> Scheduler</h2>
              <h5 className="mt-2">{name}</h5>
              <h5 className="text-muted m-3">Let’s help you schedule your next chat!</h5>
                <p className="fw-bold mt-4">Start of your call: </p>
                <DatePicker selected={start} onChange={(date) => setStart(date)} placeholderText="Select a date"
                showTimeSelect dateFormat="Pp"/>
                <p className="fw-bold mt-3">End of your call: </p>
                <DatePicker selected={end} onChange={(date) => setEnd(date)} showTimeSelect dateFormat="Pp"/>
                <p className="fw-bold mt-3">Call Topics</p>
                <input type="text" onChange={(e) => setEventName(e.target.value)} />
                <p className="fw-bold mt-3">Notes</p>
                <input type="text" onChange={(e) => setEventDescription(e.target.value)} />
                <hr />
              <Link to="/upcoming"><button className="btn btn-secondary w-100" onClick={createCalendarEvent}>
                Schedule your Next Call</button></Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
          </div>
        </div>
    }
    {/* Bottom Navigation Bar */}
    <BottomNavBar/>
    </div>
  )
}

export default CreateEvent