
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