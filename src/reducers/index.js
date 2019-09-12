import { DATA_LOADED, LOAD_DATA } from "../constants/action-types";

const initialState = {
  repos: [],
  page: 1,
  per_page: 10
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADED:
      return {
        ...state,
        page: state.page + 1,
        repos: [...state.repos, ...action.payload]
      };
    case LOAD_DATA:
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
}
export default rootReducer;
