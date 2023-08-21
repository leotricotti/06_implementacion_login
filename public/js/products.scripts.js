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

//Guardar cartId en localStorage
const saveCartId = (cartId) => {
  if (!cartId) {
    localStorage.setItem("cartId", cartId);
  } else {
    localStorage.removeItem("cartId");
    localStorage.setItem("cartId", cartId);
  }
};

//Función que al agregar un producto al carrito y el producto ya existe en el carrito, aumenta la cantidad del producto en 1
const createCart = async () => {
  const response = await fetch("/api/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products: [],
    }),
  });
  const cart = await response.json();
  if (cart) {
    showResult("Carrito creado con éxito");
    getCartId();
  }
};

//Obtener carrito
const getCartId = async () => {
  const response = await fetch("http://localhost:3001/api/carts");
  const carts = await response.json();
  const lastCart = carts[carts.length - 1];
  saveCartId(lastCart._id);
};

// Agrega productos al carrito
const addProduct = async (idProduct) => {
  //Obtener cartId de localStorage
  const cartId = localStorage.getItem("cartId");
  if (!cartId) {
    createCart();
    const response = await fetch(`/api/carts/${cartId}/product/${idProduct}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    const response = await fetch(`/api/carts/${cartId}/product/${idProduct}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) showResult("Producto agregado con éxito");
    return response;
  }
};

//Obtener cartId de localStorage y asignarlo a la ruta del carrito
const setCartRoute = () => {
  const cartRoute = document
    .getElementById("cart-route")
    .setAttribute("href", `/api/carts/${localStorage.getItem("cartId")}`);
  return cartRoute;
};
