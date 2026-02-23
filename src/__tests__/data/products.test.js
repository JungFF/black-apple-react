import { describe, it, expect } from "vitest";
import {
  IPHONE_16_PRO,
  IPHONE_16,
  IPHONE_15,
  IPHONE_14,
  IPHONE_SE,
  MacBook_Air,
  MacBook_Pro_16,
  iMac,
  iPad_Pro,
  iPad_Air,
  iPad,
  ipad_mini,
  product_list,
} from "../../assets/data/products.js";

const allProducts = [
  ["IPHONE_16_PRO", IPHONE_16_PRO],
  ["IPHONE_16", IPHONE_16],
  ["IPHONE_15", IPHONE_15],
  ["IPHONE_14", IPHONE_14],
  ["IPHONE_SE", IPHONE_SE],
  ["MacBook_Air", MacBook_Air],
  ["MacBook_Pro_16", MacBook_Pro_16],
  ["iMac", iMac],
  ["iPad_Pro", iPad_Pro],
  ["iPad_Air", iPad_Air],
  ["iPad", iPad],
  ["ipad_mini", ipad_mini],
];

describe("products.js exports", () => {
  it("exports exactly 12 individual products", () => {
    allProducts.forEach(([, p]) => expect(p).toBeDefined());
  });

  it("product_list contains all 12 products in order", () => {
    expect(product_list).toHaveLength(12);
    expect(product_list).toEqual([
      IPHONE_16_PRO,
      IPHONE_16,
      IPHONE_15,
      IPHONE_14,
      IPHONE_SE,
      MacBook_Air,
      MacBook_Pro_16,
      iMac,
      iPad_Pro,
      iPad_Air,
      iPad,
      ipad_mini,
    ]);
  });

  describe.each(allProducts)("%s", (_name, product) => {
    it("has required top-level fields with correct types", () => {
      expect(typeof product.id).toBe("number");
      expect(typeof product.name).toBe("string");
      expect(product.name.length).toBeGreaterThan(0);
      expect(typeof product.title).toBe("string");
      expect(typeof product.image).toBe("string");
      expect(typeof product.startingPrice).toBe("number");
      expect(product.startingPrice).toBeGreaterThan(0);
      expect(typeof product.installments).toBe("number");
      expect(typeof product.inStock).toBe("boolean");
      expect(typeof product.category).toBe("string");
    });

    it("has carouselImages as a non-empty array of strings", () => {
      expect(Array.isArray(product.carouselImages)).toBe(true);
      expect(product.carouselImages.length).toBeGreaterThan(0);
      product.carouselImages.forEach((img) => {
        expect(typeof img).toBe("string");
      });
    });

    it("has models as a non-empty array with id, name, and price", () => {
      expect(Array.isArray(product.models)).toBe(true);
      expect(product.models.length).toBeGreaterThan(0);
      product.models.forEach((model) => {
        expect(typeof model.id).toBe("number");
        expect(typeof model.name).toBe("string");
        expect(typeof model.price).toBe("number");
        const hasSpec =
          typeof model.specification === "string" ||
          typeof model.spec === "string";
        expect(hasSpec).toBe(true);
      });
    });

    it("has colors as a non-empty array of strings", () => {
      expect(Array.isArray(product.colors)).toBe(true);
      expect(product.colors.length).toBeGreaterThan(0);
      product.colors.forEach((c) => expect(typeof c).toBe("string"));
    });

    it("has memorySizes as a non-empty array with name and price", () => {
      expect(Array.isArray(product.memorySizes)).toBe(true);
      expect(product.memorySizes.length).toBeGreaterThan(0);
      product.memorySizes.forEach((mem) => {
        expect(typeof mem.name).toBe("string");
        expect(typeof mem.price).toBe("number");
      });
    });

    it("has features as a non-empty array of strings", () => {
      expect(Array.isArray(product.features)).toBe(true);
      expect(product.features.length).toBeGreaterThan(0);
      product.features.forEach((f) => expect(typeof f).toBe("string"));
    });
  });

  describe("known data issues", () => {
    it("MacBook_Pro_16 and IPHONE_14 share duplicate id 4", () => {
      expect(MacBook_Pro_16.id).toBe(4);
      expect(IPHONE_14.id).toBe(4);
    });

    it("iMac and IPHONE_SE share duplicate id 5", () => {
      expect(iMac.id).toBe(5);
      expect(IPHONE_SE.id).toBe(5);
    });

    it("IPHONE_16_PRO uses specification while others use spec", () => {
      expect(IPHONE_16_PRO.models[0]).toHaveProperty("specification");
      expect(IPHONE_16.models[0]).toHaveProperty("spec");
    });
  });
});
