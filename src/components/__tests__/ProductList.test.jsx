import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductList } from "../ProductList.jsx";

const sampleData = [
  {
    title: "MacBook Pro 16 英寸",
    detail: "超强性能，超长续航 RMB 19999 起",
    image: "https://example.com/macbook.jpg",
    textColor: "white",
  },
  {
    title: "Apple Watch Ultra 2",
    detail: "野出新一面 RMB 6499 起",
    image: "https://example.com/watch.jpg",
    textColor: "black",
  },
];

describe("ProductList component", () => {
  it("renders the section heading", () => {
    render(<ProductList data={sampleData} />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toHaveTextContent("上新品，个个添新意");
  });

  it("renders one Product card per item in data", () => {
    render(<ProductList data={sampleData} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(sampleData.length);
  });

  it("renders each product's title text", () => {
    render(<ProductList data={sampleData} />);
    expect(screen.getByText("MacBook Pro 16 英寸")).toBeInTheDocument();
    expect(screen.getByText("Apple Watch Ultra 2")).toBeInTheDocument();
  });

  it("renders each product's detail text", () => {
    render(<ProductList data={sampleData} />);
    expect(
      screen.getByText("超强性能，超长续航 RMB 19999 起"),
    ).toBeInTheDocument();
    expect(screen.getByText("野出新一面 RMB 6499 起")).toBeInTheDocument();
  });

  it("renders each product's image with the correct src", () => {
    render(<ProductList data={sampleData} />);
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", sampleData[0].image);
    expect(images[1]).toHaveAttribute("src", sampleData[1].image);
  });

  it("renders nothing but the heading when data is an empty array", () => {
    render(<ProductList data={[]} />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("clicking a product card triggers the alert with its title", () => {
    const originalAlert = window.alert;
    const alertMock = vi.fn();
    window.alert = alertMock;

    render(<ProductList data={sampleData} />);
    const firstImage = screen.getAllByRole("img")[0];
    fireEvent.click(firstImage);

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith(sampleData[0].title);

    window.alert = originalAlert;
  });
});
