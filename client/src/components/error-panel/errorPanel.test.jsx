import { render, screen } from "@testing-library/react";
import ErrorPanel from "./errorPanel";

test("Error panel should display error icon error message", () => {
  const errorMessage = "Error test";
  render(<ErrorPanel errorMessage={errorMessage} />);
  const errorText = screen.getByText(errorMessage);
  expect(errorText).toBeInTheDocument();
});
