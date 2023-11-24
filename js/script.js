$(document).ready(function () {
    const words = {
        beginner: [
            { word: "Hello", translation: "Привіт" },
            { word: "Always", translation: "Завжди" },
            { word: "Programming", translation: "Програмування" },
            { word: "Laptop", translation: "Ноутбук" },
            { word: "Day", translation: "День" },
            { word: "Sun", translation: "Сонце" },
            { word: "Lesson", translation: "Урок" },
            { word: "History", translation: "Історія" },
            { word: "Task", translation: "Завдання" },
            { word: "Sky", translation: "День" }
        ],
        intermediate: [
            { word: "Childhood", translation: "Дитинство" },
            { word: "Bodyguard", translation: "Охоронець" },
            { word: "Deliver", translation: "Доставляти" },
            { word: "Entourage", translation: "Середовище" },
            { word: "Flood", translation: "Повінь" },
            { word: "Humanity", translation: "Людяність" },
            { word: "Knowledge", translation: "Знання" },
            { word: "Mirror", translation: "Зеркало" },
            { word: "Satchel", translation: "Сумка" },
            { word: "Referee", translation: "Суддя" }
        ],
        advanced: [
            { word: "Avaricious", translation: "Жадібний" },
            { word: "Colander", translation: "Друшляк" },
            { word: "Deference", translation: "Повага" },
            { word: "Drought", translation: "Посуха" },
            { word: "Minatory", translation: "Загрозливий" },
            { word: "Penchant", translation: "Схильність" },
            { word: "Pillage", translation: "Мародерство" },
            { word: "Solicitous", translation: "Уважний" },
            { word: "Vestige", translation: "Частка" },
            { word: "Dearth", translation: "Дефіцит" }
        ]
    };
    let currentCardIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    function generateWords(difficulty) {
        return words[difficulty];
    }
    function toggleButtons(restartVisible) {
        $("#game-mode-btn").prop("disabled", !restartVisible).css("cursor", restartVisible ? "pointer" : "not-allowed");;
        $("#restart-btn").prop("disabled", !restartVisible);
    }
    function resetGame(words) {
        currentCardIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        updateStatus();
        displayCurrentCard(words);
        $("#proficience-level").text("");
        $("#translation-input").prop("disabled", false).css("cursor", "auto");
        toggleButtons(false);
    }
    function displayCurrentCard(words) {
        const currentCard = words[currentCardIndex];
        $("#word-card").text(currentCard.word);
        $("#translation-input").val("");
    }
    function updateStatus() {
        $("#current-step").text(currentCardIndex);
        $("#total-steps").text(words.length);
        $("#correct-count").text(correctCount);
        $("#incorrect-count").text(incorrectCount);
    }
    function showProficiencyLevel() {
        const selectedDifficulty = $("#difficulty-select").val();
        const proficiencyLevel = calculateProficiencyLevel(selectedDifficulty);
        $("#proficience-level").text(proficiencyLevel);
        $("#restart-btn").show();
        $("#translation-input").prop("disabled", true).css("cursor", "not-allowed");
        toggleButtons(true);
    }
    function calculateProficiencyLevel(difficulty) {
        const wordsForDifficulty = generateWords(difficulty);
        const totalWords = wordsForDifficulty.length;
        const percentageCorrect = (correctCount / totalWords) * 100;
        if (percentageCorrect >= 80) {
            return "Your language proficiency level is: Advanced";
        } else if (percentageCorrect >= 50) {
            return "Your language proficiency level is: Intermediate";
        } else {
            return "Your language proficiency level is: Beginner";
        }
    }
    function checkTranslation() {
        const enteredTranslation = $("#translation-input").val();
        if (enteredTranslation.trim() === "") {
            alert("Please enter the translation before checking.");
            return;
        }
        const correctTranslation = generateWords($("#difficulty-select").val())[currentCardIndex].translation;
        if (enteredTranslation === correctTranslation) {
            correctCount++;
        } else {
            incorrectCount++;
        }
        currentCardIndex++;
        if (currentCardIndex < generateWords($("#difficulty-select").val()).length) {
            displayCurrentCard(generateWords($("#difficulty-select").val()));
        } else {
            showProficiencyLevel();
        }
        updateStatus();
    }
    function checkT() {
        $("#word-card").click(function () {
            checkTranslation();
        });
    }
    checkT();
    $("#translation-input").keydown(function (event) {
        if (event.keyCode === 13) {
            checkTranslation();
        }
    });
    $("#restart-btn").click(function () {
        const selectedDifficulty = $("#difficulty-select").val();
        const selectedWords = generateWords(selectedDifficulty);
        if (selectedWords.length === 0) {
            alert("Please select a difficulty level");
            return;
        }
        resetGame(selectedWords);
        $("#restart-btn").hide();
    });
    $("#level-modal").show();
    $("#start-game-btn").click(function () {
        const selectedDifficulty = $("#difficulty-select").val();
        const selectedWords = generateWords(selectedDifficulty);
        if (selectedWords.length === 0) {
            alert("Please select a difficulty level");
            return;
        }
        resetGame(selectedWords);
        $("#total-steps").text(selectedWords.length);
        $("#level-modal").hide();
    });
    $("#game-mode-btn").click(function () {
        $("#level-modal").show();
        toggleButtons(false);
        $("#restart-btn").hide();
    });
});