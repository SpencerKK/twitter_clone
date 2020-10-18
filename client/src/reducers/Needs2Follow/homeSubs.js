import {
    RENDER_CONNECT,
    LOGOUT,
    UNRENDER_CONNECT
} from "../../actions/types";

const initialState = {
    connect: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case RENDER_CONNECT:
            return {
                ...state,
                connect: true
            }
        case LOGOUT:
        case UNRENDER_CONNECT:
            return {
                ...state,
                connect: false
            }
        default:
            return state;
    }
}