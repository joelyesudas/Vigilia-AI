import { mitreDatabase } from "../data/mitreDatabase.js";

export const mapMitreTechniques = (threats) => {
  return threats.map((threat) => {
    const mitre = mitreDatabase.find(
      (entry) => entry.threat === threat.type
    );

    return {
      ...threat,

      mitre: mitre
        ? {
            techniqueId: mitre.techniqueId,
            technique: mitre.technique,
            tactic: mitre.tactic,
            description: mitre.description,
          }
        : null,
    };
  });
};