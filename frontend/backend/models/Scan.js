import mongoose from "mongoose";

const ThreatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low",
    },

    confidence: {
      type: Number,
      default: 0,
    },

    mitreTechnique: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const ScanSchema = new mongoose.Schema(
  {
    scanId: {
      type: String,
      required: true,
      unique: true,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    finishedAt: Date,

    duration: Number,

    status: {
      type: String,
      enum: ["Running", "Completed", "Failed"],
      default: "Running",
    },

    scanType: {
      type: String,
      default: "Automatic",
    },

    securityScore: {
      type: Number,
      default: 100,
    },

    riskLevel: {
      type: String,
      enum: ["Safe", "Low", "Medium", "High", "Critical"],
      default: "Safe",
    },

    system: {
      cpu: Number,
      memory: Number,
      disk: Number,
      uptime: Number,
      os: String,
      hostname: String,
      platform: String,
      kernel: String,
    },

    processes: {
      total: Number,
      suspicious: Number,
    },

    network: {
      activeConnections: Number,
      interfaces: Number,
      openPorts: Number,
    },

    threats: [ThreatSchema],

    summary: {
      totalThreats: {
        type: Number,
        default: 0,
      },

      criticalThreats: {
        type: Number,
        default: 0,
      },

      warnings: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Scan", ScanSchema);