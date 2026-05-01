const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const counter = document.getElementById('counter');

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

/* ---------------- TOUCH ---------------- */

slides.forEach((slide, index) => {

  slide.addEventListener('touchstart', (e) => {
    currentIndex = index;

    // 🚫 if pinch gesture, do NOTHING (let browser zoom)
    if (e.touches.length !== 1) return;

    isDragging = true;
    startX = e.touches[0].clientX;
  });

  slide.addEventListener('touchmove', (e) => {

    // 🚫 block swipe if not single finger
    if (!isDragging || e.touches.length !== 1) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    currentTranslate = prevTranslate + diff;
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  slide.addEventListener('touchend', () => {
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -80 && currentIndex < slides.length - 1) {
      currentIndex++;
    }

    if (movedBy > 80 && currentIndex > 0) {
      currentIndex--;
    }

    setPositionByIndex();
  });

});

/* ---------------- POSITION ---------------- */

function setPositionByIndex() {
  const slideWidth = window.innerWidth;

  currentTranslate = currentIndex * -slideWidth;
  prevTranslate = currentTranslate;

  track.style.transform = `translateX(${currentTranslate}px)`;

  updateCounter();
}

/* ---------------- COUNTER ---------------- */

function updateCounter() {
  counter.textContent = `${currentIndex + 1} / ${slides.length}`;
}

updateCounter();