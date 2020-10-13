
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
  console.log('msg')
  var cssLink = document.createElement("link");
  cssLink.id = cssLinkId;
  cssLink.type = "text/css";
  cssLink.rel = "stylesheet";
  cssLink.href = href;
  cssLink.media = "screen";
  /*   document.getElementsByTagName("head")[0].appendChild(cssLink);
  
  
    document.getElementById('theme').setAttribute('href', cssLinkId); */
  localStorage.setItem("sheet", cssLinkId);

}

function changeStyleSheet() {


  /*   if (theme == "light") {
      document.getElementById("main-msg-logo").src = "/img/msg_dark.png"
      newTheme = "dark"
    } else {
      newTheme = "light"
      document.getElementById("main-msg-logo").src = "//img/msg_light.png"
    }
    removeExternalStyleSheetLink(theme);
    createExternalStyleSheetLink(newTheme, "/css/" + newTheme + ".css");
    theme = newTheme; */
}

function applyStyleSheet(sheet) {
  document.getElementById('themeToggle').setAttribute('href', sheet);
  localStorage.setItem("sheet", sheet);
}


function swapStyleSheet() {
  var currentCSS = document.getElementById('themeToggle').href
  console.log('msg', currentCSS)
  if (currentCSS == "/css/dark.css") {
    console.log('msg sheet', currentCSS)
    var sheet = "/css/light.css"
    document.getElementById('themeToggle').setAttribute('href', sheet);
    localStorage.setItem("sheet", sheet);

  } else if (currentCSS = "/css/light.css") {
    console.log('msg sheet', currentCSS)
    var sheet = "/css/dark.css"
    document.getElementById('themeToggle').setAttribute('href', sheet);
    localStorage.setItem("sheet", sheet);
  }
}


window.onload = _ =>
  applyStyleSheet(
    localStorage.getItem("sheet") || "/css/dark.css"
  );