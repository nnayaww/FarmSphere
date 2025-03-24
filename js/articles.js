// Article management functionality
class ArticleManager {
    constructor() {
        this.articles = [];
        this.currentPage = 1;
        this.articlesPerPage = 6;
    }

    // Fetch articles from the server
    async fetchArticles() {
        try {
            // TODO: Replace with actual API endpoint
            const response = await fetch('/api/articles');
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            this.articles = await response.json();
            this.displayArticles();
        } catch (error) {
            console.error('Error fetching articles:', error);
            this.showError('Failed to load articles. Please try again later.');
        }
    }

    // Display articles on the page
    displayArticles() {
        const container = document.querySelector('.articles-grid');
        if (!container) return;

        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToShow = this.articles.slice(startIndex, endIndex);

        container.innerHTML = articlesToShow.map(article => `
            <article class="article-card">
                <img src="${article.image}" alt="${article.title}" class="article-image">
                <div class="article-content">
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <div class="article-meta">
                        <span class="article-date">${new Date(article.date).toLocaleDateString()}</span>
                        <span class="article-category">${article.category}</span>
                    </div>
                    <a href="/article/${article.id}" class="read-more">Read More</a>
                </div>
            </article>
        `).join('');

        this.updatePagination();
    }

    // Update pagination controls
    updatePagination() {
        const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        pagination.innerHTML = `
            <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
                    onclick="articleManager.changePage(${this.currentPage - 1})">
                Previous
            </button>
            <span class="page-info">Page ${this.currentPage} of ${totalPages}</span>
            <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="articleManager.changePage(${this.currentPage + 1})">
                Next
            </button>
        `;
    }

    // Change current page
    changePage(page) {
        this.currentPage = page;
        this.displayArticles();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Show error message
    showError(message) {
        const container = document.querySelector('.articles-grid');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// Initialize article manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.articleManager = new ArticleManager();
    articleManager.fetchArticles();
});
