import { GET_PROFILE } from "../actions/types";

const initialState = {
   profile: null,
   userPosts: null
};

export default (state = initialState, action) => {
   switch (action.type) {
      case GET_PROFILE:
         return {
            ...state,
            profile: action.payload.user,
            userPosts: action.payload.userPosts
         };
      default:
         return state;
   }
};
