let sandwichCount = 0;

const renderSandwich = (document, x, y) => {
  var elem = document.createElement("img");
  elem.src = "assets/sandwich.png";
  elem.setAttribute("class", "sandwich");
  elem.setAttribute("id", `sandwich-${sandwichCount}`);
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
