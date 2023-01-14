import React from "react";

const ProductCart = (props) => {
  const { onCheckout, onDelete, cartVisiblity, productsInCart } = props;
  let productCartClass =
    "product--cart product--cart--hidden product--cart--empty";

  if (cartVisiblity === "show" && productsInCart.length === 0)
    productCartClass = "product--cart product--cart--empty";
  else if (cartVisiblity === "show") productCartClass = "product--cart";

  return (
    <div className={productCartClass}>
      <div className="cart__header">
        <p>Cart</p>
      </div>
      <div className="cart__body">
        <div className="cart__products">
          <p className="empty-cart-message">Your cart is empty.</p>
          {productsInCart.map((product) => {
            const { name, discountedPrice, itemsCount, images, _id } = product;
            return (
              <div
                key={product._id}
                className="cart__product-display remove-dummy"
              >
                <div className="thumbnail-and-product">
                  <div className="icon-container cart__product-thumbnail">
                    <img src={images[0]} alt="" />
                  </div>
                  <div className="cart__product-info">
                    <p className="cart__product-title">{name}</p>
                    <span className="price cart__product-price">
                      {discountedPrice}
                    </span>{" "}
                    x
                    <span className="cart__product-quantity">
                      {" " + itemsCount}
                    </span>
                    <span className="price cart__product-total">
                      {itemsCount * discountedPrice}
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => onDelete(_id)}
                  className="cart__delete-icon"
                >
                  <svg
                    width="14"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <defs>
                      <path
                        d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                        id="a"
                      />
                    </defs>
                    <use fill="#C3CAD9" fillRule="nonzero" xlinkHref="#a" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={onCheckout} className="btn btn--checkout">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
