import './dashboard.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchingPackageStats } from '../../store/actions/package-stats/packageStats';
import { updateSearchInput } from '../../store/actions/search/search';
import SearchInput from '../../components/search-input/searchInput';
import PackageInfo from '../../components/package-info/packageInfo';
import LoadingSpinner from '../../components/loading-spinner/loadingSpinner';
import ErrorPanel from '../../components/error-panel/errorPanel';
import Chart from '../../components/chart/chart';

/**
 *  This view component represent the Dashboard of the application, displaying all the information a specific package
 */
const Dashboard = () => {
  const { packageName } = useParams(); // Get the parameter in the URL
  const routerHistory = useHistory();
  const dispatch = useDispatch();

  // Get dashboard data from the store
  let {
    currentSearch,
    fetchingDone,
    hasError,
    errorMessage,
    sizeStats,
  } = useSelector((state) => {
    return { ...state.search, ...state.packageStats };
  });

  // Hook use to trigger backend calls and update the store
  useEffect(() => {
    if (packageName) {
      dispatch(fetchingPackageStats(packageName));
    }
  }, [dispatch, packageName]);

  /**
   * Handle the input search value change by dispatching an action
   * @param {string} newSearch new input search value
   */
  const handleSearchInputChange = (newSearch) => {
    dispatch(updateSearchInput(newSearch));
  };

  /**
   *
   * @param {string} search
   */
  const handleSearch = (search) => {
    routerHistory.push('/dashboard/' + search);
  };

  // Select which panel to display
  let dashboardPanel = null;
  if (fetchingDone && !hasError) {
    // Data ready for display state
    dashboardPanel = (
      <div className='stat-container'>
        <PackageInfo {...sizeStats[0]}></PackageInfo>
        <Chart sizeStats={sizeStats}></Chart>
      </div>
    );
  } else if (fetchingDone && hasError) {
    // In error state
    dashboardPanel = <ErrorPanel errorMessage={errorMessage}></ErrorPanel>;
  } else {
    // In loading state
    dashboardPanel = <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className='dashboard'>
      <SearchInput
        value={currentSearch}
        onSearch={handleSearch}
        onChange={handleSearchInputChange}
      />
      <section className='dashboard-information-panel'>
        {dashboardPanel}
      </section>
    </div>
  );
};

export default Dashboard;
