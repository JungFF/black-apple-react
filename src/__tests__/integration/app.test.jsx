import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "../../main.jsx";

describe("App integration", () => {
  it("renders the ProductList section heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toHaveTextContent("上新品，个个添新意");
  });

  it("renders a Product with data from index.js", () => {
    render(<App />);
    expect(screen.getByText("Macbook Pro 16 英寸")).toBeInTheDocument();
  });

  it("renders the product detail text", () => {
    render(<App />);
    expect(screen.getByText(/超强性能，超长续航/)).toBeInTheDocument();
  });

  it("renders product images for every item in NEW_ARRIVALS_LIST", () => {
    render(<App />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    images.forEach((img) => expect(img).toHaveAttribute("src"));
  });
});
