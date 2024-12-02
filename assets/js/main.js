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
    "data-slide-title": "Noelle",
    "data-slide-text":
      "Extremely strong and reliable, Noelle is considered to be 'the maid of all maids' in the Knights of Favonius, with many thinking she has the ability to be everywhere all at once. ",
    img: "./assets/images/img-0.jpg",
  },
  {
    "data-slide-title": "Yotsuba Nakano",
    "data-slide-text":
      "She is the fourth sister of the Nakano quintuplets. She has a sparkling and cheerful personality.",
    img: "./assets/images/img-1.png",
  },
  {
    "data-slide-title": "Hifumi Takimoto",
    "data-slide-text":
      "Hifumi is a very shy and self-conscious girl. She is always shy and doesn't talk much to others, as she is not very sociable, but deep down she is very friendly and cheerful. ",
    img: "./assets/images/img-2.jpg",
  },
  {
    "data-slide-title": "Mafuyu Hoshikawa",
    "data-slide-text":
      "Mafuyu is a mature and wise girl, she is characteristically very intelligent, her appearance is often deceptive and she is actually an older girl whose appearance allows her to deceive with her sweetness. ",
    img: "./assets/images/img-3.jpg",
  },
  {
    "data-slide-title": "Chiori ",
    "data-slide-text":
      "Chiori is a talented girl, she has a dedicated personality and never gives up easily in the face of challenges, her passion and creativity have driven her to pursue her dream, she always maintains a positive attitude and great dedication to her goals.",
    img: "./assets/images/img-4.png",
  },
  {
    "data-slide-title": "GwenPool",
    "data-slide-text":
      "A girl from the real world transported to the Marvel Universe, Marvel initially produced two stories featuring Gwenpool as a character.",
    img: "./assets/images/img-8.jpg",
  },
  {
    "data-slide-title": "MNF Mogador ",
    "data-slide-text":
      "Mogador was the lead ship of the French Navy's Mogador class of large destroyers (contre-torpilleurs). Named after the Moroccan town, she was built before the outbreak of World War II.",
    img: "./assets/images/img-6.jpg",
  },
  {
    "data-slide-title": "ACR",
    "data-slide-text":
      "ACR states that she is a calm and level headed T-Doll at all times, she will always look at problems from other people's perspective and she believes anger is a sign of incompetence.",
    img: "./assets/images/img-7.png",
  },
  // Aqui se pueden agregar más personajes o elementos a la galería
];

const titleElement = document.getElementById("data-slide-title");
const textElement = document.getElementById("data-slide-text");
const imageElement = document.querySelector("#slider img");
const selector = document.getElementById("selector");
let currentIndex = 0; // Índice actual visible
const visibleButtons = 4; // Cantidad máxima de botones visibles
let startIndex = 0; // Índice del primer botón visible

// Función para actualizar el contenido dinámico
function updateContent(index) {
  const selectedData = data[index];
  if (selectedData) {
    titleElement.textContent = selectedData["data-slide-title"];
    textElement.textContent = selectedData["data-slide-text"];
    imageElement.src = selectedData.img;
  }
}

// Función para ajustar el rango de botones visibles según el índice actual
function adjustStartIndex() {
  if (currentIndex < startIndex) {
    startIndex = currentIndex; // Ajustar rango para incluir el índice actual
  } else if (currentIndex >= startIndex + visibleButtons) {
    startIndex = currentIndex - visibleButtons + 1; // Ajustar rango hacia adelante
  }
}

// Función para actualizar los botones visibles (sin mostrar números)
function updateSelectorButtons() {
  selector.innerHTML = ""; // Limpiar los botones actuales
  adjustStartIndex(); // Ajustar el rango si es necesario

  // Crear botones para el rango visible
  for (
    let i = startIndex;
    i < startIndex + visibleButtons && i < data.length;
    i++
  ) {
    const button = document.createElement("button");
    button.setAttribute("data-slide", i);
    button.classList.add("nav-button"); // Clase genérica para los botones
    if (i === currentIndex) button.classList.add("active");
    selector.appendChild(button);
  }

  // Agregar botón "Cargar más" si hay más elementos
  if (startIndex + visibleButtons < data.length) {
    const loadMoreButton = document.createElement("button");
    loadMoreButton.textContent = ""; // Símbolo para cargar más
    loadMoreButton.classList.add("load-more");
    loadMoreButton.addEventListener("click", () => {
      startIndex++; // Avanzar el rango
      updateSelectorButtons(); // Actualizar botones
    });
    selector.appendChild(loadMoreButton);
  }

  // Agregar botón "Cargar menos" si es posible retroceder
  if (startIndex > 0) {
    const loadLessButton = document.createElement("button");
    loadLessButton.textContent = ""; // Símbolo para cargar menos
    loadLessButton.classList.add("load-less");
    loadLessButton.addEventListener("click", () => {
      startIndex--; // Retroceder el rango
      updateSelectorButtons(); // Actualizar botones
    });
    selector.insertBefore(loadLessButton, selector.firstChild);
  }
}

// Evento para manejar clics en los botones del selector
selector.addEventListener("click", (event) => {
  const button = event.target;
  if (
    button.tagName === "BUTTON" &&
    !button.classList.contains("load-more") &&
    !button.classList.contains("load-less")
  ) {
    const slideIndex = button.getAttribute("data-slide");
    if (slideIndex !== null) {
      currentIndex = Number(slideIndex);
      updateContent(currentIndex);
      updateSelectorButtons(); // Actualizar botones activos
    }
  }
});

// Evento para manejar las flechas del teclado
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    // Navegar al siguiente elemento
    currentIndex = (currentIndex + 1) % data.length; // Cíclico
    if (currentIndex >= startIndex + visibleButtons) {
      startIndex++; // Avanzar rango
    }
    updateContent(currentIndex);
    updateSelectorButtons();
  } else if (event.key === "ArrowLeft") {
    // Navegar al elemento anterior
    currentIndex = (currentIndex - 1 + data.length) % data.length; // Cíclico
    if (currentIndex < startIndex) {
      startIndex--; // Retroceder rango
    }
    updateContent(currentIndex);
    updateSelectorButtons();
  }
});

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
  updateContent(currentIndex); // Mostrar el contenido inicial
  updateSelectorButtons(); // Inicializar los botones del selector
});

// Detectar el tamaño de la pantalla para activar el selector móvil
function updateMobileSelector() {
  const mobileSelector = document.getElementById("mobile-selector");
  if (window.innerWidth <= 800) {
    mobileSelector.style.display = "flex";
  } else {
    mobileSelector.style.display = "none";
  }
}

// Manejar navegación con flechas en dispositivos pequeños
document.getElementById("mobile-prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + data.length) % data.length; // Navegación cíclica
  if (currentIndex < startIndex) {
    startIndex--;
  }
  updateContent(currentIndex);
  updateSelectorButtons();
});

document.getElementById("mobile-next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % data.length; // Navegación cíclica
  if (currentIndex >= startIndex + visibleButtons) {
    startIndex++;
  }
  updateContent(currentIndex);
  updateSelectorButtons();
});

// Escuchar cambios de tamaño en la ventana
window.addEventListener("resize", updateMobileSelector);

// Inicializar el comportamiento al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  updateMobileSelector();
});
