import { useDispatch, useSelector } from "react-redux";
import Products from "./components/Shop/Products";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Notification from "./components/UI/Notification";
import { useEffect, useState } from "react";
import { cartActions } from "./store/cart-slice";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState({
    title: "Sending...",
    message: "Sendind Cart Data!",
    status: "",
  });

  const url =
    "https://react-redux-cart-be10e-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json";

  useEffect(() => {
    setStatus(true);
    try {
      const res = fetch(url, { method: "PUT", body: JSON.stringify(cart) }, [
        cart,
      ]);
      if (res.ok) {
        setMsg({
          title: "Success!",
          message: "Sent Cart Data Successfully!",
          status: "success",
        });
      } else {
        setMsg({
          title: "Error!",
          message: "Sending Cart Data Failed!",
          status: "error",
        });
      }
    } catch (err) {
      console.log(err);
      setMsg({
        title: "Error!",
        message: "Sending Cart Data Failed!",
        status: "error",
      });
    }
    setTimeout(() => {
      setStatus(false);
    }, 1000);
  }, [cart]);

  useEffect(() => {
    const pushData = async () => {
      setStatus(true);
      try {
        const res = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(cart),
        });
        if (res.ok) {
          setMsg({
            title: "Success!",
            message: "Sent Cart Data Successfully!",
            status: "success",
          });
        } else {
          setMsg({
            title: "Error!",
            message: "Sending Cart Data Failed!",
            status: "error",
          });
        }
      } catch (err) {
        console.log(err);
        setMsg({
          title: "Error!",
          message: "Sending Cart Data Failed!",
          status: "error",
        });
      }
      setTimeout(() => {
        setStatus(false);
      }, 1000);
    };
    if (cart.length > 0) {
      pushData();
    }
  }, [cart]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        for (let i = 0; i < data.items.length; i++) {
          const item = data.items[i];
          const newItem = {
            id: item.id,
            title: item.name,
            price: item.price,
          };
          dispatch(cartActions.addItemToCart(newItem));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Layout>
        {status && (
          <Notification
            status={msg.status}
            title={msg.title}
            message={msg.message}
          />
        )}
        {showCart && <Cart />}
        <Products />
      </Layout>
    </div>
  );
}

export default App;
