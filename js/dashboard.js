document.addEventListener('DOMContentLoaded', function() {
  // Retrieve user data from localStorage
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);

    // Update the profile name in the navigation bar
    const userProfileName = document.querySelector('.user-profile span');
    if (userProfileName && user.username) {
      userProfileName.textContent = user.username;
    }

    // Update the welcome header with the user's name (using first name if available)
    const welcomeHeader = document.querySelector('.dashboard-welcome h1');
    if (welcomeHeader && user.username) {
      // If the username is a full name, you might want to display just the first name.
      const firstName = user.username.split(' ')[0];
      welcomeHeader.textContent = `Welcome back, ${firstName}!`;
    }
  }

  // User profile dropdown - can be expanded with actual dropdown menu
  const userProfile = document.querySelector('.user-profile');
  if (userProfile) {
    userProfile.addEventListener('click', function() {
      // Toggle a dropdown menu for user options (placeholder)
      console.log('User profile clicked');
    });
  }

  // Mobile menu functionality (from main.js)
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
