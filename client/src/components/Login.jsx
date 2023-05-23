import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
import "./Signup.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [invalidEmail,setInvalidEmail]=useState(false)
  const [invalidPassword,setInvalidPassword]=useState(false) 

  const navigate = useNavigate()

  const handleSubmit = async (event) => {

   if(password===""){
    setInvalidPassword(true);
   }
  
    event.preventDefault();
    try {
        await axios.post("http://localhost:8080/login", {
          
          email: email,
          password: password,

        }).then(result=>{
          console.log(result.data);
          localStorage.setItem("userdata",result.data.user.id);
          localStorage.setItem("currentuser",result.data.user.email);

          localStorage.setItem("accessToken",result.data.accessToken);

          setFlag(true)
          setInvalidEmail(true)
          setInvalidEmail(false)
          setInvalidPassword(false)
          setTimeout(()=>{

            navigate('/');
          },2000)
          setEmail("");
        setPassword("");

        }).catch((res)=>{
          
          if(res.response.status===404){
            console.log("User not found");
            setInvalidEmail(true)
            // setInvalidPassword(false)

          }
          else if(res.response.status===401){
            console.log("Password incorrect");
            setInvalidEmail(false)

            setInvalidPassword(true)
          }
          else{

            console.log("Username and password incorrect try again...")
          }
          
          // if(res.status(404)){
          //   console.log("User 404 ",res);
          // }
        });
       
       
      } catch (err) {
        
        console.log("catch",err);
       
        setFlag2(true)
      }
    // handle response
  };

  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-12 col-md-3"></div>
      <div className="col-sm-12 col-md-6 user-form">
        <h3 className="text-center">User Login</h3>
        <p>
            {flag
                ? <span className="success-msg">User Successfully Logged In...!!!</span>
                : ""
              }
              {flag2
                ? <span style={{color:"red"}}>Email / Password incorrect</span>
                : ""
              }
              
          </p>

        <form onSubmit={handleSubmit}>
       
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => {setEmail(e.target.value); setInvalidEmail(false)}}
              value={email}
              placeholder="Email"
            />
            {invalidEmail ?
            <p style={{color:'red',textAlign:'left'}}>Invalid email address</p>
            : ""
            }
          </div>
         
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
             {invalidPassword ?
            <p style={{color:'red',textAlign:'left'}}>Invalid password</p>
            : ""
            }
          </div>


          {/* <Link to={"/signup"}>Signup</Link> */}
          

          <button className="btn btn-primary w-100 mb-3 login-signup-btn" type="submit">
            Submit
          </button>
        </form>
        <p className="text-center" >Don't have an account ?<Link to="/signup"> Create Account</Link></p>
      </div>
      <div className="col-sm-12 col-md-3"></div>
    </div>
  </div>
  );
}

export default Login;