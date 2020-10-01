import {
    GET_FOLLOWING_POSTS,
    GET_FOLLOWING_POSTS_FAIL
} from "../actions/types";

const initialState = {
    isFollowingPosts: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWING_POSTS:
            return {
                ...state,
                isFollowingPosts: action.payload.isFollowingPosts
            }
        case GET_FOLLOWING_POSTS_FAIL:
            return {
                ...state,
                isFollowingPosts: null
            }
        default :
            return state;
    }
}