
document.addEventListener('DOMContentLoaded', function() {
  // Tab Switching
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Hide all tab contents
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Show the corresponding tab content
          const targetTabId = `${tab.dataset.tab}-content`;
          document.getElementById(targetTabId).classList.add('active');
      });
  });
  
  // Vote Button Animation
  const voteButtons = document.querySelectorAll('.vote-btn');
  voteButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Add animation class
          this.classList.add('pulse-animation');
          
          // Increment vote count
          const voteCountElement = this.nextElementSibling;
          let voteCount = parseInt(voteCountElement.textContent);
          voteCountElement.textContent = voteCount + 1;
          
          // Show a tooltip or notification
          showToast('Vote recorded!');
          
          // Remove animation class after animation completes
          setTimeout(() => {
              this.classList.remove('pulse-animation');
          }, 300);
      });
  });
  
  // Answer Button Click
  const answerButtons = document.querySelectorAll('.answer-btn');
  answerButtons.forEach(button => {
      button.addEventListener('click', function() {
          // In a real application, this would open a modal or redirect to an answer form
          showToast('Answer form would open here');
          
          // For demonstration, we'll scroll to the newsletter section
          const newsletterSection = document.querySelector('.newsletter-section');
          newsletterSection.scrollIntoView({ behavior: 'smooth' });
      });
  });
  
  // Share Button Click
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(button => {
      button.addEventListener('click', function() {
          // In a real application, this would open sharing options
          showToast('Sharing options would appear here');
      });
  });
  
  // Question Title Click
  const questionTitles = document.querySelectorAll('.question-title');
  questionTitles.forEach(title => {
      title.addEventListener('click', function() {
          // In a real application, this would navigate to the question detail page
          showToast('Navigating to question details...');
          
          // For demonstration, we'll add a loading effect
          title.style.opacity = '0.7';
          setTimeout(() => {
              title.style.opacity = '1';
              // Instead of navigation, we'll just show a message
              showToast('This would navigate to the question detail page');
          }, 500);
      });
  });
  
  // Ask Question Button
  const askQuestionBtn = document.querySelector('.sidebar .btn-primary');
  askQuestionBtn.addEventListener('click', function() {
      showToast('Ask a question form would open here');
  });
  
  // View Guidelines Button
  const guidelinesBtn = document.querySelector('.sidebar .btn-outline');
  guidelinesBtn.addEventListener('click', function() {
      showToast('Community guidelines would open here');
  });
  
  // Newsletter Subscription
  const newsletterForm = document.querySelector('.newsletter-form');
  newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email === '') {
          showToast('Please enter your email address', 'error');
          return;
      }
      
      if (!isValidEmail(email)) {
          showToast('Please enter a valid email address', 'error');
          return;
      }
      
      // In a real application, this would submit the form to a server
      showToast('Thank you for subscribing!', 'success');
      emailInput.value = '';
  });
  
  // Pagination Buttons
  const pageButtons = document.querySelectorAll('.page-btn');
  pageButtons.forEach(button => {
      button.addEventListener('click', function() {
          if (this.classList.contains('active') || this.textContent === '...') {
              return;
          }
          
          pageButtons.forEach(btn => btn.classList.remove('active'));
          
          // Don't add active class to arrow buttons
          if (!this.querySelector('i')) {
              this.classList.add('active');
          }
          
          showToast(`Navigating to page ${this.textContent}`);
      });
  });
  
  // Search Input
  const searchInput = document.querySelector('.search-container input');
  searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
          const searchTerm = this.value.trim();
          if (searchTerm !== '') {
              showToast(`Searching for: ${searchTerm}`);
              // In a real application, this would perform a search
          }
      }
  });
  
  // Filter and Sort Buttons
  const filterBtn = document.querySelector('.filter-btn');
  const sortBtn = document.querySelector('.sort-btn');
  
  filterBtn.addEventListener('click', function() {
      showToast('Filter options would appear here');
  });
  
  sortBtn.addEventListener('click', function() {
      showToast('Sort options would appear here');
  });
  
  // Tags Click
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
      tag.addEventListener('click', function() {
          showToast(`Filtering by tag: ${this.textContent}`);
      });
  });
  
  // Helper Functions
  function showToast(message, type = 'info') {
      // Create toast element
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      
      // Append to body
      document.body.appendChild(toast);
      
      // Add visible class to trigger animation
      setTimeout(() => {
          toast.classList.add('visible');
      }, 10);
      
      // Remove toast after 3 seconds
      setTimeout(() => {
          toast.classList.remove('visible');
          setTimeout(() => {
              document.body.removeChild(toast);
          }, 300);
      }, 3000);
  }
  
  function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
  
  // Add toast styling
  const toastStyle = document.createElement('style');
  toastStyle.textContent = `
      .toast {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #333;
          color: white;
          padding: 12px 20px;
          border-radius: 4px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      .toast.visible {
          opacity: 1;
          transform: translateY(0);
      }
      
      .toast-info {
          background-color: #2b7a1f;
      }
      
      .toast-success {
          background-color: #28a745;
      }
      
      .toast-error {
          background-color: #dc3545;
      }
      
      .pulse-animation {
          animation: pulse 0.3s ease;
      }
  `;
  document.head.appendChild(toastStyle);
  
  // Create some initial animations
  const questionCards = document.querySelectorAll('.question-card');
  questionCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
          card.style.transition = 'all 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
      }, 100 + (index * 150));
  });
});
