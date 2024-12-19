const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let quizData = [];
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display a single question
function displayQuestion() {
    const questionData = quizData[currentQuestion];
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = `<p>${questionData.question}</p>`;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    shuffledOptions.forEach(optionText => {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = optionText;

        option.appendChild(radio);
        option.appendChild(document.createTextNode(optionText));
        optionsElement.appendChild(option);
    });

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);

    submitButton.style.display = 'inline-block';
    nextButton.style.display = 'none';
}

// Check if the selected answer is correct
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (!selectedOption) {
        alert("Please choose an answer.");
        return;
    }

    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
        score++;
    } else {
        incorrectAnswers.push({
            question: quizData[currentQuestion].question,
            incorrectAnswer: answer,
            correctAnswer: quizData[currentQuestion].answer
        });
    }

    submitButton.style.display = 'none';
    nextButton.style.display = 'inline-block';
}

// Go to the next question or show the result
function goToNextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        displayResult();
    }
}

// Display the result at the end of the quiz
function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    nextButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';

    resultContainer.innerHTML = `You scored ${score} / ${quizData.length}`;
}

// Retry the quiz from the beginning
function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];

    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    nextButton.style.display = 'none';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';

    displayQuestion();
}

// Show the incorrect answers and their corrections
function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    nextButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    incorrectAnswers.forEach(item => {
        incorrectAnswersHtml += `
            <p>
                <strong>Question:</strong> ${item.question}<br>
                <strong>Your Answer:</strong> ${item.incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${item.correctAnswer}
            </p>`;
    });

    resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
        <p>Incorrect Answers:</p>
        ${incorrectAnswersHtml}`;
}

// Load the quiz data
fetch('question.json')
    .then(response => response.json())
    .then(data => {
        quizData = data;
        displayQuestion();
    })
    .catch(error => {
        console.error('Error loading quiz data:', error);
        resultContainer.innerHTML = 'Failed to load quiz data. Please try again later.';
    });

// Event Listeners
submitButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', goToNextQuestion);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
