import styles from "./Product.module.css";
import styled from "styled-components";

const StyledProductContainer = styled.div`
  max-width: 28rem;
  position: relative;
  transition: transform ${(props) => props.transition || "0.1s"} ease-in-out;
  &:hover {
    transform: scale(${(props) => props.scale || 1.05});
    cursor: pointer;
  }
`;

function Product(props) {
  let imageStyle = {
    height: "auto",
    width: "100%",
    borderRadius: "0.5rem",
  };
  return (
    <StyledProductContainer>
      <img src={props.image} style={imageStyle} alt="iPad Pro" />
      <div className={styles.productTextContainer}>
        <div className={styles.productTitle}>{props.title}</div>
        <div className={styles.productDetail}>{props.detail}</div>
      </div>
    </StyledProductContainer>
  );
}

export default Product;
