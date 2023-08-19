import { Router } from "express";

const router = Router();

// Método asyncrono para obtener los productos en tiempo real
router.get("/", async (req, res) => {
  try {
    res.render("addproduct", {
      styles: "addproduct.styles.css",
    });
  } catch (err) {
    res.render({ message: "Error al obtener los productos", data: err });
  }
});

export default router;
