

//--------------------------- Image Slider Mobile -------------------------------//

ImageSliderMobile();

function ImageSliderMobile() {
    let imageSlider = document.querySelector('.product--main .image-slider')
    let productImages = document.querySelectorAll(".product--main .image-slider img")

    // Buttons
    let prevBtn = document.querySelector('#prev-btn--main');
    let nextBtn = document.querySelector('#next-btn--main');

    // Counter

    let size = null;
    let counter;

    window.addEventListener('load',()=>{
        counter = 1;
        size = productImages[0].clientWidth;
        imageSlider.style.transform = `translateX(${-size*counter}px)`;       //----------- The mobile image resizing issue lies here ---------//
    })

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
}






/* Overlay On and off section */

const closeOverlayBtn = document.querySelector('.product--overlay #close-btn');
const overlay = document.querySelector('.product--overlay');

closeOverlayBtn.addEventListener('click',()=>{
    overlay.classList.add('product--overlay--hidden');
})

const productImage = document.querySelector('.product--main .product__image-container');

if (window.screen.width > 768){
    productImage.addEventListener('click',()=>{
        overlay.classList.remove('product--overlay--hidden');
    })
}



/* Mobile Navbar */







