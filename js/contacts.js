/**
 * BSE Specialisation Advisor - Contact Page Script
 * Handles contact form validation and submission
 */

// ========================================
// DOM ELEMENTS
// ========================================

const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactSubject = document.getElementById('contactSubject');
const contactMessage = document.getElementById('contactMessage');

// Error message elements
const contactNameError = document.getElementById('contactNameError');
const contactEmailError = document.getElementById('contactEmailError');
const contactSubjectError = document.getElementById('contactSubjectError');
const contactMessageError = document.getElementById('contactMessageError');

// ========================================
// REGULAR EXPRESSIONS
// ========================================

/**
 * Validates name for contact form
 * - At least 2 characters
 * - Letters, spaces, hyphens, apostrophes only
 */
const contactNameRegex = /^[A-Za-z\s\-']{2,50}$/;

/**
 * Validates email for contact form
 * - Accepts ALU institutional emails and standard emails
 */
const contactEmailRegex = /^[a-zA-Z0-9._%+-]+@alustudent\.com\.gh$/;

// ========================================
// VALIDATION FUNCTIONS
// ========================================

/**
 * Validates contact name
 */
function validateContactName(value) {
    const trimmed = value.trim();
    if (!trimmed) {
        showError(contactNameError, 'Please enter your name');
        setInvalid(contactName);
        return false;
    }
    if (!contactNameRegex.test(trimmed)) {
        showError(contactNameError, 'Name must contain only letters, spaces, hyphens, or apostrophes (2-50 characters)');
        setInvalid(contactName);
        return false;
    }
    clearError(contactNameError);
    setValid(contactName);
    return true;
}

/**
 * Validates contact email
 */
function validateContactEmail(value) {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) {
        showError(contactEmailError, 'Please enter your email address');
        setInvalid(contactEmail);
        return false;
    }
    if (!contactEmailRegex.test(trimmed)) {
        showError(contactEmailError, 'Please enter a valid email address');
        setInvalid(contactEmail);
        return false;
    }
    clearError(contactEmailError);
    setValid(contactEmail);
    return true;
}

/**
 * Validates contact subject
 */
function validateContactSubject(value) {
    if (!value) {
        showError(contactSubjectError, 'Please select a subject');
        setInvalid(contactSubject);
        return false;
    }
    clearError(contactSubjectError);
    setValid(contactSubject);
    return true;
}

/**
 * Validates contact message
 */
function validateContactMessage(value) {
    const trimmed = value.trim();
    if (!trimmed) {
        showError(contactMessageError, 'Please enter your message');
        setInvalid(contactMessage);
        return false;
    }
    if (trimmed.length < 10) {
        showError(contactMessageError, 'Message must be at least 10 characters');
        setInvalid(contactMessage);
        return false;
    }
    if (trimmed.length > 1000) {
        showError(contactMessageError, 'Message cannot exceed 1000 characters');
        setInvalid(contactMessage);
        return false;
    }
    clearError(contactMessageError);
    setValid(contactMessage);
    return true;
}

// ========================================
// UI HELPER FUNCTIONS
// ========================================

/**
 * Shows an error message
 */
function showError(element, message) {
    element.textContent = message;
}

/**
 * Clears an error message
 */
function clearError(element) {
    element.textContent = '';
}

/**
 * Sets input to valid state
 */
function setValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

/**
 * Sets input to invalid state
 */
function setInvalid(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
}

// ========================================
// EVENT LISTENERS
// ========================================

// Real-time validation
contactName.addEventListener('input', function() {
    validateContactName(this.value);
});

contactEmail.addEventListener('input', function() {
    validateContactEmail(this.value);
});

contactSubject.addEventListener('change', function() {
    validateContactSubject(this.value);
});

contactMessage.addEventListener('input', function() {
    validateContactMessage(this.value);
});

// Blur validation
contactName.addEventListener('blur', function() {
    validateContactName(this.value);
});

contactEmail.addEventListener('blur', function() {
    validateContactEmail(this.value);
});

contactMessage.addEventListener('blur', function() {
    validateContactMessage(this.value);
});

// ========================================
// FORM SUBMISSION
// ========================================

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateContactName(contactName.value);
    const isEmailValid = validateContactEmail(contactEmail.value);
    const isSubjectValid = validateContactSubject(contactSubject.value);
    const isMessageValid = validateContactMessage(contactMessage.value);

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Build message data
        const formData = {
            name: contactName.value.trim(),
            email: contactEmail.value.trim().toLowerCase(),
            subject: contactSubject.value,
            message: contactMessage.value.trim(),
            timestamp: new Date().toISOString()
        };

        // In a real application, you would send this to a server
        console.log('Contact form submitted:', formData);

        // Show success message
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '✅ Message Sent!';
        btn.style.background = '#28A745';
        btn.disabled = true;

        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            // Reset validation states
            [contactName, contactEmail, contactSubject, contactMessage].forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
            [contactNameError, contactEmailError, contactSubjectError, contactMessageError].forEach(el => {
                el.textContent = '';
            });
            
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            
            // Show a success toast/message
            showToast('Thank you! Your message has been sent successfully.');
        }, 3000);
    } else {
        // Scroll to first invalid field
        const firstInvalid = document.querySelector('.is-invalid');
        if (firstInvalid) {
            firstInvalid.focus();
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// ========================================
// TOAST NOTIFICATION
// ========================================

/**
 * Shows a toast notification
 * @param {string} message - The message to display
 */
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div style="
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #28A745;
            color: #fff;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            font-family: 'Segoe UI', sans-serif;
            font-size: 1rem;
            z-index: 10000;
            animation: slideIn 0.4s ease;
            max-width: 400px;
        ">
            <span style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5rem;">✅</span>
                <span>${message}</span>
            </span>
        </div>
    `;

    // Add animation styles if not already present
    if (!document.querySelector('#toastStyles')) {
        const style = document.createElement('style');
        style.id = 'toastStyles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.4s ease forwards';
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 5000);
}

// ========================================
// NAVIGATION TOGGLE (Mobile)
// ========================================

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

// ========================================
// INITIALIZATION LOG
// ========================================

console.log('BSE Specialisation Advisor - Contact Page loaded successfully');
console.log('© 2026 BSE Specialisation Advisor');