import { userConstants } from "../constants/user.constants";
import { userService } from "../services/user.service";

export const userActions = {
  login,
  logout,
  register,
  getStatus,
};

function getStatus() {
  return (dispatch) => {
    dispatch(loginRequest(""));
    userService.getStatus().then(
      (res) => {
        if (res.message === "Authorized") {
          dispatch(loginSuccess(res));
        } else {
          dispatch(loginFailure(res));
        }
      }
    ).catch((err) => {
        dispatch(loginFailure({status: "Error", message: err}));
        return err;
    });
  };
}

function register(email, password) {
  return (dispatch) => {
    dispatch(registerRequest());

    userService.register(email, password).then(
      (res) => {
        if(res.message === "Registration successful")
        {
          dispatch(registerSuccess(res));
        } else {
          dispatch(registerFailure(res));
        }
        return res;
      }
    ).catch((err) => {
      dispatch(registerFailure({status: "Error", message: err}));
      return err;
    });
  };
}

function login(email, password, rememberMe) {
  return (dispatch) => {
    dispatch(loginRequest());

    userService.login(email, password, rememberMe).then(
      (res) => {
        if(res.message === "Authorized")
        {
          dispatch(loginSuccess(res));
        } else {
          dispatch(loginFailure(res));
        }
        return res;
      }
    ).catch((err) => {
      dispatch(loginFailure({status: "Error", message: err}));
      return err;
    });
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function loginRequest(data) {
  return { type: userConstants.LOGIN_REQUEST, data };
}
function loginSuccess(data) {
  return { type: userConstants.LOGIN_SUCCESS, data };
}
function loginFailure(error) {
  return { type: userConstants.LOGIN_FAILURE, error };
}

function registerRequest(data) {
  return { type: userConstants.REGISTER_REQUEST, data};
}
function registerSuccess(data) {
  return { type: userConstants.REGISTER_SUCCESS, data};
}
function registerFailure(error) {
  return { type: userConstants.REGISTER_FAILURE, error};
}