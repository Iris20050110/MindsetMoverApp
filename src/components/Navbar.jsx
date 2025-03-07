import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import image from '../img/logo.png'

const Navbar = () => {
  const session = useSession() //access tokens, when session exists, we have a user
  const supabase = useSupabaseClient()
  const navigate = useNavigate();

  const signOut = async() => {
    navigate("/")
    await supabase.auth.signOut();
  }

  return (
    <div style={{backgroundColor: "#D0D7C4"}}>
    {
      session ? 
      <nav style={{backgroundColor: "#D0D7C4"}} className="navbar navbar-light px-3">
      <button className="btn btn-secondary" onClick={signOut}>Sign Out</button>
      <div className="logo-placeholder" style={{
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px'
                }}>
                    <img style={{width: '100px',
                    height: '100px',}} src={image}/>
      </div>
      </nav>
      :
      <nav style={{backgroundColor: "#D0D7C4"}} className="navbar navbar-light px-3">
        <div className="logo-placeholder" style={{
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px'
                }}>
                    <img style={{width: '100px',
                    height: '100px',}} src={image}/>
                </div>
        <h3 className="navbar-brand">Nurture</h3></nav>
    }
    </div>
  )
}

export default Navbar