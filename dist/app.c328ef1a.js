// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app.js":[function(require,module,exports) {
var thumbnailImages = document.querySelectorAll('.product--main .thumbnail');
var productImages = document.querySelectorAll('.product--main .image-slider img');
var imageSlider = document.querySelector('.product--main .image-slider');
var cartTotalQuantity = document.querySelector('.user__total-quantity');
var counter = 1; // ---- for image 1 to be diplayed

var size = productImages[0].clientWidth;

function reportWindowSize() {
  return window.innerWidth;
}

function onscreenload(counter) {
  var size = productImages[0].clientWidth;
  imageSlider.style.transition = 'none';
  imageSlider.style.transform = "translateX(".concat(-size * counter, "px)"); //----------- The mobile image resizing issue lies here ---------//
} //--------------------------- Image Slider Mobile -------------------------------//


ImageSliderMobile();

function ImageSliderMobile() {
  // Buttons
  var prevBtn = document.querySelector('#prev-btn--main');
  var nextBtn = document.querySelector('#next-btn--main'); // Counter

  window.addEventListener('load', function () {
    onscreenload(1);
  });
  nextBtn.addEventListener('click', function () {
    size = productImages[0].clientWidth;
    if (counter >= productImages.length - 1) return;
    imageSlider.style.transition = 'transform 0.4s ease-in-out';
    counter++;
    imageSlider.style.transform = "translateX(".concat(-size * counter, "px)");
  });
  prevBtn.addEventListener('click', function () {
    size = productImages[0].clientWidth;
    if (counter <= 0) return;
    imageSlider.style.transition = 'transform 0.4s ease-in-out';
    counter--;
    imageSlider.style.transform = "translateX(".concat(-size * counter, "px)");
  });
  imageSlider.addEventListener('transitionend', function () {
    size = productImages[0].clientWidth;
    var imageId = productImages[counter].id;

    if (imageId === 'last-clone') {
      imageSlider.style.transition = 'none';
      counter = productImages.length - 2;
      imageSlider.style.transform = "translateX(".concat(-size * counter, "px)");
    }

    if (imageId === 'first-clone') {
      imageSlider.style.transition = 'none';
      counter = 1;
      imageSlider.style.transform = "translateX(".concat(-size * counter, "px)");
    }
  });
}
/* Thumbnail image Function Main page */


thumbnailImages.forEach(function (thumbnail) {
  thumbnail.addEventListener('click', function () {
    thumbnailImages.forEach(function (thumbnail) {
      thumbnail.classList.remove('thumbnail__current');
    });
    thumbnail.classList.toggle('thumbnail__current');
    var thumbnailId = thumbnail.id.split('');
    thumbnailId = thumbnailId.filter(function (item) {
      return parseInt(item);
    });
    thumbnailId = parseInt(thumbnailId.join(''));
    var size = productImages[0].clientWidth;
    imageSlider.style.transition = 'none';
    imageSlider.style.transform = "translateX(".concat(-size * thumbnailId, "px)");
    counter = thumbnailId;
  });
});
/* Overlay On and off section */

overlay();

function overlay() {
  var overlay = document.querySelector('.product--overlay');
  var closeOverlayBtn = document.querySelector('.product--overlay #close-btn');
  closeOverlayBtn.addEventListener('click', function () {
    overlay.classList.add('product--overlay--hidden');
  });
  var productImage = document.querySelector('.product--main .product__image-container');

  if (window.screen.width > 768) {
    productImage.addEventListener('click', function () {
      overlay.classList.remove('product--overlay--hidden');
    });
  }
}
/* Overlay Image Section */


var overlayThumbnails = document.querySelectorAll(".product--overlay .thumbnail");
overlayImageChanger();

