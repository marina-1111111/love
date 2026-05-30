
const screens=document.querySelectorAll(".screen");

const env=document.getElementById("envelope");

const questionEl=document.getElementById("question");
const answerEl=document.getElementById("answer");
const messageEl=document.getElementById("message");
const counterEl=document.getElementById("counter");
const fill=document.getElementById("fill");

/* =========================
📜 STATE
========================= */

let current=0;

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

/* 💌 OPEN */
env.addEventListener("click",()=>{
document.getElementById("openSound")?.play();
navigator.vibrate?.(80);
showScreen(1);
});

/* 🚀 START */
function startQuiz(){

current=0;
answerEl.value="";
messageEl.innerText="";
fill.style.width="0%";

showScreen(2);
showQuestion();

}

/* 📜 SHOW Q */
function showQuestion(){
questionEl.innerText=questions[current].q;
counterEl.innerText=`${current+1}/5`;
fill.style.width=(current/questions.length)*100+"%";
}

/* =========================
💀 CANVAS FX (10K PARTICLES READY)
========================= */

const canvas=document.getElementById("fxCanvas");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

let particles=[];

function spawnParticles(n=500){

for(let i=0;i<n;i++){

particles.push({
x:Math.random()*canvas.width,
y:canvas.height+Math.random()*200,
vx:(Math.random()-0.5)*2,
vy:-(Math.random()*3+2),
size:Math.random()*18+8,
char:Math.random()>0.5?"❤️":"🌹",
alpha:1
});

}

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=0;i<particles.length;i++){

let p=particles[i];

ctx.globalAlpha=p.alpha;
ctx.font=`${p.size}px Arial`;
ctx.fillText(p.char,p.x,p.y);

p.x+=p.vx;
p.y+=p.vy;
p.alpha-=0.006;

if(p.alpha<=0 || p.y<-50){
particles.splice(i,1);
i--;
}

}

requestAnimationFrame(animate);

}

animate();

/* =========================
🧠 CHECK ANSWER
========================= */

function checkAnswer(){

let val=answerEl.value.trim().toLowerCase();

/* FINAL */
if(current===4){

showScreen(3);
startFinal();

spawnParticles(8000); // 🔥 MASS EXPLOSION

navigator.vibrate?.([120,50,120]);

return;
}

/* NORMAL */
if(val===questions[current].a.toLowerCase()){

spawnParticles(1000);

current++;
answerEl.value="";
messageEl.innerText="";

showQuestion();

navigator.vibrate?.(50);

}else{
messageEl.innerText="❌ غلط";
}

}

/* =========================
💌 FINAL SCENE
========================= */

function startFinal(){

let text=`أنا مش محتاج إجابة...

إنتِ الإجابة ❤️`;

let el=document.getElementById("typewriter");
el.innerHTML="";

let i=0;

let t=setInterval(()=>{

el.innerHTML+=text[i];
i++;

if(i>=text.length) clearInterval(t);

},50);

}

/* INIT */
showScreen(0);