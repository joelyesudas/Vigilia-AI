import { motion } from "framer-motion";
import {
  Shield,
  BrainCircuit,
  Database,
  Server,
  CheckCircle2,
} from "lucide-react";

const statusItems = [
  {
    title: "Detection Engine",
    value: "Online",
    icon: Shield,
    color: "text-green-400",
  },
  {
    title: "AI Models",
    value: "Ready",
    icon: BrainCircuit,
    color: "text-cyan-400",
  },
  {
    title: "Threat Database",
    value: "Updated",
    icon: Database,
    color: "text-purple-400",
  },
  {
    title: "Processing Nodes",
    value: "Healthy",
    icon: Server,
    color: "text-emerald-400",
  },
];

export default function EngineStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-cyan-500/20 bg-[#0d1724] p-6 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            AI Engine Status
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Live health of Vigilia AI services
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-xs font-medium text-green-400">
            Operational
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {statusItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between rounded-2xl border border-gray-800 bg-[#101b2a] p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Service Status
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="font-medium text-green-400">
                  {item.value}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">
            Last Threat Intelligence Sync
          </span>

          <span className="font-medium text-cyan-400">
            2 min ago
          </span>
        </div>
      </div>
    </motion.div>
  );
}