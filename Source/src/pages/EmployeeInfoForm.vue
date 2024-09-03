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
import Alert from "@/components/Base/Alert";


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
          Ensure accurate HR information is inserted, including employee details, designation, department, and other relevant fields, following the correct format and guidelines
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
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Employee
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">ID</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Unique employee identification number.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-3" v-model.trim="validate.emp_id.$model" class="w-full" type="text" name="emp_id":class="{ 'border-danger': validate.emp_id.$error,}" placeholder="Input Employee ID"/>
                  <div class="flex justify-between">
                    <template v-if="validate.first_name.$error">
                      <div v-for="(error, index) in validate.first_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                        {{ error.$message }}
                      </div>
                    </template>
                  <p class="text-right mt-2 w-full"> Required</p>
                </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Name</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Full name of the employee.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-3" v-model.trim="validate.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name.$error,}" placeholder="Input Name"/>
                  <div class="flex justify-between">
                    <template v-if="validate.name.$error">
                      <div v-for="(error, index) in validate.name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                        {{ error.$message }}
                      </div>
                    </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">First Name</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Employee's first name.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-3" v-model.trim="validate.first_name.$model" class="w-full" type="text" name="first_name":class="{ 'border-danger': validate.first_name.$error,}" placeholder="Input First Name"/>
                  <div class="flex justify-between">
                    <template v-if="validate.first_name.$error">
                      <div v-for="(error, index) in validate.first_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                        {{ error.$message }}
                      </div>
                    </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Last Name</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Employee's Last Name.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-3" v-model.trim="validate.last_name.$model" class="w-full" type="text" name="last_name":class="{ 'border-danger': validate.last_name.$error,}" placeholder="Input Last Name"/>
                  <div class="flex justify-between">
                    <template v-if="validate.last_name.$error">
                      <div v-for="(error, index) in validate.last_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Unit
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Name</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Name of the unit or division the employee belongs to.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-3" v-model.trim="validate.unit_name.$model" class="w-full" type="text" name="unit_name":class="{ 'border-danger': validate.unit_name.$error,}" placeholder="Input Unit Name"/>
                  <div class="flex justify-between">
                    <template v-if="validate.unit_name.$error">
                      <div v-for="(error, index) in validate.unit_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Location
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Location</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Location of the employee's workplace.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-3" v-model.trim="validate.location.$model" class="w-full" type="text" name="location":class="{ 'border-danger': validate.location.$error,}" placeholder="Input Location"/>
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
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Designation
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Insert Designation</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Job title or position of the employee.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-3" v-model="formData.designationInput" class="w-full" type="text" name="location":class="{ 'border-danger': validate.designation.$error,}" placeholder="Input Location"/>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Select Designation</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Job title or position of the employee.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <select @change="designationChange()" v-model="selectedDesignation"  class="w-full border border-gray-300 rounded-lg py-3 text-sm">
                    <option value="" disabled >Select Designation</option>
                    <option v-for="(data, index) in state.designationData" :key="index" :value="data.name">{{ data.name }}</option>
                  </select>
                  <div class="flex justify-between">
                    <template v-if="validate.designation.$error">
                      <div v-for="(error, index) in validate.designation.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Department
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Insert Department</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Department where the employee works.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-3" v-model="formData.departmentInput" class="w-full" type="text" name="location":class="{ 'border-danger': validate.location.$error,}" placeholder="Input Location"/>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Select Department</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Department where the employee works.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <select @change="departnemtChange()" v-model="selectedDepartment"  class="w-full border border-gray-300 rounded-lg py-3 text-sm">
                  <option value="" disabled >Select Department</option>
                  <option v-for="(data, index) in state.departmentData" :key="index" :value="data.name">{{ data.name }}</option>
                  </select>
                  <div class="flex justify-between">
                    <template v-if="validate.department.$error">
                      <div v-for="(error, index) in validate.department.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Employee Type
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Select Employee Type</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Employee Type
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <select id="crud-form-6" v-model="selectedEmployeeType" class="w-full border border-gray-300 rounded-lg py-3 text-sm">
                  <option value="" disabled>Select Employee Type</option>
                  <option value="Management">Management</option>
                  <option value="Non-Management">Non-Management</option>
                </select>
                  <div class="flex justify-between">
                    <template v-if="validate.employee_type.$error">
                      <div v-for="(error, index) in validate.employee_type.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
        <template v-if="backendErrors.errors">
            <div v-for="(messages, field) in backendErrors.errors" :key="field" class="mt-2 text-danger flex">
            <p class=" capitalize mr-2"><strong>{{ field }}:</strong></p>
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
            <a href="">HR information</a>
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
              When filling out the HR information report, be specific and clear with details, using the correct date format and precise descriptions..
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

