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
