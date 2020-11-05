import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./loadingSpinner";

test("Error panel should display error icon error message", () => {
  render(<LoadingSpinner />);
  const loadingText = screen.getByText("Loading ...");
  expect(loadingText).toBeInTheDocument();
});
