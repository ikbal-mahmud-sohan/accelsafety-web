<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, nextTick } from 'vue';
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
import Preview from "@/components/Base/Preview";
import Litepicker from "@/components/Base/Litepicker";
import Alert from "@/components/Base/Alert";
import _ from "lodash";
import fakerData from "@/utils/faker";
import Tippy from "@/components/Base/Tippy";
import Table from "@/components/Base/Table";
import TomSelect from "@/components/Base/TomSelect";


const formData = reactive({
  number: '',
  version: '',
  title: '',
  records_date: '',
  descriptions: '',
});
const state = reactive({
  viewOwnerDepartment: [] as Array<any>,
  viewRespDepartment: [] as Array<any>,
  viewPlantName: [] as Array<any>,
  viewEmp: [] as Array<any>,
  token: getToken(),

});
const router = useRouter();


const categories = ref(["1", "3"]);
const editorConfig = {
  toolbar: {
    items: [
      'heading', 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript',
      '|', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
      '|', 'alignment', 'outdent', 'indent', 'numberedList', 'bulletedList',
      '|', 'link', 'insertTable', 'blockQuote',
      '|', 'undo', 'redo', 'findAndReplace', 'highlight', 'code', 'codeBlock',
      '|', 'horizontalLine', 'specialCharacters', 'removeFormat'
    ],
  },

  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  },
  mediaEmbed: {
    previewsInData: true
  }
};

const editorData = ref("");
const recordsdate = ref("");


const rules = {
  number: { required, integer },
  descriptions: { required, minLength: minLength(3), },
};

const validate = useVuelidate(rules, toRefs(formData));


const submitForm = async () => {
  formData.descriptions = editorData.value;
  formData.records_date = recordsdate.value;
  validate.value.$touch();
  console.log(validate.value)
  if (validate.value.$invalid) {
    FailedPopUp();
  } else {


    try {
      let url = config.baseURL + '/api/v1/accel-safety-words';
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': state.token,
        },
      });
      router.push({ name: 'accel-safety-words' });

    } catch (error) {
      console.error('Error submitting form:', error);
    }

    SuccessPopUp();
  }
};
// Ext Function 

