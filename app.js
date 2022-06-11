//--- Image Slider Mobile ---//

const imageSlider = document.querySelector('.image-slider')
const productImages = document.querySelectorAll(".image-slider img")

// Buttons
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Counter
let counter = 0;
const size = productImages[0].clientWidth;

nextBtn.addEventListener('click',()=>{
    if (counter<productImages.length-1){
        counter++;
        imageSlider.style.transition = 'transform 0.4s ease-in-out';
        imageSlider.style.transform = `translateX(${-size*counter}px)`;
    }
})


prevBtn.addEventListener('click',()=>{
    if(counter>0) {
        counter--;
        imageSlider.style.transition = 'transform 0.4s ease-in-out';
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




