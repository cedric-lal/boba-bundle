import produce from "immer";
import { FETCH_ERROR, FETCH_SUCCESS, START_FETCHING } from "../actions/types";

const defaultState = {
  fetchingDone: false,
  hasError: false,
  errorMessage: null,
  sizeStats: [],
};

export default produce((draft = defaultState, action) => {
  switch (action.type) {
    case START_FETCHING:
      draft.fetchingDone = false;
      draft.hasError = false;
      return draft;
    case FETCH_SUCCESS:
      draft.fetchingDone = true;
      draft.hasError = false;
      draft.errorMessage = null;
      draft.sizeStats = action.payload;
      return draft;
    case FETCH_ERROR:
      draft.fetchingDone = true;
      draft.hasError = true;
      draft.errorMessage = action.errorMessage;
      draft.sizeStats = [];
      return draft;
    default:
      return draft;
  }
}
);
