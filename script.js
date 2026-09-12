
const target = new Date("2026-10-30T20:00:00+05:00").getTime();
function updateCountdown(){
  const now = Date.now(), diff = Math.max(0,target-now);
  const d=Math.floor(diff/86400000), h=Math.floor(diff%86400000/3600000),
        m=Math.floor(diff%3600000/60000), s=Math.floor(diff%60000/1000);
  const ids={days:d,hours:h,minutes:m,seconds:s};
  Object.entries(ids).forEach(([id,val])=>{const el=document.getElementById(id);if(el)el.textContent=String(val).padStart(2,"0")});
}
setInterval(updateCountdown,1000); updateCountdown();

let player, musicStarted=false;
function loadYouTube(){
  if(window.YT && YT.Player){createPlayer();return}
  const tag=document.createElement("script"); tag.src="https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}
window.onYouTubeIframeAPIReady=()=>createPlayer();
function createPlayer(){
  if(player)return;
  player=new YT.Player("ytplayer",{height:"1",width:"1",
    videoId:"o0NqZALXMYE",
    playerVars:{autoplay:0,controls:0,loop:1,playlist:"o0NqZALXMYE",playsinline:1,rel:0},
    events:{onReady:()=>{}}
  });
}
function toggleMusic(){
  loadYouTube();
  setTimeout(()=>{
    if(!player)return;
    if(!musicStarted){player.playVideo();musicStarted=true;setMusicText("♫ Music Playing");}
    else{player.pauseVideo();musicStarted=false;setMusicText("♫ Play Music");}
  },450);
}
function setMusicText(t){document.querySelectorAll(".music-btn").forEach(b=>b.textContent=t);}
document.addEventListener("DOMContentLoaded",()=>{
  const b=document.querySelector(".music-btn"); if(b)b.addEventListener("click",toggleMusic);
  const page=location.pathname.split("/").pop()||"index.html";
  document.querySelectorAll(".nav a").forEach(a=>{
    if(a.getAttribute("href")===page)a.classList.add("active");
  });
});
/* =========================
   RESPONSIVE MOBILE MENU
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  if (!menuBtn || !nav) return;


  /* Open / Close menu */

  menuBtn.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuBtn.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuBtn.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );

  });


  /* Close menu after selecting a page */

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


  /* Close menu when clicking outside */

  document.addEventListener("click", (event) => {

    if (
      !nav.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {

      nav.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });

});
