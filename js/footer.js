// Function to initialize footer functionality
function initFooter() {
  // Update copyright year
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.querySelector('.footer-bottom p');
  if (copyrightElement) {
    copyrightElement.innerHTML = `&copy; ${currentYear} FARMSPHERE. All rights reserved.`;
  }

  // Initialize social media links
  const socialLinks = document.querySelectorAll('.social-links a');
  socialLinks.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

// If the footer is loaded directly (not as a component)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFooter);
} else {
  initFooter();
}

// Load footer component
document.addEventListener('DOMContentLoaded', function () {
  // Load footer HTML
  fetch('../Components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
      initFooter(); // Initialize footer after loading
    })
    .catch(error => console.error('Error loading footer:', error));
});
