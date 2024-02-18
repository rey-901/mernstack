import React, { useContext } from 'react'
import "./navbar.css"
import { AuthContext, ButtonContext } from '../App'
import { Link, NavLink, Outlet } from 'react-router-dom';

function Navbar() {
    const { buttonState, setButtonState } = useContext(ButtonContext);
    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext);
    const userName = JSON.parse(sessionStorage.getItem("userName"))

    function handleLogout() {
        setIsLoggedIn(false);
        sessionStorage.removeItem("userToken")
        sessionStorage.removeItem("user")
    }


    return (
        <>
            <div className='navbar-a'>
                <Link to="/">

                    <div className="left">
                        <img
                            className="mainlogo"
                            src="https://www.easemytrip.com/images/brandlogo/emtlogo_new4.svg"
                            alt=""
                        />

                    </div>
                </Link>


                <div className="middle">
                    <ol className='middle-ol'>
                        <NavLink to="/"><li>Flights</li></NavLink>
                        <NavLink to={"/hotel"}><li>Hotels</li></NavLink>
                        <NavLink><li>Bus</li></NavLink>
                        <NavLink><li>Trains</li></NavLink>
                    </ol>
                </div>
                {!isLoggedin && <div className="right" onClick={() => setButtonState(true)}>My Account</div>}
                {
                    isLoggedin && <div><span>{userName}</span> <span onClick={handleLogout}>Logout</span></div>
                }



            </div >
            <Outlet />
        </>
    )
}

export default Navbar
