<template>
  <div class="h-full overflow-hidden" ref="parent">
    <BarChart
      :data="data"
      :categories="categories"
      :height="parentHeight"
      :xFormatter="xFormatter"
      :yFormatter="yFormatter"
      xLabel="Alter"
      yLabel="Durchschnittswert"
      class="h-full p-4"
      :yAxis="columns"
      :valueLabel="valueLabel"
      xAxis="age"
      :xNumTicks="5"
    />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  name: "Gründe fürs Heiraten (nach Alter)",
});

useHead({
  title: "Gründe fürs Heiraten (nach Alter)",
});
import type { ValueLabel } from "~~/node_modules/vue-chrts/dist/components/BarChart/BarChart.d.ts";
import responseParser from "../helpers/responseParser";
import type { RawResponse, Response } from "../types/response.type";

type Entry = {
  security: number;
  law: number;
  love: number;
  family: number;
  social: number;
  age: string;
  count: number;
};

const columns: ["security", "law", "love", "family", "social"] = [
  "security",
  "law",
  "love",
  "family",
  "social",
];

const parent = ref<HTMLDivElement>();
const parentHeight = computed(() => {
  return (parent.value?.offsetHeight ?? 0) * 0.9;
});

const responses = ref<Response[]>([]);
const data = ref<Entry[]>([]);

const valueLabel = ref<ValueLabel>({
  label: (d: { x: number; y: number; itemIndex: number }, index: number) => {
    let key = Object.keys(categories)[d.itemIndex] as (typeof columns)[number];
    console.log(key);
    let currentEntry = data.value[d.x];
    return (
      ((key && currentEntry ? currentEntry[key] : 0) ?? 0).toFixed(0) + "%"
    );
  },
  backgroundColor: "var(--color-base-100)",
  color: "var(--color-base-content)",
  labelFontSize: 16,
  labelSpacing: 1,
});

const categories = {
  security: {
    name: "Sicherheit / Verlässlichkeit",
    color: "var(--color-primary)",
  },
  law: {
    name: "Steuerliche Vorteile / Rechtliche Absicherung",
    color: "var(--color-secondary)",
  },
  love: {
    name: "Liebe / Romantik / Symbol der Zusammengehörigkeit",
    color: "var(--color-accent)",
  },
  family: {
    name: "Familiäre Erwartungen / Tradition",
    color: "var(--color-info)",
  },
  social: {
    name: "Gesellschaftliche Anerkennung",
    color: "var(--color-warning)",
  },
};

const xFormatter = (i: number) => data.value[i]?.age ?? "-";
const yFormatter = (i: number) => i.toString() ?? "-";

import rawData from "~/assets/data.json";
rawData.forEach((raw) => {
  responses.value.push(responseParser(raw as RawResponse));
});
let ageResponses = {
  "unter 18": [] as string[][],
  "18-24 Jahre": [] as string[][],
  "25-34 Jahre": [] as string[][],
  "35-44 Jahre": [] as string[][],
  "45-54 Jahre": [] as string[][],
  "55-64 Jahre": [] as string[][],
  "65-74 Jahre": [] as string[][],
  "75 Jahre und älter": [] as string[][],
};
responses.value.forEach((entry) => {
  ageResponses[entry.age].push(entry.pro);
});
for (const key in ageResponses) {
  let ageRange = ageResponses[key as keyof typeof ageResponses];
  if (ageRange.length > 0) {
    data.value.push({
      age: `${key} (${ageRange.length} Antwort${ageRange.length > 1 ? "en" : ""})`,
      security:
        (ageRange.reduce(
          (a: number, b) =>
            b.includes("Sicherheit / Verlässlichkeit") ? a + 1 : a,
          0,
        ) /
          ageRange.length) *
        100,
      law:
        (ageRange.reduce(
          (a: number, b) =>
            b.includes("Steuerliche Vorteile / Rechtliche Absicherung")
              ? a + 1
              : a,
          0,
        ) /
          ageRange.length) *
        100,
      love:
        (ageRange.reduce(
          (a: number, b) =>
            b.includes("Liebe / Romantik / Symbol der Zusammengehörigkeit")
              ? a + 1
              : a,
          0,
        ) /
          ageRange.length) *
        100,
      family:
        (ageRange.reduce(
          (a: number, b) =>
            b.includes("Familiäre Erwartungen / Tradition") ? a + 1 : a,
          0,
        ) /
          ageRange.length) *
        100,
      social:
        (ageRange.reduce(
          (a: number, b) =>
            b.includes("Gesellschaftliche Anerkennung") ? a + 1 : a,
          0,
        ) /
          ageRange.length) *
        100,

      count: ageRange.length,
    });
  }
}
</script>

<style>
html,
body,
#__nuxt {
  height: 100%;
}
svg {
  overflow: visible;
}
</style>
