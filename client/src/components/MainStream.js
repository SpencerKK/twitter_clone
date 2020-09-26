import React, { useRef } from "react";
import PostCard from "./layout/PostCard";

const MainStream = () => {
   const textAreaRef = useRef(null);
   let heightLimit = 500;

   const onAreaType = () => {
      textAreaRef.current.style.height = "";
      textAreaRef.current.style.height =
         Math.min(textAreaRef.current.scrollHeight, heightLimit) + "px";
   };

   return (
      <div className="main-stream-wrapper">
         <div className="main-stream-header">
            <p>Home</p>
            <form>
               <div className="home-textarea-wrapper">
                  <div className="icon-holder">
                     <i className="fas fa-user"></i>
                  </div>
                  <textarea
                     ref={textAreaRef}
                     // style={{ backgroundColor: "pink" }}
                     onChange={onAreaType}
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

export default MainStream;
