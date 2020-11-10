import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getLikedPosts } from "../../actions/likedPosts";

// components
import PostCard from "./PostCard";

const LikedPost = ({ getLikedPosts, likedPosts }) => {
  useEffect(() => {
    getLikedPosts();
  }, []);

  return (
    <div className="liked-post">
      {likedPosts !== null ? (
        likedPosts.map((post) => (
          <PostCard
            postId={post.id}
            postContent={post.content}
            screenName={post.screenName}
            isLiked={post.isLiked}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
        ))
      ) : (
        <p>no</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  likedPosts: state.likedPosts.likedPosts,
});

export default connect(mapStateToProps, { getLikedPosts })(LikedPost);
