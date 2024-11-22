document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("onload");

  // Add a delay to simulate loading (for demo purposes)
  setTimeout(() => {
    preloader.classList.add("hidden");

    // Optionally, remove the preloader element from the DOM
    preloader.addEventListener("transitionend", () => {
      preloader.remove();
    });
  }, 1000); // Adjust the timeout as needed
});

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector("header nav");
  const closeButton = document.querySelector(".close-menu");
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  // Abrir menú
  burger.addEventListener("click", () => {
    menu.classList.add("active");
    overlay.classList.add("show");
  });

  // Cerrar menú al hacer clic en la "X"
  closeButton.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("show");
  });

  // Cerrar menú al hacer clic en un enlace dentro del menú
  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      menu.classList.remove("active");
      overlay.classList.remove("show");
    }
  });
});
