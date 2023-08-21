// Initializar socket.io
const socketIo = io();

// Obtener la pagina actual
socketIo.emit("page", localStorage.getItem("currentPage"));

//Desabilitar boton de paginación anterior en página 1
if (localStorage.getItem("currentPage") === "1") {
  const element = document.getElementById("previous-page");
  element.classList.add("disabled");
}

//Desabilitar boton de paginación siguiente en página 4
if (localStorage.getItem("currentPage") === "4") {
  const element = document.getElementById("next-page");
  element.classList.add("disabled");
}

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
  return (window.location.href = `/api/${api}=${page}`);
};

//Paginación botón siguiente
const nextPage = (api) => {
  let currentPage = localStorage.getItem("currentPage");
  currentPage = parseInt(currentPage);
  if (currentPage < 4) {
    currentPage += 1;
  }
  const result = localStorage.setItem("currentPage", currentPage);
  return (window.location.href = `${api}=${page}`);
};
