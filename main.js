
// Configuration
let siteConfig = {};

// DOM Elements
const pricingContainer = document.getElementById('pricing-container');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Initialize site
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadConfiguration();
    initializeAnimations();
    initializeFAQ();
});

// Load configuration from JSON
async function loadConfiguration() {
    try {
        const response = await fetch('data/config.json');
        siteConfig = await response.json();
        renderPricing();
        updateAnalytics();
    } catch (error) {
        console.error('Error loading configuration:', error);
        loadFallbackConfig();
    }
}

// Fallback configuration if JSON fails to load
function loadFallbackConfig() {
    siteConfig = {
        pricing: [
            {
                quantity: 1,
                price: 199,
                shipping: 89,
                popular: false,
                stripeLink: "https://buy.stripe.com/example1",
                mercadoPagoLink: "https://www.mercadopago.com.mx/example1"
            },
            {
                quantity: 2,
                price: 360,
                shipping: 99,
                popular: true,
                stripeLink: "https://buy.stripe.com/example2",
                mercadoPagoLink: "https://www.mercadopago.com.mx/example2"
            },
            {
                quantity: 3,
                price: 510,
                shipping: 0,
                popular: false,
                stripeLink: "https://buy.stripe.com/example3",
                mercadoPagoLink: "https://www.mercadopago.com.mx/example3"
            }
        ],
        analytics: {
            googleAnalyticsId: "GA_MEASUREMENT_ID"
        }
    };
    renderPricing();
}

// Render pricing cards
function renderPricing() {
    if (!pricingContainer || !siteConfig.pricing) return;

    pricingContainer.innerHTML = '';

    siteConfig.pricing.forEach(item => {
        const card = createPricingCard(item);
        pricingContainer.appendChild(card);
    });
}

// Create pricing card element
function createPricingCard(item) {
    const card = document.createElement('div');
    card.className = `pricing-card ${item.popular ? 'popular' : ''}`;

    const unitText = item.quantity === 1 ? 'unidad' : 'unidades';
    const pricePerUnit = Math.round(item.price / item.quantity);
    const shippingText = item.shipping === 0 
        ? '<span class="pricing-shipping free">🚚 Envío GRATIS</span>' 
        : `<span class="pricing-shipping">+ $${item.shipping} MXN envío</span>`;

    card.innerHTML = `
        <div class="pricing-quantity">${item.quantity}</div>
        <h3>${item.quantity} ${unitText}</h3>
        <div class="pricing-price">$${item.price} MXN</div>
        <div class="pricing-unit">$${pricePerUnit} por unidad</div>
        ${shippingText}
        <ul class="pricing-features">
            <li>
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                </svg>
                Magnesia 98% pura
            </li>
            <li>
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                </svg>
                ${item.quantity * 100}g total
            </li>
            <li>
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                </svg>
                ${item.quantity * 10}-${item.quantity * 15} sesiones aprox.
            </li>
            ${item.shipping === 0 ? `
            <li>
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                </svg>
                Envío gratuito
            </li>
            ` : ''}
        </ul>
        <div class="pricing-buttons">
            <button class="btn btn-primary" onclick="handleStripePayment('${item.stripeLink || '#'}', ${item.quantity})">
                <svg viewBox="0 0 24 24" class="btn-icon">
                    <path fill="currentColor" d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.11,4 20,4Z"/>
                </svg>
                Pagar con Stripe
            </button>
            <button class="btn btn-secondary" onclick="handleMercadoPagoPayment('${item.mercadoPagoLink || '#'}', ${item.quantity})">
                <svg viewBox="0 0 24 24" class="btn-icon">
                    <path fill="currentColor" d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M15.5,11L14,9.5L10.5,13L9,11.5L7.5,13L10.5,16L15.5,11Z"/>
                </svg>
                MercadoPago
            </button>
        </div>
    `;

    return card;
}

