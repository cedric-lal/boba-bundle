import "./loadingSpinner.scss";

/**
 * Component that display a loading spinner
 *
 */
const LoadingSpinner = () => {
  return (
    <div className="loading-panel">
      <div
        className="loading-spinner"
        aria-hidden="true"
        data-testid="loading-spinner"
      ></div>
      <span>Loading ...</span>
    </div>
  );
};

export default LoadingSpinner;
