
/* dark mode selector */
/* function darkModeToggle() {
  var element = document.body;
  element.classList.toggle("dark-mode");
} */

function enableStylesheet (node) {
  node.rel = '/css/light.css';
}

function disableStylesheet (node) {
  node.rel = '/css/dark.css';
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

 
function changeStyleSheet(newThemeName) {
  var gCurThemeName = "mono";
  removeExternalStyleSheetLink(gCurThemeName);
  createExternalStyleSheetLink(newThemeName, newThemeName + ".css");
  gCurThemeName = newThemeName;
  document.getElementById("using").innerHTML = gCurThemeName + ".css";
}