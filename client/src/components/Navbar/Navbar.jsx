import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
//import Button from '../../components/Button/Button'
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import './Navbar.css'
//import decode from "jwt-decode";
import { jwtDecode }  from "jwt-decode";

function Navbar() {
  const dispatch = useDispatch();
  var User = useSelector((state) => state.currentUserReducer);
  
  

  //var User= null
  useEffect(() => {
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  },[dispatch])

  // useEffect(() => {
  //   const token = User?.token;
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     if (decodedToken.exp * 1000 < new Date().getTime()) {
  //       handleLogout();
  //     }
  //   }
  //   dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  // }, [dispatch]);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };
  return (
    <nav className='main-nav'>
      <div className='navbar'>
         <div  className='navbar-1'>
        <Link to='/' className='nav-item  nav-logo'>
            <img src={logo} alt="logo" />
        </Link>
        <Link to='/' className='nav-item nav-btn'>About</Link>
        <Link to='/' className='nav-item nav-btn'>Products</Link>
        <Link to='/' className='nav-item nav-btn'>For Teams</Link>
        <Link to='/' className='nav-item nav-btn'></Link>
        <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>

          </div>

        <div className='navbar-2'>
        {User === null ? 
        <Link to='/Auth' className=' nav-item nav-links'>Log in </Link>:
        <><Avatar backgroundColor='#009dff' px="10x" py="7px" borderRadius="50%" color='white'><Link to='/User' style={{color:"white", textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>        
        <button className='nav-item nav-links' onClick={handleLogout} >Log out</button>
        </>
     }
     </div>

      </div>
    </nav>
  )
}

export default Navbar
