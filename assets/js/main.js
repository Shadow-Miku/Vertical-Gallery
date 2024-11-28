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
    "data-slide-text": "Descripción del personaje 0",
    img: "./assets/images/img-0.png",
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
  {
    "data-slide-title": "personaje4",
    "data-slide-text": "Descripción del personaje 4",
    img: "./assets/images/img-4.png",
  },
  {
    "data-slide-title": "personaje5",
    "data-slide-text": "Descripción del personaje 5",
    img: "./assets/images/img-5.jpg",
  },
  {
    "data-slide-title": "personaje6",
    "data-slide-text": "Descripción del personaje 6",
    img: "./assets/images/img-6.jpg",
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
