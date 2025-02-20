<script setup lang="ts">
import { ref, reactive, toRefs,onMounted } from 'vue';
import axios from 'axios';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import Button from "@/components/Base/Button";
import { useRouter } from 'vue-router';
import Notification from "@/components/Base/Notification";
import Lucide from "@/components/Base/Lucide";
import config from "@/config";
import { getToken } from '../auth/setToken';
import TooltipIcon from "@/components/Custom/TooltipIcon.vue";

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
        area:'',
        location:'',
        location_id:'',
        day_time_reading:'',
        night_time_reading:'',
        date_of_test:'',
        standar_limit:''
});

const router = useRouter();

const state = reactive({
  token: getToken(),
});


const categories = ref(["1", "3"]);
const editorConfig = {
  toolbar: {
    items: ['heading','undo', 'redo', 'bold', 'italic', 'link', 'numberedList', 'bulletedList','fontsize'],
  },
};
const auditdate = ref("");


const rules = {
        area: {required,minLength: minLength(3),},
        location: {required,minLength: minLength(3),},
        location_id: {required,minLength: minLength(3),},
        day_time_reading: {required,minLength: minLength(3),},
        night_time_reading: {required,minLength: minLength(3),},
        date_of_test: {required,minLength: minLength(3),},
        standar_limit: {required,minLength: minLength(3),},
};

const validate = useVuelidate(rules, toRefs(formData));


const submitForm = async () => {
    formData.date_of_test = auditdate.value;
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {

            try {
                let  url = config.baseURL+'/api/v1/hse-noise-intensity-measurement';
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,

                },
                });
                console.log('Form submitted successfully:', response.data);
                if (response.data !== undefined) {
                    router.push({ name: 'hse-noise-intensity-measurement-list' });
                }
        
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        
            SuccessPopUp();
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
onMounted(() => {
});

</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Calculate Ladder Length</h2>
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
          Note: This calculator is for educational purposes only. Always follow manufacturer guidelines for accurate Ladder Length calculation.
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
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Ladder Length Calculator
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-col flex-wrap mt-2 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center pr-4">
                    <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">Vertical Height (VH) (m):
                      <TooltipIcon tooltipText="Vertical Height (VH) (m)"/>
                    </div>
                    <!-- <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md mt-6 xl:mt-3.5">
                      Required
                    </div> -->
                  </div>
                </div>
              </FormLabel>
              <!-- <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-3" v-model.trim="validate.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name.$error,}" placeholder="Input Name"/>
                  <div class="flex justify-between">
                    <template v-if="validate.name.$error">
                      <div v-for="(error, index) in validate.name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                        {{ error.$message }}
                      </div>
                    </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                </div>
              </div> -->
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput class="w-full" type="number" name="" placeholder="Enter vertical height (max 6 m)"/>
                  <div class="flex justify-between">
                    <p class="text-right mt-2 w-full"> Required</p>
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
          Calculate
        </Button>
      </div>

      <!-- results:start -->
      <div class="relative p-5 mt-10 border rounded-md bg-success/20 dark:bg-darkmode-600 border-success dark:border-0">
          <h2 class=" text-lg font-medium">Results: </h2>
          <div class="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-500">
            <div class="mt-1 text-sm"><strong>Required Ladder Length: 5.12 m.</strong></div>
          </div>
      </div>
      <!-- results:end -->
    </div>
    <div class="hidden col-span-2 intro-y 2xl:block">
      <div class="sticky top-0 pt-10">
        <ul
          class="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]"
        >
          <li
            class="pl-5 mb-4 font-medium border-l-2 border-primary dark:border-primary text-primary"
          >
            <a href="">Insert Safety Observations</a>
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
   <!-- <Notification id="success-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Noise Intensity Measurement Create success!</div>
        </div>
      </Notification> -->
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <!-- <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Noise Intensity Measurement Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification> -->
      <!-- END: Failed Notification Content -->
</template>