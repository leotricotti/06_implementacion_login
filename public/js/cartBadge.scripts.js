//Cart-badge en el header
const cartBadge = async () => {
  const cartId = localStorage.getItem("cartId");
  try {
    const response = await fetch(`/api/carts/cartbadge/${cartId}`);
    if (!response.ok) {
      throw new Error("Error al obtener el carrito");
    }
    const cart = await response.json();
    const cartBadge = document.getElementById("cart-badge");
    cartBadge.innerText = cart.products.length || 0;
  } catch (error) {
    console.error(error);
  }
};

cartBadge();
