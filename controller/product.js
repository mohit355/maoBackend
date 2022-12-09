const { Op } = require("sequelize");
const db = require("../db/models/index");

exports.getProductById = async (req, res) => {
  try {
    const products = await db.Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (products) {
      res.status(200).send({ auth: true, data: products });
    } else {
      res.status(404).send({ auth: true, data: [] });
    }
  } catch (error) {
    console.log("get all product error ", error);
    res.status(400).send({ error });
  }
};
exports.getAllProduct = async (req, res) => {
  try {
    const { productType = "", name = "",category="" } = req.query;
    console.log("HELLLLLL ", req.query);
    let query={}
    if(productType){
      query.productType=productType
    }
    if(category){
      query.productCategory=category
    }
    let products = await db.Product.findAll({
      where: {
        ...query,
        productName: { [Op.iLike]: `%${name}%` }
      },
    });

    if (products) {
      products=JSON.parse(JSON.stringify(products));
      console.log('productsproducts ',products)
      let availableCategory=[]
      let categoryWiseProducts={}
      products.forEach(product => {
        let category=product.productCategory;
        if(availableCategory.includes(category)){
            categoryWiseProducts[category]=[...categoryWiseProducts[category],product];
        }
        else{
            categoryWiseProducts[category]=[product];
        }
      });
      res.status(200).send({ auth: true, data: categoryWiseProducts });
      // res.status(200).send({ auth: true, data: categoryWiseProducts });

    } else {
      res.status(404).send({ auth: true, data: [] });
    }
  } catch (error) {
    console.log("get all product error ", error);
    res.status(400).send({ error });
  }
};

exports.getAllAdminViewProduct = async (req, res) => {
  try {
    const { productType = "", name = "",category="" } = req.query;
    let query={}
    if(productType){
      query.productType=productType
    }
    if(category){
      query.productCategory=category
    }
    const products = await db.Product.findAll({
      where: {
        ...query,
        productName: { [Op.iLike]: `%${name}%` },

      },
    });

    if (products) {
      res.status(200).send({ auth: true, data: products });
    } else {
      res.status(404).send({ auth: true, data: [] });
    }
  } catch (error) {
    console.log("get all product error ", error);
    res.status(400).send({ error });
  }
};

exports.getProductByCategory = async (req, res) => {
  console.log("ALL PRODUCTS calls ");

  try {
    const allProducts = await db.Product.findAll({
      attributes: ["id", "productName", "productCategory"],
      group: ["productCategory", "id"],
    });
    console.log("ALL PRODUCTS ", allProducts);
    res.status(200).send({ auth: true, data: allProducts });
  } catch (error) {
    console.log("error ", error);
    res.status(200).send({ auth: true, data: "allProducts" });
  }
};

exports.getProductByType = async () => {};

// only accessible by admin
exports.addProduct = async (req, res) => {
  try {
    const newProduct = await db.Product.create({
      ...req.body,
    });
    await newProduct.save();
    res.status(200).send({ msg: "Product saved", data: newProduct });
  } catch (error) {
    console.log("product add error ", error);
    res.status(400).send({ error });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await db.Product.update(
      {
        ...req.body,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).send({ msg: "Product updated" });
  } catch (error) {
    console.log("Product update error ", error);
    res.status(400).send({ error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await db.Product.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({ msg: "Product deleted" });
  } catch (error) {
    console.log("Product update error ", error);
    res.status(400).send({ error });
  }
};
