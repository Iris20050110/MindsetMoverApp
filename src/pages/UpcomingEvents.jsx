import React, {useEffect, useState} from 'react'
import { useKey } from '../context/KeyContext';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { db } from '../config';
import { onValue, ref } from 'firebase/database';
import { useSession } from '@supabase/auth-helpers-react';
import { FaPhone, FaCalendar } from "react-icons/fa";
import BottomNavBar from '../components/BottomNavBar';

const UpcomingEvents = () => {
  const { fKeys } = useKey();
  const session = useSession()
  const user = new Date(session.user.created_at).getTime()
  const [name, setName] = useState("")
  const [items, setItems] = useState([]);
  let contactData = null

  useEffect(() => {

    onValue(ref(db, `${user}/contact/${fKeys}`), (snapshot) => {
              setName(snapshot.child("1").val())
        })

    onValue(ref(db, `/${user}/contact/${fKeys}/events`), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map((key) => {
        const values = data[key]; // Get the array stored at each key
          return {
            id: key,
            topic: values[0],
            start: values[2]
          };
        });
        setItems(formattedData);
      } else {
        setItems([]);
      }
    });

    return () => {};
  }, []);

  return (
    <div className="container-fluid w-100 d-flex flex-column vh-100 p-0">
      <div className="container-fluid w-100 d-flex flex-column vh-100 p-0">
        <Link className=" btn-secondary px-3 mt-2" to="/profile">
          <button className="btn btn-secondary btn-xs text-center">&lt;&lt;Back</button>
        </Link>
      <h2 className="text-center fw-bold mt-2"><FaCalendar/> View Events</h2>
      <div className="row text-center mt-2S">
          <div className="col">
            <h5 className="mt-2">{name}</h5>
          </div>
        </div>

      <div className="d-flex justify-content-center mt-3 mb-3">
                  <Link to="/event">
                      <button style={{backgroundColor: '#6633FF'}} className="btn btn-secondary btn-xs ">
                        Schedule a Call</button>
                  </Link>
      </div>

      <div>
          {items.map((item) => (
            <div className="card bg-light mt-3 p-2">
            <div className="row" key={item.id}>
               <div className="col-4 text-center fw-bold">{item.start}</div>
              <div style={{color: '#6633FF'}} className="col fw-bold">{item.topic}</div>
            </div>
            </div>
          ))}
      </div>
    {/* Bottom Navigation Bar */}
    <BottomNavBar/>
    
    </div>
    </div>
  );
};

export default UpcomingEvents