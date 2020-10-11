import {
    RENDER_ACTIVE_USERS
} from "../../actions/types";

const initialState = {
    activeUsers: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RENDER_ACTIVE_USERS: 
            return {
                ...state,
                activeUsers: action.payload
            }
        default:
            return state;
    }
}