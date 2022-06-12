const root = document.querySelector(':root');



// Disables right click menu
window.addEventListener('contextmenu', function(e) {
    //e.preventDefault();
});

if( navigator.userAgent.indexOf("Firefox") != -1 ) {
  root.style.setProperty("--scrollbar-padding", "0.3rem");
}