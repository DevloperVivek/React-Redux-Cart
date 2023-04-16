import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Dummy_PRODUCTS = [
  {
    id: "p1",
    price: 8,
    title: "The Stranger",
    description: "The Mystery Of The Ghost",
  },
  {
    id: "p2",
    price: 28,
    title: "The Dark",
    description: "The Mystery Of The Dark",
  },
  {
    id: "p3",
    price: 18,
    title: "The Vkt Studios",
    description: "The Success Of The Vkt Studios",
  },
  {
    id: "p4",
    price: 50,
    title: "The Person You Dont Know",
    description: "The Mystery You",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {Dummy_PRODUCTS.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
