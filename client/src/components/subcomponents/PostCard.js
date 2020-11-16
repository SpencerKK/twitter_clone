import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// action
import { likePost } from "../../actions/likes";
import { getFollowingPosts } from "../../actions/followingPosts";
import { getMyRecentPosts } from "../../actions/myRecentPosts";
import { renderSinglePost } from "../../actions/singlePostSubs";
import { getSinglePost } from "../../actions/singlePost";
import { getPostComments } from "../../actions/singlePost";
import { getLikedPosts } from "../../actions/likedPosts";
import { getProfile } from "../../actions/profile";
import { renderProfile } from "../../actions/profileSubs";
import { unrenderLikedPost } from "../../actions/likedPostsSubs";

const PostCard = ({
   screenName,
   postContent,
   postId,
   userId,
   isLiked,
   likeCount,
   commentCount,
   getFollowingPosts,
   getMyRecentPosts,
   renderSinglePost,
   getSinglePost,
   getPostComments,
   getLikedPosts,
   getProfile,
   renderProfile,
   unrenderLikedPost,
   likePost,
}) => {
   const onLikePost = (e, postId) => {
      e.stopPropagation();
      likePost(postId).then(() => {
         getFollowingPosts();
         getMyRecentPosts();
         getLikedPosts();
         getProfile(userId);
      });
   };

   const onRenderPost = (postId) => {
      getSinglePost(postId);
      getPostComments(postId);
      renderSinglePost();
   };

   const onRenderProfile = (e, userId) => {
      e.stopPropagation();
      getProfile(userId).then(() => {
         renderProfile();
         unrenderLikedPost();
      });
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
                  <p onClick={(e) => onRenderProfile(e, userId)}>
                     {screenName}
                  </p>
               </div>
               <div className="post-text">
                  <p>{postContent}</p>
               </div>
            </div>
         </div>
         <div className="post-respose-opt">
            <div className="post-option-wrapper">
               <i className="far fa-comment"></i>
               <p>{commentCount}</p>
            </div>
            <div className="post-option-wrapper">
               <i
                  className={isLiked === true ? "fas fa-heart" : "far fa-heart"}
                  style={{ color: isLiked === true && "red" }}
                  onClick={(e) => onLikePost(e, postId)}
               ></i>
               <p>{likeCount}</p>
            </div>
         </div>
      </div>
   );
};

export default connect(null, {
   likePost,
   getFollowingPosts,
   renderSinglePost,
   getSinglePost,
   getPostComments,
   getMyRecentPosts,
   getLikedPosts,
   unrenderLikedPost,
   getProfile,
   renderProfile,
})(PostCard);
