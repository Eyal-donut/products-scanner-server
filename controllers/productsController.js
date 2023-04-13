import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";
import ErrorResponse from "../utils/ErrorResponse.js";


// @desc    Get a single product
// @route   GET /api/v1/products-scanner/products/:barcode
// @access  Public
export const getProduct = asyncHandler(async (req, res, next) => {
  const filter = { code: Number(req.params.barcode) };
  const product = await Product.findOne(filter);
  if (!product) {
    return next(
      new ErrorResponse(`product with barcode number ${req.params.barcode} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Get all products
// @route   GET /api/v1/products-scanner/products
// @access Private
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  if (!products) {
    return next(new ErrorResponse(`No products found`, 404));
  }
  res.status(200).json({
    success: true,
    data: products,
  });
});

// @desc    Create a product
// @route   POST /api/v1/products-scanner/products
// @access  Public
export const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  if (!product) {
    return next(new ErrorResponse("Error, product not created!"));
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create many products
// @route   POST /api/v1/products-scanner/products/many
// @access  Private
export const createProducts = asyncHandler(async (req, res, next) => {
  const productsArray = await Product.insertMany(req.body);
  if (!productsArray) {
    return next(new ErrorResponse("Error, products not created!"));
  }
  res.status(200).json({
    success: true,
    data: productsArray,
  });
});

// @desc    DELETE a single product
// @route   DELETE /api/v1/products-scanner/products/:barcode
// @access  Private
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.barcode);
  if (!product) {
    return next(
      new ErrorResponse(`product with barcode number ${req.params.barcode} not found`, 404)
    );
  }
  product.deleteOne();
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Delete all products
// @route   DELETE /api/v1/products-scanner/products
// @access  Private
export const deleteProducts = asyncHandler(async (req, res, next) => {
  await Product.deleteMany();
  res.status(200).json({
    success: true,
    data: {},
  });
});
