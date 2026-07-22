import { toast } from "react-toastify";

export const showSuccess = (message) =>
  toast.success(message, {
    icon: "✅",
  });

export const showError = (message) =>
  toast.error(message, {
    icon: "❌",
  });

export const showWarning = (message) =>
  toast.warning(message, {
    icon: "⚠️",
  });

export const showInfo = (message) =>
  toast.info(message, {
    icon: "🤖",
  });