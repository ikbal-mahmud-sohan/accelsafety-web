<script setup lang="ts">
import _ from "lodash";
import fakerData from "@/utils/faker";
import {
  FormInput,
  FormInline,
  FormSelect,
  FormLabel,
  FormHelp,
  FormCheck,
  InputGroup,
  FormSwitch,
} from "@/components/Base/Form";
import Tippy from "@/components/Base/Tippy";
import Table from "@/components/Base/Table";
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
import Litepicker from "@/components/Base/Litepicker";
import Alert from "@/components/Base/Alert";
import { getToken } from './../auth/setToken';
import TooltipIcon from "@/components/Custom/TooltipIcon.vue";



const router = useRouter();
const subcategory = ref(["0"]);
const editorData = ref("");
const date = ref("");
const deadlinedate = ref("");
const time_date = ref("");
const selectedIncidentCategory = ref("");
const editorConfig = {
  toolbar: {
    items: ['heading','undo', 'redo', 'bold', 'italic', 'link', 'numberedList', 'bulletedList','fontsize'],
  },
};


const formUnitInput = reactive({
  unit_name: '',
});

const state = reactive({
  respUnit: [] as Array<any>,
  token: getToken(),

});

interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const rules = {
    unit_name: {minLength: minLength(1)},
};

const validate = useVuelidate(rules, toRefs(formUnitInput));
const backendErrors = reactive<{
    message: string;
    errors: { [key: string]: string[] };
}>({
    message: '',
    errors: {}
});


  const submitForm = async () => {
      validate.value.$touch();
      if (validate.value.$invalid) {
      FailedPopUp();
  } else {

  try {
      let  url = config.baseURL+'/api/v1/unit-name';
      const response = await axios.post(url, formUnitInput,{
                headers: {
                    'Authorization': state.token,
                },
                });
      console.log('Form submitted successfully:', response.data);
      if(response.data != undefined){
          SuccessPopUp();
          state.respUnit = response.data.data;
          formUnitInput.unit_name = " ";
      }
  } catch (err) {
      FailedPopUp();
      const error = err as AxiosError<BackendErrorResponse>;
    if (error.response) {
        const backendError = error.response.data;
        console.error('Error submitting form:', backendError.message);
        backendErrors.message = backendError.message;
        backendErrors.errors = backendError.errors || {};
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error:', error.message);
    }
  }

  const successEl = document
  .querySelectorAll("#success-notification-content")[0]
  .cloneNode(true) as HTMLElement;
  successEl.classList.remove("hidden");
}
};

const fetchUnitName = async () => {
  try {
   let  url = config.baseURL+'/api/v1/unit-name';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.respUnit = response.data.data;
    console.log("xyz",state.respUnit)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const deleteUnitName = async (sID:string) => {
  console.log("sID",sID)

  try {
    let url = config.baseURL+"/api/v1/unit-name/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.respUnit = response.data.data;
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
  fetchUnitName();
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Add Unit Input</h2>
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
          Ensure all fields are accurate, use the correct date format, and upload relevant files in the specified format and size.
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
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Unit
          </div>
          <div class="mt-5">
            <FormInline class="flex-col pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center pr-4">
                    <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3.5">name
                      <TooltipIcon tooltipText="Name of the unit or division the employee belongs to "/>
                    </div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md mt-6 xl:mt-3.5">
                      Required
                    </div>
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate.unit_name.$model" class="w-full" type="text" name="unit_name":class="{ 'border-danger': validate.unit_name.$error,}" placeholder="Input Unit Name" @keydown.enter="submitForm"/>
                <template v-if="validate.unit_name.$error">
                  <div v-for="(error, index) in validate.unit_name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
                <FormHelp class="text-right"> Required, at least 3 characters </FormHelp>
              </div>
            </FormInline>
            
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 flex flex-wrap" >
          <ul v-for="(data, index) in state.respUnit" :key="index" class="">
            <li class="p-2">
              <span class=" inline-block px-4 py-3 bg-gray-100 rounded-sm min-w-52 md:min-w-36 text-center"> 
              {{data.unit_name}}
              <a class="ml-2"  href="javascript:;" @click="deleteUnitName(data.id)">×</a>
              </span>
            </li>
          </ul>
        </div>
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
            <a href="">Input Unit</a>
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
              When filling out the Unit report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">Resp Department Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Resp Department Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
   <Notification id="success-type-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Owner Department  Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-type-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Owner Department  Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
   <Notification id="success-injury-type-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium"> Plant Name Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-injury-type-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium"> Plant Name Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
