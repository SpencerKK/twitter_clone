import {
    RENDER_SINGLE_POST
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
        default:
            return state;
    }
}
