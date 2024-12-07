<script setup lang="ts">
import { computed } from "vue";
import { type ChartData, type ChartOptions } from "chart.js/auto";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { useDarkModeStore } from "@/stores/dark-mode";
import Chart from "@/components/Base/Chart";
import { getColor } from "@/utils/colors";

// Define props
const props = defineProps<{
  width?: number;
  height?: number;
  chartData: number[]; // Array of numbers for chart data
  labels: string[];    // Array of strings for chart labels
}>();

// Reactive color settings
const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

// Function to get colors for the chart
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


// Computed chart data
const data = computed<ChartData>(() => {
  return {
    labels: props.labels, // Use the labels prop
    datasets: [
      {
        data: props.chartData, // Use the chartData prop
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

// Chart options
const options = computed<ChartOptions>(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Disable legend display
      },
    },
  };
});
</script>

<template>
  <Chart
    type="pie"
    :width="props.width"
    :height="props.height"
    :data="data"
    :options="options"
  />
</template>
