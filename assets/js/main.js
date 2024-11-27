// Preloader
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

// Menu responsive
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

// Galeria
// Array de objetos con los datos de cada personaje
const data = [
  {
    "data-slide-title": "personaje0",
    "data-slide-text":
      "Descripción del personaje 0, Primis platea litora per est tellus molestie donec fames torquent aliquet, hendrerit lectus rhoncus urna egestas vulputate erat cubilia. Primis platea litora per est tellus molestie donec fames torquent aliquet, hendrerit lectus rhoncus urna egestas vulputate erat cubilia. ",
    img: "./assets/images/img-0.jpg",
  },
  {
    "data-slide-title": "personaje1",
    "data-slide-text": "Descripción del personaje 1",
    img: "./assets/images/img-1.jpg",
  },
  {
    "data-slide-title": "personaje2",
    "data-slide-text": "Descripción del personaje 2",
    img: "./assets/images/img-2.png",
  },
  {
    "data-slide-title": "personaje3",
    "data-slide-text": "Descripción del personaje 3",
    img: "./assets/images/img-3.jpg",
  },
];

// Elementos dinámicos en el DOM
const titleElement = document.getElementById("data-slide-title");
const textElement = document.getElementById("data-slide-text");
const imageElement = document.querySelector("#slider img");
const selector = document.getElementById("selector");

// Función para actualizar el contenido dinámico
function updateContent(index) {
  const selectedData = data[index];
  if (selectedData) {
    titleElement.textContent = selectedData["data-slide-title"];
    textElement.textContent = selectedData["data-slide-text"];
    imageElement.src = selectedData.img;
  }
}

// Evento para manejar clics en los botones del selector
selector.addEventListener("click", (event) => {
  const button = event.target; // Verifica el elemento clicado
  if (button.tagName === "BUTTON") {
    const slideIndex = button.getAttribute("data-slide");
    if (slideIndex !== null) {
      updateContent(Number(slideIndex));

      // Actualiza la clase activa
      const buttons = selector.querySelectorAll("button");
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    }
  }
});

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
  updateContent(0); // Carga el contenido del personaje 0
});
