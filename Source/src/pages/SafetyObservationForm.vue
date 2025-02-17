<script setup lang="ts">
import { ref, reactive, toRefs,onMounted } from 'vue';
import axios from 'axios';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import Button from "@/components/Base/Button";
import { useRouter } from 'vue-router';
import Notification from "@/components/Base/Notification";
import Lucide from "@/components/Base/Lucide";
import config from "@/config";
import { getToken } from './../auth/setToken'

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
        auditor:'',
        plant_name:'',
        location:'',
        audit_date:'',
        category:'',
        problem_description:'',
        problematic_progressive_images:[] as File[],
        root_cause:'',
        resp_department:'',
        owner_department:'',
        improvement_actions:'',
        due_date:'',
        priority_type:'',
});
const state = reactive({
  viewOwnerDepartment: [] as Array<any>,
  viewRespDepartment: [] as Array<any>,
  viewPlantName: [] as Array<any>,
  viewEmp: [] as Array<any>,
  token: getToken(),

});
const router = useRouter();

const selectedviewOwnerDepartment = ref("");
const selectedviewRespDepartment = ref("");
const selectedviewPlantName = ref("");
const selectedviewPriorityType = ref("");
const selectedCategory = ref("");
const selectedEmp1 = ref("");



const categories = ref(["1", "3"]);
const editorConfig = {
  toolbar: {
    items: ['heading','undo', 'redo', 'bold', 'italic', 'link', 'numberedList', 'bulletedList','fontsize'],
  },
};
const editorData = ref("");
const auditdate = ref("");
const duedate = ref("");

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.problematic_progressive_images = Array.from(input.files);
  }
};

const rules = {
        auditor: {required,minLength: minLength(3),},
        plant_name: {required,},
        location: { required, minLength: minLength(3),},
        audit_date: {required },
        category: { required, minLength: minLength(3),},
        problem_description: { required, minLength: minLength(3),},
        root_cause: { required, minLength: minLength(3),},
        resp_department: { required, minLength: minLength(3),},
        owner_department: { required, minLength: minLength(3),},
        improvement_actions: { required, minLength: minLength(3),},
        due_date: { required, minLength: minLength(3),},
        priority_type: { required, minLength: minLength(3),},
};

const validate = useVuelidate(rules, toRefs(formData));


const submitForm = async () => {
    formData.problem_description = editorData.value;
    formData.audit_date = auditdate.value;
    formData.due_date = duedate.value;
    formData.owner_department = selectedviewOwnerDepartment.value;
    formData.resp_department = selectedviewRespDepartment.value;
    formData.plant_name = selectedviewPlantName.value;
    formData.priority_type = selectedviewPriorityType.value;
    formData.category = selectedCategory.value;
    formData.auditor = selectedEmp1.value;
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {
        const form = new FormData();
            (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
            if (key !== 'problematic_progressive_images') {
                form.append(key, formData[key] as string);
            }
            });
            formData.problematic_progressive_images.forEach((file, index) => {
            form.append(`problematic_progressive_images[${index}]`, file);
            });

            try {
                let  url = config.baseURL+'/api/v1/safety';
                const response = await axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,
                },
                });
                router.push({ name: 'safety-observation-data-list' });
        
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        
            SuccessPopUp();
    }
};

