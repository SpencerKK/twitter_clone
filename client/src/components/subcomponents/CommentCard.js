import React from "react";

const CommentCard = ({ content, screenName }) => {
   return (
      <div className="comment-card">
         <div className="comment-user-icon">
            <i className="fas fa-user"></i>
         </div>
         <div className="comment-content">
            <div className="comment-card-screenName">
               <p>{screenName}</p>
            </div>
            <div className="comment-text">
               <p>{content}</p>
            </div>
         </div>
      </div>
   );
};

export default CommentCard;
