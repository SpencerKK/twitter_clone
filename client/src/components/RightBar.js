import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// actions
import { renderActiveUsers } from "../actions/Needs2Follow/homeSubs";
import { followUser } from "../actions/follow";
import { getFollowingPosts } from "../actions/followingPosts";
import { unrenderConnectSubs } from "../actions/Needs2Follow/homeSubs";

const RightBar = ({ activeUsers, renderActiveUsers, getFollowingPosts, unrenderConnectSubs, followUser }) => {
    let [loading, setLoading] = useState(true);

   useEffect(() => {
      renderActiveUsers();
      getFollowingPosts();
   }, [loading]);

   const onFollow = (e, followed_id) => {
       e.preventDefault();
       followUser(followed_id);
       setLoading(!loading);
       getFollowingPosts();
       renderActiveUsers();
       unrenderConnectSubs();
   }

   return (
      <div className="right-bar">
         <div className="user-list">
            <p id="who-to-follow">Who to Follow</p>
            {activeUsers &&
               activeUsers.potentialFollowUsers.slice(0, 6).map((user) => (
                  <div className="user-card">
                     <div className="user-card-text">
                        <i className="fas fa-user"></i>
                        <p>{user.screenName}</p>
                     </div>
                     <button onClick={e => onFollow(e, { followed_id: user.id })}>Follow</button>
                  </div>
               ))}
         </div>
      </div>
   );
};

const mapStateToProps = (state) => ({
   activeUsers: state.activeUsers.activeUsers,
});

export default connect(mapStateToProps, { renderActiveUsers, followUser, unrenderConnectSubs, getFollowingPosts })(RightBar);
