import React from 'react'
import { Link, useLocation} from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { IoMdFitness } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { GiStairsGoal } from "react-icons/gi";
import { GiTargetPrize } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import './Navbar.css'
import axios from 'axios';

function Navbar({ children }) {

    const location = useLocation();

    const logout = async() =>{
        await axios.post(`http://localhost:8000/api/logout`,{},{
            withCredentials: true 
        })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid">
                    <div className="navbar-brand me-auto d-flex align-items-center mb-3">
                        <h3>FITNESS.</h3><IoMdFitness style={{ fontSize: '30px' }} />
                    </div>
                    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <Link to="/home" style={{ textDecoration: 'none' }} >
                                    <li className="nav-item">
                                        <span className={`nav-link mx-lg-2 ${location.pathname === '/home' ? 'active' : ''}`}><FaHome/> Home</span>
                                    </li>
                                </Link>
                                <Link to="/activity" style={{ textDecoration: 'none' }}>
                                    <li className="nav-item">
                                        <span className={`nav-link mx-lg-2 ${location.pathname === '/activity' ? 'active' : ''}`} ><RiCalendarScheduleFill/> Activities</span>
                                    </li>
                                </Link>
                                <Link to="/goals" style={{ textDecoration: 'none' }}>
                                    <li className="nav-item">
                                        <span className={`nav-link mx-lg-2 ${location.pathname === '/goals' ? 'active' : ''}`} ><GiStairsGoal/> Goals</span>
                                    </li>
                                </Link>
                                <Link to="/achivements" style={{ textDecoration: 'none' }}>
                                    <li className="nav-item">
                                        <span className={`nav-link mx-lg-2 ${location.pathname === '/achivements' ? 'active' : ''}`} ><GiTargetPrize/> Achievements</span>
                                    </li>
                                </Link>
                                <Link to="/profile" style={{ textDecoration: 'none' }}>
                                    <li className="nav-item">
                                        <span className={`nav-link mx-lg-2 ${location.pathname === '/profile' ? 'active' : ''}`} > <ImProfile/> Profile</span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <Link to='/'  style={{ textDecoration: 'none' }} onClick={() => logout()}>
                        <IoLogOut className="logout-icon" />
                        <span className='logout'>Logout</span>
                    </Link>
                </div>
            </nav>
            <div>{children}</div>
        </div>
    )
}

export default Navbar