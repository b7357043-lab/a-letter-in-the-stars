/* ==========================================
   A LETTER IN THE STARS
   SCRIPT.JS
   PART 1
========================================== */

// ===========================
// ELEMENT
// ===========================

const loading = document.getElementById("loading");
const welcome = document.getElementById("welcome");
const main = document.getElementById("main");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const musicBtn = document.getElementById("musicBtn");

const title = document.getElementById("title");
const message = document.getElementById("message");

const bgm = document.getElementById("bgm");

// Secret
const secretStar = document.getElementById("secretStar");
const secretMessage = document.getElementById("secretMessage");
const closeSecret = document.getElementById("closeSecret");

// ===========================
// LOADING
// ===========================

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.style.opacity = "0";

        setTimeout(() => {

            loading.style.display = "none";

        }, 1000);

    }, 1800);

});

// ===========================
// PESAN
// ===========================

const messages = [

`Hai Dhea 🌸

Terima kasih sudah membuka halaman kecil ini.
Semoga malam ini menjadi sedikit lebih indah untukmu.`,
`Kadang hidup memang melelahkan.
Tetapi kamu sudah sejauh ini.
Dan itu luar biasa.`,
`Jangan terlalu keras pada dirimu sendiri.
Tidak apa-apa beristirahat.Besok kita lanjut lagi.`,

`Status Semangat

████████░░ 80% Error...
Penyebab:
Kurang peluk 🤗`,

`Kamu tahu nggak bedanya kopi sama kamu? Kopi bikin melek, kalau kamu bikin aku nggak bisa tidur karena kepikiran 😵‍💫`,

`Kalau suatu hari nanti kamu merasa sendirian...
tengoklah sedikit ke belakang,
karena akan selalu ada aku yang memilih tetap tinggal,
menemani, menguatkan, dan mencintaimu apa pun keadaannya hehe.😇`

];

let currentMessage = 0;

// ===========================
// TYPEWRITER
// ===========================

let typing = false;

function typeWriter(text){

    if(typing) return;

    typing = true;

    message.innerHTML = "";

    let i = 0;

    const speed = 28;

    const timer = setInterval(()=>{

        message.innerHTML += text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(timer);

            typing = false;

        }

    },speed);

}

// ===========================
// START
// ===========================

startBtn.onclick = ()=>{

    welcome.style.display = "none";

    main.style.display = "flex";

    bgm.volume = .4;

    bgm.play().catch(()=>{});

    musicBtn.innerHTML = "⏸ Pause Musik";

    typeWriter(messages[0]);

};

// ===========================
// NEXT
// ===========================

nextBtn.onclick = ()=>{

    if(typing) return;

    currentMessage++;

    if(currentMessage >= messages.length){

        currentMessage = 0;

    }

    typeWriter(messages[currentMessage]);

};

// ===========================
// MUSIC
// ===========================

let playing = true;

musicBtn.onclick = ()=>{

    if(playing){

        bgm.pause();

        musicBtn.innerHTML="🎵 Putar Musik";

    }else{

        bgm.play().catch(()=>{});

        musicBtn.innerHTML="⏸ Pause Musik";

    }

    playing=!playing;

};

// ===========================
// HEART EFFECT
// ===========================

function createHeart(x,y){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="💖";

    heart.style.left=x+"px";
    heart.style.top=y+"px";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },1200);

}

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("click",(e)=>{

        createHeart(
            e.clientX,
            e.clientY
        );

    });

});

// ===========================
// SECRET STAR
// ===========================

let tap=0;

secretStar.onclick=()=>{

    tap++;

    if(tap>=5){

        secretMessage.style.display="flex";

        tap=0;

    }

}

closeSecret.onclick=()=>{

    secretMessage.style.display="none";

}
/* ==========================================
   PART 3B
   METEOR • FIREWORKS
========================================== */

// ===========================
// METEOR
// ===========================

function createMeteor(){

const meteor=document.createElement("div");

meteor.className="meteor";

meteor.style.top=Math.random()*250+"px";

meteor.style.left=window.innerWidth+200+"px";

meteor.style.width=(120+Math.random()*150)+"px";

meteor.style.opacity=.5+Math.random()*.5;

meteor.style.animationDuration=
(.8+Math.random()*1.2)+"s";

meteorContainer.appendChild(meteor);

setTimeout(()=>{

meteor.remove();

},2500);

}


