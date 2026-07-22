import { motion } from "framer-motion";
import {
  Monitor,
  Shield,
  FileJson,
  Globe,
  Server,
  Database,
  Lock,
  Cloud,
} from "lucide-react";

const formats = [
  {
    name: "Windows Event Logs",
    icon: Monitor,
    color: "text-blue-400",
    status: "Supported",
  },
  {
    name: "Linux Authentication",
    icon: Lock,
    color: "text-green-400",
    status: "Supported",
  },
  {
    name: "Sysmon Logs",
    icon: Shield,
    color: "text-cyan-400",
    status: "Supported",
  },
  {
    name: "Apache Logs",
    icon: Globe,
    color: "text-orange-400",
    status: "Supported",
  },
  {
    name: "Nginx Logs",
    icon: Server,
    color: "text-purple-400",
    status: "Supported",
  },
  {
    name: "JSON Security Logs",
    icon: FileJson,
    color: "text-yellow-400",
    status: "Supported",
  },
  {
    name: "CloudTrail",
    icon: Cloud,
    color: "text-gray-400",
    status: "Coming Soon",
  },
  {
    name: "Microsoft Defender",
    icon: Database,
    color: "text-gray-400",
    status: "Coming Soon",
  },
];

export default function SupportedFormats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cyan-500/20 bg-[#0d1724] p-6 shadow-xl"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Supported Log Sources
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          Upload logs from multiple operating systems,
          servers and security platforms.
        </p>
      </div>

      <div className="space-y-3">
        {formats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                scale: 1.02,
                x: 5,
              }}
              className="flex items-center justify-between rounded-2xl border border-gray-800 bg-[#101b2a] p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-400">
                    Security Log Source
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  item.status === "Supported"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {item.status}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}