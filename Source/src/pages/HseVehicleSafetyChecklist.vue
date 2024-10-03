<script setup lang="ts">
import { ref, reactive, toRefs,onMounted } from 'vue';
import axios from 'axios';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import Button from "@/components/Base/Button";
import { useRouter } from 'vue-router';
import Notification from "@/components/Base/Notification";
import Lucide from "@/components/Base/Lucide";
import config from "@/config";
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


const formData = reactive({
      inspection_date:'',
      mileage:'',
      vehicle_id_no:'',
      vehicle_type:'',
      maker:'',
      place_of_inspection:'',
      inspector:'',
      date_of_last_inspection:'',
      tires:'',
      tires_satisfactory:'',
      tires_unsatisfactory:'',
      foot_brake:'',
      foot_brake_satisfactory:'',
      foot_brake_unsatisfactory:'',
      hand_brake:'',
      hand_brake_satisfactory:'',
      hand_brake_unsatisfactory:'',
      lights:'',
      lights_satisfactory:'',
      lights_unsatisfactory:'',
      turn_indicators:'',
      turn_indicators_satisfactory:'',
      turn_indicators_unsatisfactory:'',
      horn:'',
      horn_satisfactory:'',
      horn_unsatisfactory:'',
      window_glasses:'',
      window_glasses_satisfactory:'',
      window_glasses_unsatisfactory:'',
      engine_oil_level:'',
      engine_oil_level_satisfactory:'',
      engine_oil_level_unsatisfactory:'',
      brake_oil_level:'',
      brake_oil_level_satisfactory:'',
      brake_oil_level_unsatisfactory:'',
      hydraulic_oil_level:'',
      hydraulic_oil_level_satisfactory:'',
      hydraulic_oil_level_unsatisfactory:'',
      engine_coolant_level:'',
      engine_coolant_level_satisfactory:'',
      engine_coolant_level_unsatisfactory:'',
      portable_fire_extinguisher:'',
      portable_fire_extinguisher_satisfactory:'',
      portable_fire_extinguisher_unsatisfactory:'',
      breakdown_kit:'',
      breakdown_kit_satisfactory:'',
      breakdown_kit_unsatisfactory:'',
      first_aid_kit:'',
      first_aid_kit_satisfactory:'',
      first_aid_kit_unsatisfactory:'',
      legal_documents:'',
      legal_documents_satisfactory:'',
      legal_documents_unsatisfactory:'',
      fuel:'',
      fuel_satisfactory:'',
      fuel_unsatisfactory:'',
      signature_of_inspector:[] as File[],
      inspector_name:'',
      inspector_designation:'',
      signature_of_drivers:[] as File[],
});
const inspectionDate = ref("");
const state = reactive({
  viewOwnerDepartment: [] as Array<any>,
  viewRespDepartment: [] as Array<any>,
  viewPlantName: [] as Array<any>,
});
const router = useRouter();

const SignatureInspectorFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.signature_of_inspector = Array.from(input.files);
    console.log("sohan",formData.signature_of_inspector)
  }
};

const SignatureDriversFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.signature_of_drivers = Array.from(input.files);
  }
};


const rules = {
        inspection_date: {required,minLength: minLength(3),},
        mileage: {required,},
        vehicle_id_no: { required, minLength: minLength(3),},
        vehicle_type: {required },
        maker: {required },
        place_of_inspection: { required, minLength: minLength(3),},
        inspector: { required, minLength: minLength(3),},
        date_of_last_inspection: { required, minLength: minLength(3),},
        signature_of_inspector: { required},
        inspector_name: { required, minLength: minLength(3),},
        inspector_designation: { required, minLength: minLength(3),},
        signature_of_drivers: { required},
};

const validate = useVuelidate(rules, toRefs(formData));


const submitForm = async () => {
    formData.inspection_date = inspectionDate.value;
    
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
          console.log("form",form);


            try {
                let  url = config.baseURL+'/api/v1/hse-vehicle-safety';
                console.log("sohan",url)
                const response = await axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                console.log('Form submitted successfully:', response.data);
                if (response.data !== undefined) {
                    router.push({ name: 'hse-vehicle-safety-list' });
                }
        
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        
            SuccessPopUp();
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
});

