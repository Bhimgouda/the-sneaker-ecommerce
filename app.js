const thumbnailImages = document.querySelectorAll('.product--main .thumbnail');
const productImages = document.querySelectorAll('.product--main .image-slider img')
const imageSlider = document.querySelector('.product--main .image-slider')


//--------------------------- Image Slider Mobile -------------------------------//

ImageSliderMobile();

function ImageSliderMobile() {
    
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
    
    nextBtn.addEventListener('click', ()=>{
        if(counter>=productImages.length-1) return;
        imageSlider.style.transition = 'transform 0.4s ease-in-out';
        counter++;
        imageSlider.style.transform = `translateX(${-size*counter}px)`
    })
    prevBtn.addEventListener('click', ()=>{
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



/* Thumbnail image Function Main page */


thumbnailImages.forEach(thumbnail =>{
    thumbnail.addEventListener('click',()=>{
        thumbnailImages.forEach(thumbnail=>{
            thumbnail.classList.remove('thumbnail__current');
        })
        thumbnail.classList.toggle('thumbnail__current')
        let thumbnailId =  thumbnail.id.split('')
        thumbnailId = thumbnailId.filter(item=>{
            return parseInt(item);
        })
        thumbnailId = parseInt(thumbnailId.join(''));
        
        let size = productImages[0].clientWidth;
        imageSlider.style.transform = `translateX(${-size*thumbnailId}px)`;
    })
})



/* Overlay On and off section */

overlay();

function overlay() {
    const overlay = document.querySelector('.product--overlay');
    const closeOverlayBtn = document.querySelector('.product--overlay #close-btn');
    
    closeOverlayBtn.addEventListener('click',()=>{
        overlay.classList.add('product--overlay--hidden');
})

const productImage = document.querySelector('.product--main .product__image-container');

if (window.screen.width > 768){
    productImage.addEventListener('click',()=>{
        overlay.classList.remove('product--overlay--hidden');
    })
}}


/* Overlay Image Section */

const overlayThumbnails = document.querySelectorAll(".product--overlay .thumbnail")

overlayImageChanger()

function overlayImageChanger() {
    const productImages = document.querySelectorAll('.product--overlay .image-slider img');
    const imageSlider = document.querySelector('.product--overlay .image-slider')
    const prevBtn = document.querySelector('#prev-btn--overlay');
    const nextBtn = document.querySelector('#next-btn--overlay');


    let counter=1;
    let imageId=1;
    let size = 450;

    imageSlider.style.transform = `translateX(${-size*counter}px)`;

    nextBtn.addEventListener('click',()=>{
        if(counter>productImages.length-2) return;
        imageSlider.style.transition = 'transform 0.4s ease-in-out';
        counter++;
        imageSlider.style.transform = `translateX(${-size*counter}px)`;
        assignCurrentThumbnail();
    })
    
    prevBtn.addEventListener('click', ()=>{
        if(counter<1) return;
        imageSlider.style.transition = 'transform 0.4s ease-in-out';
        counter--;
        imageSlider.style.transform = `translateX(${-size*counter}px)`;
        assignCurrentThumbnail();
    })
    
    imageSlider.addEventListener('transitionend',()=>{
        let imageId = productImages[counter].id
        if(imageId === 'last-clone'){
            imageSlider.style.transition = 'none';
            counter = productImages.length-2;
            assignCurrentThumbnail();
            imageSlider.style.transform = `translateX(${-size*counter}px)`;
        }
        if(imageId === 'first-clone'){
            imageSlider.style.transition = 'none';
            counter = 1;
            assignCurrentThumbnail();
            imageSlider.style.transform = `translateX(${-size*counter}px)`;
        }
    })

    function assignCurrentThumbnail(){
        overlayThumbnails.forEach(thumbnail=>{
            thumbnail.classList.remove('thumbnail__current');
            if (thumbnail.id === `thumbnail-overlay-${counter}`){
             thumbnail.classList.add('thumbnail__current');
            }     
        })
    }
    
    
    
    /* For Thumbnail image change */

    
    
    overlayThumbnails.forEach(thumbnail =>{
        thumbnail.addEventListener('click',()=>{
            overlayThumbnails.forEach(thumbnail=>{
                thumbnail.classList.remove('thumbnail__current');
            })
            thumbnail.classList.add('thumbnail__current')
            let thumbnailId =  thumbnail.id.split('')
            thumbnailId = thumbnailId.filter(item=>{
                return parseInt(item);
            })
            thumbnailId = parseInt(thumbnailId.join(''));
            
            let size = productImages[0].clientWidth;
            imageSlider.style.transform = `translateX(${-size*thumbnailId}px)`;
            imageSlider.style.transition = 'none';
            counter = thumbnailId;
        })
    })


}



/* Mobile Navbar */

const navToggler = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links')

navToggler.addEventListener('click',()=>{
    counter = imageId;
    navToggler.classList.toggle('nav__burger--close');
    navLinks.classList.toggle('nav__links--expanded');
})




/* User Cart */

const userCartIcon = document.querySelector('.user__cart-icon');
const productCart = document.querySelector('.product--cart');

if (window.innerWidth>768){
        userCartIcon.addEventListener('mouseover', showcart);
        userCartIcon.addEventListener('mouseout', hidecart)
        
        productCart.addEventListener('mouseover', showcart);
        productCart.addEventListener('mouseout', hidecart);
        
        
        
        function showcart(){
            productCart.classList.remove('product--cart--hidden');
        }
        
        function hidecart(){
            productCart.classList.add('product--cart--hidden')
        }
    }
    
if(window.innerWidth<768){
    userCartIcon.addEventListener('click',()=>{
        productCart.classList.toggle('product--cart--hidden')
    })
}



/* Quantity Selector */

const quantityMinus = document.querySelector('.icon--minus')
const quantityPlus = document.querySelector('.icon--plus')
const productQuantityMain = document.querySelector('.product__quantity')

let quantity = 1;

quantityMinus.addEventListener('click', removeQuantity)
quantityPlus.addEventListener('click', addQuantity)

function removeQuantity(){
    if(quantity>1){
        quantity--;
        productQuantityMain.textContent = `${quantity}`;
    }
}
function addQuantity(){
        quantity++;
        productQuantityMain.textContent = `${quantity}`;
}



/* Add to cart section */

const addToCartBtn = document.querySelector('.btn--cart');
const cartProducts = document.querySelector('.cart__products');
const userCart = document.querySelector('.product--cart')

let totalCartProducts = 0
let quantities = [null,null,null];
let childrenId;

addToCartBtn.addEventListener('click',()=>{
    const productName = document.querySelector('.product__title');
    const productPrice = document.querySelector('.product__discounted-price');
    const productQuantity = document.querySelector('.product__quantity');
    let productTotal = parseInt(productPrice.textContent)*parseInt(productQuantity.textContent);
    userCart.classList.remove('product--cart--empty')

    let latestProductQuantity;
    let latestProductTotal;
    
    if(totalCartProducts > 0 && cartProducts.outerHTML.includes(productName.textContent)){ 
        cartProducts.childNodes.forEach((children,index)=>{
            if (children.outerHTML === undefined) return;
            else if (children.outerHTML.includes(`${productName.textContent}`)) {
                    latestProductQuantity = quantities[index] + parseInt(productQuantity.textContent)
                    latestProductTotal = parseInt(productPrice.textContent)*latestProductQuantity;
                    quantities[index] = latestProductQuantity;
                    childrenId = children.id;
                    children.outerHTML = `<div class='cart__product-display' id='${childrenId}'>
                    <div class="thumbnail-and-product">
                    <div class="icon-container cart__product-thumbnail">
                        <img src="./images/image-product-1-thumbnail.webp" alt="" />
                    </div>
                    <div class="cart__product-info">
                        <p class="cart__product-title">${productName.textContent}</p>
                        <span class="price cart__product-price">${productPrice.textContent}</span> x
                        <span class="cart__product-quantity">${latestProductQuantity}</span>
                        <span class="price cart__product-total">${latestProductTotal}</span>
                    </div>
                    </div>
                    <div class="cart__delete-icon">
                    <img src="./images/icon-delete.svg" alt="">
                    </div>
                    </div>`
            }
            
        })
    }
    
    
    else 
        {
            totalCartProducts++;
            const product = document.createElement('div');
            product.innerHTML = `
            <div class="thumbnail-and-product">
            <div class="icon-container cart__product-thumbnail">
                <img src="./images/image-product-1-thumbnail.webp" alt="" />
            </div>
            <div class="cart__product-info">
                <p class="cart__product-title">${productName.textContent}</p>
                <span class="price cart__product-price">${productPrice.textContent}</span> x
                <span class="cart__product-quantity">${productQuantity.textContent}</span>
                <span class="price cart__product-total">${productTotal}</span>
            </div>
            </div>
            <div class="cart__delete-icon">
            <img src="./images/icon-delete.svg" alt="">
            </div>`
            product.classList.add('cart__product-display');
            product.id = `cart-product${totalCartProducts}`
            cartProducts.appendChild(product);

            /* Data storage */

            quantities.push(parseInt(productQuantity.textContent));
        }
        productQuantity.textContent = '1';
        quantity = 1;
})


/* Cart product delete button */

productCart.addEventListener('click', (e)=>{
    let element = e.target;
    element = element.parentElement;
    if (element.classList.contains('cart__delete-icon') && totalCartProducts === 1) {productCart.classList.add('product--cart--empty');
    let number = childrenId.split('');
    number = number.filter(item=>parseInt(item));
    number = number.join('');
    number = parseInt(number);
    quantities.splice(number+2,1);

}
    else if (element.classList.contains('cart__delete-icon')){
        let deleteElement = element.parentElement;
        cartProducts.removeChild(deleteElement);
        totalCartProducts--;
    }
})





