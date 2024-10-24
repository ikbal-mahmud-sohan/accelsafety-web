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


const formData = reactive({
    investigation_name_1 : '',
    investigation_designation_1 : '',
    investigation_sign_1: [] as File[],
    investigation_name_2 : '',
    investigation_designation_2 : '',
    investigation_sign_2: [] as File[],
    investigation_name_3 : '',
    investigation_designation_3 : '',
    investigation_sign_3: [] as File[],
    investigation_name_4 : '',
    investigation_designation_4 : '',
    investigation_sign_4: [] as File[],
    type_of_employee: [] as string[],
    type_of_accident: [] as string[],
    nature_of_injury: [] as string[],
    employee_id: '',
    employee_department: '',
    emp_id: '',
    accident_details: '',
    unsafe_acts: [] as string[],
    unsafe_conditions: [] as string[],
    management_deficiencies: [] as string[],
    root_cause_1 : '',
    corrective_action_1 : '',
    person_assigned_1 : '',
    target_date_1 : '',
    complete_date_1 : '',
    root_cause_2 : '',
    corrective_action_2 : '',
    person_assigned_2 : '',
    target_date_2 : '',
    complete_date_2 : '',
    root_cause_3 : '',
    corrective_action_3 : '',
    person_assigned_3 : '',
    target_date_3 : '',
    complete_date_3 : '',
    reviewed_by_department_name: '',
    reviewed_by_unit_name: '',
    approved_by_name: '',
    reviewed_by_department_signature: [] as File[],
    reviewed_by_unit_signature: [] as File[],
    approved_by_signature: [] as File[],
});

const selectedEmp1 = ref("");
const selectedEmp2 = ref("");
const selectedEmp3 = ref("");
const selectedEmp4 = ref("");
const selectedEmployee = ref("");




const state = reactive({
  viewEmp: [] as Array<any>,
  selectEmpData: [] as Array<any>,
});

interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const investigationSign1FileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.investigation_sign_1 = Array.from(input.files);
  }
};
const investigationSign2FileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.investigation_sign_2 = Array.from(input.files);
  }
};
const investigationSign3FileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.investigation_sign_3 = Array.from(input.files);
  }
};
const investigationSign4FileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.investigation_sign_4 = Array.from(input.files);
  }
};
const reviewedByDepartmentSignaturFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.reviewed_by_department_signature = Array.from(input.files);
  }
};
const reviewedByUnitSignaturFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.reviewed_by_unit_signature = Array.from(input.files);
  }
};
const approvedBySignaturFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.approved_by_signature = Array.from(input.files);
  }
};

const typeOfEmployee = ['Management',  'Permanent (NM)',  'Contractual', 'Contractors Labor', 'Visitor',  'Other'];
const selectedtypeOfEmployee = ref<string[]>([]);
const handleTypeOfEmployee = (event: { target: { value: string; checked: boolean; }; }) => {
  const value = event.target.value;
  if (event.target.checked) {
    selectedtypeOfEmployee.value.push(value);
  } else {
    selectedtypeOfEmployee.value = selectedtypeOfEmployee.value.filter(item => item !== value);
  }
};



const typeOfAccident = ['Dangerous Occurrence', 'First Aid',  'Minor Accident', 'Major Accident', 'Fatal: Single/ Multiple'];
const selectedtypeOfAccident = ref<string[]>([]);
const handleTypeOfAccident = (event: { target: { value: string; checked: boolean; }; }) => {
  const value = event.target.value;
  if (event.target.checked) {
    selectedtypeOfAccident.value.push(value);
  } else {
    selectedtypeOfAccident.value = selectedtypeOfAccident.value.filter(item => item !== value);
  }
};

const natureOfInjury = ['Burn (1st/ 2nd/3rd degree)', 'Cut',  'Amputation',  'Fracture', 'Sprain',  'Pressed/ Pinched', 'Other'];
const selectednatureOfInjury = ref<string[]>([]);
const handleNatureOfInjury = (event: { target: { value: string; checked: boolean; }; }) => {
  const value = event.target.value;
  if (event.target.checked) {
    selectednatureOfInjury.value.push(value);
  } else {
    selectednatureOfInjury.value = selectednatureOfInjury.value.filter(item => item !== value);
  }
};

