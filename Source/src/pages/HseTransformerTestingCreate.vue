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
      stt_1_complied:'',
      stt_1_remarks:'',
      stt_2_complied:'',
      stt_2_remarks:'',
      stt_3_complied:'',
      stt_3_remarks:'',
      stt_4_complied:'',
      stt_4_remarks:'',
      stt_5_complied:'',
      stt_5_remarks:'',
      stt_6_complied:'',
      stt_6_remarks:'',
      stt_7_complied:'',
      stt_7_remarks:'',
      stt_8_complied:'',
      stt_8_remarks:'',
      stt_9_complied:'',
      stt_9_remarks:'',
      stt_10_complied:'',
      stt_10_remarks:'',
      stt_11_complied:'',
      stt_11_remarks:'',
      stt_12_complied:'',
      stt_12_remarks:'',
      stt_13_complied:'',
      stt_13_remarks:'',
      stt_14_complied:'',
      stt_14_remarks:'',
      stt_15_complied:'',
      stt_15_remarks:'',
      stt_16_complied:'',
      stt_16_remarks:'',
      stt_1_descriptions:'',
      stt_2_descriptions:'',
      stt_3_descriptions:'',
      stt_4_descriptions:'',
      stt_5_descriptions:'',
      stt_6_descriptions:'',
      stt_7_descriptions:'',
      stt_8_descriptions:'',
      stt_9_descriptions:'',
      stt_10_descriptions:'',
      stt_11_descriptions:'',
      stt_12_descriptions:'',
      stt_13_descriptions:'',
      stt_14_descriptions:'',
      stt_15_descriptions:'',
      stt_16_descriptions:'',
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
const ishvcomplied12 = ref("");
const ishvcomplied13 = ref("");
const ishvcomplied14 = ref("");
const ishvcomplied15 = ref("");
const ishvcomplied16 = ref("");


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
const state = reactive({
  token: getToken(),

});

