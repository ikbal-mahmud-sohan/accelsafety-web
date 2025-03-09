<script setup lang="ts">
import { ref, reactive, toRefs,onMounted, watch } from 'vue';
import axios from 'axios';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import Button from "@/components/Base/Button";
import { useRouter } from 'vue-router';
import Notification from "@/components/Base/Notification";
import Lucide from "@/components/Base/Lucide";
import config from "@/config";
import Preview from "@/components/Base/Preview";
import Litepicker from "@/components/Base/Litepicker";
import { getToken } from './../auth/setToken'

import {
  FormInput,
  FormLabel,
  FormSwitch,
} from "@/components/Base/Form";
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import Toastify from 'toastify-js';
import Alert from "@/components/Base/Alert";
import _ from "lodash";


const formData = reactive({
    unit_name: '',
    month: '',
    date: '',
    employee_name: '',
    designation: '',
    ground_water: '',
    ground_water_unit: '',
    gw_last_flow_meter: '',
    gw_current_flow_meter: '',
    rain_water: '',
    rain_water_unit: '',
    rw_last_flow_meter: '',
    rw_current_flow_meter: '',
    domestic_water: '',
    domestic_water_unit: '',
    dw_last_flow_meter: '',
    dw_current_flow_meter: '',
    process_water: '',
    process_water_unit: '',
    pw_last_flow_meter: '',
    pw_current_flow_meter: '',
    etp_inlet_water: '',
    etp_inlet_water_unit: '',
    eiw_last_flow_meter: '',
    eiw_current_flow_meter: '',
    etp_outlet_water: '',
    etp_outlet_water_unit: '',
    eow_last_flow_meter: '',
    eow_current_flow_meter: '',
});
const state = reactive({
  token: getToken(),
  viewEmp: [] as Array<any>,
  viewUnitName: [] as Array<any>,

});
const router = useRouter();
const selectedType = ref("");
const selectedEmp = ref("");
const duedate = ref("");
const selectedUnitName = ref("");

const rules = {
        unit_name: {required,},
        month: {required,},
        date: {required,},
        employee_name: {required,},
        designation: {required,},
        ground_water: {required, integer},
        rain_water: {required, integer},
        domestic_water: {required, integer},
        process_water: {required, integer},
        etp_inlet_water: {required,integer},
        etp_outlet_water: {required,integer},
        gw_last_flow_meter: {integer},
        gw_current_flow_meter: {integer},
        rw_last_flow_meter: {integer},
        rw_current_flow_meter: {integer},
        dw_last_flow_meter: {integer},
        dw_current_flow_meter: {integer},
        pw_last_flow_meter: {integer},
        pw_current_flow_meter: {integer},
        eiw_last_flow_meter: {integer},
        eiw_current_flow_meter: {integer},
        eow_last_flow_meter: {integer},
        eow_current_flow_meter: {integer},
};



const validate = useVuelidate(rules, toRefs(formData));
const selectedMonth = ref("");


const submitForm = async () => {
  const monthMap: { [key: string]: string } = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };
  formData.date = duedate.value;
  const duedateValue = duedate.value; 
  const shortMonth = duedateValue.split(" ")[1]?.trim().replace(",", "");
  const fullMonth = monthMap[shortMonth]; 
  formData.month = fullMonth;
  formData.ground_water_unit = "m3";
  formData.rain_water_unit = "m3";
  formData.domestic_water_unit = "m3";
  formData.process_water_unit = "m3";
  formData.etp_inlet_water_unit = "m3";
  formData.etp_outlet_water_unit = "m3";
  formData.unit_name = selectedUnitName.value;
  
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {

            try {
                // let  url = config.baseURL+'/api/v1/water-consumption';
                let  url = config.baseURL+'/api/v1/water-consumption';
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,
                },
                });
                console.log("shamim object: ", response.data);
                if (response.data != undefined){
                    SuccessPopUp();
                router.push({ name: 'water-consumption-list' });

                }
        
            } catch (error) {
                FailedPopUp();
                console.error('Error submitting form:', error);
            }
        
    }
};

