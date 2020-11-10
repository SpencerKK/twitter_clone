import { GET_LIKED_POSTS } from "../actions/types";
import axios from "axios";

// getLikedPosts
export const getLikedPosts = () => async (dispatch) => {
    try {
        let res = await axios.get("http://localhost:5000/api/likes/likedPosts");

        dispatch({
            type: GET_LIKED_POSTS,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => alert(err.message));
        }
    }
}