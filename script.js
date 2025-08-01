// Game state variables
let currentWord = '';
let currentHint = '';
let guessedWord = [];
let wrongLetters = [];
let correctLetters = [];
let wrongGuessCount = 0;
let gameWon = false;
let gameLost = false;
let wins = 0;
let losses = 0;

// Word bank with hints
const wordsWithHints = [
    { word: 'JAVASCRIPT', hint: 'Popular programming language for web development' },
    { word: 'COMPUTER', hint: 'Electronic device used for processing data' },
    { word: 'KEYBOARD', hint: 'Input device with letters and numbers' },
    { word: 'INTERNET', hint: 'Global network connecting computers worldwide' },
    { word: 'PROGRAMMING', hint: 'Process of creating computer software' },
    { word: 'ALGORITHM', hint: 'Step-by-step procedure for solving problems' },
    { word: 'DATABASE', hint: 'Organized collection of structured information' },
    { word: 'WEBSITE', hint: 'Collection of web pages on the internet' },
    { word: 'SOFTWARE', hint: 'Programs and applications that run on computers' },
    { word: 'HARDWARE', hint: 'Physical components of a computer system' },
    { word: 'BROWSER', hint: 'Application used to access websites' },
    { word: 'CODING', hint: 'Writing instructions for computers' },
    { word: 'PYTHON', hint: 'Programming language named after a snake' },
    { word: 'FUNCTION', hint: 'Reusable block of code that performs a task' },
    { word: 'VARIABLE', hint: 'Container for storing data values' },
    { word: 'DEBUGGING', hint: 'Process of finding and fixing errors in code' },
    { word: 'FRAMEWORK', hint: 'Pre-written code library for developers' },
    { word: 'RESPONSIVE', hint: 'Design that adapts to different screen sizes' },
    { word: 'SECURITY', hint: 'Protection against unauthorized access' },
    { word: 'ENCRYPTION', hint: 'Process of encoding information' },
    { word: 'ARTIFICIAL', hint: 'Type of intelligence created by humans' },
    { word: 'MACHINE', hint: 'Device that performs work automatically' },
    { word: 'NETWORK', hint: 'System of interconnected computers' },
    { word: 'SERVER', hint: 'Computer that provides services to other computers' },
    { word: 'CLIENT', hint: 'Computer that requests services from a server' }
];

// Hangman body parts in order
const hangmanParts = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];

// DOM elements
const wordDisplay = document.getElementById('word-display');
const hintText = document.getElementById('hint-text');
const wrongLettersDisplay = document.getElementById('wrong-letters-display');
const alphabetContainer = document.getElementById('alphabet');
const gameMessage = document.getElementById('game-message');
const playAgainBtn = document.getElementById('play-again-btn');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');

// Initialize game
function initGame() {
    // Load scores from localStorage
    wins = parseInt(localStorage.getItem('hangman-wins') || '0');
    losses = parseInt(localStorage.getItem('hangman-losses') || '0');
    updateScoreDisplay();
    
    // Create alphabet buttons
    createAlphabet();
    
    // Start new game
    newGame();
}

// Create alphabet buttons
function createAlphabet() {
    alphabetContainer.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'letter-btn';
        button.id = `btn-${letter}`;
        button.addEventListener('click', () => guessLetter(letter));
        alphabetContainer.appendChild(button);
    }
}

// Start a new game
function newGame() {
    // Reset game state
    wrongLetters = [];
    correctLetters = [];
    wrongGuessCount = 0;
    gameWon = false;
    gameLost = false;
    
    // Select random word
    const randomIndex = Math.floor(Math.random() * wordsWithHints.length);
    currentWord = wordsWithHints[randomIndex].word;
    currentHint = wordsWithHints[randomIndex].hint;
    
    // Initialize guessed word array
    guessedWord = Array(currentWord.length).fill('_');
    
    // Update display
    updateWordDisplay();
    updateHintDisplay();
    updateWrongLettersDisplay();
    updateGameMessage('');
    
    // Reset alphabet buttons
    resetAlphabetButtons();
    
    // Hide hangman parts
    hideAllHangmanParts();
    
    // Hide play again button
    playAgainBtn.style.display = 'none';
}

