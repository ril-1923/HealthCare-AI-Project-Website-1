// Healthcare Website JavaScript
class HealthcareWebsite {
    constructor() {
        this.initializeEventListeners();
        this.initializeAnimations();
        this.initializeFormValidation();
        this.setupServiceFiltering();
        this.setupDateConstraints();
    }

    initializeEventListeners() {
        // Newsletter subscription
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubscription(e));
        }

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }

        // Feedback form
        const feedbackForm = document.getElementById('feedbackForm');
        if (feedbackForm) {
            feedbackForm.addEventListener('submit', (e) => this.handleFeedbackForm(e));
        }

        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLoginForm(e));
        }

        // Registration form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegistrationForm(e));
        }

        // Appointment form
        const appointmentForm = document.getElementById('appointmentForm');
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', (e) => this.handleAppointmentForm(e));
        }

        // Mobile menu toggle
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler) {
            navbarToggler.addEventListener('click', this.toggleMobileMenu);
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.smoothScroll);
        });

        // Service filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterServices(e));
        });
    }

    initializeAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.service-card, .doctor-card, .testimonial-card, .contact-card, .resource-card'
        );
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    initializeFormValidation() {
        // Custom validation for all forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            });
        });

        // Password confirmation validation
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const passwordInput = document.getElementById('regPassword');
        
        if (confirmPasswordInput && passwordInput) {
            confirmPasswordInput.addEventListener('input', () => {
                if (confirmPasswordInput.value !== passwordInput.value) {
                    confirmPasswordInput.setCustomValidity("Passwords don't match");
                } else {
                    confirmPasswordInput.setCustomValidity('');
                }
            });
        }
    }

    setupServiceFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const serviceItems = document.querySelectorAll('.service-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter services
                serviceItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    setupDateConstraints() {
        // Set minimum date for appointments to today
        const appointmentDateInput = document.getElementById('appointmentDate');
        if (appointmentDateInput) {
            const today = new Date().toISOString().split('T')[0];
            appointmentDateInput.setAttribute('min', today);
        }

        // Set maximum date for feedback visit date to today
        const visitDateInput = document.getElementById('visitDate');
        if (visitDateInput) {
            const today = new Date().toISOString().split('T')[0];
            visitDateInput.setAttribute('max', today);
        }
    }

    handleNewsletterSubscription(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Simulate API call
        this.showNotification('Thank you for subscribing! You will receive our health newsletter.', 'success');
        e.target.reset();
    }

    handleContactForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Thank you for your message! We will respond within 24 hours.', 'success');
            e.target.reset();
            e.target.classList.remove('was-validated');
        }, 1000);
    }

    handleFeedbackForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const rating = formData.get('rating');
        
        if (!rating) {
            this.showNotification('Please provide a rating before submitting.', 'error');
            return;
        }
        
        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Thank you for your valuable feedback! It helps us improve our services.', 'success');
            e.target.reset();
            e.target.classList.remove('was-validated');
            
            // Reset star rating
            document.querySelectorAll('input[name="rating"]').forEach(input => {
                input.checked = false;
            });
        }, 1000);
    }

    handleLoginForm(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simulate login process
        this.showLoadingState(e.target.querySelector('button[type="submit"]'));
        
        setTimeout(() => {
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            modal.hide();
            
            this.showNotification(`Welcome back! You have successfully logged in.`, 'success');
            this.resetLoadingState(e.target.querySelector('button[type="submit"]'));
            e.target.reset();
        }, 1500);
    }

    handleRegistrationForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Simulate registration process
        this.showLoadingState(e.target.querySelector('button[type="submit"]'));
        
        setTimeout(() => {
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            modal.hide();
            
            this.showNotification('Registration successful! Welcome to MediCare Plus.', 'success');
            this.resetLoadingState(e.target.querySelector('button[type="submit"]'));
            e.target.reset();
            e.target.classList.remove('was-validated');
        }, 2000);
    }

    handleAppointmentForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const patientName = formData.get('patientName') || 'Patient';
        const department = formData.get('department');
        const date = formData.get('appointmentDate');
        const time = formData.get('appointmentTime');
        
        // Simulate appointment booking
        this.showLoadingState(e.target.querySelector('button[type="submit"]'));
        
        setTimeout(() => {
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('appointmentModal'));
            modal.hide();
            
            this.showNotification(
                `Appointment booked successfully for ${patientName} on ${date} at ${time}. Confirmation details will be sent to your email.`,
                'success'
            );
            this.resetLoadingState(e.target.querySelector('button[type="submit"]'));
            e.target.reset();
            e.target.classList.remove('was-validated');
        }, 2000);
    }

    filterServices(e) {
        const filter = e.target.getAttribute('data-filter');
        const serviceItems = document.querySelectorAll('.service-item');
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Filter services with animation
        serviceItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                }, index * 100);
            } else {
                item.style.animation = 'none';
                item.style.display = 'none';
            }
        });
    }

    smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    toggleMobileMenu() {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('navbar-expanded');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show notification-toast`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Add styles for positioning
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1060;
            max-width: 400px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || icons.info;
    }

    showLoadingState(button) {
        const originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
        
        // Store original text for reset
        button.setAttribute('data-original-text', originalText);
    }

    resetLoadingState(button) {
        const originalText = button.getAttribute('data-original-text');
        button.disabled = false;
        button.innerHTML = originalText;
        button.removeAttribute('data-original-text');
    }

    // Utility method for mobile detection
    isMobile() {
        return window.innerWidth <= 768;
    }

    // Utility method for form validation
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    // Handle window resize for responsive features
    handleResize() {
        if (this.isMobile()) {
            // Mobile-specific adjustments
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }
}

// Navbar scroll effect
class NavbarScrollEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('navbar-scrolled');
            } else {
                this.navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}

// Statistics counter animation
class StatsCounter {
    constructor() {
        this.initCounters();
    }

    initCounters() {
        const stats = document.querySelectorAll('.stat-item h3');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = number + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main website functionality
    const website = new HealthcareWebsite();
    
    // Initialize navbar scroll effect
    const navbarEffect = new NavbarScrollEffect();
    
    // Initialize stats counter
    const statsCounter = new StatsCounter();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        website.handleResize();
    });
    
    // Initial resize call
    website.handleResize();
    
    console.log('MediCare Plus website initialized successfully');
});

// Service worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            this.alt = 'Image not available';
        });
    });
});

// GDPR Cookie consent (basic implementation)
class CookieConsent {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem('cookieConsent')) {
            this.showConsentBanner();
        }
    }

    showConsentBanner() {
        const banner = document.createElement('div');
        banner.innerHTML = `
            <div class="cookie-consent-banner">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <p class="mb-0">
                                <i class="fas fa-cookie-bite me-2"></i>
                                We use cookies to enhance your experience and provide personalized healthcare services.
                                <a href="#" class="text-white">Learn more</a>
                            </p>
                        </div>
                        <div class="col-md-4 text-md-end">
                            <button class="btn btn-light btn-sm me-2" onclick="cookieConsent.acceptCookies()">Accept</button>
                            <button class="btn btn-outline-light btn-sm" onclick="cookieConsent.declineCookies()">Decline</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .cookie-consent-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, var(--primary-blue), var(--secondary-teal));
                color: white;
                padding: 1rem;
                z-index: 1050;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(banner);
    }

    acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        this.hideBanner();
    }

    declineCookies() {
        localStorage.setItem('cookieConsent', 'declined');
        this.hideBanner();
    }

    hideBanner() {
        const banner = document.querySelector('.cookie-consent-banner');
        if (banner) {
            banner.remove();
        }
    }
}

