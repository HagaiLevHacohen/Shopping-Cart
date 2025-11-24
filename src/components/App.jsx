import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/App.module.css';
import { Outlet, Link} from "react-router";

const useItems = () => {
  const [itemsList, setItemsList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products', {
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => console.log(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { itemsList, error, loading };
};


function App() {
  const [itemsCounter, setItemsCounter] = useState(0);
  const { itemsList, error, loading } = useItems();

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Shoppary</h1>
        <nav className={styles.nav}>
          <Link to='/' className={styles.link}>Home</Link>
          <Link to='Shop' className={styles.link}>Shop</Link>
          <Link to='Cart' className={`${styles.link} ${styles.cartLink}`}>
            Cart
            <div className={`${styles.cartCounter} ${itemsCounter === 0 ? styles.invisible : ""}`}>{itemsCounter}</div>
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>A network error was encountered</p>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  )
}

export default App
