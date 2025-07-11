class NBackGame {
    constructor() {
        this.nLevel = 2;
        this.gameState = 'setup';
        this.sequence = [];
        this.currentIndex = 0;
        this.startTime = null;
        this.correctAnswers = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.updateNLevelTexts();
    }
    
    initializeElements() {
        // Screens
        this.setupScreen = document.getElementById('setup-screen');
        this.memoryScreen = document.getElementById('memory-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        
        // Controls
        this.nLevelSelect = document.getElementById('n-level');
        this.startGameBtn = document.getElementById('start-game');
        this.playAgainBtn = document.getElementById('play-again');
        
        // Display elements
        this.memoryNumber = document.getElementById('memory-number');
        this.gameNumber = document.getElementById('game-number');
        this.memoryProgress = document.getElementById('memory-progress');
        this.gameProgress = document.getElementById('game-progress');
        this.finalScore = document.getElementById('final-score');
        this.numberSequence = document.getElementById('number-sequence');
        
        // Text elements
        this.nLevelText = document.getElementById('n-level-text');
        this.nLevelText2 = document.getElementById('n-level-text2');
        this.nBackText = document.getElementById('n-back-text');
        
        // Number buttons
        this.numberButtons = document.querySelectorAll('.number-btn');
    }
    
    bindEvents() {
        this.nLevelSelect.addEventListener('change', (e) => {
            this.nLevel = parseInt(e.target.value);
            this.updateNLevelTexts();
        });
        
        this.startGameBtn.addEventListener('click', () => {
            this.startGame();
        });
        
        this.playAgainBtn.addEventListener('click', () => {
            this.resetGame();
        });
        
        this.numberButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const number = e.target.dataset.number;
                this.handleNumberClick(number);
            });
        });
    }
    
    updateNLevelTexts() {
        this.nLevelText.textContent = this.nLevel;
        this.nLevelText2.textContent = this.nLevel;
        this.nBackText.textContent = this.nLevel;
    }
    
    generateSequence() {
        const sequence = [];
        for (let i = 0; i < 10; i++) {
            sequence.push(Math.floor(Math.random() * 10).toString());
        }
        return sequence;
    }
    
    startGame() {
        this.sequence = this.generateSequence();
        this.currentIndex = 0;
        this.correctAnswers = 0;
        this.gameState = 'showing';
        
        this.showScreen('memory');
        this.showMemoryPhase(0);
    }
    
    showMemoryPhase(index) {
        if (index < this.nLevel) {
            this.memoryNumber.textContent = this.sequence[index];
            this.memoryProgress.textContent = `Memorize: ${index + 1}/${this.nLevel}`;
            this.currentIndex = index;
            
            setTimeout(() => {
                this.showMemoryPhase(index + 1);
            }, 1500);
        } else {
            setTimeout(() => {
                this.gameState = 'playing';
                this.startTime = Date.now();
                this.showScreen('game');
                this.showGamePhase(this.nLevel);
            }, 500);
        }
    }
    
    showGamePhase(index) {
        this.currentIndex = index;
        this.gameNumber.textContent = this.sequence[index];
        
        const questionNumber = index - this.nLevel + 1;
        const totalQuestions = 10 - this.nLevel;
        this.gameProgress.textContent = `Question: ${questionNumber}/${totalQuestions}`;
    }
    
    handleNumberClick(clickedNumber) {
        if (this.gameState !== 'playing') return;
        
        const targetNumber = this.sequence[this.currentIndex - this.nLevel];
        const isCorrect = clickedNumber === targetNumber;
        
        if (isCorrect) {
            this.correctAnswers++;
            const nextIndex = this.currentIndex + 1;
            
            if (nextIndex < this.sequence.length) {
                this.showGamePhase(nextIndex);
            } else {
                this.finishGame(true);
            }
        } else {
            this.finishGame(false);
        }
    }
    
    finishGame(success) {
        this.gameState = 'finished';
        const endTime = Date.now();
        
        if (success) {
            const totalTime = ((endTime - this.startTime) / 1000).toFixed(2);
            this.finalScore.textContent = `Complete! ${totalTime}s (10/10 questions correct)`;
        } else {
            this.finalScore.textContent = `Failed (${this.correctAnswers}/10 questions correct)`;
        }
        
        this.numberSequence.textContent = this.sequence.join(' ');
        this.showScreen('result');
    }
    
    resetGame() {
        this.gameState = 'setup';
        this.sequence = [];
        this.currentIndex = 0;
        this.startTime = null;
        this.correctAnswers = 0;
        
        this.showScreen('setup');
    }
    
    showScreen(screenName) {
        // Hide all screens
        this.setupScreen.classList.add('hidden');
        this.memoryScreen.classList.add('hidden');
        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.add('hidden');
        
        // Show target screen
        switch (screenName) {
            case 'setup':
                this.setupScreen.classList.remove('hidden');
                break;
            case 'memory':
                this.memoryScreen.classList.remove('hidden');
                break;
            case 'game':
                this.gameScreen.classList.remove('hidden');
                break;
            case 'result':
                this.resultScreen.classList.remove('hidden');
                break;
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NBackGame();
});
