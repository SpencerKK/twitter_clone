import React from "react";
import { connect } from "react-redux";

// actions
import { renderProfile } from "../../actions/profileSubs";
import { getProfile } from "../../actions/profile";
import { unrenderSinglePost } from "../../actions/singlePostSubs";
import { unrenderLikedPost } from "../../actions/likedPostsSubs";

const CommentCard = ({ content, screenName, userId, renderProfile, getProfile, unrenderSinglePost, unrenderLikedPost }) => {
   
    const onRenderProfile = (e, userId) => {
        e.stopPropagation();
        getProfile(userId).then(() => {
            renderProfile();
            unrenderSinglePost();
            unrenderLikedPost();
        })
    }
   
    return (
      <div className="comment-card">
         <div className="comment-user-icon">
            <i className="fas fa-user"></i>
         </div>
         <div className="comment-content">
            <div className="comment-card-screenName" onClick={(e) => onRenderProfile(e, userId)}>
               <p>{screenName}</p>
            </div>
            <div className="comment-text">
               <p>{content}</p>
            </div>
         </div>
      </div>
   );
};

export default connect(null, { renderProfile, getProfile, unrenderSinglePost, unrenderLikedPost })(CommentCard);
