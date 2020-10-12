
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
  console.log('cssLink', cssLink)
  document.getElementsByTagName("head")[0].appendChild(cssLink);
}

var gCurThemeName = "dark";
function changeStyleSheet() {
  if (gCurThemeName == "dark") {
    newThemeName = "light"
  } else { newThemeName = "dark" }
  removeExternalStyleSheetLink(gCurThemeName);
  createExternalStyleSheetLink(newThemeName, "/css/" + newThemeName + ".css");
  gCurThemeName = newThemeName;

}