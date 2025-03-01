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
    date: '',
    month: '',
    employee_name: '',
    designation: '',
    waste_name: '',
    waste_type: '',
    item_name: '',
    unit: '',
    waste: '',
    total_biodegradable_waste: '',
    total_no_biodegradable_waste: '',
    amount_of_waste: 0,
    attachement:[] as File[],

});
const state = reactive({
  token: getToken(),
  viewEmp: [] as Array<any>,
  viewUnitName: [] as Array<any>,

});
const router = useRouter();

const selectedUnitName = ref("");

const rules = {
        unit_name: {required,},
        date: {required,},
        month: {required,},
        employee_name: {required,},
        designation: {required,},
        waste_name: {required,},
        waste_type: {required,},
        item_name: {required,},
        unit: {required,},
        waste: {required,},
        amount_of_waste: {required,integer},
};

const validate = useVuelidate(rules, toRefs(formData));
const selectedFuel = ref("");
const selectedType = ref("");
const selectedItemNname = ref("");
const selectedCotton = ref("");
const selectedEmp = ref("");
const duedate = ref("");
const options = ref<string[]>([]);

const optionMapping: Record<string, string[]> = {
  biodegradable: ["Cutting Jhute", "Sewing Jhut", "Cut Piece", "Short Piece"],
  "non-biodegradable": ["Dust", "Chemical Contaminated", "Chemical Drum", "Burn Oil"],
};


watch(selectedCotton, (newValue) => {
  if (
    newValue === 'Cutting Jhute' ||
    newValue === 'Sewing Jhut' ||
    newValue === 'Cut Piece' ||
    newValue === 'Short Piece' ||
    newValue === 'Dust' ||
    newValue === 'Chemical Contaminated' ||
    newValue === 'Chemical Drum' ||
    newValue === 'Burn Oil'
  ) {
    formData.unit = 'Kg';
  } else {
    formData.unit = '';
  }
});


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
  formData.waste_type = selectedType.value;
  formData.date = duedate.value;
  formData.item_name = selectedItemNname.value;
  const duedateValue = duedate.value; 
  const shortMonth = duedateValue.split(" ")[1]?.trim().replace(",", "");
  const fullMonth = monthMap[shortMonth]; 
  formData.month = fullMonth;
  formData.waste = selectedCotton.value;
  
  formData.unit_name = selectedUnitName.value;
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {
      const form = new FormData();
            (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
            if (key !== 'attachement') {
                form.append(key, formData[key] as string);
            }
            });
            formData.attachement.forEach((file, index) => {
            form.append(`attachement[${index}]`, file);
            });

            try {
                let  url = config.baseURL+'/api/v1/non-hazardous-waste-inventory';
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,
                },
                });
                if (response.data != undefined){
                    SuccessPopUp();
                router.push({ name: 'waste-consumption-list' });

                }
        
            } catch (error) {
                FailedPopUp();
                console.error('Error submitting form:', error);
            } 
    }
};

watch(selectedItemNname, (newValue) => {
  if (newValue === 'Cutting Jhute' || newValue === 'Sewing Jhut' || newValue === 'Cut Piece' || newValue === 'Short Piece') {
    formData.unit = 'kg';
  } else if (newValue === 'Dust' || newValue === 'Chemical Contaminated' || newValue === 'Chemical Drum' || newValue === 'Burn Oil') {
    formData.unit = 'kg';
  } else {
    formData.unit = ''; // Clear or set default
  }
});

