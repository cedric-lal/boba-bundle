import { render } from '@testing-library/react';
import PackageInfo from './packageInfo';

test('title and package sizes information are displayed', () => {
  const renderedPackageInfo = render(
    <PackageInfo version='1.2.1' minifiedSizeInKb='20.1' gzipSizeInKb='11.4' />
  );
  const title = renderedPackageInfo.getByText('Bundle size for v1.2.1');
  const minifiedSize = renderedPackageInfo.getByText((content, node) => {
    return node.textContent === '20.1KbMinified';
  });
  const gzipSize = renderedPackageInfo.getByText((content, node) => {
    return node.textContent === '11.4KbMinified + gzipped';
  });

  expect(title).toBeInTheDocument();
  expect(minifiedSize).toBeInTheDocument();
  expect(gzipSize).toBeInTheDocument();
});
