import React from "react";

const Profile = () => {
    return (
        <div className="profile">
            <div className="profile-background">
                <div className="background-color"></div>
                <div className="user-card">
                    <i className="fas fa-user"></i>
                    <p id="sn">screenName</p>
                    <div className="bio">
                        <p>
                        Excepteur dolore esse velit commodo amet cillum ea duis ad dolore dolor consectetur.
                        </p>
                    </div>
                    <div className="quick-stats">
                        <p><span>19</span>following</p>
                        <p><span>8</span> followers</p>
                    </div>
                    <button>Edit Profile</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;