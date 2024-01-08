document.body.innerHTML += `<div id="mydiv" style='position: absolute;
  z-index: 900000;
  top:0px;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  text-align: center;'>
  <div id="mydivheader" style='padding: 10px;
  cursor: move;
  z-index: 1000000;
  background-color: #2196F3;
  color: #fff;'>Click here to move</div>
</div>`;
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

let parseNum = (a) => {
  return a.search("L") == -1
    ? parseFloat(a.replaceAll(",", ""))
    : parseFloat(a.replaceAll(",", "")) * 100000;
};

setInterval(() => {
  let x = $(".datarows");
  let totalVolCe = 0;
  let totalVolPe = 0;

  let totalOICe = 0;
  let totalOIPe = 0;
  for (let i = 0; i < x.length; i++) {
    try {
      //console.log((x[i].children[8].innerHTML).replaceAll(",",""),parseNum(x[i].children[4].children[0].innerHTML),parseNum(x[i].children[12].children[0].innerHTML));
      totalVolCe += parseNum(x[i].children[1].innerHTML) || 0;
      totalVolPe += parseNum(x[i].children[5].innerHTML) || 0;
      totalOICe +=
        parseNum(
          x[i].children[0].children[0].innerHTML.substring(
            0,
            x[i].children[0].children[0].innerHTML.indexOf("&")
          )
        ) ||
        parseNum(
          x[i].children[0].innerHTML.substring(
            0,
            x[i].children[0].innerHTML.indexOf("&")
          )
        ) ||
        0;
      totalOIPe +=
        parseNum(
          x[i].children[6].innerHTML.substring(
            0,
            x[i].children[6].innerHTML.indexOf("<")
          )
        ) || 0;
    } catch {}
  }
  console.log(
    "CPR VOL: " + Math.round((totalVolCe * 1000) / totalVolPe) / 1000
  );

  console.log("PCR OI: " + Math.round((totalOIPe * 1000) / totalOICe) / 1000);
}, 3000);
