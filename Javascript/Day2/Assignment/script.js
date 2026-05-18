let questions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "float", "string"],
        correctAnswer: "var"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Google", "Netscape", "Microsoft", "Apple"],
        correctAnswer: "Netscape"
    },
    {
        question: "Which symbol is used for single line comments?",
        options: ["<!-- -->", "//", "**", "##"],
        correctAnswer: "//"
    },
    {
        question: "Which method is used to print output in console?",
        options: ["console.log()", "print()", "document.write()", "alert()"],
        correctAnswer: "console.log()"
    },
    {
        question: "Which operator is used for strict equality?",
        options: ["=", "==", "===", "!="],
        correctAnswer: "==="
    }
];

let currentQuestion = 0;
let userAnswers = [];
let timerInterval;
let seconds = 0;

function startQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    seconds = 0;

    document.getElementById("results-section").style.display = "none";
    document.getElementById("question-section").style.display = "flex";

    let statusBox = document.getElementById("status-box");
    statusBox.innerHTML = "";
    for (let i = 0; i < questions.length; i++) {
        let dot = document.createElement("div");
        dot.id = "dot-" + i;
        statusBox.appendChild(dot);
    }

    document.getElementById("progress-bar").classList.remove("completed");

    displayQuestion(currentQuestion);
    updateProgressBar();

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    seconds++;
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    document.getElementById("timer").innerText = "Time: " + (minutes < 10 ? "0" : "") + minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

function displayQuestion(index) {
    let q = questions[index];

    document.getElementById("question-number").innerText = "Question " + (index + 1) + " of " + questions.length;
    document.getElementById("question-text").innerText = q.question;

    let optionBtns = document.querySelectorAll(".option-btn");
    for (let i = 0; i < optionBtns.length; i++) {
        optionBtns[i].innerText = q.options[i];

        optionBtns[i].onclick = function () {
            selectAnswer(index, q.options[i]);
        };

        if (userAnswers[index] === q.options[i]) {
            optionBtns[i].classList.add("selected");
        } else {
            optionBtns[i].classList.remove("selected");
        }
    }

    document.getElementById("prev").disabled = (index === 0);

    if (index === questions.length - 1) {
        document.getElementById("next").style.display = "none";
        document.getElementById("submit-btn").style.display = "block";
    } else {
        document.getElementById("next").style.display = "block";
        document.getElementById("submit-btn").style.display = "none";
    }
}

function selectAnswer(questionIndex, selectedOption) {
    userAnswers[questionIndex] = selectedOption;
    document.getElementById("dot-" + questionIndex).classList.add("answered");

    displayQuestion(questionIndex);
    updateProgressBar();
}

function nextQuestion() {
    if (userAnswers[currentQuestion] === null) {
        alert("Please select an answer before proceeding.");
        return;
    }
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion(currentQuestion);
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion(currentQuestion);
    }
}

function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        return true;
    } else {
        return false;
    }
}

function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (checkAnswer(userAnswers[i], questions[i].correctAnswer)) {
            score++;
        }
    }

    let percentage = (score / questions.length) * 100;

    return {
        score: score,
        percentage: percentage
    };
}

function displayResults() {
    if (userAnswers[currentQuestion] === null) {
        alert("Please select an answer for the final question before submitting.");
        return;
    }

    clearInterval(timerInterval);

    let result = calculateScore();

    document.getElementById("question-section").style.display = "none";
    document.getElementById("results-section").style.display = "block";

    document.getElementById("score-display").innerText = "Total Score: " + result.score + " / " + questions.length;
    document.getElementById("percentage-display").innerText = "Percentage: " + result.percentage + "%";

    let passFailMsg = document.getElementById("pass-fail-message");
    if (result.percentage >= 60) {
        passFailMsg.innerText = "Result: PASSED";
        passFailMsg.className = "pass";
    } else {
        passFailMsg.innerText = "Result: FAILED";
        passFailMsg.className = "fail";
    }

    let reviewContainer = document.getElementById("detailed-review");
    reviewContainer.innerHTML = "<h3>Detailed Answer Review</h3>";

    for (let i = 0; i < questions.length; i++) {
        let isCorrect = checkAnswer(userAnswers[i], questions[i].correctAnswer);

        let item = document.createElement("div");
        item.className = "review-item " + (isCorrect ? "correct-review" : "wrong-review");

        item.innerHTML = `
            <p><strong>Q${i + 1}: ${questions[i].question}</strong></p>
            <p>Your Answer: <span style="color: ${isCorrect ? '#2ecc71' : '#e74c3c'}; font-weight: bold;">${userAnswers[i]}</span></p>
            <p>Correct Answer: <span style="color: #2ecc71; font-weight: bold;">${questions[i].correctAnswer}</span></p>
            <p>Status: <strong>${isCorrect ? 'Correct ✅' : 'Wrong ❌'}</strong></p>
        `;

        reviewContainer.appendChild(item);
    }
}

function updateProgressBar() {
    let answeredCount = 0;

    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] !== null) {
            answeredCount++;
        }
    }

    let percentage = (answeredCount / questions.length) * 100;

    let progressBar = document.getElementById("progress-bar");
    progressBar.style.width = percentage + "%";

    if (percentage === 100) {
        progressBar.classList.add("completed");
    } else {
        progressBar.classList.remove("completed");
    }
}

function restartQuiz() {
    startQuiz();
}

window.onload = startQuiz;