import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Shield,
  Target,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const steps = [
  {
    title: "Upload Log",
    description: "Receive security log file",
    icon: Upload,
  },
  {
    title: "Parse Logs",
    description: "Extract security events",
    icon: FileText,
  },
  {
    title: "Threat Detection",
    description: "AI detects suspicious activity",
    icon: Shield,
  },
  {
    title: "MITRE Mapping",
    description: "Map ATT&CK techniques",
    icon: Target,
  },
  {
    title: "Risk Analysis",
    description: "Calculate severity & score",
    icon: AlertTriangle,
  },
  {
    title: "AI Summary",
    description: "Generate investigation report",
    icon: Sparkles,
  },
];

export default function PipelineCard({
  currentStep = 0,
  processing = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-cyan-500/20 bg-[#0d1724] p-6 shadow-xl"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          AI Analysis Pipeline
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Every uploaded log passes through multiple AI-powered
          security analysis stages.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed = index < currentStep;
          const active = processing && index === currentStep;

          return (
            <div key={step.title}>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center justify-between rounded-2xl border border-gray-800 bg-[#101b2a] p-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      completed
                        ? "bg-green-500/20"
                        : active
                        ? "bg-cyan-500/20"
                        : "bg-gray-800"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        completed
                          ? "text-green-400"
                          : active
                          ? "text-cyan-400"
                          : "text-gray-500"
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div>
                  {completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                  ) : active ? (
                    <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
                  ) : (
                    <div className="h-3 w-3 rounded-full bg-gray-600" />
                  )}
                </div>
              </motion.div>

              {index !== steps.length - 1 && (
                <div className="ml-6 h-6 w-px bg-gradient-to-b from-cyan-500/60 to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}