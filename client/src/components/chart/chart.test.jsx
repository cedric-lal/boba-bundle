import { render } from "@testing-library/react";
import Chart from "./chart";

const sizeStatsMock = [
  {
    version: "1.1.1",
    minifiedSizeInKb: 3.2,
    gzipSizeInKb: 2.4,
  },
  {
    version: "2.2.1",
    minifiedSizeInKb: 2.1,
    gzipSizeInKb: 1.2,
  },
  {
    version: "2.3.1",
    minifiedSizeInKb: 2.1,
    gzipSizeInKb: 1.2,
  },
  {
    version: "2.4.1",
    minifiedSizeInKb: 2.1,
    gzipSizeInKb: 1.2,
  },
];

test("All versions are displayed", () => {
  const renderedChart = render(<Chart sizeStats={sizeStatsMock} />);

  const version1 = renderedChart.getByText("1.1.1");
  const version2 = renderedChart.getByText("2.2.1");
  const version3 = renderedChart.getByText("2.3.1");
  const version4 = renderedChart.getByText("2.4.1");

  expect(version1).toBeInTheDocument();
  expect(version2).toBeInTheDocument();
  expect(version3).toBeInTheDocument();
  expect(version4).toBeInTheDocument();
});

test("All chart bars are displayed", () => {
  const renderedChart = render(<Chart sizeStats={sizeStatsMock} />);

  const chartBars = renderedChart.queryAllByTestId("chart-bar");

  expect(chartBars.length).toEqual(4);
});

test("All minified and gzip sizes are displayed", () => {
  const renderedChart = render(<Chart sizeStats={sizeStatsMock} />);

  const version1MinifiedSize = renderedChart.getByText("3.2kb");
  const version1GzipSize = renderedChart.getByText("2.4kb");
  const version2MinifiedSizes = renderedChart.queryAllByText("2.1kb");
  const version2GzipSizes = renderedChart.queryAllByText("1.2kb");

  expect(version1MinifiedSize).toBeInTheDocument();
  expect(version1GzipSize).toBeInTheDocument();
  expect(version2MinifiedSizes.length).toEqual(3);
  expect(version2GzipSizes.length).toEqual(3);
});

test("Chart legend is displayed", () => {
  const renderedChart = render(<Chart sizeStats={sizeStatsMock} />);

  const minifiedLegend = renderedChart.getByText("Minified");
  const gzipSizeLegend = renderedChart.getByText("Minified + gzip");

  expect(minifiedLegend).toBeInTheDocument();
  expect(gzipSizeLegend).toBeInTheDocument();
});
