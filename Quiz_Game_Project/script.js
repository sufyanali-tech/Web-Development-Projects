let startScreen = document.querySelector("#start-screen");
let quizQuestion = document.querySelector("#quiz-questions");
let startQuizButton = document.querySelector("#start-quiz");
let resultScreen = document.querySelector("#result-screen");
let restartButton = document.querySelector("#restart-btn");
let currentQuestionEl = document.querySelector("#current-question");
let totalQuestionsEl = document.querySelector("#max-questions");
let obtainedScore = document.querySelector("#obtained-score");
let userScoreEl = document.querySelector("#score");
let progressBar = document.querySelector("#progress");
let questionStatement = document.querySelector(".question-statement");
let answerContainer = document.querySelector(".answer-container");
let resultMessage = document.querySelector("#result-message");

let quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Paris", correct: true },
      { text: "Toronto", correct: false },
      { text: "New York", correct: false },
    ],
  },
  {
    question: "What is the capital of Germany?",
    answers: [
      { text: "Doha", correct: false },
      { text: "Bonn", correct: false },
      { text: "Berlin", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the capital of Iran?",
    answers: [
      { text: "Kabul", correct: false },
      { text: "Islamabad", correct: false },
      { text: "Delhi", correct: false },
      { text: "Tehran", correct: true },
    ],
  },
  {
    question: "What is the capital of China?",
    answers: [
      { text: "London", correct: false },
      { text: "Paris", correct: false },
      { text: "Beijing", correct: true },
      { text: "New York", correct: false },
    ],
  },
  {
    question: "What is the capital of the United States?",
    answers: [
      { text: "New York", correct: false },
      { text: "Los Angeles", correct: false },
      { text: "Washington D.C.", correct: true },
      { text: "Chicago", correct: false },
    ],
  },
];

totalQuestionsEl.textContent = quizQuestions.length;

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

startQuizButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userScoreEl.textContent = 0;

  startScreen.classList.remove("active");
  quizQuestion.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answerDisabled = false;

  let questionData = quizQuestions[currentQuestionIndex];

  currentQuestionEl.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  questionStatement.textContent = questionData.question;
  answerContainer.innerHTML = "";

  questionData.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerContainer.append(button);
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;
  answerDisabled = true;

  let selectedButton = event.target;

  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    userScoreEl.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizQuestion.classList.remove("active");
  resultScreen.classList.add("active");

  obtainedScore.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect — you're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You really know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }

  progressBar.style.width = "100%";
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}