import React from "react";

const PostCard = () => {
   return (
      <div className="post-card">
         <div className="post-body">
            <div className="post-user-icon">
               <i className="fas fa-user"></i>
            </div>
            <div className="post-content">
               <div className="post-card-username">
                  <p>PersonWhoPosts</p>
               </div>
               <div className="post-text">
                  Magna elit nisi do excepteur aute eu do aute. Magna elit nisi
                  do excepteur aute eu do aute.
               </div>
            </div>
         </div>
         <div className="post-respose-opt">
            <div className="post-option-wrapper">
               <i className="far fa-comment"></i>
               <p>450</p>
            </div>
            <div className="post-option-wrapper">
               <i className="far fa-heart"></i>
               <p>9</p>
            </div>
         </div>
      </div>
   );
};

export default PostCard;
