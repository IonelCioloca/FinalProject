import { render, screen } from "@testing-library/react";
import Header from "../components/Header.jsx";
import { MemoryRouter } from "react-router-dom";

test("Header renders logo", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

  const logos = screen.getAllByAltText("logo");
  expect(logos.length).toBeGreaterThan(0);
});
