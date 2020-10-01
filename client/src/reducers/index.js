import { combineReducers } from "redux";

import auth from "./auth";
import post from "./post";
import followingPosts from "./followingPosts";

export default combineReducers({
    auth,
    post,
    followingPosts
})