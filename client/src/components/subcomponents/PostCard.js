import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// action
import { likePost } from "../../actions/likes";
import { getFollowingPosts } from "../../actions/followingPosts";

const PostCard = ({
   screenName,
   postContent,
   postId,
   isLiked,
   likeCount,
   getFollowingPosts,
   followingPosts,
   likePost,
}) => {
   const onLikePost = (postId) => {
      likePost(postId);
      getFollowingPosts();
   };

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
               <i
                  className={
                     isLiked && isLiked === true
                        ? "fas fa-heart"
                        : "far fa-heart"
                  }
                  // className="far fa-heart"
                  style={isLiked && isLiked === true ? { color: "red" } : null}
                  onClick={() => onLikePost(postId)}
               ></i>
               <p>{likeCount}</p>
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = (state) => ({
   followingPosts: state.followingPosts.isFollowingPosts,
});

export default connect(mapStateToProps, { likePost, getFollowingPosts })(
   PostCard
);
