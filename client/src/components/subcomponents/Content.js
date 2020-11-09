import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// actions
import { getFollowingPosts } from "../../actions/followingPosts";
import { renderConnectSubs } from "../../actions/Needs2Follow/homeSubs";
import { getMyRecentPosts } from "../../actions/myRecentPosts";

// components
import PostCard from "./PostCard";

const Content = ({
   getFollowingPosts,
   getMyRecentPosts,
   myRecentPosts,
   followingPosts,
   renderConnectSubs,
   unrenderConnectSubs,
}) => {
   useEffect(() => {
      getFollowingPosts();
      getMyRecentPosts();
   }, []);

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
               <div className="recent-post-block">
                  {myRecentPosts &&
                     myRecentPosts.map((post) => (
                        <PostCard
                           postId={post.id}
                           postContent={post.content}
                           screenName={post.screenName}
                           isLiked={post.isLiked}
                           likeCount={post.likeCount}
                           commentCount={post.commentCount}
                        />
                     ))}
               </div>
               {followingPosts &&
                  followingPosts.map((post) => (
                     <PostCard
                        postId={post.id}
                        postContent={post.content}
                        screenName={post.screenName}
                        isLiked={post.isLiked}
                        likeCount={post.likeCount}
                        commentCount={post.commentCount}
                     />
                  ))}
            </>
         )}
      </div>
   );
};

const mapStateToProps = (state) => ({
   followingPosts: state.followingPosts.isFollowingPosts,
   myRecentPosts: state.myRecentPosts.myRecentPosts,
});

export default connect(mapStateToProps, {
   getFollowingPosts,
   getMyRecentPosts,
   renderConnectSubs,
})(Content);
