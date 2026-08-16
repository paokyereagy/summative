/**
 * BSE Specialisation Advisor - Landing Page Script
 * Handles form validation, student data storage, and navigation
 */

// ========================================
// DOM ELEMENTS
// ========================================
const form = document.getElementById('landingForm');
const fullNameInput = document.getElementById('fullName');
const studentIdInput = document.getElementById('studentId');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const yearStudySelect = document.getElementById('yearStudy');

// Error message elements
const fullNameError = document.getElementById('fullNameError');
const studentIdError = document.getElementById('studentIdError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const yearStudyError = document.getElementById('yearStudyError');

// ========================================
// REGULAR EXPRESSIONS
// ========================================

/**
 * Validates that name contains only letters, spaces, hyphens, and apostrophes
 * - Must be at least 2 characters
 * - No numbers or special characters allowed
 */
const nameRegex = /^[A-Za-z\s\-']{2,50}$/;

/**
 * Validates Student ID format: BSE-YYYY-XXX
 * - BSE: fixed prefix
 * - YYYY: 4-digit year (2024-2030)
 * - XXX: 3-digit number (001-999)
 */
const studentIdRegex = /^BSE-(202[4-9]|2030)-\d{3}$/;

/**
 * Validates BSE institutional email
 * - Standard format: name@bse.ac.mu
 * - Student format: student.id@alustudent.com
 */
const emailRegex = /^[a-zA-Z0-9._%+-]+@(bse\.ac\.mu|alustudent\.com)$/;

/**
 * Validates Mauritian mobile phone numbers
 * - Format: +230 5XXX XXXX
 * - Also accepts: 5XXX XXXX (without country code)
 */
const phoneRegex = /^(?:\+230\s?)?5[0-9]{3}\s?[0-9]{4}$/;

// ========================================
// VALIDATION FUNCTIONS
// ========================================

/**
 * Validates full name field
 * @param {string} value - The name to validate
 * @returns {boolean} - True if valid
 */
function validateName(value) {
    const trimmed = value.trim();
    if (!trimmed) {
        showError(fullNameError, 'Full name is required');
        setInvalid(fullNameInput);
        return false;
    }
    if (!nameRegex.test(trimmed)) {
        showError(fullNameError, 'Name must contain only letters, spaces, hyphens, or apostrophes (2-50 characters)');
        setInvalid(fullNameInput);
        return false;
    }
    clearError(fullNameError);
    setValid(fullNameInput);
    return true;
}

/**
 * Validates Student ID field
 * @param {string} value - The student ID to validate
 * @returns {boolean} - True if valid
 */
function validateStudentId(value) {
    const trimmed = value.trim().toUpperCase();
    if (!trimmed) {
        showError(studentIdError, 'Student ID is required');
        setInvalid(studentIdInput);
        return false;
    }
    if (!studentIdRegex.test(trimmed)) {
        showError(studentIdError, 'Invalid format. Expected: BSE-YYYY-XXX (e.g., BSE-2024-001)');
        setInvalid(studentIdInput);
        return false;
    }
    clearError(studentIdError);
    setValid(studentIdInput);
    return true;
}

/**
 * Validates email field using BSE institutional regex
 * @param {string} value - The email to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(value) {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) {
        showError(emailError, 'Email address is required');
        setInvalid(emailInput);
        return false;
    }
    if (!emailRegex.test(trimmed)) {
        showError(emailError, 'Please enter a valid BSE institutional email (e.g., student.id@bse.ac.mu)');
        setInvalid(emailInput);
        return false;
    }
    clearError(emailError);
    setValid(emailInput);
    return true;
}

/**
 * Validates phone number using Mauritian mobile format
 * @param {string} value - The phone number to validate
 * @returns {boolean} - True if valid
 */
function validatePhone(value) {
    const trimmed = value.trim();
    if (!trimmed) {
        showError(phoneError, 'Phone number is required');
        setInvalid(phoneInput);
        return false;
    }
    if (!phoneRegex.test(trimmed)) {
        showError(phoneError, 'Invalid format. Expected: +230 5XXX XXXX or 5XXX XXXX');
        setInvalid(phoneInput);
        return false;
    }
    clearError(phoneError);
    setValid(phoneInput);
    return true;
}

/**
 * Validates year of study selection
 * @param {string} value - The selected year
 * @returns {boolean} - True if valid
 */
function validateYear(value) {
    if (!value) {
        showError(yearStudyError, 'Please select your year of study');
        setInvalid(yearStudySelect);
        return false;
    }
    clearError(yearStudyError);
    setValid(yearStudySelect);
    return true;
}

// ========================================
// UI HELPER FUNCTIONS
// ========================================

/**
 * Shows an error message below the input
 * @param {HTMLElement} errorElement - The error message element
 * @param {string} message - The error message to display
 */
function showError(errorElement, message) {
    errorElement.textContent = message;
}

/**
 * Clears the error message
 * @param {HTMLElement} errorElement - The error message element
 */
function clearError(errorElement) {
    errorElement.textContent = '';
}

/**
 * Sets input to valid state (green border)
 * @param {HTMLElement} input - The input element
 */
function setValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

/**
 * Sets input to invalid state (red border)
 * @param {HTMLElement} input - The input element
 */
function setInvalid(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
}

/**
 * Resets validation state of an input
 * @param {HTMLElement} input - The input element
 */
function resetValidation(input) {
    input.classList.remove('is-valid', 'is-invalid');
}

// ========================================
// EVENT LISTENERS (REAL-TIME VALIDATION)
// ========================================

// Validate on 'input' event for immediate feedback
fullNameInput.addEventListener('input', function() {
    validateName(this.value);
});

studentIdInput.addEventListener('input', function() {
    validateStudentId(this.value);
});

emailInput.addEventListener('input', function() {
    validateEmail(this.value);
});

phoneInput.addEventListener('input', function() {
    validatePhone(this.value);
});

// Validate on 'blur' event (when field loses focus)
fullNameInput.addEventListener('blur', function() {
    validateName(this.value);
});

studentIdInput.addEventListener('blur', function() {
    validateStudentId(this.value);
});

emailInput.addEventListener('blur', function() {
    validateEmail(this.value);
});

phoneInput.addEventListener('blur', function() {
    validatePhone(this.value);
});

yearStudySelect.addEventListener('change', function() {
    validateYear(this.value);
});

// ========================================
// FORM SUBMISSION
// ========================================

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName(fullNameInput.value);
    const isIdValid = validateStudentId(studentIdInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isPhoneValid = validatePhone(phoneInput.value);
    const isYearValid = validateYear(yearStudySelect.value);

    // Check if all fields are valid
    if (isNameValid && isIdValid && isEmailValid && isPhoneValid && isYearValid) {
        // Store student data in sessionStorage for use in quiz
        const studentData = {
            fullName: fullNameInput.value.trim(),
            studentId: studentIdInput.value.trim().toUpperCase(),
            email: emailInput.value.trim().toLowerCase(),
            phone: phoneInput.value.trim(),
            yearStudy: yearStudySelect.value
        };

        try {
            sessionStorage.setItem('studentData', JSON.stringify(studentData));
            
            // Add a success animation/feedback
            const btn = document.getElementById('startQuizBtn');
            btn.textContent = ' Redirecting...';
            btn.disabled = true;

            // Redirect to quiz page after brief delay
            setTimeout(() => {
                window.location.href = 'quiz.html';
            }, 800);
        } catch (error) {
            console.error('Error saving student data:', error);
            alert('There was an error processing your information. Please try again.');
        }
    } else {
        // Scroll to the first invalid field
        const firstInvalid = document.querySelector('.is-invalid');
        if (firstInvalid) {
            firstInvalid.focus();
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

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
// NAVIGATION HANDLERS
// ========================================

const navButtons = document.querySelectorAll('.nav-links button');
navButtons.forEach((button, index) => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // Close mobile menu
        if (navLinks) navLinks.classList.remove('active');
        
        // Get the base path
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        
        // Navigate based on button position
        switch(index) {
            case 0: // Home
                window.location.href = basePath + '/index.html';
                break;
            case 1: // Quiz
                window.location.href = basePath + '/quiz.html';
                break;
            case 2: // Results
                window.location.href = basePath + '/results.html';
                break;
            case 3: // Contacts
                window.location.href = basePath + '/contacts.html';
                break;
        }
    });
});

// Brand logo link handler
const brandLink = document.querySelector('.brand');
if (brandLink) {
    brandLink.addEventListener('click', function(e) {
        e.preventDefault();
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        window.location.href = basePath + '/index.html';
    });
}

// ========================================
// INITIALIZATION
// ========================================

console.log('BSE Specialisation Advisor - Landing Page loaded successfully');
console.log('© 2026 BSE Specialisation Advisor');