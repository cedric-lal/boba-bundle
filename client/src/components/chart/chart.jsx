import "./chart.scss";

/**
 * Component that display size information about one specific version of a package
 * @param {Object} props props of the component
 * @param {Array<version: string, minifiedSizeInKb: number, gzipSizeInKb: number>} props.sizeStats size of the package minified in kb
 */
const chart = (props) => {
  const maxChartValue = Math.max(
    ...props.sizeStats.reduce((acc, next) => {
      acc.push(next.minifiedSizeInKb);
      return acc;
    }, [])
  );
  return (
    <div class="chart-panel">
      <h2 className="chart-title">Sizes history</h2>
      <figure className="bar-chart">
        {[...props.sizeStats].reverse().map((sizeStat, i) => {
          let style = {
            "--value-minified":
              (sizeStat.minifiedSizeInKb / maxChartValue) * 100 + "%",
            "--value-gzipped":
              (sizeStat.gzipSizeInKb / maxChartValue) * 100 + "%",
          };
          return (
            <div key={i} className="bar" style={style}>
              <div className="wrapper"></div>
              <p className="size-minified">{sizeStat.minifiedSizeInKb}kb</p>
              <p className="size-gzipped">{sizeStat.gzipSizeInKb}kb</p>
              <p className="version">{sizeStat.version}</p>
            </div>
          );
        })}
      </figure>
      <div className="legend">
        <span className="minified">Minified</span>
        <span className="gzip">Minified + gzip</span>
      </div>
    </div>
  );
};

export default chart;
