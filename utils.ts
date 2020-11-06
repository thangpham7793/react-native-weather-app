import { UnitSystem } from "./types";

export default {
  processTemp(temp: number, unitSystem: UnitSystem): string {
    return unitSystem === "metric"
      ? temp.toFixed(1)
      : ((temp * 9) / 5 + 32).toFixed(1);
  },

  processSpeed(speedInMps: number, unitSystem: UnitSystem): string {
    return unitSystem === "metric"
      ? speedInMps.toFixed(1)
      : (speedInMps * 2.237).toFixed(1);
  },
};
