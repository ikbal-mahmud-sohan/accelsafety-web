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
    name_of_the_factory:'',
    date_of_accident:'',
    accident_time:'',
    accident_shift:'',
    effected_body_part:'',
    employee_job_title: '',
    employee_age: '',
    employee_phone_no: '',
    employee_address: '',
    employee_experience: '',
    area_in_charge_name: '',
    area_in_charge_phone_no: '',
    witness_name: '',
    witness_phone_no: '',
    accident_exact_location: '',
    accident_initiatives: '',
    unsafe_acts_why_therefore_1: '',
    unsafe_conditions_why_therefore_1: '',
    management_deficiency_why_therefore_1: '',
    unsafe_acts_why_therefore_2: '',
    unsafe_conditions_why_therefore_2: '',
    management_deficiency_why_therefore_2: '',
    unsafe_acts_why_therefore_3: '',
    unsafe_conditions_why_therefore_3: '',
    management_deficiency_why_therefore_3: '',
    unsafe_acts_why_therefore_4: '',
    unsafe_conditions_why_therefore_4: '',
    management_deficiency_why_therefore_4: '',
    unsafe_acts_why_therefore_5: '',
    unsafe_conditions_why_therefore_5: '',
    management_deficiency_why_therefore_5: '',
    unsafe_acts_title: '',
    unsafe_conditions_title: '',
    management_deficiency_title: '',
    root_cause_des1: '',
    root_cause_des2: '',
    root_cause_des3: '',
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
      name_of_the_factory: {required},  
      date_of_accident: {required},  
      accident_time: {required},  
      accident_shift: {required},  
      effected_body_part: {required}, 
      employee_job_title: {required}, 
      employee_age: {required}, 
      employee_phone_no: {required}, 
      employee_experience: {required}, 
      area_in_charge_name: {required}, 
      area_in_charge_phone_no: {required}, 
      accident_exact_location: {required}, 
      accident_initiatives: {required}, 
      unsafe_acts_why_therefore_1: {required},
      unsafe_conditions_why_therefore_1: {required},
      management_deficiency_why_therefore_1: {required},
      unsafe_acts_why_therefore_2: {required},
      unsafe_conditions_why_therefore_2: {required},
      management_deficiency_why_therefore_2: {required},
      unsafe_acts_why_therefore_3: {required},
      unsafe_conditions_why_therefore_3: {required},
      management_deficiency_why_therefore_3: {required},
      unsafe_acts_why_therefore_4: {required},
      unsafe_conditions_why_therefore_4: {required},
      management_deficiency_why_therefore_4: {required},
      unsafe_acts_why_therefore_5: {required},
      unsafe_conditions_why_therefore_5: {required},
      management_deficiency_why_therefore_5: {required},
      unsafe_acts_title: {required},
      unsafe_conditions_title: {required},
      management_deficiency_title: {required},
      root_cause_des1: {required},
      root_cause_des2: {required},
      root_cause_des3: {required},
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
          Must be used for all Minor, Major, Fatal accidents and Serious Near Misses / Dangerous Occurrences.
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
    <div class="col-span-11 intro-y ">
      <!-- BEGIN: Uplaod Product -->
      
      <!-- BEGIN: Product Information -->
      <div class="p-5 mt-5 intro-y box w-full overflow-x-auto ">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Investigation Team
          </div>
          <div class="mt-5">
              <div class="hidden md:flex justify-between py-5 items-center bg-gray-200">
                  <div class="w-40 ">
                      <div class="px-4 py-4"> No. </div>
                  </div>
                  <div class="w-1/4">
                      <div class="px-4 py-4 "> Name </div>
                  </div>
                  <div class="w-1/4">
                      <div class="px-4 py-4 "> Designation &amp; Department </div>
                  </div>
                  <div class="w-1/4">
                      <div class="px-4 py-4 "> Sign </div>
                  </div>
              </div>
              <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                  <div class="w-full md:w-40 h-full">
                      <div class="px-4 py-4 ">Investigator 1 </div>
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4 "> 
                          <select id="crud-form-6" v-model="selectedEmp1" @change="selectedEmpOne(selectedEmp1)"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                              <option value="" disabled>select Investigator</option>
                              <option v-for="(data, index) in state.viewEmp" :key="index" :value="data.id">{{ data.name }}</option>
                          </select>
                       </div>
                       <template v-if="validate.investigation_name_1.$error">
                        <div v-for="(error, index) in validate.investigation_name_1.$errors" :key="index" class="mt-2 text-danger px-4">
                          {{ error.$message }}
                        </div>
                      </template>
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4 "> 
                        <div class="">
                            <FormInput id="crud-form-16" v-model.trim="validate.investigation_designation_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.investigation_designation_1.$error,}" placeholder="Input Investigator Designation"/>
                          </div>
                       </div>
                       <template v-if="validate.investigation_designation_1.$error">
                          <div v-for="(error, index) in validate.investigation_designation_1.$errors" :key="index" class="mt-2 text-danger px-4">
                            {{ error.$message }}
                          </div>
                        </template>
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4"> 
                        <input id="investigationSign1FileChange" type="file" class="" multiple @change="investigationSign1FileChange"/>
                       </div>
                       <template v-if="validate.investigation_sign_1.$error">
                        <div v-for="(error, index) in validate.investigation_sign_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap px-4">
                          {{ error.$message }}
                        </div>
                      </template>
                  </div>
              </div>
              <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                  <div class="w-full md:w-40 h-full">
                      <div class="px-4 py-4 ">Investigator 2 </div>
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4 "> 
                        <select id="crud-form-6" v-model="selectedEmp2" @change="selectedEmpTwo(selectedEmp2)"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                            <option value="" disabled>select Investigator</option>
                            <option v-for="(data, index) in state.viewEmp" :key="index" :value="data.id">{{ data.name }}</option>
                        </select>
                       </div>
                       <template v-if="validate.investigation_name_2.$error">
                        <div v-for="(error, index) in validate.investigation_name_2.$errors" :key="index" class="mt-2 text-danger px-4">
                          {{ error.$message }}
                        </div>
                      </template>
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4 "> 
                        <div class="">
                          <FormInput id="crud-form-16" v-model.trim="validate.investigation_designation_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.investigation_designation_2.$error,}" placeholder="Input Investigator Designation"/>
                          </div>
                       </div>
                       <template v-if="validate.investigation_designation_2.$error">
                          <div v-for="(error, index) in validate.investigation_designation_2.$errors" :key="index" class="mt-2 text-danger px-4">
                            {{ error.$message }}
                          </div>
                        </template>
                       
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4 "> 
                        <input id="investigationSign2FileChange" type="file" class="" multiple @change="investigationSign2FileChange"/>

                       </div>
                       <template v-if="validate.investigation_sign_2.$error">
                        <div v-for="(error, index) in validate.investigation_sign_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap px-4">
                          {{ error.$message }}
                        </div>
                      </template>
                  </div>
              </div>
              <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                  <div class="w-full md:w-40 h-full">
                      <div class="px-4 py-4 ">Investigator 3 </div>
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4 "> 
                        <select id="crud-form-6" v-model="selectedEmp3" @change="selectedEmpThree(selectedEmp3)"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                            <option value="" disabled>select Investigator</option>
                            <option v-for="(data, index) in state.viewEmp" :key="index" :value="data.id">{{ data.name }}</option>
                        </select>
                       </div>
                       <template v-if="validate.investigation_name_3.$error">
                        <div v-for="(error, index) in validate.investigation_name_3.$errors" :key="index" class="mt-2 text-danger px-4">
                          {{ error.$message }}
                        </div>
                      </template>
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4 "> 
                        <div class="">
                          <FormInput id="crud-form-16" v-model.trim="validate.investigation_designation_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.investigation_designation_3.$error,}" placeholder="Input Investigator Designation"/>
                          </div>
                       </div>
                       <template v-if="validate.investigation_designation_3.$error">
                          <div v-for="(error, index) in validate.investigation_designation_3.$errors" :key="index" class="mt-2 text-danger px-4">
                            {{ error.$message }}
                          </div>
                        </template>
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4 "> 
                        <input id="investigationSign3FileChange" type="file" class="" multiple @change="investigationSign3FileChange"/>
                       </div>
                       <template v-if="validate.investigation_sign_3.$error">
                        <div v-for="(error, index) in validate.investigation_sign_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap px-4">
                          {{ error.$message }}
                        </div>
                      </template>
                  </div>
              </div>
              <div class="flex flex-wrap justify-between py-5 items-center border-b ">
                  <div class="w-full md:w-40 h-full">
                      <div class="px-4 py-4 ">Investigator 4 </div>
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4 "> 
                        <select id="crud-form-6" v-model="selectedEmp4" @change="selectedEmpFour(selectedEmp4)"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                            <option value="" disabled>select Investigator</option>
                            <option v-for="(data, index) in state.viewEmp" :key="index" :value="data.id">{{ data.name }}</option>
                        </select>
                       </div>
                       <template v-if="validate.investigation_name_4.$error">
                        <div v-for="(error, index) in validate.investigation_name_4.$errors" :key="index" class="mt-2 text-danger px-4">
                          {{ error.$message }}
                        </div>
                      </template>
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4 "> 
                        <div class="">
                          <FormInput id="crud-form-16" v-model.trim="validate.investigation_designation_4.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.investigation_designation_4.$error,}" placeholder="Input Investigator Designation"/>
                          </div>
                       </div>
                       <template v-if="validate.investigation_designation_4.$error">
                          <div v-for="(error, index) in validate.investigation_designation_4.$errors" :key="index" class="mt-2 text-danger px-4">
                            {{ error.$message }}
                          </div>
                        </template>
                       
                  </div>
                  <div class="w-full md:w-1/4">
                      <div class="px-4 py-4 "> 
                        <input id="investigationSign4FileChange" type="file" class="" multiple @change="investigationSign4FileChange"/>
                       </div>
                       <template v-if="validate.investigation_sign_4.$error">
                        <div v-for="(error, index) in validate.investigation_sign_4.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap px-4">
                          {{ error.$message }}
                        </div>
                      </template>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box w-full overflow-x-auto ">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Victim Innfo
          </div>
          <div class="mt-5">
              <div class="flex flex-wrap">
                  <div class="w-full  md:w-1/3 md:min-h-170 ">
                    <div  class="md:px-4 md:py-4 h-full ">
                         <div class="px-4 py-4 border border-gray-100 bg-gray-100 shadow-md h-full">
                          <div  class="py-2">
                          <FormLabel class="mb-2">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium uppercase">Name Of The Factory</div>
                                <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                  Required
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <FormInput id="crud-form-16" v-model.trim="validate.name_of_the_factory.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name_of_the_factory.$error,}" placeholder="Input Name Of The Factory"/>
                        </div>
                        <div  class="pt-4 bg-white">
                          <div class="p-4">
                            <FormLabel class="mb-2">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium uppercase">Type of Employee (Put &#10003;)</div>
                                <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                  Required
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                            <div class="flex flex-wrap items-center">
                              <div class="w-full py-2" v-for="item in typeOfEmployee" :key="item">
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
                            </div>
                          </div>

                          </div>
                        </div>
                    </div>
                         </div>
                        
                  </div>
                  <div class="w-full  md:w-1/3 md:min-h-170 ">
                    <div  class="md:px-4 md:py-4 h-full">
                         <div class="px-4 py-4 border border-gray-100 bg-gray-100 shadow-md h-full">
                          <div  class="py-2">
                          <FormLabel class="mb-2">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium ">Date Of Accident</div>
                                <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                  Required
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <FormInput id="crud-form-16" v-model.trim="validate.date_of_accident.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.name_of_the_factory.$error,}" placeholder="Input Date Of Accident"/>
                        </div>
                          <div  class="py-2">
                          <FormLabel class="mb-2">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium">Accident Time</div>
                                <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                  Required
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <FormInput id="crud-form-16" v-model.trim="validate.accident_time.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name_of_the_factory.$error,}" placeholder="Input Accident Time"/>
                        </div>
                          <div  class="py-2">
                          <FormLabel class="mb-2">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium">Accident Shift</div>
                                <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                  Required
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <FormInput id="crud-form-16" v-model.trim="validate.accident_shift.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name_of_the_factory.$error,}" placeholder="Input Accident Shift"/>
                        </div>
                        <div  class="pt-4 bg-white">
                          <div class="p-4">
                            <FormLabel class="mb-2">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium uppercase">Type of Accident (Put &#10003;)</div>
                                <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                  Required
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                            <div class="flex flex-wrap items-center">
                              <div class="w-full  py-2" v-for="item in typeOfAccident" :key="item">
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
                            </div>
                          </div>

                          </div>
                        </div>
                    </div>
                         </div>
                        
                  </div>
                  <div class="w-full  md:w-1/3 md:min-h-170 ">
                    <div  class="md:px-4 md:py-4 h-full">
                         <div class="px-4 py-4 border border-gray-100 bg-gray-100 shadow-md h-full">
                          <div  class="py-2">
                          <FormLabel class="mb-2">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium uppercase">Effected Body Part</div>
                                <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                  Required
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <FormInput id="crud-form-16" v-model.trim="validate.effected_body_part.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.effected_body_part.$error,}" placeholder="Input Effected Body Part"/>
                        </div>
                        <div  class="pt-4 bg-white">
                          <div class="p-4">
                            <FormLabel class="mb-2">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium uppercase">Nature of Injury (Put &#10003;)</div>
                                <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                  Required
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                            <div class="flex flex-wrap items-center">
                              <div class="w-full  py-2" v-for="item in natureOfInjury" :key="item">
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
                            </div>
                          </div>

                          </div>
                        </div>
                    </div>
                         </div>
                        
                  </div>
              </div>
          </div>
        </div>
      </div>
      
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Employee Details
          </div>
          <div class="mt-5">
              <div class="flex flex-wrap">
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                            Name
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
                          </div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                            Department
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
                        </div>
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                            Employee ID
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
                        </div>
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                        Job Title
                          </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-12" v-model.trim="validate.employee_job_title.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.employee_job_title.$error,}" placeholder="Input Job Title"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.employee_job_title.$error">
                          <div v-for="(error, index) in validate.employee_job_title.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                            Age
                          </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-12" v-model.trim="validate.employee_age.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.employee_age.$error,}" placeholder="Input Age"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.employee_age.$error">
                          <div v-for="(error, index) in validate.employee_age.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                            Phone No.
                          </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-12" v-model.trim="validate.employee_phone_no.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.employee_phone_no.$error,}" placeholder="Input Phone No."/> 
                        <div class="flex justify-between">
                          <template v-if="validate.employee_phone_no.$error">
                          <div v-for="(error, index) in validate.employee_phone_no.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                            Address (If available)
                          </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-12" v-model="formData.employee_address" class="w-full" type="text" name="name" placeholder="Input Address"/> 
                        
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                            Experience of current job
                          </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-12" v-model.trim="validate.employee_experience.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.employee_experience.$error,}" placeholder="Input Experience of current job"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.employee_experience.$error">
                          <div v-for="(error, index) in validate.employee_experience.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                        Name of Shift / Area in-charge
                          </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-12" v-model.trim="validate.area_in_charge_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.area_in_charge_name.$error,}" placeholder="Input Name of Shift / Area in-charge"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.area_in_charge_name.$error">
                          <div v-for="(error, index) in validate.area_in_charge_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                        Mobile no. of Shift / Area in-charge
                          </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-12" v-model.trim="validate.area_in_charge_phone_no.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.area_in_charge_phone_no.$error,}" placeholder="Input Mobile no. of Shift / Area in-charge"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.area_in_charge_phone_no.$error">
                          <div v-for="(error, index) in validate.area_in_charge_phone_no.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                        Name of Witness (If any):
                          </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-12" v-model="formData.witness_name" class="w-full" type="text" name="name" placeholder="Input Name of Witness"/> 
                       
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class="px-4 py-4">
                      <FormLabel class="xl:w-64 xl:!mr-10">
                      <div class="mt-3 font-medium  ">
                        Mobile no. of Witness (If any):
                          </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-12" v-model="formData.witness_phone_no" class="w-full" type="text" name="name" placeholder="Input Mobile no. of Witness"/> 
                        
                      </div>
                    </div>
                </div>

              </div>
          </div>
        </div>
      </div>
      
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Accident/ Incident Details
          </div>
          <div class="mt-5">
            <div class="flex flex-wrap">
                  <div class="w-full md:w-1/2">
                    <div class="px-4 py-4">
                        <div class="flex flex-wrap items-center">
                                <div class="w-full md:w-1/2 py-2 font-medium">Describe the exact location where accident occurred:</div>
                                <div class="w-full md:w-1/2 py-2">
                                  <FormInput id="crud-form-12" v-model.trim="validate.accident_exact_location.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.accident_exact_location.$error,}" placeholder="Input Accident occurred location"/> 

  
                                </div>
                          </div>
                          <template v-if="validate.accident_exact_location.$error">
                              <div v-for="(error, index) in validate.accident_exact_location.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                {{ error.$message }}
                              </div>
                            </template>
                      </div>
                  </div>
                  <div class="w-full md:w-1/2">
                    <div class="px-4 py-4">
                        <div class="flex flex-wrap items-center">
                                <div class="w-full md:w-1/2 py-2 font-medium">Detail description of the accident/incident:</div>
                                <div class="w-full md:w-1/2 py-2">
                                  <FormInput id="crud-form-12" v-model.trim="validate.accident_details.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.accident_details.$error,}" placeholder="Input Accident Details"/> 
  
                                </div>
                          </div>
                          <template v-if="validate.accident_details.$error">
                                <div v-for="(error, index) in validate.accident_details.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                  {{ error.$message }}
                                </div>
                              </template>
                      </div>
                  </div>
                  <div class="w-full md:w-1/2">
                      <div class="px-4 py-4">
                        <div class="flex flex-wrap items-center">
                                <div class="w-full md:w-1/2 py-2 font-medium">What immediate initiatives taken after the accident/ Incident?</div>
                                <div class="w-full md:w-1/2 py-2">
                                  <FormInput id="crud-form-12" v-model.trim="validate.accident_initiatives.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.accident_initiatives.$error,}" placeholder="Input Initiatives of accident"/>   
                                </div>
                          </div>
                          <template v-if="validate.accident_initiatives.$error">
                              <div v-for="(error, index) in validate.accident_initiatives.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                {{ error.$message }}
                              </div>
                            </template>
                      </div>
                  </div>
            </div>
            
           
            
          </div>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="pb-5 border-b border-slate-200/60 dark:border-darkmode-400">
            <div class="flex items-center  text-base font-medium ">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />
            THE INCIDENT INVESTIGATION &amp; ROOT CAUSE ANALYSIS
          </div>
          <div class="text-xs ml-6">The events, actions and/or conditions which led to the incident</div>
          </div>
          <div class="mt-5">
            <div class="py-4 px-4">
              <p>INCIDENT ANALYSIS <span class=" text-red-500">(Check All that Apply)</span></p>
            </div>
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/3">
                <div class="px-4 py-4">
                    <div class="px-4 py-4 border">
                      <div class="flex items-center">
                    <div class="font-medium">Unsafe Acts</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                      <div class="flex flex-wrap items-center">
                        <div class="w-full py-2" v-for="item in unsafeActs" :key="item">
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
                      </div>
                    </div>
                    </div>
                
                </div>
              </div>
              <div class="w-full md:w-1/3">
                <div class="px-4 py-4">
                    <div class="px-4 py-4 border">
                      <div class="flex items-center">
                    <div class="font-medium">Unsafe Conditions</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full py-2" v-for="item in unsafeConditions" :key="item">
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
                    </div>
                  </div>
                    </div>
                
                </div>
              </div>
              <div class="w-full md:w-1/3">
                <div class="px-4 py-4">
                    <div class="px-4 py-4 border">
                      <div class="flex items-center">
                    <div class="font-medium">Management Deficiencies</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <div class="flex flex-wrap items-center">
                      <div class="w-full py-2" v-for="item in managementDeficiencies" :key="item">
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
                    </div>
                  </div>
                    </div>
                
                </div>
              </div>
            </div>
            <div class="px-4 py-4">
              
                <p class="text-sm"><span class=" font-medium">ROOT CAUSE ANALYSIS</span> - Using the 5-Why Root Cause Analysis Process and the above listing, explain the cause(s) of the incident in as much

                  detail as possible. <span class=" text-red-500">Do this for each of the three categories where appropriate</span></p>
            </div>
            <!-- sohann  -->
            <!-- unsafe_acts_title
