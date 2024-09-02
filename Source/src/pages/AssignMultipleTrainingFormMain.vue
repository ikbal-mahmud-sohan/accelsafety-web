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


// Define your state using the reactive function
const state = reactive({
  employeeData: [] as Array<any>,
  trainingTopicData: [] as Array<any>,
  departmentData: [] as Array<any>,
  unitData: [] as Array<any>,
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
    items: ["bold", "italic", "link"],
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

  validate.value.$touch();
  if (validate.value.$invalid) {
    FailedPopUp();
  } else {
    try {
      const url = config.baseURL + '/api/v1/assign-multiple-training';
      const response = await axios.post(url, payload);
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
    const response = await axios.get(url);
    state.employeeData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchEmployeeDataByUnit = async (payload:any) => {
  try {
   let  url = config.baseURL+'/api/v1/employee?unit_name='+payload;
    const response = await axios.get(url);
    state.employeeData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchEmployeeData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/employee';
    const response = await axios.get(url);
    state.employeeData = response.data.data;

    console.log("sohan 1",state.employeeData)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchTrainingTopicData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/trainingTopics';
    const response = await axios.get(url);
    state.trainingTopicData = response.data.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchUnitData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/unit';
    const response = await axios.get(url);
    state.unitData = response.data.unit_names;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchDepartmentData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/department';
    const response = await axios.get(url);
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
    <h2 class="mr-auto text-lg font-medium">Assign Multiple Training Form</h2>
  </div>
  <div class="flex flex-wrap items-center justify-between w-full">
      <div class="w-full md:w-1/2">
              <div class="px-4 py-2">
              <FormLabel htmlFor="crud-form-6" class="flex flex-col w-full sm:flex-row">
                Employee list by Department
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required</span>
                </FormLabel>
                <select id="crud-form-6" @change="fetchEmployeeDataByDepartment(selectedCategoryType)" v-model="selectedCategoryType" class="w-full border border-gray-300 rounded-lg text-sm  dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                  <option value="" disabled>Select Department</option>
                  <option v-for="(data, index) in state.departmentData" :key="index" :value="data.name">{{data.name}}</option>
                </select>
              </div> 
        </div>
      <div class="w-full md:w-1/2">
              <div class="px-4 py-2">
              <FormLabel htmlFor="crud-form-6" class="flex flex-col w-full sm:flex-row">
                Employee list by Unit
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required</span>
                </FormLabel>
                <select id="crud-form-6" @change="fetchEmployeeDataByUnit(selectedCategoryType)" v-model="selectedCategoryType" class="w-full border border-gray-300 rounded-lg text-sm  dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                  <option value="" disabled>Select Unit</option>
                  <option v-for="(data, index) in state.unitData" :key="index" :value="data">{{data}}</option>
                </select>
              </div> 
        </div>
  </div>


  <div class="flex flex-wrap justify-between w-full">
        
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <!-- BEGIN: Data List -->
                <div class="overflow-auto intro-y">
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
                          <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                            {{ report.emp_id }}
                          </Table.Td>
                          <Table.Td class="box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                            {{ report.name }}
                          </Table.Td>
                          <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                            {{ report.designation }}
                          </Table.Td>
                          <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                            {{ report.department }}
                          </Table.Td>
                          <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                            {{ report.unit_name }}
                          </Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                   
                  </div>
                  <!-- END: Data List -->
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
              <FormLabel htmlFor="crud-form-6" class="flex flex-col w-full sm:flex-row">
                Training Topic
                <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required</span>
              </FormLabel>
              <select id="crud-form-6" v-model="selectedtrainingTopic" class="w-full border border-gray-300 rounded-lg">
                <option value="" disabled>Select Training</option>
                <option v-for="(data, index) in state.trainingTopicData" :key="index" :value="data.id">{{ data.name }}</option>
              </select>
              <template v-if="validate.training_topic_id.$error">
                <div v-for="(error, index) in validate.training_topic_id.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                  {{ error.$message }}
                </div>
              </template>
            </div> 
            <div class="w-full px-4 py-4">
            <template v-if="backendErrors.errors">
                <div v-for="(messages, field) in backendErrors.errors" :key="field" class="mt-2 text-danger flex">
                <p class=" capitalize mr-2"><strong>{{ field }}:</strong></p>
                <ul>
                    <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
                </ul>
                </div>
            </template>
            </div>
            <div class="mt-5 text-right">
              <Button type="button" variant="outline-secondary" class="w-24 mr-4">
                Cancel
              </Button>
              <Button type="button" variant="primary" class="w-24" @click="submitForm">
                Save
              </Button>
            </div>
            <!-- Display selected employee IDs -->
         <!-- <div class="px-4 py-4">
                      <h3>Selected Employee IDs:</h3>
                      <ul>
                        <li v-for="(id, idx) in selectedEmployeeIds" :key="idx">{{ id }}</li>
                      </ul>
                    </div> -->
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
