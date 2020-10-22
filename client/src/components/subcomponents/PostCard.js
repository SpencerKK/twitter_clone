import React from "react";
import { connect } from "react-redux";

// action
import { likePost } from "../../actions/likes";

const PostCard = ({ screenName, postContent, postId, likePost }) => {

   const onLikePost = (postId) => {
      likePost(postId);
      alert("You liked a post");
   }
   
   return (
      <div className="post-card">
         <div className="post-body">
            <div className="post-user-icon">
               <i className="fas fa-user"></i>
            </div>
            <div className="post-content">
               <div className="post-card-username">
                  <p>{screenName}</p>
               </div>
               <div className="post-text">
                  <p>{postContent}</p>
               </div>
            </div>
         </div>
         <div className="post-respose-opt">
            <div className="post-option-wrapper">
               <i className="far fa-comment"></i>
               <p>450</p>
            </div>
            <div className="post-option-wrapper">
               <i className="far fa-heart" onClick={() => onLikePost(postId)}></i>
               <p>9</p>
            </div>
         </div>
      </div>
   );
};

export default connect(null, { likePost })(PostCard);
