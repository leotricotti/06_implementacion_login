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
      res.render("products", {
        products: tempArray,
        styles: "products.styles.css",
      });
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

export default router;
