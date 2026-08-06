// ======================
// LOADER
// ======================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    loader.style.transition = "0.6s";

    setTimeout(() => {

        loader.style.display = "none";

    },600);

});

// ======================
// MOBILE MENU
// ======================

const menuBtn=document.getElementById("menu-btn");

const closeBtn=document.getElementById("close-btn");

const mobileMenu=document.getElementById("mobile-menu");

menuBtn.onclick=()=>{

mobileMenu.style.right="0";

}

closeBtn.onclick=()=>{

mobileMenu.style.right="-100%";

}

// ======================
// TYPING EFFECT
// ======================

const roles=[

"Full Stack Software Developer",

"React Developer",

"Next.js Developer",

"MERN Stack Developer"

];

let roleIndex=0;

let charIndex=0;

let deleting=false;

const typing=document.getElementById("typing");

function type(){

const current=roles[roleIndex];

if(!deleting){

typing.textContent=current.substring(0,charIndex++);

if(charIndex>current.length){

deleting=true;

setTimeout(type,1200);

return;

}

}else{

typing.textContent=current.substring(0,charIndex--);

if(charIndex<0){

deleting=false;

roleIndex=(roleIndex+1)%roles.length;

}

}

setTimeout(type,deleting?45:90);

}

type();

// ======================
// SCROLL REVEAL
// ======================

const reveals=document.querySelectorAll(".reveal");

function reveal(){

reveals.forEach((section)=>{

const top=section.getBoundingClientRect().top;

const height=window.innerHeight;

if(top<height-120){

section.classList.add("active");

}

});

}

window.addEventListener("scroll",reveal);

reveal();

// ======================
// ACTIVE NAVBAR
// ======================

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-link");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach((section)=>{

const sectionTop=section.offsetTop-150;

if(scrollY>=sectionTop){

current=section.getAttribute("id");

}

});

navLinks.forEach((link)=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

// ======================
// BACK TO TOP
// ======================

const back=document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

back.classList.remove("opacity-0","invisible");

back.classList.add("opacity-100","visible");

}else{

back.classList.add("opacity-0","invisible");

back.classList.remove("opacity-100","visible");

}

});

back.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});