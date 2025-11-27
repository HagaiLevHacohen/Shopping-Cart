import PropTypes from "prop-types";
import { Outlet, Link, useOutletContext } from "react-router";
import styles from "../styles/Shop.module.css";
import Card from "./Card";

function Shop() {
  const [itemsList, cartItems, setCartItems] = useOutletContext();

  return (
    <div className={styles.shop}>
      <h2>Our Products</h2>
      <div className={styles.products}>
        {itemsList.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            handleAddToCart={(amount) =>
              setCartItems({
                ...cartItems,
                [item.id]: (cartItems[item.id] || 0) + amount,
              })
            }
          ></Card>
        ))}
      </div>
    </div>
  );
}

export default Shop;
