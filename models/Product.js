import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    isFood: {
      type: Boolean,
      required: [true, "Please state if food"],
    },
    imageUrl: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    code: {
      type: Number,
      unique: [true, "Barcode number already exists in the system."],
    },
    company: {
      type: String,
      default: "Missing information",
    },
    category: {
      type: String,
      default: "Missing information",
    },
    ingredients: {
      type: String,
      maxLength: 1000
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    settings: {
      dietPreferences: {
        "Gluten free": {
          type: mongoose.Schema.Types.Mixed,
          default: "Unknown",
        },
        "Lactose free": {
          type: mongoose.Schema.Types.Mixed,
          default: "Unknown",
        },
        Vegan: {
          type: mongoose.Schema.Types.Mixed,
          default: "Unknown",
        },
        Vegetarian: {
          type: mongoose.Schema.Types.Mixed,
          default: "Unknown",
        },
      },
      environmentPreferences: {
        "silicone & Siloxane": {
          type: mongoose.Schema.Types.Mixed,
          default: "Unknown",
        },
        Microplastic: {
          type: mongoose.Schema.Types.Mixed,
          default: "Unknown",
        },
        "Palm oil": {
          type: mongoose.Schema.Types.Mixed,
          default: "Unknown",
        },
      },
      nutritionPreferences: {
        Fat: {
          type: Number,
          default: -1,
        },
        "Saturated fat": {
          type: Number,
          default: -1,
        },
        Cholesterol: {
          type: Number,
          default: -1,
        },
        Carbohydrates: {
          type: Number,
          default: -1,
        },
        Sugar: {
          type: Number,
          default: -1,
        },
        Salt: {
          type: Number,
          default: -1,
        },
      },
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        delete ret.__v;
      },
    },
    toObject: {
      transform(_, ret) {
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("Product", ProductSchema);
