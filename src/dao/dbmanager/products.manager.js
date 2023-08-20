import productsModel from "../models/products.model.js";

export default class Product {
  //Método asyncrono para obtener todos los productos
  getAll = async () => {
    try {
      let products = await productsModel.find().lean();
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener un producto
  getOne = async (id) => {
    try {
      let product = await productsModel.findById(id);
      return product;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para crear un producto
  saveProducts = async (product) => {
    try {
      let result = await productsModel.create(product);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para actualizar un producto
  updateProducts = async (id, product) => {
    try {
      let result = await productsModel.findByIdAndUpdate(id, product);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para eliminar un producto
  deleteProducts = async (id) => {
    try {
      let product = await productsModel.findByIdAndDelete(id);
      return product;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener los productos filtrados por categoría
  filteredProducts = async (category) => {
    try {
      let products = await productsModel.paginate(
        { category: category },
        { limit: 10, page: 1 }
      );
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener los productos ordenados por precio
  orderedProducts = async (order) => {
    try {
      let products = await productsModel.aggregate([
        { $sort: { price: parseInt(order) } },
      ]);
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener los productos paginados
  paginatedProducts = async (page) => {
    try {
      let products = await productsModel.paginate(
        {},
        { limit: 10, page: parseInt(page) }
      );
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener los productos ordenados por fecha de creación
  async sortedProducts() {
    try {
      const products = await productsModel.aggregate([
        { $sort: { createdAt: -1 } },
      ]);
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
