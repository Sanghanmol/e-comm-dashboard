import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <nav className="nav-container">
        <img
          alt="logo"
          className="logo"
          src="https://i.pinimg.com/originals/c3/b3/14/c3b3146e35033a66d563dbce4e53a0b7.png"
        />
        {auth ? (
          <ul className="nav-ul">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Products</Link>
            </li>
            <li>
              <Link to="/">Update Products</Link>
            </li>
            <li>
              <Link onClick={logout} to="/logout">
                Logout({JSON.parse(auth).name}){" "}
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-ul nav-right">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Nav;
