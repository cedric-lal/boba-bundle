import { fetchingPackageStats, startFetching, fetchSuccess, fetchError } from "./packageStats";
import * as ActionTypes from "../../actions/types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as MockPackageStats from "../../mock/packageStats.mock";
import * as MockPackageApi from "../../../api/package.mock";

const createMockStore = configureMockStore([thunk]);

// test("fetch package stats dispatch appropriate actions for a failed fetch", () => {
//     jest.mock("../../../api/package", () => {
//         return MockPackageApi.fetchError;
//     });
//     const mockStore = createMockStore(MockPackageStats.mockDefaultState);

//     const expectedActions = [
//         { type: ActionTypes.INPUT_UPDATED, newSearch: 'react' },
//         { type: ActionTypes.START_FETCHING },
//         { type: ActionTypes.FETCH_ERROR, ...MockPackageApi.mockErrorPayload }
//     ]

//     return mockStore.dispatch(fetchingPackageStats("react")).then(() => {
//         expect(mockStore.getActions()).toEqual(expectedActions);
//     });
// });

// test("fetch package stats dispatch appropriate actions for a successful fetch", () => {
//     jest.mock("../../../api/package", () => {
//         return MockPackageApi.fetchSuccess;
//     });
//     const mockStore = createMockStore(MockPackageStats.mockDefaultState);

//     const expectedActions = [
//         { type: ActionTypes.INPUT_UPDATED, newSearch: MockPackageStats.mockSuccessPayload },
//         { type: ActionTypes.START_FETCHING },
//         { type: ActionTypes.FETCH_SUCCESS, ...MockPackageApi.mockSuccessPayload }
//     ]

//     return mockStore.dispatch(fetchingPackageStats("react")).then(() => {
//         expect(mockStore.getActions()).toEqual(expectedActions)
//     });
// });

// test("start fetching action creator returns start fetching action", () => {
//     const action = startFetching("react");
//     expect(action).toEqual({ type: ActionTypes.START_FETCHING });
// });

// test("fetch error action creator returns start fetching action", () => {
//     const action = fetchError("error message");
//     expect(action).toEqual({ type: ActionTypes.FETCH_ERROR, errorMessage: "error message" });
// });

test("fetch success action creator returns fetch success action", () => {
    const sizeStatsMock = {
        version: "1.1.2",
        minifiedSizeInKb: 32.2,
        gzipSizeInKb: 11,
    };
    const action = fetchSuccess(sizeStatsMock);
    expect(action).toEqual({ type: ActionTypes.FETCH_SUCCESS, payload: sizeStatsMock });
});