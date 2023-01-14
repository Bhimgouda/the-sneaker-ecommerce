const thumbnailImages = document.querySelectorAll(".product--main .thumbnail");
const productImages = document.querySelectorAll(
  ".product--main .image-slider img"
);
const imageSlider = document.querySelector(".product--main .image-slider");
const cartTotalQuantity = document.querySelector(".user__total-quantity");

let counter = 1; // ---- for image 1 to be diplayed
let size = productImages[0].clientWidth;
function reportWindowSize() {
  return window.innerWidth;
}

function onscreenload(counter) {
  let size = productImages[0].clientWidth;
  imageSlider.style.transition = "none";
  imageSlider.style.transform = `translateX(${-size * counter}px)`; //----------- The mobile image resizing issue lies here ---------//
}

//--------------------------- Image Slider Mobile -------------------------------//

ImageSliderMobile();

function ImageSliderMobile() {
  // Buttons
  let prevBtn = document.querySelector("#prev-btn--main");
  let nextBtn = document.querySelector("#next-btn--main");

  // Counter

  window.addEventListener("load", () => {
    onscreenload(1);
  });

  nextBtn.addEventListener("click", () => {
    size = productImages[0].clientWidth;
    if (counter >= productImages.length - 1) return;
    imageSlider.style.transition = "transform 0.4s ease-in-out";
    counter++;
    imageSlider.style.transform = `translateX(${-size * counter}px)`;
  });
  prevBtn.addEventListener("click", () => {
    size = productImages[0].clientWidth;
    if (counter <= 0) return;
    imageSlider.style.transition = "transform 0.4s ease-in-out";
    counter--;
    imageSlider.style.transform = `translateX(${-size * counter}px)`;
  });

  imageSlider.addEventListener("transitionend", () => {
    size = productImages[0].clientWidth;
    let imageId = productImages[counter].id;
    if (imageId === "last-clone") {
      imageSlider.style.transition = "none";
      counter = productImages.length - 2;
      imageSlider.style.transform = `translateX(${-size * counter}px)`;
    }
    if (imageId === "first-clone") {
      imageSlider.style.transition = "none";
      counter = 1;
      imageSlider.style.transform = `translateX(${-size * counter}px)`;
    }
  });
}

/* Thumbnail image Function Main page */

thumbnailImages.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    thumbnailImages.forEach((thumbnail) => {
      thumbnail.classList.remove("thumbnail__current");
    });
    thumbnail.classList.toggle("thumbnail__current");
    let thumbnailId = thumbnail.id.split("");
    thumbnailId = thumbnailId.filter((item) => {
      return parseInt(item);
    });
    thumbnailId = parseInt(thumbnailId.join(""));

    let size = productImages[0].clientWidth;
    imageSlider.style.transition = "none";
    imageSlider.style.transform = `translateX(${-size * thumbnailId}px)`;
    counter = thumbnailId;
  });
});

/* Overlay On and off section */

overlay();

function overlay() {
  const overlay = document.querySelector(".product--overlay");
  const closeOverlayBtn = document.querySelector(
    ".product--overlay #close-btn"
  );

  closeOverlayBtn.addEventListener("click", () => {
    overlay.classList.add("product--overlay--hidden");
  });

  const productImage = document.querySelector(
    ".product--main .product__image-container"
  );

  if (window.screen.width > 768) {
    productImage.addEventListener("click", () => {
      overlay.classList.remove("product--overlay--hidden");
    });
  }
}

/* Overlay Image Section */

const overlayThumbnails = document.querySelectorAll(
  ".product--overlay .thumbnail"
);

overlayImageChanger();

