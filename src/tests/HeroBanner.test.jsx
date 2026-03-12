import { render } from "@testing-library/react";
import HeroBanner from "../components/HeroBanner.jsx";

test("HeroBanner renders slider", () => {
  const { container } = render(<HeroBanner />);

  const activeSlide = container.querySelector(".slick-slide.slick-active");
  expect(activeSlide).toBeTruthy(); // slide activ există

  const heading = activeSlide.querySelector("h2");
  expect(heading).toHaveTextContent(/Clean Water for All/i);
});
