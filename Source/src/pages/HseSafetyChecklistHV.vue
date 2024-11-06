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




// Define your state using the reactive function

import {
  FormInput,
  FormLabel,
  FormCheck,
  FormSwitch,
  InputGroup,
} from "@/components/Base/Form";

const formData = reactive({
      hv_des_1: '',
      is_hv_complied_1: '',
      hv_remarks_1: '',
      hv_des_2: '',
      is_hv_complied_2: '',
      hv_remarks_2: '',
      hv_des_3: '',
      is_hv_complied_3: '',
      hv_remarks_3: '',
      hv_des_4: '',
      is_hv_complied_4: '',
      hv_remarks_4: '',
      hv_des_5: '',
      is_hv_complied_5: '',
      hv_remarks_5: '',
      hv_des_6: '',
      is_hv_complied_6: '',
      hv_remarks_6: '',
      hv_des_7: '',
      is_hv_complied_7: '',
      hv_remarks_7: '',
      hv_des_8: '',
      is_hv_complied_8: '',
      hv_remarks_8: '',
      hv_des_9: '',
      is_hv_complied_9: '',
      hv_remarks_9: '',
      hv_des_10: '',
      is_hv_complied_10: '',
      hv_remarks_10: '',
      hv_des_11: '',
      is_hv_complied_11: '',
      hv_remarks_11: '',
      checked_by: '',
      reviewed_by: '',
      checked_by_date: '',
      reviewed_by_date: '',
      checked_by_signature: [] as File[],
      reviewed_by_signature: [] as File[],
});
const router = useRouter();
const checkedbydate = ref("");
const reviewedbydate = ref("");
const ishvcomplied1 = ref("");
const ishvcomplied2 = ref("");
const ishvcomplied3 = ref("");
const ishvcomplied4 = ref("");
const ishvcomplied5 = ref("");
const ishvcomplied6 = ref("");
const ishvcomplied7 = ref("");
const ishvcomplied8 = ref("");
const ishvcomplied9 = ref("");
const ishvcomplied10 = ref("");
const ishvcomplied11 = ref("");


interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const selectedtrainingTopic = ref("");
const selectedEmployee = ref("");

const rules = {
      checked_by:{required},
      reviewed_by:{required},
      checked_by_date:{required},
      reviewed_by_date:{required},
      checked_by_signature:{required},
      reviewed_by_signature:{required},
       
};

const validate = useVuelidate(rules, toRefs(formData));
const backendErrors = reactive<{
    message: string;
    errors: { [key: string]: string[] };
}>({
    message: '',
    errors: {}
});

const checkedbysignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.checked_by_signature = Array.from(input.files);
  }
};
const reviewedbysignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.reviewed_by_signature = Array.from(input.files);
  }
};

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
   formData.hv_des_1 = 'Hi-Pot Test Voltage to be applied available';
   formData.hv_des_2 = 'Cordoning of the area under test done';
   formData.hv_des_3 = 'IR before Hi Pot test > 10 Mohm (>minimum value)';
   formData.hv_des_4 = 'Proper identification and connection of phase and neutral of variac for input to the kit';
   formData.hv_des_5 = 'Flashing light, alarm system working';
   formData.hv_des_6 = 'Testing engineer at safe distance from high voltage by locating control unit outside cordoned area';
   formData.hv_des_7 = 'Ensure firm connection of leads so that they do not break fall while the test is in progress';
   formData.hv_des_8 = 'Leak trip test of Hi-pot set';
   formData.hv_des_9 = 'After Hi-Pot test before discharging, isolate 230 V AC power supply by physically removing three pin plug from socket';
   formData.hv_des_1 = 'Equipment discharged for sufficient duration by proper discharge rod after Hi-pot test';
   formData.hv_des_1 = 'Discharge after DC Hi-Pot should be very slow, gradual and will consume more time';
  formData.checked_by_date = checkedbydate.value;
  formData.reviewed_by_date = reviewedbydate.value;
  formData.is_hv_complied_1 = ishvcomplied1.value;
  formData.is_hv_complied_2 = ishvcomplied2.value;
  formData.is_hv_complied_3 = ishvcomplied3.value;
  formData.is_hv_complied_4 = ishvcomplied4.value;
  formData.is_hv_complied_5 = ishvcomplied5.value;
  formData.is_hv_complied_6 = ishvcomplied6.value;
  formData.is_hv_complied_7 = ishvcomplied7.value;
  formData.is_hv_complied_8 = ishvcomplied8.value;
  formData.is_hv_complied_9 = ishvcomplied9.value;
  formData.is_hv_complied_10 = ishvcomplied10.value;
  formData.is_hv_complied_11 = ishvcomplied11.value;
  // validate.value.$touch();
  // console.log(validate.value);
  // if (validate.value.$invalid) {
  //   FailedPopUp();
  // } else {
    
  //   try {
  //     const url = config.baseURL + '/api/v1/hse-safety-checklist-hv';
  //     console.log("url",url)
  //     const response = await axios.post(url, formData);
  //     if (response.data != undefined) {
  //       SuccessPopUp();
  //       router.push({ name: 'hse-safety-checklist-hv-list' });
  //     }
  //   } catch (err) {
  //     FailedPopUp();
  //     const error = err as AxiosError<BackendErrorResponse>;
  //     if (error.response) {
  //       const backendError = error.response.data;
  //       backendErrors.message = backendError.message;
  //       backendErrors.errors = backendError.errors || {};
  //     } else if (error.request) {
  //       console.error('No response received:', error.request);
  //     } else {
  //       console.error('Error:', error.message);
  //     }
  //   }
  // }

  validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
             if (value instanceof File) {
              form.append(key, value);
            } else if (Array.isArray(value)) {
              value.forEach((item) => {
                form.append(`${key}[]`, item);
              });
            } else {
              form.append(key, String(value));
            }
          });
            try {
                let  url = config.baseURL+'/api/v1/hse-safety-checklist-hv';
                const response = await axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                SuccessPopUp();
                if (response.data !== undefined) {
                    router.push({ name: 'hse-safety-checklist-hv-list' });
                }
        
            } catch (error) {
              FailedPopUp();
                console.error('Error submitting form:', error);
            }
        
    }
};

// Fetch data from the API and update the state

