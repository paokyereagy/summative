/**
 * BSE Specialisation Advisor - Results Page Script
 * Handles Canvas rendering, results display, and recommendations
 */

// ========================================
// DOM ELEMENTS
// ========================================

const canvas = document.getElementById('resultsCanvas');
const ctx = canvas.getContext('2d');
const studentGreeting = document.getElementById('studentGreeting');
const resultsSummary = document.getElementById('resultsSummary');
const recommendations = document.getElementById('recommendations');

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve results data
    const resultsData = sessionStorage.getItem('quizResults');
    if (!resultsData) {
        // Redirect to quiz if no results
        window.location.href = 'quiz.html';
        return;
    }

    try {
        const data = JSON.parse(resultsData);
        displayResults(data);
        renderCanvas(data.scores);
    } catch (error) {
        console.error('Error parsing results:', error);
        resultsSummary.innerHTML = '<p class="error">Error loading results. Please retake the quiz.</p>';
    }
});

// ========================================
// DISPLAY RESULTS
// ========================================

/**
 * Displays the results summary and recommendations
 * @param {Object} data - The quiz results data
 */
function displayResults(data) {
    const { student, scores, timeBonus } = data;
    
    // Update greeting
    if (student && student.fullName) {
        studentGreeting.textContent = ` ${student.fullName}, here's your specialisation profile!`;
    }

    // Build scores summary
    let summaryHTML = '<div class="results-summary-list">';
    
    const categoryOrder = ['low_level', 'ar_vr', 'full_stack', 'machine_learning'];
    const colors = {
        low_level: '#4A6CF7',
        ar_vr: '#FF6B6B',
        full_stack: '#48C9B0',
        machine_learning: '#F39C12'
    };
    
    categoryOrder.forEach(key => {
        const score = scores.scores[key];
        if (score) {
            summaryHTML += `
                <div class="result-card">
                    <div>
                        <span class="result-title">${score.name}</span>
                        <span class="result-score">${score.percentage}%</span>
                    </div>
                    <div class="result-bar">
                        <div class="result-bar-fill" style="width: ${score.percentage}%; background: ${colors[key]};"></div>
                    </div>
                    <small style="color: var(--text-light);">${score.score} / ${score.total} correct</small>
                </div>
            `;
        }
    });
    
    // Add time bonus if applicable
    if (timeBonus > 0) {
        summaryHTML += `
            <div class="result-card" style="border-left-color: var(--success);">
                <div>
                    <span class="result-title"> Speed Bonus</span>
                    <span class="result-score">+${timeBonus} pts</span>
                </div>
                <small style="color: var(--text-light);">Bonus for completing the quiz ahead of time!</small>
            </div>
        `;
    }
    
    summaryHTML += '</div>';
    resultsSummary.innerHTML = summaryHTML;

    // Build recommendations
    const recommended = scores.recommended;
    const recommendedName = scores.recommendedName;
    
    const recommendationsData = {
        low_level: {
            title: ' Low-Level Programming',
            description: 'You show strong aptitude for systems-level thinking, performance optimization, and hardware interaction.',
            skills: ['C/C++', 'Assembly', 'Embedded Systems', 'Memory Management', 'OS Development'],
            careers: ['Systems Engineer', 'Embedded Developer', 'Firmware Engineer', 'Game Engine Developer']
        },
        ar_vr: {
            title: ' AR/VR Development',
            description: 'You have a natural affinity for immersive experiences, 3D graphics, and interactive storytelling.',
            skills: ['Unity', 'Unreal Engine', '3D Modeling', 'C#', 'Spatial Computing'],
            careers: ['AR/VR Developer', '3D Graphics Engineer', 'Game Developer', 'UX Designer']
        },
        full_stack: {
            title: ' Full-Stack Web Development',
            description: 'You excel at building complete web applications, from user interfaces to server-side logic.',
            skills: ['JavaScript/TypeScript', 'React/Angular', 'Node.js', 'Databases', 'REST APIs'],
            careers: ['Full-Stack Developer', 'Frontend Engineer', 'Backend Engineer', 'DevOps Engineer']
        },
        machine_learning: {
            title: ' Machine Learning',
            description: 'You demonstrate strong analytical skills and a passion for AI, data science, and pattern recognition.',
            skills: ['Python', 'TensorFlow/PyTorch', 'Statistics', 'Data Visualization', 'Neural Networks'],
            careers: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'Data Analyst']
        }
    };

    let recommendationHTML = '';
    if (recommended && recommendationsData[recommended]) {
        const rec = recommendationsData[recommended];
        recommendationHTML = `
            <h3> Your Recommended Specialisation</h3>
            <div class="recommendation-card">
                <h3>${rec.title}</h3>
                <p>${rec.description}</p>
                <div style="margin-top: 12px;">
                    <strong style="color: var(--dark);">Key Skills:</strong>
                    <span>${rec.skills.join(' • ')}</span>
                </div>
                <div style="margin-top: 8px;">
                    <strong style="color: var(--dark);">Career Paths:</strong>
                    <span>${rec.careers.join(' • ')}</span>
                </div>
                <span class="spec-badge"> Recommended</span>
            </div>
        `;
    } else {
        recommendationHTML = `
            <div class="recommendation-card" style="border-left-color: var(--warning);">
                <h3> Need More Data?</h3>
                <p>We need a bit more information to determine your ideal specialisation. 
                Consider retaking the quiz and answering all questions carefully.</p>
                <a href="quiz.html" class="btn btn-primary" style="margin-top: 12px;">Retake Quiz</a>
            </div>
        `;
    }
    
    recommendations.innerHTML = recommendationHTML;
}

