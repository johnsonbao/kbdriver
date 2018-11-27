function htRem() {
  var ww = document.documentElement.clientWidth;
  if (ww < 1000) {
    ww = 1000;
  }
  document.documentElement.style.fontSize = ww / 100 + "px";
  //window.mainboxh = document.getElementById("mainbox").offsetHeight;
}
htRem();
window.onresize = function() {
  console.log(1111)
  htRem();
};
