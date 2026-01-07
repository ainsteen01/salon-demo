// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // ===== STICKY NAVBAR =====
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== MENU FILTERING =====
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-category');
            
            menuItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===== FORM VALIDATION & SUBMISSION =====
    const bookingForm = document.getElementById('bookingForm');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            let isValid = true;
            bookingForm.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                bookingForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Table booked successfully! We will confirm via email.', 'success');
                
                // Log data (in real app, send to server)
                console.log('Booking Data:', data);
            }, 2000);
        });
    }
    
    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            emailInput.value = '';
            showNotification('Thank you for subscribing!', 'success');
        });
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto-remove after 5 seconds
        const autoRemove = setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
    
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== IMAGE LAZY LOADING =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ===== FORM INPUT ANIMATIONS =====
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check initial value
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // ===== SET MIN DATE FOR RESERVATION =====
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Set default to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }
    
    // ===== HERO TEXT ANIMATION =====
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroFeatures = document.querySelector('.hero-features');
    
    // Trigger animations on load
    setTimeout(() => {
        heroTitle?.classList.add('animate');
        heroSubtitle?.classList.add('animate');
        heroButtons?.classList.add('animate');
        heroFeatures?.classList.add('animate');
    }, 500);
    
    // ===== COUNTER ANIMATION FOR STATS =====
    const stats = document.querySelectorAll('.stat h4');
    
    const countUp = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
        }, 20);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.textContent) || 0;
                countUp(stat, target);
                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
    
    // ===== ADD NOTIFICATION STYLES =====
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: var(--secondary);
            color: white;
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            gap: 12px;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 9999;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background: #27ae60;
        }
        
        .notification.error {
            background: #e74c3c;
        }
        
        .notification.warning {
            background: #f39c12;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            margin-left: auto;
        }
        
        .form-group.focused i {
            color: var(--primary);
        }
        
        .form-group.focused input,
        .form-group.focused select,
        .form-group.focused textarea {
            border-color: var(--primary);
        }
    `;
    document.head.appendChild(style);
    
    // ===== UTILITY FUNCTIONS =====
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Initialize on load
    setTimeout(() => {
        console.log('Nexus Restaurant website loaded successfully!');
    }, 1000);
});