import { useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Card.module.css";

function Card({ title, image, price, handleAddToCart }) {
  const [inputValue, setInputValue] = useState(1);
  const [animateCard, setAnimateCard] = useState(false);
  const [offset, setOffset] = useState({ dx: 0, dy: 0 });
  const cardRef = useRef();

  function triggerAnimation() {
    const card = cardRef.current;
    const basket = document.getElementById("basket-icon");

    const cardRect = card.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    const dx =
      basketRect.left +
      basketRect.width / 2 -
      (cardRect.left + cardRect.width / 2);
    const dy =
      basketRect.top +
      basketRect.height / 2 -
      (cardRect.top + cardRect.height / 2);

    setOffset({ dx, dy });

    setAnimateCard(true);
  }

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${animateCard ? styles.animate : ""}`}
      style={{
        "--dx": `${offset.dx}px`,
        "--dy": `${offset.dy}px`,
      }}
      onAnimationEnd={() => setAnimateCard(false)}
    >
      <h3 className={styles.title}>{title}</h3>
      <img src={image} alt="" />
      <p>${price}</p>
      <div className={styles.inputContainer}>
        <button
          className={styles.btnSubtract}
          onClick={() => setInputValue(Math.max(1, inputValue - 1))}
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
        />
        <button
          className={styles.btnAdd}
          onClick={() => setInputValue(inputValue + 1)}
        >
          +
        </button>
      </div>
      <button
        className={styles.btnAddToCart}
        onClick={() => {
          handleAddToCart(inputValue);
          triggerAnimation();
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired, // must be a string and required
  image: PropTypes.string.isRequired, // string, optional
  price: PropTypes.number.isRequired, // must be a number
  handleAddToCart: PropTypes.func.isRequired, // optional number
};

export default Card;
