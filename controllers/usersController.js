import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";

// @desc    Get all users, or a single user by email
// @route   GET /api/v1/products-scanner/users
// @access  Public
export const getUsers = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const users = await User.find({ email });

  if (!users || users.length === 0) {
    return next(new Error("No users found."));
  }
  res.status(200).json({
    success: true,
    data: users,
  });
});

// @desc    Get a single user
// @route   GET /api/v1/products-scanner/users/:id
// @access  Public
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Error(`User with ID ${req.params.id} not found`));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update a single user
// @route   PUT /api/v1/bank/users/:id
// @access  Public
//!Also check: how do I update email and password?
export const updateUser = asyncHandler(async (req, res, next) => {
  const { dietPreferences, environmentPreferences, nutritionPreferences } =
    req.body;
  const updateObj = {};

  if (dietPreferences !== undefined) {
    updateObj.dietPreferences = dietPreferences;
  }
  if (environmentPreferences !== undefined) {
    updateObj.environmentPreferences = environmentPreferences;
  }
  if (nutritionPreferences !== undefined) {
    updateObj.nutritionPreferences = nutritionPreferences;
  }
  const user = await User.findByIdAndUpdate(req.params.id, updateObj, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new Error(`User with ID ${req.params.id} not found`));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    DELETE a single user
// @route   DELETE /api/v1/bank/users/:id
// @access  Public
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Error(`User with ID ${req.params.id} not found`));
  }
  user.deleteOne();
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Delete all users
// @route   DELETE /api/v1/users/
//! @access  Private - development only
export const deleteUsers = asyncHandler(async (req, res, next) => {
  await User.deleteMany(deleteObj);
  res.status(200).json({
    success: true,
    data: {},
  });
});

export { getUser, getUsers, updateUser, deleteUser, deleteUsers };
