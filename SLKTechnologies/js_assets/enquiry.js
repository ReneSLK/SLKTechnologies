// Enquiry Form Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    // Add focus animations
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your solar enquiry! Our team will contact you within 48 hours to schedule your assessment.');
    });
});


//Mobile navigation code
document.addEventListener('DOMContentLoaded', function() {
    const headerContent = document.querySelector('.header-content');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (headerContent && navButtons) {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
        
        const logoSection = document.querySelector('.logo-section');
        if (logoSection) {
            logoSection.parentNode.insertBefore(mobileToggle, logoSection.nextSibling);
        }
        
        mobileToggle.addEventListener('click', function() {
            navButtons.classList.toggle('mobile-open');
            this.innerHTML = navButtons.classList.contains('mobile-open') ? '✕' : '☰';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!headerContent.contains(e.target) && navButtons.classList.contains('mobile-open')) {
                navButtons.classList.remove('mobile-open');
                mobileToggle.innerHTML = '☰';
            }
        });
    }
});