import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from "@testing-library/user-event";
import Search from "./Search";
import { updateSearchInput } from "../../store/actions/search/search";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

let mockStore;
const generateMockStore = configureStore([]);
mockStore = generateMockStore({
    search: {
        currentSearch: "lodash"
    }
});
mockStore.dispatch = jest.fn();

let renderedSearch;
beforeEach(() => {
    mockHistoryPush.mockClear();
    mockStore.dispatch.mockClear();

    renderedSearch = render(
        <Provider store={mockStore}>
            <Search />
        </Provider>
    );
});

test("Search view displays title and input search", () => {

    const title = renderedSearch.getByText("Boba bundle");
    const input = renderedSearch.getByPlaceholderText("Enter package name");

    expect(title).toBeInTheDocument();
    expect(input).toBeInTheDocument();
});

test("Change search input trigger dispatch change input action", () => {
    const input = renderedSearch.getByPlaceholderText("Enter package name");

    userEvent.type(input, "2");

    expect(mockStore.dispatch).toHaveBeenCalledWith(updateSearchInput("lodash2"));
});

test("Searching a package redirect to dashboard", () => {
    const searchButton = renderedSearch.queryByRole('button');
    searchButton.click();

    expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard/lodash");
});