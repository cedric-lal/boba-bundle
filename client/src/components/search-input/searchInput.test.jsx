import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './searchInput';

const inputPlaceholder = 'Enter package name';
const mockOnChange = jest.fn();
const mockOnSearch = jest.fn();

beforeEach(() => {
  mockOnChange.mockClear();
  mockOnSearch.mockClear();
});

test('display input, button and search icon', () => {
  const renderedSearchInput = render(<SearchInput />);

  const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);
  const searchButton = renderedSearchInput.queryByRole('button');
  const loupeIcon = renderedSearchInput.getByAltText('Loupe icon');

  expect(input).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  expect(loupeIcon).toBeInTheDocument();
});

test('input display the value of props.value', () => {
  const renderedSearchInput = render(<SearchInput value='testValue' />);

  const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);

  expect(input.value).toEqual('testValue');
});

test('trigger onChange callback as soon as input text changed', () => {
  const renderedSearchInput = render(
    <SearchInput value='' onChange={mockOnChange} onSearch={mockOnSearch} />
  );

  const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);
  userEvent.type(input, 'l');

  expect(mockOnChange).toHaveBeenCalledWith('l');
});

test('trigger onSearch callback when input search button is clicked', () => {
  const renderedSearchInput = render(
    <SearchInput
      value='lodash'
      onChange={mockOnChange}
      onSearch={mockOnSearch}
    />
  );

  const searchButton = renderedSearchInput.queryByRole('button');

  searchButton.click();

  expect(mockOnSearch).toHaveBeenCalledWith('lodash');
});

test('trigger onSearch callback when input is not empty and enter key is pressed', () => {
  const renderedSearchInput = render(
    <SearchInput value='react' onSearch={mockOnSearch} />
  );

  const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);

  userEvent.type(input, '{enter}');

  expect(mockOnSearch).toHaveBeenCalledWith('react');
});

test('do not trigger onSearch callback when input is empty', () => {
  const renderedSearchInput = render(
    <SearchInput value='' onSearch={mockOnSearch} onChange={mockOnChange} />
  );

  const input = renderedSearchInput.getByPlaceholderText(inputPlaceholder);
  const searchButton = renderedSearchInput.queryByRole('button');

  userEvent.type(input, '{enter}');
  searchButton.click();

  expect(mockOnSearch).not.toHaveBeenCalled();
});
