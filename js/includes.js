async function loadNavbar(){
  const navbarTarget = document.getElementById("site-navbar");
  if(!navbarTarget) return;

  try{
    const response = await fetch("/includes/navbar.html");

    if(!response.ok){
      throw new Error("Navbar file could not be loaded.");
    }

    const html = await response.text();
    navbarTarget.innerHTML = html;

    initNavbar();
    setActiveNav();
  }catch(error){
    console.error(error);
  }
}

async function loadFooter(){
  const footerTarget = document.getElementById("site-footer");
  if(!footerTarget) return;

  try{
    const response = await fetch("/includes/footer.html");

    if(!response.ok){
      throw new Error("Footer file could not be loaded.");
    }

    const html = await response.text();
    footerTarget.innerHTML = html;
  }catch(error){
    console.error(error);
  }
}

function initNavbar(){
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  function openMenu(){
    if(!navMenu) return;
    navMenu.classList.add("show-menu");
    document.body.classList.add("menu-open");
  }

  function closeMenu(){
    if(!navMenu) return;
    navMenu.classList.remove("show-menu");
    document.body.classList.remove("menu-open");
  }

  if(navToggle) navToggle.addEventListener("click", openMenu);
  if(navClose) navClose.addEventListener("click", closeMenu);

  document.querySelectorAll(".nav-link, .nav-dropdown-menu a").forEach((link)=>{
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown",(event)=>{
    if(event.key === "Escape") closeMenu();
  });
}

function setActiveNav(){
  const path = window.location.pathname;

  const servicePages = [
    "/manned-guarding/",
    "/ajax-smart-alarms/",
    "/cctv-installation/",
    "/access-control/",
    "/commercial-fire-alarm-systems/",
    "/electric-fencing/",
    "/professional-monitoring/"
  ];

  const servePages = [
    "/residential-security/",
    "/retail-storefronts/",
    "/warehouse-security/",
    "/airbnb-security/",
    "/office-security/",
    "/construction-site-security/"
  ];

  let activeSection = "";

  if(path === "/" || path === "/index.html"){
    activeSection = "home";
  }else if(servicePages.includes(path)){
    activeSection = "services";
  }else if(servePages.includes(path)){
    activeSection = "serve";
  }else if(path === "/security-packages/"){
    activeSection = "packages";
  }else if(path === "/about/"){
    activeSection = "about";
  }else if(path === "/contact/"){
    activeSection = "contact";
  }

  if(!activeSection) return;

  const activeLink = document.querySelector(`[data-nav-section="${activeSection}"]`);
  if(activeLink) activeLink.classList.add("is-active");
}

function initSmoothAnchors(){
  document.querySelectorAll('a[href^="#"]').forEach((anchor)=>{
    anchor.addEventListener("click", function(event){
      const target = document.querySelector(this.getAttribute("href"));
      if(!target) return;

      event.preventDefault();
      target.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });
}

function initScrollReveal(){
  const revealItems = document.querySelectorAll(
    ".reveal-fade, .reveal-up, .reveal-slide, .reveal-stagger"
  );

  if(!revealItems.length) return;

  if(!("IntersectionObserver" in window)){
    revealItems.forEach((item)=>item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },{
    threshold:0.15,
    rootMargin:"0px 0px -40px 0px"
  });

  revealItems.forEach((item)=>observer.observe(item));
}

function initPageReveal(){
  const targets = document.querySelectorAll(".card, .process-step, .cta-band, .service-row, #industries .card");

  if(!targets.length) return;

  if(!("IntersectionObserver" in window)){
    targets.forEach((item)=>item.classList.add("is-visible"));
    return;
  }

  targets.forEach((item, index)=>{
    if(item.closest(".service-row")){
      item.classList.add("reveal-slide");
    }else{
      item.classList.add("reveal-fade");
    }

    if(item.closest("#industries")){
      item.style.transitionDelay = `${Math.min(index * 100, 500)}ms`;
    }
  });
}

function initHeroParallax(){
  const heroImage = document.querySelector(".hero-photo img");
  if(!heroImage || window.matchMedia("(max-width: 767px)").matches) return;

  let ticking = false;

  function update(){
    const offset = window.scrollY * 0.4;
    heroImage.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
    ticking = false;
  }

  window.addEventListener("scroll", ()=>{
    if(!ticking){
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, {passive:true});
}

function initPageProgress(){
  const bar = document.querySelector(".page-progress-bar");
  if(!bar) return;

  function update(){
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  update();
  window.addEventListener("scroll", update, {passive:true});
  window.addEventListener("resize", update);
}

function preselectInterestFromUrl(){
  const params = new URLSearchParams(window.location.search);
  const value = params.get("service") || params.get("package");

  if(!value) return;

  const select = document.getElementById("service-interest");
  if(!select) return;

  const normalized = value.toLowerCase().trim();

  const optionExists = Array.from(select.options).some((option)=>{
    return option.value === normalized;
  });

  if(optionExists){
    select.value = normalized;
  }
}

document.addEventListener("DOMContentLoaded", async ()=>{
  await loadNavbar();
  await loadFooter();
  initSmoothAnchors();
  initPageReveal();
  initScrollReveal();
  initHeroParallax();
  initPageProgress();
  preselectInterestFromUrl();
});
