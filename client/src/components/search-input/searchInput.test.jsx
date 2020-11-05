import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "./searchInput";

const inputPlaceholder = "Enter package name";

test("display input, button and search icon ", () => {
  const renderedSearchInput = render(<SearchInput />);

  const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);
  const searchButton = renderedSearchInput.queryByRole("button");
  const loupeIcon = renderedSearchInput.getByAltText("Loupe icon");

  expect(input).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  expect(loupeIcon).toBeInTheDocument();
});

test("display initial value", () => {
  const renderedSearchInput = render(<SearchInput initialValue="test" />);

  const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);

  expect(input.value).toEqual("test");
});

test("execute onSearch callback when search button is clicked", () => {
  const mockHandleSearch = jest.fn();
  const renderedSearchInput = render(
    <SearchInput initialValue="initialValue" onSearch={mockHandleSearch} />
  );

  const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);
  const searchButton = renderedSearchInput.queryByRole("button");

  userEvent.clear(input);
  userEvent.type(input, "lodash");
  searchButton.click();

  expect(mockHandleSearch).toHaveBeenCalledWith("lodash");
});

test("do not execute onSearch callback when search input is empty", () => {
  const mockHandleSearch = jest.fn();
  const renderedSearchInput = render(
    <SearchInput initialValue="initialValue" onSearch={mockHandleSearch} />
  );

  const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);
  const searchButton = renderedSearchInput.queryByRole("button");

  userEvent.clear(input);
  searchButton.click();

  expect(mockHandleSearch).not.toHaveBeenCalledWith();
});
