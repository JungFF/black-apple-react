import Product from "@components/Product.jsx";

let onProductClick = (title) => {
  alert(title);
};

export function ProductList({ data }) {
  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        rowGap: "3rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1
          style={{
            fontWeight: "800",
            backgroundImage: "url('src/assets/lines.png'",
            backgroundPosition: "center",
          }}
        >
          上新品，个个添新意
        </h1>
      </div>
      {data.map((product, index) => {
        return (
          <Product {...product} onProductClick={onProductClick} key={index} />
        );
      })}
    </div>
  );
}
