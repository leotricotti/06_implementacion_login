//Paginación de navegación
const pagination = (page) => {
  console.log(page);
  if (page) {
    let currentPage = localStorage.setItem("currentPage", page);
  }
  return (window.location.href = `/api/products?page=${page}`);
};

//Paginación botón anterior
const previousPage = () => {
  let currentPage = localStorage.getItem("currentPage");
  currentPage = parseInt(currentPage);
  if (currentPage > 1) {
    currentPage -= 1;
  }
  const result = localStorage.setItem("currentPage", currentPage);
  return (window.location.href = `/api/products?page=${currentPage}`);
};

//Paginación botón siguiente
const nextPage = () => {
  let currentPage = localStorage.getItem("currentPage");
  currentPage = parseInt(currentPage);
  if (currentPage < 4) {
    currentPage += 1;
  }
  const result = localStorage.setItem("currentPage", currentPage);
  return (window.location.href = `/api/products?page=${currentPage}`);
};

//Ordenar productos por precio
const sortProductsByPrice = async (sort) => {
  return (window.location.href = `/api/products?sort=${sort}`);
};

//Filtrar productos por categoría
const filterProductsByCategory = async (category) => {
  return (window.location.href = `/api/products?category=${category}`);
};

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

//Cerrar sesión
const logout = async () => {
  const response = await fetch("/api/session/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response) {
    localStorage.removeItem("cartId");
    localStorage.removeItem("currentPage");
    window.location.href = "/";
  }
  return response;
};
