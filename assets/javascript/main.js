const questions = [
    {
        question: "Quel est le nom scientifique de l'effet qui cause la montée des marées ?",
        answers: ["A. Effet Doppler", "B. Effet photoélectrique", "C. Effet de marée", "D. Effet Venturi"],
        correct: "C. Effet de marée"
    },
    {
        question: "En quelle année a eu lieu la Révolution russe ?",
        answers: ["A. 1917", "B. 1905", "C. 1921", "D. 1932"],
        correct: "A. 1917"
    },
    {
        question: "Qui a écrit 'À la recherche du temps perdu' ?",
        answers: ["A. Honoré de Balzac", "B. Marcel Proust", "C. Gustave Flaubert", "D. Émile Zola"],
        correct: "B. Marcel Proust"
    },
    {
        question: "Quel est le plus grand désert non polaire du monde ?",
        answers: ["A. Désert de Gobi", "B. Désert de Kalahari", "C. Désert du Sahara", "D. Désert de Namib"],
        correct: "C. Désert du Sahara"
    },
    {
        question: "Quel compositeur a écrit les 'Quatre Saisons' ?",
        answers: ["A. Beethoven", "B. Bach", "C. Mozart", "D. Vivaldi"],
        correct: "D. Vivaldi"
    }
];

let currentQuestionIndex = 0;
let selectedAnswers = {};
let score = 0;

const quizTitle = document.querySelector("#quiz-title");
const quizContent = document.querySelector("#quiz-content");
const resultDiv = document.querySelector("#result");
const startButton = document.querySelector("#start-button");
const nextButton = document.querySelector("#next-button");

function startQuiz() {
    quizTitle.style.display = "none";
    startButton.style.display = "none";
    quizContent.style.display = "block";
    displayQuestion();
}

function displayQuestion() {
    quizContent.innerHTML = ""; 
    const q = questions[currentQuestionIndex];

    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionTitle = document.createElement("h2");
    questionTitle.innerText = `${currentQuestionIndex + 1}. ${q.question}`;
    questionDiv.appendChild(questionTitle);

    const answersContainer = document.createElement("div");
    answersContainer.classList.add("answers-container");

    q.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("answer-button");
        button.type = "button";
        button.innerText = answer;
        button.onclick = () => selectAnswer(currentQuestionIndex, answer, button);
        answersContainer.appendChild(button);
    });

    questionDiv.appendChild(answersContainer);
    quizContent.appendChild(questionDiv);
    nextButton.style.display = "block";
}

function selectAnswer(questionIndex, answer, button) {
    selectedAnswers[questionIndex] = answer;
    const buttons = document.querySelectorAll(".answer-button");
    buttons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

function submitAnswer() {
    if (selectedAnswers[currentQuestionIndex] === undefined) {
        resultDiv.innerHTML = "<p>Veuillez sélectionner une réponse.</p>";
    } else {
        resultDiv.innerHTML = "";
        if (selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContent.innerHTML = "";
    nextButton.style.display = "none";
    resultDiv.innerHTML = `<p>Votre score est de ${score} sur ${questions.length}.</p>`;
}