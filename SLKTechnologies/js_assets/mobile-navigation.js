// Mobile Navigation Enhancement for SLK Technologies
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button
    const headerContent = document.querySelector('.header-content');
    const navButtons = document.querySelector('.nav-buttons');
    
    // Only add mobile functionality if conditions are met
    if (headerContent && navButtons) {
        // Create mobile menu toggle button
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰'; // Hamburger menu icon
        mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
        
        // Insert the toggle button after the logo section
        const logoSection = document.querySelector('.logo-section');
        if (logoSection) {
            logoSection.parentNode.insertBefore(mobileToggle, logoSection.nextSibling);
        }
        
        // Toggle mobile menu
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling
            navButtons.classList.toggle('mobile-open');
            
            // Update toggle icon
            if (navButtons.classList.contains('mobile-open')) {
                mobileToggle.innerHTML = '✕'; // Close icon
                mobileToggle.style.transform = 'rotate(180deg)';
            } else {
                mobileToggle.innerHTML = '☰'; // Hamburger icon
                mobileToggle.style.transform = 'rotate(0deg)';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!headerContent.contains(e.target) && navButtons.classList.contains('mobile-open')) {
                navButtons.classList.remove('mobile-open');
                mobileToggle.innerHTML = '☰';
                mobileToggle.style.transform = 'rotate(0deg)';
            }
        });
        
        // Close mobile menu when window is resized to larger screen
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navButtons.classList.remove('mobile-open');
                mobileToggle.innerHTML = '☰';
                mobileToggle.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // Form handling for different types of forms
    const enquiryForm = document.getElementById('enquiryForm');
    const contactForm = document.getElementById('contactForm');
    
    if (enquiryForm) {
        // Handle solar quote enquiry form
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateEnquiryForm()) {
                return false;
            }
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                propertyAddress: document.getElementById('property-address').value || 'Not provided',
                propertyType: document.getElementById('property-type').value,
                energyBill: document.getElementById('energy-bill').value || 'Not specified',
                roofType: document.getElementById('roof-type').value || 'Not specified',
                systemInterest: document.getElementById('system-interest').value || 'Not specified',
                timeline: document.getElementById('timeline').value || 'Not specified',
                budgetRange: document.getElementById('budget-range').value || 'Not specified',
                additionalInfo: document.getElementById('additional-info').value || 'No additional information provided',
                timestamp: new Date().toLocaleString()
            };
            
            // Generate solar quote email
            generateSolarQuoteEmail(formData);
        });
    }
    
    if (contactForm) {
        // Handle contact form with email functionality
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateContactForm()) {
                return false;
            }
            
            // Collect form data
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                phone: document.getElementById('contact-phone').value || 'Not provided',
                company: document.getElementById('contact-company').value || 'Not provided',
                messageType: document.getElementById('message-type').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value,
                timestamp: new Date().toLocaleString()
            };
            
            // Generate general contact email
            generateContactEmail(formData);
        });
    }
    
    // Validate enquiry form
    function validateEnquiryForm() {
        const requiredFields = ['name', 'email', 'phone', 'property-type'];
        const consent = document.getElementById('quote-consent');
        
        let isValid = true;
        let errorMessage = '';
        
        // Check required fields
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = '#f44336';
                isValid = false;
            } else {
                field.style.borderColor = '#c8e6c9';
            }
        });
        
        // Make sure email format is correct
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#f44336';
            errorMessage += 'Please enter a valid email address.\n';
            isValid = false;
        }
        
        // Make sure phone number format is correct
        const phoneField = document.getElementById('phone');
        if (phoneField.value) {
            const phoneRegex = /^(\+27|0)[1-9]\d{8}$/;
            const cleanPhone = phoneField.value.replace(/[\s\-\(\)]/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                phoneField.style.borderColor = '#f44336';
                errorMessage += 'Please enter a valid South African phone number.\n';
                isValid = false;
            }
        }
        
        // Check consent
        if (!consent.checked) {
            errorMessage += 'Please provide consent for us to contact you.\n';
            isValid = false;
        }
        
        if (!isValid && errorMessage) {
            alert('Please correct the following errors:\n' + errorMessage);
        } else if (!isValid) {
            alert('Please fill in all required fields marked with *');
        }
        
        return isValid;
    }
    
    // Generate and send solar quote email
    function generateSolarQuoteEmail(formData) {
        const submitButton = enquiryForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Preparing Quote Request...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        // Email recipient
        const recipientEmail = 'slkbros@outlook.com';
        
        // Generate email subject
        const emailSubject = `[SOLAR QUOTE REQUEST] ${formData.propertyType.toUpperCase()} - ${formData.name}`;
        
        // Generate email body
        const emailBody = `
Dear SLK Technologies Solar Team,

You have received a new SOLAR QUOTE REQUEST through the SLK Technologies website.

CUSTOMER DETAILS:
=================
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Property Address: ${formData.propertyAddress}

PROPERTY INFORMATION:
====================
Property Type: ${formData.propertyType.replace('-', ' ').toUpperCase()}
Monthly Energy Bill: ${formData.energyBill}
Roof Type: ${formData.roofType}
System Interest: ${formData.systemInterest}
Budget Range: ${formData.budgetRange}
Installation Timeline: ${formData.timeline}

ADDITIONAL INFORMATION:
======================
${formData.additionalInfo}

REQUEST DETAILS:
===============
Timestamp: ${formData.timestamp}
Source: Website Solar Quote Form

NEXT STEPS:
===========
1. Contact customer at ${formData.email} or ${formData.phone}
2. Schedule site assessment at ${formData.propertyAddress || 'customer address'}
3. Prepare customized solar proposal based on ${formData.propertyType} requirements
4. Provide detailed quote with savings projections

---
This is a PRIORITY solar quote request.
Please respond promptly to maintain customer satisfaction.

SLK Technologies Website System
        `.trim();
        
        // Create mailto link
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        setTimeout(() => {
            // Update button
            submitButton.textContent = 'Opening Email Client...';
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            setTimeout(() => {
                alert(`Thank you ${formData.name}! Your solar quote request has been prepared and should open in your default email application. Our solar experts will contact you within 48 hours to schedule your assessment.\n\nIf the email doesn't open automatically, please send your quote request manually to ${recipientEmail}`);
                
                // Reset form
                enquiryForm.reset();
                
                // Reset button and redirect
                submitButton.textContent = 'Thank You! We\'ll Be In Touch';
                submitButton.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
                
                // Reset button to normal after 1.5 seconds
                setTimeout(() => {
                    submitButton.textContent = 'Get My Free Solar Quote';
                    submitButton.style.background = 'linear-gradient(135deg, #1976d2, #66bb6a)';
                    submitButton.disabled = false;
                    submitButton.style.opacity = '1';
                }, 1500);

                
            }, 1000);
        }, 2000);
    }
    
    // Validate contact form
    function validateContactForm() {
        const requiredFields = ['contact-name', 'contact-email', 'contact-subject', 'contact-message', 'message-type'];
        const consent = document.getElementById('contact-consent');
        
        let isValid = true;
        let errorMessage = '';
        
        // Check required fields
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = '#f44336';
                isValid = false;
            } else {
                field.style.borderColor = '#c8e6c9';
            }
        });
        
        // Make sure email format is correct
        const emailField = document.getElementById('contact-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#f44336';
            errorMessage += 'Please enter a valid email address.\n';
            isValid = false;
        }
        
        // Make sure phone number format is correct 
        const phoneField = document.getElementById('contact-phone');
        if (phoneField.value) {
            const phoneRegex = /^(\+27|0)[1-9]\d{8}$/;
            const cleanPhone = phoneField.value.replace(/[\s\-\(\)]/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                phoneField.style.borderColor = '#f44336';
                errorMessage += 'Please enter a valid South African phone number.\n';
                isValid = false;
            }
        }
        
        // Check consent
        if (!consent.checked) {
            errorMessage += 'Please provide consent to contact you.\n';
            isValid = false;
        }
        
        if (!isValid && errorMessage) {
            alert('Please correct the following errors:\n' + errorMessage);
        } else if (!isValid) {
            alert('Please fill in all required fields marked with *');
        }
        
        return isValid;
    }
    
    // Generate and send contact email
    function generateContactEmail(formData) {
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Preparing Email...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        // Email recipient
        const recipientEmail = 'slkbros@outlook.com';
        
        // Generate email subject
        const emailSubject = `[${formData.messageType.replace('-', ' ').toUpperCase()}] ${formData.subject}`;
        
        // Generate email body
        const emailBody = `
Dear SLK Technologies Team,

You have received a new message through the SLK Technologies website.

CONTACT DETAILS:
================
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Message Type: ${formData.messageType.replace('-', ' ').toUpperCase()}

MESSAGE DETAILS:
================
Subject: ${formData.subject}
Timestamp: ${formData.timestamp}

MESSAGE:
========
${formData.message}

---
This message was sent through the SLK Technologies website contact form.
Please respond to the customer at: ${formData.email}

Best regards,
SLK Technologies
        `.trim();
        
        // Create mailto link
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        setTimeout(() => {
            // Update button
            submitButton.textContent = 'Opening Email Client...';
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            setTimeout(() => {
                alert(`Thank you ${formData.name}! Your message has been prepared and should open in your default email application. We'll respond to your ${formData.messageType.replace('-', ' ')} inquiry as soon as possible.\n\nIf the email doesn't open automatically, please send your message manually to ${recipientEmail}`);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                
            }, 1000);
        }, 2000);
    }
});