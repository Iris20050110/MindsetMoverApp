import React, {useState, useEffect} from 'react'
import { useKey } from '../context/KeyContext';
import { db } from '../config';
import { ref, update, onValue } from "firebase/database";
import { FaPenSquare, FaCheckSquare} from "react-icons/fa";

const EditComm = ({user, value}) => {
    const { fKeys } = useKey();
    const [clicked, setClicked] = useState(false)
    const [comm, setComm] = useState("")
  
        //read name from db
                useEffect(() => {
                    onValue(ref(db, `${user}/contact/${fKeys}`), (snapshot) => {
                        setComm(snapshot.child("communication").val())
                  })}, [])
      
        //write
          const handleSubmit = () => {
              setClicked(false)
                  update(ref(db, `/${user}/contact/${fKeys}`), {
                      communication: comm,
                      user,
                    });
          }
      
          const handleClick = () => {
            console.log(comm)
              setClicked(true)
          }
      
          const changeComm = (e) => {
              setComm(e.target.value)
          }

  return (
    <>
    {
    !clicked && comm===null ?
        <div className="d-flex justify-content-around mt-2">
            <span className="fw-bold">Communication Preference 
            <button onClick={handleClick} className="btn" 
                    style={{backgroundColor: "transparent", border: "none"}} >
                        <FaPenSquare size={20}/>
        </button>
    </span>
        </div>
    : !clicked && comm!==null ?
        <div className="d-flex flex-column align-items-center justify-content-center">
        <span className="fw-bold">Communication Preference 
        <button onClick={handleClick} className="btn" 
                    style={{backgroundColor: "transparent", border: "none"}} >
                        <FaPenSquare size={20}/>
        </button>
        </span>
            {comm}
        </div>
    : clicked && comm===null ?
    <div className="d-flex flex-column align-items-center justify-content-center">
            <span className="fw-bold">Communication Preference 
            <button onClick={handleSubmit} className="btn" 
                    style={{backgroundColor: "transparent", border: "none"}} >
                        <FaCheckSquare size={20}/>
        </button>
    </span>
    <textarea value={comm} id="relationship" className="w-75 m text-center" 
    placeholder="preference" onChange={changeComm}></textarea>
        </div>
    :
    <div className="d-flex flex-column align-items-center justify-content-center">
            <span className="fw-bold">Communication Preference 
            <button onClick={handleSubmit} className="btn" 
                    style={{backgroundColor: "transparent", border: "none"}} >
                        <FaCheckSquare size={20}/>
        </button>
        
    </span>
    <textarea style={{display: "block"}} className="w-75 m text-center" value={comm} id="relationship" 
    placeholder="preference" onChange={changeComm}>
    </textarea>
    </div>
    }
    </>
  )
}

export default EditComm