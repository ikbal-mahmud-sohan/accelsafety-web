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
        name_of_the_site: '',
        date: '',
        person_inspected: '',
        position: '',
        created_by: '',
        hse_ladder_des_1: '',
        is_hse_ladder_des_1: '',
        hse_ladder_des_remarks_1: '',
        hse_ladder_des_2: '',
        is_hse_ladder_des_2: '',
        hse_ladder_des_remarks_2: '',
        hse_ladder_des_3: '',
        is_hse_ladder_des_3: '',
        hse_ladder_des_remarks_3: '',
        hse_ladder_des_4: '',
        is_hse_ladder_des_4: '',
        hse_ladder_des_remarks_4: '',
        hse_ladder_des_5: '',
        is_hse_ladder_des_5: '',
        hse_ladder_des_remarks_5: '',
        hse_ladder_des_6: '',
        is_hse_ladder_des_6: '',
        hse_ladder_des_remarks_6: '',
        hse_ladder_des_7: '',
        is_hse_ladder_des_7: '',
        hse_ladder_des_remarks_7: '',
        hse_ladder_des_8: '',
        is_hse_ladder_des_8: '',
        hse_ladder_des_remarks_8: '',
        hse_ladder_des_9: '',
        is_hse_ladder_des_9: '',
        hse_ladder_des_remarks_9: '',
        hse_ladder_des_10: '',
        is_hse_ladder_des_10: '',
        hse_ladder_des_remarks_10: '',
        hse_ladder_des_11: '',
        is_hse_ladder_des_11: '',
        hse_ladder_des_remarks_11: '',
        hse_ladder_des_12: '',
        is_hse_ladder_des_12: '',
        hse_ladder_des_remarks_12: '',
        hse_ladder_des_13: '',
        is_hse_ladder_des_13: '',
        hse_ladder_des_remarks_13: '',
        hse_ladder_des_14: '',
        is_hse_ladder_des_14: '',
        hse_ladder_des_remarks_14: '',
        hse_ladder_des_15: '',
        is_hse_ladder_des_15: '',
        hse_ladder_des_remarks_15: '',
});
const router = useRouter();
const auditdate = ref("");
const isHseLadderDes1 = ref("");
const isHseLadderDes2 = ref("");
const isHseLadderDes3 = ref("");
const isHseLadderDes4 = ref("");
const isHseLadderDes5 = ref("");
const isHseLadderDes6 = ref("");
const isHseLadderDes7 = ref("");
const isHseLadderDes8 = ref("");
const isHseLadderDes9 = ref("");
const isHseLadderDes10 = ref("");
const isHseLadderDes11 = ref("");
const isHseLadderDes12 = ref("");
const isHseLadderDes13 = ref("");
const isHseLadderDes14 = ref("");

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
      name_of_the_site:{required},
      date:{required},
      person_inspected:{required},
      position:{required},
       
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
  formData.hse_ladder_des_1 = 'Inspected frequently or at regular interval';
  formData.hse_ladder_des_2 = 'Maintained free from oil, grease or slippery material';
  formData.hse_ladder_des_3 = 'Set up at proper angle during use';
  formData.hse_ladder_des_4 = 'Defective ladders withdrawn from service';
  formData.hse_ladder_des_5 = 'Used only for intended purpose';
  formData.hse_ladder_des_6 = 'Placed as to prevent slipping or lashed or hold in position';
  formData.hse_ladder_des_7 = 'Doors locked or guarded prior to placing ladder in front of those';
  formData.hse_ladder_des_8 = 'Placed only on stable bases';
  formData.hse_ladder_des_9 = 'Free from sharp edges, splinters and visible defects';
  formData.hse_ladder_des_10 = 'Step ladders do not exceed 20 feet in length';
  formData.hse_ladder_des_11 = 'Single section ladders do not exceed 30 feet in length';
  formData.hse_ladder_des_12 = 'Two section ladders do not exceed 60 feet in length';
  formData.hse_ladder_des_13 = 'Use for work exposed electrical conductors prohibited';
  formData.hse_ladder_des_14 = 'Workers trained in proper use of hazards related to ladders';
  formData.date = auditdate.value;
  formData.is_hse_ladder_des_1 = isHseLadderDes1.value;
  formData.is_hse_ladder_des_2 = isHseLadderDes2.value;
  formData.is_hse_ladder_des_3 = isHseLadderDes3.value;
  formData.is_hse_ladder_des_4 = isHseLadderDes4.value;
  formData.is_hse_ladder_des_5 = isHseLadderDes5.value;
  formData.is_hse_ladder_des_6 = isHseLadderDes6.value;
  formData.is_hse_ladder_des_7 = isHseLadderDes7.value;
  formData.is_hse_ladder_des_8 = isHseLadderDes8.value;
  formData.is_hse_ladder_des_9 = isHseLadderDes9.value;
  formData.is_hse_ladder_des_10 = isHseLadderDes10.value;
  formData.is_hse_ladder_des_11 = isHseLadderDes11.value;
  formData.is_hse_ladder_des_12 = isHseLadderDes12.value;
  formData.is_hse_ladder_des_13 = isHseLadderDes13.value;
  formData.is_hse_ladder_des_14 = isHseLadderDes14.value;
  validate.value.$touch();
  if (validate.value.$invalid) {
    FailedPopUp();
  } else {
    try {
      const url = config.baseURL + '/api/v1/hse-ladder-self-inspection-checklist';
      const response = await axios.post(url, formData,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if (response.data != undefined) {
        SuccessPopUp();
        router.push({ name: 'hse-ladder-self-inspection-list' });
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
    <h2 class="mr-auto text-lg font-medium">Ladder Self Inspection Checklist</h2>
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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Employee
          </div>
          <div class="p-0 md:p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Ladder Self-Inspection Checklist
          </div>
          <div class="mt-5">
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Name of the Site</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            The area of the person conducting the audit.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.name_of_the_site.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name_of_the_site.$error,}" placeholder="Input Name of the Site"/>
                        <div class="flex justify-between">
                          <template v-if="validate.name_of_the_site.$error">
                          <div v-for="(error, index) in validate.name_of_the_site.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormLabel class="w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Date</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            The area of the person conducting the audit.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-2/3 flex-1 ">
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

              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Person Inspected</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            The area of the person conducting the audit.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.person_inspected.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.person_inspected.$error,}" placeholder="Input Person Inspected"/>
                        <div class="flex justify-between">
                          <template v-if="validate.person_inspected.$error">
                          <div v-for="(error, index) in validate.person_inspected.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormLabel class="w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Position</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            The area of the person conducting the audit.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.position.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.position.$error,}" placeholder="Input Position"/>
                        <div class="flex justify-between">
                          <template v-if="validate.position.$error">
                          <div v-for="(error, index) in validate.position.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
          <div class="mt-5 border">
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">
                        Inspected frequently or at regular interval
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes1" type="radio" name="Yes" value="Yes" />
                              <FormCheck.Label htmlFor="radio-switch-1">
                                  Yes
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes1" type="radio" name="No" value="No" />
                              <FormCheck.Label htmlFor="radio-switch-2">
                                  No
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes1" type="radio" name="N/A" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                              </FormCheck.Label>
                          </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_1" class="w-full" type="text" name="hse_ladder_des_remarks_1" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Maintained free from oil, grease or slippery material</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes2" type="radio" name="hseLadder2" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes2" type="radio" name="hseLadder2" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes2" type="radio" name="hseLadder2" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                    </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_2" class="w-full" type="text" name="hse_ladder_des_remarks_2" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Set up at proper angle during use</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes3" type="radio" name="hseLadder3" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes3" type="radio" name="hseLadder3" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes3" type="radio" name="hseLadder3" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_3" class="w-full" type="text" name="hse_ladder_des_remarks_3" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Defective ladders withdrawn from service</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes4" type="radio" name="hseLadder4" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes4" type="radio" name="hseLadder4" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes4" type="radio" name="hseLadder4" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_4" class="w-full" type="text" name="hse_ladder_des_remarks_4" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Used only for intended purpose </div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes5" type="radio" name="hseLadder5" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes5" type="radio" name="hseLadder5" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes5" type="radio" name="hseLadder5" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_5" class="w-full" type="text" name="hse_ladder_des_remarks_5" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Placed as to prevent slipping or lashed or hold in position</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes6" type="radio" name="hseLadder6" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes6" type="radio" name="hseLadder6" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes6" type="radio" name="hseLadder6" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_6" class="w-full" type="text" name="hse_ladder_des_remarks_6" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Doors locked or guarded prior to placing ladder in front of those</div>
                     
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes7" type="radio" name="hseLadder7" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes7" type="radio" name="hseLadder7" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes7" type="radio" name="hseLadder7" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_7" class="w-full" type="text" name="hse_ladder_des_remarks_7" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Placed only on stable bases</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes8" type="radio" name="hseLadder8" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes8" type="radio" name="hseLadder8" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes8" type="radio" name="hseLadder8" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_8" class="w-full" type="text" name="hse_ladder_des_remarks_8" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Free from sharp edges, splinters and visible defects</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes9" type="radio" name="hseLadder9" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes9" type="radio" name="hseLadder9" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes9" type="radio" name="hseLadder9" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_9" class="w-full" type="text" name="hse_ladder_des_remarks_9" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Step ladders do not exceed 20 feet in length</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes10" type="radio" name="hseLadder10" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes10" type="radio" name="hseLadder10" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes10" type="radio" name="hseLadder10" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_10" class="w-full" type="text" name="hse_ladder_des_remarks_10" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Single section ladders do not exceed 30 feet in length</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes11" type="radio" name="hseLadder11" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes11" type="radio" name="hseLadder11" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes11" type="radio" name="hseLadder11" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_11" class="w-full" type="text" name="hse_ladder_des_remarks_11" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Two section ladders do not exceed 60 feet in length</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes12" type="radio" name="hseLadder12" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes12" type="radio" name="hseLadder12" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes12" type="radio" name="hseLadder12" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_12" class="w-full" type="text" name="hse_ladder_des_remarks_12" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Use for work exposed electrical conductors prohibited</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes13" type="radio" name="hseLadder13" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes13" type="radio" name="hseLadder13" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes13" type="radio" name="hseLadder13" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_13" class="w-full" type="text" name="hse_ladder_des_remarks_13" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Workers trained in proper use of hazards related to ladders</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes14" type="radio" name="hseLadder14" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes14" type="radio" name="hseLadder14" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes14" type="radio" name="hseLadder14" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_14" class="w-full" type="text" name="hse_ladder_des_remarks_14" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Workers trained in proper use of hazards related to ladders</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="isHseLadderDes1" type="radio" name="hseLadder" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="isHseLadderDes1" type="radio" name="hseLadder" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="isHseLadderDes1" type="radio" name="hseLadder" value="" />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.hse_ladder_des_remarks_15" class="w-full" type="text" name="hse_ladder_des_remarks_15" placeholder="Input Remarks"/>
                      </div>
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
            <a href="">Ladder Self Inspection Checklist</a>
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
              When filling out the Ladder Self Inspection Checklist report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">Ladder Self Inspection Checklist success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Ladder Self Inspection Checklist failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
