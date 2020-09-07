import React, { useEffect } from "react";

import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";

// redux
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

// components
import WelcomePage from "./components/WelcomePage";
import Home from "./components/Home";

const App = () => {

   useEffect(() => {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
   })

   return (
      <Provider store={store}>
         <Router>
            <div className="app">
               <Switch>
                  <Route exact path="/" component={WelcomePage} />
                  <Route exact path="/home" component={Home} />
               </Switch>
            </div>
         </Router>
      </Provider>
   );
};

export default App;