function overlayImageChanger() {
  var productImages = document.querySelectorAll('.product--overlay .image-slider img');
  var imageSlider = document.querySelector('.product--overlay .image-slider');
  var prevBtn = document.querySelector('#prev-btn--overlay');
  var nextBtn = document.querySelector('#next-btn--overlay');
  var counter = 1;
  var imageId = 1;
  var size = 450;
  imageSlider.style.transform = "translateX(".concat(-size * counter, "px)");
  nextBtn.addEventListener('click', function () {
    if (counter > productImages.length - 2) return;
    imageSlider.style.transition = 'transform 0.4s ease-in-out';
    counter++;
    imageSlider.style.transform = "translateX(".concat(-size * counter, "px)");
    assignCurrentThumbnail();
  });
  prevBtn.addEventListener('click', function () {
    if (counter < 1) return;
    imageSlider.style.transition = 'transform 0.4s ease-in-out';
    counter--;
    imageSlider.style.transform = "translateX(".concat(-size * counter, "px)");
    assignCurrentThumbnail();
  });
  imageSlider.addEventListener('transitionend', function () {
    var imageId = productImages[counter].id;

    if (imageId === 'last-clone') {
      imageSlider.style.transition = 'none';
      counter = productImages.length - 2;
      assignCurrentThumbnail();
      imageSlider.style.transform = "translateX(".concat(-size * counter, "px)");
    }

    if (imageId === 'first-clone') {
      imageSlider.style.transition = 'none';
      counter = 1;
      assignCurrentThumbnail();
      imageSlider.style.transform = "translateX(".concat(-size * counter, "px)");
    }
  });

  function assignCurrentThumbnail() {
    overlayThumbnails.forEach(function (thumbnail) {
      thumbnail.classList.remove('thumbnail__current');

      if (thumbnail.id === "thumbnail-overlay-".concat(counter)) {
        thumbnail.classList.add('thumbnail__current');
      }
    });
  }
  /* For Thumbnail image change */


  overlayThumbnails.forEach(function (thumbnail) {
    thumbnail.addEventListener('click', function () {
      overlayThumbnails.forEach(function (thumbnail) {
        thumbnail.classList.remove('thumbnail__current');
      });
      thumbnail.classList.add('thumbnail__current');
      var thumbnailId = thumbnail.id.split('');
      thumbnailId = thumbnailId.filter(function (item) {
        return parseInt(item);
      });
      thumbnailId = parseInt(thumbnailId.join(''));
      var size = productImages[0].clientWidth;
      imageSlider.style.transform = "translateX(".concat(-size * thumbnailId, "px)");
      imageSlider.style.transition = 'none';
      counter = thumbnailId;
    });
  });
}
/* Mobile Navbar */


var navToggler = document.querySelector('.nav__burger');
var navLinks = document.querySelector('.nav__links');
navToggler.addEventListener('click', function () {
  navToggler.classList.toggle('nav__burger--close');
  navLinks.classList.toggle('nav__links--expanded');
});
/* Add to cart section */

var addToCartBtn = document.querySelector('.btn--cart');
var cartProducts = document.querySelector('.cart__products');
var userCart = document.querySelector('.product--cart');
/* product Display in cart */

var productDisplay = document.querySelector('.cart__product-display');
/* From main page */

var productName = document.querySelector('.product--main .product__title');
var productPrice = document.querySelector('.product--main .product__discounted-price');
var productQuantity = document.querySelector('.product--main .product__quantity');
var productThumbnail = document.querySelector('.product--main #thumbnail-main-1');
/* From hardcoded dummy usercart product display */

