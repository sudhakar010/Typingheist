const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button');

// set the values:
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

// first of all we will be loading the paragraph that the user needs to print it:

function loadparagraph(){
    const paragraph= ["Avoid daydrawing about the years to come.", "you are the most important person in your whole life." , "always be true to who you are, and ignore what other people think about you.","Only demonstrate your strength when it is required.","Subscribe to Drop X out"];

   const randomIndex = Math.floor(Math.random()*paragraph.length);
   typingText.innerHTML='';
   for(const char of paragraph[randomIndex]){
    console.log(char);
    // isme sabko add kar diya gaya hai 
   typingText.innerHTML+= `<span>${char}</span>`;
   }
   typingText.querySelectorAll('span')[0].
   classList.add('active');
   document.addEventListener('keydown',()=>input.focus());
   typingText.addEventListener("click",()=>{
    input.focus()}); 

}
 
// Handle user input 
function initTyping(){
    const char =  typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){
    
        if (!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }

        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log("correct");
        }else {
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');
        
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }
    else{
         clearInterval(timer);
         input.value='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmvalue = Math.round(((charIndex - mistake)/5) /(maxTime - timeLeft)*60);
        wpm.innerText = wpmvalue;   
        
    }
    else {
        clearInterval(timer);
    }
}

function reset(){
     loadparagraph();
     clearInterval(timer);
     timeLeft = maxTime;
     time.innerText = timeLeft;
     input.value='';
     charIndex = 0;
     mistake = 0;
    isTyping = false;
     wpm.innerText = 0;
     cpm.innerText = 0;
    mistakes.innerText = 0;
}
input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadparagraph();