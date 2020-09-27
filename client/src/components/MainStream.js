import React, { useRef, useState } from "react";
import PostCard from "./layout/PostCard";
import { createPost } from "../actions/post";
import { connect } from "react-redux";

const MainStream = ({ createPost }) => {
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
      e.preventDefault();
      createPost({ content: postContent })
   };

   return (
      <div className="main-stream-wrapper">
         <div className="main-stream-header">
            <p>Home</p>
            <form onSubmit={(e) => onPostSubmit(e, postContent)}>
               <div className="home-textarea-wrapper">
                  <div className="icon-holder">
                     <i className="fas fa-user"></i>
                  </div>
                  <textarea
                     ref={textAreaRef}
                     onChange={(e) => onAreaType(e)}
                     placeholder="What's Happening..."
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
         </div>
         <div className="post-stream">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
         </div>
      </div>
   );
};

export default connect(null, { createPost })(MainStream);
