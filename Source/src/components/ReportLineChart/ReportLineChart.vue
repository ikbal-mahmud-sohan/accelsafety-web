<script setup lang="ts">
import { computed } from "vue";
import { type ChartData, type ChartOptions } from "chart.js/auto";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { useDarkModeStore } from "@/stores/dark-mode";
import Chart from "@/components/Base/Chart";
import { getColor } from "@/utils/colors";

// Define props to accept dynamic data
const props = defineProps<{
  width?: number;
  height?: number;
  chartData: ChartData; // Accept dynamic data
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

// Use the passed `chartData` instead of static data
const data = computed<ChartData>(() => {
  return {
    ...props.chartData, // Use dynamic chart data
    datasets: props.chartData.datasets.map((dataset) => ({
      ...dataset,
      borderWidth: 2,
      borderColor: colorScheme.value ? getColor("primary", 0.8) : "",
      backgroundColor: "transparent",
      pointBorderColor: "transparent",
      tension: 0.4,
    })),
  };
});

const options = computed<ChartOptions>(() => ({
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        font: { size: 12 },
        color: getColor("slate.500", 0.8),
      },
      grid: { display: false },
      border: { display: false },
    },
    y: {
      ticks: {
        font: { size: 12 },
        color: getColor("slate.500", 0.8),
        callback: (value) => value, // ✅ Removes "$" sign
      },
      grid: {
        color: darkMode.value ? getColor("slate.500", 0.3) : getColor("slate.300"),
      },
      border: { dash: [2, 2], display: false },
    },
  },
}));
</script>

<template>
  <Chart
    type="line"
    :width="props.width"
    :height="props.height"
    :data="data"
    :options="options"
  />
</template>
