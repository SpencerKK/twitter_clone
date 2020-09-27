import {
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
} from "../actions/types";

const initialState = {
    content: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                content: action.payload.content
            }
        case CREATE_POST_FAIL:
            return {
                ...state,
                content: null
            }
        default:
            return state;
    }
}