import mongoose from "mongoose";

const ParsedLogSchema = new mongoose.Schema(
  {
    raw: String,
    timestamp: String,
    severity: String,
    username: String,
    ip: String,
  },
  { _id: false }
);

const MitreSchema = new mongoose.Schema(
  {
    techniqueId: String,
    technique: String,
    tactic: String,
    description: String,
  },
  { _id: false }
);

const ThreatSchema = new mongoose.Schema(
  {
    id: Number,
    type: String,
    severity: String,
    confidence: Number,
    recommendation: String,
    timestamp: String,
    ip: String,
    username: String,
    matchedLog: String,
    mitre: MitreSchema,
  },
  { _id: false }
);

const SummarySchema = new mongoose.Schema(
  {
    securityScore: Number,
    riskLevel: String,
    totalEvents: Number,
    totalThreats: Number,
    criticalThreats: Number,
    highThreats: Number,
    mediumThreats: Number,
    lowThreats: Number,
  },
  { _id: false }
);

const AnalysisSchema = new mongoose.Schema(
  {
    summary: SummarySchema,
    parsedLogs: [ParsedLogSchema],
    threats: [ThreatSchema],
  },
  { _id: false }
);

const LogSchema = new mongoose.Schema(
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

    status: {
      type: String,
      default: "Uploaded",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    analysis: AnalysisSchema,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Log", LogSchema);