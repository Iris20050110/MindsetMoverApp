import React, {useState, useEffect} from 'react'
import { db } from '../config';
import { get, ref, onValue } from 'firebase/database';
import { useSession } from '@supabase/auth-helpers-react';
import { useKey } from '../context/KeyContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BottomNavBar from '../components/BottomNavBar';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/stats.css'
import { FaPoll } from "react-icons/fa";
import progress from '../img/progress.png'

const Stats = () => {
  const session = useSession()
  const { fKeys } = useKey()
  const user = new Date(session.user.created_at).getTime()
  const [days, setDays] = useState([])
  const [name, setName] = useState("")
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    onValue(ref(db, `${user}/contact/${fKeys}`), (snapshot) => {
              setName(snapshot.child("1").val())
        })

            const fetchContacts = async () => {
              const dbRef = ref(db, `${user}/contact/${fKeys}/reflection`);
    
              try {
                  const snapshot = await get(dbRef);
                  if (snapshot.exists()) {
                      snapshot.forEach((childSnapshot) => {
                          const key = childSnapshot.key; // Extract the key
                          const data = childSnapshot.val(); // Extract the emoji
                          setDays(prevDays => {
                            const newDay = {}
                            newDay["date"] = key
                            newDay["emoji"] = data['emoji']
                            return [...prevDays, newDay]
                          })
                          //console.log(eArray)
                      })
                  } else {
                      console.log("No data found");
                  }
              } catch (error) {
                  console.error("Error fetching data:", error);
              }
          };
    
          fetchContacts();
              }, [])

  const tileContent = ({ date, view }) => {
    //console.log(days)
    if (view === 'month') {
      const dateString = date.toDateString()
      const emojiItem = days.find(item => item.date === dateString);
      if (emojiItem) {
        if (emojiItem.emoji == "draining") {
          return (
            <span style={{ fontSize: '1.5em' }}>
              😫
            </span>
          );
        }
        else if (emojiItem.emoji == "neutral") {
          return (
            <span style={{ fontSize: '1.5em' }}>
              😐
            </span>
          );
        }
        else if (emojiItem.emoji == "uplifting") {
          return (
            <span style={{ fontSize: '1.5em' }}>
              😊
            </span>
          );
        }
      }
    }
    return null
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString()
      const emojiItem = days.find(item => item.date === dateString);
      if (emojiItem) {
        return 'hide-date-number';
      }
    }
    return '';
  };

  return (
    <div className="container my-4 justify-content-center align-items-center min-vh-100">
    <h2 className="text-center fw-bold"><FaPoll /> Track Your Progress</h2>
    <h5 className="text-center">{name}</h5>
    <img style={{width: '90vw'}} src={progress}/>
    <div className="bg-white text-center mt-3 rounded-bottom shadow-sm">
            <Calendar className="w-100"
                onChange={setDate}
                value={date}
                tileContent={tileContent}
                tileClassName={tileClassName}
            />
    </div>

    {/* Bottom Navigation Bar */}
    <BottomNavBar/>
    </div>
  )
}

export default Stats