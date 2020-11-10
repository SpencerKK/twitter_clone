import { GET_LIKED_POSTS } from "../actions/types";

const initialState = {
  likedPosts: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIKED_POSTS:
      return {
        ...state,
        likedPosts: action.payload.likedPosts,
      };
    default:
      return state;
  }
};
