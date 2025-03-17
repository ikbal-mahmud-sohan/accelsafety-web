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
  chartData?: number[];
  chartLabels?: string[];
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

// Default chart data if not provided
const defaultChartData = [15, 10, 65];
const defaultChartLabels = ["Blue", "Yellow", "Dark" ];

const chartColors = () => [
  getColor("primary", 0.9),
  getColor("pending", 0.9),
  getColor("danger", 0.9),
];
// state.accOpen, state.accProgress, state.accClosed
const data = computed<ChartData>(() => {
  return {
    labels: props.chartLabels ?? defaultChartLabels,
    datasets: [
      {
        data: props.chartData ?? defaultChartData,
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
        // display: false,
        display: true,
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