function FailedPopUp() {
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
function SuccessPopUp() {

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
    <h2 class="mr-auto text-lg font-medium">Add Accel Safety Word </h2>
  </div>
  <div class="grid grid-cols-11 pb-20 mt-5 gap-x-6">
    <!-- BEGIN: Notification -->
    <Alert variant="primary" dismissible class="col-span-11 mb-6 intro-y box dark:border-darkmode-600"
      v-slot="{ dismiss }">
      <div class="flex items-center">
        <span>
          <Lucide icon="Info" class="w-4 h-4 mr-2" />
        </span>
        <span>
          Provide the document's unique number, version for tracking changes, title for identification, and the records date to maintain accurate documentation
        </span>
        <Alert.DismissButton class="text-white" @click="dismiss" aria-label="Close">
          <Lucide icon="X" class="w-4 h-4" />
        </Alert.DismissButton>
      </div>
    </Alert>

    <!-- BEGIN: Notification -->
    <div class="col-span-2 intro-y block  xl:hidden ">
      <div class="sticky top-0 pt-10">
        <ul
          class="text-slate-500 ">
          
          <li class="pl-5 mb-4 font-medium text-primary md:hidden flex justify-between">
            <div class="">
              <div class="pb-4 flex  items-center">
                <span class="flex justify-center items-center text-white rounded-full w-6 h-6 bg-cyan-600">1</span>
                <div class=" h-1px w-full bg-cyan-400"></div>
              </div>
              <div class="px-1">
                <p>Create</p>
                
              </div>
            </div>
            <div class="">
              <div class="pb-4 flex items-center">
                <span class="flex justify-center items-center text-white rounded-full w-6 h-6 bg-blue-600">2</span>
                <div class=" h-1px w-full bg-gray-400"></div>
                
              </div>
              <div class="px-1">
                <p>Review</p>
                
              </div>
            </div>
            <div class="">
              <div class="pb-4 flex items-center">
                <span class="flex justify-center items-center text-gray-400 rounded-full w-6 h-6 bg-gray-300">3</span>
                <div class=" h-1px w-full bg-gray-400"></div>

                
              </div>
              <div class="px-1">
                <p>Approval</p>
              </div>
            </div>
            <div class="">
              <div class="pb-4 flex items-center">
                <span class="flex justify-center items-center text-gray-400 rounded-full w-6 h-6 bg-gray-300">4</span>
                <div class=" h-1px w-full bg-gray-400"></div>

                
              </div>
              <div class="px-1">
                <p>View</p>
              </div>
            </div>
            <div class="">
              <div class="pb-4 flex items-center">
                <span class="flex justify-center items-center text-gray-400 rounded-full w-6 h-6 bg-gray-300">5</span>
                
              </div>
              <div class="px-1">
                <p>Modifications</p>
              </div>
            </div>
            
          </li>


        </ul>

      </div>
    </div>
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
                        <div class="font-medium text-nowrap">Number</div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        A unique identifier or reference number.
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-9" v-model.trim="validate.number.$model" class="w-full" type="text"
                      name="name" :class="{ 'border-danger': validate.number.$error, }"
                      placeholder="Input Number" />
                    <div class="flex justify-between">
                      <template v-if="validate.number.$error">
                        <div v-for="(error, index) in validate.number.$errors" :key="index"
                          class="mt-2 text-danger whitespace-nowrap">
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
                        <div class="font-medium text-nowrap">Version</div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        Specifies the document's version or revision.
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-9" v-model="formData.version" class="w-full" type="text" name="name"
                      placeholder="Input Version" />
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
                        <div class="font-medium text-nowrap">Title</div>
                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        Represents the document's main heading or name.
                      </div>
                    </div>
                  </FormLabel>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-9" v-model="formData.title" class="w-full" type="text" name="name"
                      placeholder="Input Title" />
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
                        <div class="font-medium text-nowrap">Records Date</div>

                      </div>
                      <div class="mt-3 text-xs leading-relaxed text-slate-500">
                        Indicates the date the record was created.
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
                          <Litepicker v-model="recordsdate" :options="{
                            autoApply: false,
                            showWeekNumbers: true,
                            dropdowns: {
                              minYear: 1990,
                              maxYear: null,
                              months: true,
                              years: true,
                            },
                          }" class="pl-12" />
                        </div>
                      </Preview.Panel>
                      <Preview.Panel type="source">
                        <Preview.Highlight>
                          {{ `
                          <div class="relative w-56 mx-auto">
                            <div
                              class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                              <Lucide icon="Calendar" class="w-4 h-4" />
                            </div>
                            <Litepicker v-model="recordsdate" :options="{
                                        autoApply: false,
                                        showWeekNumbers: true,
                                        dropdowns: {
                                          minYear: 1990,
                                          maxYear: null,
                                          months: true,
                                          years: true,
                                        },
                                      }" class="pl-12" />
                          </div>
                          `}}
                        </Preview.Highlight>
                      </Preview.Panel>

                    </Preview>
                  </div>
                </FormInline>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div
            class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Word
          </div>
          <div class="mt-5">

            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <ClassicEditor v-model="editorData" :class="{ 'border-danger': validate.descriptions.$error, }"
                  :config="editorConfig" />

                <div class="flex justify-between">
                  <template v-if="validate.descriptions.$error">
                    <div v-for="(error, index) in validate.descriptions.$errors" :key="index"
                      class="mt-2 text-danger whitespace-nowrap">
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 character</p>
                </div>
              </div>
            </FormInline>

          </div>
        </div>
      </div>
      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <Button type="button" class="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52">
          Cancel
        </Button>
        <Button variant="primary" type="button" class="w-full py-3 md:w-52" @click="submitForm">
          Save
        </Button>
      </div>
    </div>
    <div class="col-span-2 intro-y hidden  xl:block ">
      <div class="sticky top-0 pt-10">
        <ul
          class="text-slate-500 ">
          <li class="pl-5 mb-4 font-medium text-primary hidden md:block">
            <div class="flex items-start">
              <div class="pb-4 ">
                <span class="flex justify-center items-center text-white rounded-full w-6 h-6 bg-cyan-600 mb-4 ">1</span>
                <span class="flex justify-center items-center w-6 h-6">
                  <span class=" block h-10 w-1px bg-cyan-500"></span>
                </span>
              </div>
              <div class="px-2">
                <p>Create</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="pb-4 ">
                <span class="flex justify-center items-center text-white rounded-full w-6 h-6 bg-blue-600 mb-4 ">2</span>
                <span class="flex justify-center items-center w-6 h-6">
                  <span class=" block h-10 w-1px bg-blue-500 bg-gray-300"></span>
                </span>
              </div>
              <div class="px-2">
                <p>Review</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="pb-4 ">
                <span class="flex justify-center items-center text-gray-400 rounded-full w-6 h-6 bg-gray-300 mb-4 ">3</span>
                <span class="flex justify-center items-center w-6 h-6">
                  <span class=" block h-10 w-1px bg-blue-500 bg-gray-300"></span>
                </span> 
              </div>
              <div class="px-2">
                <p>Approval</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="pb-4 ">
                <span class="flex justify-center items-center text-gray-400 rounded-full w-6 h-6 bg-gray-300 mb-4 ">3</span>
                <span class="flex justify-center items-center w-6 h-6">
                  <span class=" block h-10 w-1px bg-blue-500 bg-gray-300"></span>
                </span> 
              </div>
              <div class="px-2">
                <p>View</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="pb-4 ">
                <span class="flex justify-center items-center text-gray-400 rounded-full w-6 h-6 bg-gray-300 mb-4 ">5</span>
                
              </div>
              <div class="px-2">
                <p>Modifications</p>
              </div>
            </div>
            
          </li>
         


        </ul>

      </div>
    </div>
    

  </div>
  <!-- BEGIN: Success Notification Content -->
  <Notification id="success-notification-content" class="flex hidden">
    <Lucide icon="CheckCircle" class="text-success" />
    <div class="ml-4 mr-4">
      <div class="font-medium">Accel Safety Word Create success!</div>
    </div>
  </Notification>
  <!-- END: Success Notification Content -->
  <!-- BEGIN: Failed Notification Content -->
  <Notification id="failed-notification-content" class="flex items-center hidden">
    <Lucide icon="XCircle" class="text-danger" />
    <div class="ml-4 mr-4">
      <div class="font-medium">Accel Safety Word Create failed!</div>
      <div class="mt-1 text-slate-500">Please check the fileld form.</div>
    </div>
  </Notification>
  <!-- END: Failed Notification Content -->
</template>