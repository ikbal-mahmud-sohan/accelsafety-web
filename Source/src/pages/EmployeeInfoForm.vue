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
  departmentData: [] as Array<any>,
  designationData: [] as Array<any>,
});

import {
  FormInput,
  FormLabel,
  FormSwitch,
  InputGroup,
} from "@/components/Base/Form";

const formData = reactive({
  name:'',
  emp_id:'',
  first_name:'',
  last_name:'',
  unit_name:'',
  location:'',
  designation:'',
  designationInput:'',
  department:'',
  departmentInput:'',
  employee_type:'',
});
const designationformData = reactive({
        name:'',
});
const departmentformData = reactive({
        name:'',
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
const selectedDesignation = ref("");
const selectedDepartment = ref("");
const selectedEmployeeType = ref("");

const rules = {
        name: {required},
        emp_id: {required,},
        first_name: {required,},
        last_name: {required,},
        unit_name: {required,},
        location: {required,},
        designation: {required,},
        department: { required, },
        employee_type: {required },
       
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
console.log("formData xyz",formData)
  if(selectedDesignation.value === ""){
    formData.designation = formData.designationInput;
    designationformData.name = formData.designationInput
    try {
            let  url = config.baseURL+'/api/v1/designation';
            const response = await axios.post(url, designationformData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
    
        } catch (error) {
            console.error('Error submitting form:', error);
        }
  }else{
    formData.designation = selectedDesignation.value;
  }

  if(selectedDepartment.value === ""){
    formData.department = formData.departmentInput;
    departmentformData.name =formData.departmentInput;
    try {
          let  url = config.baseURL+'/api/v1/department';
          const response = await axios.post(url, departmentformData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
          });
  
      } catch (error) {
          console.error('Error submitting form:', error);
      }
  }else{
    formData.department = selectedDepartment.value;
  }
  
  formData.employee_type = selectedEmployeeType.value;

  validate.value.$touch();
  console.log("validate.value.$invalid",validate)
  if (validate.value.$invalid) {
    FailedPopUp();
  } else {
    try {
      const url = config.baseURL + '/api/v1/employee';
      const response = await axios.post(url, formData);
      if (response.data != undefined) {
        SuccessPopUp();
        router.push({ name: 'employee-info-list' });
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

function departnemtChange(){
  formData.departmentInput = ""
}
function designationChange(){
  formData.designationInput = ""
}

// Fetch data from the API and update the state
const fetchDepartmentData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/department';
    const response = await axios.get(url);
    state.departmentData = response.data.data;

    console.log("sohan",state.departmentData)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchDesignationData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/designation';
    const response = await axios.get(url);
    state.designationData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
onMounted(() => {
  fetchDepartmentData();
  fetchDesignationData();
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Create Human Resource Data</h2>
  </div>

  <div class="flex flex-wrap items-center justify-between w-full">
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-3" class="flex flex-col w-full sm:flex-row">Name
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-3" v-model.trim="validate.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name.$error,}" placeholder="Input Name"/>
                <template v-if="validate.name.$error">
                  <div v-for="(error, index) in validate.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-3" class="flex flex-col w-full sm:flex-row">Employee ID
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-3" v-model.trim="validate.emp_id.$model" class="w-full" type="text" name="emp_id":class="{ 'border-danger': validate.emp_id.$error,}" placeholder="Input Employee ID"/>
                <template v-if="validate.emp_id.$error">
                  <div v-for="(error, index) in validate.emp_id.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-3" class="flex flex-col w-full sm:flex-row">First Name
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-3" v-model.trim="validate.first_name.$model" class="w-full" type="text" name="first_name":class="{ 'border-danger': validate.first_name.$error,}" placeholder="Input First Name"/>
                <template v-if="validate.first_name.$error">
                  <div v-for="(error, index) in validate.first_name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-3" class="flex flex-col w-full sm:flex-row">Last Name
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-3" v-model.trim="validate.last_name.$model" class="w-full" type="text" name="last_name":class="{ 'border-danger': validate.last_name.$error,}" placeholder="Input Last Name"/>
                <template v-if="validate.last_name.$error">
                  <div v-for="(error, index) in validate.last_name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-3" class="flex flex-col w-full sm:flex-row">Unit Name
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-3" v-model.trim="validate.unit_name.$model" class="w-full" type="text" name="unit_name":class="{ 'border-danger': validate.unit_name.$error,}" placeholder="Input Unit Name"/>
                <template v-if="validate.unit_name.$error">
                  <div v-for="(error, index) in validate.unit_name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-3" class="flex flex-col w-full sm:flex-row">Location
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-3" v-model.trim="validate.location.$model" class="w-full" type="text" name="location":class="{ 'border-danger': validate.location.$error,}" placeholder="Input Location"/>
                <template v-if="validate.location.$error">
                  <div v-for="(error, index) in validate.location.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>

        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
            <FormLabel htmlFor="crud-form-6" class="flex flex-col w-full sm:flex-row">
              Designation
                <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
              </FormLabel>
              <div class="flex w-full border border-gray-300 rounded-lg bg-white" :class="{ 'border-danger': validate.designation.$error,}">
                <div class="w-1/2">
                 <input type="text" v-model="formData.designationInput" class="w-full border-none outline-none rounded-l-lg text-sm  dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" name="designation" placeholder="Input Designation">
                </div>
                <div class="w-1/2  border-l border-gray-300">
                  <select @change="designationChange()" v-model="selectedDesignation"  class="w-full border-none outline-none rounded-r-lg text-sm  dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                    <option value="" disabled >Select Designation</option>
                    <option v-for="(data, index) in state.designationData" :key="index" :value="data.name">{{ data.name }}</option>
                  </select>
                </div>
              </div>
              
              <template v-if="validate.designation.$error">
                <div v-for="(error, index) in validate.designation.$errors" :key="index" class="mt-2 text-danger">
                  {{ error.$message }}
                </div>
              </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
              <FormLabel htmlFor="crud-form-6" class="flex flex-col w-full sm:flex-row">
                Department
                <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
              </FormLabel>
              <div class="flex w-full border border-gray-300 rounded-lg bg-white" :class="{ 'border-danger': validate.designation.$error,}">
                <div class="w-1/2">
                 <input type="text" v-model="formData.departmentInput" class="w-full border-none outline-none rounded-l-lg text-sm  dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" name="department" placeholder="Input Department">
                </div>
                <div class="w-1/2  border-l border-gray-300">
                  <select @change="departnemtChange()" v-model="selectedDepartment" class="w-full border-none outline-none rounded-r-lg text-sm  dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                    <option value="" disabled >Select Department</option>
                    <option v-for="(data, index) in state.departmentData" :key="index" :value="data.name">{{ data.name }}</option>
                  </select>
                </div>
              </div>
              
              <template v-if="validate.department.$error">
                <div v-for="(error, index) in validate.department.$errors" :key="index" class="mt-2 text-danger">
                  {{ error.$message }}
                </div>
              </template>
            </div> 
        </div>
        
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
              
            <FormLabel htmlFor="crud-form-6" class="flex flex-col w-full sm:flex-row">
              Employee Type
                <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
              </FormLabel>
              <select id="crud-form-6" v-model="selectedEmployeeType" class="w-full border border-gray-300 rounded-lg text-sm  dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                <option value="" disabled>Select Employee Type</option>
                <option value="Management">Management</option>
                <option value="Non-Management">Non-Management</option>
              </select>
              <template v-if="validate.employee_type.$error">
                <div v-for="(error, index) in validate.employee_type.$errors" :key="index" class="mt-2 text-danger">
                  {{ error.$message }}
                </div>
              </template>
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
          <div class="font-medium">Employee Information Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Employee Information Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
