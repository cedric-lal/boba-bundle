import "./search.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchInput } from "../../store/actions/search";
import SearchInput from "../../components/search-input/searchInput";
import { useHistory } from "react-router-dom";

const Search = () => {
  const routerHistory = useHistory();
  const dispatch = useDispatch();

  // Get search data from the store
  let { currentSearch } = useSelector((state) => state.search);

  /**
   * Handle the input search value change by dispatching an action
   * @param {string} newSearch new input search value
   */
  const handleSearchInputChange = (newSearch) => {
    dispatch(updateSearchInput(newSearch));
  };

  /**
   * Handle the search by routing to the dashboard page
   * @param {string} search the package name to search
   */
  const handleSearch = (search) => {
    routerHistory.push("/dashboard/" + search);
  };

  return (
    <div className="search">
      <header>
        <h1>Boba bundle</h1>
        <p> Determine the cost of adding a npm package to your bundle </p>
      </header>
      <SearchInput
        value={currentSearch}
        onSearch={handleSearch}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default Search;
