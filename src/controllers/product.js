import Joi from "joi";
import Product from "../models/product";

const productSchema = Joi.object({
  id: Joi.number().integer().positive().messages({
    "number.base": "Id sản phẩm phải là số",
    "number.positive": "Id sản phẩm phải là số dương",
  }),
  name: Joi.string().min(3).trim().required().messages({
    "string.base": "Tên sản phẩm phải là chuỗi",
    "string.trim": "Tên sản phẩm không được để trống",
    "string.min": "Tên sản phẩm phải có ít nhất 3 ký tự",
    "any.required": "Tên sản phẩm bắt buộc phải nhập",
  }),
  price: Joi.number().required().positive().messages({
    "number.base": "Giá sản phẩm phải là số",
    "number.positive": "Giá sản phẩm phải là số dương",
    "any.required": "Giá sản phẩm bắt buộc nhập",
  }),
});

// Get all
export const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get one
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

// Delete
export const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Update
export const updateProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
      convert: false,
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json(errors);
    }
    const product = Product.findByIdAndUpdate(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Create
export const createProduct = async (req, res) => {
  try {
    const { error, value } = productSchema(req.body, {
      abortEarly: false,
      convert: false,
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json(errors);
    }
    const product = Product.create(value);
    return res.status(201).json({
      message: "Thêm sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
