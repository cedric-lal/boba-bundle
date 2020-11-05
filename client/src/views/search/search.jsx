import "./search.scss";
import SearchInput from "../../components/search-input/searchInput";
import { useHistory } from "react-router-dom";

const Search = () => {
  const routerHistory = useHistory();

  /**
   *
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
      <SearchInput initialValue="" onSearch={handleSearch} />
    </div>
  );
};

export default Search;
