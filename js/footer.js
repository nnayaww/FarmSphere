
// Function to initialize footer functionality
function initFooter() {
    // Update the current year in the footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
    
    // Add any other footer functionality here
    
    // Initialize social media links if needed
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Prevent default if links aren't configured yet
        if (link.getAttribute('href') === '#') {
          e.preventDefault();
          console.log('Social media link clicked');
        }
      });
    });
  }
  
  // If the footer is loaded directly (not as a component)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }
  