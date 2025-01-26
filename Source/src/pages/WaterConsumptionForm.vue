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
    unit_name: '', // Corresponds to 'month'
    month: '', // Corresponds to 'month'
    date: '', // Corresponds to 'month'
    employee_name: '', // Corresponds to 'month'
    designation: '', // Corresponds to 'month'
    process_water: '', // Corresponds to 'process_water'
    domestic_water: '', // Corresponds to 'domestic_water'
    etp_inlet_water: '', // Corresponds to 'etp_inlet_water'
    etp_outlet_water: '', // Corresponds to 'etp_outlet_water'
    deviation_of_etp_discharge: '', // Corresponds to 'deviation_of_etp_discharge'
    dying_re_use_water: '', // Corresponds to 'dying_re_use_water'
    rain_water: '', // Corresponds to 'rain_water'
});
const state = reactive({
  token: getToken(),
  viewEmp: [] as Array<any>,


});
const router = useRouter();
const selectedType = ref("");
const selectedEmp = ref("");
const duedate = ref("");

const rules = {
        unit_name: {required,},
        month: {required,},
        date: {required,},
        employee_name: {required,},
        designation: {required,},
        process_water: {required, integer},
        domestic_water: {required, integer},
        etp_inlet_water: {required, integer},
        etp_outlet_water: {required, integer},
        deviation_of_etp_discharge: {required,integer},
        dying_re_use_water: {required,integer},
        rain_water: {required,integer},
};

const validate = useVuelidate(rules, toRefs(formData));
const selectedMonth = ref("");


const submitForm = async () => {
  formData.month = selectedMonth.value;
  formData.date = duedate.value;
  
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {

            try {
                let  url = config.baseURL+'/api/v1/water-consumption';
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,
                },
                });
                console.log("xyz", response.data)
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
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"> 
            <div class="flex flex-wrap">
              <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Unit Name</div>
                              
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Specify the unit of measurement for the energy consumption.
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.unit_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unit_name.$error,}" placeholder="Input Unit Name"/>  
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
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">Month</div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Select the month for the energy record.
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <!-- <FormInput id="crud-form-5" v-model.trim="validate.category.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.category.$error,}" placeholder="Input Category"/> -->

                          <select id="crud-form-6" v-model="selectedMonth"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                                <option value="" disabled>Select Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                          </select>
                          
                          <div class="flex justify-between">
                            <template v-if="validate.month.$error">
                            <div v-for="(error, index) in validate.month.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">Date</div>
                              
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              The deadline for completing the corrective actions.
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <Preview class="intro-y box" v-slot="{ toggle }">
                            <Preview.Panel>
                                <div class="relative w-full mx-auto">
                                  <div
                                    class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
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
                            <p class="text-right mt-2 w-full"> Required</p>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Employee Name</div>
                              
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Enter the name of the company associated with the energy record.
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
                            <p class="text-right mt-2 w-full"> Required</p>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Designation</div>
                              
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Specify the unit of measurement for the energy consumption.
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
                            <p class="text-right mt-2 w-full"> Required</p>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>
            </div>
          
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"> 
            <div class="flex flex-wrap">
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Ground Water</div>
                              
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Specify the ground water of measurement for the energy consumption.
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.dying_re_use_water.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.dying_re_use_water.$error,}" placeholder="Input Ground Water"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.dying_re_use_water.$error">
                            <div v-for="(error, index) in validate.dying_re_use_water.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Rain Water</div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Specify the rainwaterr of measurement for the energy consumption.
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
                            <p class="text-right mt-2 w-full"> Required</p>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Domestic Water Consumption</div>
                              
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Specify the domestic_water of measurement for the energy consumption.
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
                            <p class="text-right mt-2 w-full"> Required</p>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>
 
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Process Water Consumption</div>
                              
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Enter the name of the company associated with the energy record.
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
                            <p class="text-right mt-2 w-full"> Required</p>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>
   
               
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">ETP Inlet Water</div>
                              
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Specify the ETP Inlet Water of measurement for the energy consumption.
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
                            <p class="text-right mt-2 w-full"> Required</p>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">ETP Outlet Water</div>
                              
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Specify the ETP Outlet Water of measurement for the energy consumption.
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
                            <p class="text-right mt-2 w-full"> Required</p>
                          </div>
                        </div>
                      </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Deviation of ETP Discharge</div>
                              
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Specify the deviation of etp discharge of measurement for the energy consumption.
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.deviation_of_etp_discharge.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.deviation_of_etp_discharge.$error,}" placeholder="Input deviation of etp discharge"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.deviation_of_etp_discharge.$error">
                            <div v-for="(error, index) in validate.deviation_of_etp_discharge.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            <p class="text-right mt-2 w-full"> Required</p>
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
          Save
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