<script setup lang="ts">
import _ from "lodash";
import { ref, reactive,provide, onMounted } from 'vue';
import axios from 'axios';
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
import config from "@/config";
import { Console } from "console";


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

const state = reactive({
      MML: [] as Array<any>,
      Electrical: [] as Array<any>,
      Mechanical: [] as Array<any>,
      SMS: [] as Array<any>,
      CCM: [] as Array<any>,
      AdminFacilities: [] as Array<any>,
      HSE: [] as Array<any>,
      QCM: [] as Array<any>,
      AllOver: [] as Array<any>,
      responsibledepartmentTotals: [] as Array<any>,
      
      odMML: [] as Array<any>,
      odElectrical: [] as Array<any>,
      odMechanical: [] as Array<any>,
      odSMS: [] as Array<any>,
      odCCM: [] as Array<any>,
      odAdminFacilities: [] as Array<any>,
      odHSE: [] as Array<any>,
      odQCM: [] as Array<any>,
      odAllOver: [] as Array<any>,
      odresponsibledepartmentTotals: [] as Array<any>,
      
      dtMML: [] as Array<any>,
      dtElectrical: [] as Array<any>,
      dtMechanical: [] as Array<any>,
      dtSMS: [] as Array<any>,
      dtCCM: [] as Array<any>,
      dtAdminFacilities: [] as Array<any>,
      dtHSE: [] as Array<any>,
      dtQCM: [] as Array<any>,
      dtAllOver: [] as Array<any>,
      dtresponsibledepartmentTotals: [] as Array<any>,
      
      dtdMML: [] as Array<any>,
      dtdElectrical: [] as Array<any>,
      dtdMechanical: [] as Array<any>,
      dtdSMS: [] as Array<any>,
      dtdCCM: [] as Array<any>,
      dtdAdminFacilities: [] as Array<any>,
      dtdHSE: [] as Array<any>,
      dtdQCM: [] as Array<any>,
      dtdAllOver: [] as Array<any>,
      dtdresponsibledepartmentTotals: [] as Array<any>,
  token: getToken(),

});

const fetchData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/safety-observation-rd-dashboard';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.MML = response.data.data.MML;
    state.Electrical  = response.data.data.Electrical;
    state.Mechanical  = response.data.data.Mechanical;
    state.SMS = response.data.data.SMS;
    state.CCM = response.data.data.CCM;
    state.AdminFacilities = response.data.data.AdminFacilities;
    state.HSE = response.data.data.HSE;
    state.QCM = response.data.data.QCM;
    state.AllOver = response.data.data.AllOver;
    state.responsibledepartmentTotals = response.data.totals;
    console.log("mml",state.MML)
  } catch (error) {
    console.error('Error fetching data.data:', error);
  }
};

const fetchOdData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/safety-observation-od-dashboard';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.odMML = response.data.data.MML;
    state.odElectrical  = response.data.data.Electrical;
    state.odMechanical  = response.data.data.Mechanical;
    state.odSMS = response.data.data.SMS;
    state.odCCM = response.data.data.CCM;
    state.odAdminFacilities = response.data.data.AdminFacilities;
    state.odHSE = response.data.data.HSE;
    state.odQCM = response.data.data.QCM;
    state.odAllOver = response.data.data.AllOver;
    state.odresponsibledepartmentTotals = response.data.totals;
  } catch (error) {
    console.error('Error fetching data.data:', error);
  }
};

const fetchDueTData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/safety-observation-due-tracker-dashboard';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.dtMML = response.data.data.counts.MML;
    state.dtElectrical  = response.data.data.counts.Electrical;
    state.dtMechanical  = response.data.data.counts.Mechanical;
    state.dtSMS = response.data.data.counts.SMS;
    state.dtCCM = response.data.data.counts.CCM;
    state.dtAdminFacilities = response.data.data.counts.AdminFacilities;
    state.dtHSE = response.data.data.counts.HSE;
    state.dtQCM = response.data.data.counts.QCM;
    state.dtAllOver = response.data.data.counts.AllOver;
    state.dtresponsibledepartmentTotals = response.data.data.totals;


    console.log("xxx",response.data.data.counts)
  } catch (error) {
    console.error('Error fetching data.data:', error);
  }
};

