import React, { useEffect } from "react";
import { connect } from "react-redux";

// actions
import { renderActiveUsers } from "../../actions/Needs2Follow/homeSubs";
import { followUser } from "../../actions/follow";

const Connect = ({ renderActiveUsers, activeUsers, followUser }) => {

   useEffect((activeUsers) => {
      renderActiveUsers();
   }, []);

   const onFollow = (e, followed_id) => {
      e.preventDefault();
      followUser(followed_id)
   }

   return (
      <div className="connect">
         {activeUsers &&
            activeUsers.users.map((user) => (
               <div className="connect-user-card">
                  <i className="fas fa-user"></i>
                  <div className="connect-user-info">
                     <div className="connect-head">
                        <p id="screenName">{user.screenName}</p>
                        <button onClick={(e) => onFollow(e, {followed_id: user.id})}>Follow</button>
                     </div>
                     <p id="detail">
                        Proident occaecat ex cillum aute sunt excepteur aute
                        dolor ad est consequat magna.
                     </p>
                  </div>
               </div>
            ))}
      </div>
   );
};

const mapStateToProps = (state) => ({
   activeUsers: state.activeUsers.activeUsers,
});

export default connect(mapStateToProps, { renderActiveUsers, followUser })(Connect);
