# N-Back Memory Game

A local web-based N-Back memory training game built with Flask, HTML, CSS, and JavaScript.

## Features

- **N-Back Training**: Choose from 1-Back to 5-Back difficulty levels
- **Visual Interface**: Clean, responsive design with number buttons
- **Performance Tracking**: Time tracking and accuracy scoring
- **Local Deployment**: Runs entirely on your local machine

## Installation and Setup

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation Steps

1. **Create the project directory structure**:
   ```
   nback-game/
   ├── app.py
   ├── requirements.txt
   ├── README.md
   ├── templates/
   │   └── index.html
   └── static/
       ├── style.css
       └── script.js
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   python app.py
   ```

4. **Open your browser and navigate to**:
   ```
   http://localhost:5000
   ```

## How to Play

1. **Select N-Back Level**: Choose from 1-Back to 5-Back (2-Back is default)
2. **Memory Phase**: The game will show you N numbers to memorize
3. **Game Phase**: For each new number shown, click the number that appeared N positions back
4. **Scoring**: Complete all 10 questions correctly to get a time score, or see how many you got right if you make a mistake

### Example (2-Back):
- Shows: 3 → Memorize
- Shows: 7 → Memorize  
- Shows: 1 → Click: 3 (2 positions back)
- Shows: 9 → Click: 7 (2 positions back)
- Shows: 5 → Click: 1 (2 positions back)

## Game Rules

- **Memory Phase**: First, you'll see N numbers displayed for 1.5 seconds each
- **Game Phase**: When a new number appears, select the number from N positions back
- **Scoring**: Try to get all 10 questions correct
- **Game Over**: Game ends immediately if you make a mistake
- **Time Score**: Your final score is the time taken to complete all questions correctly

## Technical Details

- **Backend**: Flask (Python web framework)
- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Styling**: Custom CSS with responsive design
- **No External Dependencies**: All assets are local

## File Structure

- `app.py`: Flask server application
- `templates/index.html`: Main HTML template
- `static/style.css`: CSS styling
- `static/script.js`: JavaScript game logic
- `requirements.txt`: Python dependencies
- `README.md`: This documentation

## Customization

You can easily modify the game by editing:
- **Game length**: Change the sequence length in `script.js`
- **Display timing**: Adjust the timeout values in `showMemoryPhase()`
- **Styling**: Modify `style.css` for different colors or layouts
- **N-Back levels**: Add more levels by updating the select options

## Troubleshooting

- **Port already in use**: Change the port in `app.py` from 5000 to another number
- **Flask not found**: Make sure you've installed the requirements: `pip install -r requirements.txt`
- **Static files not loading**: Ensure the `static/` and `templates/` directories exist

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.
