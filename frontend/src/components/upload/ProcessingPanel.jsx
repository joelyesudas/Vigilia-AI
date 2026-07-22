import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Circle,
  BrainCircuit,
} from "lucide-react";

const stages = [
  "Uploading Security Log",
  "Parsing Events",
  "Detecting Threats",
  "MITRE ATT&CK Mapping",
  "Risk Assessment",
  "Generating AI Report",
];

export default function ProcessingPanel({
  processing = false,
  progress = 0,
  currentStep = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cyan-500/20 bg-[#0d1724] p-6 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <BrainCircuit className="text-cyan-400" />

        <div>
          <h2 className="text-xl font-bold text-white">
            Live AI Processing
          </h2>

          <p className="text-sm text-gray-400">
            Vigilia AI analysis engine
          </p>
        </div>
      </div>

      {/* Progress */}

      <div className="mb-6">

        <div className="flex justify-between text-sm mb-2">

          <span className="text-gray-400">
            Overall Progress
          </span>

          <span className="text-cyan-400 font-semibold">
            {progress}%
          </span>

        </div>

        <div className="h-3 rounded-full bg-[#08111b] overflow-hidden">

          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: .4,
            }}
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
          />

        </div>

      </div>

      {/* Processing Stages */}

      <div className="space-y-4">

        {stages.map((stage, index) => {

          const complete = index < currentStep;

          const active =
            processing &&
            index === currentStep;

          return (

            <motion.div

              key={stage}

              layout

              className="flex items-center justify-between rounded-2xl border border-gray-800 bg-[#101b2a] px-5 py-4"

            >

              <div className="flex items-center gap-4">

                {complete ? (

                  <CheckCircle2 className="text-green-400"/>

                ) : active ? (

                  <Loader2 className="animate-spin text-cyan-400"/>

                ) : (

                  <Circle className="text-gray-600"/>

                )}

                <span className="font-medium">

                  {stage}

                </span>

              </div>

              <span

                className={`text-sm font-medium

                ${
                  complete

                  ? "text-green-400"

                  : active

                  ? "text-cyan-400"

                  : "text-gray-500"

                }

                `}

              >

                {

                  complete

                  ? "Completed"

                  : active

                  ? "Running"

                  : "Waiting"

                }

              </span>

            </motion.div>

          );

        })}

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-4">

        <div className="flex items-center justify-between">

          <span className="text-gray-300">

            AI Confidence

          </span>

          <span className="font-bold text-cyan-400">

            98.7%

          </span>

        </div>

      </div>

    </motion.div>
  );
}