import { userConstants } from "../constants/user.constants";

let initialState = {
  type: "",
  loggingIn: false,
  loggedIn: false,
  registering: false,
  registered: false,
  error: "",
  data: "",
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        type: userConstants.LOGIN_REQUEST,
        loggedIn: false,
        loggingIn: true,
        data: action,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        type: userConstants.LOGIN_SUCCESS,
        loggedIn: true,
        loggingIn: false,
        data: action,
      };
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
        registered: false,
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        registered: true,
        data: action,
      };
    case userConstants.REGISTER_FAILURE:
      return {...initialState, type:userConstants.REGISTER_FAILURE, data: action, error: action.error};
    case userConstants.LOGIN_FAILURE:
      return {...initialState, type:userConstants.LOGIN_FAILURE , data: action, error: action.error};
    case userConstants.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
