import produce from "immer";
import { INPUT_UPDATED } from "../actions/types";

const defaultState = {
    currentSearch: ""
};

export default produce((draft = defaultState, action) => {
    switch (action.type) {
        case INPUT_UPDATED:
            draft.currentSearch = action.newSearch;
            return draft
        default:
            return draft;
    }
}
);