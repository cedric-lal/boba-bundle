import { render } from '@testing-library/react';
import PackageInfo from './packageInfo';

test('title and package sizes information are displayed', () => {
  const renderedPackageInfo = render(
    <PackageInfo minifiedSizeInKb='20.1' gzipSizeInKb='11.4' />
  );
  const title = renderedPackageInfo.getByText('Latest version bundle size');
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
