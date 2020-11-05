import packageStats from "./packageStats";
import * as ActionTypes from "../actions/types";

const defaultState = {
  fetchingDone: false,
  hasError: false,
  errorMessage: null,
  sizeStats: [],
};

const sizeStatsMock = {
  version: "1.1.2",
  minifiedSizeInKb: 32.2,
  gzipSizeInKb: 11,
};

test("reducer return default state", () => {
  const state = packageStats(undefined, { type: "unknown action" });
  expect(state).toEqual(defaultState);
});

test("reducer return state unchanged when action unknown", () => {
  const previousState = { ...defaultState };
  previousState.fetchingDone = true;

  const state = packageStats(previousState, { type: "unknown action" });

  expect(state).toBe(previousState); // Same object reference is returned
});

test("reducer return new state when start fetching", () => {
  const previousState = {
    fetchingDone: true,
    hasError: true,
    errorMessage: "Some error message",
    sizeStats: [{ version: 0 }],
  };

  const expectedState = {
    fetchingDone: false,
    hasError: false,
    errorMessage: "Some error message", // Error message should not be impacted by starting a new fetch
    sizeStats: [{ version: 0 }], // Current data should not be impacted but starting a new fetch
  };

  const state = packageStats(previousState, {
    type: ActionTypes.START_FETCHING,
  });

  expect(state).not.toBe(previousState); // Check that state hasn't been mutated
  expect(state).toEqual(expectedState);
});

test("fetch success from default state", () => {
  const expectedState = {
    fetchingDone: true,
    hasError: false,
    errorMessage: null,
    sizeStats: sizeStatsMock,
  };

  const state = packageStats(defaultState, {
    type: ActionTypes.FETCH_SUCCESS,
    payload: sizeStatsMock,
  });

  expect(state).not.toBe(defaultState);
  expect(state).toEqual(expectedState);
});

test("fetch success after an error", () => {
  const previousState = {
    fetchingDone: false,
    hasError: false,
    errorMessage: "had errors",
    sizeStats: [],
  };

  const expectedState = {
    fetchingDone: true,
    hasError: false,
    errorMessage: null,
    sizeStats: sizeStatsMock,
  };

  const state = packageStats(defaultState, {
    type: ActionTypes.FETCH_SUCCESS,
    payload: sizeStatsMock,
  });

  expect(state).not.toBe(previousState);
  expect(state).toEqual(expectedState);
});

test("reducer return new state on fetch error", () => {
  const previousState = {
    fetchingDone: true,
    hasError: false,
    errorMessage: "Previous error message",
    sizeStats: [{ version: 0 }],
  };

  const expectedState = {
    fetchingDone: true,
    hasError: true,
    errorMessage: "error message",
    sizeStats: [],
  };

  const state = packageStats(previousState, {
    type: ActionTypes.FETCH_ERROR,
    errorMessage: "error message",
  });

  expect(state).not.toBe(previousState);
  expect(state).toEqual(expectedState);
});