function overlayImageChanger() {
  const productImages = document.querySelectorAll(
    ".product--overlay .image-slider img"
  );
  const imageSlider = document.querySelector(".product--overlay .image-slider");
  const prevBtn = document.querySelector("#prev-btn--overlay");
  const nextBtn = document.querySelector("#next-btn--overlay");

  let counter = 1;
  let imageId = 1;
  let size = 450;

  imageSlider.style.transform = `translateX(${-size * counter}px)`;

  nextBtn.addEventListener("click", () => {
    if (counter > productImages.length - 2) return;
    imageSlider.style.transition = "transform 0.4s ease-in-out";
    counter++;
    imageSlider.style.transform = `translateX(${-size * counter}px)`;
    assignCurrentThumbnail();
  });

  prevBtn.addEventListener("click", () => {
    if (counter < 1) return;
    imageSlider.style.transition = "transform 0.4s ease-in-out";
    counter--;
    imageSlider.style.transform = `translateX(${-size * counter}px)`;
    assignCurrentThumbnail();
  });

  imageSlider.addEventListener("transitionend", () => {
    let imageId = productImages[counter].id;
    if (imageId === "last-clone") {
      imageSlider.style.transition = "none";
      counter = productImages.length - 2;
      assignCurrentThumbnail();
      imageSlider.style.transform = `translateX(${-size * counter}px)`;
    }
    if (imageId === "first-clone") {
      imageSlider.style.transition = "none";
      counter = 1;
      assignCurrentThumbnail();
      imageSlider.style.transform = `translateX(${-size * counter}px)`;
    }
  });

  function assignCurrentThumbnail() {
    overlayThumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove("thumbnail__current");
      if (thumbnail.id === `thumbnail-overlay-${counter}`) {
        thumbnail.classList.add("thumbnail__current");
      }
    });
  }

  /* For Thumbnail image change */

  overlayThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      overlayThumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove("thumbnail__current");
      });
      thumbnail.classList.add("thumbnail__current");
      let thumbnailId = thumbnail.id.split("");
      thumbnailId = thumbnailId.filter((item) => {
        return parseInt(item);
      });
      thumbnailId = parseInt(thumbnailId.join(""));

      let size = productImages[0].clientWidth;
      imageSlider.style.transform = `translateX(${-size * thumbnailId}px)`;
      imageSlider.style.transition = "none";
      counter = thumbnailId;
    });
  });
}

/* Mobile Navbar */

const navToggler = document.querySelector(".nav__burger");
const navLinks = document.querySelector(".nav__links");

navToggler.addEventListener("click", () => {
  navToggler.classList.toggle("nav__burger--close");
  navLinks.classList.toggle("nav__links--expanded");
});

/* Add to cart section */
const addToCartBtn = document.querySelector(".btn--cart");
const cartProducts = document.querySelector(".cart__products");
const userCart = document.querySelector(".product--cart");

/* product Display in cart */
const productDisplay = document.querySelector(".cart__product-display");

/* From main page */
const productName = document.querySelector(".product--main .product__title");
const productPrice = document.querySelector(
  ".product--main .product__discounted-price"
);
const productQuantity = document.querySelector(
  ".product--main .product__quantity"
);
const productThumbnail = document.querySelector(
  ".product--main #thumbnail-main-1"
);

/* From hardcoded dummy usercart product display */
const cartProductName = document.querySelector(".cart__product-title");
const cartProductPrice = document.querySelector(".cart__product-price");
const cartProductQuantity = document.querySelector(".cart__product-quantity");
const cartProductThumbnail = document.querySelector(
  ".cart__product-thumbnail img"
);
const cartProductTotal = document.querySelector(".cart__product-total");

let totalCartProducts = 0;
let childrenId;
let totalQuantityCounter = 0;

