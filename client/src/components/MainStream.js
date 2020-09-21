import React from "react";

const MainStream = () => {
   return (
      <div className="main-stream-wrapper">
         <div className="main-stream-header">
            <p>Home</p>
            <form>
               <div className="home-textarea-wrapper">
                  <div className="icon-holder">
                  <i className="fas fa-user"></i>
                  </div>
                  <textarea placeholder="What's Happening..."></textarea>
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
         {/* <div className="post-stream">
      <p>PostCard</p>
      <p>PostCard</p>
      <p>PostCard</p>
    </div> */}
      </div>
   );
};

export default MainStream;
