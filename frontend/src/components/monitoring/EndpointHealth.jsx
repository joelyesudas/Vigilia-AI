import {
  Monitor,
  Server,
  Shield,
  AlertTriangle,
} from "lucide-react";

import { useMonitoring } from "../../context/MonitoringContext";

const getStatusColor = (status) => {
  switch (status) {
    case "Healthy":
      return "text-green-400";
    case "Warning":
      return "text-yellow-400";
    case "Critical":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

const getIcon = (type) => {
  switch (type) {
    case "Windows":
      return <Monitor size={18} />;
    case "Linux":
      return <Server size={18} />;
    case "Docker":
      return <Shield size={18} />;
    default:
      return <AlertTriangle size={18} />;
  }
};

export default function EndpointHealth() {
  const { endpoints, loading } = useMonitoring();

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl mt-8 p-8 text-white">
        Loading endpoint health...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl mt-8">
      <div className="px-6 py-5 border-b border-slate-800">
        <h2 className="text-xl font-semibold text-white">
          🖥 Endpoint Health
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Current status of monitored systems and endpoints.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-gray-400 text-sm border-b border-slate-800">
            <tr>
              <th className="text-left px-6 py-4">Endpoint</th>
              <th className="text-left">Status</th>
              <th className="text-left">CPU</th>
              <th className="text-left">RAM</th>
              <th className="text-left">Threats</th>
              <th className="text-left">Last Seen</th>
            </tr>
          </thead>

          <tbody>
            {endpoints.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-400"
                >
                  No endpoint data available.
                </td>
              </tr>
            ) : (
              endpoints.map((endpoint) => (
                <tr
                  key={endpoint.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getIcon(endpoint.os)}

                      <div>
                        <p className="font-medium text-white">
                          {endpoint.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          {endpoint.os}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td
                    className={`font-medium ${getStatusColor(
                      endpoint.status
                    )}`}
                  >
                    {endpoint.status}
                  </td>

                  <td className="text-white">
                    {endpoint.cpu}%
                  </td>

                  <td className="text-white">
                    {endpoint.ram}%
                  </td>

                  <td className="text-white">
                    {endpoint.threats}
                  </td>

                  <td className="text-gray-400">
                    {endpoint.lastSeen}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}