const submitForm = async () => {
   formData.stt_1_descriptions = 'Magnetic Balance Test: While doing magnetic balance test from LV side the area should be well cordoned off to prevent anybody from coming close to the equipment which may include connected switchgear';
   formData.stt_2_descriptions = 'Magnetic Balance Test: While doing magnetic balance test from LV side, ensure that the HV side is not shorted and clearances for induced HV voltages are taken care of';
   formData.stt_3_descriptions = 'While doing magnetic balance (without variac) with one shot i.e. direct full voltage application, proper ELCB protection on supply side available to take care of inadvertent shorting or fault on secondary side of transformer';
   formData.stt_4_descriptions = 'Transformer neutral has been earthed after test.';
   formData.stt_5_descriptions = 'CT cores are shorted and grounded in its marshalling boxes.';
   formData.stt_6_descriptions = 'Device trial alarm and trip done';
   formData.stt_7_descriptions = 'Proper and safe discharge of transformer after every HV test (e.g. IR, HV Tan delta (Tan δ, TD) , etc.) done';
   formData.stt_8_descriptions = 'Firm connection of test leads so that they do not break and fall while the test is in progress';
   formData.stt_9_descriptions = 'Put on Rubber hand gloves before test lead connection';
   formData.stt_10_descriptions = 'Winding Resistance: After discharge of winding by test set, Switch off test supply. While changing the lead connection for different phase measurement, ensure supply plug is disconnected in addition to the above. Additionally, a banana shorting across terminal of transformer or test set may be used to ensure complete discharge.';
   formData.stt_11_descriptions = 'TTR / Voltage Ratio / Vector Group Test: Test should be done by injecting voltage on HV side';
   formData.stt_12_descriptions = 'Buchholz trials to be conducted by draining oil';
   formData.stt_13_descriptions = 'After Buchholz trials all the related isolating valves are opened and proper venting is done';
   formData.stt_14_descriptions = 'WTI / OTI Maximum Temp Indicator noted before the test';
   formData.stt_15_descriptions = 'WTI / OTI test all fans and pumps are ready for operation The fans are either covered or nobody is near the fan.  Pump suction and discharge lines are lined up';
   formData.stt_16_descriptions = 'WTI / OTI Maximum Temp Indicator reset after the test';
  formData.checked_by_date = checkedbydate.value;
  formData.reviewed_by_date = reviewedbydate.value;
  formData.stt_1_complied = ishvcomplied1.value;
  formData.stt_2_complied = ishvcomplied2.value;
  formData.stt_3_complied = ishvcomplied3.value;
  formData.stt_4_complied = ishvcomplied4.value;
  formData.stt_5_complied = ishvcomplied5.value;
  formData.stt_6_complied = ishvcomplied6.value;
  formData.stt_7_complied = ishvcomplied7.value;
  formData.stt_8_complied = ishvcomplied8.value;
  formData.stt_9_complied = ishvcomplied9.value;
  formData.stt_10_complied = ishvcomplied10.value;
  formData.stt_11_complied = ishvcomplied11.value;
  formData.stt_12_complied = ishvcomplied12.value;
  formData.stt_13_complied = ishvcomplied13.value;
  formData.stt_14_complied = ishvcomplied14.value;
  formData.stt_15_complied = ishvcomplied15.value;
  formData.stt_16_complied = ishvcomplied16.value;

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
                let  url = config.baseURL+'/api/v1/hse-Safety-tt';
                const response = await axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,
                },
                });
                SuccessPopUp();
                if (response.data !== undefined) {
                    router.push({ name: 'hse-Safety-tt-list' });
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
    <h2 class="mr-auto text-lg font-medium">Safety checklist for Transformer Testing</h2>
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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Safety checklist for Transformer Testing
          </div>
          <div class="p-0 md:p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Safety checklist for Transformer Testing
          </div>
          <div class="mt-5 border">
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">
                        Magnetic Balance Test: While doing magnetic balance test from LV side the area should be well cordoned off to prevent anybody from coming close to the equipment which may include connected switchgear.
                      </div>
                    </div>
                </div>
                
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switcha-1" v-model="ishvcomplied1" type="radio" name="Yes" value="Yes" />
                              <FormCheck.Label htmlFor="radio-switcha-1">
                                  Yes
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switcha-2" v-model="ishvcomplied1" type="radio" name="No" value="No" />
                              <FormCheck.Label htmlFor="radio-switcha-2">
                                  No
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switcha-3" v-model="ishvcomplied1" type="radio" name="N/A" value="" />
                              <FormCheck.Label htmlFor="radio-switcha-3">
                                N/A
                              </FormCheck.Label>
                          </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_1_remarks" class="w-full" type="text" name="stt_1_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Magnetic Balance Test: While doing magnetic balance test from LV side, ensure that the HV side is not shorted and clearances for induced HV voltages are taken care of.</div>
                      
                    </div>
                </div>
                
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchb-1" v-model="ishvcomplied2" type="radio" name="hseLadder2" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchb-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchb-2" v-model="ishvcomplied2" type="radio" name="hseLadder2" value="No" />
                            <FormCheck.Label htmlFor="radio-switchb-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchb-3" v-model="ishvcomplied2" type="radio" name="hseLadder2" value="" />
                            <FormCheck.Label htmlFor="radio-switchb-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                    </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_2_remarks" class="w-full" type="text" name="stt_2_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">While doing magnetic balance (without variac) with one shot i.e. direct full voltage application, proper ELCB protection on supply side available to take care of inadvertent shorting or fault on secondary side of transformer.</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchc-1" v-model="ishvcomplied3" type="radio" name="hseLadder3" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchc-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchc-2" v-model="ishvcomplied3" type="radio" name="hseLadder3" value="No" />
                            <FormCheck.Label htmlFor="radio-switchc-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchc-3" v-model="ishvcomplied3" type="radio" name="hseLadder3" value="" />
                            <FormCheck.Label htmlFor="radio-switchc-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_3_remarks" class="w-full" type="text" name="stt_3_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
               
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Transformer neutral has been earthed after test.</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchd-1" v-model="ishvcomplied4" type="radio" name="hseLadder4" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchd-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchd-2" v-model="ishvcomplied4" type="radio" name="hseLadder4" value="No" />
                            <FormCheck.Label htmlFor="radio-switchd-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchd-3" v-model="ishvcomplied4" type="radio" name="hseLadder4" value="" />
                            <FormCheck.Label htmlFor="radio-switchd-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_4_remarks" class="w-full" type="text" name="stt_4_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
             
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">CT cores are shorted and grounded in its marshalling boxes.</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switche-1" v-model="ishvcomplied5" type="radio" name="hseLadder5" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switche-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switche-2" v-model="ishvcomplied5" type="radio" name="hseLadder5" value="No" />
                            <FormCheck.Label htmlFor="radio-switche-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switche-3" v-model="ishvcomplied5" type="radio" name="hseLadder5" value="" />
                            <FormCheck.Label htmlFor="radio-switche-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_5_remarks" class="w-full" type="text" name="stt_5_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Device trial alarm and trip done.</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchf-1" v-model="ishvcomplied6" type="radio" name="hseLadder6" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchf-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchf-2" v-model="ishvcomplied6" type="radio" name="hseLadder6" value="No" />
                            <FormCheck.Label htmlFor="radio-switchf-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchf-3" v-model="ishvcomplied6" type="radio" name="hseLadder6" value="" />
                            <FormCheck.Label htmlFor="radio-switchf-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_6_remarks" class="w-full" type="text" name="stt_6_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Proper and safe discharge of transformer after every HV test (e.g. IR, HV Tan delta (Tan δ, TD) , etc.) done.</div>
                     
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchg-1" v-model="ishvcomplied7" type="radio" name="hseLadder7" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchg-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchg-2" v-model="ishvcomplied7" type="radio" name="hseLadder7" value="No" />
                            <FormCheck.Label htmlFor="radio-switchg-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchg-3" v-model="ishvcomplied7" type="radio" name="hseLadder7" value="" />
                            <FormCheck.Label htmlFor="radio-switchg-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_7_remarks" class="w-full" type="text" name="stt_7_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Firm connection of test leads so that they do not break and fall while the test is in progress.</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchh-1" v-model="ishvcomplied8" type="radio" name="hseLadder8" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchh-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchh-2" v-model="ishvcomplied8" type="radio" name="hseLadder8" value="No" />
                            <FormCheck.Label htmlFor="radio-switchh-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchh-3" v-model="ishvcomplied8" type="radio" name="hseLadder8" value="" />
                            <FormCheck.Label htmlFor="radio-switchh-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_8_remarks" class="w-full" type="text" name="stt_8_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Put on Rubber hand gloves before test lead connection.</div>
                      
                    </div>
                </div>
                
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchi-1" v-model="ishvcomplied9" type="radio" name="hseLadder9" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchi-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchi-2" v-model="ishvcomplied9" type="radio" name="hseLadder9" value="No" />
                            <FormCheck.Label htmlFor="radio-switchi-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchi-3" v-model="ishvcomplied9" type="radio" name="hseLadder9" value="" />
                            <FormCheck.Label htmlFor="radio-switchi-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_9_remarks" class="w-full" type="text" name="stt_9_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Winding Resistance: After discharge of winding by test set, Switch off test supply. While changing the lead connection for different phase measurement, ensure supply plug is disconnected in addition to the above. Additionally, a banana shorting across terminal of transformer or test set may be used to ensure complete discharge</div>
                      
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchj-1" v-model="ishvcomplied10" type="radio" name="hseLadder10" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchj-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchj-2" v-model="ishvcomplied10" type="radio" name="hseLadder10" value="No" />
                            <FormCheck.Label htmlFor="radio-switchj-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchj-3" v-model="ishvcomplied10" type="radio" name="hseLadder10" value="" />
                            <FormCheck.Label htmlFor="radio-switchj-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_10_remarks" class="w-full" type="text" name="stt_10_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">TTR / Voltage Ratio / Vector Group Test: Test should be done by injecting voltage on HV side</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchk-1" v-model="ishvcomplied11" type="radio" name="hseLadder11" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchk-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchk-2" v-model="ishvcomplied11" type="radio" name="hseLadder11" value="No" />
                            <FormCheck.Label htmlFor="radio-switchk-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchk-3" v-model="ishvcomplied11" type="radio" name="hseLadder11" value="" />
                            <FormCheck.Label htmlFor="radio-switchk-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_11_remarks" class="w-full" type="text" name="stt_11_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">Buchholz trials to be conducted by draining oil.</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchl-1" v-model="ishvcomplied12" type="radio" name="hseLadder12" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchl-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchl-2" v-model="ishvcomplied12" type="radio" name="hseLadder12" value="No" />
                            <FormCheck.Label htmlFor="radio-switchl-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchl-3" v-model="ishvcomplied12" type="radio" name="hseLadder12" value="" />
                            <FormCheck.Label htmlFor="radio-switchl-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_12_remarks" class="w-full" type="text" name="stt_12_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">After Buchholz trials all the related isolating valves are opened and proper venting is done.</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchm-1" v-model="ishvcomplied13" type="radio" name="hseLadder13" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchm-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchm-2" v-model="ishvcomplied13" type="radio" name="hseLadder13" value="No" />
                            <FormCheck.Label htmlFor="radio-switchm-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchm-3" v-model="ishvcomplied13" type="radio" name="hseLadder13" value="" />
                            <FormCheck.Label htmlFor="radio-switchm-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_13_remarks" class="w-full" type="text" name="stt_13_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">WTI / OTI Maximum Temp Indicator noted before the test.</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchn-1" v-model="ishvcomplied14" type="radio" name="hseLadder14" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchn-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchn-2" v-model="ishvcomplied14" type="radio" name="hseLadder14" value="No" />
                            <FormCheck.Label htmlFor="radio-switchn-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchn-3" v-model="ishvcomplied14" type="radio" name="hseLadder14" value="" />
                            <FormCheck.Label htmlFor="radio-switchn-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_14_remarks" class="w-full" type="text" name="stt_14_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">WTI / OTI test all fans and pumps are ready for operation The fans are either covered or nobody is near the fan.  Pump suction and discharge lines are lined up</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switcho-1" v-model="ishvcomplied15" type="radio" name="hseLadder15" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switcho-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switcho-2" v-model="ishvcomplied15" type="radio" name="hseLadder15" value="No" />
                            <FormCheck.Label htmlFor="radio-switcho-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switcho-3" v-model="ishvcomplied15" type="radio" name="hseLadder15" value="" />
                            <FormCheck.Label htmlFor="radio-switcho-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_15_remarks" class="w-full" type="text" name="stt_15_remarks" placeholder="Input Remarks"/>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="font-medium">WTI / OTI Maximum Temp Indicator reset after the test.</div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchp-1" v-model="ishvcomplied16" type="radio" name="hseLadder16" value="Yes" />
                            <FormCheck.Label htmlFor="radio-switchp-1">
                                Yes
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="mr-2">
                            <FormCheck.Input id="radio-switchp-2" v-model="ishvcomplied16" type="radio" name="hseLadder16" value="No" />
                            <FormCheck.Label htmlFor="radio-switchp-2">
                                No
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck class="">
                            <FormCheck.Input id="radio-switchp-3" v-model="ishvcomplied16" type="radio" name="hseLadder16" value="" />
                            <FormCheck.Label htmlFor="radio-switchp-3">
                                N/A
                            </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                </div>
                <div class="md:w-1/3 px-2 w-full">
                    <div class="p-4">
                      <div>
                        <FormInput id="crud-form-1" v-model="formData.stt_16_remarks" class="w-full" type="text" name="stt_16_remarks" placeholder="Input Remarks"/>
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
            <a href="">Safety checklist for Transformer Testing</a>
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
              When filling out the safety checklist for Transformer Testing report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">safety checklist for Transformer Testing success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">safety checklist for Transformer Testing failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
