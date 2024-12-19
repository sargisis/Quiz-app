# Quiz Application

This project is a web-based quiz application that displays one question at a time with multiple answer options. Users can select one answer per question and navigate through the quiz using a "Next" button. The final score is displayed at the end of the quiz.

## Features

- **Question Display**: One question is shown at a time with a minimum of four answer choices.
- **Answer Selection**: Users can select only one answer per question.
- **Navigation**:
  - "Next" button to proceed to the next question.
  - "Submit" button is shown after the final question to end the quiz.
- **Score Calculation**: Tracks and displays the total number of correct answers at the end.
- **Error Handling**: Users cannot proceed without selecting an answer.
- **Data Storage**: Quiz questions, options, and correct answers are stored in a JSON file or a JavaScript object.

## Requirements

- HTML5
- CSS3
- JavaScript (ES6+)
- Optional: JSON file for external question storage

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/sargisis/Quiz-app
   ```
2. Navigate to the project directory:
   ```bash
   cd Quiz-app
   ```
3. Open `index.html` in your browser to run the application.

## File Structure

- **index.html**: Main HTML file containing the structure of the quiz.
- **style.css**: Styling for the quiz UI.
- **script.js**: Core logic for the quiz functionality, including navigation, answer validation, and score calculation.
- **questions.json** *(optional)*: External file containing the quiz questions and answers in JSON format.


## Usage

1. Launch the application by opening `index.html` in a browser.
2. Select an answer for the displayed question.
3. Click "Next" to proceed to the next question.
4. After the final question, click "Submit" to view your score.

