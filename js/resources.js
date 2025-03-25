class ResourceManager {
    constructor() {
      this.allResources = []; 
      this.filteredResources = []; 
    }
  
    async fetchResources() {
      try {
        const response = await fetch('http://localhost:5000/api/resources');
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        this.allResources = await response.json();
        this.filteredResources = this.allResources;
        this.displayResources();
      } catch (error) {
        console.error('Error fetching resources:', error);
        this.showError('Failed to load resources. Please try again later.');
      }
    }
  
    displayResources() {
      const grid = document.querySelector('.equipment-grid');
      if (!grid) return;
  
      grid.innerHTML = this.filteredResources.map(resource => `
        <div class="equipment-card">
          <img src="${resource.image}" alt="${resource.title}" />
          <div class="card-content">
            <div class="card-header">
              <h3>${resource.title}</h3>
              <div class="rating">${'★'.repeat(resource.rating)}</div>
            </div>
            <div class="card-footer">
              <div class="price">${resource.price}</div>
              <button class="add-to-cart">
                Add to cart <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  
    filterResources({ searchQuery = '', category = '' } = {}) {
      const query = searchQuery.toLowerCase();
      this.filteredResources = this.allResources.filter(resource => {
        const matchesQuery = resource.title.toLowerCase().includes(query) ||
                             (resource.description && resource.description.toLowerCase().includes(query));
        const matchesCategory = category ? resource.category === category : true;
        return matchesQuery && matchesCategory;
      });
      this.displayResources();
    }
  
    showError(message) {
      const grid = document.querySelector('.equipment-grid');
      if (grid) {
        grid.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
          </div>
        `;
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    window.resourceManager = new ResourceManager();
    resourceManager.fetchResources();
  
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
  
    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        resourceManager.filterResources({ searchQuery: query });
      });
  
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim();
          resourceManager.filterResources({ searchQuery: query });
        }
      });
    }
  
    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns) {
      categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          categoryBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const category = btn.textContent.trim();
          if (searchInput) searchInput.value = '';
          resourceManager.filterResources({ category });
        });
      });
    }
  });
  