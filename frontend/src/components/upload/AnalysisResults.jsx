import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Target,
  BrainCircuit,
  Search,
  Bot,
  FileText,
  ChevronRight,
} from "lucide-react";

const mitreTechniques = [
  "T1110",
  "T1046",
  "T1059",
  "T1078",
];

export default function AnalysisResults({
  completed = false,
}) {

  if (!completed) return null;

  return (

    <motion.div

      initial={{ opacity: 0, y: 30 }}

      animate={{ opacity: 1, y: 0 }}

      className="rounded-3xl border border-cyan-500/20 bg-[#0d1724] p-6 shadow-xl"

    >

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            AI Investigation Summary

          </h2>

          <p className="text-gray-400 mt-2">

            Vigilia AI completed the analysis successfully.

          </p>

        </div>

        <div className="rounded-full bg-green-500/10 px-4 py-2">

          <span className="text-green-400 font-semibold">

            Analysis Complete

          </span>

        </div>

      </div>

      {/* Top Metrics */}

      <div className="grid grid-cols-4 gap-5">

        <MetricCard
          icon={ShieldCheck}
          title="Security Score"
          value="92 / 100"
          color="text-cyan-400"
        />

        <MetricCard
          icon={AlertTriangle}
          title="Threats Found"
          value="4"
          color="text-red-400"
        />

        <MetricCard
          icon={Target}
          title="Risk Level"
          value="HIGH"
          color="text-orange-400"
        />

        <MetricCard
          icon={BrainCircuit}
          title="AI Confidence"
          value="98.7%"
          color="text-green-400"
        />

      </div>

      {/* MITRE */}

      <div className="mt-8 rounded-2xl border border-gray-800 bg-[#101b2a] p-5">

        <h3 className="font-semibold text-lg">

          MITRE ATT&CK Techniques

        </h3>

        <div className="flex flex-wrap gap-3 mt-5">

          {mitreTechniques.map((item) => (

            <div

              key={item}

              className="rounded-xl bg-cyan-500/10 px-4 py-2 text-cyan-300"

            >

              {item}

            </div>

          ))}

        </div>

      </div>

      {/* AI Summary */}

      <div className="mt-8 rounded-2xl border border-gray-800 bg-[#101b2a] p-6">

        <h3 className="font-semibold text-lg mb-4">

          AI Summary

        </h3>

        <p className="text-gray-300 leading-8">

          Vigilia AI detected multiple suspicious login attempts
          followed by internal network scanning activity.
          The attack pattern closely matches brute-force
          authentication attempts combined with lateral
          reconnaissance techniques. Immediate investigation
          is recommended.

        </p>

      </div>

      {/* Actions */}

      <div className="grid grid-cols-3 gap-5 mt-8">

        <ActionButton

          icon={Search}

          title="Open Investigation"

          subtitle="View complete timeline"

        />

        <ActionButton

          icon={Bot}

          title="Ask AI Copilot"

          subtitle="Explain detected threats"

        />

        <ActionButton

          icon={FileText}

          title="Generate Report"

          subtitle="Executive PDF summary"

        />

      </div>

    </motion.div>

  );

}

function MetricCard({

  icon: Icon,

  title,

  value,

  color,

}) {

  return (

    <motion.div

      whileHover={{

        y: -4,

      }}

      className="rounded-2xl border border-gray-800 bg-[#101b2a] p-5"

    >

      <div className="flex items-center justify-between">

        <Icon className={`h-6 w-6 ${color}`} />

        <ChevronRight className="text-gray-600"/>

      </div>

      <p className="text-gray-400 text-sm mt-5">

        {title}

      </p>

      <h3 className={`text-3xl font-bold mt-2 ${color}`}>

        {value}

      </h3>

    </motion.div>

  );

}

function ActionButton({

  icon: Icon,

  title,

  subtitle,

}) {

  return (

    <motion.button

      whileHover={{

        scale:1.03,

      }}

      whileTap={{

        scale:.98,

      }}

      className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5 text-left"

    >

      <Icon className="text-cyan-400 mb-5"/>

      <h3 className="font-semibold">

        {title}

      </h3>

      <p className="text-gray-400 text-sm mt-2">

        {subtitle}

      </p>

    </motion.button>

  );

}