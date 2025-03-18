<script setup lang="ts">
import _ from "lodash";
import { ref, provide, reactive, onMounted, watchEffect } from "vue";
import TinySlider, {
  type TinySliderElement,
} from "@/components/Base/TinySlider";
import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";
import ReportDonutChart from "@/components/ReportDonutChart";
import ReportLineChart from "@/components/ReportLineChart";
import ReportBarChart2 from "@/components/ReportBarChart2";
import ReportBarChart3 from "@/components/ReportBarChart3";
import ReportBarChart4 from "@/components/ReportBarChart4";
import ReportBarChart5 from "@/components/ReportBarChart5";
import LeafletMap1 from "@/components/LeafletMap1";
import LeafletMap2 from "@/components/LeafletMap2";
import ReportPieChart from "@/components/ReportPieChart";
import BusinessDisruptionsHeatmap from '@/components/ReportHeatMap/BusinessDisruptionsHeatmap.vue';
import SimpleLineChart from "@/components/SimpleLineChart";
import { getToken } from './../auth/setToken'
import axios from 'axios';
import config from "@/config";

// Define your state using the reactive function
const state = reactive({
  viewData: [] as Array<any>,
  departmentData: [] as Array<any>,
  token: getToken(),
  accOpen: 0,
  accProgress: 0,
  accClosed: 0,
  invOpen: 0,
  invProgress: 0,
  invClosed: 0,
});

const piChartData = [100, 70, 30];
const piChartLabels = ["BCM Test Conducted", "BCM Test Pass", "BCM Test Failed"];

const salesReportFilter = ref<string>("");
const importantNotesRef = ref<TinySliderElement>();

provide("bind[importantNotesRef]", (el: TinySliderElement) => {
  importantNotesRef.value = el;
});

const prevImportantNotes = () => {
  importantNotesRef.value?.tns.goTo("prev");
};
const nextImportantNotes = () => {
  importantNotesRef.value?.tns.goTo("next");
};

console.log('Global token:', state.token);

// safety-observation-dashboard

const chartData = ref({
  labels: [
    "Australia", "Bangladesh", "India", "Pakistan", "Srilanka", "Indonesia", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Vietnam", "New Zealand"
  ],
  datasets: [
    {
      label: "incident ",
      data: Array(12).fill(0),  // Initialize with 0 for all months
    },
  ],
});

// Make monthlySafetyObservations reactive so it can be updated dynamically
const monthlySafetyObservations = reactive<{ [key: string]: number }>({});

// const updateChartData = () => {
//   // Update the chart data with the backend values
//   chartData.value.datasets[0].data = chartData.value.labels.map((month) => {
//     return monthlySafetyObservations[month] || 0; // Use 0 if data for the month doesn't exist
//   });
// };

const updateChartData = () => {
  // Define static values for each month
  const staticValues = [5, 14, 16, 18, 7, 10, 6, 20, 17, 5, 10, 16, 8];

  // Update the chart data with the static values
  chartData.value.datasets[0].data = staticValues;
};

