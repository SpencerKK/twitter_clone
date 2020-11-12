import {
    RENDER_PROFILE,
    UNRENDER_PROFILE
} from "../actions/types";

const initialState = {
    profilePage: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RENDER_PROFILE:
            return {
                ...state,
                profilePage: true
            }
        case UNRENDER_PROFILE:
            return {
                ...state,
                profilePage: false
            }
        default:
            return state
    }
}