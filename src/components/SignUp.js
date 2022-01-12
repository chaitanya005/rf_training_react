import React , { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
    })


    const handleChange = () => {
        console.log(userDetails) 
        axios.post('http://localhost:4000/signup', {
            body: userDetails
        })
        .then(res => navigate('/login'))
        .catch(err => console.log(err))
               
    }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
              <div className="form" id="form">
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Name</label>
                  <input
                    className="form-control"
                    id="formGroupExampleInput"
                    type="text"
                    required={true}
                    name="full_name"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput1">User name</label>
                  <input
                    className="form-control"
                    id="formGroupExampleInput1"
                    type="text"
                    required={true}
                    name="user_name"
                    value={userDetails.userName}
                    onChange={(e) => setUserDetails({...userDetails, userName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Email address</label>
                  <input
                    className="form-control"
                    id="formGroupExampleInput2"
                    type="email"
                    required={true}
                    name="email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput3">Password</label>
                  <input
                    className="form-control"
                    id="formGroupExampleInput3"
                    type="password"
                    required={true}
                    name="password"
                    value={userDetails.password}
                    onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
                  />
                </div>
                <br />
                <div className="text-center">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold text-center"
                    onClick={handleChange}
                  >
                    Sign Up
                  </button>
                </div>
                <hr className="my-4" />
                <div className="text-center">
                  <p>Already have an account ?</p>
                  <a href="/login">Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
