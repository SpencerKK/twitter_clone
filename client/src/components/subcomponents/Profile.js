import React from "react";
import { connect } from "react-redux";
import PostCard from "./PostCard";

const Profile = ({ profile, userPosts }) => {
    return (
        <div className="profile">
            <div className="profile-background">
                <div className="background-color"></div>
                <div className="user-card">
                    <i className="fas fa-user"></i>
                    <p id="sn">{profile.screenName}</p>
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
            <div className="user-posts">
                <p id="posts-title">Posts</p>
                <div className="post-roll">
                    {
                        userPosts && userPosts.length >= 1 ? 
                        userPosts.map(post => (
                            <PostCard 
                                screenName={post.screenName}
                                postId={post.id}
                                postContent={post.content}
                            />
                        )) : <p>This user has no posts!</p>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    userPosts: state.profile.userPosts
})

export default connect(mapStateToProps)(Profile);