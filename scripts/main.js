let sandwichCount = 0;
let dragging = false;

const lastDrawnCoors = [0, 0];

const renderSandwich = (document, x, y) => {
  var elem = document.createElement("img");

  // randomly choose pogpete vs. sandwich based on ratio
  const first = Math.random() * 10;
  const second = Math.sqrt(pogPeteSlider.value);
  console.log(first, second);
  if (first > second) {
    elem.src = "assets/sandwich.png";
    elem.setAttribute("class", "sandwich");
  } else {
    elem.src = "assets/pogpete.png";
    elem.setAttribute("class", "pogpete");
  }

  elem.setAttribute("class", elem.className + " sandwichLike");
  elem.setAttribute("id", `sandwich-${sandwichCount}`);
  elem.setAttribute("draggable", false);
  elem.style.top = `${y - 12}px`;
  elem.style.left = `${x - 12}px`;
  document.getElementById("mainContentContainer").appendChild(elem);
};

document.addEventListener(
  "click",
  function (e) {
    renderSandwich(document, e.clientX, e.clientY);
    sandwichCount++;
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
    const x = e.clientX;
    const y = e.clientY;
    if (
      Math.abs(x - lastDrawnCoors[0]) < 5 ||
      Math.abs(y - lastDrawnCoors[1]) < 5
    ) {
    } else {
      lastDrawnCoors[0] = x;
      lastDrawnCoors[1] = y;
      renderSandwich(document, e.clientX, e.clientY);
      sandwichCount++;
    }
  }
});

const pogPeteSlider = document.getElementById("pogpeteslider");