// ===========================
// FIREWORKS
// ===========================

const fireCanvas = document.getElementById("fireworks");
const fireCtx = fireCanvas.getContext("2d");

function resizeFire(){

    fireCanvas.width = window.innerWidth;
    fireCanvas.height = window.innerHeight;

}

resizeFire();

window.addEventListener("resize",resizeFire);

let particles = [];

class Particle{

    constructor(x,y){

        this.x=x;
        this.y=y;

        this.radius=Math.random()*3+2;

        this.speedX=(Math.random()-0.5)*8;
        this.speedY=(Math.random()-0.5)*8;

        this.life=100;

        const colors=[
            "#ff5fa2",
            "#ffd166",
            "#7ef9ff",
            "#ffffff",
            "#8cff98"
        ];

        this.color=colors[Math.floor(Math.random()*colors.length)];

    }

    update(){

        this.x+=this.speedX;
        this.y+=this.speedY;

        this.speedY+=0.05;

        this.life--;

    }

    draw(){

        fireCtx.beginPath();

        fireCtx.arc(this.x,this.y,this.radius,0,Math.PI*2);

        fireCtx.fillStyle=this.color;

        fireCtx.fill();

    }

}

function explode(x,y){

    for(let i=0;i<80;i++){

        particles.push(new Particle(x,y));

    }

}

function animateFire(){

    fireCtx.clearRect(0,0,fireCanvas.width,fireCanvas.height);

    particles.forEach((p,index)=>{

        p.update();

        p.draw();

        if(p.life<=0){

            particles.splice(index,1);

        }

    });

    requestAnimationFrame(animateFire);

}

animateFire();


// ===========================
// FIREWORK SAAT PESAN TERAKHIR
// ===========================

nextBtn.addEventListener("click",()=>{

    if(currentMessage===messages.length-1){

        for(let i=0;i<6;i++){

            setTimeout(()=>{

                explode(

                    Math.random()*window.innerWidth,

                    Math.random()*window.innerHeight*0.5

                );

            },i*500);

        }

    }

});
/* ==========================================
   PART 3C
   SAKURA • CAMERA • MUSIC FADE
========================================== */

// ===========================
// SAKURA ENGINE
// ===========================

const sky = document.getElementById("sky");
const skyCtx = sky.getContext("2d");

function resizeSky() {
    sky.width = window.innerWidth;
    sky.height = window.innerHeight;
}

resizeSky();
window.addEventListener("resize", resizeSky);

const petals = [];

class Petal {

    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * sky.width;
        this.y = Math.random() * -sky.height;

        this.size = 6 + Math.random() * 10;

        this.speedY = 1 + Math.random() * 2;

        this.speedX = -0.5 + Math.random();

        this.rotate = Math.random() * Math.PI * 2;

        this.rotateSpeed = (Math.random() - 0.5) * 0.03;
    }

    update() {

        this.y += this.speedY;
        this.x += this.speedX;

        this.rotate += this.rotateSpeed;

        if (this.y > sky.height + 20) {
            this.reset();
            this.y = -20;
        }

    }

    draw() {

        skyCtx.save();

        skyCtx.translate(this.x, this.y);

        skyCtx.rotate(this.rotate);

        skyCtx.fillStyle = "#ffc8dc";

        skyCtx.beginPath();

        skyCtx.ellipse(
            0,
            0,
            this.size,
            this.size * 0.6,
            Math.PI / 4,
            0,
            Math.PI * 2
        );

        skyCtx.fill();

        skyCtx.restore();

    }

}

for (let i = 0; i < 40; i++) {

    petals.push(new Petal());

}

function animatePetals() {

    skyCtx.clearRect(0, 0, sky.width, sky.height);

    petals.forEach(p => {

        p.update();

        p.draw();

    });

    requestAnimationFrame(animatePetals);

}

animatePetals();


// ===========================
// CAMERA ZOOM
// ===========================

