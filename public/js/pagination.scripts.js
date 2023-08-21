// Initializar socket.io
const socketIo = io();

// Obtener la pagina actual
socketIo.emit("page", localStorage.getItem("currentPage"));

const page = document.getElementById("item-page");

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(`li[data-page]`);
  const element = document.getElementById("previous-page");
  if (!localStorage.getItem("currentPage")) {
    element.classList.add("disabled");
    elements.classList.add("active");
  } else if (localStorage.getItem("currentPage") === "4") {
    const element = document.getElementById("next-page");
    element.classList.add("disabled");
  } else if (localStorage.getItem("currentPage") === "1") {
    const element = document.getElementById("previous-page");
    element.classList.add("disabled");
  }
});

// Agregar la clase active al elemento de la pagina actual
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = localStorage.getItem("currentPage");
  const elements = document.querySelectorAll(`li[data-page]`);
  elements.forEach((element) => {
    if (element.dataset.page === currentPage) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
});

//Paginación de navegación
const pagination = (page, api) => {
  if (page) {
    let currentPage = localStorage.setItem("currentPage", page);
  }
  return (window.location.href = `${api}=${page}`);
};

//Paginación botón anterior
const previousPage = (api) => {
  let currentPage = localStorage.getItem("currentPage");
  currentPage = parseInt(currentPage);
  if (currentPage > 1) {
    currentPage -= 1;
  }
  const result = localStorage.setItem("currentPage", currentPage);
  return (window.location.href = `/api/${api}=${currentPage}`);
};

//Paginación botón siguiente
const nextPage = (api) => {
  let currentPage = localStorage.getItem("currentPage");
  currentPage = parseInt(currentPage);
  if (currentPage < 4) {
    currentPage += 1;
  }

  const result = localStorage.setItem("currentPage", currentPage);
  return (window.location.href = `${api}=${currentPage}`);
};
