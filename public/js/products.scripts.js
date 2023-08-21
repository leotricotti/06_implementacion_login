//Ordenar productos por precio
const sortProductsByPrice = async (sort) => {
  return (window.location.href = `/api/products?sort=${sort}`);
};

//Filtrar productos por categoría
const filterProductsByCategory = async (category) => {
  return (window.location.href = `/api/products?category=${category}`);
};

//Guardar cartId en localStorage
const saveCartId = (cartId) => {
  if (!cartId) {
    localStorage.setItem("cartId", cartId);
  } else {
    localStorage.removeItem("cartId");
    localStorage.setItem("cartId", cartId);
  }
};

//Obtener carrito
const getCartId = async () => {
  const response = await fetch("http://localhost:3001/api/carts");
  const carts = await response.json();
  const lastCart = carts[carts.length - 1];
  saveCartId(lastCart._id);
};

getCartId();

// Agrega productos al carrito
const addProduct = async (idProduct) => {
  //Obtener cartId de localStorage
  const cartId = localStorage.getItem("cartId");
  if (!cartId) {
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
      body: JSON.stringify({
        op: "add",
      }),
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
