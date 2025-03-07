import React, {useState, useEffect} from 'react'
import { useKey } from '../context/KeyContext';
import { db } from '../config';
import { ref, update, onValue } from "firebase/database";
import { FaPenSquare, FaCheckSquare} from "react-icons/fa";
const EditName = ({user, value}) => {
      const { fKeys } = useKey();
      const [clicked, setClicked] = useState(false)
      const [name, setName] = useState(value)

      //read name from db
    useEffect(() => {
            onValue(ref(db, `${user}/contact/${fKeys}`), (snapshot) => {
              setName(snapshot.child("1").val())
        })}, [])
    
      //write
        const handleSubmit = () => {
            setClicked(false)
                update(ref(db, `/${user}/contact/${fKeys}`), {
                    1: name,
                    user,
                  });
        }
    
        const handleClick = () => {
            setClicked(true)
        }
    
        const changeName = (e) => {
            setName(e.target.value)
        }
    
      return (
        <>
        {
        !clicked && name==="" ?
        <span>
            <button onClick={handleClick} className="btn" 
            style={{backgroundColor: "transparent", border: "none"}} >
                <FaPenSquare size={20}/>
            </button>
        </span>
        : !clicked && name!=="" ?
        <span>&emsp; &emsp;&emsp;{name}
        <button onClick={handleClick} className="btn" 
        style={{backgroundColor: "transparent", border: "none"}} >
            <FaPenSquare size={20}/>
        </button>
        </span>
        : clicked && name==="" ?
        <span>
            <input value={name} id="relationship" placeholder="type" onChange={changeName}></input>
            <button onClick={handleSubmit} className="btn" 
            style={{backgroundColor: "transparent", border: "none"}} >
            <FaCheckSquare size={20}/>
        </button>
        </span>
        :
        <span>
            <input value={name} id="relationship" placeholder="type" onChange={changeName}></input>
            <button onClick={handleSubmit} className="btn" 
            style={{backgroundColor: "transparent", border: "none"}} >
            <FaCheckSquare size={20}/>
        </button>
        </span>
        }
        </>
      )
}

export default EditName