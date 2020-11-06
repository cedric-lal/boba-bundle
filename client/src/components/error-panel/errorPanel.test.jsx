import { render } from '@testing-library/react';
import ErrorPanel from './errorPanel';

test('Error icon and message are displayed', () => {
  const errorMessage = 'Error test';
  const renderedPanel = render(<ErrorPanel errorMessage={errorMessage} />);
  const errorImg = renderedPanel.getByAltText(/Error icon/);
  const errorText = renderedPanel.getByText(errorMessage);

  expect(errorImg).toBeInTheDocument();
  expect(errorText).toBeInTheDocument();
});
