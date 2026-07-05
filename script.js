const pages = [
{
    title: "💖 Untukmu 💖",
    text: "Jika hari ini terasa melelahkan, jangan lupa kalau masih ada seseorang yang selalu ingin melihatmu tersenyum.\n\nKamu lebih kuat daripada yang kamu kira. 🌸"
},
{
    title: "🌸 Untukmu 🌸",
    text: "Tidak apa-apa kalau hari ini tidak sempurna.\n\nIstirahatlah jika lelah, menangislah jika ingin menangis. Setelah itu, bangkit lagi pelan-pelan. Aku selalu percaya sama kamu."
},
{
    title: "☁️ Sedikit Pengingat ☁️",
    text: "Jangan terlalu keras pada dirimu sendiri.\n\nKamu sudah melakukan yang terbaik. Itu sudah lebih dari cukup."
},
{
    title: "❤️ Dari Aku ❤️",
    text: "Kalau suatu hari semuanya terasa berat, ingat ya...\n\nMasih ada seseorang yang selalu mendoakanmu diam-diam untukmu."
},
{
    title: "🎁 Pesan Terakhir 🎁",
    text: "Ini belum akhir ya...\n\nMasih ada hadiah kecil yang menunggumu. ❤️"
}
];

let index = 0;

const welcome = document.getElementById("welcome");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

const title = document.getElementById("title");
const text = document.getElementById("text");
const next = document.getElementById("next");

const bgm = document.getElementById("bgm");

// Sembunyikan halaman pesan
message.style.display = "none";

// Volume musik
bgm.volume = 0.35;

// Tombol mulai
startBtn.addEventListener("click", async () => {

    welcome.style.display = "none";

    message.style.display = "flex";
    message.style.flexDirection = "column";
    message.style.alignItems = "center";

    try{
        await bgm.play();
    }catch(e){
        console.log("Musik gagal diputar", e);
    }

});

// Tombol lanjut
next.addEventListener("click", () => {

    index++;

    if(index < pages.length){

        title.innerHTML = pages[index].title;
        text.innerHTML = pages[index].text.replace(/\n/g,"<br><br>");

    }else{

        window.location.href = "gallery.html";

    }

});

// ========================
// Efek Sakura
// ========================

function createSakura(){

    const sakura = document.createElement("div");

    sakura.className = "sakura";

    sakura.textContent = "🌸";

    sakura.style.left = Math.random()*100 + "vw";
    sakura.style.fontSize = (15 + Math.random()*15) + "px";
    sakura.style.animationDuration = (5 + Math.random()*5) + "s";

    document.body.appendChild(sakura);

    sakura.addEventListener("animationend",()=>{

        sakura.remove();

    });

}

setInterval(createSakura,500);