import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import styles from "../styles/Home.module.css";
import TruckIcon from "../assets/truck-delivery-outline.svg";
import StarsIcon from "../assets/creation-outline.svg";
import CreditCardIcon from "../assets/credit-card-lock-outline.svg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <div className={`${styles.welcome} ${styles.card}`}>
        <h2>Welcome to Shoppary</h2>
        <p>Discover amazing products at unbeatable prices!</p>
        <button onClick={() => navigate("/Shop")}>Start Shopping!</button>
      </div>
      <div className={`${styles.freeShipping} ${styles.card}`}>
        <img src={TruckIcon} alt="" />
        <h2>Free Shipping</h2>
        <p>On orders over 50$</p>
      </div>
      <div className={`${styles.qualityProducts} ${styles.card}`}>
        <img src={StarsIcon} alt="" />
        <h2>Quality Products</h2>
      </div>
      <div className={`${styles.secureCheckout} ${styles.card}`}>
        <img src={CreditCardIcon} alt="" />
        <h2>Secure Checkout</h2>
        <p>100% secure payments</p>
      </div>
    </div>
  );
}

export default Home;
