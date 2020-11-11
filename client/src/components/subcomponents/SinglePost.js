import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import CommentCard from "./CommentCard";

// actions
import { postComment } from "../../actions/comment";
import { getPostComments } from "../../actions/singlePost";
import { getSinglePost } from "../../actions/singlePost";
import { renderSinglePost } from "../../actions/singlePostSubs";
import { likePost } from "../../actions/likes";
import { getFollowingPosts } from "../../actions/followingPosts";

const SinglePost = ({
  singlePost,
  postLikeCount,
  postCommentCount,
  singlePostComments,
  getFollowingPosts,
  postComment,
  likePost,
  getPostComments,
  getSinglePost,
  isLiked,
  renderSinglePost,
}) => {
  const [postContent, setPostContent] = useState(null);
  const textAreaRef = useRef(null);
  let heightLimit = 500;

  const onAreaType = (e) => {
    textAreaRef.current.style.height = "";
    textAreaRef.current.style.height =
      Math.min(textAreaRef.current.scrollHeight, heightLimit) + "px";

    setPostContent(e.target.value);
  };

  // TextArea height ^ Modal stuff v

  let [modalStatus, setModalStatus] = useState("none");

  const openModal = () => {
    setModalStatus("block");
  };

  const closeModal = () => {
    setModalStatus("none");
  };

  const onLikePost = ({ singlePost }) => {
    let postId = singlePost.id;
    likePost(postId);
    getFollowingPosts().then(() => {
      getSinglePost(postId);
    });
  };

  const onCommentSubmit = ({ singlePost }) => {
    let content = postContent;
    let postId = singlePost.id;
    postComment({ content, postId });
    getFollowingPosts().then(() => {
      getPostComments(postId).then(() => {
        getSinglePost(postId);
      });
    });
    closeModal();
  };

  return (
    <div className="single-post">
      {singlePost !== null && singlePostComments !== null ? (
        <>
          <div className="post-header">
            <div className="post-user-icon">
              <i className="fas fa-user"></i>
            </div>
            <p id="screenName">{singlePost.screenName}</p>
          </div>
          <div className="post-body">
            <p>{singlePost.content}</p>
          </div>
          <div className="post-data">
            <div id="post-comments">
              <p className="count">{postCommentCount}</p>
              <p>Comments</p>
            </div>
            <div id="post-likes">
              <p className="count">{postLikeCount}</p>
              <p>Likes</p>
            </div>
          </div>
          <div className="post-actions">
            <i className="far fa-comment" onClick={() => openModal()}></i>
            <i
              className={isLiked ? "fas fa-heart" : "far fa-heart"}
              style={{ color: isLiked && "red" }}
              onClick={() => onLikePost({ singlePost })}
            ></i>
          </div>
          <div
            className="comment-modal-wrapper"
            style={{ display: modalStatus }}
          >
            <div className="comment-modal">
              <i className="fas fa-times" onClick={() => closeModal()}></i>
              <div className="post-header">
                <div className="post-user-icon">
                  <i className="fas fa-user"></i>
                </div>
                <p id="screenName">{singlePost.screenName}</p>
              </div>
              <div className="post-body">
                <p>{singlePost.content}</p>
              </div>
              <div className="comment-area">
                <div className="post-user-icon">
                  <i className="fas fa-user"></i>
                </div>
                <div className="comment-textarea-wrapper">
                  <textarea
                    ref={textAreaRef}
                    placeholder="Post Your Reply"
                    onChange={(e) => onAreaType(e)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-submit-wrapper">
                <button onClick={() => onCommentSubmit({ singlePost })}>
                  Reply
                </button>
              </div>
            </div>
          </div>
          {singlePostComments.length <= 0 ? (
            <p id="no-comments">Be The First Comment!</p>
          ) : (
            singlePostComments.map((comment) => (
              <CommentCard
                screenName={comment.screenName}
                content={comment.content}
              />
            ))
          )}
          {singlePostComments.length <= 0 ? null : (
            <p id="end-of-comments">End of Comments</p>
          )}
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  singlePost: state.singlePost.singlePost,
  isLiked: state.singlePost.isLiked,
  postLikeCount: state.singlePost.postLikeCount,
  postCommentCount: state.singlePost.postCommentCount,
  singlePostComments: state.singlePostComments.postComments,
});

export default connect(mapStateToProps, {
  postComment,
  getPostComments,
  getFollowingPosts,
  getSinglePost,
  renderSinglePost,
  likePost,
})(SinglePost);
