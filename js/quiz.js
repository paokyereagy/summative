/**
 * BSE Specialisation Advisor - Quiz Page Script
 * Handles quiz rendering, timer, scoring, and interactive media
 */

// ========================================
// QUIZ DATA
// ========================================

const questions = [
    {
        id: 1,
        category: 'low_level',
        question: 'Which of the following is a characteristic of low-level programming?',
        type: 'multiple_choice',
        options: [
            'Direct memory management and pointer arithmetic',
            'Automatic garbage collection',
            'Built-in web framework support',
            'High-level abstraction layers'
        ],
        correct: 0,
        explanation: 'Low-level programming involves direct memory management, pointer arithmetic, and system-level operations.'
    },
    {
        id: 2,
        category: 'ar_vr',
        question: 'What technology combines real-world environments with computer-generated information?',
        type: 'multiple_choice',
        options: [
            'Virtual Reality (VR)',
            'Augmented Reality (AR)',
            'Mixed Reality (MR)',
            'Extended Reality (XR)'
        ],
        correct: 1,
        explanation: 'Augmented Reality overlays digital information onto the real world, enhancing rather than replacing it.'
    },
    {
        id: 3,
        category: 'full_stack',
        question: 'Which of the following is NOT a frontend technology?',
        type: 'multiple_choice',
        options: [
            'React.js',
            'Node.js',
            'HTML5',
            'CSS3'
        ],
        correct: 1,
        explanation: 'Node.js is a backend JavaScript runtime, while React, HTML5, and CSS3 are frontend technologies.'
    },
    {
        id: 4,
        category: 'machine_learning',
        question: 'What type of learning involves training a model on labeled data?',
        type: 'multiple_choice',
        options: [
            'Unsupervised Learning',
            'Supervised Learning',
            'Reinforcement Learning',
            'Semi-supervised Learning'
        ],
        correct: 1,
        explanation: 'Supervised learning uses labeled datasets to train models to predict outcomes or classify data.'
    },
    {
        id: 5,
        category: 'low_level',
        question: 'What is the primary advantage of using assembly language?',
        type: 'multiple_choice',
        options: [
            'Easier debugging',
            'Better readability',
            'Maximum performance and control',
            'Platform independence'
        ],
        correct: 2,
        explanation: 'Assembly language provides maximum performance and hardware control, though at the cost of readability.'
    },
    {
        id: 6,
        category: 'ar_vr',
        question: '',
        type: 'image_hotspot',
        image: '../assets/Gemini_Generated_Image_dlzm6zdlzm6zdlzm (1).jpg',
        hotspots: [
            { x: 18, y: 38, label: 'VR', value: 'Virtual Reality' },
            { x: 50, y: 38, label: 'AR', value: 'Augmented Reality' },
            { x: 82, y: 38, label: 'MR', value: 'Mixed Reality' }
        ],
        correct: 'VR',
        explanation: 'Virtual Reality creates fully immersive 3D environments that completely replace the real world.'
    },
    {
        id: 7,
        category: 'full_stack',
        question: 'What does the acronym CRUD stand for in web development?',
        type: 'multiple_choice',
        options: [
            'Create, Read, Update, Delete',
            'Code, Run, Update, Deploy',
            'Create, Review, Update, Debug',
            'Connect, Read, Use, Delete'
        ],
        correct: 0,
        explanation: 'CRUD represents the four basic operations: Create, Read, Update, and Delete for persistent storage.'
    },
    {
        id: 8,
        category: 'machine_learning',
        question: 'Which algorithm is commonly used for classification tasks?',
        type: 'audio_prompt',
        audio: '../assets/NoteGPT_Speech_1786946706622.mp3',
        options: [
            'Linear Regression',
            'Decision Trees',
            'K-Means Clustering',
            'Principal Component Analysis'
        ],
        correct: 1,
        explanation: 'Decision Trees are popular for classification tasks due to their interpretability and effectiveness.'
    },
    {
        id: 9,
        category: 'low_level',
        question: 'What is the purpose of a linker in low-level programming?',
        type: 'multiple_choice',
        options: [
            'To compile source code',
            'To combine object files into an executable',
            'To debug programs',
            'To manage memory allocation'
        ],
        correct: 1,
        explanation: 'A linker combines multiple object files into a single executable program, resolving symbol references.'
    },
    {
        id: 10,
        category: 'full_stack',
        question: 'Which of the following is a NoSQL database?',
        type: 'multiple_choice',
        options: [
            'MySQL',
            'PostgreSQL',
            'MongoDB',
            'Oracle'
        ],
        correct: 2,
        explanation: 'MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents.'
    }
];