startBtn.addEventListener("click", () => {

    document.body.style.transition = "transform 2s ease";

    document.body.style.transform = "scale(1.03)";

    setTimeout(() => {

        document.body.style.transform = "scale(1)";

    }, 2000);

});


// ===========================
// MUSIC FADE IN
// ===========================

function musicFadeIn() {

    bgm.volume = 0;

    bgm.play().catch(() => {});

    let volume = 0;

    const timer = setInterval(() => {

        volume += 0.02;

        if (volume >= 0.4) {

            volume = 0.4;

            clearInterval(timer);

        }

        bgm.volume = volume;

    }, 100);

}

// Ganti bagian startBtn lama menjadi:

// bgm.volume=.4;
// bgm.play();

// menjadi:

// musicFadeIn();


// ===========================
// AURORA PULSE
// ===========================

setInterval(() => {

    document.querySelectorAll(".aurora").forEach(a => {

        a.style.opacity = 0.12 + Math.random() * 0.12;

    });

}, 2500);
/* ==========================================
   PART 3D
   STAR ENGINE
========================================== */

const starsCanvas = document.createElement("canvas");
starsCanvas.id = "starsCanvas";

starsCanvas.style.position = "fixed";
starsCanvas.style.top = "0";
starsCanvas.style.left = "0";
starsCanvas.style.width = "100%";
starsCanvas.style.height = "100%";
starsCanvas.style.pointerEvents = "none";
starsCanvas.style.zIndex = "1";

document.body.appendChild(starsCanvas);

const sctx = starsCanvas.getContext("2d");

function resizeStars(){

    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;

}

resizeStars();

window.addEventListener("resize", resizeStars);

const stars = [];

class Star{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = Math.random()*starsCanvas.width;
        this.y = Math.random()*starsCanvas.height;

        this.size = Math.random()*2.5;

        this.alpha = Math.random();

        this.speed = 0.005 + Math.random()*0.02;

    }

    update(){

        this.alpha += this.speed;

        if(this.alpha > 1){

            this.speed *= -1;

        }

        if(this.alpha < .2){

            this.speed *= -1;

        }

    }

    draw(){

        sctx.beginPath();

        sctx.arc(this.x,this.y,this.size,0,Math.PI*2);

        sctx.fillStyle = `rgba(255,255,255,${this.alpha})`;

        sctx.fill();

    }

}

for(let i=0;i<350;i++){

    stars.push(new Star());

}

function animateStars(){

    sctx.clearRect(0,0,starsCanvas.width,starsCanvas.height);

    stars.forEach(star=>{

        star.update();
        star.draw();

    });

    requestAnimationFrame(animateStars);

}

animateStars();
/* ==========================================
   HEART RIPPLE
========================================== */

document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",(e)=>{

for(let i=0;i<8;i++){

const heart=document.createElement("div");

heart.innerHTML="💖";

heart.style.position="fixed";

heart.style.left=e.clientX+"px";

heart.style.top=e.clientY+"px";

heart.style.pointerEvents="none";

heart.style.fontSize=(12+Math.random()*18)+"px";

heart.style.transition="1s";

document.body.appendChild(heart);

const x=(Math.random()-0.5)*180;
const y=(Math.random()-0.5)*180;

requestAnimationFrame(()=>{

heart.style.transform=
`translate(${x}px,${y}px) scale(1.8)`;

heart.style.opacity="0";

});

setTimeout(()=>{

heart.remove();

},1000);

}

});

});
const light=document.createElement("div");

light.style.position="fixed";

light.style.width="300px";

light.style.height="300px";

light.style.borderRadius="50%";

light.style.pointerEvents="none";

light.style.background=
"radial-gradient(circle,rgba(255,255,255,.08),transparent 70%)";

light.style.transform="translate(-50%,-50%)";

light.style.zIndex="0";

document.body.appendChild(light);

document.addEventListener("mousemove",(e)=>{

light.style.left=e.clientX+"px";

light.style.top=e.clientY+"px";

});
/* ==========================================
   PART 4
   MESSAGE ENGINE PREMIUM
========================================== */

// Auto Next Message
let autoMessage = setInterval(nextMessage, 12000);

