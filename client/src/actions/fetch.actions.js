import { fetchConstants } from "../constants/fetch.constants";

export const fetchActions = {
  request,
  success,
  error,
  clear,
};

function request() {
  return { type: fetchConstants.REQUEST};
}

function success() {
  return { type: fetchConstants.SUCCESS};
}

function error() {
  return { type: fetchConstants.ERROR};
}

function clear() {
  return { type: fetchConstants.CLEAR };
}