</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Vehicle Safety Checklist</h2>
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
          Ensure accurate online Vehicle Safety Checklist with correct date formats and file uploads in the specified format and size.
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
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Vehicle Inspection
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Inspection date</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Vehicle Inspection Checklist Inspection date.
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
                          v-model="inspectionDate"
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
                  <template v-if="validate.inspection_date.$error">
                  <div v-for="(error, index) in validate.inspection_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required</p>
                </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Mileage</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Mileage
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate.mileage.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.mileage.$error,}" placeholder="Input mileage"/>
                <div class="flex justify-between">
                  <template v-if="validate.mileage.$error">
                  <div v-for="(error, index) in validate.mileage.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                  </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">vehicle id No</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    vehicle_id_no
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate.vehicle_id_no.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.vehicle_id_no.$error,}" placeholder="Input vehicle id No"/>
                <div class="flex justify-between">
                  <template v-if="validate.vehicle_id_no.$error">
                  <div v-for="(error, index) in validate.vehicle_id_no.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                  </div>
              </div>
            </FormInline>
     
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Vehicle Type</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    vehicle_type
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate.vehicle_type.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.vehicle_type.$error,}" placeholder="Input Vehicle Type"/>
                <div class="flex justify-between">
                  <template v-if="validate.vehicle_type.$error">
                  <div v-for="(error, index) in validate.vehicle_type.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                  </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Maker</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    maker
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate.maker.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.maker.$error,}" placeholder="Input Maker"/>
                <div class="flex justify-between">
                  <template v-if="validate.maker.$error">
                  <div v-for="(error, index) in validate.maker.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                  </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Place Of Inspection</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    place_of_inspection
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate.place_of_inspection.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.place_of_inspection.$error,}" placeholder="Input place_of_inspection"/>
                <div class="flex justify-between">
                  <template v-if="validate.place_of_inspection.$error">
                  <div v-for="(error, index) in validate.place_of_inspection.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                  </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Inspector</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    inspector
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate.inspector.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.inspector.$error,}" placeholder="Input Inspector"/>
                <div class="flex justify-between">
                  <template v-if="validate.inspector.$error">
                  <div v-for="(error, index) in validate.inspector.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                  </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Date Of Last Inspection</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    date_of_last_inspection
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate.date_of_last_inspection.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.date_of_last_inspection.$error,}" placeholder="Input Date Of Last Inspection"/>
                
              </div>
            </FormInline>
          </div>
        </div>
      </div>

      
      
      
      
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Info
          </div>
          <div class="mt-5">
                <div class="hidden md:flex justify-between py-5 items-center bg-gray-200">
                    <div class="w-20 ">
                        <div class="px-4 py-4"> No. </div>
                    </div>
                    <div class="w-1/4">
                        <div class="px-4 py-4 "> Item description</div>
                    </div>
                    <div class="w-1/4">
                        <div class="px-4 py-4 "> Satisfactory (S)</div>
                    </div>
                    <div class="w-1/4">
                        <div class="px-4 py-4 "> Unsatisfactory (U)</div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 1 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Tires (front, rear, spare)
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.tires_satisfactory" class="w-full" type="text" name="name" placeholder="Input Tires Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.tires_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Tires Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 2 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Foot brake
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.foot_brake_satisfactory" class="w-full" type="text" name="name" placeholder="Input Foot Brake Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.foot_brake_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Hand Brake Satisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 3 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Hand brake
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.hand_brake_satisfactory" class="w-full" type="text" name="name" placeholder="Input Hand Brake Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.hand_brake_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Hand Brake Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 4 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Lights (head, back, parking, brake)
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.lights_satisfactory" class="w-full" type="text" name="name" placeholder="Input Lights Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.lights_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Lights Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 5 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Turn Indicators
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.turn_indicators_satisfactory" class="w-full" type="text" name="name" placeholder="Input Indicators Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.turn_indicators_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Indicators Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 6 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Horn
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.horn_satisfactory" class="w-full" type="text" name="name" placeholder="Input Horn Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.horn_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Horn Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 7 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Windshield
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.window_glasses_satisfactory" class="w-full" type="text" name="name" placeholder="Input Window Glasses Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.window_glasses_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Window Glasses Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 8 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Window glasses (no jam)
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.engine_oil_level_satisfactory" class="w-full" type="text" name="name" placeholder="Input Engine Oil Level Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.engine_oil_level_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Engine Oil Level Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 9 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Engine oil level
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.brake_oil_level_satisfactory" class="w-full" type="text" name="name" placeholder="Input Brake Oil Level Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.brake_oil_level_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Brake Oil Level Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 10 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Brake oil level
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.hydraulic_oil_level_satisfactory" class="w-full" type="text" name="name" placeholder="Input Hydraulic Oil Level Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.hydraulic_oil_level_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Hydraulic Oil Level Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 11 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Hydraulic oil level
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.engine_coolant_level_satisfactory" class="w-full" type="text" name="name" placeholder="Input Engine Coolant Level Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.engine_coolant_level_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Engine Coolant Level Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 12 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Engine coolant level
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.portable_fire_extinguisher_satisfactory" class="w-full" type="text" name="name" placeholder="Input Portable Fire Extinguisher Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.portable_fire_extinguisher_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Portable Fire Extinguisher Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 13 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Portable fire extinguisher
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.breakdown_kit_satisfactory" class="w-full" type="text" name="name" placeholder="Input Breakdown Kit Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.breakdown_kit_satisfactory" class="w-full" type="text" name="name" placeholder="Input Breakdown Kit Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 14 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Breakdown kit
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.first_aid_kit_satisfactory" class="w-full" type="text" name="name" placeholder="Input First Aid Kit Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.first_aid_kit_satisfactory" class="w-full" type="text" name="name" placeholder="Input First Aid Kit Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 15 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            First aid kit
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.legal_documents_satisfactory" class="w-full" type="text" name="name" placeholder="Input Legal Documents Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.legal_documents_satisfactory" class="w-full" type="text" name="name" placeholder="Input Legal Documents Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 16 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Legal documents
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.legal_documents_satisfactory" class="w-full" type="text" name="name" placeholder="Input Legal Documents Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.legal_documents_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Legal Documents Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between py-5 items-center ">
                    <div class="w-full md:w-20 h-full">
                        <div class="px-4 py-4 "> 17 </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            Fuel/lube oil leakage that crates environmental pollution
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                            <FormInput id="crud-form-16" v-model="formData.fuel_satisfactory" class="w-full" type="text" name="name" placeholder="Input Fuel Satisfactory"/>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="px-4 py-4 "> 
                          <div class="">
                              <FormInput id="crud-form-16" v-model="formData.fuel_unsatisfactory" class="w-full" type="text" name="name" placeholder="Input Fuel Unsatisfactory"/>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
        </div>
      </div>
      
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Comments and recommendations
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Inspector Name</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                    
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Inspector Name
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate.inspector_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.inspector_name.$error,}" placeholder="Input Inspector Name"/>
                <div class="flex justify-between">
                  <template v-if="validate.inspector_name.$error">
                  <div v-for="(error, index) in validate.inspector_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                  </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Inspector Designation</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                    
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Inspector Designation
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate.inspector_designation.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.inspector_designation.$error,}" placeholder="Input Inspector Designation"/>
                <div class="flex justify-between">
                  <template v-if="validate.inspector_designation.$error">
                  <div v-for="(error, index) in validate.inspector_designation.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                  </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Signature of Inspector</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                    
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Inspector Designation
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <input id="SignatureInspectorFileChange" type="file" class="" multiple @change="SignatureInspectorFileChange"/>
                <div class="flex justify-between">
                  <template v-if="validate.signature_of_inspector.$error">
                        <div v-for="(error, index) in validate.signature_of_inspector.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap px-4">
                          {{ error.$message }}
                        </div>
                      </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                  </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Signature Of Drivers</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                    
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Signature Of Drivers
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <input id="SignatureDriversFileChange" type="file" class="" multiple @change="SignatureDriversFileChange"/>
                <div class="flex justify-between">
                  <template v-if="validate.signature_of_drivers.$error">
                        <div v-for="(error, index) in validate.signature_of_drivers.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap px-4">
                          {{ error.$message }}
                        </div>
                      </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                  </div>
              </div>
            </FormInline>
            <!-- sohan  -->
            
            <!-- sohan  -->
            
            
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
            <a href="">Insert Vehicle Safety Checklist</a>
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
              When filling out the Vehicle Safety Checklist report, be specific and clear with details, using the correct date format and precise descriptions..
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