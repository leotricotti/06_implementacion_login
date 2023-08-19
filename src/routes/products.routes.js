import { Router } from "express";
import Product from "../dao/dbmanager/products.manager.js";

const router = Router();
const productsManager = new Product();

//Middleware para hacer privadas las rutas
const auth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({
      respuesta: "No estás autorizado",
    });
  }
};

// Método asyncrono para obtener todos los productos
router.get("/", auth, async (req, res) => {
  const { limit, page, sort, category } = req.query;
  let initialPage = page ? page : 1;
  try {
    const response = await productsManager.getAll();
    if (limit) {
      let tempArray = response.slice(0, limit);
      res.render("products", {
        products: tempArray,
        styles: "products.styles.css",
      });
    } else if (category) {
      let filteredProducts = await productsManager.filteredProducts(category);
      res.render("products", {
        products: filteredProducts.docs,
        styles: "products.styles.css",
      });
    } else if (sort) {
      let orderedProducts = await productsManager.orderedProducts(sort);
      res.render("products", {
        products: orderedProducts,
        styles: "products.styles.css",
      });
    } else {
      let paginatedProducts = await productsManager.paginatedProducts(
        initialPage
      );
      res.render("products", {
        products: paginatedProducts.docs,
        styles: "products.styles.css",
      });
    }
  } catch (err) {
    res.render({ message: "Error al obtener los productos", data: err });
  }
});

// Método asyncrono para obtener un producto
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsManager.getOne(pid);
    if (product) {
      res.json({ message: "success", products: product });
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el producto",
      data: err,
    });
  }
});

// Método asyncrono para actualizar un producto
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const data = req.body;
  try {
    if (Object.keys(data).length === 0) {
      res.status(400).json({ message: "Faltan datos" });
    } else {
      await productsManager.updateProducts(pid, data);
      res.json({
        message: "Producto modificado con éxito",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al modificar el producto",
      data: err,
    });
  }
});

//Metodo asyncrono para eliminar un producto
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const respuesta = await productsManager.deleteProducts(pid);
    if (respuesta) {
      res.json({
        mensaje: "Producto eliminado con éxito",
        producto: respuesta,
      });
    } else {
      res.status(404).json({ mensaje: "Producto no encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar el producto", err: err });
  }
});

export default router;