//fetch unit dropdown
const fetchDropDownData = async () => {
    try {
        let url = config.baseURL+'/api/v1/unit-name';
        const response = await axios.get(url, {
            headers: {
                'Authorization': state.token,
            },
        });
        // console.log("Shamim dropdown: ", response.data.data);
        // state.viewUnitName = response.data.RespDepartment;
        state.viewUnitName = response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Ext Function 

function FailedPopUp(){
    const failedEl = document
        .querySelectorAll("#failed-notification-content")[0]
        .cloneNode(true) as HTMLElement;
        failedEl.classList.remove("hidden");
        Toastify({
        node: failedEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        }).showToast();
}
function SuccessPopUp(){
 
    const successEl = document
        .querySelectorAll("#success-notification-content")[0]
        .cloneNode(true) as HTMLElement;
        successEl.classList.remove("hidden");
        Toastify({
        node: successEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        }).showToast();
}
const fetchEmpData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/employee';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.viewEmp = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchSingleEmployee = async (ID:string) => {
  console.log("ID",ID)
  try {
   let  url = config.baseURL+'/api/v1/employee/'+ID;
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    formData.designation = response.data.data.designation;
    formData.employee_name = response.data.data.name;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
onMounted(() => {
  fetchDropDownData();
  fetchEmpData();
});

</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Add Water Consumption </h2>
  </div>
  <div class="grid grid-cols-11 pb-20 mt-5 gap-x-6">
    <!-- BEGIN: Notification -->
    <Alert
      variant="primary"
      dismissible
      class="col-span-11 mb-6 intro-y box dark:border-darkmode-600"
      v-slot="{ dismiss }"
    >
      <div class="flex items-center">
        <span>
          <Lucide icon="Info" class="w-4 h-4 mr-2" />
        </span>
        <span>
          Create a form for managing Water Consumption, including fields for energy consumption data, date, and associated metrics.
        </span>
        <Alert.DismissButton
          class="text-white"
          @click="dismiss"
          aria-label="Close"
        >
          <Lucide icon="X" class="w-4 h-4" />
        </Alert.DismissButton>
      </div>
    </Alert>
    
    <!-- BEGIN: Notification -->
    <div class="col-span-11 intro-y 2xl:col-span-9">
      <!-- BEGIN: Uplaod Product -->
      
      <!-- BEGIN: Product Information -->
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5  border rounded-md border-slate-200/60 dark:border-darkmode-400"> 
          <div class="flex items-center pb-5 mb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
              <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Basic Info
          </div>
            <div class="flex flex-wrap">
              <div class="md:w-1/2 w-full">
                <div class="px-4 py-2">
                  <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel class="xl:w-40 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Unit Name
                            <span class="relative group cursor-pointer ml-1">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                              </svg>
                                <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                  Unit Name is the location where water is consumed
                                </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <select id="crud-form-6" v-model="selectedUnitName"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                            <option value="" disabled>select unit name</option>
                            <option v-for="(data, index) in state.viewUnitName" :key="index" :value="data.unit_name">{{ data.unit_name }}</option>
                      </select>
                    
                      <div class="flex justify-between">
                        <template v-if="validate.unit_name.$error">
                        <div v-for="(error, index) in validate.unit_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                        <p class="text-right mt-2 w-full"> Required</p>
                      </div>
                    </div>
                  </FormInline>
                </div>
              </div>
               
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Date
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Date is the day of water consumption record
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <Preview class="intro-y box" v-slot="{ toggle }">
                            <Preview.Panel>
                                <div class="relative w-full mx-auto">
                                  <div
                                    class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400 z-10">
                                    <Lucide icon="Calendar" class="w-4 h-4" />
                                  </div>
                                  <Litepicker
                                    v-model="duedate"
                                    :options="{
                                      autoApply: false,
                                      showWeekNumbers: true,
                                      dropdowns: {
                                        minYear: 1990,
                                        maxYear: null,
                                        months: true,
                                        years: true,
                                      },
                                    }"
                                    class="pl-12"/>
                                </div>
                              </Preview.Panel>
                              <Preview.Panel type="source">
                                <Preview.Highlight>
                                  {{`
                                  <div class="relative w-56 mx-auto">
                                    <div
                                      class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"
                                    >
                                      <Lucide icon="Calendar" class="w-4 h-4" />
                                    </div>
                                    <Litepicker
                                      v-model="date"
                                      :options="{
                                        autoApply: false,
                                        showWeekNumbers: true,
                                        dropdowns: {
                                          minYear: 1990,
                                          maxYear: null,
                                          months: true,
                                          years: true,
                                        },
                                      }"
                                      class="pl-12"
                                    />
                                  </div>
                                  `}}
                                </Preview.Highlight>
                              </Preview.Panel>
                          
                          </Preview>
                          <div class="flex justify-between">
                            <template v-if="validate.date.$error">
                            <div v-for="(error, index) in validate.date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Employee Name
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md z-50">
                                      Employee Name is the person responsible for water consumption tracking.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                            <select id="crud-form-6" v-model="selectedEmp" @change="fetchSingleEmployee(selectedEmp)"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500 ">
                                      <option value="" disabled>select responsible name</option>
                                      <option v-for="(data, index) in state.viewEmp" :key="index" :value="data.id">{{ data.name }}</option>
                            </select>
                          <div class="flex justify-between">
                            <template v-if="validate.employee_name.$error">
                            <div v-for="(error, index) in validate.employee_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Designation
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Designation is the job title of the employee responsible for water consumption
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.designation.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.designation.$error,}" placeholder="Input Designation"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.designation.$error">
                            <div v-for="(error, index) in validate.designation.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>
            </div>
          
        </div>
      </div>
      
      <div class="p-5 mt-5 intro-y box">
        <div class="flex items-center pb-5 mb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
              <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Inlet
          </div>
        <div class="p-5 mb-4  border rounded-md border-slate-200/60 dark:border-darkmode-400"> 
            <div class="flex flex-wrap">
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                         
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Ground Water
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Ground Water is the water sourced from underground reservoirs
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.ground_water.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ground_water.$error,}" placeholder="Input rain waterr"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.ground_water.$error">
                            <div v-for="(error, index) in validate.ground_water.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>     
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Ground Water Unit
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Ground Water Unit is the measurement unit for groundwater consumption
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" value="m3" readonly class="w-full" type="text" name="name" placeholder="Input Ground Water Unit"/>
                        </div>
                      </FormInline>
                    </div>
                </div>     
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Last Flow Meter
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Last Flow Meter Reading is the most recent measurement of water flow
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.gw_last_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.gw_last_flow_meter.$error,}" placeholder="Input Last Flow Meter Reading"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.gw_last_flow_meter.$error">
                            <div v-for="(error, index) in validate.gw_last_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>    
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Current Flow Meter
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Current Flow Meter Reading is the latest measurement of water flow at the moment.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.gw_current_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.gw_current_flow_meter.$error,}" placeholder="Input Ground Water Unit"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.gw_current_flow_meter.$error">
                            <div v-for="(error, index) in validate.gw_current_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>    
            </div>
        </div>
        <div class="p-5 mt-4 border rounded-md border-slate-200/60 dark:border-darkmode-400"> 
            <div class="flex flex-wrap">
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Rain Water
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Rain Water is water collected from precipitation for use in operations
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.rain_water.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.rain_water.$error,}" placeholder="Input rain waterr"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.rain_water.$error">
                            <div v-for="(error, index) in validate.rain_water.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>     
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Rain Water Unit
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Rain Water Unit is the measurement unit for rainwater collected or used
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" value="m3" readonly class="w-full" type="text" name="name" placeholder="Input Rain Water Unit"/>
                        </div>
                      </FormInline>
                    </div>
                </div>     
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Last Flow Meter
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Last Flow Meter Reading is the previous recorded value of water flow.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <!-- <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model="formData.rw_last_flow_meter" class="w-full" type="text" name="name" placeholder="Input Last Flow Meter Reading"/>
                        </div> -->
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.rw_last_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.rw_last_flow_meter.$error,}" placeholder="Input Last Flow Meter Reading"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.rw_last_flow_meter.$error">
                            <div v-for="(error, index) in validate.rw_last_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>    
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Current Flow Meter
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Current Flow Meter Reading is the most recent value of water flow recorded
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.rw_current_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.rw_current_flow_meter.$error,}" placeholder="Input Current Flow Meter Reading"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.rw_current_flow_meter.$error">
                            <div v-for="(error, index) in validate.rw_current_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>    
            </div>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="flex items-center pb-5 mb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
              <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Process
          </div>
        <div class="p-5 mb-4 border rounded-md border-slate-200/60 dark:border-darkmode-400"> 
            <div class="flex flex-wrap">
              <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap xl:text-wrap flex mt-6 xl:mt-3.5">Domestic Water Consumption
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The total amount of water used for domestic purposes.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.domestic_water.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.domestic_water.$error,}" placeholder="Input Domestic Water"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.domestic_water.$error">
                            <div v-for="(error, index) in validate.domestic_water.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>   
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Domestic Water Unit
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The measurement unit for domestic water consumption.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" value="m3" readonly class="w-full" type="text" name="name" placeholder="Input Domestic Water Unit"/>
                        </div>
                      </FormInline>
                    </div>
                </div>     
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Last Flow Meter
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The previous recorded value of the water flow.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.dw_last_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.dw_last_flow_meter.$error,}" placeholder="Input Last Flow Meter Reading"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.dw_last_flow_meter.$error">
                            <div v-for="(error, index) in validate.dw_last_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>    
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Current Flow Meter
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The most recent recorded value of water flow.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.dw_current_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.dw_current_flow_meter.$error,}" placeholder="Input Current Flow Meter Reading"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.dw_current_flow_meter.$error">
                            <div v-for="(error, index) in validate.dw_current_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>    
            </div>
        </div>
        <div class="p-5 mt-4 border rounded-md border-slate-200/60 dark:border-darkmode-400"> 
            <div class="flex flex-wrap">
              <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm flex flex-wrap xl:flex-nowrap mt-6 xl:mt-3.5">Process Water Consumption
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The total amount of water used in the industrial or operational processes
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.process_water.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.process_water.$error,}" placeholder="Input Process Water Consumption"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.process_water.$error">
                            <div v-for="(error, index) in validate.process_water.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>  
                
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Process Water Unit
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The measurement unit for process water consumption.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" value="m3" readonly class="w-full" type="text" name="name" placeholder="Input Process Water Unit"/>
                        </div>
                      </FormInline>
                    </div>
                </div>     
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Last Flow Meter Reading
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The previous recorded value of water flow for the process.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <!-- <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model="formData.pw_last_flow_meter" class="w-full" type="text" name="name" placeholder="Input Last Flow Meter Reading"/>
                        </div> -->
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.pw_last_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.pw_last_flow_meter.$error,}" placeholder="Input Last Flow Meter Reading"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.pw_last_flow_meter.$error">
                            <div v-for="(error, index) in validate.pw_last_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>    
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Current Flow Meter
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The most recent recorded value of water flow for the process.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <!-- <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model="formData.pw_current_flow_meter" class="w-full" type="text" name="name" placeholder="Input Current Flow Meter Reading"/>
                        </div> -->
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.pw_current_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.pw_current_flow_meter.$error,}" placeholder="Input Current Flow Meter Reading"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.pw_current_flow_meter.$error">
                            <div v-for="(error, index) in validate.pw_current_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>    
            </div>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="flex items-center pb-5 mb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
              <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Output
          </div>
        <div class="p-5 mb-4 border rounded-md border-slate-200/60 dark:border-darkmode-400"> 
            <div class="flex flex-wrap">
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">ETP Inlet Water
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      ETP Inlet Water is the water entering the Effluent Treatment Plant (ETP) for treatment.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.etp_inlet_water.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.etp_inlet_water.$error,}" placeholder="Input Etp Inlet Water"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.etp_inlet_water.$error">
                            <div v-for="(error, index) in validate.etp_inlet_water.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div> 
                
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Etp Inlet Water
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      ETP Inlet Water Unit is the measurement unit for water entering the Effluent Treatment Plant
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" value="m3" readonly class="w-full" type="text" name="name" placeholder="Input Etp Inlet Water Unit"/>
                        </div>
                      </FormInline>
                    </div>
                </div>     
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Last Flow Meter
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Last Flow Meter Reading is the previous recorded value of water flow at the ETP inlet
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <!-- <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model="formData.eiw_last_flow_meter" class="w-full" type="text" name="name" placeholder="Input Last Flow Meter Reading"/>
                        </div> -->
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.eiw_last_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.eiw_last_flow_meter.$error,}" placeholder="Input Last Flow Meter Reading"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.eiw_last_flow_meter.$error">
                            <div v-for="(error, index) in validate.eiw_last_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                        
                      </FormInline>
                    </div>
                </div>    
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Current Flow Meter
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Current Flow Meter Reading is the latest water flow value at the ETP inlet.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <!-- <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model="formData.eiw_current_flow_meter" class="w-full" type="text" name="name" placeholder="Input Current Flow Meter Reading"/>
                        </div> -->
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.eiw_current_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.eiw_current_flow_meter.$error,}" placeholder="Input Current Flow Meter Reading"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.eiw_current_flow_meter.$error">
                            <div v-for="(error, index) in validate.eiw_current_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>    
            </div>
        </div>
        <div class="p-5 mt-4  border rounded-md border-slate-200/60 dark:border-darkmode-400"> 
            <div class="flex flex-wrap">
              <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">ETP Outlet Wate
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      ETP Outlet Water is treated water discharged from the plant.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.etp_outlet_water.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.etp_outlet_water.$error,}" placeholder="Input etp Outlet Water"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.etp_outlet_water.$error">
                            <div v-for="(error, index) in validate.etp_outlet_water.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div> 
                
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Etp Outlet Water
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      ETP Outlet Water Unit is the measurement unit for treated water.
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" value="m3" readonly class="w-full" type="text" name="name" placeholder="Input Etp Outlet Water Unit"/>
                        </div>
                      </FormInline>
                    </div>
                </div>     
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Last Flow Meter
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Last Flow Meter Reading is the previous water flow value
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <!-- <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model="formData.eow_last_flow_meter" class="w-full" type="text" name="name" placeholder="Input Last Flow Meter Reading"/>
                        </div> -->
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.eow_last_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.eow_last_flow_meter.$error,}" placeholder="Input Last Flow Meter Reading"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.eow_last_flow_meter.$error">
                            <div v-for="(error, index) in validate.eow_last_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>    
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Current Flow Meter
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Current Flow Meter Reading is the latest water flow value
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <!-- <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model="formData.eow_current_flow_meter" class="w-full" type="text" name="name" placeholder="Input Current Flow Meter Reading"/>
                        </div> -->
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.eow_current_flow_meter.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.eow_current_flow_meter.$error,}" placeholder="Input Current Flow Meter Reading"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.eow_current_flow_meter.$error">
                            <div v-for="(error, index) in validate.eow_current_flow_meter.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>    
            </div>
        </div>
      </div>
      
      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <Button
          type="button"class="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52">
          Cancel
        </Button>
        <Button variant="primary" type="button" class="w-full py-3 md:w-52" @click="submitForm">
          Submit
        </Button>
      </div>
    </div>
    <div class="hidden col-span-2 intro-y 2xl:block">
      <div class="sticky top-0 pt-10">
        <ul
          class="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]"
        >
          <li
            class="pl-5 mb-4 font-medium border-l-2 border-primary dark:border-primary text-primary"
          >
            <a href="">Water Consumption</a>
          </li>
          <li
            class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent"
          >
            <a href="">Be Specific and Clear</a>
          </li>
          <li
            class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent"
          >
            <a href="">Check Input Requirements</a>
          </li>
          <li
            class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent"
          >
            <a href="">Upload Relevant Files</a>
          </li>
          
        </ul>
        <div
          class="relative p-5 mt-10 border rounded-md bg-warning/20 dark:bg-darkmode-600 border-warning dark:border-0"
        >
          <Lucide
            icon="Lightbulb"
            class="absolute top-0 right-0 w-12 h-12 mt-5 mr-3 text-warning/80"
          />
          <h2 class="mt-5 text-lg font-medium">Tips</h2>
          <div
            class="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-500"
          >
            <div>
              Provide clear and accurate details, follow the correct date format, complete all required fields, and ensure the correct file format and size when uploading attachments.
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
   <!-- BEGIN: Success Notification Content -->
   <Notification id="success-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium text-nowrap">Water Consumption Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium text-nowrap">Water Consumption Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>