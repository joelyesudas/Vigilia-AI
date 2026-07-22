import { useRef } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function UploadDropZone({
  selectedFile,
  setSelectedFile,
  onAnalyze,
  processing,
}) {
  const fileInputRef = useRef(null);

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleFile = (file) => {
    if (!file) return;
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="rounded-3xl border border-cyan-500/20 bg-[#0d1724] p-10 shadow-xl"
    >
      <div className="flex flex-col items-center text-center">

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        >
          <UploadCloud
            size={70}
            className="text-cyan-400"
          />
        </motion.div>

        <h2 className="text-3xl font-bold mt-6">
          Drag & Drop Security Logs
        </h2>

        <p className="text-gray-400 mt-3 max-w-xl">
          Upload Windows Event Logs, Sysmon,
          Linux Authentication, Apache, Firewall
          or JSON security logs.
        </p>

        <button
          onClick={handleBrowse}
          className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-semibold transition"
        >
          Browse Files
        </button>

        <input
          hidden
          type="file"
          ref={fileInputRef}
          onChange={(e) =>
            handleFile(e.target.files[0])
          }
        />

      </div>

      {selectedFile && (

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-8 rounded-2xl bg-[#101d2e] border border-gray-700 p-5"
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <FileText className="text-cyan-400"/>

              <div>

                <h3 className="font-semibold">

                  {selectedFile.name}

                </h3>

                <p className="text-gray-400 text-sm">

                  {(selectedFile.size / 1024).toFixed(2)} KB

                </p>

              </div>

            </div>

            <CheckCircle2
              className="text-green-400"
            />

          </div>

          <button
            disabled={processing}
            onClick={onAnalyze}
            className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 rounded-xl py-3 font-semibold transition disabled:opacity-60"
          >
            {processing
              ? "Analyzing..."
              : "Analyze Security Log"}
          </button>

        </motion.div>

      )}

    </motion.div>
  );
}