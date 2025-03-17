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
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

const data = computed<ChartData>(() => {
  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "current",
        barThickness: 8,
        maxBarThickness: 6,
        data: [14, 11, 15, 10, 8, 9, 18, 12, 23, 18, 25, 27],
        backgroundColor: colorScheme.value ? getColor("primary") : "",
      },
      {
        label: "previous",
        barThickness: 8,
        maxBarThickness: 6,
        data: [17, 14, 12, 15, 11, 13, 15, 9, 25, 17, 24, 26],
        backgroundColor: darkMode.value
          ? getColor("darkmode.400")
          : getColor("slate.300"),
      },
    ],
  };
});

const options = computed<ChartOptions>(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 11,
          },
          color: getColor("slate.500", 0.8),
        },
        grid: {
          display: true,
        },
        border: {
          display: true,
        },
      },
      y: {
        ticks: {
          display: true,
        },
        grid: {
          color: darkMode.value
            ? getColor("darkmode.300", 0.8)
            : getColor("slate.300"),
        },
        border: {
          dash: [2, 2],
          display: true,
        },
      },
    },
  };
});
</script>

<template>
  <Chart
    type="bar"
    :width="props.width"
    :height="props.height"
    :data="data"
    :options="options"
  />
</template>
