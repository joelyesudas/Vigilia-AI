import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "SOC Analyst",
    },

    profileImage: {
      type: String,
      default: "",
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);