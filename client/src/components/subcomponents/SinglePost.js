import React from "react";
import { connect } from "react-redux";

import CommentCard from "./CommentCard";

const SinglePost = ({ singlePost, singlePostComments }) => {
   return (
      <div className="single-post">
         {singlePost !== null && singlePostComments !== null ? (
            <>
               <div className="post-header">
                  <div className="post-user-icon">
                     <i className="fas fa-user"></i>
                  </div>
                  <p id="screenName">{singlePost.screenName}</p>
               </div>
               <div className="post-body">
                  <p>{singlePost.content}</p>
               </div>
               <div className="post-data">
                  <div id="post-likes">
                     <p className="count">1.8k</p>
                     <p>Likes</p>
                  </div>
                  <div id="post-comments">
                     <p className="count">103</p>
                     <p>Comments</p>
                  </div>
               </div>
               <div className="post-actions">
                  <i className="far fa-heart"></i>
                  <i className="far fa-comment"></i>
               </div>
               {singlePostComments.length <= 0 ? (
                  <p id="no-comments">Nothing here</p>
               ) : (
                  singlePostComments.map((comment) => 
                     <CommentCard />
                  )
               )}
            </>
         ) : (
            <p>loading...</p>
         )}
      </div>
   );
};

const mapStateToProps = (state) => ({
   singlePost: state.singlePost.singlePost,
   singlePostComments: state.singlePostComments.postComments,
});

export default connect(mapStateToProps, {})(SinglePost);
