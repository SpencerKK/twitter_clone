import {
    RENDER_SINGLE_POST,
    UNRENDER_SINGLE_POST
} from "../actions/types";

const initialState = {
    singlePost: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RENDER_SINGLE_POST:
            return {
                ...state,
                singlePost: true
            }
        case UNRENDER_SINGLE_POST:
            return {
                ...state,
                singlePost: false
            }
        default:
            return state;
    }
}
