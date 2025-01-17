import Joi from "joi";
import Product from "../models/product";

const productSchema = Joi.object({
  id: Joi.number().integer().positive().messages({
    "number.base": "Id phải là số",
    "number.positive": "Id phải là số dương",
  }),
  name: Joi.string().required().trim().min(3).messages({
    "string.base": "Tên sản phẩm là chuỗi",
    "string.min": "Tên tối thiểu có 3 ký tự",
    "string.trim": "Tên sản phẩm không được để trống",
    "any.required": "Tên sản phẩm bắt buộc nhập",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Giá sản phẩm phải là số",
    "number.positive": "Giá sản phẩm phải là số dương",
    "any.required": "Giá sản phẩm bắt buộc nhập",
  }),
});

export const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).json(product);
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
    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
      product,
    });
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
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({ errors });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
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

export const createProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
      convert: false,
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json(errors);
    }
    const product = await Product.create(value);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
