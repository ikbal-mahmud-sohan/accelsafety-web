<script setup lang="ts">
import { ref, reactive,toRefs,onMounted } from 'vue';
import axios, { AxiosError } from 'axios';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import TomSelect from "@/components/Base/TomSelect";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import config from "@/config";
import Toastify from 'toastify-js';
import Notification from "@/components/Base/Notification";
import Preview from "@/components/Base/Preview";
import { Menu, Popover } from "@/components/Base/Headless";
import Alert from "@/components/Base/Alert";
import Litepicker from "@/components/Base/Litepicker";
import { getToken } from './../auth/setToken'





// Define your state using the reactive function

import {
  FormInput,
  FormLabel,
  FormCheck,
  FormSwitch,
  InputGroup,
} from "@/components/Base/Form";

const formData = reactive({
      doc_no:'',
      issue_no:'',
      issue_date:'',
      revision_no:'',
      revision_date:'',
      equipment_details:'',
      specification:'',
      last_measured_date:'',
      next_measuring_date:'',
      check_points:'',
});
const router = useRouter();
const issuedate = ref("");
const revisiondate = ref("");
const lastmeasureddate = ref("");
const nextmeasuringdate = ref("");

const state = reactive({
  token: getToken(),

});


interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const selectedtrainingTopic = ref("");
const selectedEmployee = ref("");

const rules = {
      doc_no:{required},
      issue_no:{required},
      issue_date:{required},
      revision_no:{required},
      revision_date:{required},
      equipment_details:{required},
      specification:{required},
      last_measured_date:{required},
      next_measuring_date:{required},
      check_points:{required},
       
};

const validate = useVuelidate(rules, toRefs(formData));
const backendErrors = reactive<{
    message: string;
    errors: { [key: string]: string[] };
}>({
    message: '',
    errors: {}
});

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

