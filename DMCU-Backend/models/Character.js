const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    backstory: {
      en: { type: String, default: "" },
      hi: { type: String, default: "" },
      gu: { type: String, default: "" }
    },
    role: {
      type: String,
      required: true,
      enum: ["hero", "villain"],
      lowercase: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        "hero",
        "tech_support",
        "villain",
        "villain_followers",
        "grey_character",
        "myth_character",
        "vishnu_avatar",
        "mother_devtas_avatar"
      ],
      default: "hero"
    },
    stats: {
      strength: { type: Number, default: 50, min: 0, max: 100 },
      intelligence: { type: Number, default: 50, min: 0, max: 100 },
      energy: { type: Number, default: 50, min: 0, max: 100 },
      combat: { type: Number, default: 50, min: 0, max: 100 }
    },
    quotes: {
      type: [String],
      default: []
    },
    powers: {
      type: [String],
      default: []
    },
    image: {
      type: String,
      required: true
    },
    imageTransparent: {
      type: String,
      default: null
    },
    model3d: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Character", characterSchema);
