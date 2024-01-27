//Fraction.js

//Noah Jones
//Dr. Seals' COMP-5970
//Dev Assignment 2B



//declarations

//restart button needs event listener!!
let restartBtn = document.getElementById("restartBtn").addEventListener('click', () => {
    restartGame();
});


let qNum = document.getElementById("qNum");
let score = document.getElementById("score");
let question = document.getElementById("question");
let buttons = document.getElementsByTagName("button");
let startBtn = document.getElementById("startBtn");
let finalScore = document.getElementById("final-score");
let startGameBox = document.getElementById("startGame");
let inGameBox = document.getElementById("inGame");
let endGameBox = document.getElementById("endGame");
let progressBar = document.getElementById("progress");
let messageBox = document.getElementById("message");

// vars
let operand1, operand2, operatorSelector, correctOptionIndex, correctAnswer, timerInterval;
let operators = ['+', '-', '*', '/'];

// add event listener
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        let selectedOption = buttons[i].innerText;
        if (selectedOption === correctAnswer) {
            handleCorrect(i);
        } else {
            handleIncorrect(i);
        }
        clearInterval(timerInterval);
        nextQuestion(i);
    });
}

// implement restart button!
function restartGame() {
    score.innerHTML = "0";
    qNum.innerHTML = "0";
    showNextQuestion();

    inGameBox.style.display = "block";
    startGameBox.style.display = "none";
    endGameBox.style.display = "none";
    progressBar.style.width = "100%";
}

// final screen
function gameFinished() {
    inGameBox.style.display = "none";
    startGameBox.style.display = "none";
    endGameBox.style.display = "flex";
    showFinalMessage();
}

//next question
function showNextQuestion() {
    progressBar.style.width = "100%";
    startTimer();
    finalScore.innerHTML = score.innerHTML;
    if (qNum.innerText == "10") {
        gameFinished();
    }

    // hardcoded questions array:
    let questions = [
        { question: "1/2 + 1/3", answer: "5/6" },
        { question: "3/4 - 1/4", answer: "1/2" },
        { question: "2/5 + 3/5", answer: "1" },
        { question: "2/3 - 1/6", answer: "1/2" }
        //add more
    ];

    let randomIndex = Math.floor(Math.random() * questions.length);
    let selectedQuestion = questions[randomIndex];
    question.innerHTML = selectedQuestion.question;
    correctAnswer = selectedQuestion.answer;

    generateOptions();
    updateQuestionNumber();
}

// options for buttons : correct / inocrrect answers
function generateOptions() {
    let usedOptions = new Set(); // Set to store used options
    correctOptionIndex = Math.floor(Math.random() * 4); // Randomly select the index for the correct option
    buttons[correctOptionIndex].innerHTML = correctAnswer; // Assign the correct answer to the correct button

    usedOptions.add(correctAnswer); // add correct answer to options list

    for (let i = 0; i < 4; i++) {
        if (i !== correctOptionIndex) {
            let option;
            // Generate a unique random incorrect option (fraction)
            do {
                option = generateRandomFraction();
            } while (usedOptions.has(option)); // Check for duplicates
            usedOptions.add(option); // Add the option to the used options set
            buttons[i].innerHTML = option; // Assign the option to the button
        }
    }
}


//generate random fraction //might not use?
function generateRandomFraction() {
    let numerator = Math.floor(Math.random() * 10) + 1;
    let denominator = Math.floor(Math.random() * 10) + 1;
    return `${numerator}/${denominator}`;
}

// increment question #
function updateQuestionNumber() {
    qNum.innerHTML = parseInt(qNum.innerHTML) + 1;
}

// upon answering correctly:
function handleCorrect(index) {
    buttons[index].style.color = "#fff";
    buttons[index].style.backgroundColor = "green";
    score.innerHTML = parseInt(score.innerHTML) + 1; // Increment score by 1
}

// upon answering incorrectly:
function handleIncorrect(index) {
    buttons[index].style.color = "#fff";
    buttons[index].style.backgroundColor = "#fb3640";
}

//delay?
function nextQuestion(index) {
    setTimeout(() => {
        showNextQuestion();
        buttons[index].style.color = "#000";
        buttons[index].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }, 500);
}

//final message func
function showFinalMessage() {
    clearInterval(timerInterval);
    messageBox.innerHTML = "Your final score: " + finalScore.innerText;
}

//timer for questions
function startTimer() {
    timerInterval = setInterval(() => {
        progressBar.style.width = (parseInt(progressBar.style.width) - 1) + "%";
        if (parseInt(progressBar.style.width) == 0) {
            clearInterval(timerInterval);
            showNextQuestion();
        }
    }, 100);
}

// event listener for the start button //add 'let = var' at top
startBtn.addEventListener('click', () => {
    restartGame();
});