var cartProductName = document.querySelector('.cart__product-title');
var cartProductPrice = document.querySelector('.cart__product-price');
var cartProductQuantity = document.querySelector('.cart__product-quantity');
var cartProductThumbnail = document.querySelector('.cart__product-thumbnail img');
var cartProductTotal = document.querySelector('.cart__product-total');
var totalCartProducts = 0;
var childrenId;
var totalQuantityCounter = 0;
addToCartBtn.addEventListener('click', function () {
  totalQuantityCounter += parseInt(productQuantity.textContent);
  /* Firstly hide the hardcorded dummy display */

  productDisplay.classList.add('cart__product-display--hidden');
  userCart.classList.remove('product--cart--empty');
  var cartProductNameAll = document.querySelectorAll('.cart__product-title');
  var latestTotalQuantity;

  if (totalCartProducts > 0) {
    for (index = 0; index < cartProductNameAll.length; index++) {
      if (cartProductNameAll[index].textContent === productName.textContent) {
        if (cartProductNameAll[index].parentElement.parentElement.parentElement.classList.contains('added-to-cart')) {
          (function () {
            var productInfo = cartProductNameAll[index].parentElement;
            var productChildrenInfo = productInfo.childNodes;
            productChildrenInfo.forEach(function (childInfos, i) {
              if (childInfos.classList === undefined) return;

              if (childInfos.classList.contains('cart__product-quantity')) {
                latestTotalQuantity = parseInt(productChildrenInfo[i].textContent) + parseInt(productQuantity.textContent);
                productChildrenInfo[i].textContent = "".concat(latestTotalQuantity);
              }

              if (childInfos.classList.contains('cart__product-total')) {
                productChildrenInfo[i].textContent = "".concat(parseInt(productPrice.textContent) * latestTotalQuantity);
              }
            });
          })();
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
    cartProductTotal.textContent = parseInt(productPrice.textContent) * parseInt(productQuantity.textContent);
    createCartProduct();
    productDisplay.remove;
  }

  function createCartProduct() {
    var product = document.createElement('div');
    product.classList = 'cart__product-display added-to-cart';
    product.innerHTML = productDisplay.innerHTML;
    product.id = "cart-product".concat(totalCartProducts);
    cartProducts.appendChild(product);
  }

  totalCartProducts++;
  productQuantity.textContent = '0';
  userTotalQuantityDisplay();
}); //------------------- User Cart -----------------//

userCartFunc();

function userCartFunc() {
  var userCartIcon = document.querySelector('.user__cart-icon');
  var productCart = document.querySelector('.product--cart');

  if (window.innerWidth > 768) {
    var showcart = function showcart() {
      productCart.classList.remove('product--cart--hidden');
    };

    var hidecart = function hidecart() {
      productCart.classList.add('product--cart--hidden');
    };

    userCartIcon.addEventListener('mouseover', showcart);
    userCartIcon.addEventListener('mouseout', hidecart);
    productCart.addEventListener('mouseover', showcart);
    productCart.addEventListener('mouseout', hidecart);
  } else {
    userCartIcon.addEventListener('click', function () {
      productCart.classList.toggle('product--cart--hidden');
    });
  } //--* Cart product delete button *--//


  productCart.addEventListener('click', function (e) {
    var element = e.target;
    element = element.parentElement;
    var deleteElement = element.parentElement;

    if (element.classList.contains('cart__delete-icon') && totalCartProducts === 1) {
      productCart.classList.add('product--cart--empty');
      cartProducts.removeChild(deleteElement);
      totalCartProducts--;
      setTimeout(function () {
        productCart.classList.add('product--cart--hidden');
      }, 1000);
      userTotalQuantityDisplay();
    } else if (element.classList.contains('cart__delete-icon')) {
      cartProducts.removeChild(deleteElement);
      totalCartProducts--;
    }

    if (totalCartProducts > 0) {
      var number = childrenId.split('');
      number = number.filter(function (item) {
        return parseInt(item);
      });
      number = number.join('');
      number = parseInt(number);
      quantities[number + 2] = null;
    }

    if (totalQuantityCounter === 0) cartTotalQuantity.classList.add('user__total-quantity--hidden');
  });
}

function userTotalQuantityDisplay() {
  cartTotalQuantity.classList.remove('user__total-quantity--hidden');
  cartTotalQuantity.textContent = "".concat(totalQuantityCounter);
}
/* Quantity Selector */


var quantityMinus = document.querySelector('.icon--minus');
var quantityPlus = document.querySelector('.icon--plus');
quantityMinus.addEventListener('click', removeQuantity);
quantityPlus.addEventListener('click', addQuantity);

function removeQuantity() {
  var quantity = parseInt(productQuantity.textContent);

  if (quantity > 1) {
    quantity--;
    productQuantity.textContent = "".concat(quantity);
  }
}

function addQuantity() {
  var quantity = parseInt(productQuantity.textContent);
  quantity++;
  productQuantity.textContent = "".concat(quantity);
}
/* If window resizes */


onWindowResize();

function onWindowResize() {
  var overlay = document.querySelector('.product--overlay');
  window.addEventListener('resize', function () {
    //-- For image width resize --//
    onscreenload(counter);
    productImages.forEach(function (image) {
      image.style.width = '100%';
    });
    windowSize = reportWindowSize(); //-- For Overlay hide --//

    if (windowSize > 768) {
      overlay.classList.add('product--overlay--hidden');
    }
  });
}
},{}],"../../../../Users/satvi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52161" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../Users/satvi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map