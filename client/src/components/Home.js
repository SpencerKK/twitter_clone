import React from "react";
import { Redirect } from "react-router-dom";

// redux
import { connect } from "react-redux"

// components
import Navigation from "./Navigation";
import RightBar from "./RightBar";

const Home = ({ isAuthenticated }) => {

    if (!isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <div className="home-wrapper">
            <div className="home-center-container">
            <Navigation />
            <h1>MainStream</h1>
            <RightBar />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Home);