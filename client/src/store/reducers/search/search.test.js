import search from './search';
import * as ActionTypes from '../../actions/types';

const defaultState = {
  currentSearch: '',
};

test('reducer return default state', () => {
  const state = search(undefined, { type: 'unknown action' });
  expect(state).toEqual(defaultState);
});

test('reducer return state unchanged when action unknown', () => {
  const previousState = { ...defaultState };
  previousState.fetchingDone = true;

  const state = search(previousState, { type: 'unknown action' });

  expect(state).toBe(previousState); // Same untouched object reference is returned
});

test('return state with new search', () => {
  const expectedState = { currentSearch: 'lodash' };
  const state = search(defaultState, {
    type: ActionTypes.INPUT_UPDATED,
    newSearch: 'lodash',
  });

  expect(state).not.toBe(defaultState); // Same untouched object reference is returned
  expect(state).toEqual(expectedState); // Same untouched object reference is returned
});
