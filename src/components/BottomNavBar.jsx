import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaComment, FaAward } from "react-icons/fa";

const BottomNavBar = () => {
  return (
    <div className="fixed-bottom container-fluid bg-light py-3 mt-3" style={{ width: "100vw" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "0 20px" }}>
                          <Link className="link-secondary" to="/"><FaHome size={24} /></Link>
                          <Link className="link-secondary" to="/profileinfo"><FaUser size={24} /></Link>
                          <Link className="link-secondary" to="/reflection"><FaComment size={24} /></Link>
                          <Link className="link-secondary" to="/stats"><FaAward size={24}/></Link>
          </div>
    </div>
  )
}

export default BottomNavBar