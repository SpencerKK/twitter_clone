import { RENDER_PROFILE, UNRENDER_PROFILE } from "./types";

export const renderProfile = () => dispatch => {
    dispatch({ type: RENDER_PROFILE })
}

export const unrenderProfile = () => dispatch => {
    dispatch({ type: UNRENDER_PROFILE })
}