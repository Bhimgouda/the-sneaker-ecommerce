



/* Mobile Navbar */

const navToggler = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links')

navToggler.addEventListener('click',()=>{
    navToggler.classList.toggle('nav__burger--close');
    navLinks.classList.toggle('nav__links--expanded');
})







