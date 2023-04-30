import React, { useState, useEffect } from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./components/RatingStars";
import ShoppingCart from "./components/ShoppingCart";

const products = [
  {
    id: 1,
    name: "Tomatoes",
    description:
      "Looking for a delicious and nutritious addition to your meals? Look no further than our farm-grown tomatoes",
    price: 85,
    location: "Nairobi",
    rating: 4.5,
    image: require("./assets/images/prod-1.jpg"),
  },
  {
    id: 2,
    name: "Fruits",
    description:
      "Our fruits are packed with essential vitamins and nutrients, making them the perfect choice for a variety of recipes.",
    price: 85,
    location: "Mombasa",
    rating: 4.5,
    image: require("./assets/images/prod-2.jpg"),
  },
  {
    id: 3,
    name: "Vegetables",
    description:
      " Whether you're making a stir-fry, roasting them as a side dish, or using them in your favorite soup or salad recipe, our vegetables will add a delicious and satisfying flavor to your meals.",
    price: 85,
    location: "Nakuru",
    rating: 4.5,
    image: require("./assets/images/prod-3.jpg"),
  },
  {
    id: 4,
    name: "Apples",
    description:
      "Our apples are packed with essential vitamins and nutrients, making them the perfect choice for a variety of recipes.",
    price: 85,
    location: "Kisumu",
    rating: 4.5,
    image: require("./assets/images/prod-4.jpg"),
  },

  {
    id: 5,
    name: "Avocado",
    description:
      "Our avocados are rich in healthy fats and packed with nutrients, making them the perfect choice for a variety of recipes",
    price: 85,
    location: "Machakos",
    rating: 4.5,
    image: require("./assets/images/prod-8.jpg"),
  },
  {
    id: 6,
    name: "Maize",
    description:
      "Our maize is rich in flavor and packed with nutrients, making it the perfect choice for a variety of recipes.",
    price: 75,
    location: "Kitale",
    rating: 4.5,
    image: require("./assets/images/prod-7.jpg"),
  },
  {
    id: 7,
    name: "Wheat",
    description:
      "We take pride in using only the highest-quality wheat, which is rich in nutrients and bursting with flavor.",
    price: 95,
    location: "Kilifi",
    rating: 4.5,
    image: require("./assets/images/prod-6.jpg"),
  },
  {
    id: 8,
    name: "Strawberry",
    description:
      "Our strawberries are plump, juicy, and bursting with flavor. They're perfect for snacking on their own, adding to your morning yogurt or cereal, or using in your favorite dessert recipe. ",
    price: 85,
    location: "Kitui",
    rating: 4.5,
    image: require("./assets/images/prod-5.jpg"),
  },
  {
    id: 9,
    name: "Milk",
    description:
      "Our milk is rich and creamy, with a silky smooth texture that is perfect for adding to your morning coffee, pouring over your favorite cereal, or using in all your favorite recipes.",
    price: 85,
    location: "Malindi",
    rating: 4.5,
    image: require("./assets/images/prod-9.jpg"),
  },
  {
    id: 10,
    name: "Eggs",
    description:
      "Our eggs are rich in flavor, with bright orange yolks and a delicious, creamy texture that is perfect for any recipe.",
    price: 85,
    location: "Kajiado",
    rating: 4.5,
    image: require("./assets/images/prod-10.jpg"),
  },
  {
    id: 11,
    name: "Chicken ",
    description:
      "Our chicken is hormone and antibiotic-free, so you can feel good about feeding it to your family.",
    price: 85,
    location: "Eldoret",
    rating: 4.5,
    image: require("./assets/images/prod-11.jpg"),
  },
  {
    id: 12,
    name: "Meat",
    description:
      " From juicy steaks to succulent chicken, our meats are guaranteed to satisfy your taste buds and elevate any dish.",
    price: 85,
    location: "Lodwar",
    rating: 4.5,
    image: require("./assets/images/prod-12.jpg"),
  },
];

function App() {
  const [cartsVisibilty, setCartVisible] = useState(false);
  const [productsInCart, setProducts] = useState(
    JSON.parse(localStorage.getItem("shopping-cart")) || []
  );
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(productsInCart));
  }, [productsInCart]);
  const addProductToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    setProducts([...productsInCart, newProduct]);
  };

  const onQuantityChange = (productId, count) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex((item) => item.id === productId);
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };

  const onProductRemove = (product) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex(
        (item) => item.id === product.id
      );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };

  return (
    <div className="App">
      <ShoppingCart
        visibilty={cartsVisibilty}
        products={productsInCart}
        onClose={() => setCartVisible(false)}
        onQuantityChange={onQuantityChange}
        onProductRemove={onProductRemove}
      />
      <div className="navbar">
        <h3 className="logo">MkulimaCoin</h3>
        <button
          className="btn shopping-cart-btn"
          onClick={() => setCartVisible(true)}
        >
          <GiShoppingBag size={24} />
          {productsInCart.length > 0 && (
            <span className="product-count">{productsInCart.length}</span>
          )}
        </button>
      </div>
      <main>
        <h2 className="title">Farm Fresh Foods</h2>
        <div className="products">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <img
                className="product-image"
                src={product.image}
                alt={product.image}
              />
              <h4 className="product-name">{product.name}</h4>
              <RatingStars rating={product.rating} />
              <p>{product.description}</p>
              <span className="product-price">Ksh {product.price}</span>
              <h4 className="product-name">{product.location}</h4>
              <div className="buttons">
                <button className="btn">Detail</button>
                <button
                  className="btn"
                  onClick={() => addProductToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
