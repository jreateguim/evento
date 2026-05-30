window.history.scrollRestoration = "manual";
window.scrollTo(0,0);
const fechaBoda = new Date("2026-06-13T20:00:00");
const imagenes = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");
const elementosFade = document.querySelectorAll(".fade-in");
const nav = document.getElementById("topNav");
const hero = document.querySelector(".hero");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

function actualizarContador(){
    const ahora = new Date();
    const diferencia = fechaBoda - ahora;
    const dias = Math.floor(diferencia / 86400000);
    const horas = Math.floor(diferencia / 3600000) % 24;
    const minutos = Math.floor(diferencia / 60000) % 60;
    const segundos = Math.floor(diferencia / 1000) % 60;

    document.getElementById("days").innerText = dias;
    document.getElementById("hours").innerText = horas;
    document.getElementById("minutes").innerText = minutos;
    document.getElementById("seconds").innerText = segundos;
}

setInterval(actualizarContador,1000);
actualizarContador();

document.getElementById("openInvitation").addEventListener("click", abrirInvitacion);

document.getElementById("loader").addEventListener("click", abrirInvitacion);

function abrirInvitacion(){
    const loader = document.getElementById("loader");
    if(loader.classList.contains("loader-open")){
        return;
    }
        loader.classList.add("loader-open");
    setTimeout(()=>{
        document.body.classList.remove("loading");
        loader.remove();
    },1500);
    music.play();
}

imagenes.forEach(img=>{
    img.addEventListener("click",()=>{
        lightboxImg.src = img.src;
        lightbox.classList.add("show");
    });

});

closeLightbox.addEventListener("click",()=>{
    lightbox.classList.remove("show");
});

lightbox.addEventListener("click",(e)=>{
    if(e.target === lightbox){
        lightbox.classList.remove("show");
    }

});

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add("visible");
        }else{
            entry.target.classList.remove("visible");
        }

    });
},{
    threshold:0.3
});

elementosFade.forEach(elemento=>{
    observer.observe(elemento);
});

window.addEventListener("scroll",()=>{
    if(window.scrollY > hero.offsetHeight - 100){
        nav.classList.add("show");
    }else{
        nav.classList.remove("show");
    }
});

let reproduciendo = false;

document.getElementById("loader").addEventListener("click",()=>{
    if(!reproduciendo){
        music.play();
        reproduciendo = true;
    }

});

musicBtn.addEventListener("click",()=>{
    if(music.paused){
        music.play();
        musicBtn.innerHTML = "🔊";
    }else{
        music.pause();
        musicBtn.innerHTML = "🔇";
    }
});