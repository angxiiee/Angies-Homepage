const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

slides.forEach((slide, index) => {
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);
});

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startX = event.touches[0].clientX;
    isDragging = true;
  };
}

function touchMove(event) {
  if (!isDragging) return;
  const currentPosition = event.touches[0].clientX;
  const diff = currentPosition - startX;
  currentTranslate = prevTranslate + diff;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slides.length - 1) {
    currentIndex += 1;
  }

  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  }

  setPositionByIndex();
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  track.style.transform = `translateX(${currentTranslate}px)`;
}