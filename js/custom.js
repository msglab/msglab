
/* dark mode selector */
/* function darkModeToggle() {
  var element = document.body;
  element.classList.toggle("dark-mode");
} */

function enableStylesheet(node) {
  node.rel = 'stylesheet';
}

function disableStylesheet(node) {
  node.rel = 'alternate stylesheet';
}

function removeExternalStyleSheetLink(cssLinkId) {
  var cssLink = document.getElementById(cssLinkId);
  cssLink.parentNode.removeChild(cssLink);
}

function createExternalStyleSheetLink(cssLinkId, href) {
  var cssLink = document.createElement("link");
  cssLink.id = cssLinkId;
  cssLink.type = "text/css";
  cssLink.rel = "stylesheet";
  cssLink.href = href;
  cssLink.media = "screen";
  document.getElementsByTagName("head")[0].appendChild(cssLink);
}

var gCurThemeName = "dark";
function changeStyleSheet() {

  console.log('msg', document.getElementById("main-msg-logo").src)
  if (document.getElementById("main-msg-logo").src == "/img/msg_dark.png") {
    document.getElementById("main-msg-logo").src = "/img/msg_light.png";
  }
  else {
    document.getElementById("main-msg-logo").src = "/img/msg_dark.png";
  }

  if (gCurThemeName == "dark") {
    newThemeName = "light"
  } else { newThemeName = "dark" }
  removeExternalStyleSheetLink(gCurThemeName);
  createExternalStyleSheetLink(newThemeName, "/css/" + newThemeName + ".css");
  gCurThemeName = newThemeName;

}