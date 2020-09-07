import React from "react";
import { Redirect } from "react-router-dom";

// redux
import { connect } from "react-redux"

const Home = ({ isAuthenticated }) => {

    if (!isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <div className="home">
            <h1>This is my Home</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Home);