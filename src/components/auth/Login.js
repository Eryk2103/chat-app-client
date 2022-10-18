import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import UserContext from "../../UserContext";
export default function Login() {
  const username = useRef();
  const password = useRef();
  const [displayError, setDisplayError] = useState(false);
  const {addUser} = useContext(UserContext);
  let navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
      },
    });
    if (res.status === 400) {
      setDisplayError(true);
    }
    if (res.status === 200) {
      const data = await res.json();
      addUser(username.current.value, data.token) 
      navigate("/");
    }
  };
  return (
    <div className="center page-auth column">
      <h3>Login</h3>
      {displayError && (
        <p className="form-auth-error">Username or password is incorrect</p>
      )}
      <form className="form-auth" onSubmit={login}>
        <div className="form-container">
          <span className="input-wrapper">
            <input
              className="input-text"
              placeholder="Username"
              ref={username}
              onFocus={() => setDisplayError(false)}
            />
          </span>
          <span className="input-wrapper">
            <input
              type='password'
              className="input-text"
              placeholder="Password"
              ref={password}
              onFocus={() => setDisplayError(false)}
            />
          </span>
        </div>
        <button className="btn-primary">Login</button>
      </form>
      <br />
      <a className="link" href="/register">
        Register
      </a>
    </div>
  );
}
