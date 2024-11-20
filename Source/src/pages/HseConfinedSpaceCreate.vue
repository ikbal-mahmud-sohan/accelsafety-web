<script setup lang="ts">
import { ref, reactive, toRefs,onMounted } from 'vue';
import axios from 'axios';
import Button from "@/components/Base/Button";
import { useRouter } from 'vue-router';
import Notification from "@/components/Base/Notification";
import Lucide from "@/components/Base/Lucide";
import config from "@/config";
import {
  FormInput,
  FormLabel,
} from "@/components/Base/Form";
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import Toastify from 'toastify-js';
import Alert from "@/components/Base/Alert";
import _ from "lodash";
import { getToken } from './../auth/setToken'


const formData = reactive({
        confined_space_no:'',
        location:'',
        responsible_department:'',
        cs_image:[] as File[],
});

const state = reactive({
  token: getToken(),

});
const router = useRouter();


const editorConfig = {
  toolbar: {
    items: ['heading','undo', 'redo', 'bold', 'italic', 'link', 'numberedList', 'bulletedList','fontsize'],
  },
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.cs_image = Array.from(input.files);
  }
};

const rules = {
        confined_space_no: {required,minLength: minLength(3),},
        location: {required,},
        responsible_department: { required, minLength: minLength(3),},
        cs_image: {required },
};

const validate = useVuelidate(rules, toRefs(formData));


const submitForm = async () => {
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {
        const form = new FormData();
            (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
            if (key !== 'cs_image') {
                form.append(key, formData[key] as string);
            }
            });
            formData.cs_image.forEach((file, index) => {
            form.append(`cs_image[${index}]`, file);
            });

            try {
                let  url = config.baseURL+'/api/v1/hse-confined-space';
                const response = await axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,

                },
                });
                console.log('Form submitted successfully:', response.data);
                if (response.data !== undefined) {
                    router.push({ name: 'hse-confined-space-list' });
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

</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Add Confined Space</h2>
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
          Ensure accurate online Confined Space with correct date formats and file uploads in the specified format and size.
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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Confined Space
          </div>
          <div class="flex flex-wrap items-center justify-between">
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Confined Space No.</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Unique identifier for confined space.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.confined_space_no.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.confined_space_no.$error,}" placeholder="Input Confined Space No."/>
                        <div class="flex justify-between">
                          <template v-if="validate.confined_space_no.$error">
                          <div v-for="(error, index) in validate.confined_space_no.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                            <div class="font-medium">Location</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Specific area or site identified.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.location.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.location.$error,}" placeholder="Input location"/>
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
              
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Responsible Department</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Department overseeing the area.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.responsible_department.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.responsible_department.$error,}" placeholder="Input Responsible Department"/>
                        <div class="flex justify-between">
                          <template v-if="validate.responsible_department.$error">
                          <div v-for="(error, index) in validate.responsible_department.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                            <div class="font-medium">Images</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Visual representation or photo.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
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
                                
                              <div v-if="formData.cs_image.length" class="w-full space-y-2">
                                <div v-for="(file, index) in formData.cs_image" :key="index" class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow">
                                  <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                                </div>
                              </div>
                          </div>
                      
                          <div class="flex justify-between">
                            <template v-if="validate.cs_image.$error">
                            <div v-for="(error, index) in validate.cs_image.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
            <a href="">Insert Confined Space</a>
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
              When filling out the Confined Space report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium"> Confined Space Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium"> Confined Space Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>