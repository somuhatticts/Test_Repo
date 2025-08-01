# 🎯 Hangman Game

A modern, interactive hangman game built with HTML, CSS, and JavaScript. Features a beautiful UI, responsive design, and engaging gameplay.

## 🎮 Features

- **Modern UI Design**: Beautiful gradient backgrounds, smooth animations, and responsive layout
- **Interactive Gameplay**: Click letters or use keyboard input to guess
- **Visual Hangman Drawing**: SVG-based hangman that appears progressively with wrong guesses
- **Word Bank**: 25+ technology-related words with helpful hints
- **Score Tracking**: Persistent win/loss tracking using localStorage
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging visual feedback for all interactions
- **Keyboard Support**: Full keyboard navigation support

## 🚀 How to Play

1. Open `index.html` in your web browser
2. Look at the hint provided for the mystery word
3. Guess letters by clicking the alphabet buttons or using your keyboard
4. Correct guesses reveal letters in the word
5. Wrong guesses add parts to the hangman drawing
6. Win by guessing the complete word before the hangman is fully drawn
7. Track your wins and losses in the scoreboard

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and SVG graphics
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript ES6+**: Game logic, DOM manipulation, and local storage

## 📁 File Structure

```
hangman-game/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # Game logic and interactivity
└── README.md          # Project documentation
```

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful purple-blue gradient theme
- **Card-based Layout**: Clean, modern card design with glassmorphism effects
- **Interactive Buttons**: Hover effects and click animations
- **Color-coded Feedback**: Green for correct guesses, red for wrong ones
- **Smooth Transitions**: All interactions have smooth CSS transitions
- **Mobile-first**: Responsive design that works on all screen sizes

## 🎯 Game Rules

- You have 6 wrong guesses before losing (head, body, left arm, right arm, left leg, right leg)
- Each word comes with a helpful hint
- Scores are automatically saved and persist between sessions
- Use either mouse clicks or keyboard input to play

## 🚀 Running the Game

### Option 1: Direct File Opening
Simply open `index.html` in any modern web browser.

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have it installed)
npx serve .

# Then visit http://localhost:8000
```

## 🎮 Controls

- **Mouse**: Click on letter buttons to guess
- **Keyboard**: Press any letter key (A-Z) to guess
- **Play Again**: Click the "Play Again" button after each game

## 🔧 Customization

You can easily customize the game by modifying:

- **Word Bank**: Add new words and hints in the `wordsWithHints` array in `script.js`
- **Colors**: Modify the CSS custom properties and gradient colors in `styles.css`
- **Difficulty**: Change the number of wrong guesses allowed by modifying the `hangmanParts` array
- **Animations**: Adjust animation durations and effects in the CSS

## 📱 Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Future Enhancements

Potential features that could be added:
- Sound effects
- Multiple difficulty levels
- Custom word categories
- Multiplayer mode
- Leaderboards
- Word definitions
- Hint system with multiple clues

## 📄 License

This project is open source and available under the MIT License.

---

Enjoy playing Hangman! 🎉