// Ganti pesan setiap 12 detik
function nextMessage() {

    if (typing) return;

    currentMessage++;

    if (currentMessage >= messages.length) {

        endingScene();
        return;

    }

    fadeMessage(messages[currentMessage]);

}

// Efek fade sebelum mengetik
function fadeMessage(text) {

    message.style.opacity = "0";

    setTimeout(() => {

        typeWriter(text);

        message.style.opacity = "1";

    }, 600);

}

// Tombol Next menggunakan engine baru
nextBtn.onclick = () => {

    clearInterval(autoMessage);

    nextMessage();

    autoMessage = setInterval(nextMessage, 12000);

};
/* ==========================================
   ENDING SCENE
========================================== */

function endingScene(){

    clearInterval(autoMessage);

    nextBtn.style.display="none";

    setTimeout(()=>{

        explode(window.innerWidth*0.2,200);

        explode(window.innerWidth*0.5,150);

        explode(window.innerWidth*0.8,250);

    },500);

    setTimeout(()=>{

        title.innerHTML="❤️ Terima Kasih ❤️";

        typeWriter(

`Semoga Tuhan selalu menjagamu di mana pun kamu berada, menguatkan hatimu saat rapuh, melapangkan jalanmu ketika terasa sempit, dan menghadirkan kebahagiaan yang pantas kamu dapatkan.

Aamiin..
🐼🩶`

        );

    },1500);

}
/* ==========================================
   ENDING SCENE
========================================== */

function endingScene(){

    clearInterval(autoMessage);

    nextBtn.style.display="none";

    setTimeout(()=>{

        explode(window.innerWidth*0.2,200);

        explode(window.innerWidth*0.5,150);

        explode(window.innerWidth*0.8,250);

    },500);

    setTimeout(()=>{

        title.innerHTML="❤️ Terima Kasih ❤️";

        typeWriter(

`Semoga Tuhan selalu menjagamu di mana pun kamu berada, menguatkan hatimu saat rapuh, melapangkan jalanmu ketika terasa sempit, dan menghadirkan kebahagiaan yang pantas kamu dapatkan.

Aamiin..
🐼🩶`

        );

    },1500);

}
/* ==========================================
   RESTART
========================================== */

const restart = document.createElement("button");

restart.innerHTML="🔄 Mulai Lagi";

restart.style.display="none";

restart.style.marginTop="25px";

document.querySelector(".buttons").appendChild(restart);

restart.onclick=()=>{

    location.reload();

};

function showRestart(){

    restart.style.display="inline-block";

}
setTimeout(showRestart,8000);
/* ==========================================
   PART 5A
   DYNAMIC AURORA
========================================== */

const auroras = document.querySelectorAll(".aurora");

let auroraTime = 0;

function animateAurora(){

    auroraTime += 0.01;

    auroras.forEach((aurora,index)=>{

        const moveX = Math.sin(auroraTime + index) * 40;
        const moveY = Math.cos(auroraTime + index) * 25;

        aurora.style.transform =
            `translate(${moveX}px,${moveY}px) scale(${1 + Math.sin(auroraTime)/25})`;

    });

    requestAnimationFrame(animateAurora);

}

animateAurora();
/* ==========================================
   BUTTON GLOW
========================================== */

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.boxShadow=
        "0 0 35px rgba(255,120,180,.8)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.boxShadow="";

    });

});
const quotes = [

"Semoga harimu seindah langit malam ✨",

"Kamu lebih kuat dari yang kamu kira ❤️",

"Jangan lupa tersenyum hari ini 😊",

"Terima kasih sudah bertahan 🌸",

"Besok akan menjadi hari yang lebih baik 🌙"

];

function floatingQuote(){

    const q=document.createElement("div");

    q.innerText=
    quotes[
        Math.floor(Math.random()*quotes.length)
    ];

    q.style.position="fixed";

    q.style.left=(20+Math.random()*60)+"%";

    q.style.top="100%";

    q.style.color="white";

    q.style.opacity=".7";

    q.style.pointerEvents="none";

    q.style.transition="10s linear";

    document.body.appendChild(q);

    requestAnimationFrame(()=>{

        q.style.top="-10%";

    });

    setTimeout(()=>{

        q.remove();

    },10000);

}

setInterval(floatingQuote,12000);
