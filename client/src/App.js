import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

// components
import WelcomePage from "./components/WelcomePage";

const App = () => {
    return (
        <Router>
            <div className="app">
            <Switch>
                <Route exact path="/" component={WelcomePage} />
            </Switch>
        </div>
        </Router>
    )
}

export default App;