const unsafeActs = ['Improper work technique', 'Safety rule violation', 'Improper PPE or PPE not used', 'Operating without authority','Failure to warn or secure','Operating at improper speeds','By-passing safety devices','Guards not used','Improper loading or placement','Improper lifting','Servicing machinery in motion','Horseplay','Drug or alcohol use','Unnecessary haste','Unsafe act of others','Other:'];
const selectedunsafeActs = ref<string[]>([]);
const handleUnsafeActs = (event: { target: { value: string; checked: boolean; }; }) => {
  const value = event.target.value;
  if (event.target.checked) {
    selectedunsafeActs.value.push(value);
  } else {
    selectedunsafeActs.value = selectedunsafeActs.value.filter(item => item !== value);
  }
};

const unsafeConditions = ['Poor workstation design or layout', 'Congested work area', 'Hazardous substances', 'Fire or explosion hazard','Inadequate ventilation','Improper material storage','Improper tool or equipment','Insufficient knowledge of job','Slippery conditions','Poor housekeeping','Excessive noise','Inadequate guarding of hazards','Defective tools/equipment','Insufficient lighting','Inadequate fall protection','Other'];
const selectedunsafeConditions = ref<string[]>([]);
const handleUnsafeConditions = (event: { target: { value: string; checked: boolean; }; }) => {
  const value = event.target.value;
  if (event.target.checked) {
    selectedunsafeConditions.value.push(value);
  } else {
    selectedunsafeConditions.value = selectedunsafeConditions.value.filter(item => item !== value);
  }
};

const managementDeficiencies = ['Lack of written procedures or policies', 'Safety rules not enforced', 'Hazards not identified', 'PPE unavailable','Insufficient worker training','Insufficient supervisor training','Improper maintenance','Inadequate supervision','Inadequate job planning','Inadequate hiring practices','Inadequate workplace inspection','Inadequate equipment','Unsafe design or construction','Unrealistic scheduling','Poor process design','Other'];
const selectedmanagementDeficiencies = ref<string[]>([]);
const handleManagementDeficiencies = (event: { target: { value: string; checked: boolean; }; }) => {
  const value = event.target.value;
  if (event.target.checked) {
    selectedmanagementDeficiencies.value.push(value);
  } else {
    selectedmanagementDeficiencies.value = selectedmanagementDeficiencies.value.filter(item => item !== value);
  }
};

const rules = {
      investigation_name_1: {required},
      investigation_designation_1: {required},
      investigation_sign_1: {required},
      investigation_name_2: {required},
      investigation_designation_2: {required},
      investigation_sign_2: {required},
      investigation_name_3: {required},
      investigation_designation_3: {required},
      investigation_sign_3: {required},
      investigation_name_4: {required},
      investigation_designation_4: {required},
      investigation_sign_4: {required},
      type_of_employee: {required},
      type_of_accident: {required},
      nature_of_injury: {required},
      employee_id: {required},
      employee_department: {required},
      emp_id: {required},
      accident_details: {required},
      unsafe_acts: {required},
      unsafe_conditions: {required},
      management_deficiencies: {required},
      root_cause_1: {required},
      corrective_action_1: {required},
      person_assigned_1: {required},
      target_date_1: {required},
      complete_date_1: {required},
      root_cause_2: {required},
      corrective_action_2: {required},
      person_assigned_2: {required},
      target_date_2: {required},
      complete_date_2: {required},
      root_cause_3: {required},
      corrective_action_3: {required},
      person_assigned_3: {required},
      target_date_3: {required},
      complete_date_3: {required},
      reviewed_by_department_name: {required},
      reviewed_by_unit_name: {required},
      approved_by_name: {required},
      reviewed_by_department_signature: {required},
      reviewed_by_unit_signature: {required},
      approved_by_signature: {required},  
};

const validate = useVuelidate(rules, toRefs(formData));
const backendErrors = reactive<{
    message: string;
    errors: { [key: string]: string[] };
}>({
    message: '',
    errors: {}
});


