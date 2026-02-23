import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "../../main.jsx";

describe("App integration", () => {
  it("renders the heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toHaveTextContent("Hello, React!");
  });

  it("renders a Product with data from index.js", () => {
    render(<App />);
    expect(screen.getByText("Macbook Pro 16 英寸")).toBeInTheDocument();
  });

  it("renders the product detail text", () => {
    render(<App />);
    expect(screen.getByText(/超强性能，超长续航/)).toBeInTheDocument();
  });

  it("renders a product image", () => {
    render(<App />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src");
  });
});
