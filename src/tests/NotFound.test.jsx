import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../pages/NotFound.jsx";

test("404 page shows message", () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );

  expect(screen.getByText(/Oops.../i)).toBeInTheDocument();
  expect(screen.getByText(/doesn't exist/i)).toBeInTheDocument();
  expect(screen.getByText(/homepage/i)).toBeInTheDocument();
});
