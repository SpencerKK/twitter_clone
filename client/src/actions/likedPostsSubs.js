import { RENDER_LIKED_POST, UNRENDER_LIKED_POST } from "./types";

export const renderLikedPost = () => dispatch => {
    dispatch({ type: RENDER_LIKED_POST })
}

export const unrenderLikedPost = () => dispatch => {
    dispatch({ type: UNRENDER_LIKED_POST })
}