<script setup lang="ts">
import _ from "lodash";
import fakerData from "@/utils/faker";
import {
  FormInput,
  FormInline,
  FormSelect,
  FormLabel,
  FormHelp,
} from "@/components/Base/Form";
import { ref, reactive,toRefs,onMounted } from 'vue';
import axios, { AxiosError } from 'axios';
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { useRouter, useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import config from "@/config";
import Tippy from '@/components/Base/Tippy';
import Toastify from 'toastify-js';
import Notification from "@/components/Base/Notification";
import Alert from "@/components/Base/Alert";
import { getToken } from './../auth/setToken'




const router = useRouter();
const route = useRoute();

let id = route.params.id;
let sID =id.toString()



const formData = reactive({
  status: '',

});
const selectedStatus = ref("");

const state = reactive({
  viewData: [] as Array<any>,
  token: getToken(),

});

interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const rules = {
        status: { required},
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

  formData.status = selectedStatus.value;

    validate.value.$touch();
    if (validate.value.$invalid) {
        FailedPopUp();
    } else {

   try {
            let  url = config.baseURL+'/api/v1/accident-investigation-approved/'+sID;
              const response = await axios.post(url, formData,{
                headers: {
                    'Authorization': state.token,
                },
                });
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

const fetchData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/accident-investigation/'+sID;
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.viewData = response.data.data;

    console.log("state.viewData",state.viewData)

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
  fetchData();
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Accident Investigation Approval</h2>
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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Investigation Data
          </div>
          <div class="mt-5">
              <div class="flex flex-wrap" >
                <div class="md:w-1/4 w-full">
                <div class="p-2">
                    <div class="py-2 font-medium uppercase">id</div>
                    <div class="py-2">{{ state.viewData.id }}</div>
                    </div>
                </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">accident id</div>
                          <div class="py-2">{{ state.viewData.accident_id }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation name 1</div>
                          <div class="py-2">{{ state.viewData.investigation_name_1 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation designation 1</div>
                          <div class="py-2">{{ state.viewData.investigation_designation_1 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation sign 1</div>
                          <div class="py-2">
                            <template v-if="state.viewData.investigation_sign_1 && state.viewData.investigation_sign_1.length > 0">
                              <div class="w-40 h-20" v-for="(img, index) in state.viewData.investigation_sign_1" :key="index">
                                <Tippy as="img" alt="safety" class=" " :src="`${config.baseURL}${img}`" :content="`signature`"/>
                              </div>
                          </template>
                          <template v-else>
                            <span>No Data</span>
                          </template>
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation name 2</div>
                          <div class="py-2">{{ state.viewData.investigation_name_2 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation designation 2</div>
                          <div class="py-2">{{ state.viewData.investigation_designation_2 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation sign 2</div>
                          <div class="py-2">
                            <template v-if="state.viewData.investigation_sign_2 && state.viewData.investigation_sign_2.length > 0">
                              <div class="w-40 h-20" v-for="(img, index) in state.viewData.investigation_sign_2" :key="index">
                                <Tippy as="img" alt="safety" class=" " :src="`${config.baseURL}${img}`" :content="`signature`"/>
                              </div>
                          </template>
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation name 3</div>
                          <div class="py-2">{{ state.viewData.investigation_name_3 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation designation 3</div>
                          <div class="py-2">{{ state.viewData.investigation_designation_3 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation sign 3</div>
                          <div class="py-2">
                            <template v-if="state.viewData.investigation_sign_3 && state.viewData.investigation_sign_3.length > 0">
                              <div class="w-40 h-20" v-for="(img, index) in state.viewData.investigation_sign_3" :key="index">
                                <Tippy as="img" alt="safety" class=" " :src="`${config.baseURL}${img}`" :content="`signature`"/>
                              </div>
                          </template>
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation name 4</div>
                          <div class="py-2">{{ state.viewData.investigation_name_4 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation designation 4</div>
                          <div class="py-2">{{ state.viewData.investigation_designation_4 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">investigation sign 4</div>
                          <div class="py-2">
                            <template v-if="state.viewData.investigation_sign_4 && state.viewData.investigation_sign_4.length > 0">
                              <div class="w-40 h-20" v-for="(img, index) in state.viewData.investigation_sign_4" :key="index">
                                <Tippy as="img" alt="safety" class=" " :src="`${config.baseURL}${img}`" :content="`signature`"/>
                              </div>
                          </template>
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">type of employee</div>
                          <div class="py-2">
                            <div class="flex flex-wrap">
                                <span class="mx-1 my-1 bg-slate-50 p-1" v-for="(data, index) in state.viewData.type_of_employee" :key="index">{{ data }} </span>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">type of accident</div>
                          <div class="py-2">
                            <div class="flex flex-wrap">
                                <span class="mx-1 my-1 bg-slate-50 p-1" v-for="(data, index) in state.viewData.type_of_accident" :key="index">{{ data }} </span>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">nature of injury</div>
                          <div class="py-2">
                            <div class="flex flex-wrap">
                                <span class="mx-1 my-1 bg-slate-50 p-1" v-for="(data, index) in state.viewData.nature_of_injury" :key="index">{{ data }} </span>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">employee id</div>
                          <div class="py-2">{{ state.viewData.employee_id }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">employee department</div>
                          <div class="py-2">{{ state.viewData.employee_department }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">emp_id</div>
                          <div class="py-2">{{ state.viewData.emp_id }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">accident details</div>
                          <div class="py-2">{{ state.viewData.accident_details }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe acts</div>
                          <div class="py-2">
                            <div class="flex flex-wrap">
                                <span class="mx-1 my-1 bg-slate-50 p-1" v-for="(data, index) in state.viewData.unsafe_acts" :key="index">{{ data }} </span>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe conditions</div>
                          <div class="py-2">
                            <div class="flex flex-wrap">
                                <span class="mx-1 my-1 bg-slate-50 p-1" v-for="(data, index) in state.viewData.unsafe_conditions" :key="index">{{ data }} </span>
                            </div>
                              
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">management deficiencies</div>
                          <div class="py-2">
                            <div class="flex flex-wrap">
                                <span class="mx-1 my-1 bg-slate-50 p-1" v-for="(data, index) in state.viewData.management_deficiencies" :key="index">{{ data }} </span>
                            </div>
                          </div>
                      </div>
                  </div>
                 
                  <!-- Repeat for root_cause_2, root_cause_3, corrective_action_1, etc. -->
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">corrective action 1</div>
                          <div class="py-2">{{ state.viewData.corrective_action_1 }}</div>
                      </div>
                  </div>
                  <!-- Continue for other fields like person_assigned_1, target_date_1, etc. -->
                  <div class="md:w-1/4 w-full">
                  <div class="p-2">
                          <div class="py-2 font-medium uppercase">corrective action 2</div>
                          <div class="py-2">{{ state.viewData.corrective_action_2 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">person assigned 2</div>
                          <div class="py-2">{{ state.viewData.person_assigned_2 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">target date 2</div>
                          <div class="py-2">{{ state.viewData.target_date_2 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">complete date 2</div>
                          <div class="py-2">{{ state.viewData.complete_date_2 }}</div>
                      </div>
                  </div>
                  
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">corrective action 3</div>
                          <div class="py-2">{{ state.viewData.corrective_action_3 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">person assigned 3</div>
                          <div class="py-2">{{ state.viewData.person_assigned_3 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">target date 3</div>
                          <div class="py-2">{{ state.viewData.target_date_3 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">complete date 3</div>
                          <div class="py-2">{{ state.viewData.complete_date_3 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">reviewed by department name</div>
                          <div class="py-2">{{ state.viewData.reviewed_by_department_name }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">reviewed by unit name</div>
                          <div class="py-2">{{ state.viewData.reviewed_by_unit_name }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">approved by name</div>
                          <div class="py-2">{{ state.viewData.approved_by_name }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">reviewed by department signature</div>
                          <div class="py-2">
                            <template v-if="state.viewData.reviewed_by_department_signature && state.viewData.reviewed_by_department_signature.length > 0">
                              <div class="w-40 h-20" v-for="(img, index) in state.viewData.reviewed_by_department_signature" :key="index">
                                <Tippy as="img" alt="safety" class=" " :src="`${config.baseURL}${img}`" :content="`signature`"/>
                              </div>
                          </template>
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">reviewed by unit signature</div>
                          <div class="py-2">
                            <template v-if="state.viewData.reviewed_by_unit_signature && state.viewData.reviewed_by_unit_signature.length > 0">
                              <div class="w-40 h-20" v-for="(img, index) in state.viewData.reviewed_by_unit_signature" :key="index">
                                <Tippy as="img" alt="safety" class=" " :src="`${config.baseURL}${img}`" :content="`signature`"/>
                              </div>
                          </template>
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">approved by signature</div>
                          <div class="py-2">
                            <template v-if="state.viewData.approved_by_signature && state.viewData.approved_by_signature.length > 0">
                              <div class="w-40 h-20" v-for="(img, index) in state.viewData.approved_by_signature" :key="index">
                                <Tippy as="img" alt="safety" class=" " :src="`${config.baseURL}${img}`" :content="`signature`"/>
                              </div>
                          </template>
                          </div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">employee name</div>
                          <div class="py-2">{{ state.viewData.employee_name }}</div>
                      </div>
                  </div>
                  
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">name_of_the_factory</div>
                          <div class="py-2">{{ state.viewData.name_of_the_factory }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">date of accident</div>
                          <div class="py-2">{{ state.viewData.date_of_accident }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">accident time</div>
                          <div class="py-2">{{ state.viewData.accident_time }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">accident shift</div>
                          <div class="py-2">{{ state.viewData.accident_shift }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">effected body part</div>
                          <div class="py-2">{{ state.viewData.effectd_body_part }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                    <div class="p-2">
                          <div class="py-2 font-medium uppercase">employee job title</div>
                          <div class="py-2">{{ state.viewData.employee_job_title }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">employee age</div>
                          <div class="py-2">{{ state.viewData.employee_age }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">employee phone_no</div>
                          <div class="py-2">{{ state.viewData.employee_phone_no }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">employee address</div>
                          <div class="py-2">{{ state.viewData.employee_address }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">employee experience</div>
                          <div class="py-2">{{ state.viewData.employee_experience }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">area in charge name</div>
                          <div class="py-2">{{ state.viewData.area_in_charge_name }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">area in charge phone no</div>
                          <div class="py-2">{{ state.viewData.area_in_charge_phone_no }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">witness name</div>
                          <div class="py-2">{{ state.viewData.witness_name }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">witness phone no</div>
                          <div class="py-2">{{ state.viewData.witness_phone_no }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">accident exact location</div>
                          <div class="py-2">{{ state.viewData.accident_exact_location }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">accident initiatives</div>
                          <div class="py-2">{{ state.viewData.accident_initiatives }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe acts why therefore 1</div>
                          <div class="py-2">{{ state.viewData.unsafe_acts_why_therefore_1 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe conditions why therefore 1</div>
                          <div class="py-2">{{ state.viewData.unsafe_conditions_why_therefore_1 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">management deficiency why therefore 1</div>
                          <div class="py-2">{{ state.viewData.management_deficiency_why_therefore_1 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe acts why therefore 2</div>
                          <div class="py-2">{{ state.viewData.unsafe_acts_why_therefore_2 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe conditions why therefore 2</div>
                          <div class="py-2">{{ state.viewData.unsafe_conditions_why_therefore_2 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">management deficiency why therefore 2</div>
                          <div class="py-2">{{ state.viewData.management_deficiency_why_therefore_2 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe acts why therefore 3</div>
                          <div class="py-2">{{ state.viewData.unsafe_acts_why_therefore_3 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe conditions why therefore 3</div>
                          <div class="py-2">{{ state.viewData.unsafe_conditions_why_therefore_3 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">management deficiency why therefore 3</div>
                          <div class="py-2">{{ state.viewData.management_deficiency_why_therefore_3 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe acts why therefore 4</div>
                          <div class="py-2">{{ state.viewData.unsafe_acts_why_therefore_4 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe conditions why therefore 4</div>
                          <div class="py-2">{{ state.viewData.unsafe_conditions_why_therefore_4 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">management deficiency why therefore 4</div>
                          <div class="py-2">{{ state.viewData.management_deficiency_why_therefore_4 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe acts why therefore 5</div>
                          <div class="py-2">{{ state.viewData.unsafe_acts_why_therefore_5 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe conditions why therefore 5</div>
                          <div class="py-2">{{ state.viewData.unsafe_conditions_why_therefore_5 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">management deficiency why therefore 5</div>
                          <div class="py-2">{{ state.viewData.management_deficiency_why_therefore_5 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe acts title</div>
                          <div class="py-2">{{ state.viewData.unsafe_acts_title }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">unsafe conditions title</div>
                          <div class="py-2">{{ state.viewData.unsafe_conditions_title }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">management deficiency title</div>
                          <div class="py-2">{{ state.viewData.management_deficiency_title }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">root cause des1</div>
                          <div class="py-2">{{ state.viewData.root_cause_des1 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">root cause des2</div>
                          <div class="py-2">{{ state.viewData.root_cause_des2 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">root cause des3</div>
                          <div class="py-2">{{ state.viewData.root_cause_des3 }}</div>
                      </div>
                  </div>
                  <div class="md:w-1/4 w-full">
                      <div class="p-2">
                          <div class="py-2 font-medium uppercase">status</div>
                          <div class="py-2">{{ state.viewData.status }}</div>
                      </div>
                  </div>
              </div>
            
          </div>
        </div>
      </div>

      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Status
          </div>
          <div class="mt-5">
            <FormInline class="flex-col items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                        <FormLabel class="xl:w-40 ">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">Status</div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Enter the month of the accident (e.g., January, February).
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0"> 
                          <select id="crud-form-6" v-model="selectedStatus"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 fdark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                                  <option value="" disabled>Select Status</option>
                                  <option value="change_request" >Change Request</option>
                                  <option value="Approved" >Approved</option>
                          </select>
                        <template v-if="validate.status.$error">
                          <div v-for="(error, index) in validate.status.$errors" :key="index" class="mt-2 text-danger">
                            {{ error.$message }}
                          </div>
                        </template>
                        <FormHelp class="text-right"> Required</FormHelp>
                      </div>
                    </FormInline>
          </div>
        </div>
      </div>
      
     
      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <Button
          type="button"class="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52">
          <router-link :to="{name:'accident-investigation-update-form', params:{id:sID} }" class="flex items-center mr-3">
            Update
        </router-link>
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
            <a href="">Investigation Approval</a>
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
            
            <div class="mt-2">
              Indicates whether the accident investigation has been approved or rejected. It serves as a confirmation of the investigation's completion and the initiation of corrective actions.
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
          <div class="font-medium">Approval success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Approval failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
