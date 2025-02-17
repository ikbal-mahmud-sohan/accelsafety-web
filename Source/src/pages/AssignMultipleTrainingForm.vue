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
import Table from '@/components/Base/Table';
import Alert from "@/components/Base/Alert";
import { getToken } from './../auth/setToken'



// Define your state using the reactive function
const state = reactive({
  employeeData: [] as Array<any>,
  trainingTopicData: [] as Array<any>,
  departmentData: [] as Array<any>,
  unitData: [] as Array<any>,
  token: getToken(),

});

import {
  FormInput,
  FormLabel,
  FormSwitch,
  InputGroup,
  FormCheck,
} from "@/components/Base/Form";

const formData = reactive({
  employee_id:'',
  training_topic_id:'',
  status:'0',
  date:'',
});
const router = useRouter();
// Array to hold the selected employee IDs
const selectedEmployeeIds = ref<string[]>([]);

const categories = ref(["1", "3"]);
const editorConfig = {
  toolbar: {
    items: ['heading','undo', 'redo', 'bold', 'italic', 'link', 'numberedList', 'bulletedList','fontsize'],
  },
};
interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const selectedtrainingTopic = ref("");
const selectedEmployee = ref("");
const selectedCategoryType = ref("");


const rules = {
      training_topic_id: {required},
       
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
  formData.training_topic_id = selectedtrainingTopic.value;
  const payload = {
    trainings: selectedEmployeeIds.value.map((employee_id) => ({
      employee_id: employee_id,
      training_topic_id: formData.training_topic_id,
    })),
  };
  console.log("validate.value",validate.value)
  console.log("payload",payload)
  validate.value.$touch();
  if (validate.value.$invalid) {
    FailedPopUp();
  } else {
    try {
      const url = config.baseURL + '/api/v1/assign-multiple-training';
      const response = await axios.post(url, payload,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if (response.data != undefined) {
        SuccessPopUp();
        router.push({ name: 'training-data-list' });
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

const fetchEmployeeDataByDepartment = async (payload:any) => {
  try {
   let  url = config.baseURL+'/api/v1/employee?department='+payload;
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.employeeData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchEmployeeDataByUnit = async (payload:any) => {
  try {
   let  url = config.baseURL+'/api/v1/employee?unit_name='+payload;
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.employeeData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchEmployeeData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/employee';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.employeeData = response.data.data;

    console.log("sohan 1",state.employeeData)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchTrainingTopicData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/trainingTopics';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.trainingTopicData = response.data.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchUnitData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/unit';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.unitData = response.data.unit_names;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchDepartmentData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/department';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.departmentData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Toggle all checkboxes
const toggleSelectAll = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.checked) {
    // Add all employee IDs to selectedEmployeeIds
    selectedEmployeeIds.value = state.employeeData.map((report) => report.id);
  } else {
    // Clear all selections
    selectedEmployeeIds.value = [];
  }
};

onMounted(() => {
  fetchTrainingTopicData();
  fetchDepartmentData();
  fetchUnitData();
  fetchEmployeeData();
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Assign Multiple Training</h2>
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
      <div class="p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Employee list
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center pr-4">
                    <div class="font-medium text-sm text-nowrap flex mt-5 xl:mt-2">By Department
                      <span class="relative group cursor-pointer ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                          Sort employees by department to easily view and manage team-specific lists
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <select id="crud-form-6" @change="fetchEmployeeDataByDepartment(selectedCategoryType)" v-model="selectedCategoryType" class="w-full border border-gray-300 rounded-lg text-sm  dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                  <option value="" disabled>Select Department</option>
                  <option value="">All</option>
                  <option v-for="(data, index) in state.departmentData" :key="index" :value="data.name">{{data.name}}</option>
                </select>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center pr-4">
                    <div class="font-medium text-sm text-nowrap flex mt-5 xl:mt-2">By Unit
                      <span class="relative group cursor-pointer ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                          Sort employees by  unit to easily view and manage team-specific lists
                        </div>
                      </span>
                    </div>
                    
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <select id="crud-form-6" @change="fetchEmployeeDataByUnit(selectedCategoryType)" v-model="selectedCategoryType" class="w-full border border-gray-300 rounded-lg text-sm  dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                  <option value="" disabled>Select Unit</option>
                  <option value="">All</option>
                  <option v-for="(data, index) in state.unitData" :key="index" :value="data">{{data}}</option>
                </select>
              </div>
            </FormInline>
          </div>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="overflow-auto intro-y  max-h-96">
                    <Table class="border-spacing-y-[10px] border-separate -mt-2">
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">
                            <FormCheck>
                              <FormCheck.Input
                                id="checkbox-switch-1"
                                type="checkbox"
                                value=""
                                 @change="toggleSelectAll"
                                :checked="selectedEmployeeIds.length === state.employeeData.length"
                              />
                              <FormCheck.Label htmlFor="checkbox-switch-1">
                                All
                              </FormCheck.Label>
                            </FormCheck>
                          </Table.Th>
                          <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Employee ID</Table.Th>
                          <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">NAME</Table.Th>
                          <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> DESIGNATIONS</Table.Th>
                          <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">department</Table.Th>
                          <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Unit</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        <Table.Tr v-for="(report, index) in state.employeeData" :key="index" class="intro-x">
                          <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                            <FormCheck class="mt-2">
                            <FormCheck.Input
                              id="checkbox-switch-1"
                              class="allcheckbox"
                              type="checkbox"
                              :value="report.id"
                              v-model="selectedEmployeeIds"
                            />
                          </FormCheck>
                          </Table.Td>
                          <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                            {{ report.emp_id }}
                          </Table.Td>
                          <Table.Td class="whitespace-nowrap box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                            {{ report.name }}
                          </Table.Td>
                          <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                            {{ report.designation }}
                          </Table.Td>
                          <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                            {{ report.department }}
                          </Table.Td>
                          <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                            {{ report.unit_name }}
                          </Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                   
                  </div>
                  <div class="flex justify-between py-2 border-t border-gray-300">
                  <p class="text-right mt-2 w-full"> Required</p>
                </div>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />   Training Topic
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center pr-4">
                    <div class="font-medium text-sm text-nowrap flex mt-5 xl:mt-2">  Training Topic
                      <span class="relative group cursor-pointer ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                          The unique ID of the training topic assigned to the employee
                        </div>
                      </span>
                    </div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md mt-5 xl:mt-2">
                      Required
                    </div>
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <select id="crud-form-6" v-model="selectedtrainingTopic" class="w-full border border-gray-300 rounded-lg text-sm  dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                  <option value="" disabled>Select Training</option>
                  <option v-for="(data, index) in state.trainingTopicData" :key="index" :value="data.id">{{ data.name }}</option>
              </select>
              <div class="flex justify-between">
                  <template v-if="validate.training_topic_id.$error">
                    <div v-for="(error, index) in validate.training_topic_id.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
            <a href="">Assign Multiple Training</a>
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
              When filling out the Assign Multiple Training report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">Assign Training success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Assign Training failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
