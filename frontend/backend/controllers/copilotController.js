import { askGemini } from "../services/copilot/geminiService.js";
import Log from "../models/Log.js";

export const chatWithCopilot = async (req, res) => {
  try {
    const { message } = req.body;

    const latestLog = await Log.findOne().sort({
      createdAt: -1,
    });

    if (!latestLog) {
      return res.status(404).json({
        success: false,
        message: "No analyzed logs found.",
      });
    }

    const analysis = latestLog.analysis;

    const prompt = `
You are Vigilia AI,
an Enterprise SOC Security Copilot.

You assist Security Operations Center (SOC) analysts by analyzing logs,
explaining threats, recommending mitigations,
mapping attacks to MITRE ATT&CK,
and generating professional investigation reports.

==================================================

SECURITY SUMMARY

${JSON.stringify(analysis.summary, null, 2)}

==================================================

DETECTED THREATS

${JSON.stringify(analysis.threats, null, 2)}

==================================================

PARSED LOGS

${JSON.stringify(analysis.parsedLogs, null, 2)}

==================================================

USER REQUEST

${message}

==================================================

INSTRUCTIONS

If the user asks for:

• Executive Summary
• Investigation Report
• Incident Report
• Threat Summary
• Security Assessment
• Recommendations

then ALWAYS respond using this format:

# Executive Summary

Briefly summarize the investigation.

# Key Findings

- Bullet Point 1
- Bullet Point 2
- Bullet Point 3

# Risk Assessment

Explain why the overall risk is
SAFE / LOW / MEDIUM / HIGH / CRITICAL.

# MITRE ATT&CK

Mention the mapped techniques whenever available.

# Recommended Actions

Provide 5 practical SOC recommendations.

# Conclusion

Give a professional conclusion suitable for management.

==================================================

Otherwise,

answer the user's question professionally as an experienced SOC Analyst.

Always:

- Use Markdown.
- Keep answers concise.
- Explain technical concepts clearly.
- Never invent data.
- Base answers only on the supplied analysis.
`;

    const response = await askGemini(prompt);

    res.json({
      success: true,
      response,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};