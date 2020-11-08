import './searchInput.scss';

/**
 * Search input component
 * @param {object} props props of the component
 * @param {string} props.value value of the input
 * @param {Function} props.onChange callback trigger to handle input change
 * @param {Function} props.onSearch callback trigger to handle search
 */
const SearchInput = (props) => {
  const onChange = (changeEvent) => {
    props.onChange(changeEvent.target.value);
  };

  const onSearch = () => {
    if (props.value) {
      props.onSearch(props.value);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder='Enter package name'
        value={props.value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      ></input>
      <button type='button' onClick={onSearch}>
        <img className='loupe-icon' src='/loupe.svg' alt='Loupe icon' />
      </button>
    </div>
  );
};

export default SearchInput;
