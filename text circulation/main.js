const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const counter = document.getElementById('counter');

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let isPinching = false;

const slideWidth = window.innerWidth;

/* ------------------ TOUCH EVENTS ------------------ */

slides.forEach((slide, index) => {
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchmove', touchMove);
  slide.addEventListener('touchend', touchEnd);
});

function touchStart(index) {
  return function (event) {
    currentIndex = index;

    // Detect pinch zoom (2 fingers)
    if (event.touches.length > 1) {
      isPinching = true;
      isDragging = false;
      return;
    }

    isPinching = false;
    isDragging = true;

    startX = event.touches[0].clientX;
  };
}

function touchMove(event) {
  if (!isDragging || isPinching) return;

  const currentPosition = event.touches[0].clientX;
  const diff = currentPosition - startX;

  currentTranslate = prevTranslate + diff;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
  isDragging = false;
  isPinching = false;

  const movedBy = currentTranslate - prevTranslate;

  // Swipe left
  if (movedBy < -80 && currentIndex < slides.length - 1) {
    currentIndex++;
  }

  // Swipe right
  if (movedBy > 80 && currentIndex > 0) {
    currentIndex--;
  }

  setPositionByIndex();
}

/* ------------------ SLIDE CONTROL ------------------ */

function setPositionByIndex() {
  currentTranslate = currentIndex * -slideWidth;
  prevTranslate = currentTranslate;

  track.style.transform = `translateX(${currentTranslate}px)`;

  updateCounter();
}

/* ------------------ COUNTER ------------------ */

function updateCounter() {
  counter.textContent = `${currentIndex + 1} / ${slides.length}`;
}

/* Init */
updateCounter();