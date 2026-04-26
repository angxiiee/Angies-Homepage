console.log(":)");

// javascript for my cursor:

const cursor = document.querySelector(".cursor");

const colors = [
  "#EBBBC5",
  "#F9E2D7",
  "#E2EDEB",
  "#C2D18B",
  "#EEF5F6",
];

let lastSparkleTime = 0;

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  const now = Date.now();

for (let i = 0; i < 3; i++) {
  createSparkle(e.clientX, e.clientY);
}
});

function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("cursor-trail");

  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 15 + 5;
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 50 + 10;

  sparkle.style.backgroundColor = color;
  sparkle.style.boxShadow = `0 0 10px ${color}`;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;

  document.body.appendChild(sparkle);

  sparkle.animate(
    [
      { opacity: 1, transform: "translate(-50%,-50%) scale(1)" },
      {
        opacity: 0,
        transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px),
                             calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`
      }
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
    }
  );

  setTimeout(() => sparkle.remove(), 1000);
}

// javascript for my sidebar:

const controls = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");

controls.forEach(control => {
  control.addEventListener("click", () => {

    const target = control.dataset.page;

    pages.forEach(page => {
      page.classList.remove("active");
    });

    const targetPage = document.getElementById(target);
    if (targetPage) {
      targetPage.classList.add("active");
    }

  });
});

// javascript for my work page thumbnails:

const thumbs = document.querySelectorAll("[data-project]");
const projects = document.querySelectorAll(".project");

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {

    const target = thumb.dataset.project;

    projects.forEach(p => {
      p.classList.remove("active");
    });

    const targetProject = document.getElementById(target);
    if (targetProject) {
      targetProject.classList.add("active");
    }

  });
});
