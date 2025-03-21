// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // User profile dropdown - can be expanded with actual dropdown menu
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
      userProfile.addEventListener('click', function() {
        // Toggle a dropdown menu for user options
        console.log('User profile clicked');
        // Placeholder for actual dropdown implementation
      });
    }
    
    // Mobile menu functionality - reusing from main.js
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
      mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
      });
      
      mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    }
  });
  