import { describe, expect, it } from "vitest";
import { articles } from "@/lib/articles";
import {
  articleCharts,
  ironIntake,
  bodyWater,
  intakeSources,
  treatmentRadar,
} from "@/lib/water-data";

describe("Water chart data", () => {
  it("computes daily iron intake as concentration x 2 liters", () => {
    const levels = [0.3, 1, 2, 5, 10];
    expect(ironIntake.data.map((d) => d.value)).toEqual(levels.map((l) => l * 2));
  });
  it("keeps donut shares at 100%", () => {
    for (const c of [bodyWater, intakeSources])
      expect(c.data.reduce((n, d) => n + d.value, 0)).toBe(100);
  });
  it("gives every radar series one score per axis", () => {
    for (const s of treatmentRadar.series)
      expect(s.values).toHaveLength(treatmentRadar.axes.length);
  });
  it("has charts, summary points and a product note for every article", () => {
    for (const a of articles) {
      expect(articleCharts[a.slug]?.length).toBeGreaterThanOrEqual(2);
      expect(a.summary.length).toBeGreaterThanOrEqual(3);
      expect(a.facts).toHaveLength(3);
      expect(a.asoneNote.text.length).toBeGreaterThan(0);
    }
  });
});

import { waterTypes, waterTypeGroups } from "@/lib/water-types";
describe("Water types", () => {
  it("has unique ids and a valid group for every type", () => {
    expect(new Set(waterTypes.map((w) => w.id)).size).toBe(waterTypes.length);
    for (const w of waterTypes) expect(waterTypeGroups).toContain(w.group);
  });
  it("requires well, rain and tap water to be treated before drinking", () => {
    for (const id of ["sumur", "hujan", "pdam"])
      expect(waterTypes.find((w) => w.id === id)?.readiness).toBe("treat");
  });
});
