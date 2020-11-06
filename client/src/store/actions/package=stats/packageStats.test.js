import {
  fetchingPackageStats,
  startFetching,
  fetchSuccess,
  fetchError,
} from './packageStats';
import * as ActionTypes from '../../actions/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as MockPackageStats from '../../mock/packageStats.mock';
import * as MockPackageApi from '../../../api/package/package.mock';
import apiBaseURL from '../../../api/apiConfig';

const createMockStore = configureMockStore([thunk]);

afterEach(() => {
  fetchMock.restore();
});

test('fetch package stats should dispatch appropriate actions for a failed fetch', () => {
  fetchMock.getOnce(
    apiBaseURL + 'api/search?package=react',
    MockPackageApi.fetchError
  );

  const mockStore = createMockStore(MockPackageStats.mockDefaultState);

  const expectedActions = [
    { type: ActionTypes.INPUT_UPDATED, newSearch: 'react' },
    { type: ActionTypes.START_FETCHING },
    {
      type: ActionTypes.FETCH_ERROR,
      errorMessage: MockPackageApi.mockErrorMessage,
    },
  ];

  return mockStore.dispatch(fetchingPackageStats('react')).then(() => {
    expect(mockStore.getActions()).toEqual(expectedActions);
  });
});

test('fetch package stats should dispatch appropriate actions for a successful fetch', () => {
  fetchMock.getOnce(
    apiBaseURL + 'api/search?package=lodash',
    MockPackageApi.fetchSuccess
  );
  const mockStore = createMockStore(MockPackageStats.mockDefaultState);

  const expectedActions = [
    {
      type: ActionTypes.INPUT_UPDATED,
      newSearch: 'lodash',
    },
    { type: ActionTypes.START_FETCHING },
    {
      type: ActionTypes.FETCH_SUCCESS,
      payload: MockPackageApi.mockSuccessPayload,
    },
  ];

  return mockStore.dispatch(fetchingPackageStats('lodash')).then(() => {
    expect(mockStore.getActions()).toEqual(expectedActions);
  });
});

test('start fetching action creator returns start fetching action', () => {
  const action = startFetching('react');
  expect(action).toEqual({ type: ActionTypes.START_FETCHING });
});

test('fetch error action creator returns start fetching action', () => {
  const action = fetchError('error message');
  expect(action).toEqual({
    type: ActionTypes.FETCH_ERROR,
    errorMessage: 'error message',
  });
});

test('fetch success action creator returns fetch success action', () => {
  const sizeStatsMock = {
    version: '1.1.2',
    minifiedSizeInKb: 32.2,
    gzipSizeInKb: 11,
  };
  const action = fetchSuccess(sizeStatsMock);
  expect(action).toEqual({
    type: ActionTypes.FETCH_SUCCESS,
    payload: sizeStatsMock,
  });
});
