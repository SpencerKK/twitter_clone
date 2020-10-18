import { combineReducers } from "redux";

import auth from "./auth";
import post from "./post";
import followingPosts from "./followingPosts";
import myRecentPosts from "./myRecentPosts";

// only for new users
import homeSubs from "./Needs2Follow/homeSubs";
import activeUsers from "./Needs2Follow/activeUsers";

export default combineReducers({
    auth,
    post,
    homeSubs,
    activeUsers,
    followingPosts,
    myRecentPosts
})