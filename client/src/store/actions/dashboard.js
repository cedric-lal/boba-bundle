import { FETCH_ERROR, FETCH_SUCCESS, START_FETCHING } from "./types";
import * as packageApi from "../../api/package";

/**
 * 
 * @param {string} packageName
 */
export function fetchingPackageStats(
  packageName
) {
  return (dispatch) => {
    dispatch(startFetching(packageName));
    return packageApi
      .search(packageName)
      .then((res) => {
        if (res.status !== 200) {
          dispatch(fetchError(res.payload.errorMessage))
        } else {
          dispatch(fetchSuccess(res.payload))
        }
      });
  };
}

/**
 * Start fetching package stats data action
 * @param {string} packageName 
 */
export function startFetching(packageName) {
  return { type: START_FETCHING, payload: packageName };
}

/**
 * API call finish and success action 
 * @param {{version: string, minifiedSizeInKb: string, gzipSizeInKb: string}[]} payload package stats data returned by the API
 */
export function fetchSuccess(payload) {
  return { type: FETCH_SUCCESS, payload };
}

/**
 * API call finish and error action
 * @param {string} errorMessage
 */
export function fetchError(errorMessage) {
  return { type: FETCH_ERROR, errorMessage };
}
