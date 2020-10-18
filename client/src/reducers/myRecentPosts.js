import {
    GET_MY_RECENT_POSTS
} from "../actions/types";

const initialState = {
    myRecentPosts: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_RECENT_POSTS:
            return {
                ...state,
                myRecentPosts: action.payload.myRecentPosts
            }
        default:
            return state;
    }
}