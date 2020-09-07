import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { register } from "../actions/auth";

const WelcomePage = ({ register, isAuthenticated }) => {
   const [regData, setRegData] = useState({
      screenName: "",
      emai: "",
      password: "",
      password2: "",
   });

   const { screenName, email, password } = regData;

   const onReigster = async e => {
      e.preventDefault();
      if (password !== regData.password2) {
         alert("Passwords must match")
      } else {
         register({ screenName, email, password })
      }
   }

   const onChange = (e) => {
      setRegData({ ...regData, [e.target.name]: e.target.value });
   };

   if (isAuthenticated) {
      return <Redirect to="/home" />
   }

   return (
      <div className="welcome-wrapper">
         <div className="welcome-form">
            <h1>Coolr</h1>
            <p>
               Stay in the loop. <br /> Join & start posting
            </p>
            <form onSubmit={e => onReigster(e)}>
               <input
                  type="text"
                  name="screenName"
                  placeholder="Screen Name"
                  autoComplete="none"
                  onChange={(e) => onChange(e)}
               />
               <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => onChange(e)}
               />
               <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => onChange(e)}
               />
               <input
                  type="password"
                  name="password2"
                  placeholder="Password Confirm"
                  autoComplete="none"
                  onChange={(e) => onChange(e)}
               />
               <input id="register-btn" type="submit" value="Submit" />
            </form>
            <div className="signin-option">
               <p>already have an account?</p>
               <p id="signin-p">Sign In</p>
            </div>
         </div>
         <div className="welcome-footer">
            <p>
               Built by{" "}
               <a href="https://spencerkenealy.com/">Spencer Kenealy</a>
            </p>

            <a href="https://github.com/SpencerKK">
               <i className="fab fa-github-alt"></i>
            </a>
         </div>
      </div>
   );
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(WelcomePage);
