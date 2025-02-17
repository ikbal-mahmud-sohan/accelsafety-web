<script setup lang="ts">
import _ from "lodash";
import { ref, provide, reactive, onMounted, watchEffect } from "vue";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import Pagination from "@/components/Base/Pagination";
import { FormInput, FormSelect } from "@/components/Base/Form";
import TinySlider, {
  type TinySliderElement,
} from "@/components/Base/TinySlider";
import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";
import Litepicker from "@/components/Base/Litepicker";
import ReportDonutChart from "@/components/ReportDonutChart";
import ReportLineChart from "@/components/ReportLineChart";
import ReportPieChart from "@/components/ReportPieChart";

import { getToken } from './../auth/setToken'
import axios from 'axios';
import config from "@/config";


const salesReportFilter = ref<string>("");
const importantNotesRef = ref<TinySliderElement>();

const state = reactive({
  token: getToken(),  // Set initial token from localStorage if it exists
  viewData: [] as Array<any>,
  overall_total_water:0,
  total_waste:0,
  total_energy_usage:0,
});

provide("bind[importantNotesRef]", (el: TinySliderElement) => {
  importantNotesRef.value = el;
});

const prevImportantNotes = () => {
  importantNotesRef.value?.tns.goTo("prev");
};
const nextImportantNotes = () => {
  importantNotesRef.value?.tns.goTo("next");
};
// const token = getToken();
console.log('Global token:', state.token);


const chartData = ref({
  labels: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  datasets: [
    {
      label: "Dataset 1",
      data: Array(12).fill(0),  // Initialize with 0 for all months
    },
  ],
});

// Make monthlySafetyObservations reactive so it can be updated dynamically
const monthlySafetyObservations = reactive<{ [key: string]: number }>({});

const updateChartData = () => {
  // Update the chart data with the backend values
  chartData.value.datasets[0].data = chartData.value.labels.map((month) => {
    return monthlySafetyObservations[month] || 0; // Use 0 if data for the month doesn't exist
  });
};



