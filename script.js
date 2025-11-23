const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-nav-bar');
mobileMenuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileMenu.style.display = 
        mobileMenu.style.display === "flex" ? "none" : "flex";
});
document.addEventListener('click', (e) => {
    if (e.target !== mobileMenuBtn) {
        mobileMenu.style.display = "none";
    }
});