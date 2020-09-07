import React from "react";

import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";

// redux
import store from "./store";
import { Provider } from "react-redux";
// Load User Import
// SetAuthToken import

// components
import WelcomePage from "./components/WelcomePage";

const App = () => {
   return (
      <Provider store={store}>
         <Router>
            <div className="app">
               <Switch>
                  <Route exact path="/" component={WelcomePage} />
               </Switch>
            </div>
         </Router>
      </Provider>
   );
};

export default App;
