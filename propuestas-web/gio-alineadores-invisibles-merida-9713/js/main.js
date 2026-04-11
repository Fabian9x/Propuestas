(function () {
  var PHONE = "5219901277826"; // +52 1 990 127 7826
  var widget = document.querySelector(".wa-widget");
  var fab = document.getElementById("waFab");
  var messageEl = document.getElementById("waMessage");
  var sendBtn = document.getElementById("waSend");

  if (!widget || !fab || !messageEl || !sendBtn) return;

  var hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");

  function setExpanded(open) {
    fab.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function openWidget() {
    widget.classList.add("is-open");
    setExpanded(true);
  }

  function closeWidget() {
    widget.classList.remove("is-open");
    setExpanded(false);
  }

  function buildUrl() {
    var text = messageEl.value.trim();
    var params = new URLSearchParams();
    if (text) params.set("text", text);
    return "https://wa.me/" + PHONE + (params.toString() ? "?" + params.toString() : "");
  }

  sendBtn.addEventListener("click", function () {
    window.open(buildUrl(), "_blank", "noopener,noreferrer");
  });

  fab.addEventListener("click", function () {
    if (!hoverMedia.matches) {
      if (widget.classList.contains("is-open")) closeWidget();
      else openWidget();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeWidget();
  });

  document.addEventListener("click", function (e) {
    if (!hoverMedia.matches && widget.classList.contains("is-open")) {
      if (!widget.contains(e.target)) closeWidget();
    }
  });

  setExpanded(false);
})();
