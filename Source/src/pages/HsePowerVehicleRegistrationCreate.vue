<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, computed } from 'vue';
import axios from 'axios';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import Button from "@/components/Base/Button";
import { useRouter, useRoute } from 'vue-router';
import Notification from "@/components/Base/Notification";
import Lucide from "@/components/Base/Lucide";
import config from "@/config";
import { getToken } from '../auth/setToken'

import {
  FormInput,
  FormLabel,
  FormSwitch,
} from "@/components/Base/Form";
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import Toastify from 'toastify-js';
import Preview from "@/components/Base/Preview";
import Litepicker from "@/components/Base/Litepicker";
import Alert from "@/components/Base/Alert";
import _ from "lodash";
import fakerData from "@/utils/faker";
import Tippy from "@/components/Base/Tippy";
import Table from "@/components/Base/Table";
import TomSelect from "@/components/Base/TomSelect";

const formData = reactive({
  unit_name: '',
  vehicle_id: '',
  capacity: '',
  type_of_vehicle: '',
  vehicle_owner: '',
  manufacturer_company_name: '',
  last_maintenance_date: '',
  // tool_id_number: '',
  // tool_name: '',
  // tool_type: '',
  // tool_manufacturer: '',
  // tool_user: '',
  // tool_last_calibration_date:'',
  // tool_last_maintenance_date:'',
  // tool_enlistment_date:'',
  // visitor_name: '',
  // company_name: '',
  // whom_to_meet: '',
  // visit_purpose: '',
  // temp_id_card_no: '',
  // time_of_entry: '',
  // time_of_exit: '',
  // signature: [] as File[],
});

const state = reactive({
  token: getToken(),
  viewUnitName: [] as Array<any>,
  isEditMode: false,
  entryId: null as string | null,
});

const router = useRouter();
const route = useRoute();

const selectedUnitName = ref("");

const lastMaintenanceDate = ref("");

// const toolLastCalibrationDate = ref("");
// const toolLastMaintenanceDate = ref("");
// const toolEnlistmentDate = ref("");

// const handleFileChange = (event: Event) => {
//   const input = event.target as HTMLInputElement;
//   if (input.files) {
//     formData.signature = Array.from(input.files);
//   }
// };

const rules = {
  unit_name: { required,},
  vehicle_id: { required, minLength: minLength(1) },
  capacity: { required, integer },
  type_of_vehicle: { required, minLength: minLength(3) },
  vehicle_owner: { required, minLength: minLength(3) },
  manufacturer_company_name: { required, minLength: minLength(3) },
  last_maintenance_date: {required },
  // tool_id_number: { required, minLength: minLength(1) },
  // tool_name: { required, minLength: minLength(3) },
  // tool_type: { required, minLength: minLength(3) },
  // tool_manufacturer: { required, minLength: minLength(3) },
  // tool_user: { required, minLength: minLength(3) },
  // tool_last_calibration_date: {required },
  // tool_last_maintenance_date: {required },
  // tool_enlistment_date: {required },
  // visitor_name: { required, minLength: minLength(3) },
  // company_name: { required, minLength: minLength(3) },
  // whom_to_meet: { required, minLength: minLength(3) },
  // visit_purpose: { required, minLength: minLength(3) },
  // temp_id_card_no: { required, minLength: minLength(3) },
  // time_of_entry: { required, minLength: minLength(3) },
  // time_of_exit: { required, minLength: minLength(3) },
};

const validate = useVuelidate(rules, toRefs(formData));

