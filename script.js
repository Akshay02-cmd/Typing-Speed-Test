const inputfield = document.querySelector(".wrapper .input-field");
const typingtext = document.querySelector(".typing-text p");
const timeleft = document.querySelector(".time-left span");
const mistake = document.querySelector(".mistake span");
const WPM = document.querySelector(".wpm span");
const CPM = document.querySelector(".CPM span");
const btn = document.querySelector(".btn");

let timer;
let maxtime = 60;
let timelft = maxtime;
let mistakes = 0;
let charIndex = 0;
let istyping = false;

function loadparagraph() {
    const paragraphs = [
        "The sky turned a deep shade of purple as the sun dipped below the horizon, casting long shadows across the empty street. A gentle breeze rustled the leaves, carrying with it the scent of rain and distant memories.",

        "In a small village nestled between rolling hills, a boy with curious eyes wandered through the fields, dreaming of adventures beyond the mountains. His heart beat with the rhythm of possibility, each step a promise to chase the unknown.",

        "Technology has reshaped the world in countless ways, from the way we communicate to the way we think. In this fast-paced digital age, adapting and learning continuously is not just a choice—it’s a necessity.",

        "As the clock struck midnight, the library came alive with whispers of the past. Ancient books glowed faintly, and the spirits of old scholars roamed the aisles, eager to share their knowledge with those brave enough to listen.",

        "He stood alone at the edge of the cliff, the ocean crashing below like a thunderous applause for his courage. The wind tugged at his coat, but he stood firm—because sometimes, letting go is the first step to becoming who you're meant to be.",

        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    ];
    const random = Math.floor(Math.random() * (paragraphs.length));
    typingtext.innerHTML = '';
    for (const char of paragraphs[random]) {
        typingtext.innerHTML += `<span>${char}</span>`;
    }
    typingtext.querySelectorAll('span')[0].classList.add('active');
}

function initTyping() {
    const char = typingtext.querySelectorAll('span');
    const typedchar = inputfield.value.charAt(charIndex)

    if (charIndex < char.length && timelft > 0) {

        if (!istyping) {
            timer = setInterval(initime, 1000)
            istyping = true;
        }

        if (char[charIndex].innerText === typedchar) {
            char[charIndex].classList.add('correct');
        }
        else {
            mistakes++;
            char[charIndex].classList.add('incorrect');
        }
        mistake.innerText = mistakes
        charIndex++;
        char[charIndex].classList.add('active');
    }
    else {

    }
}

function initime() {
    if (timelft > 0) {
        timelft--;
        timeleft.innerText = timelft;
        const wpmval = Math.round(((charIndex - mistakes) / 5) / (maxtime - timelft) * 60)
        WPM.innerText = wpmval
        const cpmval = charIndex - mistakes;
        CPM.innerText = cpmval
    }
    else {
        clearInterval(timer);
        inputfield.value = '';
    }
}

function reset() {
    loadparagraph();
    clearInterval(timer);
    timelft = maxtime;
    mistakes = 0;
    charIndex = 0;
    istyping = false;
    inputfield.value = '';
    timeleft.innerText = timelft;
    WPM.innerText = 0;
    CPM.innerText = 0;
    mistake.innerText = 0;

}

inputfield.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

loadparagraph();