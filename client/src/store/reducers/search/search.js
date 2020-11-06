import produce from 'immer';
import { INPUT_UPDATED } from '../../actions/types';

const defaultState = {
  currentSearch: '',
};

const search = produce((draft = defaultState, action) => {
  switch (action.type) {
    case INPUT_UPDATED:
      draft.currentSearch = action.newSearch;
      return draft;
    default:
      return draft;
  }
});

export default search;
