// FoodPick App JavaScript

// Global State
let currentPage = 'home';
let cart = [];
let menuItems = [];
let categories = [];
let selectedCategory = null;
let currentUser = null;
let editingAddress = null;
let customizeItem = null;
let isLocationModalOpen = false;

// Storage Keys
const STORAGE_KEYS = {
    MENU: 'fp_menu',
    ORDERS: 'fp_orders',
    COUPONS: 'fp_coupons',
    ADDRESSES: 'fp_addresses',
    USER: 'fp_user',
    META: 'fp_meta',
    UI: 'fp_ui',
    CART: 'fp_cart',
    SELECTED_ADDRESS: 'fp_selected_address'
};

// Delivery Zones
const DELIVERY_ZONES = {
    A: { 
        fee: 500, 
        areas: ['Enerhen', 'PTI Rd', 'Effurun', 'Airport Rd']
    },
    B: { 
        fee: 800, 
        areas: ['Udu Rd', 'DSC', 'Ovwian', 'Okuokoko']
    },
    C: { 
        fee: 1200, 
        areas: ['Ekpan', 'Jeddo', 'Ugborikoko', 'Jakpa']
    }
};

const FREE_DELIVERY_THRESHOLD = 20000;

// Utility Functions
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
}

function setToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

function calculateDeliveryFee(zone, orderTotal) {
    if (orderTotal >= FREE_DELIVERY_THRESHOLD) {
        return 0;
    }
    return DELIVERY_ZONES[zone].fee;
}

function getDeliveryFee(zone) {
    return DELIVERY_ZONES[zone]?.fee || 500;
}

function getZoneFromArea(area) {
    for (const [zone, data] of Object.entries(DELIVERY_ZONES)) {
        if (data.areas.some(a => a.toLowerCase().includes(area.toLowerCase()))) {
            return zone;
        }
    }
    return 'A'; // Default to zone A
}

function formatCurrency(amount) {
    return `₦${amount.toLocaleString()}`;
}

// Get delivery fee based on zone
function getDeliveryFee(zone) {
    const deliveryFees = {
        'A': 500,
        'B': 800,
        'C': 1200
    };
    return deliveryFees[zone] || 500;
}

// Get zone name for display
function getZoneName(zone) {
    const zoneNames = {
        'A': 'Zone A',
        'B': 'Zone B', 
        'C': 'Zone C'
    };
    return zoneNames[zone] || 'Zone A';
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconMap = {
        success: 'check-circle',
        error: 'x-circle',
        warning: 'alert-circle',
        info: 'info'
    };
    
    toast.innerHTML = `
        <i data-lucide="${iconMap[type]}" class="toast-icon"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="hideToast(this)">
            <i data-lucide="x"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    lucide.createIcons();
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        hideToast(toast.querySelector('.toast-close'));
    }, 4000);
}

function hideToast(button) {
    const toast = button.closest('.toast');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
}

// Navigation
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(`${page}Page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
    
    currentPage = page;
    
    // Load page-specific data
    switch (page) {
        case 'menu':
            loadMenuPage();
            break;
        case 'dashboard':
            loadDashboard();
            break;
        case 'home':
            loadHomePage();
            break;
    }
}

// Initialize App
function initApp() {
    // Initialize icons
    lucide.createIcons();
    
    // Load data
    loadInitialData();
    
    // Load home page
    loadHomePage();
    
    // Load cart from storage
    loadCart();
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('FoodPick App initialized successfully!');
}

function loadInitialData() {
    // Check if we need to seed demo data
    let menu = getFromStorage(STORAGE_KEYS.MENU);
    if (!menu || menu.length === 0) {
        seedDemoData();
        menu = getFromStorage(STORAGE_KEYS.MENU);
    }
    
    menuItems = menu || [];
    
    // Extract categories
    categories = [...new Set(menuItems.map(item => item.category))];
    
    // Load user
    currentUser = getFromStorage(STORAGE_KEYS.USER) || {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+234 813 456 7890',
        whatsapp: '+234 813 456 7890',
        role: 'user'
    };
    setToStorage(STORAGE_KEYS.USER, currentUser);
}

