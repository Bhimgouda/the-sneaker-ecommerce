//--- Image Slider Mobile ---//

const imageSlider = document.querySelector('.image-slider')
const productImages = document.querySelectorAll(".image-slider img")

// Buttons
const prevBtn = document.querySelector('#prev-btn--main');
const nextBtn = document.querySelector('#next-btn--main');

// Counter
let counter = 1;
const size = productImages[0].clientWidth;
imageSlider.style.transform = `translateX(${-size*counter}px)`;

nextBtn.addEventListener('click',()=>{
    if(counter>=productImages.length-1) return;
    imageSlider.style.transition = 'transform 0.4s ease-in-out';
    counter++;
    imageSlider.style.transform = `translateX(${-size*counter}px)`;
})
prevBtn.addEventListener('click',()=>{
    if(counter<=0) return;
    imageSlider.style.transition = 'transform 0.4s ease-in-out';
    counter--;
    imageSlider.style.transform = `translateX(${-size*counter}px)`;
})



imageSlider.addEventListener('transitionend',()=>{
    let imageId = productImages[counter].id
    if(imageId === 'last-clone'){
        imageSlider.style.transition = 'none';
        counter = productImages.length-2;
        imageSlider.style.transform = `translateX(${-size*counter}px)`;
    }
    if(imageId === 'first-clone'){
        imageSlider.style.transition = 'none';
        counter = 1;
        imageSlider.style.transform = `translateX(${-size*counter}px)`;
    }
})


/* Desktop image Changer */

const thumbnails = document.querySelectorAll('.thumbnail');

/* Overlay On and off section */

const closeOverlayBtn = document.querySelector('#close-btn');
const overlay = document.querySelector('.product-overlay');

closeOverlayBtn.addEventListener('click',()=>{
    overlay.classList.add('product-overlay--hidden');
})

const productImageContainer = document.querySelector('.product__image-container');

productImageContainer.addEventListener('click',()=>{
    overlay.classList.remove('product-overlay--hidden');
})




