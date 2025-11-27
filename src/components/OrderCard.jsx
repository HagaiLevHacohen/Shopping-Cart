import PropTypes from 'prop-types';
import styles from '../styles/OrderCard.module.css';

function OrderCard({title, image, price, amount, SetAmount, handleRemove }) {


  return (
    <div className={styles.card}>
      <img src={image} alt="" />
      <div className={styles.flexContainer}>
        <h3>{title}</h3>
        <p className={styles.priceOne}>${price}</p>
      </div>
      <div className={styles.flexContainer}>
        <button className={styles.removeBtn} onClick={() =>  handleRemove()}>Remove</button>
        <div className={styles.inputContainer}>
            <button className={styles.btnSubtract} onClick={() => { amount <= 1 ? handleRemove() : SetAmount(amount - 1)}}>-</button>
            <input type="number" min="0" value={amount} onChange={(e) => Number(e.target.value) <= 0 ? handleRemove() : SetAmount(Number(e.target.value)) }/>
            <button className={styles.btnAdd} onClick={() => SetAmount(amount + 1)}>+</button>
        </div>
        <p className={styles.priceAll}>Total: ${(price * amount).toFixed(2)}</p>
      </div>

    </div>
  )
}

export default OrderCard