const submitForm = async () => {
  formData.investigation_name_1 = selectedEmp1.value;
  formData.investigation_name_2 = selectedEmp2.value;
  formData.investigation_name_3 = selectedEmp3.value;
  formData.investigation_name_4 = selectedEmp4.value;
  formData.employee_id = selectedEmployee.value;
  formData.type_of_employee = selectedtypeOfEmployee.value
  formData.type_of_accident = selectedtypeOfAccident.value
  formData.nature_of_injury = selectednatureOfInjury.value
  formData.unsafe_acts = selectedunsafeActs.value
  formData.unsafe_conditions = selectedunsafeConditions.value
  formData.management_deficiencies = selectedmanagementDeficiencies.value

  
    console.log("validate.value",validate.value)
    validate.value.$touch();
    if (validate.value.$invalid) {
        FailedPopUp();
    } else {
     
    const form = new FormData();

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
    console.log("form ssssss",form)

   try {
            let  url = config.baseURL+'/api/v1/accident-investigation';
              const response = await axios.post(url, form);
              console.log('Form submitted successfully:', response.data);
              if(response.data != undefined){
                  SuccessPopUp();
                router.push({ name: 'accident-investigation-list' });
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

const fetchEmpData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/employee';
    const response = await axios.get(url);
    state.viewEmp = response.data.data;
    console.log("viewEmp",state.viewEmp)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const selectedEmpOne = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/employee/"+sID;
    const response = await axios.get(url);
    formData.investigation_designation_1 = response.data.data.designation;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const selectedEmpTwo = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/employee/"+sID;
    const response = await axios.get(url);
    formData.investigation_designation_2 = response.data.data.designation;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const selectedEmpThree = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/employee/"+sID;
    const response = await axios.get(url);
    formData.investigation_designation_3 = response.data.data.designation;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const selectedEmpFour = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/employee/"+sID;
    const response = await axios.get(url);
    formData.investigation_designation_4 = response.data.data.designation;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const selectedEmployees = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/employee/"+sID;
    const response = await axios.get(url);
    console.log("response.data.data",response.data.data)
    formData.employee_department = response.data.data.department;
    formData.emp_id = response.data.data.emp_id;
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
  fetchEmpData();
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Add Accident Investigation</h2>
  </div>
  <div class="grid grid-cols-11 pb-20 mt-5 gap-x-6">
    <!-- BEGIN: Notification -->
    <Alert variant="primary" dismissible class="col-span-11 mb-6 intro-y box dark:border-darkmode-600" v-slot="{ dismiss }">
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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Investigation Team
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
                  <select id="crud-form-6" v-model="selectedEmp1" @change="selectedEmpOne(selectedEmp1)"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                      <option value="" disabled>select Investigator</option>
                      <option v-for="(data, index) in state.viewEmp" :key="index" :value="data.id">{{ data.name }}</option>
                  </select>
                  <template v-if="validate.investigation_name_1.$error">
                    <div v-for="(error, index) in validate.investigation_name_1.$errors" :key="index" class="mt-2 text-danger">
                      {{ error.$message }}
                    </div>
                  </template>
              </div>
              
            </FormInline>
            <FormInline class="flex-col items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Designation</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Name of the Investigator designation.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-16" v-model.trim="validate.investigation_designation_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.investigation_designation_1.$error,}" placeholder="Input Investigator Designation"/>
                <template v-if="validate.investigation_designation_1.$error">
                  <div v-for="(error, index) in validate.investigation_designation_1.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Signnature</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Signnature of the Investigator
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                    <div class="flex flex-col items-center justify-center w-full space-y-4">
                      <label for="investigationSign1FileChange" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-300">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12a4 4 0 014-4h3m5 8h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.707 2.707a1 1 0 01-.707.293H13m-4 8H6a2 2 0 01-2-2v-5a2-2h2.586c.265 0 .52.105.707.293l2.707 2.707a1 1 0 00.707.293H18m0 0l2 2M15 12v2m4 0l-4-4"></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input id="investigationSign1FileChange" type="file" class="hidden" multiple @change="investigationSign1FileChange"/>
                      </label>
                      <div v-if="formData.investigation_sign_1.length" class="w-full space-y-2">
                        <div
                          v-for="(file, index) in formData.investigation_sign_1"
                          :key="index"
                          class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow"
                        >
                          <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                  <div class="flex justify-between">
                    <template v-if="validate.investigation_sign_1.$error">
                    <div v-for="(error, index) in validate.investigation_sign_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right w-full mt-2"> Required</p>
                  </div>
              </div>
            </FormInline>
            <FormInline class="flex-col items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0 ">
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
                  <select id="crud-form-6" v-model="selectedEmp2" @change="selectedEmpTwo(selectedEmp2)"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                      <option value="" disabled>select Investigator</option>
                      <option v-for="(data, index) in state.viewEmp" :key="index" :value="data.id">{{ data.name }}</option>
                  </select>
                  <template v-if="validate.investigation_name_2.$error">
                    <div v-for="(error, index) in validate.investigation_name_2.$errors" :key="index" class="mt-2 text-danger">
                      {{ error.$message }}
                    </div>
                  </template>
              </div>
              
            </FormInline>
            <FormInline class="flex-col items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Designation</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Name of the Investigator designation.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-16" v-model.trim="validate.investigation_designation_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.investigation_designation_2.$error,}" placeholder="Input Investigator Designation"/>
                <template v-if="validate.investigation_designation_2.$error">
                  <div v-for="(error, index) in validate.investigation_designation_2.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Signnature</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Signnature of the Investigator.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                    <div class="flex flex-col items-center justify-center w-full space-y-4">
                      <label for="investigationSign2FileChange" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-300">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12a4 4 0 014-4h3m5 8h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.707 2.707a1 1 0 01-.707.293H13m-4 8H6a2 2 0 01-2-2v-5a2-2h2.586c.265 0 .52.105.707.293l2.707 2.707a1 1 0 00.707.293H18m0 0l2 2M15 12v2m4 0l-4-4"></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input id="investigationSign2FileChange" type="file" class="hidden" multiple @change="investigationSign2FileChange"/>
                      </label>
                      <div v-if="formData.investigation_sign_2.length" class="w-full space-y-2">
                        <div
                          v-for="(file, index) in formData.investigation_sign_2"
                          :key="index"
                          class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow"
                        >
                          <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                  <div class="flex justify-between">
                    <template v-if="validate.investigation_sign_2.$error">
                    <div v-for="(error, index) in validate.investigation_sign_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right w-full mt-2"> Required</p>
                  </div>
              </div>
            </FormInline>
           
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
                  <select id="crud-form-6" v-model="selectedEmp3" @change="selectedEmpThree(selectedEmp3)"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                      <option value="" disabled>select Investigator</option>
                      <option v-for="(data, index) in state.viewEmp" :key="index" :value="data.id">{{ data.name }}</option>
                  </select>
                  <template v-if="validate.investigation_name_3.$error">
                    <div v-for="(error, index) in validate.investigation_name_3.$errors" :key="index" class="mt-2 text-danger">
                      {{ error.$message }}
                    </div>
                  </template>
              </div>
              
            </FormInline>
            <FormInline class="flex-col items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Designation</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Name of the Investigator designation.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-16" v-model.trim="validate.investigation_designation_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.investigation_designation_3.$error,}" placeholder="Input Investigator Designation"/>
                <template v-if="validate.investigation_designation_3.$error">
                  <div v-for="(error, index) in validate.investigation_designation_3.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
              </div>
            </FormInline>
            
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Signnature</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                   Signnature of the Investigator
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
               
                    <div class="flex flex-col items-center justify-center w-full space-y-4">
                      <label for="investigationSign3FileChange" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-300">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12a4 4 0 014-4h3m5 8h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.707 2.707a1 1 0 01-.707.293H13m-4 8H6a2 2 0 01-2-2v-5a2-2h2.586c.265 0 .52.105.707.293l2.707 2.707a1 1 0 00.707.293H18m0 0l2 2M15 12v2m4 0l-4-4"></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input id="investigationSign3FileChange" type="file" class="hidden" multiple @change="investigationSign3FileChange"/>
                      </label>
                      <div v-if="formData.investigation_sign_3.length" class="w-full space-y-2">
                        <div
                          v-for="(file, index) in formData.investigation_sign_3"
                          :key="index"
                          class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow"
                        >
                          <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                  <div class="flex justify-between">
                    <template v-if="validate.investigation_sign_3.$error">
                    <div v-for="(error, index) in validate.investigation_sign_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right w-full mt-2"> Required</p>
                  </div>
              </div>
            </FormInline>
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
                  <select id="crud-form-6" v-model="selectedEmp4" @change="selectedEmpFour(selectedEmp4)"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                      <option value="" disabled>select Investigator</option>
                      <option v-for="(data, index) in state.viewEmp" :key="index" :value="data.id">{{ data.name }}</option>
                  </select>
                  <template v-if="validate.investigation_name_4.$error">
                    <div v-for="(error, index) in validate.investigation_name_4.$errors" :key="index" class="mt-2 text-danger">
                      {{ error.$message }}
                    </div>
                  </template>
              </div>
              
            </FormInline>
            <FormInline class="flex-col items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Designation</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Name of the Investigator designation.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-16" v-model.trim="validate.investigation_designation_4.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.investigation_designation_4.$error,}" placeholder="Input Investigator Designation"/>
                <template v-if="validate.investigation_designation_4.$error">
                  <div v-for="(error, index) in validate.investigation_designation_4.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Signnature</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                   Signnature of the Investigator
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
               
                    <div class="flex flex-col items-center justify-center w-full space-y-4">
                      <label for="investigationSign4FileChange" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-300">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12a4 4 0 014-4h3m5 8h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.707 2.707a1 1 0 01-.707.293H13m-4 8H6a2 2 0 01-2-2v-5a2-2h2.586c.265 0 .52.105.707.293l2.707 2.707a1 1 0 00.707.293H18m0 0l2 2M15 12v2m4 0l-4-4"></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input id="investigationSign4FileChange" type="file" class="hidden" multiple @change="investigationSign4FileChange"/>
                      </label>
                      <div v-if="formData.investigation_sign_4.length" class="w-full space-y-2">
                        <div
                          v-for="(file, index) in formData.investigation_sign_4"
                          :key="index"
                          class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow"
                        >
                          <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                  <div class="flex justify-between">
                    <template v-if="validate.investigation_sign_4.$error">
                    <div v-for="(error, index) in validate.investigation_sign_4.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Victim Innfo
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Type of Employee</div>
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
                <div class="flex flex-wrap items-center">
                  <div class="w-full md:w-1/4 py-2" v-for="item in typeOfEmployee" :key="item">
                    <FormCheck class="mt-2">
                      <FormCheck.Input :id="item" type="checkbox" :value="item" @change="handleTypeOfEmployee" />
                      <FormCheck.Label :htmlFor="item">
                        {{ item }}
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
                <div class="flex justify-between">
                  <template v-if="validate.type_of_employee.$error">
                    <div
                      v-for="(error, index) in validate.type_of_employee.$errors"
                      :key="index"
                      class="mt-2 text-danger whitespace-nowrap" >
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right mt-2 w-full">Required</p>
                </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Type of Accident</div>
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
                <div class="flex flex-wrap items-center">
                  <div class="w-full md:w-1/4 py-2" v-for="item in typeOfAccident" :key="item">
                    <FormCheck class="mt-2">
                      <FormCheck.Input :id="item" type="checkbox" :value="item" @change="handleTypeOfAccident" />
                      <FormCheck.Label :htmlFor="item">
                        {{ item }}
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
                <div class="flex justify-between">
                  <template v-if="validate.type_of_accident.$error">
                    <div
                      v-for="(error, index) in validate.type_of_accident.$errors"
                      :key="index"
                      class="mt-2 text-danger whitespace-nowrap" >
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right mt-2 w-full">Required</p>
                </div>
              </div>
            </FormInline>
            
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Nature of Injury</div>
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
                <div class="flex flex-wrap items-center">
                  <div class="w-full md:w-1/4 py-2" v-for="item in natureOfInjury" :key="item">
                    <FormCheck class="mt-2">
                      <FormCheck.Input :id="item" type="checkbox" :value="item" @change="handleNatureOfInjury" />
                      <FormCheck.Label :htmlFor="item">
                        {{ item }}
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
                <div class="flex justify-between">
                  <template v-if="validate.nature_of_injury.$error">
                    <div
                      v-for="(error, index) in validate.nature_of_injury.$errors"
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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Employee Details
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
                    Employee Name
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <select id="crud-form-6" v-model="selectedEmployee" @change="selectedEmployees(selectedEmployee)"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                      <option value="" disabled>Select Employee</option>
                      <option v-for="(data, index) in state.viewEmp" :key="index" :value="data.id">{{ data.name }}</option>
                  </select>
                <div class="flex justify-between">
                  <template v-if="validate.employee_id.$error">
                  <div v-for="(error, index) in validate.employee_id.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Department</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Employee Department
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-12" v-model.trim="validate.employee_department.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.employee_department.$error,}" placeholder="Input Employee Department"/> 
                <div class="flex justify-between">
                  <template v-if="validate.employee_department.$error">
                  <div v-for="(error, index) in validate.employee_department.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Employee ID</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Employee ID
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-12" v-model.trim="validate.emp_id.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.emp_id.$error,}" placeholder="Input Employee ID"/> 
                <div class="flex justify-between">
                  <template v-if="validate.emp_id.$error">
                  <div v-for="(error, index) in validate.emp_id.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Accident/ Incident Details
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Description</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    Detail description of the accident/incident
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-12" v-model.trim="validate.accident_details.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.accident_details.$error,}" placeholder="Input Accident Details"/> 
                <div class="flex justify-between">
                  <template v-if="validate.accident_details.$error">
                  <div v-for="(error, index) in validate.accident_details.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />ROOT CAUSE ANALYSIS
          </div>
          <div class="mt-5">
            
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Unsafe Acts</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500 capitalize">
                    The Incident Investigation & Root Cause Analysis
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="flex flex-wrap items-center">
                  <div class="w-full md:w-1/4 py-2" v-for="item in unsafeActs" :key="item">
                    <FormCheck class="mt-2">
                      <FormCheck.Input :id="item" type="checkbox" :value="item" @change="handleUnsafeActs" />
                      <FormCheck.Label :htmlFor="item">
                        {{ item }}
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
                <div class="flex justify-between">
                  <template v-if="validate.unsafe_acts.$error">
                    <div
                      v-for="(error, index) in validate.unsafe_acts.$errors"
                      :key="index"
                      class="mt-2 text-danger whitespace-nowrap" >
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right mt-2 w-full">Required</p>
                </div>
              </div>
            </FormInline>
           
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Unsafe Conditions</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    The Incident Investigation & Root Cause Analysis
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="flex flex-wrap items-center">
                  <div class="w-full md:w-1/4 py-2" v-for="item in unsafeConditions" :key="item">
                    <FormCheck class="mt-2">
                      <FormCheck.Input :id="item" type="checkbox" :value="item" @change="handleUnsafeConditions" />
                      <FormCheck.Label :htmlFor="item">
                        {{ item }}
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
                <div class="flex justify-between">
                  <template v-if="validate.unsafe_conditions.$error">
                    <div
                      v-for="(error, index) in validate.unsafe_conditions.$errors"
                      :key="index"
                      class="mt-2 text-danger whitespace-nowrap" >
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right mt-2 w-full">Required</p>
                </div>
              </div>
            </FormInline>
          
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Management Deficiencies</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    The Incident Investigation & Root Cause Analysis
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="flex flex-wrap items-center">
                  <div class="w-full md:w-1/4 py-2" v-for="item in managementDeficiencies" :key="item">
                    <FormCheck class="mt-2">
                      <FormCheck.Input :id="item" type="checkbox" :value="item" @change="handleManagementDeficiencies" />
                      <FormCheck.Label :htmlFor="item">
                        {{ item }}
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
                <div class="flex justify-between">
                  <template v-if="validate.management_deficiencies.$error">
                    <div
                      v-for="(error, index) in validate.management_deficiencies.$errors"
                      :key="index"
                      class="mt-2 text-danger whitespace-nowrap" >
                      {{ error.$message }}
                    </div>
                  </template>
                  <p class="text-right mt-2 w-full">Required</p>
                </div>
              </div>
            </FormInline>
          </div>
        </div>
      </div>

      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Corrective &amp; Preventive Actions
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Root Cause 1</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.root_cause_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.root_cause_1.$error,}" placeholder="Input Root Cause 1"/> 
                <div class="flex justify-between">
                  <template v-if="validate.root_cause_1.$error">
                  <div v-for="(error, index) in validate.root_cause_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Corrective Action 1</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.corrective_action_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.corrective_action_1.$error,}" placeholder="Input Root Cause"/> 
                <div class="flex justify-between">
                  <template v-if="validate.corrective_action_1.$error">
                  <div v-for="(error, index) in validate.corrective_action_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Person Assigned 1</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.person_assigned_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.person_assigned_1.$error,}" placeholder="Input Person Assigned 1"/> 
                <div class="flex justify-between">
                  <template v-if="validate.person_assigned_1.$error">
                  <div v-for="(error, index) in validate.person_assigned_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Target Date 1</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.target_date_1.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.target_date_1.$error,}" placeholder="Input Target Date 1"/> 
                <div class="flex justify-between">
                  <template v-if="validate.target_date_1.$error">
                  <div v-for="(error, index) in validate.target_date_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Complete Date 1</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.complete_date_1.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.complete_date_1.$error,}" placeholder="Input Complete Date 1"/> 
                <div class="flex justify-between">
                  <template v-if="validate.complete_date_1.$error">
                  <div v-for="(error, index) in validate.complete_date_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Root Cause 2</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.root_cause_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.root_cause_2.$error,}" placeholder="Input Root Cause 2"/> 
                <div class="flex justify-between">
                  <template v-if="validate.root_cause_2.$error">
                  <div v-for="(error, index) in validate.root_cause_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Corrective Action 2</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.corrective_action_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.corrective_action_2.$error,}" placeholder="Input Root Cause"/> 
                <div class="flex justify-between">
                  <template v-if="validate.corrective_action_2.$error">
                  <div v-for="(error, index) in validate.corrective_action_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Person Assigned 2</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.person_assigned_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.person_assigned_2.$error,}" placeholder="Input Person Assigned 2"/> 
                <div class="flex justify-between">
                  <template v-if="validate.person_assigned_2.$error">
                  <div v-for="(error, index) in validate.person_assigned_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Target Date 2</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.target_date_2.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.target_date_2.$error,}" placeholder="Input Target Date 2"/> 
                <div class="flex justify-between">
                  <template v-if="validate.target_date_2.$error">
                  <div v-for="(error, index) in validate.target_date_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Complete Date 2</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.complete_date_2.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.complete_date_2.$error,}" placeholder="Input Complete Date 2"/> 
                <div class="flex justify-between">
                  <template v-if="validate.complete_date_2.$error">
                  <div v-for="(error, index) in validate.complete_date_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Root Cause 3</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.root_cause_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.root_cause_3.$error,}" placeholder="Input Root Cause 3"/> 
                <div class="flex justify-between">
                  <template v-if="validate.root_cause_3.$error">
                  <div v-for="(error, index) in validate.root_cause_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Corrective Action 3</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.corrective_action_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.corrective_action_3.$error,}" placeholder="Input Root Cause 3"/> 
                <div class="flex justify-between">
                  <template v-if="validate.corrective_action_3.$error">
                  <div v-for="(error, index) in validate.corrective_action_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Person Assigned 3</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.person_assigned_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.person_assigned_3.$error,}" placeholder="Input Person Assigned 3"/> 
                <div class="flex justify-between">
                  <template v-if="validate.person_assigned_3.$error">
                  <div v-for="(error, index) in validate.person_assigned_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Target Date 3</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.target_date_3.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.target_date_3.$error,}" placeholder="Input Target Date 3"/> 
                <div class="flex justify-between">
                  <template v-if="validate.target_date_3.$error">
                  <div v-for="(error, index) in validate.target_date_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Complete Date 3</div>
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
                <FormInput id="crud-form-12" v-model.trim="validate.complete_date_3.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.complete_date_3.$error,}" placeholder="Input Complete Date 1"/> 
                <div class="flex justify-between">
                  <template v-if="validate.complete_date_3.$error">
                  <div v-for="(error, index) in validate.complete_date_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Reviewed By
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Reviewed By Department Name</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    The level of priority assigned to the issue (e.g., high, medium, low).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-11" v-model.trim="validate.reviewed_by_department_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.reviewed_by_department_name.$error,}" placeholder="Input Reviewed By Department Name"/>  
                
                <div class="flex justify-between">
                  <template v-if="validate.reviewed_by_department_name.$error">
                  <div v-for="(error, index) in validate.reviewed_by_department_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Reviewed By Department Manager’s</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                   Signnature of the Department Manager’s
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
               
                    <div class="flex flex-col items-center justify-center w-full space-y-4">
                      <label for="reviewedByDepartmentSignaturFileChange" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-300">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12a4 4 0 014-4h3m5 8h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.707 2.707a1 1 0 01-.707.293H13m-4 8H6a2 2 0 01-2-2v-5a2-2h2.586c.265 0 .52.105.707.293l2.707 2.707a1 1 0 00.707.293H18m0 0l2 2M15 12v2m4 0l-4-4"></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input id="reviewedByDepartmentSignaturFileChange" type="file" class="hidden" multiple @change="reviewedByDepartmentSignaturFileChange"/>
                      </label>
                      <div v-if="formData.reviewed_by_department_signature.length" class="w-full space-y-2">
                        <div
                          v-for="(file, index) in formData.reviewed_by_department_signature"
                          :key="index"
                          class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow"
                        >
                          <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                  <div class="flex justify-between">
                    <template v-if="validate.reviewed_by_department_signature.$error">
                    <div v-for="(error, index) in validate.reviewed_by_department_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Reviewed By Unit Name</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    The level of priority assigned to the issue (e.g., high, medium, low).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-11" v-model.trim="validate.reviewed_by_unit_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.reviewed_by_unit_name.$error,}" placeholder="Input Reviewed By Unit Name"/>  
                
                <div class="flex justify-between">
                  <template v-if="validate.reviewed_by_unit_name.$error">
                  <div v-for="(error, index) in validate.reviewed_by_unit_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Reviewed By Unit HR, HSE &amp; Admin’s</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                   Signnature of the Unit HR, HSE &amp; Admin’s
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
               
                    <div class="flex flex-col items-center justify-center w-full space-y-4">
                      <label for="reviewedByUnitSignaturFileChange" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-300">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12a4 4 0 014-4h3m5 8h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.707 2.707a1 1 0 01-.707.293H13m-4 8H6a2 2 0 01-2-2v-5a2-2h2.586c.265 0 .52.105.707.293l2.707 2.707a1 1 0 00.707.293H18m0 0l2 2M15 12v2m4 0l-4-4"></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input id="reviewedByUnitSignaturFileChange" type="file" class="hidden" multiple @change="reviewedByUnitSignaturFileChange"/>
                      </label>
                      <div v-if="formData.reviewed_by_unit_signature.length" class="w-full space-y-2">
                        <div
                          v-for="(file, index) in formData.reviewed_by_unit_signature"
                          :key="index"
                          class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow"
                        >
                          <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                  <div class="flex justify-between">
                    <template v-if="validate.reviewed_by_unit_signature.$error">
                    <div v-for="(error, index) in validate.reviewed_by_unit_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
                    <div class="font-medium">Approved By Name</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    The level of priority assigned to the issue (e.g., high, medium, low).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-11" v-model.trim="validate.approved_by_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.approved_by_name.$error,}" placeholder="Input Approved By Name"/>  
                
                <div class="flex justify-between">
                  <template v-if="validate.approved_by_name.$error">
                  <div v-for="(error, index) in validate.approved_by_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                </div>
              </div>
            </FormInline>
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="w-full xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Approved By Unit In charge’s</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                   Signnature of the  Unit In charge’s
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
               
                    <div class="flex flex-col items-center justify-center w-full space-y-4">
                      <label for="approvedBySignaturFileChange" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-300">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V12a4 4 0 014-4h3m5 8h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-2.707 2.707a1 1 0 01-.707.293H13m-4 8H6a2 2 0 01-2-2v-5a2-2h2.586c.265 0 .52.105.707.293l2.707 2.707a1 1 0 00.707.293H18m0 0l2 2M15 12v2m4 0l-4-4"></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input id="approvedBySignaturFileChange" type="file" class="hidden" multiple @change="approvedBySignaturFileChange"/>
                      </label>
                      <div v-if="formData.approved_by_signature.length" class="w-full space-y-2">
                        <div
                          v-for="(file, index) in formData.approved_by_signature"
                          :key="index"
                          class="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow"
                        >
                          <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                        </div>
                      </div>
                    </div>
                  <div class="flex justify-between">
                    <template v-if="validate.approved_by_signature.$error">
                    <div v-for="(error, index) in validate.approved_by_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
            <a href="">Insert Accident Investigation</a>
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
              When filling out the Accident Investigation report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">Accident Investigation Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Accident Investigation Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
