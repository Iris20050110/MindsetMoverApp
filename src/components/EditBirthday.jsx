import React, {useState, useEffect} from 'react'
import { useKey } from '../context/KeyContext';
import { db } from '../config';
import { ref, update, onValue } from "firebase/database";
import { FaPenSquare, FaCheckSquare } from "react-icons/fa";

const EditBirthday = ({user, value}) => {
  const { fKeys } = useKey();
  const [clicked, setClicked] = useState(false)
  const [bd, setBirthday] = useState(value)

   //read name from db
        useEffect(() => {
            onValue(ref(db, `${user}/contact/${fKeys}`), (snapshot) => {
                setBirthday(snapshot.child("birthday").val())
          })}, [])

  //write
    const handleSubmit = () => {
        setClicked(false)
            update(ref(db, `/${user}/contact/${fKeys}`), {
                birthday: bd,
                user,
              });
    }

    const handleClick = () => {
        setClicked(true)
    }

    const changeBirthday = (e) => {
        setBirthday(e.target.value)
    }

  return (
    <>
    {
    !clicked && bd==="" ?
    <span>&emsp; &emsp;&emsp;Birthday: YYYY/MM/DD
        <button onClick={handleClick} className="btn" 
        style={{backgroundColor: "transparent", border: "none"}} >
            <FaPenSquare size={20}/>
        </button>
    </span>
    : !clicked && bd!=="" ?
    <span>&emsp; &emsp;&emsp;Birthday: {bd}
    <button onClick={handleClick} className="btn" 
    style={{backgroundColor: "transparent", border: "none"}} >
        <FaPenSquare size={20}/>
    </button>
    </span>
    : clicked && bd==="" ?
    <span>
        <label htmlFor="birthday">&emsp; &emsp;&emsp;Birthday:&emsp;</label>
        <input value={bd} id="birthday" placeholder="birthday" onChange={changeBirthday}></input>
        <button onClick={handleSubmit} className="btn" 
        style={{backgroundColor: "transparent", border: "none"}} >
        <FaCheckSquare size={20}/>
    </button>
    </span>
    :
    <span>
        <label htmlFor="birthday">&emsp; &emsp;&emsp;Birthday:&emsp;</label>
        <input value={bd} id="birthday" placeholder="birthday" onChange={changeBirthday}></input>
        <button onClick={handleSubmit} className="btn" 
        style={{backgroundColor: "transparent", border: "none"}} >
        <FaCheckSquare size={20}/>
    </button>
    </span>
    }
    </>
  )
}

export default EditBirthday