// Navigation functions
function initializeNavigation() {
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Payment handling
function handleStripePayment(stripeLink, quantity) {
    // Track payment attempt
    trackEvent('payment_attempt', {
        payment_method: 'stripe',
        quantity: quantity,
        value: siteConfig.pricing.find(p => p.quantity === quantity)?.price || 0
    });

    if (stripeLink === '#' || !stripeLink) {
        alert('¡Pronto habilitaremos los pagos! Mientras tanto, contáctanos por WhatsApp.');
        return;
    }

    // Open Stripe payment link
    window.open(stripeLink, '_blank', 'noopener,noreferrer');
}

function handleMercadoPagoPayment(mercadoPagoLink, quantity) {
    // Track payment attempt
    trackEvent('payment_attempt', {
        payment_method: 'mercadopago',
        quantity: quantity,
        value: siteConfig.pricing.find(p => p.quantity === quantity)?.price || 0
    });

    if (mercadoPagoLink === '#' || !mercadoPagoLink) {
        alert('¡Pronto habilitaremos los pagos! Mientras tanto, contáctanos por WhatsApp.');
        return;
    }

    // Open MercadoPago payment link
    window.open(mercadoPagoLink, '_blank', 'noopener,noreferrer');
}

// FAQ functionality
function initializeFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => toggleFaq(question));
    });
}

function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Image showcase functionality
function changeMainImage(thumbnail) {
    const mainImage = document.querySelector('.showcase-main img');
    if (mainImage && thumbnail.src) {
        mainImage.src = thumbnail.src;
        mainImage.alt = thumbnail.alt;
        
        // Update thumbnail states
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbnail.classList.add('active');
    }
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(el => {
        observer.observe(el);
    });
}

// Web Share API functionality
function shareProduct() {
    if (navigator.share) {
        navigator.share({
            title: 'Summit Origins - Magnesia Premium para Escalada',
            text: 'Magnesia de 98% de pureza para escaladores exigentes. Formato 100g ideal para gimnasios.',
            url: window.location.href
        }).then(() => {
            trackEvent('share_success', {
                method: 'web_share_api'
            });
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    // Copy URL to clipboard as fallback
    const url = window.location.href;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('¡URL copiada al portapapeles!');
            trackEvent('share_success', {
                method: 'clipboard'
            });
        });
    } else {
        // Older browsers fallback
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('¡URL copiada al portapapeles!');
            trackEvent('share_success', {
                method: 'execCommand'
            });
        } catch (err) {
            console.log('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
    }
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Analytics functions
function updateAnalytics() {
    if (siteConfig.analytics?.googleAnalyticsId && siteConfig.analytics.googleAnalyticsId !== 'GA_MEASUREMENT_ID') {
        // Update Google Analytics ID
        const scripts = document.querySelectorAll('script[src*="googletagmanager"]');
        scripts.forEach(script => {
            script.src = script.src.replace('GA_MEASUREMENT_ID', siteConfig.analytics.googleAnalyticsId);
        });

        // Update gtag config
        if (window.gtag) {
            gtag('config', siteConfig.analytics.googleAnalyticsId);
        }
    }
}

function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (window.gtag) {
        gtag('event', eventName, parameters);
    }

    // Console log for debugging
    console.log('Event tracked:', eventName, parameters);

    // You can add other analytics providers here
    // Example: Facebook Pixel, Hotjar, etc.
}

// Contact functions
function openWhatsApp() {
    const message = encodeURIComponent('Hola! Me interesa la magnesia Summit Origins. ¿Podrían darme más información?');
    const whatsappUrl = `https://wa.me/525512345678?text=${message}`;
    
    trackEvent('contact_attempt', {
        method: 'whatsapp'
    });
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send error reports to a service here
});

// Performance monitoring
window.addEventListener('load', function() {
    // Track page load time
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        trackEvent('page_load_time', {
            value: Math.round(loadTime)
        });
    }
});

// Prevent right-click on images (optional - for product protection)
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG' && e.target.src.includes('cdn.abacus.ai')) {
        e.preventDefault();
        return false;
    }
});

// Lazy loading for images (modern browsers)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Service Worker registration (for PWA capabilities - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadConfiguration,
        createPricingCard,
        toggleFaq,
        trackEvent,
        shareProduct
    };
}
