// Load navbar component
document.addEventListener('DOMContentLoaded', function () {
  // Load navbar HTML
  fetch('../Components/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;

      // Set active state based on current page
      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll('.nav-links a');

      // Set active state based on current page
      navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath.includes(linkPath)) {
          link.classList.add('active');
        }
      });

      // Mobile menu toggle
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const navMenu = document.querySelector('.nav-menu');
      const navButtons = document.querySelector('.nav-buttons');

      if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
          navMenu.classList.toggle('active');
          navButtons.classList.toggle('active');
        });
      }
    })
    .catch(error => console.error('Error loading navbar:', error));
});
