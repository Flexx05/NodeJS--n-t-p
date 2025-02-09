import Joi from "joi";
import Product from "../models/product";

const productSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required().min(3).trim(),
  price: Joi.number().required().positive(),
});

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    return res
      .status(200)
      .json({ message: "Xóa sản phẩm thành công", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
      convert: false,
    });
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    return res
      .status(200)
      .json({ message: "Cập nhật sản phẩm thành công", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
      convert: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    const product = await Product.create(value);
    return res
      .status(201)
      .json({ message: "Thêm sản phẩm thành công", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