// Initialize cookie consent
const cookieConsent = new CookieConsent();

// Accessibility enhancements
class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        // Add skip to content link
        this.addSkipLink();
        
        // Enhance keyboard navigation
        this.enhanceKeyboardNavigation();
        
        // Add ARIA labels where needed
        this.addAriaLabels();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        
        const style = document.createElement('style');
        style.textContent = `
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--primary-blue);
                color: white;
                padding: 8px;
                text-decoration: none;
                z-index: 1000;
                border-radius: 4px;
            }
            .skip-link:focus {
                top: 6px;
            }
        `;
        
        document.head.appendChild(style);
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceKeyboardNavigation() {
        // Make cards keyboard accessible
        const cards = document.querySelectorAll('.service-card, .doctor-card, .testimonial-card');
        cards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const link = card.querySelector('a, button');
                    if (link) link.click();
                }
            });
        });
    }

    addAriaLabels() {
        // Add ARIA labels to interactive elements
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.textContent.trim()) {
                const icon = button.querySelector('i');
                if (icon && icon.className.includes('fa-user')) {
                    button.setAttribute('aria-label', 'User login');
                } else if (icon && icon.className.includes('fa-calendar')) {
                    button.setAttribute('aria-label', 'Book appointment');
                }
            }
        });
    }
}

// Initialize accessibility enhancements
const accessibilityEnhancements = new AccessibilityEnhancements();