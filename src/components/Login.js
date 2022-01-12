import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = () => {
    console.log(loginDetails);
    axios
      .post("http://localhost:4000/login", {
        email: loginDetails.email,
        password: loginDetails.password,
      })
      .then((res) => {
        console.log(res);
        var config = {
          method: 'get',
          url: 'http://localhost:4000/currUser',
          headers: { 
            'Authorization': res.data.token
          }
        };
        axios(config)
          .then(res => {
            console.log(res)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            navigate("/");
          })
          .catch(err => console.log(err))
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Log In
              </h5>
              <div className="form" id="form">
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Email address</label>
                  <input
                    className="form-control"
                    id="formGroupExampleInput"
                    type="email"
                    required={true}
                    name="email"
                    value={loginDetails.email}
                    onChange={(e) =>
                      setLoginDetails({
                        ...loginDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput2">Password</label>
                  <input
                    className="form-control"
                    id="formGroupExampleInput2"
                    type="password"
                    required={true}
                    name="password"
                    value={loginDetails.password}
                    onChange={(e) =>
                      setLoginDetails({
                        ...loginDetails,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <br />
                <div className="text-center">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold text-center"
                    onClick={handleChange}
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
