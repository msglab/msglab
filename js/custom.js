
/* function enableStylesheet(node) {
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
    document.getElementById('theme').setAttribute('href', cssLinkId);
  localStorage.setItem("sheet", cssLinkId);
}
 */
function applyStyleSheet(sheet) {
  document.getElementById('themeToggle').setAttribute('href', sheet);
  localStorage.setItem("sheet", sheet);

  if (window.location.href == "/index") {
    if (sheet == "/css/dark.css") {
      document.getElementById("main-msg-logo").src = "/img/msg_dark.png"
    } else {
      document.getElementById("main-msg-logo").src = "/img/msg_light.png"
    }

  }

}
function swapStyleSheet() {
  console.log( 'change theme')
  var currentCSS = document.getElementById('themeToggle').href
  if (currentCSS == "/css/dark.css") {
    var sheet = "/css/light.css"
    document.getElementById('themeToggle').setAttribute('href', sheet);
    localStorage.setItem("sheet", sheet);

  } else if (currentCSS = "/css/light.css") {
    var sheet = "/css/dark.css"
    document.getElementById('themeToggle').setAttribute('href', sheet);
    localStorage.setItem("sheet", sheet);
  }

  if (window.location.href == "/index") {
    if (sheet == "/css/dark.css") {
      document.getElementById("main-msg-logo").src = "/img/msg_dark.png"
    } else {
      document.getElementById("main-msg-logo").src = "/img/msg_light.png"
    }

  }
}

window.onload = _ =>
  applyStyleSheet(
    localStorage.getItem("sheet") || "/css/dark.css"
  );