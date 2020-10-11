import React, { useState } from "react";
import { connect } from "react-redux";

// redux
import { login } from "../../actions/auth";

const LoginForm = ({ login }) => {
   const [userData, setUserData] = useState({
      email: "",
      password: ""
   });

   const { email, password } = userData;

   const onChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
   };

   const onLogin = async (e) => {
      e.preventDefault();
      login({ email, password });
   };

   return (
      <form onSubmit={e => onLogin(e)}>
         <input
            type="text"
            name="email"
            placeholder="Email or Screen Name"
            onChange={(e) => onChange(e)}
         />
         <input
            autoComplete="new-password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => onChange(e)}
         />
         <input id="register-btn" type="submit" value="Login" />
      </form>
   );
};

export default connect(null, { login })(LoginForm);
