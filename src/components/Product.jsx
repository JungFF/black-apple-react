import styles from "./Product.module.css";
import styled from "styled-components";

const StyledProductContainer = styled.div`
  max-width: 28rem;
  position: relative;
  transition: transform ${(props) => props.$transition || "0.1s"} ease-in-out;
  &:hover {
    transform: scale(${(props) => props.$scale || 1.05});
    cursor: pointer;
  }
`;

const StyledProductTextContainer = styled.div`
  color: ${(props) => props.$textColor || "white"};
  position: absolute;
  top: 1.5rem;
  padding-left: 1.5rem;
  padding-top: 2rem;
`;

function Product({ image, title, detail, onProductClick, textColor }) {
  let imageStyle = {
    height: "auto",
    width: "100%",
    borderRadius: "0.5rem",
  };
  return (
    <StyledProductContainer onClick={() => onProductClick(title)}>
      <img src={image} style={imageStyle} alt="iPad Pro" />
      <StyledProductTextContainer $textColor={textColor}>
        <div className={styles.productTitle}>{title}</div>
        <div className={styles.productDetail}>{detail}</div>
      </StyledProductTextContainer>
    </StyledProductContainer>
  );
}

export default Product;
