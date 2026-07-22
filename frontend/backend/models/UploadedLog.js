import mongoose from "mongoose";

const uploadedLogSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Uploaded", "Processing", "Completed", "Failed"],
      default: "Uploaded",
    },

    parsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UploadedLog", uploadedLogSchema);