const submitForm = async () => {
  formData.issue_date = issuedate.value
  formData.revision_date = revisiondate.value
  formData.last_measured_date = lastmeasureddate.value
  formData.next_measuring_date = nextmeasuringdate.value
  validate.value.$touch();
  if (validate.value.$invalid) {
    FailedPopUp();
  } else {
    try {
      const url = config.baseURL + '/api/v1/hse-earthing-pit-condition';
      const response = await axios.post(url, formData,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if (response.data != undefined) {
        SuccessPopUp();
        router.push({ name: 'hse-earthing-pit-condition' });
      }
    } catch (err) {
      FailedPopUp();
      const error = err as AxiosError<BackendErrorResponse>;
      if (error.response) {
        const backendError = error.response.data;
        backendErrors.message = backendError.message;
        backendErrors.errors = backendError.errors || {};
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  }
};

// Fetch data from the API and update the state

onMounted(() => {
  
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Create Earthing Pit Condition</h2>
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
          Assign specific training topics to employees by matching their IDs with the relevant training sessions.
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
      <div class="p-0 md:p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Earthing Pit Condition
          </div>
          <div class="p-0 md:p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Earthing Pit Condition
          </div>

          <div class="mt-5">
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Doc No</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Document identification number
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.doc_no.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.doc_no.$error,}" placeholder="Input Doc No"/>
                        <div class="flex justify-between">
                          <template v-if="validate.doc_no.$error">
                          <div v-for="(error, index) in validate.doc_no.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                          <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                          </div>
                      </div>
                    </FormInline>
                </div>
              </div>
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Issue No</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Title or type of device.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.issue_no.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.issue_no.$error,}" placeholder="Input Issue No"/>
                        <div class="flex justify-between">
                          <template v-if="validate.issue_no.$error">
                          <div v-for="(error, index) in validate.issue_no.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                          <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                          </div>
                      </div>
                    </FormInline>
                </div>
              </div>

          <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Issue Date</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Date of issue release.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <Preview class="intro-y box" v-slot="{ toggle }">
                  <Preview.Panel>
                      <div class="relative w-full mx-auto">
                        <div
                          class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                          <Lucide icon="Calendar" class="w-4 h-4" />
                        </div>
                        <Litepicker
                          v-model="issuedate"
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
                            v-model="issuedate"
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
                  <template v-if="validate.issue_date.$error">
                  <div v-for="(error, index) in validate.issue_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required</p>
                </div>
                      </div>
                    </FormInline>
                </div>
              </div>
              
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Revision No</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Current revision version number.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.revision_no.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.revision_no.$error,}" placeholder="Input Revision No"/>
                        <div class="flex justify-between">
                          <template v-if="validate.revision_no.$error">
                          <div v-for="(error, index) in validate.revision_no.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                          <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                          </div>
                      </div>
                    </FormInline>
                </div>
              </div>
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Revision Date</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Date of last revision.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <Preview class="intro-y box" v-slot="{ toggle }">
                  <Preview.Panel>
                      <div class="relative w-full mx-auto">
                        <div
                          class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                          <Lucide icon="Calendar" class="w-4 h-4" />
                        </div>
                        <Litepicker
                          v-model="revisiondate"
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
                            v-model="revisiondate"
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
                  <template v-if="validate.revision_date.$error">
                  <div v-for="(error, index) in validate.revision_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required</p>
                </div>
                      </div>
                    </FormInline>
                </div>
              </div>
              
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Equipment Details</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Specific information about equipment.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.equipment_details.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.equipment_details.$error,}" placeholder="Input Equipment Details"/>
                        <div class="flex justify-between">
                          <template v-if="validate.equipment_details.$error">
                          <div v-for="(error, index) in validate.equipment_details.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                          <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                          </div>
                      </div>
                    </FormInline>
                </div>
              </div>
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Specification</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Detailed technical requirements or features.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.specification.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.specification.$error,}" placeholder="Input Specification"/>
                        <div class="flex justify-between">
                          <template v-if="validate.specification.$error">
                          <div v-for="(error, index) in validate.specification.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                          <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                          </div>
                      </div>
                    </FormInline>
                </div>
              </div>
            
            <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Last Measured Date</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Date of last revision.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <Preview class="intro-y box" v-slot="{ toggle }">
                  <Preview.Panel>
                      <div class="relative w-full mx-auto">
                        <div
                          class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                          <Lucide icon="Calendar" class="w-4 h-4" />
                        </div>
                        <Litepicker
                          v-model="lastmeasureddate"
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
                            v-model="lastmeasureddate"
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
                  <template v-if="validate.last_measured_date.$error">
                  <div v-for="(error, index) in validate.last_measured_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required</p>
                </div>
                      </div>
                    </FormInline>
                </div>
              </div>
            <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Next Measuring Date</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Scheduled date for next measurement.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <Preview class="intro-y box" v-slot="{ toggle }">
                  <Preview.Panel>
                      <div class="relative w-full mx-auto">
                        <div
                          class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                          <Lucide icon="Calendar" class="w-4 h-4" />
                        </div>
                        <Litepicker
                          v-model="nextmeasuringdate"
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
                            v-model="nextmeasuringdate"
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
                  <template v-if="validate.next_measuring_date.$error">
                  <div v-for="(error, index) in validate.next_measuring_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required</p>
                </div>
                      </div>
                    </FormInline>
                </div>
              </div>
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Check Points</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Specific points to verify or inspect.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.check_points.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.check_points.$error,}" placeholder="Input Check Points"/>
                        <div class="flex justify-between">
                          <template v-if="validate.check_points.$error">
                          <div v-for="(error, index) in validate.check_points.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
      </div>
        </div>
      </div>

      <div class="w-full px-4 py-4">
        <p v-if="backendErrors.message" class="text-red-500 text-sm">{{ backendErrors.message }}</p>
        <template v-if="backendErrors.errors">
            <div v-for="(messages, field) in backendErrors.errors" :key="field" class="mt-2 text-danger">
            <p><strong>{{ field }}:</strong></p>
            <ul>
                <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
            </ul>
            </div>
        </template>
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
            <a href="">Earthing Pit Condition</a>
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
              When filling out the Earthing Pit Condition report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">Earthing Pit Condition success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Earthing Pit Condition failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
