<script setup lang="ts">
import _ from "lodash";
import { ref, provide, reactive, onMounted } from "vue";
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
import ReportDonutChart1 from "@/components/ReportDonutChart1";
import SimpleLineChart1 from "@/components/SimpleLineChart1";
import LeafletMap from "@/components/LeafletMap";
import { Menu } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import { getToken } from './../auth/setToken'
import ReportBarChart1 from "@/components/ReportBarChart1";
import axios from 'axios';
import config from "@/config";


// Define your state using the reactive function
const state = reactive({
  viewData: [] as Array<any>,
  departmentData: [] as Array<any>,
  token: getToken(),
  accOpen:0,
  accProgress:0,
  accClosed:0,
  invOpen:0,
  invProgress:0,
  invClosed:0,

});
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
// const token = getToken();
console.log('Global token:', state.token);
// safety-observation-dashboard





// Fetch data from the API and update the state
const fetchData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/safety-observation-dashboard';
    const response = await axios.get(url,{
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
    
    console.log("state.viewData",state.viewData)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
// Call fetchData when the component is mounted
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="grid grid-cols-12 gap-6 pb-10">
    <div class="col-span-12">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8  ">
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
          </div>
        </div>
       
        <div class="col-span-12 mt-8 lg:col-span-5">
          <div class="items-center block h-10 intro-y sm:flex">
            <h2 class="mr-5 text-lg font-medium truncate">Safety Observation Trend</h2>
            
          </div>
          <div class="p-5 mt-12 intro-y box sm:mt-5">
            
            <div :class="[
              'relative',
              'before:content-[\'\'] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600',
              'after:content-[\'\'] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600',
            ]">
              <ReportLineChart :height="275" class="mt-6 -mb-6" />
            </div>
          </div>
        </div>
       
        <div class="col-span-12 mt-8 sm:col-span-6 lg:col-span-2">
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
        </div>
        
        <div class="col-span-12 mt-8 sm:col-span-6 lg:col-span-2">
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
        </div>
        <div class="col-span-12 mt-8 sm:col-span-6 lg:col-span-3">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Incident Type</h2>
          </div>
          <div class="p-5 mt-5 intro-y box">
            <div class="mt-3">
              <div class="flex justify-between items-end">
                <div class="w-1/3">
                    <div class="flex justify-center">
                        <div class="w-10 h-64  rounded-sm flex items-end">
                            <div class="w-10 h-3/4 bg-warning text-center font-semibold text-white">
                              <!-- {{ state.viewData.totalSafetyObservations }} -->
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
                            <!-- {{ state.viewData.firstAidCases }} -->
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
            </div>
            
          </div>
        </div>
       
        

      </div>
    </div>

  </div>
</template>
