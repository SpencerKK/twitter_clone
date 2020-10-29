import React from "react";

const SinglePost = () => {
   return (
      <div className="single-post">
         <div className="post-header">
            <div className="post-user-icon">
               <i className="fas fa-user"></i>
            </div>
            <p id="screenName">screenName</p>
         </div>
         <div className="post-body">
             Ex cillum duis commodo excepteur sint exercitation commodo sint eiusmod mollit anim. Ex cillum duis commodo excepteur sint exercitation commodo sint eiusmod mollit anim.
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
      </div>
   );
};

export default SinglePost;
