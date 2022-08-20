import React from "react";

const ProductCart = () => {
  return (
    <div className="product--cart product--cart--hidden product--cart--empty">
      <div className="cart__header">
        <p>Cart</p>
      </div>
      <div className="cart__body">
        <div className="cart__products">
          <p className="empty-cart-message">Your cart is empty.</p>
          <div className="cart__product-display remove-dummy">
            <div className="thumbnail-and-product">
              <div className="icon-container cart__product-thumbnail">
                <img src="./images/image-product-1-thumbnail.webp" alt="" />
              </div>
              <div className="cart__product-info">
                <p className="cart__product-title">Fall shoes</p>
                <span className="price cart__product-price">125.00</span> x
                <span className="cart__product-quantity">3</span>
                <span className="price cart__product-total">375</span>
              </div>
            </div>
            <div className="cart__delete-icon">
              <img src="./images/icon-delete.svg" alt="" />
            </div>
          </div>
        </div>
        <button className="btn btn--checkout">Checkout</button>
      </div>
    </div>
  );
};

export default ProductCart;
