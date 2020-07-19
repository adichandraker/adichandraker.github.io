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

    // Fill date Sensitive info
    fixHTMLparagraph();

    // Scroll with image modification
    window.addEventListener('scroll', function () {
        document.getElementById("TypewriterSlide").style.opacity = (1 - window.pageYOffset / window.innerHeight);
    })
}
//

// Navbar
function openNav() {
    var tws = document.getElementById("TypewriterSlide");
    var msn = document.getElementById("SideNav");
    var am = document.getElementById("AboutMe");
    var tbb = document.getElementById("ThreeBarBTN");
    var DistanceSide = "180px";
    if (tbb.innerHTML.localeCompare("☰") === 0) {
        msn.style.width = DistanceSide;
        tws.style.marginLeft = DistanceSide;
        am.style.marginLeft = DistanceSide;
        tbb.innerHTML = "&#88;";
    } else {
        msn.style.width = "0";
        tws.style.marginLeft = "0";
        am.style.marginLeft = "0";
        tbb.innerHTML = "&#9776;";
    }
}
//

// Progress Bar
let progress = document.getElementById('ProgressBar');
window.onscroll = function () {
    console.log(getScrollPercent);
    progress.style.height = getScrollPercent() + "%";
}

// Most precise way to get scroll
function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}
//

// fact check dates
function fixHTMLparagraph() {
    var age = calcAge(new Date(2003, 11, 1));
    var tkdAge = calcAge(new Date(2008, 6, 1));
    var pianoAge = calcAge(new Date(2010, 3, 1));
    var clarinetAge = calcAge(new Date(2011, 10, 1));
    document.getElementById("AboutMe").innerHTML =
        `<h2>About Me</h2>
    <h3></br>Contact Me</h3>
    chandraker@gmail.com</br></br> 
    <h3></br>Some Stuff (updated automatically with javascript Date objects)</h3>
    I am a student at Westhill High School, Stamford Ct,
    </br>I am ${age} years old
    </br>I have been practicing taekwondo for ${tkdAge} years
    </br>I have been practicing piano for ${pianoAge} years
    </br>I have been practicing clarinet for ${clarinetAge} years`;
}

// Update Age
function calcAge(aDate) {
    var diff_ms = Date.now() - aDate.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function changeLDMode() {
    var accessToStyle = document.documentElement.style;
    if ((getComputedStyle(document.body).getPropertyValue('--bg-color')) === " black") {
        console.log("got Here");
        accessToStyle.setProperty('--bg-color', 'white');
        accessToStyle.setProperty('--font-color', 'black');
        accessToStyle.setProperty('--secondary', 'grey');
        accessToStyle.setProperty('--termin-color', 'green');
        accessToStyle.setProperty('--TPS-background-img', 'white');
    }else {
        accessToStyle.setProperty('--bg-color', ' black');
        accessToStyle.setProperty('--font-color', 'white');
        accessToStyle.setProperty('--secondary', 'blanchedalmond');
        accessToStyle.setProperty('--termin-color', 'lightgreen');
        accessToStyle.setProperty('--TPS-background-img', "url('lavaliz.jpg')");
    }
}