import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// action
import { likePost } from "../../actions/likes";
import { getFollowingPosts } from "../../actions/followingPosts";
import { getMyRecentPosts } from "../../actions/myRecentPosts";
import { renderSinglePost } from "../../actions/singlePostSubs";
import { getSinglePost } from "../../actions/singlePost";

const PostCard = ({
   screenName,
   postContent,
   postId,
   isLiked,
   likeCount,
   getFollowingPosts,
   getMyRecentPosts,
   renderSinglePost,
   getSinglePost,
   followingPosts,
   likePost,
}) => {
   const onLikePost = (e, postId) => {
      e.stopPropagation();
      likePost(postId);
      getFollowingPosts();
      getMyRecentPosts();
   };

   const onRenderPost = (postId) => {
      getSinglePost(postId);
      renderSinglePost();
   };

   return (
      <div
         className="post-card"
         key={postId}
         onClick={() => onRenderPost(postId)}
      >
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
                  className={isLiked === true ? "fas fa-heart" : "far fa-heart"}
                  // className="far fa-heart"
                  style={{ color: isLiked === true && "red" }}
                  onClick={(e) => onLikePost(e, postId)}
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

export default connect(mapStateToProps, {
   likePost,
   getFollowingPosts,
   renderSinglePost,
   getSinglePost,
   getMyRecentPosts,
})(PostCard);
