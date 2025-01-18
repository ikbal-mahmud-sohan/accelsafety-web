<script setup lang="ts">
import { ref, reactive, toRefs,onMounted, watch } from 'vue';
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
import Alert from "@/components/Base/Alert";
import _ from "lodash";


const formData = reactive({
    date: '',
    month: '',
    company_name: '',
    unit: '',
    type: '',
    energy_used: '',
    input_numeric: 0,
});
const state = reactive({
  token: getToken(),

});
const router = useRouter();

const rules = {
        month: {required,},
        company_name: {required,},
        unit: {required,},
        type: {required,},
        energy_used: {required,},
        input_numeric: {required,},
};

const validate = useVuelidate(rules, toRefs(formData));
const selectedMonth = ref("");
const selectedType = ref("");


const submitForm = async () => {
  formData.month = selectedMonth.value;
  formData.type = selectedType.value;
  
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {

            try {
                let  url = config.baseURL+'/api/v1/energy-records';
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,
                },
                });
                console.log("xyz", response.data)
                if (response.data != undefined){
                    SuccessPopUp();
                router.push({ name: 'energy-records-list' });

                }
        
            } catch (error) {
                FailedPopUp();
                console.error('Error submitting form:', error);
            }
        
    }
};

watch(selectedType, (newValue) => {
  if (newValue === 'ERC') {
    formData.energy_used = 'KW/hr';
  } else if (newValue === 'Diesel') {
    formData.energy_used = 'Litter';
  } else if (newValue === 'CNG' || newValue === 'LPG') {
    formData.energy_used = 'm3';
  } else {
    formData.energy_used = ''; // Clear or set default
  }
});

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
    <h2 class="mr-auto text-lg font-medium">Add Energy Records </h2>
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
          Create a form for managing Energy Records, including fields for energy consumption data, date, and associated metrics.
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
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">Month</div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Select the month for the energy record.
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <!-- <FormInput id="crud-form-5" v-model.trim="validate.category.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.category.$error,}" placeholder="Input Category"/> -->

                          <select id="crud-form-6" v-model="selectedMonth"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                                <option value="" disabled>Select Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                          </select>
                          
                          <div class="flex justify-between">
                            <template v-if="validate.month.$error">
                            <div v-for="(error, index) in validate.month.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Company Name</div>
                              <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                Required
                              </div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Enter the name of the company associated with the energy record.
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.company_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.company_name.$error,}" placeholder="Input Company Name"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.company_name.$error">
                            <div v-for="(error, index) in validate.company_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Unit</div>
                              <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                Required
                              </div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Specify the unit of measurement for the energy consumption.
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.unit.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unit.$error,}" placeholder="Input Unit"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.unit.$error">
                            <div v-for="(error, index) in validate.unit.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Type</div>
                              <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                Required
                              </div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Select the type of fuel or energy source used.
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <!-- <FormInput id="crud-form-5" v-model.trim="validate.category.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.category.$error,}" placeholder="Input Category"/> -->

                          <select id="crud-form-6" v-model="selectedType"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 text-gray-500">
                            <option value="" disabled>Select Fuel Type</option>
                            <option value="ERC">ERC</option>
                            <option value="Diesel">Diesel</option>
                            <option value="CNG">CNG</option>
                            <option value="LPG">LPG</option>
                          </select>
                          
                          <div class="flex justify-between">
                            <template v-if="validate.type.$error">
                            <div v-for="(error, index) in validate.type.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Energy Used</div>
                              <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                Required
                              </div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Enter the amount of energy consumed based on the selected type
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.energy_used.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.energy_used.$error,}" placeholder="Input Energy Used"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.energy_used.$error">
                            <div v-for="(error, index) in validate.energy_used.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                      <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium text-nowrap">Input Numeric</div>
                              <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                Required
                              </div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              The underlying reason or cause of the accident.
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.input_numeric.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.input_numeric.$error,}" placeholder="Input Input Numeric"/>  
                          <div class="flex justify-between">
                            <template v-if="validate.input_numeric.$error">
                            <div v-for="(error, index) in validate.input_numeric.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
            <a href="">Energy Records</a>
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
          <div class="font-medium text-nowrap">Energy Records Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium text-nowrap">Energy Records Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>