onMounted(() => {
  
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Safety checklist HV Testing</h2>
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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Safety checklist HV Testing
          </div>
          <div class="p-0 md:p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Safety checklist HV Testing
          </div>
          <div class="mt-5 border">
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">
                        Hi-Pot Test Voltage to be applied available
                      </div>
                    </div>
                </div>
                
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied1" type="radio" name="Yes" value="Yes" />
                              <FormCheck.Label htmlFor="radio-switch-1">
                                  Yes
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied1" type="radio" name="No" value="No" />
                              <FormCheck.Label htmlFor="radio-switch-2">
                                  No
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="N/A" value="" />
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
                        <FormInput id="crud-form-1" v-model="formData.hv_remarks_1" class="w-full" type="text" name="hv_remarks_1" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Cordoning of the area under test done</div>
                      
                    </div>
                </div>
                
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied2" type="radio" name="hseLadder2" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied2" type="radio" name="hseLadder2" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied2" type="radio" name="hseLadder2" value="" />
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
                        <FormInput id="crud-form-1" v-model="formData.hv_remarks_2" class="w-full" type="text" name="hv_remarks_2" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">IR before Hi Pot test > 10 Mohm (>minimum value)</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied3" type="radio" name="hseLadder3" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied3" type="radio" name="hseLadder3" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied3" type="radio" name="hseLadder3" value="" />
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
                        <FormInput id="crud-form-1" v-model="formData.hv_remarks_3" class="w-full" type="text" name="hv_remarks_3" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
               
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Proper identification and connection of phase and neutral of variac for input to the kit</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied4" type="radio" name="hseLadder4" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied4" type="radio" name="hseLadder4" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied4" type="radio" name="hseLadder4" value="" />
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
                        <FormInput id="crud-form-1" v-model="formData.hv_remarks_4" class="w-full" type="text" name="hv_remarks_4" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
             
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Flashing light, alarm system working</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied5" type="radio" name="hseLadder5" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied5" type="radio" name="hseLadder5" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied5" type="radio" name="hseLadder5" value="" />
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
                        <FormInput id="crud-form-1" v-model="formData.hv_remarks_5" class="w-full" type="text" name="hv_remarks_5" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Testing engineer at safe distance from high voltage by locating control unit outside cordoned area</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied6" type="radio" name="hseLadder6" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied6" type="radio" name="hseLadder6" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied6" type="radio" name="hseLadder6" value="" />
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
                        <FormInput id="crud-form-1" v-model="formData.hv_remarks_6" class="w-full" type="text" name="hv_remarks_6" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Ensure firm connection of leads so that they do not break fall while the test is in progress</div>
                     
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied7" type="radio" name="hseLadder7" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied7" type="radio" name="hseLadder7" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied7" type="radio" name="hseLadder7" value="" />
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
                        <FormInput id="crud-form-1" v-model="formData.hv_remarks_7" class="w-full" type="text" name="hv_remarks_7" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Leak trip test of Hi-pot set</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied8" type="radio" name="hseLadder8" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied8" type="radio" name="hseLadder8" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied8" type="radio" name="hseLadder8" value="" />
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
                        <FormInput id="crud-form-1" v-model="formData.hv_remarks_8" class="w-full" type="text" name="hv_remarks_8" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">After Hi-Pot test before discharging, isolate 230 V AC power supply by physically removing three pin plug from socket</div>
                      
                    </div>
                </div>
                
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied9" type="radio" name="hseLadder9" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied9" type="radio" name="hseLadder9" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied9" type="radio" name="hseLadder9" value="" />
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
                        <FormInput id="crud-form-1" v-model="formData.hv_remarks_9" class="w-full" type="text" name="hv_remarks_9" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Equipment discharged for sufficient duration by proper discharge rod after Hi-pot test</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied10" type="radio" name="hseLadder10" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied10" type="radio" name="hseLadder10" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied10" type="radio" name="hseLadder10" value="" />
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
                        <FormInput id="crud-form-1" v-model="formData.hv_remarks_10" class="w-full" type="text" name="hv_remarks_10" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Discharge after DC Hi-Pot should be very slow, gradual and will consume more time</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied11" type="radio" name="hseLadder11" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied11" type="radio" name="hseLadder11" value="No" />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied11" type="radio" name="hseLadder11" value="" />
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
                        <FormInput id="crud-form-1" v-model="formData.hv_remarks_11" class="w-full" type="text" name="hv_remarks_11" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
               
          </div>
          <div class="mt-5">
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Checked By Name</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Person responsible for verification.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.checked_by.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.checked_by.$error,}" placeholder="Input Name of the Site"/>
                        <div class="flex justify-between">
                          <template v-if="validate.checked_by.$error">
                          <div v-for="(error, index) in validate.checked_by.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                            <div class="font-medium">Checked By Signature</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Person responsible for verification.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-2/3 flex-1 ">
                        <!-- <FormInput id="crud-form-1" v-model.trim="validate.checked_by_signature.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.checked_by_signature.$error,}" placeholder="Input Name of the Site"/> -->
                        <FormInput id="crud-form-1" class="w-full border" @change="checkedbysignature" multiple type="file" name="name"/>
                        <div class="flex justify-between">
                          <template v-if="validate.checked_by_signature.$error">
                          <div v-for="(error, index) in validate.checked_by_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                            Date of verification completion
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
                          v-model="checkedbydate"
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
                            v-model="checkedbydate"
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
                  <template v-if="validate.checked_by_date.$error">
                  <div v-for="(error, index) in validate.checked_by_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                            <div class="font-medium">Reviewed By Name </div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Person responsible for review.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.reviewed_by.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.reviewed_by.$error,}" placeholder="Input Name of the Site"/>
                        <div class="flex justify-between">
                          <template v-if="validate.reviewed_by.$error">
                          <div v-for="(error, index) in validate.reviewed_by.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                            <div class="font-medium">Reviewed By (Name & Signature)</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Person responsible for review.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" class="w-full border" @change="reviewedbysignature" multiple type="file" name="name"/>
                        <!-- <FormInput id="crud-form-1" v-model.trim="validate.reviewed_by_signature.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.reviewed_by_signature.$error,}" placeholder="Input Name of the Site"/> -->
                        <div class="flex justify-between">
                          <template v-if="validate.reviewed_by_signature.$error">
                          <div v-for="(error, index) in validate.reviewed_by_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                            Date of review completion
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
                          v-model="reviewedbydate"
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
                            v-model="reviewedbydate"
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
                  <template v-if="validate.reviewed_by_date.$error">
                  <div v-for="(error, index) in validate.reviewed_by_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
            <a href="">Safety checklist HV Testing</a>
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
              When filling out the Safety checklist HV Testing report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">Safety checklist HV Testing success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Safety checklist HV Testing failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
