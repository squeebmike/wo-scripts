/* ==============================================
   Walk-Off Sports Cards - Complete JavaScript
   ============================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // TEAM PERSONALIZATION SYSTEM
    // ===========================================
    
    const teamData = {
        'angels': { name: 'Angels', logo: '😇', colors: { primary: '#BA0021', secondary: '#003263', accent: '#C4CED4' }},
        'astros': { name: 'Astros', logo: '⭐', colors: { primary: '#002D62', secondary: '#EB6E1F', accent: '#F4911E' }},
        'athletics': { name: 'Athletics', logo: '🟢', colors: { primary: '#003831', secondary: '#EFB21E', accent: '#A2AAAD' }},
        'blue-jays': { name: 'Blue Jays', logo: '🔵', colors: { primary: '#134A8E', secondary: '#1D2D5C', accent: '#E8291C' }},
        'braves': { name: 'Braves', logo: '🪓', colors: { primary: '#CE1141', secondary: '#13274F', accent: '#EAAA00' }},
        'brewers': { name: 'Brewers', logo: '🍺', colors: { primary: '#12284B', secondary: '#FFC52F', accent: '#87CEEB' }},
        'cardinals': { name: 'Cardinals', logo: '🐦', colors: { primary: '#C41E3A', secondary: '#FEDB00', accent: '#000000' }},
        'cubs': { name: 'Cubs', logo: '🐻', colors: { primary: '#0E3386', secondary: '#CC3433', accent: '#FFFFFF' }},
        'diamondbacks': { name: 'D-backs', logo: '🐍', colors: { primary: '#A71930', secondary: '#E3D4A7', accent: '#000000' }},
        'dodgers': { name: 'Dodgers', logo: '⚾', colors: { primary: '#005A9C', secondary: '#FFFFFF', accent: '#A5ACAF' }},
        'giants': { name: 'Giants', logo: '🧡', colors: { primary: '#FD5A1E', secondary: '#27251F', accent: '#EFD19F' }},
        'guardians': { name: 'Guardians', logo: '⚔️', colors: { primary: '#E50022', secondary: '#0C2340', accent: '#A2AAAD' }},
        'mariners': { name: 'Mariners', logo: '⚓', colors: { primary: '#0C2C56', secondary: '#005C5C', accent: '#C4CED4' }},
        'marlins': { name: 'Marlins', logo: '🐟', colors: { primary: '#00A3E0', secondary: '#EF3340', accent: '#41748D' }},
        'mets': { name: 'Mets', logo: '🟠', colors: { primary: '#002D72', secondary: '#FF5910', accent: '#C4CED4' }},
        'nationals': { name: 'Nationals', logo: '🦅', colors: { primary: '#AB0003', secondary: '#14225A', accent: '#C4CED4' }},
        'orioles': { name: 'Orioles', logo: '🐦‍⬛', colors: { primary: '#DF4601', secondary: '#000000', accent: '#FFFFFF' }},
        'padres': { name: 'Padres', logo: '🌴', colors: { primary: '#2F241D', secondary: '#FFC425', accent: '#A0AAB2' }},
        'phillies': { name: 'Phillies', logo: '🔔', colors: { primary: '#E81828', secondary: '#002D72', accent: '#C4CED4' }},
        'pirates': { name: 'Pirates', logo: '🏴‍☠️', colors: { primary: '#FDB827', secondary: '#27251F', accent: '#A2AAAD' }},
        'rangers': { name: 'Rangers', logo: '🤠', colors: { primary: '#003278', secondary: '#C0111F', accent: '#C4CED4' }},
        'rays': { name: 'Rays', logo: '☀️', colors: { primary: '#092C5C', secondary: '#8FBCE6', accent: '#F5D130' }},
        'red-sox': { name: 'Red Sox', logo: '🧦', colors: { primary: '#BD3039', secondary: '#0C2340', accent: '#C4CED4' }},
        'reds': { name: 'Reds', logo: '🔴', colors: { primary: '#C6011F', secondary: '#000000', accent: '#FFFFFF' }},
        'rockies': { name: 'Rockies', logo: '🏔️', colors: { primary: '#33006F', secondary: '#C4CED4', accent: '#000000' }},
        'royals': { name: 'Royals', logo: '👑', colors: { primary: '#004687', secondary: '#C09A5B', accent: '#FFFFFF' }},
        'tigers': { name: 'Tigers', logo: '🐅', colors: { primary: '#0C2340', secondary: '#FA4616', accent: '#FFFFFF' }},
        'twins': { name: 'Twins', logo: '👯', colors: { primary: '#002B5C', secondary: '#D31145', accent: '#CFAB7A' }},
        'white-sox': { name: 'White Sox', logo: '⚪', colors: { primary: '#27251F', secondary: '#C4CED4', accent: '#000000' }},
        'yankees': { name: 'Yankees', logo: '🗽', colors: { primary: '#132448', secondary: '#C4CED4', accent: '#FFFFFF' }}
    };

    // Team Selection Modal
    function createTeamModal() {
        const modal = document.createElement('div');
        modal.className = 'team-modal';
        modal.id = 'teamModal';
        
        const content = document.createElement('div');
        content.className = 'team-modal__content';
        
        content.innerHTML = `
            <h2 class="team-modal__title">Pick Your Team</h2>
            <p class="team-modal__subtitle">Choose your favorite team to personalize your experience</p>
            <div class="team-grid" id="teamGrid">
                ${Object.entries(teamData).map(([key, team]) => `
                    <div class="team-option" data-team="${key}">
                        <div class="team-logo">${team.logo}</div>
                        <div class="team-name">${team.name}</div>
                    </div>
                `).join('')}
            </div>
            <div class="modal-actions">
                <button class="btn btn--ghost" id="skipTeamSelection">Skip for now</button>
                <button class="btn btn--primary" id="confirmTeamSelection" disabled>Set as My Team</button>
            </div>
        `;
        
        modal.appendChild(content);
        return modal;
    }

    // Team Selection Logic
    function initTeamPersonalization() {
        const savedTeam = localStorage.getItem('walkoff-selected-team');
        
        // Show modal on first visit
        if (!savedTeam) {
            const modal = createTeamModal();
            document.body.appendChild(modal);
            
            let selectedTeamKey = null;
            const confirmButton = modal.querySelector('#confirmTeamSelection');
            
            // Team selection handling
            modal.querySelectorAll('.team-option').forEach(option => {
                option.addEventListener('click', function() {
                    // Remove previous selection
                    modal.querySelectorAll('.team-option').forEach(opt => opt.classList.remove('selected'));
                    
                    // Add selection to clicked option
                    this.classList.add('selected');
                    selectedTeamKey = this.dataset.team;
                    confirmButton.disabled = false;
                });
            });
            
            // Confirm team selection
            confirmButton.addEventListener('click', function() {
                if (selectedTeamKey) {
                    applyTeamTheme(selectedTeamKey);
                    localStorage.setItem('walkoff-selected-team', selectedTeamKey);
                    modal.remove();
                }
            });
            
            // Skip team selection
            modal.querySelector('#skipTeamSelection').addEventListener('click', function() {
                modal.remove();
            });
        } else {
            // Apply saved team theme
            applyTeamTheme(savedTeam);
        }
        
        // Add "Change Team" button to navbar if team is selected
        if (savedTeam && document.querySelector('.navbar__team-btn')) {
            const teamBtn = document.querySelector('.navbar__team-btn');
            teamBtn.textContent = `${teamData[savedTeam].name} Fan`;
            teamBtn.addEventListener('click', function() {
                const modal = createTeamModal();
                document.body.appendChild(modal);
                
                // Pre-select current team
                const currentOption = modal.querySelector(`[data-team="${savedTeam}"]`);
                if (currentOption) {
                    currentOption.classList.add('selected');
                    modal.querySelector('#confirmTeamSelection').disabled = false;
                }
                
                // Handle new selection (same as above)
                let selectedTeamKey = savedTeam;
                const confirmButton = modal.querySelector('#confirmTeamSelection');
                
                modal.querySelectorAll('.team-option').forEach(option => {
                    option.addEventListener('click', function() {
                        modal.querySelectorAll('.team-option').forEach(opt => opt.classList.remove('selected'));
                        this.classList.add('selected');
                        selectedTeamKey = this.dataset.team;
                        confirmButton.disabled = false;
                    });
                });
                
                confirmButton.addEventListener('click', function() {
                    applyTeamTheme(selectedTeamKey);
                    localStorage.setItem('walkoff-selected-team', selectedTeamKey);
                    teamBtn.textContent = `${teamData[selectedTeamKey].name} Fan`;
                    modal.remove();
                });
                
                modal.querySelector('#skipTeamSelection').addEventListener('click', function() {
                    modal.remove();
                });
            });
        }
    }

    // Apply team theme to page
    function applyTeamTheme(teamKey) {
        const team = teamData[teamKey];
        if (!team) return;
        
        // Remove existing team classes
        document.body.className = document.body.className.replace(/team-\w+/g, '');
        
        // Add new team class
        document.body.classList.add(`team-${teamKey}`);
        
        // Update CSS custom properties for immediate effect
        const root = document.documentElement;
        root.style.setProperty('--team-primary', team.colors.primary);
        root.style.setProperty('--team-secondary', team.colors.secondary);
        root.style.setProperty('--team-accent', team.colors.accent);
    }

    // ===========================================
    // PRODUCT FILTERING SYSTEM
    // ===========================================
    
    function initProductFiltering() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        const productCards = document.querySelectorAll('[data-category]');
        const searchInput = document.querySelector('[data-search-products]');
        const sortSelect = document.querySelector('[data-sort-products]');

        // Filter by category
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('is-active'));
                this.classList.add('is-active');
                
                const filterValue = this.dataset.filter;
                
                productCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.classList.add('animate-fadeIn');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('animate-fadeIn');
                    }
                });
            });
        });

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                productCards.forEach(card => {
                    const searchTerms = (card.dataset.searchTerms || '').toLowerCase();
                    const productTitle = card.querySelector('.product-card__title');
                    const titleText = productTitle ? productTitle.textContent.toLowerCase() : '';
                    
                    if (searchTerms.includes(searchTerm) || titleText.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }

        // Sort functionality
        if (sortSelect) {
            // Add sort options
            sortSelect.innerHTML = `
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
            `;
            
            sortSelect.addEventListener('change', function() {
                const sortValue = this.value;
                const container = document.querySelector('.product-grid');
                if (!container) return;
                
                const cards = Array.from(productCards);
                
                cards.sort((a, b) => {
                    const aTitle = a.querySelector('.product-card__title')?.textContent || '';
                    const bTitle = b.querySelector('.product-card__title')?.textContent || '';
                    const aPrice = parseFloat(a.querySelector('.product-card__price')?.textContent.replace('$', '') || '0');
                    const bPrice = parseFloat(b.querySelector('.product-card__price')?.textContent.replace('$', '') || '0');
                    
                    switch(sortValue) {
                        case 'name-asc':
                            return aTitle.localeCompare(bTitle);
                        case 'name-desc':
                            return bTitle.localeCompare(aTitle);
                        case 'price-low':
                            return aPrice - bPrice;
                        case 'price-high':
                            return bPrice - aPrice;
                        default:
                            return 0;
                    }
                });
                
                // Reorder DOM elements
                cards.forEach(card => container.appendChild(card));
            });
        }
    }

    // ===========================================
    // MOBILE NAVIGATION
    // ===========================================
    
    function initMobileNavigation() {
        const mobileToggle = document.querySelector('.navbar__mobile-toggle');
        const navLinks = document.querySelector('.navbar__links');
        
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', function() {
                navLinks.classList.toggle('is-open');
                
                // Update toggle icon
                const icon = this.querySelector('i') || this;
                if (navLinks.classList.contains('is-open')) {
                    icon.innerHTML = '✕';
                } else {
                    icon.innerHTML = '☰';
                }
            });
            
            // Close menu when clicking links
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('is-open');
                    mobileToggle.innerHTML = '☰';
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('is-open');
                    mobileToggle.innerHTML = '☰';
                }
            });
        }
    }

    // ===========================================
    // ENHANCED FEATURES
    // ===========================================
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Loading states for async actions
    function showLoading(element) {
        const originalText = element.textContent;
        element.textContent = 'Loading...';
        element.disabled = true;
        
        return function hideLoading() {
            element.textContent = originalText;
            element.disabled = false;
        };
    }

    // Form validation and submission
    function initFormHandling() {
        const forms = document.querySelectorAll('form[data-walkoff-form]');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitButton = form.querySelector('[type="submit"]');
                const hideLoading = showLoading(submitButton);
                
                // Basic form validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.style.borderColor = '#ef4444';
                        isValid = false;
                    } else {
                        field.style.borderColor = '#d1d5db';
                    }
                });
                
                if (isValid) {
                    // Simulate form submission
                    setTimeout(() => {
                        hideLoading();
                        
                        // Show success message
                        const successDiv = document.createElement('div');
                        successDiv.style.cssText = `
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            background: #10b981;
                            color: white;
                            padding: 1rem 1.5rem;
                            border-radius: 0.5rem;
                            font-weight: 600;
                            z-index: 1000;
                        `;
                        successDiv.textContent = 'Form submitted successfully!';
                        document.body.appendChild(successDiv);
                        
                        // Remove success message after 3 seconds
                        setTimeout(() => successDiv.remove(), 3000);
                        
                        // Reset form
                        form.reset();
                    }, 1500);
                } else {
                    hideLoading();
                }
            });
        });
    }

    // Add to cart functionality (placeholder)
    function initAddToCart() {
        document.addEventListener('click', function(e) {
            if (e.target.matches('[data-add-to-cart]') || e.target.closest('[data-add-to-cart]')) {
                e.preventDefault();
                
                const button = e.target.matches('[data-add-to-cart]') ? e.target : e.target.closest('[data-add-to-cart]');
                const productCard = button.closest('.product-card');
                const productName = productCard?.querySelector('.product-card__title')?.textContent || 'Product';
                
                // Animate button
                const originalText = button.textContent;
                button.textContent = 'Added!';
                button.style.background = '#10b981';
                
                // Show notification
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--team-primary);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    z-index: 1000;
                    animation: slideIn 0.3s ease-out;
                `;
                notification.textContent = `${productName} added to cart!`;
                document.body.appendChild(notification);
                
                // Reset button and remove notification
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    notification.remove();
                }, 2000);
            }
        });
    }

    // Image lazy loading
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Theme switching based on time of day
    function initAutoTheme() {
        const hour = new Date().getHours();
        const isDarkTime = hour < 7 || hour > 19;
        
        if (isDarkTime && !localStorage.getItem('walkoff-selected-team')) {
            document.body.style.filter = 'brightness(0.9) contrast(1.1)';
        }
    }

    // Performance monitoring
    function initPerformanceTracking() {
        // Track page load time
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
        
        // Track interaction timing
        document.addEventListener('click', function(e) {
            if (e.target.matches('.btn') || e.target.closest('.btn')) {
                const startTime = performance.now();
                
                requestAnimationFrame(() => {
                    const endTime = performance.now();
                    const interactionTime = endTime - startTime;
                    
                    if (interactionTime > 16) { // More than one frame
                        console.log(`Button interaction took ${interactionTime.toFixed(2)}ms`);
                    }
                });
            }
        });
    }

    // ===========================================
    // INITIALIZATION
    // ===========================================
    
    // Initialize all features
    initTeamPersonalization();
    initProductFiltering();
    initMobileNavigation();
    initSmoothScrolling();
    initFormHandling();
    initAddToCart();
    initLazyLoading();
    initAutoTheme();
    
    // Initialize performance tracking in development
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('staging')) {
        initPerformanceTracking();
    }
    
    // Global error handling
    window.addEventListener('error', function(e) {
        console.error('Walk-Off JS Error:', e.error);
    });
    
    // Service worker registration (if available)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
        });
    }
    
    console.log('🎾 Walk-Off Sports Cards - JavaScript loaded successfully! ⚾');
});
