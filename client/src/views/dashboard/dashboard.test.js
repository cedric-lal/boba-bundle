import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store';
import userEvent from "@testing-library/user-event";
import Dashboard from "./Dashboard";
import * as Types from "./../../store/actions/types";

const mockSearchState = { currentSearch: "lodash" }
const mockLoadingState = {
    search: mockSearchState,
    packageStats: {
        fetchingDone: false,
        hasError: false,
        errorMessage: null,
        sizeStats: []
    }
};

const mockErrorState = {
    search: mockSearchState,
    packageStats: {
        fetchingDone: true,
        hasError: true,
        errorMessage: "Error message from state",
        sizeStats: []
    }
};

const mockSuccessState = {
    search: mockSearchState,
    packageStats: {
        fetchingDone: true,
        hasError: false,
        errorMessage: null,
        sizeStats: [
            {
                version: "1.1.1",
                minifiedSizeInKb: 3.2,
                gzipSizeInKb: 2.4,
            },
            {
                version: "2.2.1",
                minifiedSizeInKb: 2.1,
                gzipSizeInKb: 1.2,
            },
        ]
    }
};

// Mock react router
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush,
    }),
    useParams: () => ({})
}));

// store variable is a mocked store
let mockStore;
const generateMockStore = configureStore([thunk]);

beforeEach(() => {
    mockHistoryPush.mockClear();
});

/**
 * Return the render of dashboard view connected to the mocked store
 */
const mockStoreDashboard = () => {
    return render(
        <Provider store={mockStore}>
            <Dashboard />
        </Provider>
    );
};

test("Change search input trigger dispatch change input action", () => {
    mockStore = generateMockStore(mockErrorState);
    const renderedDashboard = mockStoreDashboard();

    const input = renderedDashboard.getByPlaceholderText("Enter package name");
    userEvent.type(input, "2");

    // Check that the INPUT_UPDATED action has been dispatched
    const dispatchedActions = mockStore.getActions().map(action => action.type)
    expect(dispatchedActions.includes(Types.INPUT_UPDATED)).toBeTruthy();
});

test("Searching a package update URL parameter", () => {
    mockStore = generateMockStore(mockErrorState);
    const renderedDashboard = mockStoreDashboard();

    const searchButton = renderedDashboard.queryByRole('button');
    searchButton.click();

    expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard/lodash");
});

test("Dispatch fetch package stats actions on page load", () => {
    mockStore = generateMockStore(mockErrorState);
    mockStoreDashboard();

    // Check that the START_FETCHING action has been dispatched
    const dispatchedActions = mockStore.getActions().map(action => action.type)
    expect(dispatchedActions.includes(Types.START_FETCHING)).toBeTruthy();
});

test("Error panel is displayed when in error state", () => {
    mockStore = generateMockStore(mockErrorState);
    const renderedDashboard = mockStoreDashboard();

    const errorText = renderedDashboard.getByText("Error message from state");
    expect(errorText).toBeInTheDocument();
});

test("Loading panel is displayed when in loading state", () => {
    mockStore = generateMockStore(mockLoadingState);
    const renderedDashboard = mockStoreDashboard();

    const loadingText = renderedDashboard.getByText("Loading ...");
    expect(loadingText).toBeInTheDocument();
});

test("Stats panel is displayed when in success state", () => {
    mockStore = generateMockStore(mockSuccessState);
    const renderedDashboard = mockStoreDashboard();

    const bundleSizeTitle = renderedDashboard.getByText("Latest version bundle size");
    const historyChartTitle = renderedDashboard.getByText("Sizes history");

    expect(bundleSizeTitle).toBeInTheDocument();
    expect(historyChartTitle).toBeInTheDocument();
});