//fetch unit dropdown
const fetchDropDownData = async () => {
    try {
        let url = config.baseURL+'/api/v1/unit-name';
        const response = await axios.get(url, {
            headers: {
                'Authorization': state.token,
            },
        });
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
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.attachement = Array.from(input.files);
  }
};
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
    <h2 class="mr-auto text-lg font-medium">Add Wastege Inventory Report </h2>
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
          Create a form for managing Wastege Inventory Report, including fields for energy consumption data, date, and associated metrics.
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
                                  Unit Name is the location of waste handling
                                </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div class="flex-1 w-full mt-3 xl:mt-0">
                      <select id="crud-form-6" v-model="selectedUnitName"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                            <option value="" disabled>select unit name</option>
                            <option v-for="(data, index) in state.viewUnitName" :key="index" :value="data.name">{{ data.name }}</option>
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
                                    Date is the record of waste inventory
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
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Employee Name
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                  <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                    Employee Name is the responsible person for waste inventory
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                            <select id="crud-form-6" v-model="selectedEmp" @change="fetchSingleEmployee(selectedEmp)"   class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500 ">
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
                                    Specify the unit of measurement for the energy consumption
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
          <div class="flex items-center pb-5 mb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
              <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Supplied Data
          </div>
            <div class="flex flex-wrap">
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Waste Name
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                  <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                    Waste Name is the type of waste recorded
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.waste_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.waste_name.$error,}" placeholder="Input Waste Name"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.waste_name.$error">
                            <div v-for="(error, index) in validate.waste_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Waste Type
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                  <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                    Waste Type is the category of waste
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <!-- <FormInput id="crud-form-5" v-model.trim="validate.category.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.category.$error,}" placeholder="Input Category"/> -->

                          <select id="crud-form-6" v-model="selectedType"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                            <option value="" disabled>select waste type</option>
                            <option value="biodegradable">biodegradable</option>
                            <option value="non-biodegradable">Non-Biodegradable</option>
                          </select>
                          
                          <div class="flex justify-between">
                            <template v-if="validate.waste_type.$error">
                            <div v-for="(error, index) in validate.waste_type.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Item Name
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                  <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                    Item Name is the specific waste-related item
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <!-- <FormInput id="crud-form-5" v-model.trim="validate.category.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.category.$error,}" placeholder="Input Category"/> -->

                          <select id="crud-form-6" v-model="selectedItemNname"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                            <option value="" disabled>Item Name</option>
                            <option value="Cotton Fabric Waste">Cotton Fabric Waste</option>
                            <option value="Cotton Thread Waste">Cotton Thread Waste</option>
                            <option value="Cotton Waste Scraps">Cotton Waste Scraps</option>
                            <option value="Cotton Linters Waste">Cotton Linters Waste</option>
                            <option value="Cotton Bale Waste">Cotton Bale Waste</option>
                            <option value="Cotton Yarn Waste">Cotton Yarn Waste</option>
                            <option value="Cotton Waste from Spinning">Cotton Waste from Spinning</option>
                            <option value="Cotton Waste from Weaving">Cotton Waste from Weaving</option>
                            <option value="Cotton Waste from Dyeing Process">Cotton Waste from Dyeing Process</option>
                          </select>
                          
                          <div class="flex justify-between">
                            <template v-if="validate.item_name.$error">
                            <div v-for="(error, index) in validate.item_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Cotton
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                  <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                    Cotton is a type of waste material
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <!-- <FormInput id="crud-form-5" v-model.trim="validate.category.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.category.$error,}" placeholder="Input Category"/> -->

                          <select id="crud-form-6" v-model="selectedCotton"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                            <option value="" disabled>cotton</option>
                            <option value="Cutting Jhute">Cutting Jhute</option>
                            <option value="Sewing Jhut">Sewing Jhut</option>
                            <option value="Cut Piece">Cut Piece</option>
                            <option value="Short Piece">Short Piece</option>
                            <option value="Chemical Contaminated">Chemical Contaminated</option>
                            <option value="Chemical Drum">Chemical Drum</option>
                            <option value="Burn Oil">Burn Oil</option>
                            <option value="Dust">Dust</option>
                          </select>
                          
                          <div class="flex justify-between">
                            <template v-if="validate.waste.$error">
                            <div v-for="(error, index) in validate.waste.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Unit
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                  <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                    Unit is the measurement standard for waste quantity
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.unit.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unit.$error,}" placeholder="Input Energy Used"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.unit.$error">
                            <div v-for="(error, index) in validate.unit.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Amount of Waste
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                  <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                    Amount of Waste is the quantity of waste generated
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.amount_of_waste.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.amount_of_waste.$error,}" placeholder="Input Amount of Waste"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.amount_of_waste.$error">
                            <div v-for="(error, index) in validate.amount_of_waste.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm flex mt-6 xl:mt-3.5">Total Biodegradable Waste
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                  <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                    Total Biodegradable Waste is organic waste that decomposes
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model="formData.total_biodegradable_waste" class="w-full" type="text" name="name":class="{ 'border-danger': validate.waste_name.$error,}" placeholder="Input Waste Name"/> 
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
                              <div class="font-medium text-sm flex mt-6 xl:mt-3.5">Total No Biodegradable Waste
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                  <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                    Total Non-Biodegradable Waste is waste that doesn't decompose
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model="formData.total_no_biodegradable_waste" class="w-full" type="text" name="name":class="{ 'border-danger': validate.waste_name.$error,}" placeholder="Input Waste Name"/> 
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
              
                <div class="w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-col flex-wrap md:flex-nowrap  pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center pr-4">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Attachement
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                  <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                    Attachment is the file linked to the waste record
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                              <div class="flex flex-col items-center justify-center w-full space-y-4">
                                    <label for="file-upload" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-300">
                                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12a4 4 0 014-4h3m5 8h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.707 2.707a1 1 0 01-.707.293H13m-4 8H6a2 2 0 01-2-2v-5a2-2h2.586c.265 0 .52.105.707.293l2.707 2.707a1 1 0 00.707.293H18m0 0l2 2M15 12v2m4 0l-4-4"></path>
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                                        <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                      </div>
                                      <input id="file-upload" type="file" class="hidden" multiple @change="handleFileChange"/>
                                    </label>
                                    
                                  <div v-if="formData.attachement.length" class="w-full space-y-2">
                                    <div v-for="(file, index) in formData.attachement" :key="index" class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow">
                                      <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                                    </div>
                                  </div>
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
            <a href="">Wastege Inventory Report</a>
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
          <div class="font-medium text-nowrap">Wastege Inventory Report Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium text-nowrap">Wastege Inventory Report Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>