const fetchDropDownData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/safety-drop-down';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.viewOwnerDepartment = response.data.OwnerDepartment;
    state.viewRespDepartment = response.data.RespDepartment;
    state.viewPlantName = response.data.PlantName	;
  } catch (error) {
    console.error('Error fetching data:', error);
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
onMounted(() => {
  fetchDropDownData();
  fetchEmpData();
});

</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Add Safety Observationt </h2>
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
          Ensure accurate online safety observations with correct date formats and file uploads in the specified format and size.
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
      
      <!-- BEGIN: Product Information -->
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"> 
            <div class="flex flex-wrap">
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                          <FormLabel class="xl:w-40 xl:!mr-10">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Auditor Name
                                  <span class="relative group cursor-pointer ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                      <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                        The name of the person conducting the audit
                                      </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                            <!-- <FormInput id="crud-form-1" v-model.trim="validate.auditor.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.auditor.$error,}" placeholder="Input Auditor"/> -->
                            <select id="crud-form-6" v-model="selectedEmp1"   class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500 ">
                                    <option value="" disabled>select auditor</option>
                                    <option v-for="(data, index) in state.viewEmp" :key="index" :value="data.name">{{ data.name }}</option>
                            </select>
                            <div class="flex justify-between">
                              <template v-if="validate.auditor.$error">
                              <div v-for="(error, index) in validate.auditor.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                          <FormLabel class="xl:w-40 xl:!mr-10">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Plant Name
                                  <span class="relative group cursor-pointer ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                      <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                        The name of the plant or facility being audited
                                      </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                            <!-- <FormInput id="crud-form-2" v-model.trim="validate.plant_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.plant_name.$error,}" placeholder="Input Plant Name"/> -->
                            <select id="crud-form-6" v-model="selectedviewPlantName"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                                  <option value="" disabled>select plant name</option>
                                  <option v-for="(data, index) in state.viewPlantName" :key="index" :value="data.name">{{ data.name }}</option>
                            </select>
                            
                            <div class="flex justify-between">
                              <template v-if="validate.plant_name.$error">
                                <div v-for="(error, index) in validate.plant_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                              <FormLabel class="xl:w-40 xl:!mr-10">
                                <div class="text-left">
                                  <div class="flex items-center">
                                    <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Location
                                      <span class="relative group cursor-pointer ml-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                          <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                            The specific location or site of the audit
                                          </div>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </FormLabel>
                              <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput id="crud-form-3" v-model.trim="validate.location.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.location.$error,}" placeholder="Input Location"/>
                                
                                <div class="flex justify-between">
                                  <template v-if="validate.location.$error">
                                    <div v-for="(error, index) in validate.location.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                          <FormLabel class="xl:w-40 xl:!mr-10">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Audit Date
                                  <span class="relative group cursor-pointer ml-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                          <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                            The date when the audit was conducted
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
                                      v-model="auditdate"
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
                              <template v-if="validate.audit_date.$error">
                              <div v-for="(error, index) in validate.audit_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Due Date
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The deadline for completing the corrective actions
                                    </div>
                                </span>
                              </div>
                              <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md mt-6 xl:mt-4">
                                Required
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
                            <template v-if="validate.due_date.$error">
                            <div v-for="(error, index) in validate.due_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Category
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The classification of the audit, e.g., safety, compliance, etc
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <!-- <FormInput id="crud-form-5" v-model.trim="validate.category.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.category.$error,}" placeholder="Input Category"/> -->

                          <select id="crud-form-6" v-model="selectedCategory"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                                <option value="" disabled>select category</option>
                                <option value="near me">near me</option>
                                <option value="unsafe acts">unsafe acts</option>
                                <option value="unsafe conditions">unsafe conditions</option>
                          </select>
                          
                          <div class="flex justify-between">
                            <template v-if="validate.category.$error">
                            <div v-for="(error, index) in validate.category.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Resp Department
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The underlying reason or cause of the accident
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <!-- <FormInput id="crud-form-7" v-model.trim="validate.resp_department.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.resp_department.$error,}" placeholder="Input Resp Department"/> -->
                          <select id="crud-form-6" v-model="selectedviewRespDepartment"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                                <option value="" disabled>select resp department</option>
                                <option v-for="(data, index) in state.viewRespDepartment" :key="index" :value="data.name">{{ data.name }}</option>
                          </select>
                        
                          <div class="flex justify-between">
                            <template v-if="validate.resp_department.$error">
                            <div v-for="(error, index) in validate.resp_department.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                          <FormLabel class="xl:w-40 xl:!mr-10">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Owner Department
                                  <span class="relative group cursor-pointer ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                      <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                        The department owning or directly involved with the issue
                                      </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                            <!-- <FormInput id="crud-form-8" v-model.trim="validate.owner_department.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.owner_department.$error,}" placeholder="Input Owner Department"/> -->
                            <select id="crud-form-6" v-model="selectedviewOwnerDepartment"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                                  <option value="" disabled>select owner department</option>
                                  <option v-for="(data, index) in state.viewOwnerDepartment" :key="index" :value="data.name">{{ data.name }}</option>
                            </select>
                            
                            <div class="flex justify-between">
                              <template v-if="validate.owner_department.$error">
                              <div v-for="(error, index) in validate.owner_department.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Improvement Actions
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Actions planned or taken to improve or correct the issue
                                    </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-9" v-model.trim="validate.improvement_actions.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.improvement_actions.$error,}" placeholder="Input Improvement Actions"/>
                          <div class="flex justify-between">
                            <template v-if="validate.improvement_actions.$error">
                            <div v-for="(error, index) in validate.improvement_actions.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                          <FormLabel class="xl:w-40 xl:!mr-10">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Priority Type
                                  <span class="relative group cursor-pointer ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                      <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                        The level of priority assigned to the issue (e.g., high, medium, low)
                                      </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                            <!-- <FormInput id="crud-form-11" v-model.trim="validate.priority_type.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.priority_type.$error,}" placeholder="Input Priority Type"/>   -->
                            <select id="crud-form-6" v-model="selectedviewPriorityType"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                                  <option value="" disabled>select priority type</option>
                                  <option value="Low">Low</option>
                                  <option value="medium">medium</option>
                                  <option value="high">high</option>
                            </select>
                            <div class="flex justify-between">
                              <template v-if="validate.priority_type.$error">
                              <div v-for="(error, index) in validate.priority_type.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4">Root Cause
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      The underlying reason or cause of the accident
                                    </div>
                                </span>
                              </div>
                              <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md mt-6 xl:mt-4">
                                Required
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.root_cause.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.root_cause.$error,}" placeholder="Input Root Cause"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.root_cause.$error">
                            <div v-for="(error, index) in validate.root_cause.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-sm flex mt-6 xl:mt-4">Problematic Progressive Images
                                <span class="relative group cursor-pointer ml-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                  </svg>
                                    <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                      Images showing the progression of the identified problem
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
                                    
                                  <div v-if="formData.problematic_progressive_images.length" class="w-full space-y-2">
                                    <div v-for="(file, index) in formData.problematic_progressive_images" :key="index" class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow">
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
      
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Descriptions
          </div>
          <div class="mt-5">
            
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-40 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-4 pr-4">Problem Descriptions
                      <span class="relative group cursor-pointer ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                          A brief summary of the accident details
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <ClassicEditor v-model="editorData" :class="{ 'border-danger': validate.problem_description.$error,}" :config="editorConfig" />
                
                <div class="flex justify-between">
                  <template v-if="validate.problem_description.$error">
                  <div v-for="(error, index) in validate.problem_description.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 character</p>
                </div>
              </div>
            </FormInline>
            
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
              When filling out the safety observations report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">Safety Observationt Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Safety Observationt Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>