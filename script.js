
/* =========================
📌 ELEMENTS
========================= */

const screens=document.querySelectorAll(".screen");

const env=document.getElementById("envelope");

const questionEl=document.getElementById("question");
const answerEl=document.getElementById("answer");
const messageEl=document.getElementById("message");
const counterEl=document.getElementById("counter");
const fill=document.getElementById("fill");

/* =========================
📌 STATE
========================= */

let current = 0;

/* =========================
📜 QUESTIONS
========================= */

const questions=[
{q:"عيد ميلادي امتى؟",a:"3/9/2007"},
{q:"مين المغني المفضل عندي؟",a:"ويجز"},
{q:"النادي اللي بحبه؟",a:"ريال مدريد"},
{q:"الأكلة اللي بحبها؟",a:"محشي ورق عنب"},
{q:"اكتر شخصيه بحبها",a:"any"}
];

/* =========================
📲 SCREEN SYSTEM
========================= */

function showScreen(i){
screens.forEach(s=>s.classList.remove("active"));
screens[i].classList.add("active");
}

/* =========================
💌 OPEN ENVELOPE
========================= */

env.addEventListener("click",()=>{
document.getElementById("openSound")?.play();
navigator.vibrate?.(80);
showScreen(1);
});

/* =========================
🚀 START QUIZ (RESET FIX)
========================= */

function startQuiz(){

current = 0;
answerEl.value = "";
messageEl.innerText = "";
fill.style.width = "0%";

showScreen(2);
showQuestion();

}

/* =========================
📜 SHOW QUESTION
========================= */

function showQuestion(){
questionEl.innerText = questions[current].q;
counterEl.innerText = `سؤال ${current+1} / ${questions.length}`;
fill.style.width = (current/questions.length)*100 + "%";
}

/* =========================
💥 PARTICLE SYSTEM (FAST + LIGHT)
========================= */

const canvas=document.getElementById("fxCanvas");
const ctx=canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

/* ⚡ optimized spawn (NO LAG) */
function spawnParticles(n = 150){

let isMobile = innerWidth < 768;

/* تقليل تلقائي */
if(isMobile){
n = Math.min(n, 250);   // موبايل
}else{
n = Math.min(n, 600);   // كمبيوتر
}

for(let i=0;i<n;i++){

particles.push({
x:Math.random()*canvas.width,
y:canvas.height + Math.random()*50,
vx:(Math.random()-0.5)*1.2,
vy:-(Math.random()*2 + 1.5),
size:Math.random()*14 + 6,
char:Math.random()>0.5?"❤️":"🌹",
alpha:1,
life:Math.random()*50 + 40
});

}

}

/* 🎥 animation loop (optimized FPS) */
let lastTime=0;

function animate(time){

if(time - lastTime < 16){
requestAnimationFrame(animate);
return;
}

lastTime = time;

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=0;i<particles.length;i++){

let p=particles[i];

ctx.globalAlpha=p.alpha;
ctx.font=`${p.size}px Arial`;
ctx.fillText(p.char,p.x,p.y);

p.x += p.vx;
p.y += p.vy;

p.alpha -= 0.015;
p.life--;

if(p.alpha <= 0 || p.life <= 0 || p.y < -50){
particles.splice(i,1);
i--;
}

}

/* memory safety */
if(particles.length > 1000){
particles.splice(0,300);
}

requestAnimationFrame(animate);
}

animate();

/* =========================
🧠 ANSWER CHECK
========================= */

function checkAnswer(){

let val = answerEl.value.trim().toLowerCase();

/* 🔥 FINAL QUESTION */
if(current === 4){

showScreen(3);
startFinal();

spawnParticles(400); // 🔥 optimized final burst

navigator.vibrate?.([120,50,120]);

return;
}

/* NORMAL QUESTIONS */
if(val === questions[current].a.toLowerCase()){

spawnParticles(120); // ⚡ lightweight burst

current++;

answerEl.value = "";
messageEl.innerText = "";

showQuestion();

navigator.vibrate?.(50);

}else{
messageEl.innerText = "❌ غلط";
}

}

/* =========================
💌 FINAL TYPEWRITER
========================= */

function startFinal(){

let text = `أنا مش محتاج إجابة...

إنتِ الإجابة ❤️`;

let el=document.getElementById("typewriter");
el.innerHTML="";

let i=0;

let t=setInterval(()=>{

el.innerHTML += text[i];
i++;

if(i >= text.length){
clearInterval(t);
}

},50);

/* final small burst instead of huge lag */
spawnParticles(300);

}

/* =========================
📲 INIT
========================= */

showScreen(0);
