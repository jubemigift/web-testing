// FoodPick Admin Dashboard JavaScript

// Global State
let currentAdminTab = 'menu';
let editingMenuItem = null;
let editingCoupon = null;
let salesChart = null;

// Storage Keys (same as main app)
const STORAGE_KEYS = {
    MENU: 'fp_menu',
    ORDERS: 'fp_orders',
    COUPONS: 'fp_coupons',
    ADDRESSES: 'fp_addresses',
    USER: 'fp_user',
    META: 'fp_meta',
    UI: 'fp_ui',
    CART: 'fp_cart'
};

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

function formatCurrency(amount) {
    return `₦${amount.toLocaleString()}`;
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

// Initialize Admin App
function initAdminApp() {
    // Initialize icons
    lucide.createIcons();
    
    // Load initial data
    loadAdminData();
    
    // Load admin dashboard
    loadAdminDashboard();
    
    console.log('FoodPick Admin Dashboard initialized successfully!');
}

function loadAdminData() {
    // Check if we need to seed demo data
    let menu = getFromStorage(STORAGE_KEYS.MENU);
    if (!menu || menu.length === 0) {
        seedDemoData();
    }
}

function loadAdminDashboard() {
    loadAdminStats();
    switchAdminTab('menu');
}

function loadAdminStats() {
    const statsGrid = document.getElementById('adminStatsGrid');
    if (!statsGrid) return;
    
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    const menu = getFromStorage(STORAGE_KEYS.MENU) || [];
    
    // Calculate stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayOrders = orders.filter(order => new Date(order.createdAt) >= today);
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total + order.deliveryFee, 0);
    const avgOrderValue = orders.length > 0 ? orders.reduce((sum, order) => sum + order.total + order.deliveryFee, 0) / orders.length : 0;
    
    statsGrid.innerHTML = `
        <div class="stat-card">
            <div class="stat-header">
                <div>
                    <div class="stat-label">Today's Orders</div>
                    <div class="stat-value">${todayOrders.length}</div>
                </div>
                <i data-lucide="package" class="stat-icon" style="color: #3B82F6;"></i>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-header">
                <div>
                    <div class="stat-label">Today's Revenue</div>
                    <div class="stat-value">${formatCurrency(todayRevenue)}</div>
                </div>
                <i data-lucide="dollar-sign" class="stat-icon" style="color: #10B981;"></i>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-header">
                <div>
                    <div class="stat-label">Avg Order Value</div>
                    <div class="stat-value">${formatCurrency(Math.round(avgOrderValue))}</div>
                </div>
                <i data-lucide="trending-up" class="stat-icon" style="color: #F59E0B;"></i>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-header">
                <div>
                    <div class="stat-label">Menu Items</div>
                    <div class="stat-value">${menu.length}</div>
                </div>
                <i data-lucide="menu" class="stat-icon" style="color: #8B5CF6;"></i>
            </div>
        </div>
    `;
    
    lucide.createIcons();
}

// Tab Management
function switchAdminTab(tabName) {
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
    
    currentAdminTab = tabName;
    
    // Load tab content
    switch (tabName) {
        case 'menu':
            loadMenuTab();
            break;
        case 'orders':
            loadOrdersTab();
            break;
        case 'coupons':
            loadCouponsTab();
            break;
        case 'analytics':
            loadAnalyticsTab();
            break;
    }
}

// Menu Tab
function loadMenuTab() {
    const menu = getFromStorage(STORAGE_KEYS.MENU) || [];
    const menuItemCount = document.getElementById('menuItemCount');
    const menuItemsGrid = document.getElementById('menuItemsGrid');
    
    if (menuItemCount) {
        menuItemCount.textContent = menu.length;
    }
    
    if (!menuItemsGrid) return;
    
    menuItemsGrid.innerHTML = menu.map((item, index) => `
        <div class="card" style="animation-delay: ${index * 0.1}s; animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;">
            <div style="position: relative;">
                <img src="${item.imageUrl}" alt="${item.name}" style="width: 100%; height: 10rem; object-fit: cover;">
                ${!item.available ? '<div style="position: absolute; inset: 0; background: rgba(239, 68, 68, 0.75); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500;">Unavailable</div>' : ''}
            </div>
            <div class="card-content">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0;">${item.name}</h3>
                    <span style="font-size: 1.125rem; font-weight: 700; color: #10B981;">${formatCurrency(item.basePrice)}</span>
                </div>
                <p style="color: #6B7280; font-size: 0.875rem; margin-bottom: 0.5rem;">${item.category}</p>
                <p style="color: #6B7280; font-size: 0.875rem; margin-bottom: 0.75rem; line-height: 1.4;">${item.description}</p>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
                        ${item.tags.slice(0, 2).map(tag => `
                            <span style="padding: 0.125rem 0.5rem; background: #F3F4F6; color: #6B7280; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                    
                    <div style="display: flex; gap: 0.25rem;">
                        <button onclick="editMenuItem('${item.id}')" style="background: none; border: none; color: #6B7280; cursor: pointer; padding: 0.25rem; border-radius: 0.25rem; transition: color 0.2s ease;" onmouseover="this.style.color='#3B82F6'" onmouseout="this.style.color='#6B7280'">
                            <i data-lucide="edit" style="width: 1rem; height: 1rem;"></i>
                        </button>
                        <button onclick="deleteMenuItem('${item.id}')" style="background: none; border: none; color: #6B7280; cursor: pointer; padding: 0.25rem; border-radius: 0.25rem; transition: color 0.2s ease;" onmouseover="this.style.color='#EF4444'" onmouseout="this.style.color='#6B7280'">
                            <i data-lucide="trash-2" style="width: 1rem; height: 1rem;"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function showMenuItemModal(itemId = null) {
    editingMenuItem = null;
    
    if (itemId) {
        const menu = getFromStorage(STORAGE_KEYS.MENU) || [];
        editingMenuItem = menu.find(item => item.id === itemId);
    }
    
    const modal = document.getElementById('menuItemModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('menuItemModalTitle');
    
    if (!modal || !modalOverlay || !modalTitle) return;
    
    modalTitle.textContent = editingMenuItem ? 'Edit Menu Item' : 'Add New Menu Item';
    
    // Clear and populate form
    const form = modal.querySelector('.menu-form');
    if (form) {
        form.reset();
        
        if (editingMenuItem) {
            form.category.value = editingMenuItem.category;
            form.name.value = editingMenuItem.name;
            form.description.value = editingMenuItem.description;
            form.basePrice.value = editingMenuItem.basePrice;
            form.rating.value = editingMenuItem.rating;
            form.imageUrl.value = editingMenuItem.imageUrl;
            form.tags.value = editingMenuItem.tags.join(', ');
            form.available.checked = editingMenuItem.available;
        }
    }
    
    // Load variants and add-ons
    loadVariants();
    loadAddons();
    
    modalOverlay.classList.add('active');
}

function editMenuItem(itemId) {
    showMenuItemModal(itemId);
}

function deleteMenuItem(itemId) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    
    const menu = getFromStorage(STORAGE_KEYS.MENU) || [];
    const updatedMenu = menu.filter(item => item.id !== itemId);
    
    setToStorage(STORAGE_KEYS.MENU, updatedMenu);
    bumpMenuVersion();
    loadMenuTab();
    showToast('Menu item deleted!', 'success');
}

function saveMenuItem(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const variants = collectVariants();
    const addOns = collectAddons();
    
    const menuItem = {
        id: editingMenuItem?.id || Date.now().toString(),
        category: formData.get('category'),
        name: formData.get('name'),
        description: formData.get('description'),
        basePrice: parseFloat(formData.get('basePrice')),
        imageUrl: formData.get('imageUrl'),
        tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(Boolean),
        rating: parseFloat(formData.get('rating')),
        variants: variants,
        addOns: addOns,
        available: formData.get('available') === 'on'
    };
    
    const menu = getFromStorage(STORAGE_KEYS.MENU) || [];
    let updatedMenu = [...menu];
    
    if (editingMenuItem) {
        updatedMenu = updatedMenu.map(item => 
            item.id === editingMenuItem.id ? menuItem : item
        );
    } else {
        updatedMenu.push(menuItem);
    }
    
    setToStorage(STORAGE_KEYS.MENU, updatedMenu);
    bumpMenuVersion();
    loadMenuTab();
    closeAdminModal();
    showToast(editingMenuItem ? 'Menu item updated!' : 'Menu item added!', 'success');
}

// Variants and Add-ons Management
function loadVariants() {
    const container = document.getElementById('variantsContainer');
    if (!container) return;
    
    const variants = editingMenuItem?.variants || [];
    
    container.innerHTML = variants.map((variant, index) => `
        <div class="variant-item">
            <input type="text" placeholder="Variant name" value="${variant.name}" data-variant-name="${index}">
            <input type="number" placeholder="Price delta" value="${variant.priceDelta}" step="0.01" data-variant-price="${index}">
            <button type="button" class="remove-btn" onclick="removeVariant(${index})">Remove</button>
        </div>
    `).join('');
}

function addVariant() {
    const container = document.getElementById('variantsContainer');
    if (!container) return;
    
    const index = container.children.length;
    const variantDiv = document.createElement('div');
    variantDiv.className = 'variant-item';
    variantDiv.innerHTML = `
        <input type="text" placeholder="Variant name" data-variant-name="${index}">
        <input type="number" placeholder="Price delta" step="0.01" data-variant-price="${index}">
        <button type="button" class="remove-btn" onclick="removeVariant(${index})">Remove</button>
    `;
    
    container.appendChild(variantDiv);
}

function removeVariant(index) {
    const container = document.getElementById('variantsContainer');
    if (container && container.children[index]) {
        container.children[index].remove();
    }
}

function collectVariants() {
    const container = document.getElementById('variantsContainer');
    if (!container) return [];
    
    const variants = [];
    const variantItems = container.querySelectorAll('.variant-item');
    
    variantItems.forEach(item => {
        const nameInput = item.querySelector('[data-variant-name]');
        const priceInput = item.querySelector('[data-variant-price]');
        
        if (nameInput && priceInput && nameInput.value.trim()) {
            variants.push({
                name: nameInput.value.trim(),
                priceDelta: parseFloat(priceInput.value) || 0
            });
        }
    });
    
    return variants;
}

function loadAddons() {
    const container = document.getElementById('addonsContainer');
    if (!container) return;
    
    const addOns = editingMenuItem?.addOns || [];
    
    container.innerHTML = addOns.map((addon, index) => `
        <div class="addon-item">
            <input type="text" placeholder="Add-on name" value="${addon.name}" data-addon-name="${index}">
            <input type="number" placeholder="Price" value="${addon.price}" step="0.01" data-addon-price="${index}">
            <button type="button" class="remove-btn" onclick="removeAddon(${index})">Remove</button>
        </div>
    `).join('');
}

function addAddon() {
    const container = document.getElementById('addonsContainer');
    if (!container) return;
    
    const index = container.children.length;
    const addonDiv = document.createElement('div');
    addonDiv.className = 'addon-item';
    addonDiv.innerHTML = `
        <input type="text" placeholder="Add-on name" data-addon-name="${index}">
        <input type="number" placeholder="Price" step="0.01" data-addon-price="${index}">
        <button type="button" class="remove-btn" onclick="removeAddon(${index})">Remove</button>
    `;
    
    container.appendChild(addonDiv);
}

function removeAddon(index) {
    const container = document.getElementById('addonsContainer');
    if (container && container.children[index]) {
        container.children[index].remove();
    }
}

function collectAddons() {
    const container = document.getElementById('addonsContainer');
    if (!container) return [];
    
    const addOns = [];
    const addonItems = container.querySelectorAll('.addon-item');
    
    addonItems.forEach(item => {
        const nameInput = item.querySelector('[data-addon-name]');
        const priceInput = item.querySelector('[data-addon-price]');
        
        if (nameInput && priceInput && nameInput.value.trim()) {
            addOns.push({
                name: nameInput.value.trim(),
                price: parseFloat(priceInput.value) || 0
            });
        }
    });
    
    return addOns;
}

// Orders Tab
function loadOrdersTab() {
    const ordersKanban = document.getElementById('ordersKanban');
    if (!ordersKanban) return;
    
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    const statuses = ['received', 'preparing', 'on-the-way', 'delivered'];
    
    ordersKanban.innerHTML = statuses.map(status => {
        const statusOrders = orders.filter(order => order.status === status);
        
        return `
            <div class="kanban-column">
                <div class="kanban-header">
                    ${status.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())} (${statusOrders.length})
                </div>
                
                ${statusOrders.map(order => `
                    <div class="kanban-item" onclick="showOrderDetails('${order.id}')">
                        <div class="order-id">Order #${order.id.slice(-6)}</div>
                        <div class="order-time">${new Date(order.createdAt).toLocaleString()}</div>
                        <div class="order-total">${formatCurrency(order.total + order.deliveryFee)}</div>
                        <div style="font-size: 0.875rem; color: #6B7280; margin-top: 0.25rem;">
                            ${order.items.length} item${order.items.length !== 1 ? 's' : ''}
                        </div>
                        
                        ${status !== 'delivered' ? `
                            <div class="status-actions">
                                ${statuses.map(s => `
                                    <button class="status-btn ${s === status ? 'active' : ''}" 
                                            onclick="event.stopPropagation(); updateOrderStatus('${order.id}', '${s}')"
                                            title="${s.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}">
                                        ${s.charAt(0).toUpperCase()}
                                    </button>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }).join('');
}

function updateOrderStatus(orderId, newStatus) {
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setToStorage(STORAGE_KEYS.ORDERS, updatedOrders);
    loadOrdersTab();
    showToast('Order status updated!', 'success');
}

function showOrderDetails(orderId) {
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    const modal = document.getElementById('orderDetailsModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const orderDetailsTitle = document.getElementById('orderDetailsTitle');
    const orderDetailsContent = document.getElementById('orderDetailsContent');
    
    if (!modal || !modalOverlay || !orderDetailsTitle || !orderDetailsContent) return;
    
    orderDetailsTitle.textContent = `Order #${order.id.slice(-6)}`;
    
    orderDetailsContent.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Order Details</h4>
            <p style="font-size: 0.875rem; color: #6B7280; margin-bottom: 0.25rem;">Created: ${new Date(order.createdAt).toLocaleString()}</p>
            <p style="font-size: 0.875rem; color: #6B7280;">Status: ${order.status}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Items</h4>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${order.items.map((item, index) => `
                    <div style="display: flex; justify-between; align-items: center; padding: 0.5rem; background: #F9FAFB; border-radius: 0.375rem;">
                        <div>
                            <span style="font-weight: 500;">${item.menuItem.name}</span>
                            ${item.selectedVariant ? `<span style="font-size: 0.875rem; color: #6B7280; margin-left: 0.5rem;">(${item.selectedVariant})</span>` : ''}
                            <span style="font-size: 0.875rem; color: #6B7280; margin-left: 0.5rem;">x${item.quantity}</span>
                        </div>
                        <span style="font-weight: 500;">${formatCurrency(item.totalPrice * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Delivery Address</h4>
            <p style="font-size: 0.875rem;">${order.address.street}</p>
            <p style="font-size: 0.875rem;">${order.address.area}</p>
            <p style="font-size: 0.875rem;">Zone ${order.address.zone}</p>
            <p style="font-size: 0.875rem;">Phone: ${order.address.phone}</p>
        </div>

        <div style="border-top: 1px solid #E5E7EB; padding-top: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Subtotal:</span>
                <span>${formatCurrency(order.total)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Delivery:</span>
                <span>${formatCurrency(order.deliveryFee)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.125rem;">
                <span>Total:</span>
                <span>${formatCurrency(order.total + order.deliveryFee)}</span>
            </div>
        </div>
    `;
    
    modalOverlay.classList.add('active');
}

function markAllDelivered() {
    if (!confirm('Mark all orders as delivered?')) return;
    
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    const updatedOrders = orders.map(order => ({ ...order, status: 'delivered' }));
    
    setToStorage(STORAGE_KEYS.ORDERS, updatedOrders);
    loadOrdersTab();
    showToast('All orders marked as delivered!', 'success');
}

// Coupons Tab
function loadCouponsTab() {
    const couponsGrid = document.getElementById('couponsGrid');
    if (!couponsGrid) return;
    
    const coupons = getFromStorage(STORAGE_KEYS.COUPONS) || [];
    
    couponsGrid.innerHTML = coupons.map((coupon, index) => `
        <div class="card" style="animation-delay: ${index * 0.1}s; animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;">
            <div class="card-content">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.25rem;">${coupon.code}</h3>
                        <p style="font-size: 0.875rem; color: #6B7280;">${coupon.description}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="padding: 0.125rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; ${coupon.active ? 'background: #DCFCE7; color: #16A34A;' : 'background: #FEE2E2; color: #DC2626;'}">
                            ${coupon.active ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <p style="font-size: 1.125rem; font-weight: 700; color: #FF4D4F; margin-bottom: 0.25rem;">
                        ${coupon.type === 'percent' ? `${coupon.value}% OFF` : `${formatCurrency(coupon.value)} OFF`}
                    </p>
                    <p style="font-size: 0.875rem; color: #6B7280; margin-bottom: 0.25rem;">
                        Min. order: ${formatCurrency(coupon.minAmount)}
                    </p>
                    <p style="font-size: 0.875rem; color: #6B7280; margin-bottom: 0.25rem;">
                        Expires: ${new Date(coupon.expiry).toLocaleDateString()}
                    </p>
                    <p style="font-size: 0.875rem; color: #6B7280;">
                        Usage limit: ${coupon.usageLimit}
                    </p>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; gap: 0.25rem;">
                        <button onclick="editCoupon('${coupon.id}')" style="background: none; border: none; color: #6B7280; cursor: pointer; padding: 0.25rem; border-radius: 0.25rem; transition: color 0.2s ease;" onmouseover="this.style.color='#3B82F6'" onmouseout="this.style.color='#6B7280'">
                            <i data-lucide="edit" style="width: 1rem; height: 1rem;"></i>
                        </button>
                        <button onclick="deleteCoupon('${coupon.id}')" style="background: none; border: none; color: #6B7280; cursor: pointer; padding: 0.25rem; border-radius: 0.25rem; transition: color 0.2s ease;" onmouseover="this.style.color='#EF4444'" onmouseout="this.style.color='#6B7280'">
                            <i data-lucide="trash-2" style="width: 1rem; height: 1rem;"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function showCouponModal(couponId = null) {
    editingCoupon = null;
    
    if (couponId) {
        const coupons = getFromStorage(STORAGE_KEYS.COUPONS) || [];
        editingCoupon = coupons.find(coupon => coupon.id === couponId);
    }
    
    const modal = document.getElementById('couponModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('couponModalTitle');
    
    if (!modal || !modalOverlay || !modalTitle) return;
    
    modalTitle.textContent = editingCoupon ? 'Edit Coupon' : 'Add New Coupon';
    
    // Clear and populate form
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
        
        if (editingCoupon) {
            form.code.value = editingCoupon.code;
            form.type.value = editingCoupon.type;
            form.description.value = editingCoupon.description;
            form.value.value = editingCoupon.value;
            form.minAmount.value = editingCoupon.minAmount;
            form.expiry.value = editingCoupon.expiry;
            form.usageLimit.value = editingCoupon.usageLimit;
            form.active.checked = editingCoupon.active;
        }
        
        updateCouponValueLabel(form.type);
    }
    
    modalOverlay.classList.add('active');
}

function editCoupon(couponId) {
    showCouponModal(couponId);
}

function deleteCoupon(couponId) {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    
    const coupons = getFromStorage(STORAGE_KEYS.COUPONS) || [];
    const updatedCoupons = coupons.filter(coupon => coupon.id !== couponId);
    
    setToStorage(STORAGE_KEYS.COUPONS, updatedCoupons);
    loadCouponsTab();
    showToast('Coupon deleted!', 'success');
}

function saveCoupon(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    const coupon = {
        id: editingCoupon?.id || Date.now().toString(),
        code: formData.get('code').toUpperCase(),
        type: formData.get('type'),
        value: parseFloat(formData.get('value')),
        minAmount: parseFloat(formData.get('minAmount')),
        expiry: formData.get('expiry'),
        usageLimit: parseInt(formData.get('usageLimit')),
        active: formData.get('active') === 'on',
        description: formData.get('description')
    };
    
    const coupons = getFromStorage(STORAGE_KEYS.COUPONS) || [];
    let updatedCoupons = [...coupons];
    
    if (editingCoupon) {
        updatedCoupons = updatedCoupons.map(c => 
            c.id === editingCoupon.id ? coupon : c
        );
    } else {
        updatedCoupons.push(coupon);
    }
    
    setToStorage(STORAGE_KEYS.COUPONS, updatedCoupons);
    loadCouponsTab();
    closeAdminModal();
    showToast(editingCoupon ? 'Coupon updated!' : 'Coupon added!', 'success');
}

function updateCouponValueLabel(selectElement) {
    const label = document.getElementById('couponValueLabel');
    if (label) {
        label.textContent = selectElement.value === 'percent' ? 'Value (%)' : 'Value (₦)';
    }
}

// Analytics Tab
function loadAnalyticsTab() {
    loadRevenueStats();
    loadTopCategories();
    loadSalesChart();
}

function loadRevenueStats() {
    const revenueStats = document.getElementById('revenueStats');
    if (!revenueStats) return;
    
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);
    
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 30);

    const todayRevenue = orders
        .filter(order => new Date(order.createdAt) >= today)
        .reduce((sum, order) => sum + order.total + order.deliveryFee, 0);
    
    const last7DaysRevenue = orders
        .filter(order => new Date(order.createdAt) >= last7Days)
        .reduce((sum, order) => sum + order.total + order.deliveryFee, 0);
    
    const last30DaysRevenue = orders
        .filter(order => new Date(order.createdAt) >= last30Days)
        .reduce((sum, order) => sum + order.total + order.deliveryFee, 0);
    
    revenueStats.innerHTML = `
        <div style="display: flex; justify-between; align-items: center; padding: 1rem; background: #F9FAFB; border-radius: 0.5rem; margin-bottom: 0.5rem;">
            <span>Today</span>
            <span style="font-weight: 700;">${formatCurrency(todayRevenue)}</span>
        </div>
        <div style="display: flex; justify-between; align-items: center; padding: 1rem; background: #F9FAFB; border-radius: 0.5rem; margin-bottom: 0.5rem;">
            <span>Last 7 Days</span>
            <span style="font-weight: 700;">${formatCurrency(last7DaysRevenue)}</span>
        </div>
        <div style="display: flex; justify-between; align-items: center; padding: 1rem; background: #F9FAFB; border-radius: 0.5rem;">
            <span>Last 30 Days</span>
            <span style="font-weight: 700;">${formatCurrency(last30DaysRevenue)}</span>
        </div>
    `;
}

function loadTopCategories() {
    const topCategories = document.getElementById('topCategories');
    if (!topCategories) return;
    
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    
    const categoryStats = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            const category = item.menuItem.category;
            categoryStats[category] = (categoryStats[category] || 0) + item.quantity;
        });
    });
    
    const sortedCategories = Object.entries(categoryStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
    
    if (sortedCategories.length === 0) {
        topCategories.innerHTML = '<p style="color: #6B7280; text-align: center;">No order data available</p>';
        return;
    }
    
    topCategories.innerHTML = sortedCategories.map(([category, count]) => `
        <div style="display: flex; justify-between; align-items: center; margin-bottom: 0.75rem;">
            <span>${category}</span>
            <span style="font-weight: 500;">${count} orders</span>
        </div>
    `).join('');
}

function loadSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (salesChart) {
        salesChart.destroy();
    }
    
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    
    // Generate last 7 days data
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        
        const dayOrders = orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= date && orderDate < nextDate;
        });
        
        const dayRevenue = dayOrders.reduce((sum, order) => sum + order.total + order.deliveryFee, 0);
        
        last7Days.push({
            date: date.toLocaleDateString('en-US', { weekday: 'short' }),
            revenue: dayRevenue,
            orders: dayOrders.length
        });
    }
    
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days.map(day => day.date),
            datasets: [
                {
                    label: 'Revenue (₦)',
                    data: last7Days.map(day => day.revenue),
                    borderColor: '#FF4D4F',
                    backgroundColor: 'rgba(255, 77, 79, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Orders',
                    data: last7Days.map(day => day.orders),
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Revenue (₦)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Orders'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

// Export Functions
function exportOrdersCSV() {
    const orders = getFromStorage(STORAGE_KEYS.ORDERS) || [];
    
    if (orders.length === 0) {
        showToast('No orders to export', 'warning');
        return;
    }
    
    const csvData = orders.map(order => ({
        id: order.id,
        date: new Date(order.createdAt).toISOString(),
        total: order.total + order.deliveryFee,
        status: order.status,
        items: order.items.length,
        area: order.address.area
    }));
    
    const csv = [
        'Order ID,Date,Total,Status,Items,Area',
        ...csvData.map(row => 
            `${row.id},${row.date},${row.total},${row.status},${row.items},${row.area}`
        )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foodpick-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Orders exported successfully!', 'success');
}

// Utility Functions
function bumpMenuVersion() {
    const meta = getFromStorage(STORAGE_KEYS.META) || { menuVersion: 1, lastSeedAt: '' };
    meta.menuVersion += 1;
    setToStorage(STORAGE_KEYS.META, meta);
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

    // Seed some demo orders
    const orders = [
        {
            id: Date.now().toString(),
            items: [
                {
                    id: '1-regular-',
                    menuItem: menu[0],
                    quantity: 2,
                    selectedVariant: 'Regular',
                    selectedAddOns: ['Extra Chicken'],
                    totalPrice: 4300
                }
            ],
            total: 8600,
            deliveryFee: 500,
            address: {
                id: '1',
                label: 'Home',
                street: '123 Main Street',
                area: 'Effurun',
                landmark: 'Near Market',
                phone: '+234 813 456 7890',
                whatsapp: '+234 813 456 7890',
                isDefault: true,
                zone: 'A'
            },
            status: 'preparing',
            createdAt: new Date().toISOString()
        }
    ];

    setToStorage(STORAGE_KEYS.MENU, menu);
    setToStorage(STORAGE_KEYS.COUPONS, coupons);
    setToStorage(STORAGE_KEYS.ORDERS, orders);
    setToStorage(STORAGE_KEYS.META, { menuVersion: 1, lastSeedAt: now });
    
    // Reload current tab
    loadAdminStats();
    switch (currentAdminTab) {
        case 'menu':
            loadMenuTab();
            break;
        case 'orders':
            loadOrdersTab();
            break;
        case 'coupons':
            loadCouponsTab();
            break;
        case 'analytics':
            loadAnalyticsTab();
            break;
    }
    
    showToast('Demo data seeded successfully!', 'success');
}

function clearAllData() {
    if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) return;
    
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    
    // Reload dashboard
    loadAdminStats();
    switch (currentAdminTab) {
        case 'menu':
            loadMenuTab();
            break;
        case 'orders':
            loadOrdersTab();
            break;
        case 'coupons':
            loadCouponsTab();
            break;
        case 'analytics':
            loadAnalyticsTab();
            break;
    }
    
    showToast('All data cleared!', 'info');
}

// Modal Management
function closeAdminModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
    
    editingMenuItem = null;
    editingCoupon = null;
}

// Initialize admin app when DOM is loaded
document.addEventListener('DOMContentLoaded', initAdminApp);