import {
   REGISTER_SUCCESS,
   LOGIN_SUCCESS,
   REGISTER_FAIL,
   LOGIN_FAIL,
   USER_LOADED,
   AUTH_ERROR,
} from "../actions/types";

const initialState = {
   token: localStorage.getItem("token"),
   isAuthenticated: null,
   loading: true,
   user: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case REGISTER_SUCCESS:
         localStorage.setItem("token", action.payload.token);
         return {
            ...state,
            token: action.payload.token,
            isAuthenticated: true,
            loading: false,
         };

      default:
         return state;
   }
};
