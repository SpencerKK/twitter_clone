import {
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL
} from "./types";
import axios from "axios";

// create post
export const createPost = ({ content }) => async (dispatch) => {
    const config = { 
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ content });

    try {
        const res = await axios.post(
            "http://localhost:5000/api/posts/post",
            body,
            config
        )

        dispatch({
            type: CREATE_POST_SUCCESS,
            payload: res.data
        })
            
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => alert(error.msg))
        }

        dispatch({
            type: CREATE_POST_FAIL
        })
    }
}


