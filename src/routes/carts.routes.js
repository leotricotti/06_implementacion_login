import { Router } from "express";
import Cart from "../dao/dbmanager/carts.manager.js";

const router = Router();
const cartsManager = new Cart();

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

//Método asyncrono para obtener todos los carritos
router.get("/", auth, async (req, res) => {
  try {
    const carts = await cartsManager.getAll();
    res.json(carts);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener los carritos",
      data: err,
    });
  }
});

//Método asyncrono para obtener un carrito
router.get("/:cid", auth, async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManager.populatedCart(cid);
    const product = cart.products;
    if (cart) {
      res.render("carts", {
        cart: product,
        styles: "carts.styles.css",
      });
    } else {
      res.status(404).json({
        message: "Carrito no encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el carrito",
      data: err,
    });
  }
});

//Método asyncrono para crear un carrito
router.post("/", auth, async (req, res) => {
  let newCart = {
    products: [],
  };
  try {
    const result = await cartsManager.saveCart(newCart);
    res.json({ message: "Carrito creado con éxito", data: newCart });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el carrito ", data: err });
  }
});

//Método asyncrono para agregar productos al carrito
router.post("/:cid/product/:pid", auth, async (req, res) => {
  const { cid, pid } = req.params;
  const { op } = req.body;
  try {
    const cart = await cartsManager.getOne(cid);
    let productExistsInCart = cart.products.findIndex(
      (dato) => dato.product == pid
    );
    productExistsInCart == -1
      ? cart.products.push({
          product: pid,
          quantity: 1,
        })
      : (cart.products[productExistsInCart].quantity =
          op === "add"
            ? cart.products[productExistsInCart].quantity + 1
            : cart.products[productExistsInCart].quantity - 1);

    const result = await cartsManager.updateCart(cid, cart);

    const updatedCart = await cartsManager.getOne(cid);

    res.json({ message: "Carrito actualizado con éxito", data: updatedCart });
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar el carrito",
      data: err,
    });
  }
});

//Método asyncrono para eliminar productos del carrito
router.delete("/:cid/product/:pid", auth, async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartsManager.getOne(cid);
    let productExistsInCart = cart.products.findIndex(
      (dato) => dato.product == pid
    );
    productExistsInCart == -1
      ? res.status(404).json({ message: "Producto no encontrado" })
      : cart.products.splice(productExistsInCart, 1);
    const result = await cartsManager.updateCart(cid, cart);
    res.json({ message: "Producto eliminado con éxito", data: cart });
  } catch (err) {
    res.status(500).json({
      message: "Error al eliminar el producto del carrito",
      data: err,
    });
  }
});

//Método asyncrono para vaciar el carrito
router.delete("/:cid", auth, async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManager.getOne(cid);
    if (cart) {
      cart.products = [];
      const result = await cartsManager.updateCart(cid, cart);
      res.json({ message: "Carrito vaciado con éxito", data: cart });
    } else {
      res.status(404).json({
        message: "Carrito no encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al vaciar el carrito",
      data: err,
    });
  }
});

export default router;
