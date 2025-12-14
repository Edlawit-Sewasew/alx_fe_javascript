// Main quotes array
let quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        category: "Motivation",
        author: "Steve Jobs",
        id: 1
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        category: "Life",
        author: "John Lennon",
        id: 2
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        category: "Inspiration",
        author: "Eleanor Roosevelt",
        id: 3
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        category: "Wisdom",
        author: "Aristotle",
        id: 4
    },
    {
        text: "Whoever is happy will make others happy too.",
        category: "Happiness",
        author: "Anne Frank",
        id: 5
    },
    {
        text: "In the middle of difficulty lies opportunity.",
        category: "Perseverance",
        author: "Albert Einstein",
        id: 6
    },
    {
        text: "The journey of a thousand miles begins with one step.",
        category: "Motivation",
        author: "Lao Tzu",
        id: 7
    },
    {
        text: "Be yourself; everyone else is already taken.",
        category: "Individuality",
        author: "Oscar Wilde",
        id: 8
    }
];

// State variables
let currentCategory = 'all';
let recentQuotes = [];
let quoteIdCounter = quotes.length + 1;

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');
const addQuoteSection = document.getElementById('addQuoteSection');
const toggleFormBtn = document.getElementById('toggleFormBtn');
const quoteForm = document.getElementById('quoteForm');
const quotesList = document.getElementById('quotesList');
const statsDisplay = document.getElementById('statsDisplay');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Display first quote
    showRandomQuote();
    
    // Generate category filter buttons
    generateCategoryButtons();
    
    // Update statistics
    updateStatistics();
    
    // Set up event listeners
    setupEventListeners();
}

// Step 2: Advanced DOM Manipulation Functions

function showRandomQuote() {
    // Filter quotes based on current category
    const filteredQuotes = currentCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === currentCategory);
    
    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = `
            <div class="quote-text">
                No quotes available for this category. Add one!
            </div>
            <span class="quote-category">${currentCategory}</span>
        `;
        return;
    }
    
    // Get random quote
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    
    // Add to recent quotes
    addToRecentQuotes(quote);
    
    // Create and display quote with advanced DOM manipulation
    displayQuote(quote);
    
    // Update recent quotes list
    updateRecentQuotesList();
}

function displayQuote(quote) {
    // Clear current display
    quoteDisplay.innerHTML = '';
    
    // Create quote text element
    const quoteText = document.createElement('div');
    quoteText.className = 'quote-text';
    quoteText.textContent = `"${quote.text}"`;
    
    // Create author element
    const authorElement = document.createElement('div');
    authorElement.className = 'quote-author';
    authorElement.textContent = quote.author ? `— ${quote.author}` : '— Unknown';
    authorElement.style.marginTop = '15px';
    authorElement.style.color = '#666';
    authorElement.style.fontWeight = '500';
    
    // Create category badge
    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'quote-category';
    categoryBadge.textContent = quote.category;
    
    // Append elements
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(authorElement);
    quoteDisplay.appendChild(categoryBadge);
    
    // Add animation
    quoteDisplay.style.animation = 'none';
    setTimeout(() => {
        quoteDisplay.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

function generateCategoryButtons() {
    // Clear existing buttons
    categoryFilter.innerHTML = '<h3>Filter by Category</h3><div class="category-buttons"></div>';
    const buttonsContainer = categoryFilter.querySelector('.category-buttons');
    
    // Create 'All' button
    const allButton = document.createElement('button');
    allButton.className = `category-btn ${currentCategory === 'all' ? 'active' : ''}`;
    allButton.textContent = 'All';
    allButton.dataset.category = 'all';
    allButton.onclick = () => filterByCategory('all');
    buttonsContainer.appendChild(allButton);
    
    // Get unique categories
    const categories = [...new Set(quotes.map(quote => quote.category))];
    
    // Create category buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = `category-btn ${currentCategory === category ? 'active' : ''}`;
        button.textContent = category;
        button.dataset.category = category;
        button.onclick = () => filterByCategory(category);
        buttonsContainer.appendChild(button);
    });
    
    // Add 'Create New Category' button
    const newCategoryBtn = document.createElement('button');
    newCategoryBtn.className = 'category-btn';
    newCategoryBtn.textContent = '+ New Category';
    newCategoryBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
    newCategoryBtn.style.color = 'white';
    newCategoryBtn.onclick = createAddCategoryForm;
    buttonsContainer.appendChild(newCategoryBtn);
}

function filterByCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // Show random quote from filtered category
    showRandomQuote();
}

function addToRecentQuotes(quote) {
    // Add quote to beginning of array
    recentQuotes.unshift(quote);
    
    // Keep only last 5 quotes
    if (recentQuotes.length > 5) {
        recentQuotes = recentQuotes.slice(0, 5);
    }
}