function seedDemoData() {
    const now = new Date().toISOString();
    
    // Seed menu items
    const menu = [
        {
            id: '1',
            category: 'Rice & Bowls',
            name: 'Jollof Supreme',
            description: 'Premium jollof rice with grilled chicken, plantain, and coleslaw',
            basePrice: 3500,
            imageUrl: 'https://images.pexels.com/photos/8828574/pexels-photo-8828574.jpeg?auto=compress&cs=tinysrgb&w=400',
            tags: ['popular', 'spicy'],
            rating: 4.8,
            variants: [
                { name: 'Regular', priceDelta: 0 },
                { name: 'Large', priceDelta: 800 }
            ],
            addOns: [
                { name: 'Extra Chicken', price: 800 },
                { name: 'Extra Plantain', price: 500 },
                { name: 'Sausage', price: 400 }
            ],
            available: true
        },
        {
            id: '2',
            category: 'Rice & Bowls',
            name: 'Fried Rice Deluxe',
            description: 'Special fried rice with mixed vegetables, chicken, and prawns',
            basePrice: 3800,
            imageUrl: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400',
            tags: ['popular'],
            rating: 4.7,
            variants: [
                { name: 'Regular', priceDelta: 0 },
                { name: 'Large', priceDelta: 1000 }
            ],
            addOns: [
                { name: 'Extra Chicken', price: 800 },
                { name: 'Extra Prawns', price: 1200 }
            ],
            available: true
        },
        {
            id: '3',
            category: 'Soups & Swallow',
            name: 'Banga Soup',
            description: 'Traditional palm nut soup with assorted meat and fish',
            basePrice: 4500,
            imageUrl: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=400',
            tags: ['traditional', 'spicy'],
            rating: 4.6,
            variants: [
                { name: 'With Pounded Yam', priceDelta: 0 },
                { name: 'With Eba', priceDelta: -500 },
                { name: 'With Starch', priceDelta: 200 }
            ],
            addOns: [
                { name: 'Extra Meat', price: 1000 },
                { name: 'Extra Fish', price: 800 }
            ],
            available: true
        },
        {
            id: '4',
            category: 'Grills & Suya',
            name: 'Chicken Suya Platter',
            description: 'Grilled chicken strips with suya spice, onions, and tomatoes',
            basePrice: 4000,
            imageUrl: 'https://images.pexels.com/photos/10922927/pexels-photo-10922927.jpeg?auto=compress&cs=tinysrgb&w=400',
            tags: ['grilled', 'spicy', 'popular'],
            rating: 4.9,
            variants: [
                { name: 'Half Portion', priceDelta: -1500 },
                { name: 'Full Portion', priceDelta: 0 },
                { name: 'Large Platter', priceDelta: 2000 }
            ],
            addOns: [
                { name: 'Extra Spicy', price: 0 },
                { name: 'Beef Addition', price: 1200 }
            ],
            available: true
        },
        {
            id: '5',
            category: 'Shawarma & Wraps',
            name: 'Chicken Shawarma',
            description: 'Tender chicken in pita bread with vegetables and special sauce',
            basePrice: 3200,
            imageUrl: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400',
            tags: ['popular'],
            rating: 4.5,
            variants: [
                { name: 'Regular', priceDelta: 0 },
                { name: 'Large', priceDelta: 800 }
            ],
            addOns: [
                { name: 'Extra Chicken', price: 600 },
                { name: 'Cheese', price: 300 },
                { name: 'Avocado', price: 400 }
            ],
            available: true
        },
        {
            id: '6',
            category: 'Drinks & Smoothies',
            name: 'Zobo Cooler',
            description: 'Refreshing hibiscus drink with natural fruits and spices',
            basePrice: 800,
            imageUrl: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
            tags: ['healthy', 'refreshing'],
            rating: 4.4,
            variants: [
                { name: 'Small', priceDelta: -200 },
                { name: 'Regular', priceDelta: 0 },
                { name: 'Large', priceDelta: 300 }
            ],
            addOns: [],
            available: true
        }
    ];

    // Seed coupons
    const coupons = [
        {
            id: '1',
            code: 'WELCOME10',
            type: 'percent',
            value: 10,
            minAmount: 2000,
            expiry: '2024-12-31',
            usageLimit: 1,
            active: true,
            description: '10% off for new customers'
        },
        {
            id: '2',
            code: 'LUNCH50',
            type: 'flat',
            value: 500,
            minAmount: 4000,
            expiry: '2024-12-31',
            usageLimit: 5,
            active: true,
            description: '₦500 off orders above ₦4,000'
        },
        {
            id: '3',
            code: 'FREESHIP20K',
            type: 'flat',
            value: 1200,
            minAmount: 20000,
            expiry: '2024-12-31',
            usageLimit: 10,
            active: true,
            description: 'Free delivery on orders ≥ ₦20,000'
        }
    ];

    setToStorage(STORAGE_KEYS.MENU, menu);
    setToStorage(STORAGE_KEYS.COUPONS, coupons);
    setToStorage(STORAGE_KEYS.META, { menuVersion: 1, lastSeedAt: now });
    
    showToast('Demo data loaded successfully!', 'success');
}

// Home Page
function loadHomePage() {
    loadCategories();
}

