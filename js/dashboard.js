document.addEventListener('DOMContentLoaded', function () {
  // Get Firebase auth instance
  const auth = firebase.auth();

  // Check if user is logged in
  auth.onAuthStateChanged(function (user) {
    if (user) {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('userData')) || {};

      // Update UI with user data
      const userName = document.querySelector('.user-name');
      const userFullName = document.querySelector('.user-full-name');
      const userEmail = document.querySelector('.user-email');
      const profileImg = document.querySelector('.profile-img');
      const dropdownProfileImg = document.querySelector('.dropdown-profile-img');

      if (userName) userName.textContent = userData.displayName || user.displayName || 'User';
      if (userFullName) userFullName.textContent = userData.displayName || user.displayName || 'User';
      if (userEmail) userEmail.textContent = userData.email || user.email;
      if (profileImg) profileImg.src = user.photoURL || '../images/profile-placeholder.svg';
      if (dropdownProfileImg) dropdownProfileImg.src = user.photoURL || '../images/profile-placeholder.svg';

      // Update welcome message
      const welcomeMessage = document.querySelector('.welcome-message');
      if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${userData.firstName || user.displayName?.split(' ')[0] || 'Farmer'}!`;
      }
    } else {
      // User is signed out, redirect to login
      window.location.href = 'login.html';
    }
  });

  // Theme toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.toggle('dark-mode');
      const icon = this.querySelector('i');

      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
      } else {
        localStorage.setItem('theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
      }
    });
  }

  // Handle logout
  const logoutBtn = document.querySelector('.logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      auth.signOut()
        .then(() => {
          localStorage.removeItem('userData'); // Clear user data on logout
          window.location.href = 'login.html';
        })
        .catch((error) => {
          console.error('Error signing out:', error);
        });
    });
  }

  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
    mobileMenuToggle.addEventListener('click', function () {
      mobileMenu.classList.add('active');
    });

    mobileMenuClose.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
    });
  }
});