unsafe_conditions_title
management_deficiency_title -->
            <div class="py-4">
              <div class="flex flex-wrap">
                <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div class="border border-gray-100 p-4">
                        <div class="py-4">
                            <FormLabel class="xl:w-64 xl:!mr-10">
                              <div class="mt-3 font-medium  ">
                                1 - Unsafe Acts
                                  </div>
                              </FormLabel>
                              <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_acts_title.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_acts_title.$error,}" placeholder="Input 1 - Unsafe Acts"/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_acts_title.$error">
                                    <div v-for="(error, index) in validate.unsafe_acts_title.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_acts_why_therefore_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_acts_why_therefore_1.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_acts_why_therefore_1.$error">
                                    <div v-for="(error, index) in validate.unsafe_acts_why_therefore_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_acts_why_therefore_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_acts_why_therefore_2.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_acts_why_therefore_2.$error">
                                    <div v-for="(error, index) in validate.unsafe_acts_why_therefore_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_acts_why_therefore_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_acts_why_therefore_3.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_acts_why_therefore_3.$error">
                                    <div v-for="(error, index) in validate.unsafe_acts_why_therefore_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_acts_why_therefore_4.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_acts_why_therefore_4.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_acts_why_therefore_4.$error">
                                    <div v-for="(error, index) in validate.unsafe_acts_why_therefore_4.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_acts_why_therefore_5.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_acts_why_therefore_5.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_acts_why_therefore_5.$error">
                                    <div v-for="(error, index) in validate.unsafe_acts_why_therefore_5.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                            <FormLabel class="xl:w-64 xl:!mr-10">
                              <div class="mt-3 font-medium  ">
                                Root Cause #1
                                  </div>
                              </FormLabel>
                              <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput id="crud-form-11" v-model.trim="validate.root_cause_des1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.root_cause_des1.$error,}" placeholder="Input Root Cause #1:"/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.root_cause_des1.$error">
                                    <div v-for="(error, index) in validate.root_cause_des1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div class="border border-gray-100 p-4">
                        <div class="py-4">
                            <FormLabel class="xl:w-64 xl:!mr-10">
                              <div class="mt-3 font-medium  ">
                                2 - Unsafe Conditions
                                  </div>
                              </FormLabel>
                              <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_conditions_title.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_conditions_title.$error,}" placeholder="Input 2 - Unsafe Conditions"/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_conditions_title.$error">
                                    <div v-for="(error, index) in validate.unsafe_conditions_title.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_conditions_why_therefore_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_conditions_why_therefore_1.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_conditions_why_therefore_1.$error">
                                    <div v-for="(error, index) in validate.unsafe_conditions_why_therefore_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_conditions_why_therefore_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_conditions_why_therefore_2.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_conditions_why_therefore_2.$error">
                                    <div v-for="(error, index) in validate.unsafe_conditions_why_therefore_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_conditions_why_therefore_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_conditions_why_therefore_3.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_conditions_why_therefore_3.$error">
                                    <div v-for="(error, index) in validate.unsafe_conditions_why_therefore_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_conditions_why_therefore_4.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_conditions_why_therefore_4.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_conditions_why_therefore_4.$error">
                                    <div v-for="(error, index) in validate.unsafe_conditions_why_therefore_4.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.unsafe_conditions_why_therefore_5.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.unsafe_conditions_why_therefore_5.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.unsafe_conditions_why_therefore_5.$error">
                                    <div v-for="(error, index) in validate.unsafe_conditions_why_therefore_5.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                            <FormLabel class="xl:w-64 xl:!mr-10">
                              <div class="mt-3 font-medium  ">
                                Root Cause #2
                                  </div>
                              </FormLabel>
                              <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput id="crud-form-11" v-model.trim="validate.root_cause_des2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.root_cause_des2.$error,}" placeholder="Input Root Cause #2:"/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.root_cause_des2.$error">
                                    <div v-for="(error, index) in validate.root_cause_des2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/3">
                  <div class="px-4 py-4">
                    <div class="border border-gray-100 p-4">
                        <div class="py-4">
                            <FormLabel class="xl:w-64 xl:!mr-10">
                              <div class="mt-3 font-medium  ">
                                3 - Management Deficiency
                                  </div>
                              </FormLabel>
                              <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput id="crud-form-11" v-model.trim="validate.management_deficiency_title.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.management_deficiency_title.$error,}" placeholder="Input 3 - Management Deficiency"/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.management_deficiency_title.$error">
                                    <div v-for="(error, index) in validate.management_deficiency_title.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.management_deficiency_why_therefore_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.management_deficiency_why_therefore_1.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.management_deficiency_why_therefore_1.$error">
                                    <div v-for="(error, index) in validate.management_deficiency_why_therefore_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.management_deficiency_why_therefore_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.management_deficiency_why_therefore_2.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.management_deficiency_why_therefore_2.$error">
                                    <div v-for="(error, index) in validate.management_deficiency_why_therefore_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.management_deficiency_why_therefore_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.management_deficiency_why_therefore_3.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.management_deficiency_why_therefore_3.$error">
                                    <div v-for="(error, index) in validate.management_deficiency_why_therefore_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.management_deficiency_why_therefore_4.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.management_deficiency_why_therefore_4.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.management_deficiency_why_therefore_4.$error">
                                    <div v-for="(error, index) in validate.management_deficiency_why_therefore_4.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                          <div class="flex justify-between bg-gray-100 py-4 px-4">
                              <p><span class="font-bold">&darr;</span>Why</p>
                              <p>Therefore<span class="font-bold">&uarr;</span></p>
                          </div>
                          <div class="flex-1 w-full mt-3 xl:mt-0 pt-4">
                                <FormInput id="crud-form-11" v-model.trim="validate.management_deficiency_why_therefore_5.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.management_deficiency_why_therefore_5.$error,}" placeholder=""/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.management_deficiency_why_therefore_5.$error">
                                    <div v-for="(error, index) in validate.management_deficiency_why_therefore_5.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                        <div class="py-4">
                            <FormLabel class="xl:w-64 xl:!mr-10">
                              <div class="mt-3 font-medium  ">
                                Root Cause #3
                                  </div>
                              </FormLabel>
                              <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput id="crud-form-11" v-model.trim="validate.root_cause_des3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.root_cause_des3.$error,}" placeholder="Input Root Cause #3"/>  
                                  <div class="flex justify-between">
                                    <template v-if="validate.root_cause_des3.$error">
                                    <div v-for="(error, index) in validate.root_cause_des3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                      {{ error.$message }}
                                    </div>
                                  </template>
                                  </div>
                              </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <!-- <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Corrective &amp; Preventive Actions
          </div> -->
          <div class="pb-5 border-b border-slate-200/60 dark:border-darkmode-400">
            <div class="flex items-center  text-base font-medium ">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />
            Corrective &amp; Preventive Actions
          </div>
          <div class="text-xs ml-6">How will we eliminate the hazards or prevent this from happening again?</div>
          </div>
          <div class="mt-5">
              <div class="hidden md:flex justify-between py-5 items-center bg-gray-200">
                <div class="w-full md:w-24">
                    <div class="px-4 py-4">
                      Root Cause #
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      Root Cause
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      Corrective Action
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      Person Assigned
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      Target Date
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      Complete Date
                    </div>
                </div>
              </div>
              <div class="flex flex-wrap justify-between items-center">
                <div class="w-full md:w-24">
                    <div class="px-4 py-4">
                      Cause   1
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.root_cause_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.root_cause_1.$error,}" placeholder="Input Root Cause 1"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.root_cause_1.$error">
                          <div v-for="(error, index) in validate.root_cause_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.corrective_action_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.corrective_action_1.$error,}" placeholder="Input Root Cause"/> 
                      <div class="flex justify-between">
                        <template v-if="validate.corrective_action_1.$error">
                        <div v-for="(error, index) in validate.corrective_action_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.person_assigned_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.person_assigned_1.$error,}" placeholder="Input Person Assigned 1"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.person_assigned_1.$error">
                          <div v-for="(error, index) in validate.person_assigned_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.target_date_1.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.target_date_1.$error,}" placeholder="Input Target Date 1"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.target_date_1.$error">
                          <div v-for="(error, index) in validate.target_date_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.complete_date_1.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.complete_date_1.$error,}" placeholder="Input Complete Date 1"/> 
                      <div class="flex justify-between">
                        <template v-if="validate.complete_date_1.$error">
                        <div v-for="(error, index) in validate.complete_date_1.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      </div>
                    </div>
                </div>
              </div>
              <div class="flex flex-wrap justify-between items-center">
                <div class="w-full md:w-24">
                    <div class="px-4 py-4">
                      Cause   2
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.root_cause_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.root_cause_2.$error,}" placeholder="Input Root Cause 2"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.root_cause_2.$error">
                          <div v-for="(error, index) in validate.root_cause_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.corrective_action_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.corrective_action_2.$error,}" placeholder="Input Corrective Action"/> 
                      <div class="flex justify-between">
                        <template v-if="validate.corrective_action_2.$error">
                        <div v-for="(error, index) in validate.corrective_action_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.person_assigned_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.person_assigned_2.$error,}" placeholder="Input Person Assigned 2"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.person_assigned_2.$error">
                          <div v-for="(error, index) in validate.person_assigned_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.target_date_2.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.target_date_2.$error,}" placeholder="Input Target Date 2"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.target_date_2.$error">
                          <div v-for="(error, index) in validate.target_date_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.complete_date_2.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.complete_date_2.$error,}" placeholder="Input Complete Date 2"/> 
                      <div class="flex justify-between">
                        <template v-if="validate.complete_date_2.$error">
                        <div v-for="(error, index) in validate.complete_date_2.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      </div>
                    </div>
                </div>
              </div>
              <div class="flex flex-wrap justify-between items-center">
                <div class="w-full md:w-24">
                    <div class="px-4 py-4">
                      Cause   3
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.root_cause_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.root_cause_3.$error,}" placeholder="Input Root Cause 3"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.root_cause_3.$error">
                          <div v-for="(error, index) in validate.root_cause_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.corrective_action_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.corrective_action_3.$error,}" placeholder="Input Corrective Action 3"/> 
                      <div class="flex justify-between">
                        <template v-if="validate.corrective_action_3.$error">
                        <div v-for="(error, index) in validate.corrective_action_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.person_assigned_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.person_assigned_3.$error,}" placeholder="Input Person Assigned 3"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.person_assigned_3.$error">
                          <div v-for="(error, index) in validate.person_assigned_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.target_date_3.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.target_date_3.$error,}" placeholder="Input Target Date 3"/> 
                        <div class="flex justify-between">
                          <template v-if="validate.target_date_3.$error">
                          <div v-for="(error, index) in validate.target_date_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/6">
                    <div class="px-4 py-4">
                      <FormInput id="crud-form-12" v-model.trim="validate.complete_date_3.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.complete_date_3.$error,}" placeholder="Input Complete Date 3"/> 
                      <div class="flex justify-between">
                        <template v-if="validate.complete_date_3.$error">
                        <div v-for="(error, index) in validate.complete_date_3.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      </div>
                    </div>
                </div>
              </div>
          </div>
          
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Reviewed By
          </div>
            <div class="mt-5">
                <div class="flex">
                  <div class="w-full md:w-1/2">
                    <div class="px-4 py-4">
                    <div class="flex items-center">
                      <FormLabel class="mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">Department Manager’s Comment (If any):</div>
                            </div>
                          </div>
                        </FormLabel>
                        <FormInput id="crud-form-11" v-model.trim="validate.reviewed_by_department_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.reviewed_by_department_name.$error,}" placeholder="Input Reviewed By Department Name"/>  
                    </div>
                    <template v-if="validate.reviewed_by_department_name.$error">
                            <div v-for="(error, index) in validate.reviewed_by_department_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                        
                    </div>
                  </div>
                  <div class="w-full md:w-1/2">
                    <div class="px-4 py-4">
                      <div class="flex items-center">
                        <FormLabel class="mr-10">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Signature:</div>
                          </div>
                        </div>
                      </FormLabel>
                      <input id="reviewedByDepartmentSignaturFileChange" type="file" class="" multiple @change="reviewedByDepartmentSignaturFileChange"/>
  
                    </div>
                    <template v-if="validate.reviewed_by_department_signature.$error">
                        <div v-for="(error, index) in validate.reviewed_by_department_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                          {{ error.$message }}
                        </div>
                      </template>
                      
                      </div>
                  </div>
                  
                </div>
                <div class="flex">
                  <div class="w-full md:w-1/2">
                    <div class="px-4 py-4">
                    <div class="flex items-center">
                      <FormLabel class="mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">Unit HR, HSE &amp; Admin’s Comment (If any):</div>
                            </div>
                          </div>
                        </FormLabel>
                        <FormInput id="crud-form-11" v-model.trim="validate.reviewed_by_unit_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.reviewed_by_unit_name.$error,}" placeholder="Input Reviewed By Unit Name"/>    
                    </div>
                    <template v-if="validate.reviewed_by_unit_name.$error">
                      <div v-for="(error, index) in validate.reviewed_by_unit_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                        {{ error.$message }}
                      </div>
                    </template>
                        
                    </div>
                  </div>
                  <div class="w-full md:w-1/2">
                    <div class="px-4 py-4">
                      <div class="flex items-center">
                        <FormLabel class="mr-10">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Signature:</div>
                          </div>
                        </div>
                      </FormLabel>
                      <input id="reviewedByUnitSignaturFileChange" type="file" class="" multiple @change="reviewedByUnitSignaturFileChange"/>
  
                    </div>
                    <template v-if="validate.reviewed_by_unit_signature.$error">
                      <div v-for="(error, index) in validate.reviewed_by_unit_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                        {{ error.$message }}
                      </div>
                    </template>
                      
                      </div>
                  </div>
                  
                </div>
            </div>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Approved By
          </div>
            <div class="mt-5">
                
                <div class="flex">
                  <div class="w-full md:w-1/2">
                    <div class="px-4 py-4">
                    <div class="flex items-center">
                      <FormLabel class="mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">Unit In charge’s (Plant Head) Comment (If any):</div>
                            </div>
                          </div>
                        </FormLabel>
                        <FormInput id="crud-form-11" v-model.trim="validate.approved_by_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.approved_by_name.$error,}" placeholder="Input Approved By Name"/>    
                    </div>
                    <template v-if="validate.approved_by_name.$error">
                    <div v-for="(error, index) in validate.approved_by_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                      {{ error.$message }}
                    </div>
                  </template>
                        
                    </div>
                  </div>
                  <div class="w-full md:w-1/2">
                    <div class="px-4 py-4">
                      <div class="flex items-center">
                        <FormLabel class="mr-10">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Signature:</div>
                          </div>
                        </div>
                      </FormLabel>
                      <input id="approvedBySignaturFileChange" type="file" class="" multiple @change="approvedBySignaturFileChange"/>
  
                    </div>
                    <template v-if="validate.approved_by_signature.$error">
                    <div v-for="(error, index) in validate.approved_by_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                      {{ error.$message }}
                    </div>
                  </template>
                      
                      </div>
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
    <div class="hidden col-span-2 intro-y ">
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
<style>
.min-h-170{
  min-height: 680px !important;
}
</style>
