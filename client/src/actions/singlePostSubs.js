import { RENDER_SINGLE_POST } from "./types";

export const renderSinglePost = () => dispatch => {
    dispatch({ type: RENDER_SINGLE_POST })
}