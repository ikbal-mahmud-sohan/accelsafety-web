<script setup lang="ts">
import { computed } from "vue";
import { type ChartData, type ChartOptions } from "chart.js/auto";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { useDarkModeStore } from "@/stores/dark-mode";
import Chart from "@/components/Base/Chart";
import { getColor } from "@/utils/colors";

const props = defineProps<{
  width?: number;
  height?: number;
  chartData: number[]; // Array of numbers for chart data
  labels: string[];    // Array of strings for chart labels
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

const chartColors = () => [
  getColor("primary", 0.9),
  getColor("secondary", 0.9),
  getColor("success", 0.9),
  getColor("info", 0.9),
  getColor("warning", 0.9),
  getColor("pending", 0.9),
  getColor("danger", 0.9),
  getColor("light", 0.9),
  getColor("dark", 0.9),
];
const data = computed<ChartData>(() => {
  return {
    labels: props.labels,
    datasets: [
      {
        data: props.chartData,
        backgroundColor: colorScheme.value ? chartColors() : "",
        hoverBackgroundColor: colorScheme.value ? chartColors() : "",
        borderWidth: 5,
        borderColor: darkMode.value
          ? getColor("darkmode.700")
          : getColor("white"),
      },
    ],
  };
});

const options = computed<ChartOptions>(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "80%",
  };
});
</script>

<template>
  <Chart
    type="doughnut"
    :width="props.width"
    :height="props.height"
    :data="data"
    :options="options"
  />
</template>
