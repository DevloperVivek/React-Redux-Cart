import { useSelector } from "react-redux";
import Products from "./components/Shop/Products";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  return (
    <div>
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </div>
  );
}

export default App;
