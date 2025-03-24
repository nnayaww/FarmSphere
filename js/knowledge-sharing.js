// Knowledge Sharing Page JavaScript

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Initialize search functionality
    initSearch();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize discussion functionality
    initDiscussion();
});

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('knowledge-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce(function (e) {
        const searchTerm = e.target.value.toLowerCase();
        filterContent(searchTerm);
    }, 300));
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Filter content based on search term
function filterContent(searchTerm) {
    const discussions = document.querySelectorAll('.discussion-item');
    const topics = document.querySelectorAll('.topic-item');

    // Filter discussions
    discussions.forEach(discussion => {
        const title = discussion.querySelector('h3').textContent.toLowerCase();
        const content = discussion.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            discussion.style.display = 'flex';
        } else {
            discussion.style.display = 'none';
        }
    });

    // Filter topics
    topics.forEach(topic => {
        const topicText = topic.textContent.toLowerCase();
        if (topicText.includes(searchTerm)) {
            topic.style.display = 'flex';
        } else {
            topic.style.display = 'none';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Discussion functionality
function initDiscussion() {
    const startDiscussionBtn = document.querySelector('.start-discussion-btn');
    if (!startDiscussionBtn) return;

    startDiscussionBtn.addEventListener('click', function () {
        // Check if user is logged in
        if (!isUserLoggedIn()) {
            showLoginPrompt();
            return;
        }

        // Redirect to new discussion page or show modal
        window.location.href = 'new-discussion.html';
    });
}

// Check if user is logged in
function isUserLoggedIn() {
    // This should be replaced with actual authentication check
    return localStorage.getItem('userToken') !== null;
}

// Show login prompt
function showLoginPrompt() {
    // Create and show a modal or notification
    const modal = document.createElement('div');
    modal.className = 'login-prompt-modal';
    modal.innerHTML = `
        <div class="login-prompt-content">
            <h3>Please Log In</h3>
            <p>You need to be logged in to start a discussion.</p>
            <div class="login-prompt-buttons">
                <a href="login.html" class="btn-primary">Log In</a>
                <a href="signup.html" class="btn-outline">Sign Up</a>
                <button class="btn-text" onclick="this.closest('.login-prompt-modal').remove()">Cancel</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .login-prompt-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .login-prompt-content {
            background-color: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            text-align: center;
        }
        
        .login-prompt-content h3 {
            font-family: 'Montagu Slab', serif;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--text-color);
        }
        
        .login-prompt-content p {
            color: var(--text-muted);
            margin-bottom: 1.5rem;
        }
        
        .login-prompt-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .btn-primary {
            background-color: var(--primary-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 50px;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }
        
        .btn-primary:hover {
            background-color: var(--primary-dark);
        }
        
        .btn-outline {
            border: 2px solid var(--primary-color);
            color: var(--primary-color);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .btn-outline:hover {
            background-color: var(--primary-color);
            color: white;
        }
        
        .btn-text {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            padding: 0.5rem 1rem;
            transition: color 0.3s ease;
        }
        
        .btn-text:hover {
            color: var(--text-color);
        }
    `;

    document.head.appendChild(style);
}

// Handle discussion item clicks
document.querySelectorAll('.discussion-item').forEach(item => {
    item.addEventListener('click', function (e) {
        // Don't trigger if clicking on meta information
        if (e.target.closest('.discussion-meta')) return;

        // Get discussion ID from data attribute or generate one
        const discussionId = this.dataset.id || 'discussion-' + Math.random().toString(36).substr(2, 9);

        // Redirect to discussion detail page
        window.location.href = `discussion.html?id=${discussionId}`;
    });
});

// Handle topic item clicks
document.querySelectorAll('.topic-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const topic = this.querySelector('span').textContent;
        filterContent(topic);
    });
});
