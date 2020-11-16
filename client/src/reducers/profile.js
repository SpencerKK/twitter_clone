import { GET_PROFILE } from "../actions/types";

const initialState = {
   profile: null,
   userPosts: null,
   followingCount: 0,
   followerCount: 0
};

export default (state = initialState, action) => {
   switch (action.type) {
      case GET_PROFILE:
         return {
            ...state,
            profile: action.payload.user,
            userPosts: action.payload.userPosts,
            followingCount: action.payload.isFollowingCount,
            followerCount: action.payload.followerCount
         };
      default:
         return state;
   }
};
