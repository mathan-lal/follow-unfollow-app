import React,{useEffect, useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Header = () => {

    const [logIn, setLogIn] = useState(false);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);


const navigate = useNavigate();


    const handleLogout = ()=>{
        localStorage.removeItem("accessToken");
       
        setLogIn(false);
        setTimeout(()=>{
            navigate("/login");

        },500)
    }

    useEffect(()=>{
        if(localStorage.getItem('accessToken')){
            // setLogout(true);
            setLogIn(true);
        }
        setTimeout(()=>{
          getFollowing();
        getFollowers();
        console.log("5ms trigered")
      },500)
        
    },);
    
const user = localStorage.getItem("currentuser");

const getFollowing = async (event) => {
  try{
      await axios.get("http://localhost:8080/following",
       {
          headers: {
            
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
          },
        }
        ).then(result=>{
          setFollowing(result.data.user.following.length);
          console.log(result.data.user.following.length);

          
        });
    }
    catch(err){
      console.log("Found an error", err)
    }
};

const getFollowers = async (event) => {
  try{
      await axios.get("http://localhost:8080/followers",
       {
          headers: {
            
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
          },
        }
        ).then(result=>{
          setFollowers(result.data.user.followers.length);
          console.log(result.data.user.followers.length);

          
        });
    }
    catch(err){
      console.log("Found an error", err)
    }
};


  return (
    <div>
        {
            logIn ?

            <nav className="navbar navbar-expand-lg navbar-light  main-header">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                  Follow & Unfollow App
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
                  <ul className="navbar-nav">
                  <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Home
                      </Link>
                    </li>


                    <li className="nav-item">
                      <Link className="nav-link" to="/followers">
                        Followers ({followers})
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/following">
                        Following ({following})
                      </Link>
                    </li>
                   
                      <li className="nav-item">
                      <Link className="nav-link" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  
                    <li className="nav-item current-user">
                      <Link className="nav-link">
                        {user}
                      </Link>
                    </li>
                   
                    {/* <li className="nav-item">
                      <Link
                        className="nav-link disabled"
                        href="#"
                        tabindex="-1"
                        aria-disabled="true"
                      >
                        Disabled
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </nav>

            :

            <nav className="navbar navbar-expand-lg navbar-light main-header">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
              Follow & Unfollow App
                </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                 
                    <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                 
                  {/* <li className="nav-item">
                    <Link
                      className="nav-link disabled"
                      href="#"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      Disabled
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
        }

    </div>
  );
};

export default Header;
