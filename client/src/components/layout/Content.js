import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getFollowingPosts } from "../../actions/followingPosts";

// components
import PostCard from "./PostCard";

const Content = ({ getFollowingPosts, followingPosts }) => {
   useEffect(() => {
      getFollowingPosts();
   }, [getFollowingPosts]);

   return <div className="content">
       {
           followingPosts && followingPosts.length < 1 ? <p>nothing</p> : <PostCard />
       }
    </div>;
};

const mapStateToProps = (state) => ({
   followingPosts: state.followingPosts.isFollowingPosts,
});

export default connect(mapStateToProps, { getFollowingPosts })(Content);
