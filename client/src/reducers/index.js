import { combineReducers } from "redux";

import auth from "./auth";
import post from "./post";
import homeSubs from "./homeSubs";
import followingPosts from "./followingPosts";

export default combineReducers({
    auth,
    post,
    homeSubs,
    followingPosts
})