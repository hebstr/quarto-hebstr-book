
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("details.code-fold").forEach(function (details) {
    var summary = details.querySelector("summary");
    if (!summary) return;
    var outer = details.parentElement;
    if (outer && outer.hasAttribute("data-code-filename")) {
      summary.innerText = outer.getAttribute("data-code-filename");
      return;
    }
    var fileEl = details.querySelector(".code-with-filename-file strong");
    if (fileEl) {
      var cw = fileEl.closest(".code-with-filename");
      if (cw && !cw.classList.contains("code-window-auto")) {
        summary.innerText = fileEl.textContent;
      }
    }
  });
});