// Update word display
function updateWordDisplay() {
    wordDisplay.innerHTML = '';
    guessedWord.forEach(letter => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = letter;
        wordDisplay.appendChild(span);
    });
}

// Update hint display
function updateHintDisplay() {
    hintText.textContent = currentHint;
}

// Update wrong letters display
function updateWrongLettersDisplay() {
    wrongLettersDisplay.textContent = wrongLetters.join(' ');
}

// Update game message
function updateGameMessage(message, className = '') {
    gameMessage.textContent = message;
    gameMessage.className = className;
}

// Update score display
function updateScoreDisplay() {
    winsDisplay.textContent = wins;
    lossesDisplay.textContent = losses;
}

// Reset alphabet buttons
function resetAlphabetButtons() {
    const buttons = document.querySelectorAll('.letter-btn');
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove('wrong', 'correct');
    });
}

// Hide all hangman parts
function hideAllHangmanParts() {
    hangmanParts.forEach(part => {
        const element = document.getElementById(part);
        if (element) {
            element.style.display = 'none';
        }
    });
}

// Show hangman part
function showHangmanPart(partIndex) {
    if (partIndex < hangmanParts.length) {
        const part = document.getElementById(hangmanParts[partIndex]);
        if (part) {
            part.style.display = 'block';
            part.classList.add('fade-in');
        }
    }
}

// Guess a letter
function guessLetter(letter) {
    if (gameWon || gameLost) return;
    
    const button = document.getElementById(`btn-${letter}`);
    button.disabled = true;
    
    if (currentWord.includes(letter)) {
        // Correct guess
        correctLetters.push(letter);
        button.classList.add('correct');
        
        // Update guessed word
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        
        updateWordDisplay();
        
        // Check if word is complete
        if (!guessedWord.includes('_')) {
            gameWon = true;
            wins++;
            localStorage.setItem('hangman-wins', wins.toString());
            updateScoreDisplay();
            updateGameMessage('🎉 Congratulations! You won!', 'game-message-win');
            playAgainBtn.style.display = 'inline-block';
        }
    } else {
        // Wrong guess
        wrongLetters.push(letter);
        button.classList.add('wrong');
        wrongGuessCount++;
        
        updateWrongLettersDisplay();
        showHangmanPart(wrongGuessCount - 1);
        
        // Check if game is lost
        if (wrongGuessCount >= hangmanParts.length) {
            gameLost = true;
            losses++;
            localStorage.setItem('hangman-losses', losses.toString());
            updateScoreDisplay();
            updateGameMessage(`💀 Game Over! The word was: ${currentWord}`, 'game-message-lose');
            playAgainBtn.style.display = 'inline-block';
            
            // Show the complete word
            guessedWord = currentWord.split('');
            updateWordDisplay();
        }
    }
}

// Handle keyboard input
function handleKeyPress(event) {
    if (gameWon || gameLost) return;
    
    const letter = event.key.toUpperCase();
    if (letter >= 'A' && letter <= 'Z') {
        const button = document.getElementById(`btn-${letter}`);
        if (button && !button.disabled) {
            guessLetter(letter);
        }
    }
}

// Add event listeners
document.addEventListener('keydown', handleKeyPress);
playAgainBtn.addEventListener('click', newGame);

// Add some extra interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add sound effects (visual feedback)
    function addClickEffect(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }
    
    // Add click effects to buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('letter-btn') || e.target.classList.contains('btn')) {
            addClickEffect(e.target);
        }
    });
    
    // Add hover effect for hangman SVG
    const hangmanSvg = document.getElementById('hangman-svg');
    hangmanSvg.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    hangmanSvg.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Initialize the game when the page loads
initGame();