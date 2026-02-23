import { describe, it, expect } from "vitest";
import {
  product,
  product2,
  NEW_ARRIVALS_LIST,
  NEW_ARRIVALS_LIST_2,
  OFFER_LIST,
  SUGGESTED_PROUDCT,
} from "../../assets/data/index.js";
import { IPHONE_16_PRO } from "../../assets/data/products.js";

describe("index.js data exports", () => {
  describe("product", () => {
    it("has title, detail, image, and textColor", () => {
      expect(typeof product.title).toBe("string");
      expect(typeof product.detail).toBe("string");
      expect(product.image).toBeDefined();
      expect(typeof product.textColor).toBe("string");
    });

    it("does not have a soldOut field", () => {
      expect(product).not.toHaveProperty("soldOut");
    });
  });

  describe("product2", () => {
    it("has title, detail, image, textColor, and soldOut", () => {
      expect(typeof product2.title).toBe("string");
      expect(typeof product2.detail).toBe("string");
      expect(typeof product2.image).toBe("string");
      expect(typeof product2.textColor).toBe("string");
      expect(typeof product2.soldOut).toBe("boolean");
    });
  });

  describe("NEW_ARRIVALS_LIST", () => {
    it("has 8 items", () => {
      expect(NEW_ARRIVALS_LIST).toHaveLength(8);
    });

    it("first item is the same reference as product", () => {
      expect(NEW_ARRIVALS_LIST[0]).toBe(product);
    });

    it("third item is the same reference as product2", () => {
      expect(NEW_ARRIVALS_LIST[2]).toBe(product2);
    });

    it("every item has title, detail, and image", () => {
      NEW_ARRIVALS_LIST.forEach((item) => {
        expect(typeof item.title).toBe("string");
        expect(typeof item.detail).toBe("string");
        expect(item.image).toBeDefined();
      });
    });
  });

  describe("NEW_ARRIVALS_LIST_2", () => {
    it("is an empty array", () => {
      expect(NEW_ARRIVALS_LIST_2).toEqual([]);
      expect(NEW_ARRIVALS_LIST_2).toHaveLength(0);
    });
  });

  describe("OFFER_LIST", () => {
    it("has 6 items", () => {
      expect(OFFER_LIST).toHaveLength(6);
    });

    it("every item has type, title, detail, image, and soldOut", () => {
      OFFER_LIST.forEach((item) => {
        expect(typeof item.type).toBe("string");
        expect(typeof item.title).toBe("string");
        expect(typeof item.detail).toBe("string");
        expect(typeof item.image).toBe("string");
        expect(typeof item.soldOut).toBe("boolean");
      });
    });
  });

  describe("SUGGESTED_PROUDCT", () => {
    it("has imageSrc as a string", () => {
      expect(typeof SUGGESTED_PROUDCT.imageSrc).toBe("string");
    });

    it("has product referencing IPHONE_16_PRO", () => {
      expect(SUGGESTED_PROUDCT.product).toBe(IPHONE_16_PRO);
    });
  });
});
