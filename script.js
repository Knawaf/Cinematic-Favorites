document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll("nav button");
  const popupMenu = document.getElementById("popup-menu");
  const contactBtn = document.querySelector(".btn-contact");
  const closeBtn = document.querySelector(".close-btn");
  const progressBar = document.querySelector(".progress-bar");
  const backToTopBtn = document.querySelector(".btn-back-to-top");
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselCards = document.querySelectorAll(".carousel-track .card");
  const prevButton = document.querySelector(".carousel-btn.prev");
  const nextButton = document.querySelector(".carousel-btn.next");
  const sections = document.querySelectorAll("section");
  let currentIndex = 0;

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetSection = document.querySelector(
        button.getAttribute("data-scroll")
      );
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / docHeight) * 100;
    progressBar.style.width = `${progress}%`;

    backToTopBtn.style.display = scrollY > 300 ? "block" : "none";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const currentButton = document.querySelector(
        `button[data-scroll="#${section.id}"]`
      );
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentButton.classList.add("active");
      } else {
        currentButton.classList.remove("active");
      }
    });
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  contactBtn.addEventListener("click", () => {
    popupMenu.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    popupMenu.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === popupMenu) {
      popupMenu.style.display = "none";
    }
  });

  prevButton.addEventListener("click", () => {
    moveCarousel(-1);
  });

  nextButton.addEventListener("click", () => {
    moveCarousel(1);
  });

  function moveCarousel(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = carouselCards.length - 1;
    if (currentIndex >= carouselCards.length) currentIndex = 0;
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  const images = document.querySelectorAll(".card img");
  images.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      const imgElement = document.createElement("img");
      imgElement.src = img.src;
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }
      lightbox.appendChild(imgElement);
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  const hero = document.querySelector(".hero");
  window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.5;
    hero.style.backgroundPositionY = `${offset}px`;
  });
});
