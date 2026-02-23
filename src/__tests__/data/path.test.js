import { describe, it, expect } from "vitest";
import {
  SHOPPING_PAGES,
  AUTH_PAGES,
  ACCOUNT_PAGES,
  ABOUT_PAGES,
  LEGAL_PAGES,
} from "../../assets/data/path.js";

describe("path.js exports", () => {
  describe("SHOPPING_PAGES", () => {
    it("has 6 items", () => {
      expect(SHOPPING_PAGES).toHaveLength(6);
    });

    it("every item has id, title, and path as strings", () => {
      SHOPPING_PAGES.forEach((page) => {
        expect(typeof page.id).toBe("string");
        expect(typeof page.title).toBe("string");
        expect(typeof page.path).toBe("string");
      });
    });

    it("first page is the store root", () => {
      expect(SHOPPING_PAGES[0]).toEqual({
        id: "store",
        title: "商店",
        path: "/",
      });
    });
  });

  describe("AUTH_PAGES", () => {
    it("has 2 items with id, title, and path", () => {
      expect(AUTH_PAGES).toHaveLength(2);
      AUTH_PAGES.forEach((page) => {
        expect(typeof page.id).toBe("string");
        expect(typeof page.title).toBe("string");
        expect(typeof page.path).toBe("string");
      });
    });
  });

  describe("ACCOUNT_PAGES", () => {
    it("has 2 items with id, title, and path", () => {
      expect(ACCOUNT_PAGES).toHaveLength(2);
      ACCOUNT_PAGES.forEach((page) => {
        expect(typeof page.id).toBe("string");
        expect(typeof page.title).toBe("string");
        expect(typeof page.path).toBe("string");
      });
    });
  });

  describe("ABOUT_PAGES", () => {
    it("has 7 items", () => {
      expect(ABOUT_PAGES).toHaveLength(7);
    });

    it("items have title and path but no id field", () => {
      ABOUT_PAGES.forEach((page) => {
        expect(typeof page.title).toBe("string");
        expect(typeof page.path).toBe("string");
        expect(page).not.toHaveProperty("id");
      });
    });
  });

  describe("LEGAL_PAGES", () => {
    it("has 3 items", () => {
      expect(LEGAL_PAGES).toHaveLength(3);
    });

    it("items have title and path but no id field", () => {
      LEGAL_PAGES.forEach((page) => {
        expect(typeof page.title).toBe("string");
        expect(typeof page.path).toBe("string");
        expect(page).not.toHaveProperty("id");
      });
    });
  });

  describe("structural consistency", () => {
    it("only SHOPPING_PAGES, AUTH_PAGES, ACCOUNT_PAGES have id fields", () => {
      [SHOPPING_PAGES, AUTH_PAGES, ACCOUNT_PAGES].forEach((pageList) => {
        pageList.forEach((page) => expect(page).toHaveProperty("id"));
      });
      [ABOUT_PAGES, LEGAL_PAGES].forEach((pageList) => {
        pageList.forEach((page) => expect(page).not.toHaveProperty("id"));
      });
    });
  });
});
