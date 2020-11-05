import "./dashboard.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchingPackageStats } from "../../store/actions/dashboard";
import SearchInput from "../../components/search-input/searchInput";
import PackageInfo from "../../components/package-info/packageInfo";
import LoadingSpinner from "../../components/loading-spinner/loadingSpinner";
import ErrorPanel from "../../components/error-panel/errorPanel";
import Chart from "../../components/chart/chart";

/**
 *  This view component represent the Dashboard of the application, displaying all the information a specific package
 */
const Dashboard = () => {
  const { packageName } = useParams(); // Get the parameter in the URL
  const routerHistory = useHistory();
  const dispatch = useDispatch();

  // Get dashboard data from the store
  let { fetchingDone, hasError, errorMessage, sizeStats } = useSelector(
    (state) => state.dashboard
  );

  // Hook use to trigger backend calls and update the store
  useEffect(() => {
    dispatch(fetchingPackageStats(packageName));
  }, [dispatch, packageName]);

  /**
   *
   * @param {string} search
   */
  const handleSearch = (search) => {
    routerHistory.push("/dashboard/" + search);
  };

  // Select which panel to display
  let dashboardPanel = null;
  if (fetchingDone && !hasError) {
    // Data ready for display state
    dashboardPanel = (
      <div className="stat-container">
        <PackageInfo
          minifiedSizeInKb={sizeStats[0].minifiedSizeInKb}
          gzipSizeInKb={sizeStats[0].gzipSizeInKb}
        ></PackageInfo>
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
    <div className="dashboard">
      <SearchInput initialValue={packageName} onSearch={handleSearch} />
      <section className="dashboard-information-panel">
        {dashboardPanel}
      </section>
    </div>
  );
};

export default Dashboard;
