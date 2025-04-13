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
  box_no: '',
  location: '',
  authorized_person: '',
  contact_no: '',
  data: [
    {
      item_name: '',
      required_quantity: '',
      available_quantity: '',
      remarks: ''
    }
  ],
  reference: '',
});



const router = useRouter();
const route = useRoute();


const rules = {
  box_no: { required, integer },
  location: { required, minLength: minLength(3) },
  authorized_person: { required, minLength: minLength(3) },
  contact_no: { required, integer },
  data: {
    $each: helpers.forEach({
      item_name: { required, minLength: minLength(3) },
      required_quantity: { required, minLength: minLength(1) },
      available_quantity: { required, minLength: minLength(1) },
      remarks: { required, minLength: minLength(3) },
    })
  },
  reference: { required, minLength: minLength(3) },
};

const componentState = reactive({
  token: getToken(),
  isEditMode: false,
  entryId: null as string | null,
});

const v$ = useVuelidate(rules, formState);
// const validate = useVuelidate(rules, toRefs(formData));


const submitForm = async () => {


  v$.value.$touch();
  if (v$.value.$invalid) {
    FailedPopUp();
  } else {
    // const form = new FormData();
    // (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
      
    //   const value = formData[key];
    //   console.log(`Appending to FormData: key=${key}, value=${value}`);
    //   form.append(key, value as string);
    // });

    try {
      const payload = {
        ...formState,
        // data: JSON.stringify(formData.data) // Convert array to JSON string if backend expects string

        // Ensure data is properly formatted
        data: formState.data.map(item => ({
          item_name: item.item_name,
          required_quantity: item.required_quantity,
          available_quantity: item.available_quantity,
          remarks: item.remarks
        }))
      };

      let url = componentState.isEditMode
        ? `${config.baseURL}/api/v1/first-aid-checklist/update/${componentState.entryId}`
        : `${config.baseURL}/api/v1/first-aid-checklist`;

      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': componentState.token,
        },
      });

      console.log("shamim_res: ", response.data);
      router.push({ name: 'hse-first-aid-list' });
      SuccessPopUp();
    } catch (error) {
      console.error('Error submitting form:', error);
      FailedPopUp();
    }
  }
};

const fetchEntryData = async (id: string) => {
  try {
    const response = await axios.get(`${config.baseURL}/api/v1/first-aid-checklist/edit/${id}`, {
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
    <h2 class="mr-auto text-lg font-medium">{{ componentState.isEditMode ? 'Edit First Aid Checklist' : 'Add First Aid Checklist' }}</h2>
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
          Ensure to fill accurate online First Aid Checklist with correct date formats and file uploads in the specified format and size.
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">First Aid Box No:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                First Aid Box No
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.box_no" class="w-full" type="text" name="name":class="{ 'border-danger': v$.box_no.$error,}" placeholder="Insert First Aid Box No"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.box_no.$error">
                        <div v-for="(error, index) in v$.box_no.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Location/Authorized dept.:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Location/Authorized dept.
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.location" class="w-full" type="text" name="name":class="{ 'border-danger': v$.location.$error,}" placeholder="Insert Location/Authorized dept."/>
                    
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Authorized Person:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Authorized Person
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.authorized_person" class="w-full" type="text" name="name":class="{ 'border-danger': v$.authorized_person.$error,}" placeholder="Insert Authorized Person"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.authorized_person.$error">
                        <div v-for="(error, index) in v$.authorized_person.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Contact No.:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Contact No.
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.contact_no" class="w-full" type="text" name="name":class="{ 'border-danger': v$.contact_no.$error,}" placeholder="Insert Contact No."/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.contact_no.$error">
                        <div v-for="(error, index) in v$.contact_no.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Item Name:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Item Name
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.data[0].item_name" class="w-full" type="text" name="name":class="{ 'border-danger': v$.$dirty && v$.data.$each.$response.$errors[0]?.item_name?.length }" placeholder="Insert Item Name"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.$dirty && v$.data.$each.$response.$errors[0]?.item_name">
                        <div v-for="(error, index) in v$.data.$each.$response.$errors[0].item_name" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Required Quantity:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Required Quantity
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.data[0].required_quantity" class="w-full" type="text" name="name":class="{ 'border-danger': v$.$dirty && v$.data.$each.$response.$errors[0]?.required_quantity?.length }" placeholder="Insert Required Quantity"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.$dirty && v$.data.$each.$response.$errors[0]?.required_quantity">
                        <div v-for="(error, index) in v$.data.$each.$response.$errors[0].required_quantity" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Available Quantity:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Available Quantity
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.data[0].available_quantity" class="w-full" type="text" name="name":class="{ 'border-danger': v$.$dirty && v$.data.$each.$response.$errors[0]?.available_quantity?.length }" placeholder="Insert Available Quantity"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.$dirty && v$.data.$each.$response.$errors[0]?.available_quantity">
                        <div v-for="(error, index) in v$.data.$each.$response.$errors[0].available_quantity" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Remarks:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Remarks
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.data[0].remarks" class="w-full" type="text" name="name":class="{ 'border-danger': v$.$dirty && v$.data.$each.$response.$errors[0]?.remarks?.length }" placeholder="Insert Remarks"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.$dirty && v$.data.$each.$response.$errors[0]?.remarks">
                        <div v-for="(error, index) in v$.data.$each.$response.$errors[0].remarks" class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Reference:
                          <span class="relative group cursor-pointer ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Reference
                              </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-3" v-model.trim="formState.reference" class="w-full" type="text" name="name":class="{ 'border-danger': v$.reference.$error,}" placeholder="Insert Reference"/>
                    
                    <div class="flex justify-between">
                      <template v-if="v$.reference.$error">
                        <div v-for="(error, index) in v$.reference.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
              When filling out the First Aid Checklist report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">First Aid Checklist {{ componentState.isEditMode ? 'edited' : 'created' }} successfully!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">First Aid Checklist {{componentState.isEditMode ? 'edited' : 'Create' }} failed!</div>
          <div class="mt-1 text-slate-500">Please check the filled form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>