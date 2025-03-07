import React, {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { ref, update, push} from "firebase/database";
import { Link } from 'react-router-dom';
import { db } from '../config';
import { useSession } from '@supabase/auth-helpers-react';

const FormQuestion = ({id}) => {
    const session = useSession()
    const user = new Date(session.user.created_at).getTime()

    //add a directory for different contact people
    //by getting the current time?

    const [ID, setID] = useState(id)
    const [name, setName] = useState("")
    const [relationship, setRelationship] = useState("")

     //write
  const writeRelationshipToDatabase = async () => {
    setID(ID + 1)
    console.log(ID)

    //const uuid = uid();
    try {
        await push(ref(db, `/${user}/contact`), 
            [user, name, relationship]
          );
    } catch (e) {
        console.log(e)
    }

    console.log(relationship)
    setRelationship("");
  };

  const writeNameToDatabase = async () => {
    setID(ID + 1)
    console.log(ID)

    //const uuid = uid();
    /*try {
        await push(ref(db, `/${user}/${name}`), {
            name,
            user,
          });
    } catch (e) {
        console.log(e)
    }

    console.log(user)
    console.log(name)
    setRelationship("");*/
  };

    const handleClick = () => {
        setID(ID + 1)
        console.log(ID)
    }

    const handleName = (event) => {
        setName(event.target.value)
        console.log(name)
    }

    const handleRelationship = (event) => {
        setRelationship(event.target.value)
        console.log(relationship)
    }

    if (ID === 1) {
        return (
            <div className="container d-flex flex-column align-items-center vh-100">
            <div className="text-center flex-grow-1 d-flex flex-column justify-content-center">
                <label className="fw-bold" htmlFor="name">Enter the name of the person you want to connect with:</label>
                <input placeholder="name" type="text" id="name" name="name" value={name} onChange={handleName}>
                </input><br/>
            <button className="btn btn-secondary mt-2 w-100" onClick={writeNameToDatabase}>Continue</button>
            </div>
            </div>
        )
    }
    else if (ID == 2) {
        return (
            <div className="container d-flex flex-column align-items-center vh-100">
            <div className="text-center flex-grow-1 d-flex flex-column justify-content-center">
                <label className="fw-bold" htmlFor="relationship">Enter your relationship type:</label>
                <input placeholder="relationship" type="text" id="relationship" name="relationship" 
                value={relationship} onChange={handleRelationship}>
                </input><br/>
            <button className="btn btn-secondary mt-2 w-100" onClick={writeRelationshipToDatabase}>
                Continue</button>
            </div>
            </div>
        )
    }
    else if (ID === 3) {
        return (
            <div className="container d-flex flex-column align-items-center vh-100">
            <div className="text-center flex-grow-1 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">Establish a Goal: </h2>
            <h4 className="fw-light">How often would you like to have meaningful conversations?</h4>
            <div>
            <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>Twice a week</button> <br/>
            <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>Once a week</button> <br/>
            <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>Every two weeks</button> <br/>
            <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>Customized</button> <br/>
            </div>
            </div>
            </div>
        )
    }
    else if (ID === 4) {
        return (
            <div className="container d-flex flex-column align-items-center vh-100">
            <div style={{marginTop: '30vh'}} className="text-center flex-grow-1 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">Let’s set up a routine for you!</h2>
            <h4 className="fw-light">When would you like to connect with this person?</h4>
            <div>
            <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>With my morning coffee</button> <br/>
            <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>On my way to work (while commuting)</button> <br/>
            <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>On my way back from work</button> <br/>
            <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>During my afternoon walk outside</button> <br/>
            <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>Right after dinner</button> <br/>
            <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>Weekend only</button> <br/>
            <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>Customized</button>
            </div>
            </div>
            </div>
        )
    }
    else {
        return (
            <div className="container d-flex flex-column align-items-center vh-100">
            <div className="text-center flex-grow-1 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">Establish a Goal: </h2>
            <h4 className="fw-light">What's your preferred way to connect?</h4>
            <div>
            <Link className="text-white text-decoration-none" to="/startjourney">
                <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>
                Video calls <br/>
                (recommended for deeper connections)</button>
            </Link> <br/>
            <Link className="text-white text-decoration-none" to="/startjourney">
                <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>Phone calls <br/>
                (great for on-the-go conversations)</button> </Link><br/>
            <Link className="text-white text-decoration-none" to="/startjourney">
                <button className="btn btn-secondary mt-2 w-100" onClick={handleClick}>Text Messages
                </button></Link>
            </div>
            </div>
            </div>
        )
    }
}


export default FormQuestion
