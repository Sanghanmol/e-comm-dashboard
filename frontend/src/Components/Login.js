import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    console.log(
      "email,password,repeatPassword",
      email,
      password,
      repeatPassword
    );
    let result = await fetch("http://localhost:4000/login", {
      method: "post",
      body: JSON.stringify({ email, password, repeatPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };
  return (
    <div className="login">
      <div className="formBox">
        <h1>Login</h1>
        <p>Please fill in this form to login:</p>

        <input
          className="inputBox"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
        />
        <input
          className="inputBox"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
        />
        <input
          className="inputBox"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          placeholder="Repeat Password"
          required
        />
        <button onClick={handleLogin} className="appButton" type="button">
          Login
        </button>
        <br></br>
        <p>
          Not having an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
