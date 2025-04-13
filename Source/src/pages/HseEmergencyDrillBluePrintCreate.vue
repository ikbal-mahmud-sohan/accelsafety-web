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
import { required, minLength, email, integer, maxLength, helpers } from '@vuelidate/validators';
import Toastify from 'toastify-js';
import Preview from "@/components/Base/Preview";
import Litepicker from "@/components/Base/Litepicker";
import Alert from "@/components/Base/Alert";
import _ from "lodash";
import fakerData from "@/utils/faker";
import Tippy from "@/components/Base/Tippy";
import Table from "@/components/Base/Table";
import TomSelect from "@/components/Base/TomSelect";

const formState = reactive({
  date: '',
  time: '',
  title: '',
  emergency_simulation: '',
  location: '',
  incident_initiator: '',
  emergency_communication: '',
  observers: '',
  location_data: {
    area: 'TEJ WH', // dynamic area
    entries: [
      {
        type: 'employees_selected_for_participation',
        management: '',
        non_management: '',
        contractor: ''
      },
      {
        type: 'employees_will_stay_at_the_office',
        management: '',
        non_management: '',
        contractor: ''
      }
    ]
  },
  fire_scenario: '',
  site_main_controller_responsibility: '',
  site_incident_controller_responsibility: '',
  emergency_response_team_responsibility: '',
  employees_responsibility: '',
});



const router = useRouter();
const route = useRoute();


const rules = {
  date: { required, minLength: minLength(3) },
  time: { required, minLength: minLength(3) },
  title: { required, minLength: minLength(3) },
  emergency_simulation: { required, minLength: minLength(3) },
  location: { required, minLength: minLength(3) },
  incident_initiator: { required, minLength: minLength(3) },
  emergency_communication: { required, minLength: minLength(3) },
  observers: { required, minLength: minLength(3) },
  location_data: {
    area: { required, minLength: minLength(3) },
    entries: {
      $each: {
        management: { required, minLength: minLength(3) },
        non_management: { required, minLength: minLength(3) },
        contractor: { required, minLength: minLength(3) }
      }
    }
  },
  fire_scenario: { required, minLength: minLength(3) },
  site_main_controller_responsibility: { required, minLength: minLength(3) },
  site_incident_controller_responsibility: { required, minLength: minLength(3) },
  emergency_response_team_responsibility: { required, minLength: minLength(3) },
  employees_responsibility: { required, minLength: minLength(3) },
};

const componentState = reactive({
  token: getToken(),
  isEditMode: false,
  entryId: null as string | null,
});

const v$ = useVuelidate(rules, formState);
// const validate = useVuelidate(rules, toRefs(formData));


// const submitForm = async () => {


//   v$.value.$touch();
//   if (v$.value.$invalid) {
//     FailedPopUp();
//   } else {
//     // const form = new FormData();
//     // (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
      
//     //   const value = formData[key];
//     //   console.log(`Appending to FormData: key=${key}, value=${value}`);
//     //   form.append(key, value as string);
//     // });

//     try {
//       const payload = {
//         ...formState,
//         location_data: formState.location_data.map(item => ({
//           employees_selected: item.employees_selected,
//           management: item.management,
//           non_management: item.non_management,
//           contractor: item.contractor
//         }))
//       };

//       let url = componentState.isEditMode
//         ? `${config.baseURL}/api/v1/emergency-drill-blueprint/update/${componentState.entryId}`
//         : `${config.baseURL}/api/v1/emergency-drill-blueprint`;

//       const response = await axios.post(url, payload, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': componentState.token,
//         },
//       });

//       console.log("shamim_res: ", response.data);
//       router.push({ name: 'hse-first-aid-list' });
//       SuccessPopUp();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       FailedPopUp();
//     }
//   }
// };

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    FailedPopUp();
    return;
  }

  try {
    // Prepare the payload to match your formState structure
    const payload = {
      date: formState.date,
      time: formState.time,
      title: formState.title,
      emergency_simulation: formState.emergency_simulation,
      location: formState.location,
      incident_initiator: formState.incident_initiator,
      emergency_communication: formState.emergency_communication,
      observers: formState.observers,
      location_data: {
        area: formState.location_data.area,
        entries: formState.location_data.entries.map(entry => ({
          type: entry.type, // Include the type field
          management: entry.management,
          non_management: entry.non_management,
          contractor: entry.contractor
        }))
      },
      fire_scenario: formState.fire_scenario,
      site_main_controller_responsibility: formState.site_main_controller_responsibility,
      site_incident_controller_responsibility: formState.site_incident_controller_responsibility,
      emergency_response_team_responsibility: formState.emergency_response_team_responsibility,
      employees_responsibility: formState.employees_responsibility
    };

    const url = componentState.isEditMode
      ? `${config.baseURL}/api/v1/emergency-drill-blueprint/update/${componentState.entryId}`
      : `${config.baseURL}/api/v1/emergency-drill-blueprint`;


      // Add this console.log to see the exact payload being sent
    console.log('Data being sent to API:', {
      url: url,
      payload: JSON.parse(JSON.stringify(payload)), // Deep clone to avoid Vue proxies
      entryId: componentState.entryId
    });

    // Changed from 'multipart/form-data' to 'application/json' since we're sending JSON
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': componentState.token,
      },
    });

    console.log("API response: ", response.data);
    router.push({ name: 'hse-emergency-drill-blueprint-list' });
    SuccessPopUp();
  } catch (error) {
    console.error('Error submitting form:', error);
    FailedPopUp();
  }
};

