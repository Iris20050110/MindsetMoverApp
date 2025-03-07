import React, {useState, useEffect} from 'react'
import { useKey } from '../context/KeyContext';
import { db } from '../config';
import { ref, update, onValue } from "firebase/database";
import { FaPenSquare, FaCheckSquare} from "react-icons/fa";


const EditRelationship = ({user, value}) => {
       const { fKeys } = useKey();
      const [clicked, setClicked] = useState(false)
      const [relationship, setRelationship] = useState(value)

      //read name from db
              useEffect(() => {
                  onValue(ref(db, `${user}/contact/${fKeys}`), (snapshot) => {
                      setRelationship(snapshot.child("2").val())
                })}, [])
    
      //write
        const handleSubmit = () => {
            setClicked(false)
                update(ref(db, `/${user}/contact/${fKeys}`), {
                    2: relationship,
                    user,
                  });
        }
    
        const handleClick = () => {
            setClicked(true)
        }
    
        const changeRelationship = (e) => {
            setRelationship(e.target.value)
        }
    
      return (
        <>
        {
        !clicked && relationship==="" ?
        <span>
            <button onClick={handleClick} className="btn" 
            style={{backgroundColor: "transparent", border: "none"}} >
                <FaPenSquare size={20}/>
            </button>
        </span>
        : !clicked && relationship!=="" ?
        <span>&emsp; &emsp;&emsp;{relationship}
        <button onClick={handleClick} className="btn" 
        style={{backgroundColor: "transparent", border: "none"}} >
            <FaPenSquare size={20}/>
        </button>
        </span>
        : clicked && relationship==="" ?
        <span>
            <input value={relationship} id="relationship" placeholder="type" onChange={changeRelationship}></input>
            <button onClick={handleSubmit} className="btn" 
            style={{backgroundColor: "transparent", border: "none"}} >
            <FaCheckSquare size={20}/>
        </button>
        </span>
        :
        <span>
            <input value={relationship} id="relationship" placeholder="type" onChange={changeRelationship}></input>
            <button onClick={handleSubmit} className="btn" 
            style={{backgroundColor: "transparent", border: "none"}} >
            <FaCheckSquare size={20}/>
        </button>
        </span>
        }
        </>
      )
}

export default EditRelationship