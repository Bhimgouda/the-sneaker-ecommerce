import React, { useEffect, useState } from "react";
import ProductImage from "./common/productImages";
import PricingPanel from "./common/pricingPanel";
import ProductInfo from "./common/productInfo";
import AddToCart from "./common/addToCart";
import { getProducts } from "../fakeDatabase";
import ProductOverlay from "./common/productOverlay";

const Product = (props) => {
  const [overlay, setOverlay] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const productId = props.match.params.id;
  const product = [...getProducts()].find(
    (product) => product._id === productId
  );

  const {
    name,
    companyName,
    desc,
    originalPrice,
    discountedPrice,
    images,
    thumbnailImages,
  } = product;

  const handleOverlay = () => {
    if (overlay) setOverlay(false);
    else setOverlay(true);
  };

  const handleImageChange = (id) => {
    setCurrentImage(id);
  };

  return (
    <React.Fragment>
      <section className="product--main container">
        <div className="product__header">
          <ProductImage
            showOverlay={handleOverlay}
            productImages={images}
            thumbnailImages={thumbnailImages}
          />
        </div>
        <div className="product__body">
          <ProductInfo name={name} desc={desc} companyName={companyName} />
          <PricingPanel
            originalPrice={originalPrice}
            discountedPrice={discountedPrice}
          />
          <AddToCart onATC={(itemsCount) => props.onATC(product, itemsCount)} />
        </div>
      </section>
      <ProductOverlay
        thumbnailImages={thumbnailImages}
        images={images}
        hideOverlay={handleOverlay}
        overlayOn={overlay}
      />
    </React.Fragment>
  );
};

export default Product;