const fetchDueT30Data = async () => {
  try {
   let  url = config.baseURL+'/api/v1/safety-observation-due-tracker-dashboard?days=30';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.dtdMML = response.data.data.counts.MML;
    state.dtdElectrical  = response.data.data.counts.Electrical;
    state.dtdMechanical  = response.data.data.counts.Mechanical;
    state.dtdSMS = response.data.data.counts.SMS;
    state.dtdCCM = response.data.data.counts.CCM;
    state.dtdAdminFacilities = response.data.data.counts.AdminFacilities;
    state.dtdHSE = response.data.data.counts.HSE;
    state.dtdQCM = response.data.data.counts.QCM;
    state.dtdAllOver = response.data.data.counts.AllOver;
    state.dtdresponsibledepartmentTotals = response.data.data.totals;
  } catch (error) {
    console.error('Error fetching data.data:', error);
  }
};

onMounted(() => {
  fetchData();
  fetchOdData();
  fetchDueTData();
  fetchDueT30Data();
});
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-9">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Percentage of closure vs. department responsible wise</h2>
            <a href="" class="flex items-center ml-auto text-primary">
              <Lucide icon="RefreshCcw" class="w-4 h-4 mr-3" /> Reload Data
            </a>
          </div>
         
          <div class="flex flex-wrap">
              <div class="w-full md:w-1/5">
                  <div class="px-2 py-2">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="CheckCircleIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{ state.responsibledepartmentTotals.percentage_true }} %</div>
                        <div class="mt-1 text-base text-slate-500">Total</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/5">
                  <div class="px-2 py-2">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="CodepenIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{ state.QCM.percentage_true }} %</div>
                        <div class="mt-1 text-base text-slate-500">QCM</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/5">
                  <div class="px-2 py-2">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="DatabaseIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{ state.AllOver.percentage_true }} %</div>
                        <div class="mt-1 text-base text-slate-500">All Over</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/5">
                  <div class="px-2 py-2">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="ExternalLinkIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{ state.HSE.percentage_true }} %</div>
                        <div class="mt-1 text-base text-slate-500">HSE</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/5">
                  <div class="px-2 py-2">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="LayersIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{ state.MML.percentage_true }} %</div>
                        <div class="mt-1 text-base text-slate-500">MML</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/5">
                  <div class="px-2 py-2">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="PackageIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{ state.AdminFacilities.percentage_true }} %</div>
                        <div class="mt-1 text-base text-slate-500">Admin & Facilities</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/5">
                  <div class="px-2 py-2">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="HeadphonesIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{ state.CCM.percentage_true }} %</div>
                        <div class="mt-1 text-base text-slate-500">CCM</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/5">
                  <div class="px-2 py-2">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="MailIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{ state.SMS.percentage_true }} %</div>
                        <div class="mt-1 text-base text-slate-500">SMS</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/5">
                  <div class="px-2 py-2">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="TargetIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{ state.Mechanical.percentage_true }} %</div>
                        <div class="mt-1 text-base text-slate-500">Mechanical</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/5">
                  <div class="px-2 py-2">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="WindIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-6 text-3xl font-medium leading-8">{{ state.Electrical.percentage_true }} % </div>
                        <div class="mt-1 text-base text-slate-500">Electrical</div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <!-- END: General Report -->
         
        <!-- BEGIN: Sales Report -->
        <!-- <div class="col-span-12 mt-8 lg:col-span-6">
          <div class="items-center block h-10 intro-y sm:flex">
            <h2 class="mr-5 text-lg font-medium truncate">Sales Report</h2>
            <div class="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
              <Lucide
                icon="Calendar"
                class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
              />
              <Litepicker
                v-model="salesReportFilter"
                :options="{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }"
                class="pl-10 sm:w-56 !box"
              />
            </div>
          </div>
          <div class="p-5 mt-12 intro-y box sm:mt-5">
            <div class="flex flex-col md:flex-row md:items-center">
              <div class="flex">
                <div>
                  <div
                    class="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl"
                  >
                    $15,000
                  </div>
                  <div class="mt-0.5 text-slate-500">This Month</div>
                </div>
                <div
                  class="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"
                ></div>
                <div>
                  <div class="text-lg font-medium text-slate-500 xl:text-xl">
                    $10,000
                  </div>
                  <div class="mt-0.5 text-slate-500">Last Month</div>
                </div>
              </div>
              <Menu class="mt-5 md:ml-auto md:mt-0">
                <Menu.Button
                  :as="Button"
                  variant="outline-secondary"
                  class="font-normal"
                >
                  Filter by Category
                  <Lucide icon="ChevronDown" class="w-4 h-4 ml-2" />
                </Menu.Button>
                <Menu.Items class="w-40 h-32 overflow-y-auto">
                  <Menu.Item>PC & Laptop</Menu.Item>
                  <Menu.Item>Smartphone</Menu.Item>
                  <Menu.Item>Electronic</Menu.Item>
                  <Menu.Item>Photography</Menu.Item>
                  <Menu.Item>Sport</Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
            <div
              :class="[
                'relative',
                'before:content-[\'\'] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600',
                'after:content-[\'\'] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600',
              ]"
            >
              <ReportLineChart :height="485" class="mt-6 -mb-6" />
            </div>
          </div>
        </div> -->
        <!-- END: Sales Report -->
         
        <!-- BEGIN: Weekly Top Seller -->
        <div class="col-span-12 mt-8 sm:col-span-6 ">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 font-medium truncate uppercase">Responsible Department</h2>
          </div>
          <div class="p-5 mt-5 intro-y box">
            <div class="mt-3">
                <ReportPieChart 
                  :chartData="[
                    (100 * state.Electrical.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.Mechanical.true_status / state.responsibledepartmentTotals.true_status), 
                    (100 * state.SMS.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.CCM.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.AdminFacilities.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.MML.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.HSE.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.AllOver.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.QCM.true_status / state.responsibledepartmentTotals.true_status),
                  ]" 
                  :labels="['Electrical', 'Mechanical', 'SMS', 'CCM', 'Admin & Facilities', 'MML', 'HSE', 'All Over', 'QCM']" 
                  :height="213" 
                />
              </div>
           
            <div class="mx-auto mt-8 w-52 sm:w-auto">
              <div class="flex items-center">
                <div class="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                <span class="truncate">Electrical</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.Electrical.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-secondary"></div>
                <span class="truncate">Mechanical</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.Mechanical.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-success"></div>
                <span class="truncate">SMS</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.SMS.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-info"></div>
                <span class="truncate">CCM</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.CCM.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                <span class="truncate"> Admin & Facilities</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.AdminFacilities.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                <span class="truncate">MML</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.MML.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-danger"></div>
                <span class="truncate">HSE</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.HSE.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-light"></div>
                <span class="truncate"> All Over </span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.AllOver.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-dark"></div>
                <span class="truncate">QCM</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.QCM.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Weekly Top Seller -->
        <!-- BEGIN: Sales Report -->
        <div class="col-span-12 mt-8 sm:col-span-6 ">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 font-medium truncate uppercase">Owner Department</h2>
          </div>
          <div class="p-5 mt-5 intro-y box">
            <div class="mt-3">
              <ReportDonutChart 
              :chartData="[
                    (100 * state.Electrical.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.Mechanical.true_status / state.responsibledepartmentTotals.true_status), 
                    (100 * state.SMS.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.CCM.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.AdminFacilities.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.MML.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.HSE.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.AllOver.true_status / state.responsibledepartmentTotals.true_status),
                    (100 * state.QCM.true_status / state.responsibledepartmentTotals.true_status),
                  ]" 
                  :labels="['Electrical', 'Mechanical', 'SMS', 'CCM', 'Admin & Facilities', 'MML', 'HSE', 'All Over', 'QCM']" 
              :height="213" />
            </div>
            <div class="mx-auto mt-8 w-52 sm:w-auto">
              <div class="flex items-center">
                <div class="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                <span class="truncate">Electrical</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.Electrical.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-secondary"></div>
                <span class="truncate">Mechanical</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.Mechanical.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-success"></div>
                <span class="truncate">SMS</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.SMS.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-info"></div>
                <span class="truncate">CCM</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.CCM.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                <span class="truncate"> Admin & Facilities</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.AdminFacilities.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                <span class="truncate">MML</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.MML.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-danger"></div>
                <span class="truncate">HSE</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.HSE.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-light"></div>
                <span class="truncate"> All Over </span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.AllOver.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 mr-3 rounded-full bg-dark"></div>
                <span class="truncate">QCM</span>
                <span class="ml-auto font-medium">{{ Math.round((100 * state.QCM.true_status / state.responsibledepartmentTotals.true_status) * 100) / 100 }}%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Sales Report -->
          <!-- BEGIN: Weekly Top Products -->
        <div class="col-span-12 mt-6">
          <div class="items-center block h-10 intro-y sm:flex">
            <h2 class="mr-5 text-lg font-medium truncate uppercase">
              Summary responsible department wise
            </h2>
           
          </div>
          <div class="mt-8 overflow-auto intro-y lg:overflow-visible sm:mt-0">
            <Table class="border-spacing-y-[10px] border-separate sm:mt-2">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    Department
                  </Table.Th>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    No of Observation 
                  </Table.Th>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    Closed
                  </Table.Th>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    On Going to Close
                  </Table.Th>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    Percentage of Closure %
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Electrical
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.Electrical.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.Electrical.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.Electrical.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.Electrical.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Mechanical
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.Mechanical.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.Mechanical.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.Mechanical.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.Mechanical.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    SMS
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.SMS.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.SMS.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.SMS.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.SMS.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    CCM
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.CCM.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.CCM.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.CCM.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.CCM.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Admin & Facilities
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.AdminFacilities.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.AdminFacilities.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.AdminFacilities.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.AdminFacilities.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    MML
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.MML.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.MML.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.MML.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.MML.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    HSE
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.HSE.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.HSE.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.HSE.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.HSE.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    All Over
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.AllOver.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.AllOver.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.AllOver.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.AllOver.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    QCM
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.QCM.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.QCM.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.QCM.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.QCM.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Total
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.responsibledepartmentTotals.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.responsibledepartmentTotals.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.responsibledepartmentTotals.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.responsibledepartmentTotals.percentage_true }}
                  </Table.Td>
                </Table.Tr>
               
              </Table.Tbody>
            </Table>
          </div>
         
        </div>
        <!-- END: Weekly Top Products -->
          <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8">
          <div class="flex items-center h-10 intro-y">
            <h2 class="mr-5 text-lg font-medium truncate">Ratio Summary Responsible Department Closed vs No of Observation</h2>
            
          </div>
         
          <div class="flex flex-wrap">
              <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="CodepenIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-3 lowercase text-success font-medium"> <span>No of Observation: </span> {{ state.QCM.total }}</div>
                        <div class="mt-3 lowercase text-danger font-medium"><span>Closed: </span>{{ state.QCM.true_status }}</div>
                        <div class="mt-1 text-base text-slate-500">QCM</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="DatabaseIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-3 lowercase text-success font-medium"> <span>No of Observation: </span>{{ state.AllOver.total }}</div>
                        <div class="mt-3 lowercase text-danger font-medium"><span>Closed: </span>{{ state.AllOver.true_status }}</div>
                        <div class="mt-1 text-base text-slate-500">All Over</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="ExternalLinkIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-3 lowercase text-success font-medium"> <span>No of Observation: </span>{{ state.HSE.total }}</div>
                        <div class="mt-3 lowercase text-danger font-medium"><span>Closed: </span>{{ state.HSE.true_status }}</div>
                        <div class="mt-1 text-base text-slate-500">HSE</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="LayersIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-3 lowercase text-success font-medium"> <span>No of Observation: </span>{{ state.MML.total }}</div>
                        <div class="mt-3 lowercase text-danger font-medium"><span>Closed: </span>{{ state.MML.true_status }}</div>
                        <div class="mt-1 text-base text-slate-500">MML</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="PackageIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-3 lowercase text-success font-medium"> <span>No of Observation: </span>{{ state.AdminFacilities.total }}</div>
                        <div class="mt-3 lowercase text-danger font-medium"><span>Closed: </span>{{ state.AdminFacilities.true_status }}</div>
                        <div class="mt-1 text-base text-slate-500">Admin & Facilities</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="HeadphonesIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-3 lowercase text-success font-medium"> <span>No of Observation: </span>{{ state.CCM.total }}</div>
                        <div class="mt-3 lowercase text-danger font-medium"><span>Closed: </span>{{ state.CCM.true_status }}</div>
                        <div class="mt-1 text-base text-slate-500">CCM</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="MailIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-3 lowercase text-success font-medium"> <span>No of Observation: </span>{{ state.SMS.total }}</div>
                        <div class="mt-3 lowercase text-danger font-medium"><span>Closed: </span>{{ state.SMS.true_status }}</div>
                        <div class="mt-1 text-base text-slate-500">SMS</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="TargetIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-3 lowercase text-success font-medium"> <span>No of Observation: </span>{{ state.Mechanical.total }}</div>
                        <div class="mt-3 lowercase text-danger font-medium"><span>Closed: </span>{{ state.Mechanical.true_status }}</div>
                        <div class="mt-1 text-base text-slate-500">Mechanical</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div :class="['relative zoom-in','before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-[\'\']',]" >
                      <div class="p-5 box text-center">
                        <div class="flex justify-center">
                          <Lucide icon="WindIcon" class="w-[28px] h-[28px] text-primary"/>
                        </div>
                        <div class="mt-3 lowercase text-success font-medium"> <span>No of Observation: </span>{{ state.Electrical.total }} </div>
                        <div class="mt-3 lowercase text-danger font-medium"><span>Closed: </span>{{ state.Electrical.true_status }} </div>
                        <div class="mt-1 text-base text-slate-500">Electrical</div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <!-- END: General Report -->
          <!-- BEGIN: Weekly Top Products -->
        <div class="col-span-12 mt-6">
          <div class="items-center block h-10 intro-y sm:flex">
            <h2 class="mr-5 text-lg font-medium truncate uppercase">
              Summary Owner Department wise
            </h2>
           
          </div>
          <div class="mt-8 overflow-auto intro-y lg:overflow-visible sm:mt-0">
            <Table class="border-spacing-y-[10px] border-separate sm:mt-2">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    Department
                  </Table.Th>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    No of Observation 
                  </Table.Th>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    Closed
                  </Table.Th>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    On Going to Close
                  </Table.Th>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    Percentage of Closure %
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Electrical
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.odElectrical.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odElectrical.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odElectrical.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odElectrical.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Mechanical
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.odMechanical.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odMechanical.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odMechanical.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odMechanical.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    SMS
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.odSMS.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odSMS.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odSMS.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odSMS.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    CCM
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.odCCM.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odCCM.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odCCM.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odCCM.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Admin & Facilities
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.odAdminFacilities.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odAdminFacilities.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odAdminFacilities.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odAdminFacilities.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    MML
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.odMML.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odMML.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odMML.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odMML.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    HSE
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.odHSE.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odHSE.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odHSE.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odHSE.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    All Over
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.odAllOver.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odAllOver.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odAllOver.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odAllOver.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    QCM
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.odQCM.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odQCM.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odQCM.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odQCM.percentage_true }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Total
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    {{ state.odresponsibledepartmentTotals.total }}
                  </Table.Td>
                  <Table.Td class="box  rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odresponsibledepartmentTotals.true_status }}
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odresponsibledepartmentTotals.false_status }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.odresponsibledepartmentTotals.percentage_true }}
                  </Table.Td>
                </Table.Tr>
               
              </Table.Tbody>
            </Table>
          </div>
         
        </div>
        <!-- END: Weekly Top Products -->
          <!-- BEGIN: Weekly Top Products -->
        <div class="col-span-12 mt-6">
          <div class="items-center block h-10 intro-y sm:flex">
            <h2 class="mr-5 text-lg font-medium truncate uppercase">
              Responsible Due Tracker
            </h2>
           
          </div>
          <div class="mt-8 overflow-auto intro-y lg:overflow-visible sm:mt-0">
            <Table class="border-spacing-y-[10px] border-separate sm:mt-2">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    Department
                  </Table.Th>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    Overdated More then 30 Days
                  </Table.Th>
                  <Table.Th class="border-b-0 whitespace-nowrap uppercase">
                    On Track
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Electrical
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtdElectrical.false_status_count }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtElectrical.false_status_count }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Mechanical
                  </Table.Td>
                 
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtdMechanical.false_status_count }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtMechanical.false_status_count }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    SMS
                  </Table.Td>
                  
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtdSMS.false_status_count }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtSMS.false_status_count }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    CCM
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtdCCM.false_status_count }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtCCM.false_status_count }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Admin & Facilities
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtdAdminFacilities.false_status_count }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtAdminFacilities.false_status_count }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    MML
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtdMML.false_status_count }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtMML.false_status_count }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    HSE
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtdHSE.false_status_count }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtHSE.false_status_count }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    All Over
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtdAllOver.false_status_count }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtAllOver.false_status_count }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    QCM
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtdQCM.false_status_count }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtQCM.false_status_count }}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr  class="intro-x" >
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                    Total
                  </Table.Td>
                  <Table.Td class="box  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtdresponsibledepartmentTotals.false_status_count }}
                  </Table.Td>
                  <Table.Td class="box text-center  w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600" >
                    {{ state.dtresponsibledepartmentTotals.false_status_count }}
                  </Table.Td>
                </Table.Tr>
               
              </Table.Tbody>
            </Table>
          </div>
         
        </div>
        <!-- END: Weekly Top Products -->
       
       
      </div>
    </div>
    <div class="col-span-12 2xl:col-span-3">
      <div class="pb-10 -mb-10 2xl:border-l">
        <div class="grid grid-cols-12 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6">
          <!-- BEGIN: Transactions -->
          <div
            class="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 2xl:mt-8"
          >
            <div class="flex items-center h-10 intro-x">
              <h2 class="mr-5 text-lg font-medium truncate">Safety Observation</h2>
            </div>
            <div class="mt-5">
              <div
                v-for="(faker, fakerKey) in _.take(fakerData, 5)"
                :key="fakerKey"
                class="intro-x"
              >
                <div class="flex items-center px-5 py-3 mb-3 box zoom-in">
                  <div
                    class="flex-none w-10 h-10 overflow-hidden rounded-full image-fit"
                  >
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      :src="faker.photos[0]"
                    />
                  </div>
                  <div class="ml-4 mr-auto">
                    <div class="font-medium">{{ faker.users[0].name }}</div>
                    <div class="text-slate-500 text-xs mt-0.5">
                      {{ faker.dates[0] }}
                    </div>
                  </div>
                  <div
                    :class="{
                      'text-success': faker.trueFalse[0],
                      'text-danger': !faker.trueFalse[0],
                    }"
                  >
                    {{ faker.trueFalse[0] ? "+" : "-" }}${{ faker.totals[0] }}
                  </div>
                </div>
              </div>
              <a
                href=""
                class="block w-full py-3 text-center border border-dotted rounded-md intro-x border-slate-400 dark:border-darkmode-300 text-slate-500"
              >
                View More
              </a>
            </div>
          </div>
          <!-- END: Transactions -->
          <!-- BEGIN: Recent Activities -->
          <div
            class="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12"
          >
            <div class="flex items-center h-10 intro-x">
              <h2 class="mr-5 text-lg font-medium truncate">
                Recent Activities
              </h2>
              <a href="" class="ml-auto truncate text-primary"> Show More </a>
            </div>
            <div
              class="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5"
            >
              <div class="relative flex items-center mb-3 intro-x">
                <div
                  class="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5"
                >
                  <div
                    class="flex-none w-10 h-10 overflow-hidden rounded-full image-fit"
                  >
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      :src="fakerData[9].photos[0]"
                    />
                  </div>
                </div>
                <div class="flex-1 px-5 py-3 ml-4 box zoom-in">
                  <div class="flex items-center">
                    <div class="font-medium">
                      {{ fakerData[9].users[0].name }}
                    </div>
                    <div class="ml-auto text-xs text-slate-500">07:00 PM</div>
                  </div>
                  <div class="mt-1 text-slate-500">Has joined the team</div>
                </div>
              </div>
              <div class="relative flex items-center mb-3 intro-x">
                <div
                  class="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5"
                >
                  <div
                    class="flex-none w-10 h-10 overflow-hidden rounded-full image-fit"
                  >
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      :src="fakerData[8].photos[0]"
                    />
                  </div>
                </div>
                <div class="flex-1 px-5 py-3 ml-4 box zoom-in">
                  <div class="flex items-center">
                    <div class="font-medium">
                      {{ fakerData[8].users[0].name }}
                    </div>
                    <div class="ml-auto text-xs text-slate-500">07:00 PM</div>
                  </div>
                  <div class="text-slate-500">
                    <div class="mt-1">Added 3 new photos</div>
                    <div class="flex mt-2">
                      <Tippy
                        as="div"
                        class="w-8 h-8 mr-1 image-fit zoom-in"
                        :content="fakerData[0].products[0].name"
                      >
                        <img
                          alt="Midone Tailwind HTML Admin Template"
                          class="border border-white rounded-md"
                          :src="fakerData[8].images[0]"
                        />
                      </Tippy>
                      <Tippy
                        as="div"
                        class="w-8 h-8 mr-1 image-fit zoom-in"
                        :content="fakerData[1].products[0].name"
                      >
                        <img
                          alt="Midone Tailwind HTML Admin Template"
                          class="border border-white rounded-md"
                          :src="fakerData[8].images[1]"
                        />
                      </Tippy>
                      <Tippy
                        as="div"
                        class="w-8 h-8 mr-1 image-fit zoom-in"
                        :content="fakerData[2].products[0].name"
                      >
                        <img
                          alt="Midone Tailwind HTML Admin Template"
                          class="border border-white rounded-md"
                          :src="fakerData[8].images[2]"
                        />
                      </Tippy>
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-4 text-xs text-center intro-x text-slate-500">
                12 November
              </div>
              <div class="relative flex items-center mb-3 intro-x">
                <div
                  class="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5"
                >
                  <div
                    class="flex-none w-10 h-10 overflow-hidden rounded-full image-fit"
                  >
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      :src="fakerData[7].photos[0]"
                    />
                  </div>
                </div>
                <div class="flex-1 px-5 py-3 ml-4 box zoom-in">
                  <div class="flex items-center">
                    <div class="font-medium">
                      {{ fakerData[7].users[0].name }}
                    </div>
                    <div class="ml-auto text-xs text-slate-500">07:00 PM</div>
                  </div>
                  <div class="mt-1 text-slate-500">
                    Has changed
                    <a class="text-primary" href="">
                      {{ fakerData[7].products[0].name }}
                    </a>
                    price and description
                  </div>
                </div>
              </div>
              <div class="relative flex items-center mb-3 intro-x">
                <div
                  class="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5"
                >
                  <div
                    class="flex-none w-10 h-10 overflow-hidden rounded-full image-fit"
                  >
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      :src="fakerData[6].photos[0]"
                    />
                  </div>
                </div>
                <div class="flex-1 px-5 py-3 ml-4 box zoom-in">
                  <div class="flex items-center">
                    <div class="font-medium">
                      {{ fakerData[6].users[0].name }}
                    </div>
                    <div class="ml-auto text-xs text-slate-500">07:00 PM</div>
                  </div>
                  <div class="mt-1 text-slate-500">
                    Has changed
                    <a class="text-primary" href="">
                      {{ fakerData[6].products[0].name }}
                    </a>
                    description
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END: Recent Activities -->
          <!-- BEGIN: Important Notes -->
          <div
            class="col-span-12 mt-3 md:col-span-6 xl:col-span-12 xl:col-start-1 xl:row-start-1 2xl:col-start-auto 2xl:row-start-auto"
          >
            <div class="flex items-center h-10 intro-x">
              <h2 class="mr-auto text-lg font-medium truncate">
                Important Notes
              </h2>
              <Button
                data-carousel="important-notes"
                data-target="prev"
                class="px-2 mr-2 border-slate-300 text-slate-600 dark:text-slate-300"
                @click="prevImportantNotes"
              >
                <Lucide icon="ChevronLeft" class="w-4 h-4" />
              </Button>
              <Button
                data-carousel="important-notes"
                data-target="next"
                class="px-2 mr-2 border-slate-300 text-slate-600 dark:text-slate-300"
                @click="nextImportantNotes"
              >
                <Lucide icon="ChevronRight" class="w-4 h-4" />
              </Button>
            </div>
            <div class="mt-5 intro-x">
              <div class="box zoom-in">
                <TinySlider refKey="importantNotesRef">
                  <div class="p-5">
                    <div class="text-base font-medium truncate">
                      Lorem Ipsum is simply dummy text
                    </div>
                    <div class="mt-1 text-slate-400">20 Hours ago</div>
                    <div class="mt-1 text-justify text-slate-500">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </div>
                    <div class="flex mt-5 font-medium">
                      <Button
                        variant="secondary"
                        type="button"
                        class="px-2 py-1"
                      >
                        View Notes
                      </Button>
                      <Button
                        variant="outline-secondary"
                        type="button"
                        class="px-2 py-1 ml-auto"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                  <div class="p-5">
                    <div class="text-base font-medium truncate">
                      Lorem Ipsum is simply dummy text
                    </div>
                    <div class="mt-1 text-slate-400">20 Hours ago</div>
                    <div class="mt-1 text-justify text-slate-500">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </div>
                    <div class="flex mt-5 font-medium">
                      <Button
                        variant="secondary"
                        type="button"
                        class="px-2 py-1"
                      >
                        View Notes
                      </Button>
                      <Button
                        variant="outline-secondary"
                        type="button"
                        class="px-2 py-1 ml-auto"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                  <div class="p-5">
                    <div class="text-base font-medium truncate">
                      Lorem Ipsum is simply dummy text
                    </div>
                    <div class="mt-1 text-slate-400">20 Hours ago</div>
                    <div class="mt-1 text-justify text-slate-500">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </div>
                    <div class="flex mt-5 font-medium">
                      <Button
                        variant="secondary"
                        type="button"
                        class="px-2 py-1"
                      >
                        View Notes
                      </Button>
                      <Button
                        variant="outline-secondary"
                        type="button"
                        class="px-2 py-1 ml-auto"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </TinySlider>
              </div>
            </div>
          </div>
          <!-- END: Important Notes -->
          <!-- BEGIN: Schedules -->
          <div
            class="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto"
          >
            <div class="flex items-center h-10 intro-x">
              <h2 class="mr-5 text-lg font-medium truncate">Schedules</h2>
              <a
                href=""
                class="flex items-center ml-auto truncate text-primary"
              >
                <Lucide icon="Plus" class="w-4 h-4 mr-1" /> Add New Schedules
              </a>
            </div>
            <div class="mt-5">
              <div class="intro-x box">
                <div class="p-5">
                  <div class="flex">
                    <Lucide icon="ChevronLeft" class="w-5 h-5 text-slate-500" />
                    <div class="mx-auto text-base font-medium">April</div>
                    <Lucide
                      icon="ChevronRight"
                      class="w-5 h-5 text-slate-500"
                    />
                  </div>
                  <div class="grid grid-cols-7 gap-4 mt-5 text-center">
                    <div class="font-medium">Su</div>
                    <div class="font-medium">Mo</div>
                    <div class="font-medium">Tu</div>
                    <div class="font-medium">We</div>
                    <div class="font-medium">Th</div>
                    <div class="font-medium">Fr</div>
                    <div class="font-medium">Sa</div>
                    <div class="py-0.5 rounded relative text-slate-500">29</div>
                    <div class="py-0.5 rounded relative text-slate-500">30</div>
                    <div class="py-0.5 rounded relative text-slate-500">31</div>
                    <div class="py-0.5 rounded relative">1</div>
                    <div class="py-0.5 rounded relative">2</div>
                    <div class="py-0.5 rounded relative">3</div>
                    <div class="py-0.5 rounded relative">4</div>
                    <div class="py-0.5 rounded relative">5</div>
                    <div
                      class="py-0.5 bg-success/20 dark:bg-success/30 rounded relative"
                    >
                      6
                    </div>
                    <div class="py-0.5 rounded relative">7</div>
                    <div class="py-0.5 bg-primary text-white rounded relative">
                      8
                    </div>
                    <div class="py-0.5 rounded relative">9</div>
                    <div class="py-0.5 rounded relative">10</div>
                    <div class="py-0.5 rounded relative">11</div>
                    <div class="py-0.5 rounded relative">12</div>
                    <div class="py-0.5 rounded relative">13</div>
                    <div class="py-0.5 rounded relative">14</div>
                    <div class="py-0.5 rounded relative">15</div>
                    <div class="py-0.5 rounded relative">16</div>
                    <div class="py-0.5 rounded relative">17</div>
                    <div class="py-0.5 rounded relative">18</div>
                    <div class="py-0.5 rounded relative">19</div>
                    <div class="py-0.5 rounded relative">20</div>
                    <div class="py-0.5 rounded relative">21</div>
                    <div class="py-0.5 rounded relative">22</div>
                    <div
                      class="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative"
                    >
                      23
                    </div>
                    <div class="py-0.5 rounded relative">24</div>
                    <div class="py-0.5 rounded relative">25</div>
                    <div class="py-0.5 rounded relative">26</div>
                    <div
                      class="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative"
                    >
                      27
                    </div>
                    <div class="py-0.5 rounded relative">28</div>
                    <div class="py-0.5 rounded relative">29</div>
                    <div class="py-0.5 rounded relative">30</div>
                    <div class="py-0.5 rounded relative text-slate-500">1</div>
                    <div class="py-0.5 rounded relative text-slate-500">2</div>
                    <div class="py-0.5 rounded relative text-slate-500">3</div>
                    <div class="py-0.5 rounded relative text-slate-500">4</div>
                    <div class="py-0.5 rounded relative text-slate-500">5</div>
                    <div class="py-0.5 rounded relative text-slate-500">6</div>
                    <div class="py-0.5 rounded relative text-slate-500">7</div>
                    <div class="py-0.5 rounded relative text-slate-500">8</div>
                    <div class="py-0.5 rounded relative text-slate-500">9</div>
                  </div>
                </div>
                <div class="p-5 border-t border-slate-200/60">
                  <div class="flex items-center">
                    <div class="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                    <span class="truncate">UI/UX Workshop</span>
                    <span class="font-medium xl:ml-auto">23th</span>
                  </div>
                  <div class="flex items-center mt-4">
                    <div class="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                    <span class="truncate"> VueJs Frontend Development </span>
                    <span class="font-medium xl:ml-auto">10th</span>
                  </div>
                  <div class="flex items-center mt-4">
                    <div class="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                    <span class="truncate">Laravel Rest API</span>
                    <span class="font-medium xl:ml-auto">31th</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END: Schedules -->
        </div>
      </div>
    </div>
  </div>
</template>
