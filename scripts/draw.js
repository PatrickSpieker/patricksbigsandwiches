const CANVAS_SIZE = 500;
const STROKE_DIAMATER = 6;

let pixelCount = 0;
let dragging = false;

const pixels = [];
for (let i = 0; i < CANVAS_SIZE; i++) {
  pixels.push(new Array(CANVAS_SIZE).fill(0));
}

const canvas = document.getElementById("canvas");
let bounds = canvas.getBoundingClientRect();
console.log(bounds.top, bounds.right, bounds.bottom, bounds.left);

const drawPixel = (document, x, y) => {
  var elem = document.createElement("div");

  elem.setAttribute("class", "pixel");
  elem.setAttribute("id", `pixel-${pixelCount}`);
  elem.setAttribute("draggable", false);
  elem.style.top = `${y - 3}px`;
  elem.style.left = `${x - 3}px`;
  document.getElementById("mainContentContainer").appendChild(elem);
};

const updatePixelArray = (normalizedX, normalizedy) => {
  pixels[normalizedy][normalizedX] = 1;
};

// Return a normalized value for the coordinate based on the canvas size
const normalizeAxis = (coord, min, max) => {
  const baseValue = coord - min;
  const range = max - min;
  const normalized = Math.round((baseValue / range) * 500);
  return normalized;
};

const checkIfInBoundsAndDraw = (x, y) => {
  if (
    bounds.top < y &&
    bounds.bottom > y &&
    bounds.left < x &&
    bounds.right > x
  ) {
    drawPixel(document, x, y);
    const normalizedX = normalizeAxis(x, bounds.left, bounds.right);
    const normalizedY = normalizeAxis(y, bounds.top, bounds.bottom);
    updatePixelArray(normalizedX, normalizedY);
    drawPixel(document, x, y);
  }
};

document.addEventListener(
  "click",
  (e) => {
    checkIfInBoundsAndDraw(e.clientX, e.clientY);
  },
  false
);

document.addEventListener("mousedown", () => {
  dragging = true;
});

document.addEventListener("mouseup", () => {
  dragging = false;
});

document.addEventListener("mousemove", function (e) {
  if (dragging) {
    checkIfInBoundsAndDraw(e.clientX, e.clientY);
  }
});
