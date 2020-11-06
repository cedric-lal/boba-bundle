import { render } from '@testing-library/react';
import LoadingSpinner from './loadingSpinner';

test('Loading test and spinner animation are displayed', () => {
  const renderedLoading = render(<LoadingSpinner />);
  const loadingSpinner = renderedLoading.getByTestId('loading-spinner');
  const loadingText = renderedLoading.getByText('Loading ...');

  expect(loadingSpinner).toBeInTheDocument();
  expect(loadingText).toBeInTheDocument();
});
