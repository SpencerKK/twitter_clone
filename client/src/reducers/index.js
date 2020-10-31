import { combineReducers } from "redux";

import auth from "./auth";
import post from "./post";
import followingPosts from "./followingPosts";
import myRecentPosts from "./myRecentPosts";

// only for new users
import homeSubs from "./Needs2Follow/homeSubs";
import activeUsers from "./Needs2Follow/activeUsers";

// for rendering single post
import singlePostSubs from "./singlePostSubs";
import singlePost from "./singlePost";

export default combineReducers({
    auth,
    post,
    singlePostSubs,
    homeSubs,
    activeUsers,
    followingPosts,
    myRecentPosts,
    singlePost
})