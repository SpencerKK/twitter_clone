import { GET_POST_COMMENTS } from "../actions/types";

const initialState = {
   postComments: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case GET_POST_COMMENTS:
         return {
            ...state,
            postComments: action.payload.postComments,
         };
      default:
         return state;
   }
};
