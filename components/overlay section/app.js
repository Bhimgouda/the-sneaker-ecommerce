/* Desktop image Changer */

const thumbnails = document.querySelectorAll('product--overlay .thumbnail');

/* Overlay On and off section */

const closeOverlayBtn = document.querySelector('.product--overlay #close-btn');
const overlay = document.querySelector('.product--overlay');

closeOverlayBtn.addEventListener('click',()=>{
    overlay.classList.add('product--overlay--hidden');
})

const productImage = document.querySelector('.product--main .product__image-container');

productImage.addEventListener('click',()=>{
    overlay.classList.remove('product--overlay--hidden');
})