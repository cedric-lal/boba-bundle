import "./packageInfo.scss";

/**
 * Component that display size information about one specific version of a package
 * @param {Object} props props of the component
 * @param {Object} props.minifiedSizeInKb size of the package minified in kb
 * @param {Object} props.gzipSizeInKb size of the package in kb
 */
const PackageInfo = (props) => {
  return (
    <div className="package-info">
      <h2> Latest version bundle size </h2>
      <div className="minified">
        <span className="size">{props.minifiedSizeInKb}</span>
        <span className="unit">Kb</span>
        <div>Minified</div>
      </div>
      <div className="gzip">
        <span className="size">{props.gzipSizeInKb}</span>
        <span className="unit">Kb</span>
        <div>Minified + gzipped</div>
      </div>
    </div>
  );
};

export default PackageInfo;
