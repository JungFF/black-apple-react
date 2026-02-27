import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Product from "../Product.jsx";

const defaultProps = {
  image: "https://example.com/test-product.jpg",
  title: "Test Product Title",
  detail: "Test product detail text",
  onProductClick: vi.fn(),
};

describe("Product component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Product {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders an img with the provided src", () => {
    render(<Product {...defaultProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", defaultProps.image);
  });

  it("renders the img with hardcoded alt text", () => {
    render(<Product {...defaultProps} />);
    expect(screen.getByAltText("iPad Pro")).toBeInTheDocument();
  });

  it("renders the title text", () => {
    render(<Product {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it("renders the detail text", () => {
    render(<Product {...defaultProps} />);
    expect(screen.getByText(defaultProps.detail)).toBeInTheDocument();
  });

  it("applies inline styles to the img element", () => {
    render(<Product {...defaultProps} />);
    const img = screen.getByRole("img");
    expect(img.style.width).toBe("100%");
    expect(img.style.height).toBe("auto");
    expect(img.style.borderRadius).toBe("0.5rem");
  });

  it("renders CSS module class names on title and detail", () => {
    const { container } = render(<Product {...defaultProps} />);
    expect(container.querySelector(".productTitle")).toBeInTheDocument();
    expect(container.querySelector(".productDetail")).toBeInTheDocument();
  });

  it("renders a div as the root styled-component container", () => {
    const { container } = render(<Product {...defaultProps} />);
    const root = container.firstChild;
    expect(root.tagName).toBe("DIV");
  });

  it("renders correctly with different props", () => {
    const altProps = {
      image: "https://example.com/another.jpg",
      title: "MacBook Pro",
      detail: "Starting at RMB 19999",
      onProductClick: vi.fn(),
    };
    render(<Product {...altProps} />);
    expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
    expect(screen.getByText("Starting at RMB 19999")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", altProps.image);
  });

  it("calls onProductClick with the title when the container is clicked", () => {
    const onProductClick = vi.fn();
    render(<Product {...defaultProps} onProductClick={onProductClick} />);
    fireEvent.click(screen.getByRole("img").closest("div"));
    expect(onProductClick).toHaveBeenCalledTimes(1);
    expect(onProductClick).toHaveBeenCalledWith(defaultProps.title);
  });

  it("passes textColor to the text container via the $textColor transient prop", () => {
    const { container } = render(
      <Product {...defaultProps} textColor="black" />,
    );
    const textContainer = container.querySelector(".productTitle").parentElement;
    expect(textContainer).toBeInTheDocument();
    expect(window.getComputedStyle(textContainer).color).toBeDefined();
  });
});
