(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navigation");

  if (!toggle || !nav) return;

  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector("span").textContent = open ? "−" : "＋";
    nav.classList.toggle("open", open);
  };

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      setMenu(false);
    }
  });
})();