export function scrollToTop() {
  window.scrollTo(0, 0); // Scrolls to the top of the page
  document.getElementsByTagName("html")[0].style = { overflow: "hidden" };
  document.getElementsByTagName("body")[0].style = { position: "fixed" };
  setTimeout(() => {
    document.getElementsByTagName("html")[0].style.clear;
    document.getElementsByTagName("body")[0].style.clear;
  }, 500);
}
