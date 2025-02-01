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
  chartData?: number[];
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

// Default chart data if not provided
const defaultChartData = [15, 10, 65];
const labels = ["31 - 50 Years old", ">= 50 Years old", "17 - 30 Years old"];

// Function to check if all values are 0
const isAllZero = (data: number[]) => data.every(value => value === 0);

const chartColors = (isZero: boolean) => {
  if (isZero) {
    return ["gray"]; // Set gray if all values are 0
  }
  return [
    getColor("primary", 0.9),
    getColor("warning", 0.9),
    getColor("danger", 0.9),
  ];
};

const data = computed<ChartData>(() => {
  const chartData = props.chartData ?? defaultChartData;
  const isZero = isAllZero(chartData);

  return {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: colorScheme.value ? chartColors(isZero) : "",
        hoverBackgroundColor: colorScheme.value ? chartColors(isZero) : "",
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
