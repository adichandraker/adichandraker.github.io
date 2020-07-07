const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement; // HTML place of interaction
    this.words = words; // array of words
    this.txt = ''; // a variable for the 
    this.wordIndex = 0; // index of adding word of the words array
    this.wait = parseInt(wait, 10); // 3000 ms
    this.type(); // 
    this.isDeleting = false; // deleting vs adding letters
}

// Type Method
TypeWriter.prototype.type = function () {
    // cur index of word
    const current = this.wordIndex % this.words.length;

    // getting txt of cur word
    const fullTxt = this.words[current];

    // Check if deleting + logic
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // txt -> element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // initial type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // logic on if word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        // the pause
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // initialize typewriter
    new TypeWriter(txtElement, words, wait);
}

// Navbar
function openNav(){
    var DistanceSide = "170px";
    document.getElementById("mySidenav").style.width = DistanceSide;
    document.getElementById("TypewriterSlide").style.marginLeft = DistanceSide;
    document.getElementById("AboutMe").style.marginLeft = DistanceSide;
}

function closeNav(){
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("TypewriterSlide").style.marginLeft = "0";
    document.getElementById("AboutMe").style.marginLeft = "0";
}

// Scroll with image modification
window.addEventListener('scroll', function() {
    document.getElementById("TypewriterSlide").style.opacity = (window.innerHeight - window.pageYOffset)/1000;
})

// Progress Bar
let progress = document.getElementById('ProgressBar');
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function () {
    let progressHeight = (window.pageYOffset / totalHeight) *100;
    progress.style.height = progressHeight + "%";
}