addToCartBtn.addEventListener("click", () => {
  totalQuantityCounter += parseInt(productQuantity.textContent);
  /* Firstly hide the hardcorded dummy display */
  productDisplay.classList.add("cart__product-display--hidden");
  userCart.classList.remove("product--cart--empty");
  const cartProductNameAll = document.querySelectorAll(".cart__product-title");
  let latestTotalQuantity;
  if (totalCartProducts > 0) {
    for (index = 0; index < cartProductNameAll.length; index++) {
      if (cartProductNameAll[index].textContent === productName.textContent) {
        if (
          cartProductNameAll[
            index
          ].parentElement.parentElement.parentElement.classList.contains(
            "added-to-cart"
          )
        ) {
          let productInfo = cartProductNameAll[index].parentElement;
          let productChildrenInfo = productInfo.childNodes;
          productChildrenInfo.forEach((childInfos, i) => {
            if (childInfos.classList === undefined) return;
            if (childInfos.classList.contains("cart__product-quantity")) {
              latestTotalQuantity =
                parseInt(productChildrenInfo[i].textContent) +
                parseInt(productQuantity.textContent);
              productChildrenInfo[i].textContent = `${latestTotalQuantity}`;
            }
            if (childInfos.classList.contains("cart__product-total")) {
              productChildrenInfo[i].textContent = `${
                parseInt(productPrice.textContent) * latestTotalQuantity
              }`;
            }
          });
        }
      }
    }
  } else {
    simplyCreateElement();
  }

  userTotalQuantityDisplay();

  function simplyCreateElement() {
    /* Firstly we should edit our hardcoded values inside cart__ product-display and then add it to newly created product */
    cartProductName.textContent = productName.textContent;
    cartProductPrice.textContent = productPrice.textContent;
    cartProductQuantity.textContent = productQuantity.textContent;
    cartProductThumbnail.src = productThumbnail.src;
    cartProductTotal.textContent =
      parseInt(productPrice.textContent) *
      parseInt(productQuantity.textContent);

    createCartProduct();
    productDisplay.remove;
  }
  function createCartProduct() {
    const product = document.createElement("div");
    product.classList = "cart__product-display added-to-cart";
    product.innerHTML = productDisplay.innerHTML;
    product.id = `cart-product${totalCartProducts}`;
    cartProducts.appendChild(product);
  }
  totalCartProducts++;
  productQuantity.textContent = "0";

  userTotalQuantityDisplay();
});

//------------------- User Cart -----------------//

userCartFunc();

function userCartFunc() {
  const userCartIcon = document.querySelector(".user__cart-icon");
  const productCart = document.querySelector(".product--cart");

  if (window.innerWidth > 768) {
    userCartIcon.addEventListener("mouseover", showcart);
    userCartIcon.addEventListener("mouseout", hidecart);

    productCart.addEventListener("mouseover", showcart);
    productCart.addEventListener("mouseout", hidecart);

    function showcart() {
      productCart.classList.remove("product--cart--hidden");
    }

    function hidecart() {
      productCart.classList.add("product--cart--hidden");
    }
  } else {
    userCartIcon.addEventListener("click", () => {
      productCart.classList.toggle("product--cart--hidden");
    });
  }

  //--* Cart product delete button *--//

  productCart.addEventListener("click", (e) => {
    let element = e.target;

    /* Targeting added to cart product */
    element = element.parentElement;
    let deleteProduct = element.parentElement;
    if (element.classList.contains("cart__delete-icon")) {
      productCart.classList.add("product--cart--empty");
      cartProducts.removeChild(deleteProduct);
      totalCartProducts = 0;
      totalQuantityCounter = 0;
      setTimeout(() => {
        productCart.classList.add("product--cart--hidden");
      }, 1000);
    }
    if (totalQuantityCounter === 0)
      cartTotalQuantity.classList.add("user__total-quantity--hidden");
  });
}

function userTotalQuantityDisplay() {
  cartTotalQuantity.classList.remove("user__total-quantity--hidden");
  cartTotalQuantity.textContent = `${totalQuantityCounter}`;
}

/* Quantity Selector */

const quantityMinus = document.querySelector(".icon--minus");
const quantityPlus = document.querySelector(".icon--plus");

quantityMinus.addEventListener("click", removeQuantity);
quantityPlus.addEventListener("click", addQuantity);

function removeQuantity() {
  let quantity = parseInt(productQuantity.textContent);
  if (quantity > 1) {
    quantity--;
    productQuantity.textContent = `${quantity}`;
  }
}
function addQuantity() {
  let quantity = parseInt(productQuantity.textContent);
  quantity++;
  productQuantity.textContent = `${quantity}`;
}

/* If window resizes */

onWindowResize();

function onWindowResize() {
  const overlay = document.querySelector(".product--overlay");

  window.addEventListener("resize", () => {
    //-- For image width resize --//
    onscreenload(counter);
    productImages.forEach((image) => {
      image.style.width = "100%";
    });
    windowSize = reportWindowSize();

    //-- For Overlay hide --//
    if (windowSize > 768) {
      overlay.classList.add("product--overlay--hidden");
    }
  });
}
