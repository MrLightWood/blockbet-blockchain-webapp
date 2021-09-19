import { fetchConstants } from "../constants/fetch.constants";

const initialState = {
  fetching: false,
  fetched: false,
};

export function fetch(state = initialState, action) {
  switch (action.type) {
    case fetchConstants.REQUEST:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case fetchConstants.SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    case fetchConstants.ERROR:
      return initialState;
    case fetchConstants.CLEAR:
      return initialState;
    default:
      return state;
  }
}