import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// actions
import { getFollowingPosts } from "../../actions/followingPosts";
import { renderConnectSubs } from "../../actions/homeSubs";

// components
import PostCard from "./PostCard";

const Content = ({ getFollowingPosts, followingPosts, renderConnectSubs }) => {
   useEffect(() => {
      getFollowingPosts();
   }, [getFollowingPosts]);

   return (
      <div className="content">
         {followingPosts && followingPosts.length < 1 ? (
            <div className="lets-go">
               <h2>Welcome to Coolr</h2>
               <p>
                  It looks like you're not following anyone yet. Click here to
                  find some people you might want to hear from!
               </p>
               <button onClick={renderConnectSubs}>Get Started</button>
            </div>
         ) : (
            <>
               {
                  followingPosts && followingPosts.map(post => (
                     <PostCard postContent={post.content} screenName={post.screenName} />
                  ))   
               }
            </>
         )}
      </div>
   );
};

const mapStateToProps = (state) => ({
   followingPosts: state.followingPosts.isFollowingPosts,
});

export default connect(mapStateToProps, { getFollowingPosts, renderConnectSubs })(Content);
