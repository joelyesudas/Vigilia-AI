import { useState } from "react";
import { motion } from "framer-motion";
import { showInfo, showSuccess } from "../../utils/toast";

import UploadDropZone from "./UploadDropZone";
import EngineStatus from "./EngineStatus";
import SupportedFormats from "./SupportedFormats";
import PipelineCard from "./PipelineCard";
import ProcessingPanel from "./ProcessingPanel";
import AnalysisResults from "./AnalysisResults";

export default function UploadZone() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [processing, setProcessing] = useState(false);

  const [completed, setCompleted] = useState(false);

  const [progress, setProgress] = useState(0);

  const [currentStep, setCurrentStep] = useState(0);

  const startAnalysis = () => {
  if (!selectedFile) {
    showInfo("Please select a log file first.");
    return;
  }

  showInfo("🤖 Vigilia AI has started analyzing the uploaded log...");

  setProcessing(true);
  setCompleted(false);
  setProgress(0);
  setCurrentStep(0);

  let value = 0;
  let stage = 0;

  const timer = setInterval(() => {
    value += 2;

    setProgress(value);

    if (value % 18 === 0 && stage < 5) {
      stage++;
      setCurrentStep(stage);

      switch (stage) {
        case 1:
          showInfo("📂 Parsing uploaded logs...");
          break;

        case 2:
          showInfo("🛡 Detecting security threats...");
          break;

        case 3:
          showInfo("🎯 Mapping MITRE ATT&CK techniques...");
          break;

        case 4:
          showInfo("📊 Calculating security risk...");
          break;

        case 5:
          showInfo("🤖 Generating AI investigation report...");
          break;

        default:
          break;
      }
    }

    if (value >= 100) {
      clearInterval(timer);

      setProcessing(false);
      setCompleted(true);
      setProgress(100);
      setCurrentStep(5);

      showSuccess("✅ Threat analysis completed successfully.");
    }
  }, 80);
};
  return (
    <div className="min-h-screen bg-[#071018] text-white p-8">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-5xl font-bold">
          AI Security Analysis Center
        </h1>

        <p className="mt-4 max-w-3xl text-gray-400 leading-8">
          Upload Windows Event Logs, Sysmon, Linux Authentication,
          Apache, Firewall or JSON security logs.
          Vigilia AI automatically parses events,
          detects threats, maps MITRE ATT&CK techniques
          and generates an AI-powered investigation report.
        </p>
      </motion.div>

      {/* Top Grid */}

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-8">

          <UploadDropZone
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            onAnalyze={startAnalysis}
            processing={processing}
          />

        </div>

        <div className="col-span-4">

          <EngineStatus />

        </div>

      </div>

      {/* Middle Grid */}

      <div className="grid grid-cols-12 gap-6 mt-6">

        <div className="col-span-4">

          <SupportedFormats />

        </div>

        <div className="col-span-8">

          <PipelineCard
            currentStep={currentStep}
            processing={processing}
          />

        </div>

      </div>

      {/* Continue in Part 2 */}
            {/* Processing */}

      <div className="mt-6">

        <ProcessingPanel
          processing={processing}
          progress={progress}
          currentStep={currentStep}
        />

      </div>

      {/* Results */}

      <div className="mt-6">

        <AnalysisResults
          completed={completed}
        />

      </div>

      {/* Footer */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .4 }}
        className="mt-10 rounded-3xl border border-cyan-500/10 bg-[#0d1724] p-6"
      >

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div>

            <h2 className="text-2xl font-bold">

              Ready for Investigation

            </h2>

            <p className="mt-2 text-gray-400 max-w-2xl">

              Upload a security log to begin automated analysis,
              detect threats, map MITRE ATT&CK techniques,
              and launch a full AI-powered investigation.

            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() => {
  setSelectedFile(null);
  setCompleted(false);
  setProcessing(false);
  setProgress(0);
  setCurrentStep(0);

  showInfo("Analysis has been reset.");
}}
              className="rounded-xl border border-gray-700 px-6 py-3 hover:border-cyan-400 transition"
            >

              Reset

            </button>

            <button
              disabled={!selectedFile || processing}
              onClick={startAnalysis}
              className="rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 px-6 py-3 font-semibold transition"
            >

              {processing
                ? "Analyzing..."
                : "Analyze Again"}

            </button>

          </div>

        </div>

      </motion.div>

    </div>

  );

}