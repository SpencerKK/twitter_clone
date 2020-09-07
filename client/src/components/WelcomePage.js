import React, { useState } from "react";

const WelcomePage = () => {
   const [regData, setRegData] = useState({
      screenName: "",
      emai: "",
      password: "",
      password2: "",
   });

   return (
      <div className="welcome-wrapper">
         <div className="welcome-form">
            <h1>Coolr</h1>
            <p>
               Stay in the loop. <br /> Join & start posting
            </p>
            <form>
               <input
                  type="text"
                  name="screenName"
                  placeholder="Screen Name"
                  autoComplete="none"
                  onChange={() => console.log("Changed")}
               />
               <input
                  type="text"
                  name="email"
                  readonly="readonly"
                  placeholder="Email"
                  onChange={() => console.log("Changed")}
               />
               <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={() => console.log("Changed")}
               />
               <input
                  type="password"
                  name="password2"
                  placeholder="Password Confirm"
                  autoComplete="none"
                  onChange={() => console.log("Changed")}
               />
               <input id="register-btn" type="submit" value="Submit" />
            </form>
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

export default WelcomePage;
