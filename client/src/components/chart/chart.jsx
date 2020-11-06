import './chart.scss';

/**
 * Component that display size information about one specific version of a package
 * @param {Object} props props of the component
 * @param {Array<version: string, minifiedSizeInKb: number, gzipSizeInKb: number>} props.sizeStats size of the package minified in kb
 */
const Chart = (props) => {
  // Get the max value from the minified sizes
  const maxChartValue = Math.max(
    ...props.sizeStats.reduce((acc, next) => {
      acc.push(next.minifiedSizeInKb);
      return acc;
    }, [])
  );

  /**
   * Compute the percentage value relative to the maximum value
   * @param {number} value
   * @param {number} maxValue represent 100%
   * @returns {string} percentage of the value
   */
  const getPercentageValue = (value) => {
    return (value / maxChartValue) * 100 + '%';
  };

  return (
    <div className='chart-panel'>
      <h2 className='chart-title'>Sizes history</h2>
      <figure className='bar-chart'>
        {[...props.sizeStats].reverse().map((sizeStat, i) => {
          // Use CSS custom properties
          let barInLineStyle = {
            '--value-minified': getPercentageValue(sizeStat.minifiedSizeInKb),
            '--value-gzipped': getPercentageValue(sizeStat.gzipSizeInKb),
          };
          return (
            <div
              key={i}
              className='bar'
              style={barInLineStyle}
              data-testid='chart-bar'
            >
              <div className='wrapper'></div>
              <p className='size-minified'>{sizeStat.minifiedSizeInKb}kb</p>
              <p className='size-gzipped'>{sizeStat.gzipSizeInKb}kb</p>
              <p className='version'>{sizeStat.version}</p>
            </div>
          );
        })}
      </figure>
      <div className='legend'>
        <span className='minified'>Minified</span>
        <span className='gzip'>Minified + gzip</span>
      </div>
    </div>
  );
};

export default Chart;