function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;
    
    const categoryData = [
        {
            name: 'Rice & Bowls',
            image: 'https://images.pexels.com/photos/8828574/pexels-photo-8828574.jpeg?auto=compress&cs=tinysrgb&w=300',
            count: '12+ items',
            items: [
                { name: 'Jollof Supreme', price: '₦3,500', image: 'https://images.pexels.com/photos/8828574/pexels-photo-8828574.jpeg?auto=compress&cs=tinysrgb&w=200' },
                { name: 'Fried Rice Deluxe', price: '₦3,800', image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=200' },
                { name: 'Coconut Rice', price: '₦3,200', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200' }
            ]
        },
        {
            name: 'Soups & Swallow',
            image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=300',
            count: '8+ items',
            items: [
                { name: 'Banga Soup', price: '₦4,500', image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=200' },
                { name: 'Egusi Special', price: '₦4,200', image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg?auto=compress&cs=tinysrgb&w=200' },
                { name: 'Oha Soup', price: '₦4,800', image: 'https://images.pexels.com/photos/6544378/pexels-photo-6544378.jpeg?auto=compress&cs=tinysrgb&w=200' }
            ]
        },
        {
            name: 'Grills & Suya',
            image: 'https://images.pexels.com/photos/10922927/pexels-photo-10922927.jpeg?auto=compress&cs=tinysrgb&w=300',
            count: '15+ items',
            items: [
                { name: 'Chicken Suya Platter', price: '₦4,000', image: 'https://images.pexels.com/photos/10922927/pexels-photo-10922927.jpeg?auto=compress&cs=tinysrgb&w=200' },
                { name: 'Beef Suya', price: '₦3,500', image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=200' },
                { name: 'Fish Pepper Soup', price: '₦3,800', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200' }
            ]
        },
        {
            name: 'Shawarma & Wraps',
            image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=300',
            count: '6+ items',
            items: [
                { name: 'Chicken Shawarma', price: '₦3,200', image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=200' },
                { name: 'Beef Wrap', price: '₦3,500', image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=200' },
                { name: 'Veggie Wrap', price: '₦2,800', image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=200' }
            ]
        }
    ];
    
    categoriesGrid.innerHTML = categoryData.map((category, index) => `
        <div class="category-card" style="animation-delay: ${index * 0.1}s">
            <div class="card" onclick="toggleCategoryDropdown('${category.name}')">
                <div class="category-image">
                    <img src="${category.image}" alt="${category.name}">
                    <div class="category-overlay"></div>
                    <div class="category-info">
                        <div>
                            <div class="category-name">${category.name}</div>
                            <div class="category-count">${category.count}</div>
                        </div>
                        <i data-lucide="chevron-down" class="category-chevron"></i>
                    </div>
                </div>
            </div>
            
            <div class="category-dropdown" id="dropdown-${category.name.replace(/\s+/g, '-').toLowerCase()}">
                <div class="dropdown-header">
                    <h4>Popular in ${category.name}</h4>
                </div>
                <div class="dropdown-items">
                    ${category.items.map((item, itemIndex) => `
                        <div class="dropdown-item" style="animation-delay: ${itemIndex * 0.1}s" onclick="navigateTo('menu')">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="dropdown-item-info">
                                <div class="dropdown-item-name">${item.name}</div>
                                <div class="dropdown-item-price">${item.price}</div>
                            </div>
                            <i data-lucide="arrow-right"></i>
                        </div>
                    `).join('')}
                </div>
                <div class="dropdown-footer">
                    <button onclick="navigateTo('menu')">View All ${category.name} →</button>
                </div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function toggleCategoryDropdown(categoryName) {
    const dropdownId = `dropdown-${categoryName.replace(/\s+/g, '-').toLowerCase()}`;
    const dropdown = document.getElementById(dropdownId);
    
    // Close all other dropdowns
    document.querySelectorAll('.category-dropdown').forEach(d => {
        if (d.id !== dropdownId) {
            d.classList.remove('active');
        }
    });
    
    // Toggle current dropdown
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Menu Page
function loadMenuPage() {
    populateCategoryFilter();
    renderMenuItems(menuItems);
    updateResultsCount(menuItems.length, menuItems.length);
    setupMenuFilters();
}

function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    categoryFilter.innerHTML = `
        <option value="all">All Categories</option>
        ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
    `;
}

function renderMenuItems(items) {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;
    
    if (items.length === 0) {
        menuGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i data-lucide="search" class="empty-state-icon"></i>
                <h3>No items found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
                <button class="btn btn-primary" onclick="clearFilters()">Clear All Filters</button>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    menuGrid.innerHTML = items.map((item, index) => `
        <div class="menu-item" style="animation-delay: ${index * 0.1}s">
            <div class="menu-item-image">
                <img src="${item.imageUrl}" alt="${item.name}">
                ${item.tags.includes('popular') ? '<div class="menu-item-badge">Popular</div>' : ''}
                ${!item.available ? '<div class="menu-item-unavailable">Out of Stock</div>' : ''}
            </div>
            
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <div class="menu-item-rating">
                        <i data-lucide="star"></i>
                        <span>${item.rating}</span>
                    </div>
                </div>
                
                <p class="menu-item-description">${item.description}</p>
                
                <div class="menu-item-footer">
                    <div class="menu-item-price">
                        ${formatCurrency(item.basePrice)}
                        ${item.variants && item.variants.length > 1 ? '<span style="font-size: 0.875rem; color: #6B7280;">+</span>' : ''}
                    </div>
                    
                    <div class="menu-item-tags">
                        ${item.tags.map(tag => `
                            <span class="menu-item-tag tag-${tag === 'spicy' ? 'spicy' : tag === 'vegan' ? 'vegan' : tag === 'popular' ? 'popular' : 'default'}">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="menu-item-actions">
                    <button class="btn btn-primary btn-sm" onclick="quickAddToCart('${item.id}')" ${!item.available ? 'disabled' : ''}>
                        <i data-lucide="plus"></i>
                        Quick Add
                    </button>
                    
                    ${(item.variants || item.addOns) ? `
                        <button class="btn btn-outline btn-sm" onclick="showCustomizeModal('${item.id}')" ${!item.available ? 'disabled' : ''}>
                            Customize
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function setupMenuFilters() {
    const menuSearch = document.getElementById('menuSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    if (menuSearch) {
        menuSearch.addEventListener('input', filterMenuItems);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterMenuItems);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterMenuItems);
    }
    
    if (minPrice && maxPrice) {
        minPrice.addEventListener('input', updatePriceLabels);
        maxPrice.addEventListener('input', updatePriceLabels);
        minPrice.addEventListener('change', filterMenuItems);
        maxPrice.addEventListener('change', filterMenuItems);
    }
}

function filterMenuItems() {
    const searchQuery = document.getElementById('menuSearch')?.value.toLowerCase() || '';
    const selectedCategory = document.getElementById('categoryFilter')?.value || 'all';
    const sortBy = document.getElementById('sortFilter')?.value || 'popular';
    const minPrice = parseInt(document.getElementById('minPrice')?.value || '0');
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value || '10000');
    
    let filtered = menuItems.filter(item => item.available);
    
    // Search filter
    if (searchQuery) {
        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(searchQuery) ||
            item.description.toLowerCase().includes(searchQuery) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );
    }
    
    // Category filter
    if (selectedCategory !== 'all') {
        filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // Price range filter
    filtered = filtered.filter(item => 
        item.basePrice >= minPrice && item.basePrice <= maxPrice
    );
    
    // Sort
    switch (sortBy) {
        case 'popular':
            filtered = filtered.sort((a, b) => {
                const aPopular = a.tags.includes('popular') ? 1 : 0;
                const bPopular = b.tags.includes('popular') ? 1 : 0;
                if (aPopular !== bPopular) return bPopular - aPopular;
                return b.rating - a.rating;
            });
            break;
        case 'price-low':
            filtered = filtered.sort((a, b) => a.basePrice - b.basePrice);
            break;
        case 'price-high':
            filtered = filtered.sort((a, b) => b.basePrice - a.basePrice);
            break;
        case 'rating':
            filtered = filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    renderMenuItems(filtered);
    updateResultsCount(filtered.length, menuItems.filter(item => item.available).length);
}

function updatePriceLabels() {
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const minPriceLabel = document.getElementById('minPriceLabel');
    const maxPriceLabel = document.getElementById('maxPriceLabel');
    
    if (minPrice && minPriceLabel) {
        minPriceLabel.textContent = parseInt(minPrice.value).toLocaleString();
    }
    
    if (maxPrice && maxPriceLabel) {
        maxPriceLabel.textContent = parseInt(maxPrice.value).toLocaleString();
    }
}

function updateResultsCount(showing, total) {
    const resultsText = document.getElementById('resultsText');
    if (resultsText) {
        resultsText.textContent = `Showing ${showing} of ${total} items`;
    }
}

function toggleAdvancedFilters() {
    const advancedFilters = document.getElementById('advancedFilters');
    if (advancedFilters) {
        advancedFilters.classList.toggle('active');
    }
}

function clearFilters() {
    const menuSearch = document.getElementById('menuSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    if (menuSearch) menuSearch.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    if (minPrice) minPrice.value = '0';
    if (maxPrice) maxPrice.value = '10000';
    
    updatePriceLabels();
    filterMenuItems();
}

// Cart Functions
function loadCart() {
    cart = getFromStorage(STORAGE_KEYS.CART) || [];
    updateCartUI();
}

function saveCart() {
    setToStorage(STORAGE_KEYS.CART, cart);
    updateCartUI();
}

function updateCartUI() {
    updateCartCount();
    renderCartItems();
    renderCartSummary();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function renderCartItems() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <i data-lucide="shopping-bag" class="cart-empty-icon"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious items to get started!</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cart.map((item, index) => `
                <div class="cart-item" style="animation-delay: ${index * 0.1}s">
                    <div class="cart-item-image">
                        <img src="${item.menuItem.imageUrl}" alt="${item.menuItem.name}">
                    </div>
                    
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.menuItem.name}</div>
                        ${item.selectedVariant ? `<div class="cart-item-variant">Size: ${item.selectedVariant}</div>` : ''}
                        ${item.selectedAddOns.length > 0 ? `<div class="cart-item-addons">Add-ons: ${item.selectedAddOns.join(', ')}</div>` : ''}
                        <div class="cart-item-price">${formatCurrency(item.totalPrice)}</div>
                    </div>
                    
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', ${item.quantity - 1})">
                            <i data-lucide="minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', ${item.quantity + 1})">
                            <i data-lucide="plus"></i>
                        </button>
                    </div>
                    
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                        <i data-lucide="x"></i>
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    
    lucide.createIcons();
}

function renderCartSummary() {
    const cartFooter = document.getElementById('cartFooter');
    if (!cartFooter || cart.length === 0) {
        if (cartFooter) cartFooter.innerHTML = '';
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
    const deliveryFee = calculateDeliveryFee('A', subtotal); // Default to zone A
    const total = subtotal + deliveryFee;
    
    cartFooter.innerHTML = `
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>Subtotal:</span>
                <span>${formatCurrency(subtotal)}</span>
            </div>
            <div class="cart-summary-row">
                <span>Delivery:</span>
                <span>${formatCurrency(deliveryFee)}</span>
            </div>
            <div class="cart-summary-row total">
                <span>Total:</span>
                <span>${formatCurrency(total)}</span>
            </div>
        </div>
        
        <button class="btn btn-primary btn-lg" onclick="showLocationModal()" style="width: 100%;">
            Select Delivery Location
        </button>
    `;
}

function updateCartDisplay() {
    const cartContent = document.getElementById('cartContent');
    const cartFooter = document.getElementById('cartFooter');
    const cartCount = document.getElementById('cartCount');
    
    if (!cartContent || !cartFooter || !cartCount) return;
    
    const cart = getFromStorage(STORAGE_KEYS.CART) || [];
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart count
    cartCount.textContent = cartItemCount;
    cartCount.style.display = cartItemCount > 0 ? 'flex' : 'none';
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <i data-lucide="shopping-cart" class="cart-empty-icon"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious items to get started!</p>
                <button class="btn btn-primary" onclick="navigateTo('menu')">Browse Menu</button>
            </div>
        `;
        cartFooter.innerHTML = '';
        lucide.createIcons();
        return;
    }
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
    const selectedAddress = getFromStorage(STORAGE_KEYS.SELECTED_ADDRESS);
    const deliveryFee = selectedAddress ? getDeliveryFee(selectedAddress.zone) : 500; // Default Zone A
    const total = subtotal + deliveryFee;
    
    // Render cart items
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.menuItem.imageUrl}" alt="${item.menuItem.name}">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.menuItem.name}</div>
                        ${item.selectedVariant ? `<div class="cart-item-variant">${item.selectedVariant}</div>` : ''}
                        ${item.selectedAddOns.length > 0 ? `<div class="cart-item-addons">+ ${item.selectedAddOns.join(', ')}</div>` : ''}
                        <div class="cart-item-price">${formatCurrency(item.totalPrice)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', ${item.quantity - 1})">
                            <i data-lucide="minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', ${item.quantity + 1})">
                            <i data-lucide="plus"></i>
                        </button>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Render cart footer with location selection
    cartFooter.innerHTML = `
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>Subtotal:</span>
                <span>${formatCurrency(subtotal)}</span>
            </div>
            <div class="cart-summary-row">
                <span>Delivery:</span>
                <span>${formatCurrency(deliveryFee)}</span>
            </div>
            <div class="cart-summary-row total">
                <span>Total:</span>
                <span>${formatCurrency(total)}</span>
            </div>
        </div>
        
        <!-- Location Selection Section -->
        <div class="location-selection-section">
            <div class="location-header">
                <h4>Delivery Location</h4>
                <button class="btn btn-outline btn-sm" onclick="showAddressModal()">
                    <i data-lucide="plus"></i>
                    Add New
                </button>
            </div>
            
            <div class="location-dropdown">
                <div class="selected-location" onclick="toggleLocationDropdown()">
                    <div class="location-info">
                        ${selectedAddress ? `
                            <div class="location-label">${selectedAddress.label}</div>
                            <div class="location-details">${selectedAddress.street}, ${selectedAddress.area}</div>
                            <div class="location-zone">Zone ${selectedAddress.zone} - ${formatCurrency(deliveryFee)} delivery</div>
                        ` : `
                            <div class="location-label">Select Delivery Location</div>
                            <div class="location-details">Choose where to deliver your order</div>
                        `}
                    </div>
                    <i data-lucide="chevron-down" class="dropdown-arrow"></i>
                </div>
                
                <div class="location-dropdown-menu" id="locationDropdownMenu">
                    ${renderLocationDropdownItems()}
                </div>
            </div>
        </div>
        
        <div class="cart-actions">
            ${selectedAddress ? `
                <button class="btn btn-primary btn-lg" onclick="proceedToCheckout()" style="width: 100%;">
                    <i data-lucide="credit-card"></i>
                    Proceed to Checkout
                </button>
            ` : `
                <button class="btn btn-outline btn-lg" onclick="showLocationSelectionModal()" style="width: 100%;">
                    <i data-lucide="map-pin"></i>
                    Select Delivery Location
                </button>
            `}
        </div>
    `;
    
    lucide.createIcons();
}

function renderLocationDropdownItems() {
    const addresses = getFromStorage(STORAGE_KEYS.ADDRESSES) || [];
    const selectedAddress = getFromStorage(STORAGE_KEYS.SELECTED_ADDRESS);
    
    if (addresses.length === 0) {
        return `
            <div class="dropdown-empty">
                <i data-lucide="map-pin"></i>
                <p>No saved addresses</p>
                <button class="btn btn-primary btn-sm" onclick="showAddressModal()">Add Address</button>
            </div>
        `;
    }
    
    return addresses.map(address => `
        <div class="location-dropdown-item ${selectedAddress?.id === address.id ? 'selected' : ''}" 
             onclick="selectDeliveryLocation('${address.id}')">
            <div class="location-item-info">
                <div class="location-item-label">
                    ${address.label}
                    ${address.isDefault ? '<span class="default-badge">Default</span>' : ''}
                </div>
                <div class="location-item-address">${address.street}</div>
                <div class="location-item-area">${address.area} - Zone ${address.zone}</div>
                <div class="location-item-fee">${formatCurrency(getDeliveryFee(address.zone))} delivery</div>
            </div>
            <div class="location-item-actions">
                <button class="location-action-btn" onclick="event.stopPropagation(); editAddress('${address.id}')" title="Edit">
                    <i data-lucide="edit"></i>
                </button>
                <button class="location-action-btn delete" onclick="event.stopPropagation(); deleteAddress('${address.id}')" title="Delete">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function toggleLocationDropdown() {
    const dropdown = document.getElementById('locationDropdownMenu');
    if (dropdown) {
        dropdown.classList.toggle('active');
        
        // Update arrow rotation
        const arrow = dropdown.parentElement.querySelector('.dropdown-arrow');
        if (arrow) {
            arrow.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    }
}

function selectDeliveryLocation(addressId) {
    const addresses = getFromStorage(STORAGE_KEYS.ADDRESSES) || [];
    const selectedAddress = addresses.find(addr => addr.id === addressId);
    
    if (selectedAddress) {
        setToStorage(STORAGE_KEYS.SELECTED_ADDRESS, selectedAddress);
        updateCartDisplay();
        toggleLocationDropdown(); // Close dropdown
        showToast(`Delivery location set to ${selectedAddress.label}`, 'success');
    }
}

function showLocationSelectionModal() {
    const addresses = getFromStorage(STORAGE_KEYS.ADDRESSES) || [];
    const modal = document.getElementById('locationModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const savedAddressesList = document.getElementById('savedAddressesList');
    
    if (!modal || !modalOverlay || !savedAddressesList) return;
    
    if (addresses.length === 0) {
        savedAddressesList.innerHTML = `
            <div class="empty-state">
                <i data-lucide="map-pin" class="empty-state-icon"></i>
                <h3>No saved addresses</h3>
                <p>Add your first delivery address to continue</p>
                <button class="btn btn-primary" onclick="showAddressModal()">
                    <i data-lucide="plus"></i>
                    Add Address
                </button>
            </div>
        `;
    } else {
        const selectedAddress = getFromStorage(STORAGE_KEYS.SELECTED_ADDRESS);
        
        savedAddressesList.innerHTML = addresses.map(address => `
            <div class="address-card ${selectedAddress?.id === address.id ? 'selected' : ''} ${address.isDefault ? 'default-address' : ''}" 
                 onclick="selectLocationAndClose('${address.id}')">
                <div class="address-header">
                    <div>
                        <div class="address-label">
                            ${address.label}
                            ${address.isDefault ? '<span class="address-default">Default</span>' : ''}
                        </div>
                    </div>
                    <div class="address-actions">
                        <button onclick="event.stopPropagation(); editAddress('${address.id}')" title="Edit address">
                            <i data-lucide="edit"></i>
                        </button>
                        <button onclick="event.stopPropagation(); deleteAddress('${address.id}')" title="Delete address">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
                <div class="address-details">
                    <p>${address.street}</p>
                    <p>${address.area}</p>
                    <p>Zone ${address.zone} - ${formatCurrency(getDeliveryFee(address.zone))} delivery fee</p>
                    ${address.landmark ? `<p>Near ${address.landmark}</p>` : ''}
                </div>
                <div class="address-contact">
                    <span>📞 ${address.phone}</span>
                    ${address.whatsapp ? `<span>💬 ${address.whatsapp}</span>` : ''}
                </div>
            </div>
        `).join('');
    }
    
    lucide.createIcons();
    modalOverlay.classList.add('active');
}

function selectLocationAndClose(addressId) {
    selectDeliveryLocation(addressId);
    closeModal();
}

function quickAddToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item || !item.available) return;
    
    const defaultVariant = item.variants?.[0]?.name;
    addToCart(item, defaultVariant, []);
}

function addToCart(menuItem, variant, addOns = []) {
    const itemId = `${menuItem.id}-${variant || 'default'}-${addOns.sort().join(',')}`;
    
    // Calculate price with variant and add-ons
    let totalPrice = menuItem.basePrice;
    
    if (variant && menuItem.variants) {
        const variantData = menuItem.variants.find(v => v.name === variant);
        if (variantData) {
            totalPrice += variantData.priceDelta;
        }
    }
    
    if (menuItem.addOns) {
        addOns.forEach(addOnName => {
            const addOn = menuItem.addOns.find(a => a.name === addOnName);
            if (addOn) {
                totalPrice += addOn.price;
            }
        });
    }
    
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const newItem = {
            id: itemId,
            menuItem,
            quantity: 1,
            selectedVariant: variant,
            selectedAddOns: addOns,
            totalPrice
        };
        cart.push(newItem);
    }
    
    saveCart();
    showToast('Item added to cart!', 'success');
}

function updateCartItemQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    showToast('Item removed from cart', 'info');
}

function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSidebar = document.getElementById('cartSidebar');
    
    if (cartOverlay && cartSidebar) {
        cartOverlay.classList.add('active');
        cartSidebar.classList.add('active');
    }
}

function closeCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSidebar = document.getElementById('cartSidebar');
    
    if (cartOverlay && cartSidebar) {
        cartOverlay.classList.remove('active');
        cartSidebar.classList.remove('active');
    }
}

// Location Selection Modal
function showLocationModal() {
    const modal = document.getElementById('locationModal');
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (!modal || !modalOverlay) return;
    
    loadSavedAddresses();
    modalOverlay.classList.add('active');
    isLocationModalOpen = true;
}

function loadSavedAddresses() {
    const addresses = getFromStorage(STORAGE_KEYS.ADDRESSES) || [];
    const addressesList = document.getElementById('savedAddressesList');
    
    if (!addressesList) return;
    
    if (addresses.length === 0) {
        addressesList.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 2rem;">
                <i data-lucide="map-pin" style="width: 3rem; height: 3rem; color: #9CA3AF; margin: 0 auto 1rem;"></i>
                <h3>No saved addresses</h3>
                <p>Add your first delivery address to continue</p>
            </div>
        `;
    } else {
        addressesList.innerHTML = addresses.map(address => `
            <div class="address-card ${address.isDefault ? 'default-address' : ''}" onclick="selectAddress('${address.id}')">
                <div class="address-header">
                    <div>
                        <div class="address-label">${address.label}</div>
                        ${address.isDefault ? '<span class="address-default">Default</span>' : ''}
                    </div>
                    <div class="address-actions">
                        <button onclick="event.stopPropagation(); editAddress('${address.id}')" style="background: none; border: none; color: #6B7280; cursor: pointer; padding: 0.25rem; border-radius: 0.25rem;">
                            <i data-lucide="edit" style="width: 1rem; height: 1rem;"></i>
                        </button>
                        <button onclick="event.stopPropagation(); deleteAddress('${address.id}')" style="background: none; border: none; color: #6B7280; cursor: pointer; padding: 0.25rem; border-radius: 0.25rem;">
                            <i data-lucide="trash-2" style="width: 1rem; height: 1rem;"></i>
                        </button>
                    </div>
                </div>
                <div class="address-details">
                    ${address.street}<br>
                    ${address.area}${address.landmark ? `, ${address.landmark}` : ''}<br>
                    Zone ${address.zone} - ${getDeliveryFee(address.zone) === 0 ? 'FREE' : formatCurrency(getDeliveryFee(address.zone))} delivery
                </div>
                <div class="address-contact">
                    📞 ${address.phone}${address.whatsapp ? ` | 💬 ${address.whatsapp}` : ''}
                </div>
            </div>
        `).join('');
    }
    
    lucide.createIcons();
}

function selectAddress(addressId) {
    const addresses = getFromStorage(STORAGE_KEYS.ADDRESSES) || [];
    const selectedAddress = addresses.find(addr => addr.id === addressId);
    
    if (selectedAddress) {
        // Store selected address for checkout
        setToStorage('fp_selected_address', selectedAddress);
        closeModal();
        proceedToCheckout();
    }
}

function proceedToCheckout() {
    const selectedAddress = getFromStorage('fp_selected_address');
    
    if (!selectedAddress) {
        showToast('Please select a delivery address first', 'warning');
        return;
    }
    
    // Here you would normally navigate to checkout page
    // For now, we'll show a success message
    showToast('Proceeding to checkout...', 'success');
    closeCart();
    
    // Simulate checkout process
    setTimeout(() => {
        const orderId = Date.now().toString();
        const order = {
            id: orderId,
            items: [...cart],
            total: cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0),
            deliveryFee: getDeliveryFee(selectedAddress.zone),
            address: selectedAddress,
            status: 'received',
            createdAt: new Date().toISOString()
        };
        
        // Save order
        const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
        orders.push(order);
        setToStorage(STORAGE_KEYS.ORDERS, orders);
        
        // Clear cart
        cart = [];
        updateCartDisplay();
        
        showToast(`Order #${orderId.slice(-6)} placed successfully!`, 'success');
    }, 1500);
}

// Customize Modal
function showCustomizeModal(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    customizeItem = item;
    
    const modal = document.getElementById('customizeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const customizeTitle = document.getElementById('customizeTitle');
    const customizeContent = document.getElementById('customizeContent');
    
    if (!modal || !modalOverlay || !customizeTitle || !customizeContent) return;
    
    customizeTitle.textContent = `Customize ${item.name}`;
    
    let selectedVariant = item.variants?.[0]?.name || '';
    let selectedAddOns = [];
    
    customizeContent.innerHTML = `
        ${item.variants ? `
            <div class="customize-section">
                <h4>Size Options</h4>
                <div class="customize-options">
                    ${item.variants.map(variant => `
                        <div class="customize-option">
                            <input type="radio" name="variant" value="${variant.name}" id="variant-${variant.name}" ${variant.name === selectedVariant ? 'checked' : ''}>
                            <label for="variant-${variant.name}">
                                ${variant.name}
                                ${variant.priceDelta !== 0 ? `<span class="option-price">(${variant.priceDelta > 0 ? '+' : ''}${formatCurrency(variant.priceDelta)})</span>` : ''}
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        ${item.addOns && item.addOns.length > 0 ? `
            <div class="customize-section">
                <h4>Add-ons</h4>
                <div class="customize-options">
                    ${item.addOns.map(addOn => `
                        <div class="customize-option">
                            <input type="checkbox" value="${addOn.name}" id="addon-${addOn.name}">
                            <label for="addon-${addOn.name}">
                                ${addOn.name}
                                <span class="option-price">(+${formatCurrency(addOn.price)})</span>
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        <div class="customize-total">
            <div class="total-row">
                <span>Total Price:</span>
                <span id="customizePrice">${formatCurrency(item.basePrice)}</span>
            </div>
        </div>
        
        <button class="btn btn-primary btn-lg" onclick="addCustomizedToCart()" style="width: 100%; margin-top: 1rem;">
            Add to Cart
        </button>
    `;
    
    // Add event listeners for price calculation
    const variantInputs = customizeContent.querySelectorAll('input[name="variant"]');
    const addonInputs = customizeContent.querySelectorAll('input[type="checkbox"]');
    
    function updateCustomizePrice() {
        let price = item.basePrice;
        
        // Add variant price
        const selectedVariantInput = customizeContent.querySelector('input[name="variant"]:checked');
        if (selectedVariantInput && item.variants) {
            const variant = item.variants.find(v => v.name === selectedVariantInput.value);
            if (variant) price += variant.priceDelta;
        }
        
        // Add addon prices
        const selectedAddons = Array.from(customizeContent.querySelectorAll('input[type="checkbox"]:checked'));
        selectedAddons.forEach(checkbox => {
            const addon = item.addOns?.find(a => a.name === checkbox.value);
            if (addon) price += addon.price;
        });
        
        const priceElement = document.getElementById('customizePrice');
        if (priceElement) {
            priceElement.textContent = formatCurrency(price);
        }
    }
    
    variantInputs.forEach(input => input.addEventListener('change', updateCustomizePrice));
    addonInputs.forEach(input => input.addEventListener('change', updateCustomizePrice));
    
    modalOverlay.classList.add('active');
}

function addCustomizedToCart() {
    if (!customizeItem) return;
    
    const customizeContent = document.getElementById('customizeContent');
    const selectedVariantInput = customizeContent.querySelector('input[name="variant"]:checked');
    const selectedAddonInputs = customizeContent.querySelectorAll('input[type="checkbox"]:checked');
    
    const variant = selectedVariantInput?.value;
    const addOns = Array.from(selectedAddonInputs).map(input => input.value);
    
    addToCart(customizeItem, variant, addOns);
    closeModal();
}

// Modal Functions
function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
    
    customizeItem = null;
    editingAddress = null;
    isLocationModalOpen = false;
}

// Dashboard
function loadDashboard() {
    loadDashboardStats();
    loadDashboardContent();
}

function loadDashboardStats() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;
    
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    const totalOrders = orders.length;
    const lastOrderDate = orders.length > 0 ? new Date(orders[orders.length - 1].createdAt).toLocaleDateString() : 'Never';
    const totalSpent = orders.reduce((sum, order) => sum + order.total + order.deliveryFee, 0);
    
    statsGrid.innerHTML = `
        <div class="stat-card">
            <div class="stat-header">
                <div>
                    <div class="stat-label">Total Orders</div>
                    <div class="stat-value">${totalOrders}</div>
                </div>
                <i data-lucide="package" class="stat-icon"></i>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-header">
                <div>
                    <div class="stat-label">Last Order</div>
                    <div class="stat-value">${lastOrderDate}</div>
                </div>
                <i data-lucide="calendar" class="stat-icon"></i>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-header">
                <div>
                    <div class="stat-label">Total Spent</div>
                    <div class="stat-value">${formatCurrency(totalSpent)}</div>
                </div>
                <i data-lucide="credit-card" class="stat-icon"></i>
            </div>
        </div>
    `;
    
    lucide.createIcons();
}

function loadDashboardContent() {
    // Load the active tab from storage
    const ui = getFromStorage(STORAGE_KEYS.UI) || { activeTab: 'orders' };
    switchTab(ui.activeTab);
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });
    
    // Update tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    const targetPane = document.getElementById(`${tabName}Tab`);
    if (targetPane) {
        targetPane.classList.add('active');
    }
    
    // Save active tab
    const ui = getFromStorage(STORAGE_KEYS.UI) || {};
    ui.activeTab = tabName;
    setToStorage(STORAGE_KEYS.UI, ui);
    
    // Load tab content
    switch (tabName) {
        case 'orders':
            loadOrdersTab();
            break;
        case 'addresses':
            loadAddressesTab();
            break;
        case 'coupons':
            loadCouponsTab();
            break;
        case 'settings':
            loadSettingsTab();
            break;
    }
}

function loadOrdersTab() {
    const ordersContent = document.getElementById('ordersContent');
    if (!ordersContent) return;
    
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    
    if (orders.length === 0) {
        ordersContent.innerHTML = `
            <div class="empty-state">
                <i data-lucide="package" class="empty-state-icon"></i>
                <h3>No orders yet</h3>
                <p>Start by ordering some delicious food!</p>
                <button class="btn btn-primary" onclick="navigateTo('menu')">Browse Menu</button>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    ordersContent.innerHTML = orders.map((order, index) => `
        <div class="order-card" style="animation-delay: ${index * 0.1}s">
            <div class="order-header">
                <div>
                    <div class="order-id">Order #${order.id.slice(-6)}</div>
                    <div class="order-details">${new Date(order.createdAt).toLocaleString()}</div>
                    <div class="order-details">${order.items.length} item${order.items.length !== 1 ? 's' : ''} • ${formatCurrency(order.total + order.deliveryFee)}</div>
                    <div class="order-details">${order.address.area}, ${order.address.street}</div>
                </div>
                <span class="order-status status-${order.status.replace('-', '-')}">${order.status.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}</span>
            </div>
            
            <div class="order-actions">
                <button class="btn btn-outline btn-sm" onclick="reorderItems('${order.id}')">Reorder</button>
                <button class="btn btn-outline btn-sm" onclick="trackOrder('${order.id}')">Track</button>
            </div>
        </div>
    `).join('');
}

function loadAddressesTab() {
    const addressesContent = document.getElementById('addressesContent');
    if (!addressesContent) return;
    
    const addresses = getFromStorage(STORAGE_KEYS.ADDRESSES) || [];
    
    if (addresses.length === 0) {
        addressesContent.innerHTML = `
            <div class="empty-state">
                <i data-lucide="map-pin" class="empty-state-icon"></i>
                <h3>No addresses saved</h3>
                <p>Add an address to speed up your checkout process</p>
                <button class="btn btn-primary" onclick="showAddressModal()">Add Address</button>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    addressesContent.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            ${addresses.map((address, index) => `
                <div class="address-card" style="animation-delay: ${index * 0.1}s">
                    <div class="address-header">
                        <div>
                            <div class="address-label">${address.label}</div>
                            ${address.isDefault ? '<span class="address-default">Default</span>' : ''}
                        </div>
                        
                        <div class="address-actions">
                            <button onclick="editAddress('${address.id}')">
                                <i data-lucide="edit"></i>
                            </button>
                            <button onclick="deleteAddress('${address.id}')">
                                <i data-lucide="trash-2"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="address-details">
                        <div>${address.street}</div>
                        <div>${address.area}</div>
                        <div>${address.landmark}</div>
                        <div>Zone ${address.zone}</div>
                    </div>
                    
                    <div class="address-contact">
                        <div>Phone: ${address.phone}</div>
                        <div>WhatsApp: ${address.whatsapp}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    lucide.createIcons();
}

function loadCouponsTab() {
    const couponsContent = document.getElementById('couponsContent');
    if (!couponsContent) return;
    
    const coupons = getFromStorage(STORAGE_KEYS.COUPONS) || [];
    const activeCoupons = coupons.filter(c => c.active);
    
    if (activeCoupons.length === 0) {
        couponsContent.innerHTML = `
            <div class="empty-state">
                <i data-lucide="ticket" class="empty-state-icon"></i>
                <h3>No coupons available</h3>
                <p>Check back later for special offers!</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    couponsContent.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            ${activeCoupons.map((coupon, index) => `
                <div class="coupon-card" style="animation-delay: ${index * 0.1}s">
                    <div class="coupon-header">
                        <div>
                            <div class="coupon-code">${coupon.code}</div>
                            <div class="coupon-description">${coupon.description}</div>
                        </div>
                    </div>
                    
                    <div class="coupon-value">
                        ${coupon.type === 'percent' ? `${coupon.value}% OFF` : `${formatCurrency(coupon.value)} OFF`}
                    </div>
                    <div class="coupon-min">
                        Min. order: ${formatCurrency(coupon.minAmount)}
                    </div>
                    
                    <div class="coupon-footer">
                        <span class="coupon-expiry">
                            Expires: ${new Date(coupon.expiry).toLocaleDateString()}
                        </span>
                        <button class="btn btn-outline btn-sm" onclick="copyCouponCode('${coupon.code}')">
                            <i data-lucide="copy"></i>
                            Copy
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    lucide.createIcons();
}

function loadSettingsTab() {
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userPhone = document.getElementById('userPhone');
    const userWhatsapp = document.getElementById('userWhatsapp');
    
    if (currentUser) {
        if (userName) userName.value = currentUser.name;
        if (userEmail) userEmail.value = currentUser.email;
        if (userPhone) userPhone.value = currentUser.phone;
        if (userWhatsapp) userWhatsapp.value = currentUser.whatsapp;
    }
}

// Dashboard Actions
function reorderItems(orderId) {
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    // Add all items from the order to cart
    order.items.forEach(item => {
        addToCart(item.menuItem, item.selectedVariant, item.selectedAddOns);
    });
    
    showToast('Items added to cart!', 'success');
    setTimeout(() => navigateTo('menu'), 1000);
}

function trackOrder(orderId) {
    showToast(`Order tracking would show status for order #${orderId.slice(-6)}`, 'info');
}

function showAddressModal(addressId = null) {
    editingAddress = null;
    
    if (addressId) {
        const addresses = getFromStorage(STORAGE_KEYS.ADDRESSES) || [];
        editingAddress = addresses.find(a => a.id === addressId);
    }
    
    const modal = document.getElementById('addressModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('addressModalTitle');
    
    if (!modal || !modalOverlay || !modalTitle) return;
    
    modalTitle.textContent = editingAddress ? 'Edit Address' : 'Add New Address';
    
    // Populate form if editing
    if (editingAddress) {
        const form = modal.querySelector('.address-form');
        if (form) {
            form.label.value = editingAddress.label;
            form.street.value = editingAddress.street;
            form.area.value = editingAddress.area;
            form.landmark.value = editingAddress.landmark;
            form.phone.value = editingAddress.phone;
            form.whatsapp.value = editingAddress.whatsapp;
            form.zone.value = editingAddress.zone;
            form.isDefault.checked = editingAddress.isDefault;
        }
    }
    
    modalOverlay.classList.add('active');
}

function editAddress(addressId) {
    showAddressModal(addressId);
}

function deleteAddress(addressId) {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    const addresses = getFromStorage(STORAGE_KEYS.ADDRESSES) || [];
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    
    setToStorage(STORAGE_KEYS.ADDRESSES, updatedAddresses);
    
    if (currentPage === 'dashboard') {
        loadAddressesTab();
    }
    
    if (isLocationModalOpen) {
        loadSavedAddresses();
    }
    
    showToast('Address deleted!', 'success');
}

function saveAddress(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const addressData = {
        id: editingAddress?.id || Date.now().toString(),
        label: formData.get('label'),
        street: formData.get('street'),
        area: formData.get('area'),
        landmark: formData.get('landmark'),
        phone: formData.get('phone'),
        whatsapp: formData.get('whatsapp'),
        zone: formData.get('zone'),
        isDefault: formData.get('isDefault') === 'on'
    };
    
    const addresses = getFromStorage(STORAGE_KEYS.ADDRESSES) || [];
    let updatedAddresses = [...addresses];
    
    if (editingAddress) {
        updatedAddresses = updatedAddresses.map(addr => 
            addr.id === editingAddress.id ? addressData : addr
        );
    } else {
        updatedAddresses.push(addressData);
    }
    
    // If setting as default, remove default from others
    if (addressData.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({
            ...addr,
            isDefault: addr.id === addressData.id
        }));
    }
    
    setToStorage(STORAGE_KEYS.ADDRESSES, updatedAddresses);
    
    if (currentPage === 'dashboard') {
        loadAddressesTab();
    }
    
    if (isLocationModalOpen) {
        loadSavedAddresses();
    }
    
    closeModal();
    showToast(editingAddress ? 'Address updated!' : 'Address added!', 'success');
}

function copyCouponCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        showToast('Coupon code copied!', 'success');
    }).catch(() => {
        showToast('Failed to copy coupon code', 'error');
    });
}

function callSupport() {
    if (confirm('Call FoodPick customer service?')) {
        window.open('tel:+2348123456789');
    }
}

function whatsappSupport() {
    window.open('https://wa.me/2348123456789?text=Hello%20FoodPick%2C%20I%20need%20help%20with%20my%20order', '_blank');
}

// Contact Form
function submitContactForm(event) {
    event.preventDefault();
    showToast('Thank you for your message! We will get back to you soon.', 'success');
    event.target.reset();
}

// Newsletter
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail');
    if (email && email.value) {
        showToast('Thank you for subscribing to our newsletter!', 'success');
        email.value = '';
    }
}

// Admin Access
function adminAccess() {
    const password = prompt('Enter admin password:');
    if (password === 'admin123') {
        window.location.href = 'admin.html';
    } else {
        showToast('Invalid password', 'error');
    }
}

// Event Listeners
function setupEventListeners() {
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
        
        if (e.target.classList.contains('cart-overlay')) {
            closeCart();
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.category-card')) {
            document.querySelectorAll('.category-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeCart();
        }
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const categoryCards = document.querySelectorAll('.category-card');
    const locationDropdown = document.getElementById('locationDropdownMenu');
    
    categoryCards.forEach(card => {
        const dropdown = card.querySelector('.category-dropdown');
        if (dropdown && !card.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Close location dropdown when clicking outside
    if (locationDropdown && !event.target.closest('.location-dropdown')) {
        locationDropdown.classList.remove('active');
        const arrow = document.querySelector('.dropdown-arrow');
        if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
        }
    }
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);