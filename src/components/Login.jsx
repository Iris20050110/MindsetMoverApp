import React from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import Profile from '../pages/Main';
import ellipse from '../img/ellipse.png'

var sectionStyle = {
  backgroundImage: `url(${ellipse})`,
  backgroundSize: 'cover',
  width: '100vw',
  backgroundPosition: '0 100%',
  backgroundRepeat: 'no-repeat'
}

function Login() {
  const session = useSession() //access tokens, when session exists, we have a user
  const supabase = useSupabaseClient()

  const googleSignin = async() => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/userinfo.email'
      }
    })
    if(error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }
 
  return (
    <>
     <title>Mindset Mover</title>

     <div className="container d-flex justify-content-center align-items-center min-vh-100">
     <div className="text-center">
      {
        session ? 
        <Profile/>
        :
        <div style={sectionStyle}>
          <h2 className='fw-bold'>Sign In to Your Account</h2>
          <button style={{backgroundColor: '#6633FF'}} className="btn btn-secondary w-75" onClick={googleSignin}>
            Sign In with Google</button>
        </div>
      }
      </div>
     </div>
    </>
  );
}

export default Login;
