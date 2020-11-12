export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const AUTH_ERROR = "AUTH_ERROR";
export const USER_LOADED = "USER_LOADED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

// post
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAIL = "CREATE_POST_FAIL";
export const GET_SINGLE_POST = "GET_SINGLE_POST";

// comments
export const GET_POST_COMMENTS = "GET_POST_COMMENTS";
export const POST_COMMENT = "POST_COMMENT";

// follow
export const GET_FOLLOWING_POSTS = "GET_FOLLOWING_POSTS";
export const GET_FOLLOWING_POSTS_FAIL = "GET_FOLLOWING_POSTS_FAIL";
export const GET_MY_RECENT_POSTS = "GET_MY_RECENT_POSTS";

// likes
export const LIKE_POST = "LIKE_POST";
export const GET_LIKED_POSTS = "GET_LIKED_POSTS";

// for new users needing a list of active users to follow
export const RENDER_CONNECT = "RENDER_CONNECT";
export const UNRENDER_CONNECT = "UNRENDER_CONNECT";
export const RENDER_ACTIVE_USERS = "RENDER_ACTIVE_USERS";

export const NEW_USER_FOLLOWS = "NEW_USER_FOLLOWS";

// rendering different components
export const RENDER_SINGLE_POST = "RENDER_SINGLE_POST";
export const UNRENDER_SINGLE_POST = "UNRENDER_SINGLE_POST";
export const RENDER_LIKED_POST = "RENDER_LIKED_POST";
export const UNRENDER_LIKED_POST = "UNRENDER_LIKED_POST";
export const RENDER_PROFILE = "RENDER_PROFILE";
export const UNRENDER_PROFILE = "UNRENDER_PROFILE";