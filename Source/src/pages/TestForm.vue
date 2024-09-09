<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
import axios, { AxiosError } from 'axios';
import Button from "@/components/Base/Button";
import { useRouter,useRoute } from 'vue-router';
import Notification from "@/components/Base/Notification";
import Lucide from "@/components/Base/Lucide";
import config from "@/config";
import Alert from "@/components/Base/Alert";
import {
  FormInput,
  FormLabel,
} from "@/components/Base/Form";
import useVuelidate from '@vuelidate/core';
import { required, minLength,} from '@vuelidate/validators';
import Toastify from 'toastify-js';

const formData = reactive({
    name: '',
    image1:[] as File[],
    image2:[] as File[],
    radio1:[] as string[],
    radio2:[] as string[],
});
const router = useRouter();
const route = useRoute();
interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.image1 = Array.from(input.files);
  }
};
const handleFileChange2 = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.image2 = Array.from(input.files);
  }
};

const rules = {
    name: {required,},
    image1: {required,},
    image2: {required,},
    radio1: {required,},
    radio2: {required,},
};

const validate = useVuelidate(rules, toRefs(formData));
const backendErrors = reactive<{
    message: string;
    errors: { [key: string]: string[] };
}>({
    message: '',
    errors: {}
});
const radio1Items = ['radio 1', 'radio 2', 'radio 3', 'radio 4'];
const selectedradio1Items = ref<string[]>([]);
const handleCheckboxChange = (event: { target: { value: string; checked: boolean; }; }) => {
  const value = event.target.value;
  if (event.target.checked) {
    selectedradio1Items.value.push(value);
  } else {
    selectedradio1Items.value = selectedradio1Items.value.filter(item => item !== value);
  }
};
const radio2Items = ['radio2 1', 'radio2 2', 'radio2 3', 'radio2 4'];
const selectedradio2Items = ref<string[]>([]);
const handleCheckboxChange2 = (event: { target: { value: string; checked: boolean; }; }) => {
  const value = event.target.value;
  if (event.target.checked) {
    selectedradio2Items.value.push(value);
  } else {
    selectedradio2Items.value = selectedradio2Items.value.filter(item => item !== value);
  }
};

const submitForm = async () => {
  formData.radio1 = selectedradio1Items.value
  formData.radio2 = selectedradio2Items.value

    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
        FailedPopUp()
    } else {
          const form = new FormData();

    // Iterate over formData properties
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
          
            let url = config.baseURL+'/api/v1/test-purpose';
            try {
                const response = await axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                if (response.data !== undefined) {
                    SuccessPopUp();
                   console.log("response ",response.data)
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

</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Update Accident</h2>
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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />image1
          </div>
          <div class="mt-5">
           <FormInline class="flex-col items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Name</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Name of the Investigation Team.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-15" v-model.trim="validate.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name.$error,}" placeholder="Input Responsible Name"/>

                  <template v-if="validate.name.$error">
                    <div v-for="(error, index) in validate.name.$errors" :key="index" class="mt-2 text-danger">
                      {{ error.$message }}
                    </div>
                  </template>
              </div>
              
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">image1</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Any additional files or documents related to the accident.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormLabel htmlFor="crud-form-13">Attachment</FormLabel>
                    <div class="flex flex-col items-center justify-center w-full space-y-4">
                      <label for="file-upload" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-300">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12a4 4 0 014-4h3m5 8h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.707 2.707a1 1 0 01-.707.293H13m-4 8H6a2 2 0 01-2-2v-5a2-2h2.586c.265 0 .52.105.707.293l2.707 2.707a1 1 0 00.707.293H18m0 0l2 2M15 12v2m4 0l-4-4"></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input id="file-upload" type="file" class="hidden" multiple @change="handleFileChange"/>
                      </label>
                      <div v-if="formData.image1.length" class="w-full space-y-2">
                        <div
                          v-for="(file, index) in formData.image1"
                          :key="index"
                          class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow"
                        >
                          <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                  <div class="flex justify-between">
                    <template v-if="validate.image1.$error">
                    <div v-for="(error, index) in validate.image1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right w-full mt-2"> Required</p>
                  </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">image2</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Any additional files or documents related to the accident.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormLabel htmlFor="crud-form-13">Attachment</FormLabel>
                    <div class="flex flex-col items-center justify-center w-full space-y-4">
                      <label for="file-upload2" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-300"
                      >
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            class="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16V12a4 4 0 014-4h3m5 8h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.707 2.707a1 1 0 01-.707.293H13m-4 8H6a2 2 0 01-2-2v-5a2-2h2.586c.265 0 .52.105.707.293l2.707 2.707a1 1 0 00.707.293H18m0 0l2 2M15 12v2m4 0l-4-4"
                            ></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input
                          id="file-upload2"
                          type="file"
                          class="hidden"
                          multiple
                          @change="handleFileChange2"
                        />
                      </label>
                      

                      <!-- Display Uploaded File Names -->
                      <div v-if="formData.image2.length" class="w-full space-y-2">
                        <div
                          v-for="(file, index) in formData.image2"
                          :key="index"
                          class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow"
                        >
                          <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                  <div class="flex justify-between">
                    <template v-if="validate.image2.$error">
                    <div v-for="(error, index) in validate.image2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right w-full mt-2"> Required</p>
                  </div>
              </div>
              
            </FormInline>
            
          </div>
        </div>
      </div>
      
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />radio 1
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">radio 1</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    The events, actions and/or conditions which led to the incident
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="flex">
                  <div v-for="item in radio1Items" :key="item">
                  <label>
                    <input type="checkbox" :value="item" @change="handleCheckboxChange" />
                    {{ item }}
                  </label>
                </div>
                </div>
                <div class="flex justify-between">
                  <template v-if="validate.radio1.$error">
                    <div
                      v-for="(error, index) in validate.radio1.$errors"
                      :key="index"
                      class="mt-2 text-danger whitespace-nowrap" >
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right mt-2 w-full">Required, at least 3 characters</p>
                </div>
              </div>
            </FormInline>
            
          </div>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />radio 2
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">radio 2</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    The events, actions and/or conditions which led to the incident
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="flex">
                  <div v-for="item in radio2Items" :key="item">
                  <label>
                    <input type="checkbox" :value="item" @change="handleCheckboxChange2" />
                    {{ item }}
                  </label>
                </div>
                </div>
                <div class="flex justify-between">
                  <template v-if="validate.radio2.$error">
                    <div
                      v-for="(error, index) in validate.radio2.$errors"
                      :key="index"
                      class="mt-2 text-danger whitespace-nowrap" >
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right mt-2 w-full">Required, at least 3 characters</p>
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
            <a href="">Insert Accident</a>
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
              When filling out the accident report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">Accident Update success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Accident Update failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
