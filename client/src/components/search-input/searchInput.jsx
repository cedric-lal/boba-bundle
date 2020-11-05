import "./searchInput.scss";
import { useState, useEffect } from "react";

/**
 * Search input component with typeahead capability
 * @param {object} props props of the component
 * @param {string} props.initialValue initial value of the input
 * @param {Function} props.onSearch callback trigger to handle search
 */
const SearchInput = (props) => {
  const [currentSearch, setCurrentSearch] = useState(props.initialValue);

  useEffect(() => {
    setCurrentSearch(props.initialValue);
  }, [setCurrentSearch, props.initialValue]);

  /**
   *
   * @param {function} changeEvent
   */
  const onChange = (changeEvent) => {
    const currentSearch = changeEvent.target.value;
    setCurrentSearch(currentSearch);
  };

  const onSearch = () => {
    if (currentSearch) {
      props.onSearch(currentSearch);
    }
  };

  /**
   * Handle key press in order to trigger search on enter key press
   */
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter package name"
        value={currentSearch}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      ></input>
      <button type="button" role="button" onClick={onSearch}>
        <img className="loupe-icon" src="/loupe.svg" alt="Loupe icon" />
      </button>
    </div>
  );
};

export default SearchInput;
