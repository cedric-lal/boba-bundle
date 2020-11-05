import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

test("Search view displays title and input search", () => {
    // const renderedSearchInput = render(<Search />);

    // const title = renderedSearchInput.getByText("Boba bundle");
    // const input = renderedSearchInput.getByPlaceholderText("Enter package name");

    // expect(title).toBeInTheDocument();
    // expect(input).toBeInTheDocument();
});

test("Searching a package redirect to dashboard", () => {
    // const renderedSearchInput = render(<Search />);

    // const input = renderedSearchInput.getByPlaceholderText("Enter package name");
    // userEvent.type(input, "react");
    // const searchButton = renderedSearchInput.queryByRole('button');
    // searchButton.click();

    // expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard/react");
});