import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "./searchInput";

const inputPlaceholder = "Enter package name";
const mockOnChange = jest.fn();
const mockOnSearch = jest.fn();

beforeEach(() => {
  mockOnChange.mockClear();
  mockOnSearch.mockClear();
});

test("display input, button and search icon ", () => {
  const renderedSearchInput = render(<SearchInput />);

  const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);
  const searchButton = renderedSearchInput.queryByRole("button");
  const loupeIcon = renderedSearchInput.getByAltText("Loupe icon");

  expect(input).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  expect(loupeIcon).toBeInTheDocument();
});

test("input display the value of props.value", () => {
  const renderedSearchInput = render(<SearchInput value="test" />);

  const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);

  expect(input.value).toEqual("test");
});

// test("trigger onChange callback as soon as input text change", () => {
//   const renderedSearchInput = render(
//     <SearchInput value="" onChange={mockOnChange} onSearch={mockOnSearch} />
//   );

//   const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);
//   userEvent.type(input, "l");

//   expect(mockOnChange).toHaveBeenCalledWith("l");
// });

// test("execute onSearch callback when enter button is pressed", () => {
//   const mockOnSearch = jest.fn();
//   const renderedSearchInput = render(
//     <SearchInput value="initialValue" onSearch={mockOnSearch} />
//   );

//   const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);
//   const searchButton = renderedSearchInput.queryByRole("button");

//   userEvent.clear(input);
//   userEvent.type(input, "lodash");
//   searchButton.click();

//   expect(mockOnSearch).toHaveBeenCalledWith("lodash");
// });

// test("execute onSearch callback when search button is clicked", () => {
//   const mockOnSearch = jest.fn();
//   const renderedSearchInput = render(
//     <SearchInput value="initialValue" onSearch={mockOnSearch} />
//   );

//   const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);
//   const searchButton = renderedSearchInput.queryByRole("button");

//   userEvent.clear(input);
//   searchButton.click(); // Should not trigger the callback
//   userEvent.type(input, "lodash");
//   searchButton.click();

//   expect(mockOnSearch).toHaveBeenCalledTimes(1);
//   expect(mockOnSearch).toHaveBeenCalledWith("lodash");
// });

// test("execute onSearch callback when input is not empty and enter key is pressed", () => {
//   const mockOnSearch = jest.fn();
//   const renderedSearchInput = render(
//     <SearchInput value="initialValue" onSearch={mockOnSearch} />
//   );

//   const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);
//   const searchButton = renderedSearchInput.queryByRole("button");

//   userEvent.clear(input);
//   userEvent.type(input, "{enter}"); // Should not trigger the callback
//   userEvent.type(input, "lodash");
//   userEvent.type(input, "{enter}");

//   expect(mockOnSearch).toHaveBeenCalledTimes(1);
//   expect(mockOnSearch).toHaveBeenCalledWith(lodash);
// });
