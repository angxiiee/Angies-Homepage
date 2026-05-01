const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const counter = document.getElementById('counter');

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

slides.forEach((slide, index) => {
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchmove', touchMove);
  slide.addEventListener('touchend', touchEnd);
});

function touchStart(index) {
  return function (event) {
    currentIndex = index;


    if (event.touches.length !== 1) return;

    isDragging = true;
    startX = event.touches[0].clientX;
  };
}

function touchMove(event) {
  if (!isDragging || event.touches.length !== 1) return;

  const currentPosition = event.touches[0].clientX;
  const diff = currentPosition - startX;

  currentTranslate = prevTranslate + diff;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
  isDragging = false;

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -80 && currentIndex < slides.length - 1) {
    currentIndex++;
  }

  if (movedBy > 80 && currentIndex > 0) {
    currentIndex--;
  }

  setPositionByIndex();
}

function setPositionByIndex() {
  const slideWidth = window.innerWidth;

  currentTranslate = currentIndex * -slideWidth;
  prevTranslate = currentTranslate;

  track.style.transform = `translateX(${currentTranslate}px)`;

  updateCounter();
}

function updateCounter() {
  counter.textContent = `${currentIndex + 1} / ${slides.length}`;
}

updateCounter();