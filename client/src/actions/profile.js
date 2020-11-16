import {
    GET_PROFILE
} from "./types";
import axios from "axios";

export const getProfile = (userId) => async (dispatch) => {
    try {
        let res = await axios.get("http://localhost:5000/api/profile/getProfile/" + userId);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        if (err) {
            alert(err)
        }
    }
}