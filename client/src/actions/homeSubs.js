import {
    RENDER_CONNECT
} from "./types";

export const renderConnectSubs = () => dispatch => {
    dispatch({ type: RENDER_CONNECT });
  };