// ========================================
// STATE MANAGEMENT
// ========================================

const state = {
    currentQuestion: 0,
    answers: new Array(questions.length).fill(null),
    timer: null,
    timeRemaining: 600, // 10 minutes in seconds
    isQuizCompleted: false,
    isTimeout: false,
    startTime: null
};

// ========================================
// DOM ELEMENTS
// ========================================

const quizContainer = document.getElementById('quizContainer');
const timerDisplay = document.getElementById('timerDisplay');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const prevBtn = document.getElementById('prevQuestion');
const nextBtn = document.getElementById('nextQuestion');
const submitBtn = document.getElementById('submitQuiz');
const questionCounter = document.getElementById('questionCounter');

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize the quiz - check for student data and render first question
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if student data exists
    const studentData = sessionStorage.getItem('studentData');
    if (!studentData) {
        // Redirect to landing if no student data
        window.location.href = 'index.html';
        return;
    }

    // Start timer
    startTimer();

    // Render first question
    renderQuestion(0);

    // Update progress
    updateProgress();

    console.log('Quiz initialized successfully');
});

// ========================================
// RENDER FUNCTIONS
// ========================================

/**
 * Renders a specific question by index
 * @param {number} index - The question index to render
 */
function renderQuestion(index) {
    const question = questions[index];
    const totalQuestions = questions.length;

    // Build question HTML based on type
    let optionsHTML = '';
    
    if (question.type === 'multiple_choice') {
        optionsHTML = renderMultipleChoice(question, index);
    } else if (question.type === 'image_hotspot') {
        optionsHTML = renderImageHotspot(question, index);
    } else if (question.type === 'audio_prompt') {
        optionsHTML = renderAudioPrompt(question, index);
    } else if (question.type === 'video_prompt') {
        optionsHTML = renderVideoPrompt(question, index);
    }

    const cardHTML = `
        <div class="quiz-card active" data-question="${index}">
            <span class="question-number">Question ${index + 1} of ${totalQuestions}</span>
            <h3>${question.question}</h3>
            ${optionsHTML}
            ${question.explanation && state.answers[index] !== null ? `<p class="explanation"> ${question.explanation}</p>` : ''}
        </div>
    `;

    quizContainer.innerHTML = cardHTML;

    // Update navigation buttons
    updateNavigation(index);

    // Update counter
    questionCounter.textContent = `Question ${index + 1} of ${totalQuestions}`;

    // Scroll to top of quiz
    document.querySelector('.quiz-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Renders multiple choice options
 */
function renderMultipleChoice(question, index) {
    const selectedValue = state.answers[index];
    
    let optionsHTML = '<div class="options-grid">';
    question.options.forEach((option, optIndex) => {
        const isSelected = selectedValue === optIndex;
        optionsHTML += `
            <label class="option-item ${isSelected ? 'selected' : ''}">
                <input type="radio" name="question_${index}" value="${optIndex}" 
                    ${isSelected ? 'checked' : ''}
                    data-question="${index}" data-option="${optIndex}">
                <span class="option-label">${option}</span>
            </label>
        `;
    });
    optionsHTML += '</div>';

    return optionsHTML;
}

/**
 * Renders image hotspot question
 */
function renderImageHotspot(question, index) {
    const selectedValue = state.answers[index];
    
    let html = `
        <div class="media-container">
            <div class="hotspot-container" id="hotspotContainer_${index}">
                <img src="${question.image}" alt="Interactive image with hotspots" 
                    style="max-width: 100%; border-radius: 8px;">
    `;

    // Render hotspots
    question.hotspots.forEach((hotspot, hIndex) => {
        const isSelected = selectedValue === hotspot.value;
        html += `
            <div class="hotspot-marker ${isSelected ? 'selected' : ''}" 
                style="left: ${hotspot.x}%; top: ${hotspot.y}%;"
                data-question="${index}" data-value="${hotspot.value}" 
                data-label="${hotspot.label}">
                ${hotspot.label}
            </div>
        `;
    });

    html += `
            </div>
            <p style="margin-top: 12px; color: var(--text-light); font-size: 0.9rem;">
                Click on the marker that best represents the correct answer
            </p>
        </div>
    `;

    return html;
}

/**
 * Renders audio prompt question
 */
function renderAudioPrompt(question, index) {
    const selectedValue = state.answers[index];
    
    let html = `
        <div class="media-container">
            <div class="audio-controls">
                <audio id="audioPlayer_${index}" src="${question.audio}" preload="metadata"></audio>
                <div class="media-controls">
                    <button onclick="playAudio(${index})" class="audio-play-btn">▶ Play</button>
                    <button onclick="pauseAudio(${index})" class="audio-pause-btn">⏸ Pause</button>
                    <button onclick="replayAudio(${index})" class="audio-replay-btn">⟳ Replay</button>
                </div>
                <p style="margin-top: 8px; color: var(--text-light); font-size: 0.9rem;">
                    Listen to the audio clip, then select your answer below
                </p>
            </div>
            <div class="options-grid" style="margin-top: 16px;">
    `;

    question.options.forEach((option, optIndex) => {
        const isSelected = selectedValue === optIndex;
        html += `
            <label class="option-item ${isSelected ? 'selected' : ''}">
                <input type="radio" name="question_${index}" value="${optIndex}"
                    ${isSelected ? 'checked' : ''}
                    data-question="${index}" data-option="${optIndex}">
                <span class="option-label">${option}</span>
            </label>
        `;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

/**
 * Renders video prompt question
 */
function renderVideoPrompt(question, index) {
    const selectedValue = state.answers[index];
    
    let html = `
        <div class="media-container">
            <div class="video-controls">
                <video id="videoPlayer_${index}" src="${question.video}" preload="metadata" 
                    style="max-width: 100%; border-radius: 8px; max-height: 300px;">
                    Your browser does not support the video tag.
                </video>
                <div class="media-controls">
                    <button onclick="playVideo(${index})" class="video-play-btn">▶ Play</button>
                    <button onclick="pauseVideo(${index})" class="video-pause-btn">⏸ Pause</button>
                    <button onclick="replayVideo(${index})" class="video-replay-btn">⟳ Replay</button>
                </div>
                <p style="margin-top: 8px; color: var(--text-light); font-size: 0.9rem;">
                    Watch the video clip, then select your answer below
                </p>
            </div>
            <div class="options-grid" style="margin-top: 16px;">
    `;

    question.options.forEach((option, optIndex) => {
        const isSelected = selectedValue === optIndex;
        html += `
            <label class="option-item ${isSelected ? 'selected' : ''}">
                <input type="radio" name="question_${index}" value="${optIndex}"
                    ${isSelected ? 'checked' : ''}
                    data-question="${index}" data-option="${optIndex}">
                <span class="option-label">${option}</span>
            </label>
        `;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

// ========================================
// EVENT HANDLERS
// ========================================

// Delegate event listener for radio buttons and hotspots
quizContainer.addEventListener('change', function(e) {
    const target = e.target;
    if (target.type === 'radio') {
        const questionIndex = parseInt(target.dataset.question);
        const optionValue = parseInt(target.value);
        handleAnswer(questionIndex, optionValue);
    }
});

quizContainer.addEventListener('click', function(e) {
    const target = e.target;
    // Handle hotspot clicks
    if (target.classList.contains('hotspot-marker')) {
        const questionIndex = parseInt(target.dataset.question);
        const value = target.dataset.value;
        handleHotspotAnswer(questionIndex, value, target);
    }
});

/**
 * Handles multiple choice answer selection
 */
function handleAnswer(questionIndex, optionValue) {
    state.answers[questionIndex] = optionValue;
    
    // Update UI - highlight selected option
    const options = document.querySelectorAll(`.option-item`);
    options.forEach(opt => {
        opt.classList.remove('selected');
        const radio = opt.querySelector('input[type="radio"]');
        if (radio && parseInt(radio.value) === optionValue) {
            opt.classList.add('selected');
        }
    });

    // Show explanation if available
    const explanation = document.querySelector('.explanation');
    if (explanation) {
        explanation.style.display = 'block';
    }

    updateProgress();
    updateNavigation(state.currentQuestion);
}

/**
 * Handles hotspot answer selection
 */
function handleHotspotAnswer(questionIndex, value, clickedElement) {
    state.answers[questionIndex] = value;
    
    // Update UI - highlight selected hotspot
    const container = document.getElementById(`hotspotContainer_${questionIndex}`);
    if (container) {
        const markers = container.querySelectorAll('.hotspot-marker');
        markers.forEach(marker => {
            marker.classList.remove('selected');
        });
        clickedElement.classList.add('selected');
    }

    updateProgress();
    updateNavigation(state.currentQuestion);
}

// ========================================
// NAVIGATION FUNCTIONS
// ========================================

/**
 * Navigates to the previous question
 */
function goToPrevQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        renderQuestion(state.currentQuestion);
        updateProgress();
    }
}

/**
 * Navigates to the next question
 */
function goToNextQuestion() {
    if (state.currentQuestion < questions.length - 1) {
        state.currentQuestion++;
        renderQuestion(state.currentQuestion);
        updateProgress();
    }
}

/**
 * Updates navigation button states
 */
function updateNavigation(index) {
    prevBtn.disabled = index === 0;
    
    if (index === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

/**
 * Updates the progress bar and text
 */
function updateProgress() {
    const answered = state.answers.filter(a => a !== null).length;
    const total = questions.length;
    const percentage = (answered / total) * 100;
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${answered} / ${total}`;
}

// ========================================
// TIMER FUNCTIONS
// ========================================

/**
 * Starts the countdown timer
 */
function startTimer() {
    if (state.timer) {
        clearInterval(state.timer);
    }

    state.timer = setInterval(function() {
        state.timeRemaining--;
        updateTimerDisplay();

        if (state.timeRemaining <= 0) {
            handleTimeout();
        }
    }, 1000);
}

/**
 * Updates the timer display
 */
function updateTimerDisplay() {
    const minutes = Math.floor(state.timeRemaining / 60);
    const seconds = state.timeRemaining % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    timerDisplay.textContent = display;

    // Add warning class when time is low
    if (state.timeRemaining <= 60) {
        timerDisplay.classList.add('warning');
    } else {
        timerDisplay.classList.remove('warning');
    }
}

/**
 * Handles quiz timeout
 */
function handleTimeout() {
    clearInterval(state.timer);
    state.isTimeout = true;
    state.isQuizCompleted = true;

    // Lock controls
    const inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => input.disabled = true);

    // Show timeout overlay
    showTimeoutOverlay();

    // Auto-submit after brief delay
    setTimeout(() => {
        submitQuiz();
    }, 3000);
}

/**
 * Shows the timeout overlay
 */
function showTimeoutOverlay() {
    let overlay = document.querySelector('.quiz-timeout-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'quiz-timeout-overlay';
        overlay.innerHTML = `
            <div class="timeout-modal">
                <h2>⏰ Time's Up!</h2>
                <p>Your quiz has been automatically submitted.</p>
                <div class="spinner" style="margin: 20px auto; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #4A6CF7; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    overlay.classList.add('active');
}

// ========================================
// MEDIA CONTROL FUNCTIONS
// ========================================

/**
 * Plays audio for a specific question
 */
function playAudio(index) {
    const audio = document.getElementById(`audioPlayer_${index}`);
    if (audio) {
        audio.play().catch(err => console.log('Audio playback error:', err));
    }
}

/**
 * Pauses audio for a specific question
 */
function pauseAudio(index) {
    const audio = document.getElementById(`audioPlayer_${index}`);
    if (audio) {
        audio.pause();
    }
}

/**
 * Replays audio from the beginning
 */
function replayAudio(index) {
    const audio = document.getElementById(`audioPlayer_${index}`);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(err => console.log('Audio playback error:', err));
    }
}

/**
 * Plays video for a specific question
 */
function playVideo(index) {
    const video = document.getElementById(`videoPlayer_${index}`);
    if (video) {
        video.play().catch(err => console.log('Video playback error:', err));
    }
}

/**
 * Pauses video for a specific question
 */
function pauseVideo(index) {
    const video = document.getElementById(`videoPlayer_${index}`);
    if (video) {
        video.pause();
    }
}

/**
 * Replays video from the beginning
 */
function replayVideo(index) {
    const video = document.getElementById(`videoPlayer_${index}`);
    if (video) {
        video.currentTime = 0;
        video.play().catch(err => console.log('Video playback error:', err));
    }
}

// ========================================
// SCORING ENGINE
// ========================================

/**
 * Calculates category scores and determines the best specialisation
 * @returns {Object} - Scores object with category breakdown and recommendation
 */
function calculateScores() {
    // Define category mapping for each question
    const categoryMap = questions.map(q => q.category);
    
    // Initialize category scores
    const categories = {
        low_level: { name: 'Low-Level Programming', score: 0, total: 0 },
        ar_vr: { name: 'AR/VR', score: 0, total: 0 },
        full_stack: { name: 'Full-Stack Web Development', score: 0, total: 0 },
        machine_learning: { name: 'Machine Learning', score: 0, total: 0 }
    };

    // Calculate scores per category
    questions.forEach((question, index) => {
        const category = question.category;
        const answer = state.answers[index];
        
        if (answer !== null) {
            categories[category].total++;
            
            // Check if answer is correct
            let isCorrect = false;
            if (question.type === 'multiple_choice' || question.type === 'audio_prompt' || question.type === 'video_prompt') {
                isCorrect = answer === question.correct;
            } else if (question.type === 'image_hotspot') {
                // For hotspot, answer is the value string
                isCorrect = answer === question.correct;
            }
            
            if (isCorrect) {
                categories[category].score++;
            }
        }
    });

    // Calculate percentages
    const results = {};
    let maxScore = 0;
    let recommended = null;

    Object.keys(categories).forEach(key => {
        const cat = categories[key];
        const percentage = cat.total > 0 ? Math.round((cat.score / cat.total) * 100) : 0;
        results[key] = {
            name: cat.name,
            score: cat.score,
            total: cat.total,
            percentage: percentage
        };
        
        if (percentage > maxScore && cat.total > 0) {
            maxScore = percentage;
            recommended = key;
        }
    });

    // Apply speed multiplier if applicable (bonus for finishing early)
    const timeBonus = calculateTimeBonus();
    
    return {
        scores: results,
        recommended: recommended,
        recommendedName: recommended ? results[recommended].name : 'Undetermined',
        timeBonus: timeBonus,
        totalQuestions: questions.length,
        answeredQuestions: state.answers.filter(a => a !== null).length,
        isTimeout: state.isTimeout
    };
}

/**
 * Calculates time bonus based on remaining time
 * @returns {number} - Bonus points
 */
function calculateTimeBonus() {
    const maxBonus = 10;
    const timeUsed = 600 - state.timeRemaining;
    const bonus = Math.max(0, maxBonus - Math.floor(timeUsed / 60));
    return bonus;
}

/**
 * Determines the streak multiplier based on consecutive correct answers
 * @returns {number} - Streak multiplier
 */
function calculateStreakMultiplier() {
    let streak = 0;
    let maxStreak = 0;
    
    questions.forEach((question, index) => {
        const answer = state.answers[index];
        if (answer !== null) {
            let isCorrect = false;
            if (question.type === 'multiple_choice' || question.type === 'audio_prompt' || question.type === 'video_prompt') {
                isCorrect = answer === question.correct;
            } else if (question.type === 'image_hotspot') {
                isCorrect = answer === question.correct;
            }
            
            if (isCorrect) {
                streak++;
                maxStreak = Math.max(maxStreak, streak);
            } else {
                streak = 0;
            }
        }
    });
    
    return Math.min(2, 1 + (maxStreak / 5)); // Max multiplier of 2.0
}

// ========================================
// SUBMIT FUNCTION
// ========================================

/**
 * Submits the quiz and navigates to results
 */
function submitQuiz() {
    if (state.isQuizCompleted) {
        return;
    }

    // Check if all questions are answered
    const answered = state.answers.filter(a => a !== null).length;
    if (answered < questions.length && !state.isTimeout) {
        const confirmSubmit = confirm(
            `You have only answered ${answered} out of ${questions.length} questions.\n\n` +
            `Are you sure you want to submit?`
        );
        if (!confirmSubmit) {
            return;
        }
    }

    state.isQuizCompleted = true;
    clearInterval(state.timer);

    // Calculate scores
    const scores = calculateScores();
    
    // Store results
    try {
        const studentData = JSON.parse(sessionStorage.getItem('studentData') || '{}');
        const resultsData = {
            student: studentData,
            scores: scores,
            answers: state.answers,
            timestamp: new Date().toISOString()
        };
        
        sessionStorage.setItem('quizResults', JSON.stringify(resultsData));
        
        // Redirect to results page
        window.location.href = 'results.html';
    } catch (error) {
        console.error('Error saving results:', error);
        alert('There was an error submitting your quiz. Please try again.');
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

prevBtn.addEventListener('click', goToPrevQuestion);
nextBtn.addEventListener('click', goToNextQuestion);
submitBtn.addEventListener('click', submitQuiz);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' && state.currentQuestion > 0) {
        goToPrevQuestion();
    } else if (e.key === 'ArrowRight') {
        if (state.currentQuestion < questions.length - 1) {
            goToNextQuestion();
        } else {
            submitQuiz();
        }
    }
});

// ========================================
// NAVIGATION HANDLERS
// ========================================

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

const navButtons = document.querySelectorAll('.nav-links button');
navButtons.forEach((button, index) => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        if (navLinks) navLinks.classList.remove('active');
        
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        
        switch(index) {
            case 0:
                window.location.href = basePath + '/index.html';
                break;
            case 1:
                window.location.href = basePath + '/quiz.html';
                break;
            case 2:
                window.location.href = basePath + '/results.html';
                break;
            case 3:
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
// INITIALIZATION LOG
// ========================================

console.log('BSE Specialisation Advisor - Quiz Page loaded successfully');
console.log('Total questions:', questions.length);
console.log('© 2026 BSE Specialisation Advisor');