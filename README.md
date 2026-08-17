# BSE Specialisation Advisor

An interactive web application designed to help BSE (Bachelor of Science in Engineering) students discover their ideal specialisation through a comprehensive assessment quiz and skills analysis. The application features real-time form validation, timed quizzes, interactive media, and visual analytics to guide career decision-making.

---

## 🎯 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Project Components](#project-components)
- [Specialisations](#specialisations)
- [Validation Rules](#validation-rules)
- [Quiz Questions](#quiz-questions)
- [Scoring System](#scoring-system)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 📋 Student Registration
- **Real-time form validation** with instant visual feedback
- **Custom validation patterns** for:
  - Student IDs: `BSE-YYYY-XXX` format
  - Email addresses: Must end with `@alustudent.com`
  - Phone numbers: Mauritian format validation
  - Full name: Alphabetic characters only
- **Error handling** with clear, user-friendly messages
- **Data persistence** using browser session storage

### 🎓 Interactive Quiz
- **10 comprehensive questions** covering 4 specialisation areas
- **Multiple question types**:
  - Multiple choice questions
  - Image hotspots with clickable regions
  - Audio-prompted questions with custom player controls
- **Progress tracking** with visual progress bar
- **10-minute countdown timer** with warning indicators
- **Auto-submit** functionality when time expires

### 📊 Results Dashboard
- **Category-based scoring** across 4 specialisations:
  - Low-Level Programming
  - AR/VR Development
  - Full-Stack Web Development
  - Machine Learning
- **Visual analytics** with radar/spider charts
- **Performance metrics**:
  - Percentage scores per category
  - Total correct answers
  - Time efficiency bonus
  - Streak multipliers
- **Personalized recommendations** based on highest scores
- **Detailed explanations** for quiz answers

### 📱 Responsive Design
- **Mobile-first approach** for all screen sizes
- **Flexbox & CSS Grid** layouts
- **Touch-friendly** interface elements
- **Adaptive navigation** with hamburger menu

### 🎨 Visual Effects
- **Smooth animations** and transitions
- **Celebration particles** for high-scoring results
- **Custom Canvas 2D rendering** for data visualization
- **Interactive hover effects** on buttons and form fields

### 📞 Contact & Feedback
- **Contact form** for student inquiries
- **Feedback submission** system
- **Form validation** before submission

---

## 📁 Project Structure

```
summative/
├── README.md                          # This file
├── html/                              # HTML pages
│   ├── index.html                     # Landing/registration page
│   ├── quiz.html                      # Quiz page
│   ├── results.html                   # Results dashboard
│   └── contacts.html                  # Contact & feedback page
├── css/
│   └── styles.css                     # All styling (responsive, animations)
├── js/
│   ├── landing.js                     # Registration form logic
│   ├── quiz.js                        # Quiz engine & state management
│   ├── results.js                     # Results calculation & visualization
│   └── contacts.js                    # Contact form handling
└── assets/
    ├── Gemini_Generated_Image_dlzm6zdlzm6zdlzm (1).jpg  # Quiz hotspot image
    └── NoteGPT_Speech_1786946706622.mp3                # Audio question
```

---

## 🛠️ Technologies

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup & page structure |
| **CSS3** | Responsive design, animations, layouts (Flexbox, Grid) |
| **JavaScript (ES6+)** | Core application logic, form validation, data management |
| **Canvas 2D API** | Radar chart visualization |
| **Session Storage** | Client-side data persistence |

---

## 📥 Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local or remote HTTP server (not required for file:// protocol, but recommended)

### Steps

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd summative
   ```

2. **Run a local server** (optional but recommended)
   ```bash
   # Using Python 3
   python -m http.server 5500
   
   # Using Node.js (with http-server)
   npx http-server -p 5500
   ```

3. **Open in browser**
   - Local server: `http://localhost:5500/html/index.html`
   - Direct file: Open `html/index.html` in your browser

---

## 🚀 Usage Guide

### Step 1: Student Registration (Landing Page)
1. Visit the **home page** (`index.html`)
2. Fill in your details:
   - **Full Name** - Alphabetic characters only
   - **Student ID** - Format: `BSE-YYYY-XXX` (e.g., `BSE-2023-001`)
   - **Email** - Must be `@alustudent.com`
   - **Phone Number** - Mauritian format
3. Click **"Start Quiz"** to proceed

### Step 2: Complete the Quiz
1. You have **10 minutes** to answer 10 questions
2. Questions cover 4 specialisation areas
3. **Navigation**: Use Previous/Next buttons or arrow keys
4. **Answer types**:
   - Click radio buttons for text questions
   - Click on circles for image hotspot questions
   - Play audio and select answers for audio questions
5. Click **"Submit Quiz"** when complete or when time expires

### Step 3: View Results
1. See your **score breakdown** by specialisation
2. View **recommended specialisation** based on highest score
3. Review **visual chart** showing performance across categories
4. Read **detailed explanations** for each answer

### Step 4: Contact & Feedback (Optional)
1. Navigate to **Contacts** page
2. Submit inquiries or feedback
3. Form validates before submission

---

## 🧩 Project Components

### Landing Page (`index.html` + `landing.js`)
- Student registration form
- Real-time validation
- Data storage for quiz session

### Quiz Page (`quiz.html` + `quiz.js`)
- Quiz engine with state management
- Timer functionality
- Multiple question type handlers
- Progress tracking
- Auto-submit on timeout

### Results Page (`results.html` + `results.js`)
- Score calculation & aggregation
- Canvas-based radar chart rendering
- Specialisation recommendation
- Performance analytics

### Contact Page (`contacts.html` + `contacts.js`)
- Feedback form
- Form validation
- Submission handling

### Styling (`styles.css`)
- Responsive design with mobile-first approach
- CSS variables for theming
- Animations & transitions
- Component-based styling

---

## 🎯 Specialisations

The quiz assesses students across **4 specialisation areas**:

| Specialisation | Focus Area | Key Skills |
|---|---|---|
| **Low-Level Programming** | System-level code, hardware interaction | Memory management, assembly, pointers |
| **AR/VR Development** | Immersive technologies | 3D graphics, real-time rendering, spatial computing |
| **Full-Stack Web Development** | Complete web applications | Frontend, backend, databases, deployment |
| **Machine Learning** | AI & data science | Algorithms, data processing, model training |

---

## ✅ Validation Rules

### Student ID
- Format: `BSE-YYYY-XXX`
- Example: `BSE-2023-001`
- Regex: `^BSE-\d{4}-\d{3}$`

### Email
- Must end with `@alustudent.com`
- Example: `john.doe@alustudent.com`
- Regex: `^[^\s@]+@alustudent\.com$`

### Phone Number
- Mauritian format: `+230 XXXX XXXX`
- Example: `+230 5911 1234`
- Regex: `^\+230\s\d{4}\s\d{4}$`

### Full Name
- Alphabetic characters only
- Spaces and hyphens allowed
- Example: `John Doe-Smith`
- Regex: `^[a-zA-Z\s'-]+$`

---

## 📝 Quiz Questions

### Question 1 - Low-Level Programming (Multiple Choice)
*Which of the following is a characteristic of low-level programming?*

### Question 2 - AR/VR (Multiple Choice)
*What technology combines real-world environments with computer-generated information?*

### Question 3 - Full-Stack (Multiple Choice)
*Which of the following is NOT a frontend technology?*

### Question 4 - Machine Learning (Multiple Choice)
*What type of learning involves training a model on labeled data?*

### Question 5 - Low-Level (Multiple Choice)
*What is the primary advantage of using assembly language?*

### Question 6 - AR/VR (Image Hotspot) ⭐
*Which technology is used to create immersive 3D environments that replace the real world?*
- **Interactive Image** with three clickable circles (VR, AR, MR)

### Question 7 - Full-Stack (Multiple Choice)
*What does the acronym CRUD stand for in web development?*

### Question 8 - Machine Learning (Audio Prompt) 🔊
*Which algorithm is commonly used for classification tasks?*
- **Custom audio player** with play/pause/replay controls

### Question 9 - Low-Level (Multiple Choice)
*What is the purpose of a linker in low-level programming?*

### Question 10 - Full-Stack (Multiple Choice)
*Which of the following is a NoSQL database?*

---

## 📊 Scoring System

### Category Scoring
- **Points awarded** for each correct answer in a category
- **Percentage calculated** per category: `(correct / total) × 100`

### Bonus Multipliers
- **Time Bonus**: Up to 10 bonus points for completing early
- **Streak Multiplier**: Consecutive correct answers boost final score (max 2.0x)

### Recommendation Logic
- **Highest scoring category** is recommended as primary specialisation
- **Backup recommendations** based on secondary scores

### Result Display
- Raw scores (e.g., 3/3)
- Percentages (e.g., 100%)
- Visual radar chart
- Written explanation

---

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit (`git commit -m 'Add feature'`)
5. Push (`git push origin feature/improvement`)
6. Open a Pull Request

---

## 📄 License

This project is proprietary software for the BSE program. All rights reserved.

---

## 📧 Support & Feedback

Have questions or suggestions? Use the **Contacts** page within the application to submit feedback, or contact the development team directly.

---

**Last Updated**: August 2026  
**Version**: 1.0  
**Status**: Production Ready
