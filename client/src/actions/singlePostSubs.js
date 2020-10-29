import { RENDER_SINGLE_POST, UNRENDER_SINGLE_POST } from "./types";

export const renderSinglePost = () => dispatch => {
    dispatch({ type: RENDER_SINGLE_POST })
}

export const unrenderSinglePost = () => dispatch => {
    dispatch({ type: UNRENDER_SINGLE_POST })
}