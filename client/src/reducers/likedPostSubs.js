import { RENDER_LIKED_POST, UNRENDER_LIKED_POST } from "../actions/types";

const initialState = {
    likedPost: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RENDER_LIKED_POST:
            return {
                ...state,
                likedPost: true
            }
        case UNRENDER_LIKED_POST:
            return {
                ...state,
                likedPost: false
            }
        default:
            return state;
    }
}