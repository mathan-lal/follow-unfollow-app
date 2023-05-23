import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidFullName, setInvalidFullName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);


  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if ((fullName && email && password) === "") {
      // alert("All fields are required");
      setInvalidFullName(true);
      // setInvalidEmail(true);
      setInvalidPassword(true);
      setInvalidEmail(true);

    }

    try {
      await axios
        .post("http://localhost:8080/register", {
          fullName: fullName,
          email: email,
          password: password,
        })
        .then((res) => {
          setTimeout(() => {
            navigate("/login");
            setFullName("");
            setEmail("");
            setPassword("");
          }, 5000);
          setInvalidEmail(false)

          setFlag(true);

          console.log(res);
        })
        .catch((err) => {
        
          if (err.response.status === 404) {
            setInvalidEmail(true);
            // setInvalidEmail(true);

            console.log("User registered already");
          } else {
            console.log(err);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <div className="row ">
        <div className="col-sm-12 col-md-3"></div>
        <div className="col-sm-12 col-md-6 user-form">
          <h3 className="text-center">User Registration</h3>
          <p>
            {flag ? (
              <span className="success-msg">
                Welcome User Successfully Registered...!!!
              </span>
            ) : (
              ""
            )}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                aria-describedby="emailHelp"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                placeholder="Full Name"
              />
              {invalidFullName && fullName.length <= 0 ? (
                <p style={{ color: "red", textAlign: "left" }}>
                  Incorrect Full Name
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => {setEmail(e.target.value) ;setInvalidEmail(false);}}
                value={email}
                placeholder="Email"
              />
              {invalidEmail ? (
                <p style={{ color: "red", textAlign: "left" }}>
                  Incorrect/Already exist Email address
                </p>
              ) : ( ""
                // email.length <=0  ? (
                //   <p style={{ color: "red", textAlign: "left" }}>
                //     Enter Email address
                //   </p>
                // ) : (
                //   ""
                // )
               
              )}
             
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
               {invalidPassword && password.length <= 0 ? (
                <p style={{ color: "red", textAlign: "left" }}>
                  Incorrect Password
                </p>
              ) : (
                ""
              )}
             
            </div>
          
     
            <button
              className="btn btn-primary w-100 mb-3 login-signup-btn"
              type="submit"
            >
              Submit
            </button>
          </form>
          <p className="text-center">
            Already have an account ? <Link to="/login">Login</Link>
          </p>
        </div>
        <div className="col-sm-12 col-md-3"></div>
      </div>
    </div>
  );
};

export default Signup;
