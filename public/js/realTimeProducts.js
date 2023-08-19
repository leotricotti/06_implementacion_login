// Crear una instancia del socket
const socketIo = io();

// Mensaje que indica que el cliente se ha conectado
socketIo.emit("mesagge", "Hola soy un cliente");

// Listener para el evento 'products'
const form = document.getElementById("add-product-form");
form.addEventListener("submit", handleSubmit);

// Escuchar el evento 'currentId' y agreagar el id al nuevo producto
socketIo.on("currentId", (id) => {
  return (newId = id);
});

// Función para manejar el envío del formulario
function handleSubmit(e) {
  e.preventDefault();
  const { title, description, code, price, stock, category, thumbnail } =
    form.elements;
  if (
    !title.value ||
    !description.value ||
    !code.value ||
    !price.value ||
    !stock.value ||
    !category.value ||
    !thumbnail.value
  ) {
    return Swal.fire({
      icon: "error",
      title: "Lo siento...",
      text: "Todos los campos son necesarios!",
      focusConfirm: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
    });
  } else {
    const product = {
      title: title.value,
      description: description.value,
      code: code.value,
      price: price.value,
      stock: stock.value,
      category: category.value,
      thumbnail: thumbnail.value,
    };
    socketIo.emit("addProduct", product);
  }
  Swal.fire({
    icon: "success",
    title: "Producto agregado con exito!",
    showConfirmButton: true,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
  });
  for (let i = 0; i < form.elements.length; i++) {
    form.elements[i].value = "";
  }
}

// Función para actualizar la lista de productos
function updateProductList(products) {
  const productList = document.getElementById("products-list");
  productList.innerHTML = "";
  products.forEach((product) => {
    const container = document.createElement("div");
    container.classList.add("list-group-item");
    container.innerHTML = `
        <div class="d-flex w-100 justify-content-between flex-column">
          <h2 class="mb-1 subtitle">${product.title}</h2>
          <p class="mb-1"><strong>Descripción:</strong> ${product.description}</p>
          <p class="mb-1"><strong>Codigo:</strong> ${product.code}</p>
          <p class="mb-1"><strong>Precio:</strong> ${product.price}</p>
          <p class="mb-1"><strong>Status:</strong> ${product.status}</p>
          <p class="mb-1"><strong>Stock:</strong> ${product.stock}</p>
          <p class="mb-1"><strong>Categoria:</strong> ${product.category}</p>
          <img src="${product.thumbnail}" alt="img" width="50" height="50" class="thumbnail">
        </div>
        <button type="button" class="btn btn-primary delete-product-btn">Eliminar</button>
      `;
    const btnEliminar = container.querySelector(".delete-product-btn");
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
    productList.appendChild(container);
  });
}

// Escuchar el evento 'products' y llamar a la función updateProductList
socketIo.on("products", (products) => {
  updateProductList(products);
});

// Eliminar un producto de la lista de productos
function eliminarProducto(id) {
  socketIo.emit("deleteProduct", id);
  socketIo.on("products", (products) => {
    updateProductList(products);
  });
  Swal.fire({
    icon: "success",
    title: "Producto eliminado con exito!",
    showConfirmButton: true,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
  });
}
