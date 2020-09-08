import React from "react";

const LoginForm = () => {
   return (
      <form onSubmit={() => console.log("Login")}>
         <input
            type="text"
            name="email"
            placeholder="Email or Screen Name"
            // onChange={(e) => onChange(e)}
         />
         <input
            autoComplete="new-password"
            type="password"
            name="password"
            placeholder="Password"
            // onChange={(e) => onChange(e)}
         />
         <input id="register-btn" type="submit" value="Login" />
      </form>
   );
};

export default LoginForm;