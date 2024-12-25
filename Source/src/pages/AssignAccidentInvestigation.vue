<script setup lang="ts">
import _ from "lodash";
import {
  FormInput,
} from "@/components/Base/Form";
import Tippy from "@/components/Base/Tippy";
import Table from "@/components/Base/Table";
import { ref, reactive,toRefs,onMounted } from 'vue';
import axios, { AxiosError } from 'axios';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import TomSelect from "@/components/Base/TomSelect";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { useRouter, useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import config from "@/config";
import Toastify from 'toastify-js';
import Notification from "@/components/Base/Notification";
import Preview from "@/components/Base/Preview";
import Litepicker from "@/components/Base/Litepicker";
import Alert from "@/components/Base/Alert";
import { getToken } from './../auth/setToken'



const router = useRouter();
const route = useRoute();

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
    accident_id: '',
});

const selectedEmp1 = ref("");
const selectedEmp2 = ref("");
const selectedEmp3 = ref("");
const selectedEmp4 = ref("");
const selectedEmployee = ref("");




const state = reactive({
  viewEmp: [] as Array<any>,
  selectEmpData: [] as Array<any>,
  token: getToken(),

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
      accident_id: {required},
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
  let id = route.params.id;
  let sID =id.toString()
  formData.investigation_name_1 = selectedEmp1.value;
  formData.investigation_name_2 = selectedEmp2.value;
  formData.investigation_name_3 = selectedEmp3.value;
  formData.investigation_name_4 = selectedEmp4.value;
  formData.accident_id = sID;
  
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
              const response = await axios.post(url, form,{
                headers: {
                    'Authorization': state.token,
                },
                });
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
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.viewEmp = response.data.data;
    console.log("viewEmp",state.viewEmp)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const selectedEmpOne = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/employee/"+sID;
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    formData.investigation_designation_1 = response.data.data.designation;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const selectedEmpTwo = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/employee/"+sID;
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    formData.investigation_designation_2 = response.data.data.designation;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const selectedEmpThree = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/employee/"+sID;
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    formData.investigation_designation_3 = response.data.data.designation;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const selectedEmpFour = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/employee/"+sID;
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    formData.investigation_designation_4 = response.data.data.designation;
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
