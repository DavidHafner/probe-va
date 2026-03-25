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
      :yAxis="['worthIt']"
      :valueLabel="valueLabel"
      xAxis="age"
      :xNumTicks="5"
    />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  name: "Lohnt es sich (Meinung nach alter)",
});
import type { ValueLabel } from "~~/node_modules/vue-chrts/dist/components/BarChart/BarChart.d.ts";
import responseParser from "../helpers/responseParser";
import type { RawResponse, Response } from "../types/response.type";

const parent = ref<HTMLDivElement>();
const parentHeight = computed(() => {
  return (parent.value?.offsetHeight ?? 0) * 0.9;
});

const responses = ref<Response[]>([]);
const data = ref<{ worthIt: number; age: string; count: number }[]>([]);

const valueLabel = ref<ValueLabel>({
  label: (d: { x: number; y: number }, index: number) => {
    return (data.value[d.x]?.count ?? 0).toString();
  },
  backgroundColor: "var(--color-base-100)",
  color: "var(--color-base-content)",
  labelFontSize: 16,
  labelSpacing: 0.015,
});

const categories = {
  worthIt: {
    name: "Sind Sie persönlich der Meinung, dass es sich lohnt zu heiraten?",
    color: "#3b82f6",
  },
  //   count: {
  //     name: "Anzahl Antworten",
  //     color: "#10b981",
  //   },
};

const xFormatter = (i: number) => data.value[i]?.age ?? "-";
const yFormatter = (i: number) => i.toString() ?? "-";

import rawData from "~/assets/data.json";
rawData.forEach((raw) => {
  responses.value.push(responseParser(raw as RawResponse));
});
let ageResponses = {
  "unter 18": [] as number[],
  "18-24 Jahre": [] as number[],
  "25-34 Jahre": [] as number[],
  "35-44 Jahre": [] as number[],
  "45-54 Jahre": [] as number[],
  "55-64 Jahre": [] as number[],
  "65-74 Jahre": [] as number[],
  "75 Jahre und älter": [] as number[],
};
responses.value.forEach((entry) => {
  console.log(entry.age, entry.worthIt);
  ageResponses[entry.age].push(entry.worthIt);
});
for (const key in ageResponses) {
  if (ageResponses[key as keyof typeof ageResponses].length > 0) {
    data.value.push({
      age: key,
      worthIt:
        ageResponses[key as keyof typeof ageResponses].reduce(
          (a, b) => a + b,
          0,
        ) / ageResponses[key as keyof typeof ageResponses].length,
      count: ageResponses[key as keyof typeof ageResponses].length,
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