const convertDateFormat = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const submitForm = async () => {

  formData.unit_name = selectedUnitName.value;

  formData.last_maintenance_date = convertDateFormat(lastMaintenanceDate.value);

  // formData.tool_last_calibration_date = convertDateFormat(toolLastCalibrationDate.value);
  // formData.tool_last_maintenance_date = convertDateFormat(toolLastMaintenanceDate.value);
  // formData.tool_enlistment_date = convertDateFormat(toolEnlistmentDate.value);

  validate.value.$touch();
  if (validate.value.$invalid) {
    FailedPopUp();
  } else {
    const form = new FormData();
    (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
      // form.append(key, formData[key] as string);
      const value = formData[key];
      console.log(`Appending to FormData: key=${key}, value=${value}`);
      form.append(key, value as string);
      // if (key !== 'signature') {
      //   form.append(key, formData[key] as string);
      // }
    });
    // formData.signature.forEach((file, index) => {
    //   form.append(`signature[${index}]`, file);
    // });

    try {
      let url = state.isEditMode
        ? `${config.baseURL}/api/v1/power-vehicle/update/${state.entryId}`
        : `${config.baseURL}/api/v1/power-vehicle`;

      const method = state.isEditMode ? 'put' : 'post';

      const response = await axios[method](url, form, {
        headers: {
          'Content-Type': state.isEditMode 
          ? 'application/json'  // JSON for PUT
          : 'multipart/form-data',  // FormData for POST
          'Authorization': state.token,
        },
      });

      console.log("shamim_res: ", response.data);
      router.push({ name: 'hse-power-vehicle-registration-list' });
      SuccessPopUp();
    } catch (error) {
      console.error('Error submitting form:', error);
      FailedPopUp();
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

const reverseDateFormat = (dateString: string): string => {
  const [day, month, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day); // Months are zero-based in JavaScript Date
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const fetchEntryData = async (id: string) => {
  try {
    const response = await axios.get(`${config.baseURL}/api/v1/power-vehicle/edit/${id}`, {
      headers: {
        'Authorization': state.token,
      },
    });

    const data = response.data.data;
    console.log('Fetched Data:', data);
    // Object.keys(formData).forEach((key) => {
    //   const formKey = key as keyof typeof formData;
    //   if (formKey in data) {
    //     // Handle the signature field separately
    //     if (formKey === 'signature') {
    //       // Ensure signature is always an array
    //       formData[formKey] = data[formKey] ? Array.isArray(data[formKey]) ? data[formKey] : [data[formKey]] : [];
    //     } else {
    //       formData[formKey] = data[formKey];
    //     }
    //   }
    // });

    Object.keys(formData).forEach((key) => {
      const formKey = key as keyof typeof formData;
      if (formKey in data) {
        formData[formKey] = data[formKey];
      }
    });

    selectedUnitName.value = data.unit_name;

    // Populate the date refs with the reversed date format
    lastMaintenanceDate.value = reverseDateFormat(data.last_maintenance_date);

    // toolLastCalibrationDate.value = reverseDateFormat(data.tool_last_calibration_date);
    // toolLastMaintenanceDate.value = reverseDateFormat(data.tool_last_maintenance_date);
    // toolEnlistmentDate.value = reverseDateFormat(data.tool_enlistment_date);
    
    console.log('Form Data after population:', formData);
  } catch (error) {
    console.error('Error fetching entry data:', error);
  }
};

onMounted(() => {
  fetchDropDownData();
  const entryId = route.params.id as string;
  if (entryId) {
    state.isEditMode = true;
    state.entryId = entryId;
    fetchEntryData(entryId);
  }
});

// Ext Function 
function FailedPopUp() {
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

function SuccessPopUp() {
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
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">{{ state.isEditMode ? 'Edit Power Vehicle Registration' : 'Add Power Vehicle Registration' }}</h2>
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
          Ensure to fill accurate online Power Vehicle Registration with correct date formats and file uploads in the specified format and size.
          <a
            href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
            class="ml-1 underline"
            target="blank"
          >
            Learn More
          </a>
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
      
      <!-- BEGIN: Power Vehicle Registration -->
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"> 
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
                                Unit Name is the location where energy is userd
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
                      <div class="flex items-center">
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Vehicle ID Number
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Vehicle ID Number
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="validate.vehicle_id.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.vehicle_id.$error,}" placeholder="Insert Vehicle ID Number"/>
                    
                    <div class="flex justify-between">
                      <template v-if="validate.vehicle_id.$error">
                        <div v-for="(error, index) in validate.vehicle_id.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
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
                      <div class="flex items-center">
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Capacity
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Capacity (must be number)
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="validate.capacity.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.capacity.$error,}" placeholder="Insert Capacity"/>
                    
                    <div class="flex justify-between">
                      <template v-if="validate.capacity.$error">
                        <div v-for="(error, index) in validate.capacity.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
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
                      <div class="flex items-center">
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Type of Vehicle
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Tool Type
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="validate.type_of_vehicle.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.type_of_vehicle.$error,}" placeholder="Insert Type of Vehicle"/>
                    
                    <div class="flex justify-between">
                      <template v-if="validate.type_of_vehicle.$error">
                        <div v-for="(error, index) in validate.type_of_vehicle.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
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
                      <div class="flex items-center">
                        <div class="font-medium text-sm flex mt-6 xl:mt-4">Vehicle Owner
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Vehicle Owner
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="validate.vehicle_owner.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.vehicle_owner.$error,}" placeholder="Insert Vehicle Owner"/>
                    
                    <div class="flex justify-between">
                      <template v-if="validate.vehicle_owner.$error">
                        <div v-for="(error, index) in validate.vehicle_owner.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
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
                      <div class="flex items-center">
                        <div class="font-medium text-sm flex mt-6 xl:mt-0">Manufacturer Company Name
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Manufacturer Company Name
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="validate.manufacturer_company_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.manufacturer_company_name.$error,}" placeholder="Insert Manufacturer Company Name"/>
                    
                    <div class="flex justify-between">
                      <template v-if="validate.manufacturer_company_name.$error">
                        <div v-for="(error, index) in validate.manufacturer_company_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
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
                        <div class="flex items-center">
                          <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Last Maintenance Date
                            <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The date when it was last maintained
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
                                v-model="lastMaintenanceDate"
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
                        <template v-if="validate.last_maintenance_date.$error">
                        <div v-for="(error, index) in validate.last_maintenance_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                        <p class="text-right mt-2 w-full"> Required</p>
                      </div>
                    </div>
                  </FormInline>
              </div>
            </div>
            <!-- <div class="md:w-1/2 w-full">
              <div class="px-4 py-2">
                <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel class="xl:w-40 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Tool Last Maintenance Date
                            <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The date when the tool last maintenance happend
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
                                v-model="toolLastMaintenanceDate"
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
                        <template v-if="validate.tool_last_maintenance_date.$error">
                        <div v-for="(error, index) in validate.tool_last_maintenance_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                        <p class="text-right mt-2 w-full"> Required</p>
                      </div>
                    </div>
                  </FormInline>
              </div>
            </div> -->
            <!-- <div class="md:w-1/2 w-full">
              <div class="px-4 py-2">
                <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel class="xl:w-40 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Tool Enlistment Date
                            <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The date when the tool Enlisted
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
                                v-model="toolEnlistmentDate"
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
                        <template v-if="validate.tool_enlistment_date.$error">
                        <div v-for="(error, index) in validate.tool_enlistment_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                        <p class="text-right mt-2 w-full"> Required</p>
                      </div>
                    </div>
                  </FormInline>
              </div>
            </div> -->
            <!-- <div class="md:w-1/2 w-full">
              <div class="px-4 py-2">
                <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel class="xl:w-40 xl:!mr-10">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Time of Entry
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Time of Entry
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="validate.time_of_entry.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.time_of_entry.$error,}" placeholder="Insert Time of Entry"/>
                    
                    <div class="flex justify-between">
                      <template v-if="validate.time_of_entry.$error">
                        <div v-for="(error, index) in validate.time_of_entry.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
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
                      <div class="flex items-center">
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Time of Exit
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Time of Exit
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="validate.time_of_exit.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.time_of_exit.$error,}" placeholder="Insert Time of Exit"/>
                    
                    <div class="flex justify-between">
                      <template v-if="validate.time_of_exit.$error">
                        <div v-for="(error, index) in validate.time_of_exit.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                    </div>
                  </div>
                </FormInline>
              </div>
            </div> -->
            <!-- <div class="md:w-1/2 w-full">
                <div class="px-4 py-2">
                  <FormInline class="flex flex-col flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel class="xl:w-40 xl:!mr-10">
                      <div class="text-left">
                        <div class="flex items-center">
                          <div class="font-medium text-sm flex mt-6 xl:mt-4">Signature
                            <span class="relative group cursor-pointer ml-1">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                              </svg>
                                <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                  Images showing Signature
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
                                
                              <div v-if="formData.signature.length" class="w-full space-y-2">
                                <div v-for="(file, index) in formData.signature" :key="index" class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow">
                                  <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                                </div>
                              </div>
                          </div>
                    </div>
                  </FormInline>
                </div>
            </div> -->
          </div>
        </div>
      </div>
      <!-- END: Power Vehicle Registration -->

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
            <a href="">Step 1</a>
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
              When filling out the safety of power tools report, be specific and clear with details, using the correct date format and precise descriptions..
            </div>
            <div class="mt-2">
              Ensure all required fields are accurately completed and boolean options are correctly marked. Upload relevant files and adhere to format and size requirements for attachments.
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
          <div class="font-medium">Power Vehicle Registration created successfully!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Power Vehicle Registration Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the filled form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>