function updateRecentQuotesList() {
    quotesList.innerHTML = '<h4>Recent Quotes:</h4>';
    
    if (recentQuotes.length === 0) {
        quotesList.innerHTML += '<p>No recent quotes yet.</p>';
        return;
    }
    
    recentQuotes.forEach(quote => {
        const quoteItem = document.createElement('div');
        quoteItem.className = 'quote-item';
        quoteItem.innerHTML = `
            <p>"${quote.text}"</p>
            <span class="category">${quote.category}</span>
            ${quote.author ? `<span style="margin-left: 10px; color: #666; font-size: 0.9em;">— ${quote.author}</span>` : ''}
        `;
        quotesList.appendChild(quoteItem);
    });
}

function updateStatistics() {
    const totalQuotes = quotes.length;
    const categoriesCount = [...new Set(quotes.map(quote => quote.category))].length;
    const totalAuthors = [...new Set(quotes.filter(q => q.author).map(q => q.author))].length;
    
    statsDisplay.innerHTML = `
        <h3>Statistics</h3>
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-value">${totalQuotes}</div>
                <div class="stat-label">Total Quotes</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${categoriesCount}</div>
                <div class="stat-label">Categories</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${totalAuthors}</div>
                <div class="stat-label">Unique Authors</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${recentQuotes.length}</div>
                <div class="stat-label">Recent Quotes</div>
            </div>
        </div>
    `;
}

// Step 3: Dynamic Quote Addition Functions

function createAddQuoteForm() {
    // Toggle form visibility
    addQuoteSection.classList.toggle('active');
    
    if (addQuoteSection.classList.contains('active')) {
        toggleFormBtn.textContent = 'Hide Form';
        toggleFormBtn.style.background = '#ff9800';
    } else {
        toggleFormBtn.textContent = 'Add New Quote';
        toggleFormBtn.style.background = '#4CAF50';
    }
}

function createAddCategoryForm() {
    // Create modal for new category
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.background = 'white';
    modalContent.style.padding = '30px';
    modalContent.style.borderRadius = '15px';
    modalContent.style.width = '90%';
    modalContent.style.maxWidth = '400px';
    
    modalContent.innerHTML = `
        <h3 style="margin-bottom: 20px; color: #333;">Create New Category</h3>
        <input type="text" id="newCategoryInput" placeholder="Enter category name" 
               style="width: 100%; padding: 12px; margin-bottom: 20px; border: 2px solid #e0e0e0; border-radius: 8px;">
        <div style="display: flex; gap: 10px;">
            <button id="saveCategoryBtn" style="flex: 1; padding: 12px; background: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer;">
                Save Category
            </button>
            <button id="cancelCategoryBtn" style="flex: 1; padding: 12px; background: #f44336; color: white; border: none; border-radius: 8px; cursor: pointer;">
                Cancel
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Focus on input
    setTimeout(() => {
        document.getElementById('newCategoryInput').focus();
    }, 100);
    
    // Event listeners for modal buttons
    document.getElementById('saveCategoryBtn').onclick = () => {
        const newCategory = document.getElementById('newCategoryInput').value.trim();
        if (newCategory) {
            // Add a sample quote for the new category
            const newQuote = {
                text: `Welcome to the ${newCategory} category! Add your first quote.`,
                category: newCategory,
                author: 'System',
                id: quoteIdCounter++
            };
            quotes.push(newQuote);
            
            // Regenerate category buttons
            generateCategoryButtons();
            
            // Switch to new category
            filterByCategory(newCategory);
            
            // Update statistics
            updateStatistics();
            
            // Remove modal
            document.body.removeChild(modal);
        }
    };
    
    document.getElementById('cancelCategoryBtn').onclick = () => {
        document.body.removeChild(modal);
    };
    
    // Close modal on outside click
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

function addQuote(event) {
    if (event) event.preventDefault();
    
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const category = document.getElementById('newQuoteCategory').value.trim();
    const author = document.getElementById('authorInput').value.trim();
    
    if (!quoteText || !category) {
        alert('Please fill in both quote text and category!');
        return;
    }
    
    // Create new quote object
    const newQuote = {
        text: quoteText,
        category: category,
        author: author || 'Anonymous',
        id: quoteIdCounter++
    };
    
    // Add to quotes array
    quotes.push(newQuote);
    
    // Clear form
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    document.getElementById('authorInput').value = '';
    
    // Add to recent quotes
    addToRecentQuotes(newQuote);
    
    // Update UI
    updateRecentQuotesList();
    generateCategoryButtons(); // Regenerate in case new category was added
    updateStatistics();
    
    // Show confirmation
    showNotification('Quote added successfully!');
    
    // Switch to new quote's category and display it
    filterByCategory(category);
}

function setupEventListeners() {
    // New Quote button
    newQuoteBtn.addEventListener('click', showRandomQuote);
    
    // Toggle form button
    toggleFormBtn.addEventListener('click', createAddQuoteForm);
    
    // Form submission
    quoteForm.addEventListener('submit', addQuote);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' && e.ctrlKey) {
            e.preventDefault();
            showRandomQuote();
        }
        if (e.key === 'a' && e.ctrlKey) {
            e.preventDefault();
            createAddQuoteForm();
        }
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1001';
    notification.style.animation = 'fadeIn 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showRandomQuote,
        filterByCategory,
        addQuote,
        quotes
    };
}