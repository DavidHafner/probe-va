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
  name: "Beziehungsstatus (nach Alter)",
});

useHead({
  title: "Beziehungsstatus (nach Alter)",
});
import type { ValueLabel } from "~~/node_modules/vue-chrts/dist/components/BarChart/BarChart.d.ts";
import responseParser from "../helpers/responseParser";
import type { RawResponse, Response } from "../types/response.type";

type Entry = {
  single: number;
  concubine: number;
  married: number;
  divorced: number;
  widowed: number;
  age: string;
  count: number;
};

const columns: ["single", "concubine", "married", "divorced", "widowed"] = [
  "single",
  "concubine",
  "married",
  "divorced",
  "widowed",
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
  labelSpacing: 4,
});
const categories = {
  single: {
    name: "Ledig",
    color: "var(--color-primary)",
  },
  concubine: {
    name: "In einer festen Partnerschaft (nicht verheiratet)",
    color: "var(--color-secondary)",
  },
  married: {
    name: "Verheiratet",
    color: "var(--color-accent)",
  },
  divorced: {
    name: "Geschieden / Getrennt lebend",
    color: "var(--color-info)",
  },
  widowed: {
    name: "Verwitwet",
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
  "unter 18": [] as string[],
  "18-24 Jahre": [] as string[],
  "25-34 Jahre": [] as string[],
  "35-44 Jahre": [] as string[],
  "45-54 Jahre": [] as string[],
  "55-64 Jahre": [] as string[],
  "65-74 Jahre": [] as string[],
  "75 Jahre und älter": [] as string[],
};
responses.value.forEach((entry) => {
  ageResponses[entry.age].push(entry.relationshipState);
});
for (const key in ageResponses) {
  let ageRange = ageResponses[key as keyof typeof ageResponses];
  if (ageRange.length > 0) {
    data.value.push({
      age: `${key} (${ageRange.length} Antwort${ageRange.length > 1 ? "en" : ""})`,
      single:
        (ageRange.reduce((a: number, b) => (b === "Ledig" ? a + 1 : a), 0) /
          ageRange.length) *
        100,
      concubine:
        (ageRange.reduce(
          (a: number, b) =>
            b === "In einer festen Partnerschaft (nicht verheiratet)"
              ? a + 1
              : a,
          0,
        ) /
          ageRange.length) *
        100,
      married:
        (ageRange.reduce(
          (a: number, b) => (b === "Verheiratet" ? a + 1 : a),
          0,
        ) /
          ageRange.length) *
        100,
      divorced:
        (ageRange.reduce(
          (a: number, b) => (b === "Geschieden / Getrennt lebend" ? a + 1 : a),
          0,
        ) /
          ageRange.length) *
        100,
      widowed:
        (ageRange.reduce((a: number, b) => (b === "Verwitwet" ? a + 1 : a), 0) /
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
