import React, { useRef, useState } from "react";
import { connect } from "react-redux";

// actions
import { createPost } from "../actions/post";
import { unrenderSinglePost } from "../actions/singlePostSubs";

// components
import Content from "./subcomponents/Content";
import Connect from "./subcomponents/Connect";
import SinglePost from "./subcomponents/SinglePost";
import LikedPost from "./subcomponents/LikedPost";

const MainStream = ({ createPost, connectSub, unrenderSinglePost, singlePostSub, likedPostSub }) => {
   const [postContent, setPostContent] = useState("");
   const textAreaRef = useRef(null);
   let heightLimit = 500;

   const onAreaType = (e) => {
      textAreaRef.current.style.height = "";
      textAreaRef.current.style.height =
         Math.min(textAreaRef.current.scrollHeight, heightLimit) + "px";

      setPostContent(e.target.value);
   };

   const onPostSubmit = (e, postContent) => {
      if (postContent === "") {
         alert("Cannot create an empty post!");
      } else {
         createPost({ content: postContent });
         setPostContent("");
      }
   };

   const renderOptions = () => {
      if (connectSub === true) {
         return <Connect />;
      } else if (singlePostSub === true) {
         return <SinglePost />;
      } else if (likedPostSub === true) {
         return <LikedPost />
      } else {
         return <Content />;
      }
   };

   const renderTitleOptions = () => {
      if (connectSub === true) {
         return <p>Who To Follow</p>;
      } else if (singlePostSub === true) {
         return (
            <div className="single-post">
               <p>
                  <i className="fas fa-arrow-left" onClick={() =>unrenderSinglePost()}></i>A Cool Post
               </p>
            </div>
         );
      } else {
         return <p>Home</p>;
      }
   };

   const renderTextArea = () => {
      if (singlePostSub === true) {
         return null;
      } else {
         return (
            <form onSubmit={(e) => onPostSubmit(e, postContent)}>
               <div className="home-textarea-wrapper">
                  <div className="icon-holder">
                     <i className="fas fa-user"></i>
                  </div>
                  <textarea
                     ref={textAreaRef}
                     onChange={(e) => onAreaType(e)}
                     placeholder="What's Happening..."
                     value={postContent}
                  ></textarea>
               </div>
               <div className="post-addl-wrapper">
                  <div className="add-btns">
                     <i className="fas fa-image"></i>
                     <i className="far fa-laugh-wink"></i>
                  </div>
                  <input id="home-post-btn" type="submit" value="post" />
               </div>
            </form>
         );
      }
   };

   return (
      <div className="main-stream-wrapper">
         <div className="main-stream-header">
            <div className="main-stream-title">{renderTitleOptions()}</div>
            {renderTextArea()}
         </div>
         <div className="post-stream">{renderOptions()}</div>
      </div>
   );
};

const mapStateToProps = (state) => ({
   connectSub: state.homeSubs.connect,
   singlePostSub: state.singlePostSubs.singlePost,
   likedPostSub: state.likedPostSubs.likedPost
});

export default connect(mapStateToProps, { createPost, unrenderSinglePost })(MainStream);