// Fetch data from the API and update the state
const fetchData = async () => {
  try {
    let url = config.baseURL + '/api/v1/environment-dashboard';
    const response = await axios.get(url, {
      headers: {
        'Authorization': state.token,
      },
    });

    state.viewData = response.data;
    state.overall_total_water = response.data.total.overall_total_water;
    state.total_waste = response.data.total_waste;
    state.total_energy_usage = response.data.total_energy_usage;
    
    // Assuming response.data.monthlySafetyObservations is an object like { Feb: 1, Mar: 5 }
    // const backendData = response.data.monthlySafetyObservations;

    // // Update the reactive object with the backend data
    // Object.keys(backendData).forEach(month => {
    //   monthlySafetyObservations[month] = backendData[month];
    // });

    console.log("state.viewData", state.viewData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call fetchData when the component is mounted
onMounted(() => {
  fetchData();
});
// Automatically update chart data when monthlySafetyObservations changes
watchEffect(() => {
  updateChartData();
});

</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8  ">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Environment Report</h2>
            <a href="" class="flex items-center ml-auto text-primary">
              <Lucide icon="RefreshCcw" class="w-4 h-4 mr-3" /> Reload Data
            </a>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div :class="[
                'relative zoom-in',
                'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
              ]">
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide icon="ShoppingCart" class="w-[28px] h-[28px] text-primary" />
                    <div class="ml-auto">
                      <Tippy as="div"
                        class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="33% Higher than last month">
                        33%
                        <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8"> {{ state.total_energy_usage }} </div>
                  <div class="mt-1 text-base text-slate-500">All GHG (In Tons)</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div :class="[
                'relative zoom-in',
                'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
              ]">
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide icon="CreditCard" class="w-[28px] h-[28px] text-pending" />
                    <div class="ml-auto">
                      <Tippy as="div"
                        class="cursor-pointer bg-danger py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="2% Lower than last month">
                        2%
                        <Lucide icon="ChevronDown" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">{{ state.overall_total_water }}</div>
                  <div class="mt-1 text-base text-slate-500">Total Water Consumption</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div :class="[
                'relative zoom-in',
                'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
              ]">
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide icon="Monitor" class="w-[28px] h-[28px] text-warning" />
                    <div class="ml-auto">
                      <Tippy as="div"
                        class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="12% Higher than last month">
                        12%
                        <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">2.149</div>
                  <div class="mt-1 text-base text-slate-500">
                    Total Water Recovered
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div :class="[
                'relative zoom-in',
                'before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',
              ]">
                <div class="p-5 box">
                  <div class="flex">
                    <Lucide icon="User" class="w-[28px] h-[28px] text-success" />
                    <div class="ml-auto">
                      <Tippy as="div"
                        class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="22% Higher than last month">
                        22%
                        <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">{{ state.total_waste }}</div>
                  <div class="mt-1 text-base text-slate-500">
                    Wastege Inventory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-span-12 mt-8 lg:col-span-4">
          
                <div class="flex w-full h-full items-end">
                  <div class="w-full flex justify-center text-center p-5 mt-12 intro-y box sm:mt-5">
                      <div class="">
                          <div class="flex justify-center">
                            <Lucide icon="PieChart" class="w-10 h-10 text-pending" />
                          </div>
                          <div class="flex items-center justify-center mt-12 text-slate-600 dark:text-slate-300">
                            All GHG (In Tons)
                            <Tippy content="Total value of your sales: $158.409.416">
                              <Lucide icon="AlertCircle" class="w-4 h-4 ml-1.5" />
                            </Tippy>
                          </div>
                          <div class="flex items-center justify-center mt-4">
                            <div class="relative text-2xl font-medium pl-3 ml-0.5">
                              <span class="absolute text-xl font-medium top-0 left-0 -ml-0.5">
                                $
                              </span>
                              1,413,102.02
                            </div>
                            <a class="ml-4 text-slate-500" href="">
                              <Lucide icon="RefreshCcw" class="w-4 h-4" />
                            </a>
                          </div>
                          <div class="mt-4 text-xs text-center text-slate-500">
                            Last updated 1 hour ago
                          </div>
                      </div>
                </div>
                </div>
          </div> -->

        <div class="col-span-12 mt-8 lg:col-span-6">
          <div class="p-5 mt-12 intro-y box sm:mt-5">
            <div class="items-center block h-10 intro-y sm:flex">
              <h2 class="mr-5 text-lg font-medium truncate">Energy Consumption</h2>
            </div>
            <div :class="[
              'relative',
              'before:content-[\'\'] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600',
              'after:content-[\'\'] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600',
            ]">
              <ReportLineChart :chartData="chartData" :height="275" class="mt-6 -mb-6" />
            </div>
          </div>
        </div>
        
        <div class="col-span-12 mt-8 lg:col-span-6">
          
          <div class="p-5 mt-12 intro-y box sm:mt-5">
            <div class="items-center block h-10 intro-y sm:flex">
              <h2 class="mr-5 text-lg font-medium truncate">Water Consumption</h2>
            </div>
            
            <div :class="[
              'relative',
              'before:content-[\'\'] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600',
              'after:content-[\'\'] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600',
            ]">
              <ReportLineChart :chartData="chartData" :height="275" class="mt-6 -mb-6" />
            </div>
          </div>
        </div>
        <div class="col-span-12 mt-8 lg:col-span-6">
          
          <div class="p-5 mt-12 intro-y box sm:mt-5">
            <div class="items-center block h-10 intro-y sm:flex">
              <h2 class="mr-5 text-lg font-medium truncate">Waste Consumption</h2>
            </div>
            <div :class="[
              'relative',
              'before:content-[\'\'] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600',
              'after:content-[\'\'] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600',
            ]">
              <ReportLineChart :chartData="chartData" :height="275" class="mt-6 -mb-6" />
            </div>
          </div>
        </div>
        <div class="col-span-12 mt-8 lg:col-span-6">
          
          <div class="p-5 mt-12 intro-y box sm:mt-5">
            <div class="items-center block h-10 intro-y sm:flex">
              <h2 class="mr-5 text-lg font-medium truncate">Waste Water</h2>
            </div>
            <div :class="[
              'relative',
              'before:content-[\'\'] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600',
              'after:content-[\'\'] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600',
            ]">
              <ReportLineChart :chartData="chartData" :height="275" class="mt-6 -mb-6" />
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
