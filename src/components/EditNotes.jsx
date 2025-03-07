import React, {useState, useEffect} from 'react'
import { useKey } from '../context/KeyContext';
import { db } from '../config';
import { ref, update, onValue } from "firebase/database";
import { FaPenSquare, FaCheckSquare} from "react-icons/fa";

const EditComm = ({user, value}) => {
  const { fKeys } = useKey();
  const [clicked, setClicked] = useState(false)
  const [notes, setNotes] = useState("")
  
        //read name from db
        useEffect(() => {
            onValue(ref(db, `${user}/contact/${fKeys}`), (snapshot) => {
                setNotes(snapshot.child("notes").val())
            })}, [])
      
        //write
          const handleSubmit = () => {
              setClicked(false)
                  update(ref(db, `/${user}/contact/${fKeys}`), {
                      notes,
                      user,
                    });
          }
      
          const handleClick = () => {
            console.log(notes)
              setClicked(true)
          }
      
          const changeNotes = (e) => {
              setNotes(e.target.value)
          }

  return (
    <>
    {
    !clicked && notes===null ?
        <div className="d-flex justify-content-around mt-2">
            <span className="fw-bold">Other Notes 
            <button onClick={handleClick} className="btn" 
                    style={{backgroundColor: "transparent", border: "none"}} >
                        <FaPenSquare size={20}/>
        </button>
    </span>
        </div>
    : !clicked && notes!==null ?
        <div className="d-flex flex-column align-items-center justify-content-center">
        <span className="fw-bold">Other Notes 
        <button onClick={handleClick} className="btn" 
                    style={{backgroundColor: "transparent", border: "none"}} >
                        <FaPenSquare size={20}/>
        </button>
        </span>
            {notes}
        </div>
    : clicked && notes===null ?
    <div className="d-flex flex-column align-items-center justify-content-center">
            <span className="fw-bold">Other Notes 
            <button onClick={handleSubmit} className="btn" 
                    style={{backgroundColor: "transparent", border: "none"}} >
                        <FaCheckSquare size={20}/>
        </button>
    </span>
    <textarea value={notes} id="relationship" className="w-75 m text-center"
    placeholder="Use this space to take notes on things you want to remember for the next conversation" 
     onChange={changeNotes}></textarea>
        </div>
    :
    <div className="d-flex flex-column align-items-center justify-content-center">
            <span className="fw-bold">Other Notes 
            <button onClick={handleSubmit} className="btn" 
                    style={{backgroundColor: "transparent", border: "none"}} >
                        <FaCheckSquare size={20}/>
        </button>
        
    </span>
    <textarea style={{display: "block", color: '#6633FF'}} className="w-75 fw-bold text-center" value={notes} id="relationship" 
    placeholder="Use this space to take notes on things you want to remember for the next conversation" 
    onChange={changeNotes}>
    </textarea>
    </div>
    }
    </>
  )
}

export default EditComm