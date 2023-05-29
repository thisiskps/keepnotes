import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";


const Navbar = () => {
  let navigate=useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }


  let location = useLocation();
  // useEffect(() => {
  // }, [location]);
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              KeepNotes
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {/* <Link
                    className={`nav-link ${location.pathname === "/Home" ? "active" : ""}`}
                    aria-current="page"
                    to="/Home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/User" ? "active" : ""}`} to="/User">
                    User
                  </Link> */}
                </li>
              </ul>
              </div>
              {!localStorage.getItem('token')?<form className="d-flex">
                <Link to="/login" className="btn btn-primary mx-1" role="button" >Login </Link>
                <Link to="/signup" className="btn btn-primary mx-1" role="button" >Sign Up</Link>
              </form>:<button onClick={handleLogout} className="btn btn-primary mx-1" role="button"> Signout</button>}

            
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
