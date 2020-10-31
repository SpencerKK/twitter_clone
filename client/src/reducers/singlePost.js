import {
    GET_SINGLE_POST
} from "../actions/types";

const initialState = {
    singlePost: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SINGLE_POST:
            return {
                ...state,
                singlePost: action.payload.post
            }
        default:
            return state;
    }
}