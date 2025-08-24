// src/components/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cartSlice";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
   <>
    <NavBar/>
     <div className="container my-4">
      <Link to="/" className="text-decoration-none text-dark">
        <h2 className="mb-4">🛒 Cart</h2>
      </Link>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="row">
          {items.map((item) => (
            <div key={item.id} className="col-md-6 mb-3">
              <div className="card shadow-sm p-2 position-relative d-flex flex-row align-items-center">
                {/* ❌ Close button */}
                <button
                  className="btn-close position-absolute top-0 end-0 m-2"
                  onClick={() => dispatch(removeFromCart(item.id))}
                ></button>

                {/* Image on the left */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                  className="me-3"
                />

                {/* Details on the right */}
                <div className="flex-grow-1">
                  <h6 className="mb-1">{item.name}</h6>
                  <p className="mb-1 text-muted"><strong>$ {item.price}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-3">
          <button
            className="btn btn-danger"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
   </>
  );
};

export default Cart;
