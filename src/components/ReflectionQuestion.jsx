import React, {useState, useEffect} from 'react'
import { useKey } from '../context/KeyContext';
import DatePicker from "react-datepicker";
import { db } from '../config';
import { useSession } from '@supabase/auth-helpers-react';
import { ref, update, onValue } from "firebase/database";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'

const ReflectionQuestion = ({id}) => {
const session = useSession()
const { fKeys } = useKey();
const [name, setName] = useState("")
const [ID, setID] = useState(id)
const [day, setDay] = useState(new Date())
const user = new Date(session.user.created_at).getTime()

useEffect(() => {
     onValue(ref(db, `${user}/contact/${fKeys}`), (snapshot) => {
        setName(snapshot.child("1").val())
    })
}, [])

const handleClick = async (e) => {
        try {
            await update(ref(db, `/${user}/contact/${fKeys}/reflection/${day.toDateString()}`), 
                    {emoji: e.target.id
                    }// Store as an array inside the object
                  );
            console.log(day)
        } catch (error) {
                  console.error(error);
        }
    setID(ID + 1)
}

    if (ID === 1) {
        return (
            <div className="container d-flex flex-column align-items-center vh-100">
            <div className="text-center flex-grow-1 d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-3 text-center"><FaPencilAlt/> Reflect</h2>
            <h5 className="text-center mb-4">{name}</h5>
                <h4 className="fw-bold">When did you connect?</h4>
                <DatePicker selected={day} onChange={(date) => setDay(date)} 
                showTimeSelect dateFormat="MM/dd/yyyy"
                placeholderText="Select a date"/>
                <br/>
            <button className="btn btn-secondary mt-2 w-100" style={{backgroundColor: '#6633FF'}} 
            onClick={handleClick}>Continue</button>
            </div>
            </div>
        )
    }
    else if (ID == 2) {
        return (
            <div className="container d-flex flex-column align-items-center vh-100">
            <div className="text-center flex-grow-1 d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-3 text-center"><FaPencilAlt/> Reflect</h2>
            <h5 className="text-center mb-4">{name}</h5>
            <h4 className="fw-bold">How did you connect? </h4>
            <div>
            <button style={{backgroundColor: '#6633FF'}} 
            className="btn btn-secondary mt-2 w-100" onClick={() => {setID(ID + 1)}}>In Person</button> <br/>
            <button style={{backgroundColor: '#6633FF'}}
            className="btn btn-secondary mt-2 w-100" onClick={() => {setID(ID + 1)}}>Video</button> <br/>
            <button style={{backgroundColor: '#6633FF'}}
            className="btn btn-secondary mt-2 w-100" onClick={() => {setID(ID + 1)}}>Phone</button> <br/>
            </div>
            </div>
            </div>
        )
    }
    else if (ID == 3) {
        return (
            <div className="container d-flex flex-column align-items-center vh-100">
            <div className="text-center flex-grow-1 d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-3 text-center"><FaPencilAlt/> Reflect</h2>
            <h5 className="text-center mb-4">{name}</h5>
            <h4 className="fw-bold">How did it feel?</h4>
            <div>
            <button style={{backgroundColor: '#6633FF'}}
            className="btn btn-secondary mt-2 w-100" id="uplifting" onClick={handleClick}>
                😊Uplifting</button> <br/>
            <button style={{backgroundColor: '#6633FF'}}
            className="btn btn-secondary mt-2 w-100" id="neutral" onClick={handleClick}>
                😐Neutral</button> <br/>
            <button style={{backgroundColor: '#6633FF'}}
            className="btn btn-secondary mt-2 w-100" id="draining" onClick={handleClick}>
                😫Draining</button> <br/>
            </div>
            </div>
            </div>
        )
    }
    else if (ID == 4) {
        return (
            <div className="container d-flex flex-column align-items-center vh-100">
            <div className="text-center flex-grow-1 d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-3 text-center"><FaPencilAlt/> Reflect</h2>
            <h5 className="text-center mb-4">{name}</h5>
                <h4 className="fw-bold" htmlFor="comment">Any notes to remember from this conversation?</h4>
                <textarea style={{display: "block"}} className="m text-center" 
                placeholder="Enter text..." type="text" id="comment" name="comment" >
                </textarea><br/>
            <Link to="/profileview">
                <button style={{backgroundColor: '#6633FF'}} className="btn btn-secondary mt-2 w-100">
                Next</button>
            </Link>
            </div>
            </div>
        )
    }
    
}

export default ReflectionQuestion