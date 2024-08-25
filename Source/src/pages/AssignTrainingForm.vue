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


// Define your state using the reactive function
const state = reactive({
  employeeData: [] as Array<any>,
  trainingTopicData: [] as Array<any>,
});

import {
  FormInput,
  FormLabel,
  FormSwitch,
  InputGroup,
} from "@/components/Base/Form";

const formData = reactive({
  employee_id:'',
  training_topic_id:'',
  status:'0',
  date:'',
});
const router = useRouter();

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

const rules = {
  
      employee_id: {required},
      training_topic_id: {required},
      status: {required},
      date: {required},
       
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
  formData.employee_id = selectedEmployee.value;
  formData.training_topic_id = selectedtrainingTopic.value;

  validate.value.$touch();
  if (validate.value.$invalid) {
    FailedPopUp();
  } else {
    try {
      const url = config.baseURL + '/api/v1/assign-training';
      const response = await axios.post(url, formData);
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

// Fetch data from the API and update the state
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
    console.log("sohan 2",state.trainingTopicData)

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
onMounted(() => {
  fetchEmployeeData();
  fetchTrainingTopicData();
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Assign Training Form</h2>
  </div>

  <div class="flex flex-wrap items-center justify-between w-full">

        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
            <FormLabel htmlFor="crud-form-6" class="flex flex-col w-full sm:flex-row">
              Employee
                <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required</span>
              </FormLabel>
              <select id="crud-form-6" v-model="selectedEmployee"  class="w-full border border-gray-300 rounded-lg">
                <option value="" disabled>Select Employee</option>
                <option v-for="(data, index) in state.employeeData" :key="index" :value="data.id">{{ data.name }}</option>
              </select>
              <template v-if="validate.employee_id.$error">
                <div v-for="(error, index) in validate.employee_id.$errors" :key="index" class="mt-2 text-danger">
                  {{ error.$message }}
                </div>
              </template>
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
                <!-- Add more options as needed -->
              </select>
              <template v-if="validate.training_topic_id.$error">
                <div v-for="(error, index) in validate.training_topic_id.$errors" :key="index" class="mt-2 text-danger">
                  {{ error.$message }}
                </div>
              </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-16" class="flex flex-col w-full sm:flex-row">Date
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required</span>
                </FormLabel>
                <FormInput id="crud-form-16" v-model.trim="validate.date.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.date.$error,}" placeholder="Input date"/>
                <template v-if="validate.date.$error">
                  <div v-for="(error, index) in validate.date.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-17" class="flex flex-col w-full sm:flex-row">Status
                </FormLabel>
                <FormSwitch.Input id="crud-form-17" v-model.trim="validate.status.$model" type="checkbox" />
            </div>
        </div>
        
        <div class="w-full px-4 py-4">
        <!-- <p v-if="backendErrors.message" class="text-red-500 text-sm">{{ backendErrors.message }}</p> -->
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