// Fetch data from the API and update the state
const fetchData = async () => {
  try {
    let url = config.baseURL + '/api/v1/safety-observation-dashboard';
    const response = await axios.get(url, {
      headers: {
        'Authorization': state.token,
      },
    });

    state.viewData = response.data;
    state.accOpen = response.data.accidentStatusPercentages.Open;
    state.accProgress = response.data.accidentStatusPercentages.Progress;
    state.accClosed = response.data.accidentStatusPercentages.Closed;
    state.invOpen = response.data.investigationStatusPercentages.Open;
    state.invProgress = response.data.investigationStatusPercentages.Progress;
    state.invClosed = response.data.investigationStatusPercentages.Closed;
    
    // Assuming response.data.monthlySafetyObservations is an object like { Feb: 1, Mar: 5 }
    const backendData = response.data.monthlySafetyObservations;

    // Update the reactive object with the backend data
    Object.keys(backendData).forEach(month => {
      monthlySafetyObservations[month] = backendData[month];
    });

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
  <div class="grid grid-cols-12 gap-6 pb-10">
    <div class="col-span-12">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <!-- <div class="col-span-12 mt-8  ">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Safety Observation Report</h2>
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
                  <div class="mt-6 text-3xl font-medium leading-8">{{ state.viewData.totalSafetyObservations }}</div>
                  <div class="mt-1 text-base text-slate-500">Total Safety Observation</div>
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
                  <div class="mt-6 text-3xl font-medium leading-8">{{ state.viewData.firstAidCases }}</div>
                  <div class="mt-1 text-base text-slate-500">No of First Aid Case</div>
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
                  <div class="mt-6 text-3xl font-medium leading-8">{{ state.viewData.totalDaysLost }}</div>
                  <div class="mt-1 text-base text-slate-500">
                    Days Lost
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
                  <div class="mt-6 text-3xl font-medium leading-8">50</div>
                  <div class="mt-1 text-base text-slate-500">
                    Manhour Count
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
                    <Lucide icon="ChromeIcon" class="w-[28px] h-[28px] text-primary" />
                    <div class="ml-auto">
                      <Tippy as="div"
                        class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="33% Higher than last month">
                        33%
                        <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">{{ state.viewData.totalSafetyObservations }}</div>
                  <div class="mt-1 text-base text-slate-500">Total Safety Toolbox Talk Conducted</div>
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
                    <Lucide icon="PocketIcon" class="w-[28px] h-[28px] text-success" />
                    <div class="ml-auto">
                      <Tippy as="div"
                        class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="22% Higher than last month">
                        22%
                        <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">50</div>
                  <div class="mt-1 text-base text-slate-500">
                    Number of PTW Running
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
                    <Lucide icon="LayersIcon" class="w-[28px] h-[28px] text-pending" />
                    <div class="ml-auto">
                      <Tippy as="div"
                        class="cursor-pointer bg-danger py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="2% Lower than last month">
                        2%
                        <Lucide icon="ChevronDown" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">{{ state.viewData.firstAidCases }}</div>
                  <div class="mt-1 text-base text-slate-500">Total Training Manhour</div>
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
                    <Lucide icon="PackageIcon" class="w-[28px] h-[28px] text-warning" />
                    <div class="ml-auto">
                      <Tippy as="div"
                        class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                        content="12% Higher than last month">
                        12%
                        <Lucide icon="ChevronUp" class="w-4 h-4 ml-0.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="mt-6 text-3xl font-medium leading-8">{{ state.viewData.totalDaysLost }}</div>
                  <div class="mt-1 text-base text-slate-500">
                    Number of PTW Issued
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div> -->

        <div class="col-span-12 mt-4">
          <div class="items-center justify-center block h-10 intro-y sm:flex">
            <h2 class="mr-5 text-lg font-medium truncate">Total Security Incidents</h2>

          </div>
          <div class="grid grid-cols-12 gap-6 pb-4">
            <div class="col-span-12 lg:col-span-6 ">
              <div class="p-5 mt-12 intro-y box sm:mt-5">
                <p class="pb-4 text-center">(Chart)</p>
                  <!-- <div :class="[
                    'relative',
                    'before:content-[\'\'] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600',
                    'after:content-[\'\'] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600',
                  ]"> -->
                <div>
                  <ReportLineChart :chartData="chartData" :height="275" class="mt-6 -mb-6" />
                </div>
              </div>
            </div>
            <div class="col-span-12 lg:col-span-6 ">
              <div class="p-5 mt-5 intro-y box">
                <p class="pb-4 text-center">(Map)</p>
                <LeafletMap2 class="h-[275px] mt-5 rounded-md bg-slate-200"/>

              </div>
            </div>
          </div>
          
        </div>

        <!-- <div class="col-span-12 mt-8 sm:col-span-6 lg:col-span-2">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Action Status</h2>
          </div>
          <div class="p-5 mt-5 intro-y box">
            <div class="mt-3">
              <ReportPieChart :chartData="[state.accOpen, state.accProgress, state.accClosed]" :height="165" />
            </div>
            <div class="mx-auto mt-8 w-52 sm:w-auto">
              <div class="flex items-center">
                <div class="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                <span class="truncate">Open</span>
                <span class="ml-auto font-medium"> {{ state.accOpen }} %</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                <span class="truncate">Progress</span>
                <span class="ml-auto font-medium">{{ state.accProgress }} %</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-danger"></div>
                <span class="truncate">Closed</span>
                <span class="ml-auto font-medium">{{ state.accClosed }} %</span>
              </div>
            </div>
          </div>
        </div> -->

        <!-- <div class="col-span-12 mt-8 sm:col-span-6 lg:col-span-2">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Responsible Person</h2>
          </div>
          <div class="p-5 mt-5 intro-y box">
            <div class="mt-3">
              <ReportDonutChart :chartData="[state.invOpen, state.invProgress, state.invClosed]" :height="165" />
            </div>
            <div class="mx-auto mt-8 w-52 sm:w-auto">
              <div class="flex items-center">
                <div class="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                <span class="truncate">Open</span>
                <span class="ml-auto font-medium">{{ state.invOpen }} %</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                <span class="truncate">Progress</span>
                <span class="ml-auto font-medium">{{ state.invProgress }} %</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-danger"></div>
                <span class="truncate">Closed</span>
                <span class="ml-auto font-medium">{{ state.invClosed }} %</span>
              </div>
            </div>
          </div>
        </div> -->
        <div class="col-span-12 mt-4 lg:col-span-6">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">BCM Threats Detected</h2>
          </div>
          <div class="p-5 mt-5 intro-y box">
            <!-- <div class="mt-3">
              <div class="flex justify-between items-end">
                <div class="w-1/3">
                    <div class="flex justify-center">
                        <div class="w-10 h-64  rounded-sm flex items-end">
                            <div class="w-10 h-3/4 bg-warning text-center font-semibold text-white">
                              {{ state.viewData.totalSafetyObservations }}
                                27
                            </div>
                        </div>
                      </div>
                      <p class="text-center mt-2">Near Miss</p>
                </div>
                <div class="w-1/3">
                    <div class="flex justify-center">
                        <div class="w-10 h-64  rounded-sm flex items-end">
                          <div class="w-10 h-2/6 bg-danger text-center font-semibold text-white">
                            {{ state.viewData.firstAidCases }}
                              7
                          </div>
                        </div>
                      </div>
                      <p class="text-center mt-2">first Aid</p> 
                </div>
                <div class="w-1/3">
                    <div class="flex justify-center">
                        <div class="w-10 h-64  rounded-sm flex items-end">
                          <div class="w-10 h-1/12 bg-primary text-center font-semibold text-white">1</div>
                        </div>
                      </div>
                      <p class="text-center mt-2">Recordable</p>
                </div>
                 
              </div>
            </div> -->

            <!-- <div class="w-auto h-[300px]">
              <canvas class="chart vertical-bar-chart vertical-bar-chart"></canvas>
            </div> -->
            <ReportBarChart2 :height="300" />

          </div>
        </div>
        <div class="col-span-12 mt-4 lg:col-span-6">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">BCM test success rates</h2>
          </div>
          <div class="p-5 mt-5 intro-y box">

            <ReportPieChart :chartData="piChartData" :chartLabels="piChartLabels" :height="220" />
            <div class="w-full flex justify-center pt-4">
              <div class="w-48 flex justify-between items-center">
                <div>{{ piChartLabels[0] }}</div>
                <div> {{ piChartData[0] }} </div>
              </div>
            </div>
            <div class="w-full flex justify-center">
              <div class="w-48 flex justify-between items-center">
                <div>{{ piChartLabels[1] }}</div>
                <div> {{ piChartData[1] }} </div>
              </div>
            </div>
            <div class="w-full flex justify-center">
              <div class="w-48 flex justify-between items-center">
                <div>{{ piChartLabels[2] }}</div>
                <div> {{ piChartData[2] }} </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-span-12 mt-4 lg:col-span-6">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Business disruptions by category</h2>
          </div>
          <div class="p-5 mt-5 intro-y box">

            <!-- <BusinessDisruptionsHeatmap /> -->
            <LeafletMap2 class="h-[320px] mt-5 rounded-md bg-slate-200"/>

          </div>
        </div>
        <div class="col-span-12 mt-4 lg:col-span-6">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Workplace incidents reported (month-over-month comparison)</h2>
          </div>
          <div class="p-5 mt-5 intro-y box">

            <ReportBarChart3 :height="340" />

          </div>
        </div>
        
        <div class="col-span-12 mt-4">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">OHS incidents/hazards / near miss reports</h2>
          </div>
          <div class="grid grid-cols-12 gap-6 pb-4">
            <div class="col-span-12 lg:col-span-6 ">
              <div class="p-5 mt-5 intro-y box">
                <p class="pb-4 text-center">(Number of Hazards)</p>
                <ReportBarChart4 :height="300" />

              </div>
            </div>
            <div class="col-span-12 lg:col-span-6 ">
              <div class="p-5 mt-5 intro-y box">
                <p class="pb-4 text-center">(Number of First Aid Cases)</p>
                <ReportBarChart5 :height="300" />

              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 mt-4 lg:col-span-6">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">OHS LTIFR</h2>
          </div>
          <div class="p-5 mt-5 intro-y box">

            <SimpleLineChart :height="300"/>

          </div>
        </div>
        <div class="col-span-12 mt-4 lg:col-span-6">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Overall country risk (Security, BCM, and OHS risks)</h2>
          </div>
          <div class="p-5 mt-5 intro-y box">

            <LeafletMap1 class="h-[320px] mt-5 rounded-md bg-slate-200"/>

          </div>
        </div>



      </div>
    </div>

  </div>
</template>
