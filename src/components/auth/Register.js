import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const password = useRef();
  const [displayPasswordError, setDisplayPasswordError] = useState(false);
  const [displayUsernameError, setDisplayUsernameError] = useState(false);
  let navigate = useNavigate();

  const validatePassword = () => {
    if (password.current.value.length >= 4) {
      return true;
    }
    setDisplayPasswordError(true);
    return false;
  };
  const validateUsername = async () => {
    const res = await fetch(process.env.REACT_APP_API + "/user/exists", {
      method: "POST",
      body: JSON.stringify({
        username: username.current.value,
      }),
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();
    if (data.exists === "false") {
      return true;
    }
    setDisplayUsernameError(true);
    return false;
  };
  const register = async (event) => {
    event.preventDefault();
    if (validatePassword() || validateUsername()) {
      const res = await fetch(process.env.REACT_APP_API + "/user/register", {
        method: "POST",
        body: JSON.stringify({
          username: username.current.value,
          password: password.current.value,
        }),
        headers: { "Content-type": "application/json" },
      });
      if (res.status === 201) {
        navigate("/login");
      } else {
        //redirect to error page
      }
    }
  };

  return (
    <div className="center page-auth column">
      <h3>Register</h3>
      <form className="form-auth" onSubmit={register}>
        <div className="form-container">
          <span className="input-wrapper">
            <input
              className="input-text"
              placeholder="Username"
              ref={username}
              onFocus={() => setDisplayUsernameError(false)}
            />
          </span>
          {displayUsernameError && (
            <p className="form-auth-error">Username already exists</p>
          )}
        </div>
        <div className="form-container">
          <span className="input-wrapper">
            <input
              type='password'
              className="input-text"
              placeholder="Password"
              ref={password}
              onFocus={() => setDisplayPasswordError(false)}
            />
          </span>
          {displayPasswordError && (
            <p className="form-auth-error">
              Password must be 4 characters long
            </p>
          )}
        </div>

        <button className="btn-primary">Register</button>
      </form>
      <br />
      <a className="link" href="/login">
        Login
      </a>
    </div>
  );
}