// ========================================
// CANVAS RENDERING - RADAR/SPIDER CHART
// ========================================

/**
 * Renders a radar/spider chart on the canvas
 * @param {Object} scores - The scores object
 */
function renderCanvas(scores) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart configuration
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 160;
    const categories = ['low_level', 'ar_vr', 'full_stack', 'machine_learning'];
    const labels = ['Low-Level\nProgramming', 'AR/VR', 'Full-Stack\nWeb Dev', 'Machine\nLearning'];
    const colors = ['#4A6CF7', '#FF6B6B', '#48C9B0', '#F39C12'];
    
    // Get scores
    const values = categories.map(key => {
        const score = scores.scores[key];
        return score ? score.percentage / 100 : 0;
    });
    
    const maxScore = Math.max(...values, 0.1);
    const normalizedValues = values.map(v => v / maxScore * radius);
    
    // Draw grid
    const numRings = 5;
    for (let ring = 1; ring <= numRings; ring++) {
        const ringRadius = (ring / numRings) * radius;
        ctx.beginPath();
        for (let i = 0; i < categories.length; i++) {
            const angle = getAngle(i, categories.length);
            const x = centerX + ringRadius * Math.cos(angle);
            const y = centerY + ringRadius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // Draw axes
    for (let i = 0; i < categories.length; i++) {
        const angle = getAngle(i, categories.length);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw labels
        const labelX = centerX + (radius + 30) * Math.cos(angle);
        const labelY = centerY + (radius + 30) * Math.sin(angle);
        ctx.fillStyle = '#333';
        ctx.font = '12px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const labelLines = labels[i].split('\n');
        if (labelLines.length === 2) {
            ctx.fillText(labelLines[0], labelX, labelY - 8);
            ctx.fillText(labelLines[1], labelX, labelY + 8);
        } else {
            ctx.fillText(labels[i], labelX, labelY);
        }
        
        // Draw value labels at end of axes
        const valX = centerX + (radius + 10) * Math.cos(angle);
        const valY = centerY + (radius + 10) * Math.sin(angle);
        ctx.fillStyle = colors[i];
        ctx.font = 'bold 11px Segoe UI, sans-serif';
        ctx.fillText(`${Math.round(values[i] * 100)}%`, valX, valY);
    }
    
    // Draw data polygon with gradient fill
    ctx.beginPath();
    for (let i = 0; i < categories.length; i++) {
        const angle = getAngle(i, categories.length);
        const r = normalizedValues[i];
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    
    // Fill with gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(74, 108, 247, 0.3)');
    gradient.addColorStop(1, 'rgba(74, 108, 247, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Stroke
    ctx.strokeStyle = '#4A6CF7';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw data points
    for (let i = 0; i < categories.length; i++) {
        const angle = getAngle(i, categories.length);
        const r = normalizedValues[i];
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        
        // Glow effect
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 12);
        glow.addColorStop(0, colors[i]);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Point
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Draw center title
    ctx.fillStyle = 'rgba(74, 108, 247, 0.15)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#4A6CF7';
    ctx.font = 'bold 11px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SKILLS', centerX, centerY - 6);
    ctx.fillText('PROFILE', centerX, centerY + 10);
    
    // Add decorative particles/confetti if score is high
    const averageScore = values.reduce((a, b) => a + b, 0) / values.length;
    if (averageScore > 0.6) {
        drawCelebrationParticles(centerX, centerY, averageScore);
    }
}

/**
 * Calculates angle for radar chart
 * @param {number} index - The index of the category
 * @param {number} total - Total number of categories
 * @returns {number} - Angle in radians
 */
function getAngle(index, total) {
    return (index / total) * Math.PI * 2 - Math.PI / 2;
}

// ========================================
// CELEBRATION PARTICLES
// ========================================

/**
 * Draws celebration particles on the canvas
 * @param {number} cx - Center X
 * @param {number} cy - Center Y
 * @param {number} intensity - Intensity of celebration
 */
function drawCelebrationParticles(cx, cy, intensity) {
    const numParticles = Math.floor(20 + intensity * 30);
    const colors = ['#FF6B6B', '#FECA57', '#48C9B0', '#4A6CF7', '#FF9FF3', '#FF9F43'];
    
    for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 140;
        const x = cx + distance * Math.cos(angle);
        const y = cy + distance * Math.sin(angle);
        const size = 3 + Math.random() * 6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random shape: circle or rectangle
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * Math.PI * 2);
        
        if (Math.random() > 0.5) {
            // Circle
            ctx.beginPath();
            ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        } else {
            // Rectangle
            ctx.fillStyle = color;
            ctx.fillRect(-size / 2, -size / 2, size, size);
        }
        
        ctx.restore();
    }
}

// ========================================
// RESIZE HANDLER
// ========================================

// Handle canvas resize for responsiveness
function resizeCanvas() {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth - 60;
    if (containerWidth < 400) {
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = containerWidth + 'px';
    } else {
        canvas.style.width = '400px';
        canvas.style.height = '400px';
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ========================================
// INITIALIZATION LOG
// ========================================

console.log('BSE Specialisation Advisor - Results Page loaded successfully');
console.log('Canvas 2D API radar chart rendered');
console.log('© 2026 BSE Specialisation Advisor');