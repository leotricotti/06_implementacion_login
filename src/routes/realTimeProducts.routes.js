import { Router } from "express";
import Product from "../dao/dbmanager/products.manager.js";

//Inilizar variables
const router = Router();
const productsManager = new Product();

//Metodo asyncrono para guardar un producto
router.post("/", async (req, res) => {
  let codeExist;
  try {
    let products = await productsManager.getAll();
    codeExist = products.find((product) => product.code === code);
  } catch (err) {
    console.log(err);
  }

  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  if (!title || !description || !price || !code || !stock) {
    res.status(400).json({ message: "Faltan datos" });
  }

  if (codeExist) {
    res.status(400).json({ message: "El código ya existe" });
  } else {
    let product = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails: !thumbnails ? "" : thumbnails,
    };
    try {
      await productsManager.saveProducts(product);
      res.json({ message: "Producto creado con éxito", data: product });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al crear el producto", data: err });
    }
  }
});

//Metodo asyncrono para eliminar un producto
router.delete("/realtimeproducts/:pid", async (req, res) => {
  const { pid } = req.params;
  console.log(products);
  try {
    // Leer el archivo JSON
    let data = await utils.readFile(dataJson);
    // Agregar los productos del archivo al array de productos
    products.push(...data);
    // Encontrar el índice del producto en el array de productos
    let productIndex = products.findIndex((dato) => dato.id === parseInt(pid));
    // Si se encuentra el producto, eliminarlo del array
    if (productIndex !== -1) {
      // Obtener el producto a eliminar
      let product = products[productIndex];
      // Eliminar el producto del array
      products.splice(productIndex, 1);
      // Escribir el archivo JSON actualizado
      await utils.writeFile(dataJson, products);
      // Devolver el producto eliminado
      res.json({ mensaje: "Producto eliminado con éxito", producto: product });
    } else {
      // Si no se encuentra el producto, devolver un mensaje indicando que no existe
      res.status(404).json({ mensaje: "Producto inexistente" });
    }
  } catch (error) {
    // Manejar el error
    console.log(error);
  }
});

export default router;
