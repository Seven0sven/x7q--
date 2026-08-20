

const correctPassword = "seven";

const password = document.getElementById("password");
const passwordScreen = document.getElementById("password-screen");
const riddleScreen = document.getElementById("riddle-screen");

password.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        const enteredPassword = password.value.trim().toLowerCase();

        if (enteredPassword === correctPassword) {

            passwordScreen.style.display = "none";
            riddleScreen.style.display = "block";

            answer.focus();

        } else {

            addPasswordMessage("<?> ACCESS DENIED.");

            password.value = "";
            password.focus();
        }
    }

});

function addPasswordMessage(text) {

    const message = document.createElement("div");

    message.textContent = text;

    document.getElementById("messages").appendChild(message);
}


const riddles = [
    "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    "The more you take, the more you leave behind. What am I?",
    "I’m tall when I’m young, and I’m short when I’m old. What am I?",
    "What has many keys but can’t open a single lock?",
    "The more you remove from me, the bigger I become. What am I?"
];

const answers = [
    "echo",
    "footsteps",
    "candle",
    "piano",
    "hole"
];

const correctMessages = [
    "Oh, you got that one?",
    "STOP GOOGLING THE ANSWERS!",
    "The next one will be harder!",
    "Are you cheating???",
    "Fine, I'll give it to you... that was an easy one."
];

const incorrectMessages = [
    "Take this seriouslyyyyy",
    "No. Did you even read the riddle?",
    "LOUD INCORRECT BUZZER!",
    "Incorrect. You're making this far too easy.",
    "NOPE!",
    "Incorrect. I almost feel bad for you.",
    "Absolutely not. Were you guessing?",
    "That answer was certainly... something.",
    "Did you even try?",
    "no no no!"
];

let usedIncorrectMessages = [];
let currentRiddle = 0;

const riddleMessages = document.getElementById("riddle-messages");
const answer = document.getElementById("answer");

answer.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkAnswer();
    }

});

function addRiddleMessage(text) {

    const message = document.createElement("div");

    message.textContent = text;

    riddleMessages.appendChild(message);
}

function getIncorrectMessage() {

    if (usedIncorrectMessages.length === incorrectMessages.length) {
        usedIncorrectMessages = [];
    }

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * incorrectMessages.length);
    } while (usedIncorrectMessages.includes(randomIndex));

    usedIncorrectMessages.push(randomIndex);

    return incorrectMessages[randomIndex];
}

function checkAnswer() {

    const userAnswer = answer.value.trim().toLowerCase();

    if (userAnswer === "") {
        return;
    }

    addRiddleMessage("> " + userAnswer);

    if (userAnswer === answers[currentRiddle]) {

        addRiddleMessage("<?> " + correctMessages[currentRiddle]);

        currentRiddle++;

        if (currentRiddle < riddles.length) {

            addRiddleMessage("<?> " + riddles[currentRiddle]);

        } else {

            addRiddleMessage("<?> All riddles answered!");
            addRiddleMessage("<?> Congratulations. Claim your prize.");

            const prizeLine = document.createElement("div");
            const prizeLink = document.createElement("span");

            prizeLink.textContent = "> CLAIM YOUR PRIZE";

            prizeLink.style.color = "#00ff41";
            prizeLink.style.cursor = "pointer";
            prizeLink.style.textShadow = "0 0 2px #00ff41";

            prizeLink.addEventListener("click", function() {

                window.open(
                    "https://youtu.be/dQw4w9WgXcQ?si=uxVMaaPHcLLf8vKG",
                    "_blank"
                );

            });

            prizeLine.appendChild(prizeLink);
            riddleMessages.appendChild(prizeLine);

            document.querySelector("#riddle-screen .input-line").style.display = "none";

            return;
        }

    } else {

        addRiddleMessage("<?> " + getIncorrectMessage());

    }

    answer.value = "";
    answer.focus();
}