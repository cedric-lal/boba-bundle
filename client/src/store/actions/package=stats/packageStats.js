import { FETCH_ERROR, FETCH_SUCCESS, START_FETCHING } from '../types';
import { updateSearchInput } from '../search/search';
import * as PackageApi from '../../../api/package/package';

/**
 * Async action creator that dispatch the actions to handle package search
 * @param {string} packageName
 */
export const fetchingPackageStats = (packageName) => {
  return (dispatch) => {
    // Make sure the input value match the search (if user search package with URL directly for example)
    dispatch(updateSearchInput(packageName));
    dispatch(startFetching(packageName));
    return PackageApi.search(packageName).then((res) => {
      if (res.status !== 200) {
        dispatch(fetchError(res.payload.errorMessage));
      } else {
        dispatch(fetchSuccess(res.payload));
      }
    });
  };
};

/**
 * Start fetching package stats action creator
 */
export const startFetching = () => {
  return { type: START_FETCHING };
};

/**
 * API call finish and success action creator
 * @param {{version: string, minifiedSizeInKb: string, gzipSizeInKb: string}[]} payload package stats data returned by the API
 */
export const fetchSuccess = (payload) => {
  return { type: FETCH_SUCCESS, payload };
};

/**
 * API call finish with error action creation
 * @param {string} errorMessage
 */
export const fetchError = (errorMessage) => {
  return { type: FETCH_ERROR, errorMessage };
};