const fetchEntryData = async (id: string) => {
  try {
    const response = await axios.get(`${config.baseURL}/api/v1/emergency-drill-blueprint/edit/${id}`, {
      headers: {
        'Authorization': componentState.token,
      },
    });

    const data = response.data.data;
    console.log('Fetched Data:', data);

    Object.keys(formState).forEach((key) => {
      const formKey = key as keyof typeof formState;
      if (formKey in data) {
        formState[formKey] = data[formKey];
      }
    });

    
    console.log('Form Data after population:', formState);
  } catch (error) {
    console.error('Error fetching entry data:', error);
  }
};

onMounted(() => {
  const entryId = route.params.id as string;
  if (entryId) {
    componentState.isEditMode = true;
    componentState.entryId = entryId;
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
    <h2 class="mr-auto text-lg font-medium">{{ componentState.isEditMode ? 'Edit Emergency Drill Checklist' : 'Add Emergency Drill Checklist' }}</h2>
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
          Ensure to fill accurate online Emergency Drill Checklist with correct date formats and file uploads in the specified format and size.
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Date:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Date
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.date" class="w-full" type="date" name="name":class="{ 'border-danger': v$.date.$error,}" placeholder="Insert Date"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.date.$error">
                        <div v-for="(error, index) in v$.date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Time:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Time
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.time" class="w-full" type="text" name="name":class="{ 'border-danger': v$.time.$error,}" placeholder="Insert Time"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.time.$error">
                        <div v-for="(error, index) in v$.time.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Title:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Title
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.title" class="w-full" type="text" name="name":class="{ 'border-danger': v$.title.$error,}" placeholder="Insert Title"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.title.$error">
                        <div v-for="(error, index) in v$.title.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Emergency simulation:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Emergency simulation
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.emergency_simulation" class="w-full" type="text" name="name":class="{ 'border-danger': v$.emergency_simulation.$error,}" placeholder="Insert Emergency simulation"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.emergency_simulation.$error">
                        <div v-for="(error, index) in v$.emergency_simulation.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Location:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Location
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.location" class="w-full" type="text" name="name":class="{ 'border-danger': v$.location.$error,}" placeholder="Insert Location"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.location.$error">
                        <div v-for="(error, index) in v$.location.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Incident initiator:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Incident initiator
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.incident_initiator" class="w-full" type="text" name="name":class="{ 'border-danger': v$.incident_initiator.$error,}" placeholder="Insert Incident initiator"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.incident_initiator.$error">
                        <div v-for="(error, index) in v$.incident_initiator.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Emergency communication:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Emergency communication
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.emergency_communication" class="w-full" type="text" name="name":class="{ 'border-danger': v$.emergency_communication.$error,}" placeholder="Insert Emergency communication"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.emergency_communication.$error">
                        <div v-for="(error, index) in v$.emergency_communication.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Observers:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Observers
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.observers" class="w-full" type="text" name="name":class="{ 'border-danger': v$.observers.$error,}" placeholder="Insert Observers"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.observers.$error">
                        <div v-for="(error, index) in v$.observers.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Area:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Area:
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.location_data.area" class="w-full" type="text" name="name" :class="{ 'border-danger': v$.$dirty && v$.location_data.area.$errors.length }" placeholder="Insert Area"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.$dirty && v$.location_data.area.$errors.length">
                        <div v-for="(error, index) in v$.location_data.area.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Management (All):
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Management
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.location_data.entries[0].management" class="w-full" type="text" name="name":class="{ 'border-danger': v$.$dirty && v$.location_data.entries.$each.$response.$errors[0]?.management?.length }" placeholder="Insert Management"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.$dirty && v$.location_data.entries.$each.$response.$errors[0]?.management">
                        <div v-for="(error, index) in v$.location_data.entries.$each.$response.$errors[0].management" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Non-Manag. (All):
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Non-Manag.
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.location_data.entries[0].non_management" class="w-full" type="text" name="name":class="{ 'border-danger': v$.$dirty && v$.location_data.entries.$each.$response.$errors[0]?.non_management?.length }" placeholder="Insert Non-Manag."/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.$dirty && v$.location_data.entries.$each.$response.$errors[0]?.non_management">
                        <div v-for="(error, index) in v$.location_data.entries.$each.$response.$errors[0].non_management" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Contractor (All):
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Contractor
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.location_data.entries[0].contractor" class="w-full" type="text" name="name":class="{ 'border-danger': v$.$dirty && v$.location_data.entries.$each.$response.$errors[0]?.contractor?.length }" placeholder="Insert Contractor"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.$dirty && v$.location_data.entries.$each.$response.$errors[0]?.contractor">
                        <div v-for="(error, index) in v$.location_data.entries.$each.$response.$errors[0].contractor" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Management:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Management
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.location_data.entries[1].management" class="w-full" type="text" name="name":class="{ 'border-danger': v$.$dirty && v$.location_data.entries.$each.$response.$errors[1]?.management?.length }" placeholder="Insert Management"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.$dirty && v$.location_data.entries.$each.$response.$errors[1]?.management">
                        <div v-for="(error, index) in v$.location_data.entries.$each.$response.$errors[1].management" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Non-Manag.:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Non-Manag.
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.location_data.entries[1].non_management" class="w-full" type="text" name="name":class="{ 'border-danger': v$.$dirty && v$.location_data.entries.$each.$response.$errors[1]?.non_management?.length }" placeholder="Insert Non-Manag."/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.$dirty && v$.location_data.entries.$each.$response.$errors[1]?.non_management">
                        <div v-for="(error, index) in v$.location_data.entries.$each.$response.$errors[1].non_management" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Contractor:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Contractor
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.location_data.entries[1].contractor" class="w-full" type="text" name="name":class="{ 'border-danger': v$.$dirty && v$.location_data.entries.$each.$response.$errors[1]?.contractor?.length }" placeholder="Insert Contractor"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.$dirty && v$.location_data.entries.$each.$response.$errors[1]?.contractor">
                        <div v-for="(error, index) in v$.location_data.entries.$each.$response.$errors[1].contractor" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Fire Scenario:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Fire Scenario
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.fire_scenario" class="w-full" type="text" name="name":class="{ 'border-danger': v$.fire_scenario.$error,}" placeholder="Insert Fire Scenario"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.fire_scenario.$error">
                        <div v-for="(error, index) in v$.fire_scenario.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Site Main Controller (SMC):
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Site Main Controller (SMC)
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.site_main_controller_responsibility" class="w-full" type="text" name="name":class="{ 'border-danger': v$.site_main_controller_responsibility.$error,}" placeholder="Insert Site Main Controller (SMC)"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.site_main_controller_responsibility.$error">
                        <div v-for="(error, index) in v$.site_main_controller_responsibility.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Site Incident Controller (SIC):
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Site Incident Controller (SIC)
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.site_incident_controller_responsibility" class="w-full" type="text" name="name":class="{ 'border-danger': v$.site_incident_controller_responsibility.$error,}" placeholder="Insert Site Incident Controller (SIC)"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.site_incident_controller_responsibility.$error">
                        <div v-for="(error, index) in v$.site_incident_controller_responsibility.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Emergency Response Team:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Emergency Response Team
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.emergency_response_team_responsibility" class="w-full" type="text" name="name":class="{ 'border-danger': v$.emergency_response_team_responsibility.$error,}" placeholder="Insert Emergency Response Team"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.emergency_response_team_responsibility.$error">
                        <div v-for="(error, index) in v$.emergency_response_team_responsibility.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Employee’s:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Employee’s
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.employees_responsibility" class="w-full" type="text" name="name":class="{ 'border-danger': v$.employees_responsibility.$error,}" placeholder="Insert Employee’s"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.employees_responsibility.$error">
                        <div v-for="(error, index) in v$.employees_responsibility.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                    </div>
                  </div>
                </FormInline>
              </div>
            </div>
          
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
              When filling out the Emergency Drill Checklist report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">Emergency Drill Checklist {{ componentState.isEditMode ? 'edited' : 'created' }} successfully!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Emergency Drill Checklist {{componentState.isEditMode ? 'edited' : 'Create' }} failed!</div>
          <div class="mt-1 text-slate-500">Please check the filled form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>