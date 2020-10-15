
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
  if (window.location.href == "https://msglab.co/index" || window.location.href == "https://msglab.co/") {
    if (sheet == "https://msglab.co/css/light.css") {
      document.getElementById("main-msg-logo").src = "/img/msg_light.png"
    } else {
      document.getElementById("main-msg-logo").src = "/img/msg_dark.png"
    }
  }
}

function swapStyleSheet() {
  var currentCSS = document.getElementById('themeToggle').href
  if (currentCSS == "https://msglab.co/css/dark.css") {
    var sheet = "https://msglab.co/css/light.css"
    document.getElementById('themeToggle').setAttribute('href', sheet);
    localStorage.setItem("sheet", sheet);
  } else if (currentCSS = "https://msglab.co/css/light.css") {
    var sheet = "https://msglab.co/css/dark.css"
    document.getElementById('themeToggle').setAttribute('href', sheet);
    localStorage.setItem("sheet", sheet);
  }

  if (window.location.href == "https://msglab.co/index" || window.location.href == "https://msglab.co/") {
    if (sheet == "https://msglab.co/css/dark.css") {
      document.getElementById("main-msg-logo").src = "/img/msg_dark.png"
    } else {
      document.getElementById("main-msg-logo").src = "/img/msg_light.png"
    }
  }
}

window.onload = _ => {
  applyStyleSheet(
    localStorage.getItem("sheet") || "/css/dark.css"
  );
  $(document).ready(function () {
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#top']").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });

    $(window).scroll(function () {
      $(".slideanim").each(function () {
        var pos = $(this).offset().top;

        var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
      });
    });
  })
}