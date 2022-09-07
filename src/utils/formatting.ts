export const createWeightFormatter =
  (weightUnit: "pounds" | "kilograms") => (word: string) =>
    `${word} (${weightUnit === "pounds" ? "lbs" : "kg"})`;

export const createMeasurementFormatter =
  (measurementUnit: "metric" | "imperial") => (word: string) =>
    `${word} (${measurementUnit === "metric" ? "cm" : "in"})`;
