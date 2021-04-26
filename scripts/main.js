let sandwichCount = 0;
let dragging = false;
let pogpeteratio = 1;

const lastDrawnCoors = [0, 0];

const renderSandwich = (document, x, y) => {
  var elem = document.createElement("img");

  // randomly choose pogpete vs. sandwich based on ratio
  if (Math.random() * 10 < Math.sqrt(pogpeteratio)) {
    elem.src = "assets/pogpete.png";
    elem.setAttribute("class", "pogpete");
  } else {
    elem.src = "assets/sandwich.png";
    elem.setAttribute("class", "sandwich");
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
      console.log("Returning", x, lastDrawnCoors[0], y, lastDrawnCoors[1]);
    } else {
      lastDrawnCoors[0] = x;
      lastDrawnCoors[1] = y;
      renderSandwich(document, e.clientX, e.clientY);
      sandwichCount++;
    }
  }
});

const pogPeteSlider = document.getElementById("pogpeteslider");

pogPeteSlider.oninput = () => {
  pogpeteratio = pogPeteSlider.value;
};

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
