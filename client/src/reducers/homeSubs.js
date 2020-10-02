import {
    RENDER_CONNECT
} from "../actions/types";

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
        default:
            return state;
    }
}