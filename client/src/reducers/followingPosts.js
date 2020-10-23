import {
    GET_FOLLOWING_POSTS,
    GET_FOLLOWING_POSTS_FAIL,
    LOGOUT
} from "../actions/types";

const initialState = {
    isFollowingPosts: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWING_POSTS:
            return {
                ...state,
                isFollowingPosts: action.payload.combinedPosts
            }
        case GET_FOLLOWING_POSTS_FAIL:
        case LOGOUT:
            return {
                ...state,
                isFollowingPosts: null
            }
        default :
            return state;
    }
}