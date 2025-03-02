<script setup lang="ts">
import { ref, reactive, toRefs,onMounted } from 'vue';
import axios from 'axios';
import Button from "@/components/Base/Button";
import { useRouter } from 'vue-router';
import Notification from "@/components/Base/Notification";
import Lucide from "@/components/Base/Lucide";
import { ClassicEditor } from "@/components/Base/Ckeditor";
import Preview from "@/components/Base/Preview";
import Litepicker from "@/components/Base/Litepicker";
import { getToken } from './../auth/setToken'


import config from "@/config";
import {
  FormInput,
  FormLabel,
  FormSwitch,
  FormCheck,
} from "@/components/Base/Form";
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import Toastify from 'toastify-js';
import Alert from "@/components/Base/Alert";
import _ from "lodash";

const formData = reactive({
      permit_no: '',
      issue_date: '',
      ptw_time: '',
      ptw_from_dept_name: '',
      ptw_to_dept_name: '',
      ptw_work_agency: '',
      ptw_description: '',
      ptw_of_job:'',
      ptw_job: '',
      ptw_issuer: '',
      ptw_lead_signature: [] as File[],

      // Hazards and controls (array type)
      hazards: [] as any[],
      general_hazards: [] as any[],
      general_control: [] as any[],
      work_at_height_hazards: [] as any[],
      work_at_height_control: [] as any[],
      confined_space_hazards: [] as any[],
      confined_space_control: [] as any[],
      electrical_work_hazards: [] as any[],
      electrical_work_control: [] as any[],
      hot_work_hazards: [] as any[],
      hot_work_control: [] as any[],
      mechanical_work_hazards: [] as any[],
      mechanical_work_control: [] as any[],
      civil_work_hazards: [] as any[],
      civil_work_control: [] as any[],

      // PPE fields
      ppe_please: '',
      ppe_isolate: '',
      ppe_the: '',
      ppe_equipment: '',
      ppe_engineer_signature: [] as File[],
      ppe_lead_signature: [] as File[],
      ppe_receiver_name: '',
      ppe_receiver_signature: [] as File[],
      ppe_receiver_date: '',

      // Acknowledgment fields
      ack_name: '',
      ack_signature: [] as File[],
      ack_dept: '',
      ack_supervisor_name: '',
      ack_supervisor_signature: [] as File[],
      ack_supervisor_dept: '',
      ack_name_of_workers: [] as any[],
      ack_approval_name: '',
      ack_approval_signature: [] as File[],

      // Job completion fields
      job_completion_date: '',
      job_completion_time: '',
      job_completion_signature: [] as File[],

      // PTW date and agency fields
      ptw_date_1: '',
      ptw_work_agency_1: '',
      ptw_receiver_1: '',
      ptw_location_In_Charge_1: '',
      ptw_work_after_6pm_1: '',
      ptw_date_2: '',
      ptw_work_agency_2: '',
      ptw_receiver_2: '',
      ptw_location_In_Charge_2: '',
      ptw_work_after_6pm_2: '',
      ptw_date_3: '',
      ptw_work_agency_3: '',
      ptw_receiver_3: '',
      ptw_location_In_Charge_3: '',
      ptw_work_after_6pm_3: '',
      ptw_date_4: '',
      ptw_work_agency_4: '',
      ptw_receiver_4: '',
      ptw_location_In_Charge_4: '',
      ptw_work_after_6pm_4: ''
});

const router = useRouter();
const ptwjobData = ref("");
const auditdate = ref("");
const issuedate = ref("");
const ptwdate1 = ref("");
const ptwdate2 = ref("");
const ptwdate3 = ref("");
const ptwdate4 = ref("");

const state = reactive({
  token: getToken(),
});




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
};

const handlePtwLeadSignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.ptw_lead_signature = Array.from(input.files);
  }
};
const ppeEngineerSignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.ppe_engineer_signature = Array.from(input.files);
  }
};
const ppeLeadSignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.ppe_lead_signature = Array.from(input.files);
  }
};
const ppeReceiverSignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.ppe_receiver_signature = Array.from(input.files);
  }
};
const ackSignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.ack_signature = Array.from(input.files);
  }
};
const ackSupervisorSignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.ack_supervisor_signature = Array.from(input.files);
  }
};
const ackApprovalSignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.ack_approval_signature = Array.from(input.files);
  }
};
const jobCompletionSignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.job_completion_signature = Array.from(input.files);
  }
};

const rules = {
      permit_no: { required, minLength: minLength(3) },
      issue_date: { required, minLength: minLength(3) },
      ptw_time: { required, minLength: minLength(3) },
      // ptw_dept_name: { required, minLength: minLength(3) },
      ptw_from_dept_name: { required },
      ptw_to_dept_name: { required },
      ptw_work_agency: { required },
      ptw_description: { required },
      ptw_of_job: { required },
      ptw_job: { required },
      ptw_issuer: { required },
      ptw_lead_signature: { required }, // for file input, check if array has items
      hazards: { required },
      general_hazards: { required },
      general_control: { required },
      work_at_height_hazards: { required },
      work_at_height_control: { required },
      confined_space_hazards: { required },
      confined_space_control: { required },
      electrical_work_hazards: { required },
      electrical_work_control: { required },
      hot_work_hazards: { required },
      mechanical_work_hazards: { required },
      mechanical_work_control: { required },
      civil_work_hazards: { required },
      civil_work_control: { required },

      // PPE fields
      ppe_please: { required, minLength: minLength(3) },
      ppe_isolate: { required, minLength: minLength(3) },
      ppe_the: { required, minLength: minLength(3) },
      ppe_equipment: { required, minLength: minLength(3) },
      ppe_engineer_signature: { required }, // for file input, check if array has items
      ppe_lead_signature: { required }, // for file input, check if array has items
      ppe_receiver_name: { required, minLength: minLength(3) },
      ppe_receiver_signature: { required }, // for file input, check if array has items
      ppe_receiver_date: { required, minLength: minLength(3) },

      // Acknowledgment fields
      ack_name: { required, minLength: minLength(3) },
      ack_signature: { required }, // for file input, check if array has items
      ack_dept: { required, minLength: minLength(3) },
      ack_supervisor_name: { required, minLength: minLength(3) },
      ack_supervisor_signature: { required }, // for file input, check if array has items
      ack_supervisor_dept: { required, minLength: minLength(3) },
      // ack_name_of_workers: { required },
      ack_approval_name: { required, minLength: minLength(3) },
      ack_approval_signature: { required }, // for file input, check if array has items

      // Job completion fields
      // job_completion_date: { required, minLength: minLength(3) },
      // job_completion_time: { required, minLength: minLength(3) },
      // job_completion_signature: { required }, 

      // PTW date and agency fields
      ptw_date_1: { required, minLength: minLength(3) },
      ptw_work_agency_1: { required, minLength: minLength(3) },
      ptw_receiver_1: { required, minLength: minLength(3) },
      ptw_location_In_Charge_1: { required, minLength: minLength(3) },
      ptw_work_after_6pm_1: { required, minLength: minLength(3) },
      ptw_date_2: { required, minLength: minLength(3) },
      ptw_work_agency_2: { required, minLength: minLength(3) },
      ptw_receiver_2: { required, minLength: minLength(3) },
      ptw_location_In_Charge_2: { required, minLength: minLength(3) },
      ptw_work_after_6pm_2: { required, minLength: minLength(3) },
      ptw_date_3: { required, minLength: minLength(3) },
      ptw_work_agency_3: { required, minLength: minLength(3) },
      ptw_receiver_3: { required, minLength: minLength(3) },
      ptw_location_In_Charge_3: { required, minLength: minLength(3) },
      ptw_work_after_6pm_3: { required, minLength: minLength(3) },
      ptw_date_4: { required, minLength: minLength(3) },
      ptw_work_agency_4: { required, minLength: minLength(3) },
      ptw_receiver_4: { required, minLength: minLength(3) },
      ptw_location_In_Charge_4: { required, minLength: minLength(3) },
      ptw_work_after_6pm_4: { required, minLength: minLength(3) }
};

const validate = useVuelidate(rules, toRefs(formData));


const submitForm = async () => {
  formData.ptw_job = ptwjobData.value;
  formData.issue_date = issuedate.value;
  formData.ptw_date_1 = ptwdate1.value;
  formData.ptw_date_2 = ptwdate2.value;
  formData.ptw_date_3 = ptwdate3.value;
  formData.ptw_date_4 = ptwdate4.value;

    validate.value.$touch();
    console.log(validate.value)
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
            try {
                let  url = config.baseURL+'/api/v1/hse-permit-work-form';
                const response = await axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,

                },
                });
                SuccessPopUp();
                if (response.data !== undefined) {
                    router.push({ name: 'hse-permit-work-list' });
                }
        
            } catch (error) {
              FailedPopUp();
                console.error('Error submitting form:', error);
            }
        
    }
};
// Ext Function 
const hazardOptions = [
      "Fire & Explosion",
      "Excessive Heat",
      "Running mc. parts",
      "Falling Object",
      "Falling from height",
      "Fragile roof",
      "Hazardous Chemicals",
      "Dust",
      "Noise",
      "Pressure",
      "Electricity",
      "Lack of light",
      "Flammable Materials",
    ];
const generalHazardsOptions = [
  "Slip, trip & fall",
  "High noise",
  "Fume & Dust",
  "Faulty Equipment",
  "Manual Handling",
  "Wet/ Slippery surface",
  "Hot surface",
  "Excess Heat",
  "Hazardous Chemical",
  "Exposed Electric connection",
];
const generalControlOptions = [
    "Briefing to workforce",
    "Supervision",
    "Provided proper tools and tackles",
    "Ensured adequate light",
    "Signage & tags",
    "Restricted movement",
    "SDS applied",
    "Ensured proper housekeeping"
  ]
  const work_at_height_hazardsOptions = [
  "Fall from height",
  "Falling object",
  "Fall on the same level",
  "No lifeline",
  "Sharp edges",
  "Insecure access to platform",
  "Uneven working platform",
  "Fragile roof",
  "Overhead power cables",
  "Lone working"
];

const work_at_height_controlOptions = [
  "Use scaffold/ ladder/ lift",
  "Barricades/ Drop zone",
  "Vertical/ Horizontal lifeline",
  "Double lanyard full harness",
  "Safe material lifting method",
  "Anchor point",
  "Post fall rescue plan",
  "Fixing ladder",
  "Debris Nets",
  "Secured working platform"
];
const confined_space_hazardsOptions = [
  "Mud/dirty water/dust",
  "Toxic chemical (Gas)",
  "Lack of oxygen",
  "Inadequate ventilation",
  "Inadequate access point",
  "Inadequate light"
];
const confined_space_controlOptions = [
  "Ventilation before access",
  "Inspection of atmosphere (oxygen level, toxic gas)",
  "Tripod placed",
  "Rescue plan & Supervision",
  "Ensured proper lighting"
];
const electrical_work_hazardsOptions = [
  "Live line/ wire",
  "Electrocution",
  "Improper insulation",
  "Lone work",
  "Flammable materials",
  "Wet hand or other body part",
  "Arc Flash",
  "Wet floor"
];
const electrical_work_controlOptions = [
  "Lock Out Tag Out taken",
  "Fire extinguisher in place",
  "Rescue plan and equipment",
  "GFCI",
  "Rubber mat available",
  "Ensured earthing",
  "Proper supervision",
  "Plug, socket & board checked"
];
const hot_work_hazardsOptions = [
  "Machine without cover",
  "Welding fume/dust",
  "Broken welding holder",
  "Flying sparks",
  "Insecure power connection",
  "Flammable materials around",
  "Wet floor",
  "Insecure gas cylinder"
];
const hot_work_controlOptions = [
  "Fire extinguisher in place",
  "Flash back arrestor in place",
  "Lock Out Tag Out taken",
  "Proper supervision",
  "Jointless electrical cable",
  "Industrial plug socket",
  "Flammable things removed",
  "Barricades, sign & tags"
];
const mechanical_work_hazardsOptions = [
  "Hot/cold surface",
  "Slippery surface",
  "Sharp object",
  "Oily tools",
  "Compressed air",
  "Hot Steam",
  "Moving/rotating parts of machine",
  "Residual stored energy"
];
const mechanical_work_controlOptions = [
  "Stored energy released",
  "Lock Out Tag Out taken",
  "Protection with guards",
  "Barricades, sign & tags",
  "Adequate space for movement",
  "Surface temperature assessed",
  "Equipment inspected",
  "Proper supervision"
];
const civil_work_hazardsOptions = [
  "Flying chips",
  "Gas cutting",
  "Falling object",
  "Underground cables",
  "Overhead powerline",
  "Dust",
  "Dangerous opening",
  "Collapse of wall",
  "Cave-in",
  "Heavy materials"
];
const civil_work_controlOptions = [
  "Area cordoned",
  "Work platform/scaffold",
  "Secured dangerous opening",
  "Restricted entry",
  "Fire protection",
  "Energy isolation",
  "Sloping/shoring/shielding soil",
  "Debris and soil removed",
  "Proper supervision",
  "Safety net"
];







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

</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Add Permit to Work Form</h2>
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
          Ensure accurate online Permit to Work Form with correct date formats and file uploads in the specified format and size.
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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Permit to Work Info.
          </div>
          <div class="flex flex-wrap items-center justify-between">
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Permit No</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Unique identifier for the permit.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.permit_no.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.permit_no.$error,}" placeholder="Input Permit No"/>
                        <div class="flex justify-between">
                          <template v-if="validate.permit_no.$error">
                          <div v-for="(error, index) in validate.permit_no.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                            {{ error.$message }}
                          </div>
                        </template>
                          <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                          </div>
                      </div>
                    </FormInline>
                </div>
              </div>
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">Issue Date</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Date when the permit was issued.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <Preview class="intro-y box" v-slot="{ toggle }">
                            <Preview.Panel>
                                <div class="relative w-full mx-auto">
                                  <div
                                    class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                    <Lucide icon="Calendar" class="w-4 h-4" />
                                  </div>
                                  <Litepicker
                                    v-model="issuedate"
                                    :options="{
                                      autoApply: false,
                                      showWeekNumbers: true,
                                      dropdowns: {
                                        minYear: 1990,
                                        maxYear: null,
                                        months: true,
                                        years: true,
                                      },
                                    }"
                                    class="pl-12"/>
                                </div>
                              </Preview.Panel>
                              <Preview.Panel type="source">
                                <Preview.Highlight>
                                  {{`
                                  <div class="relative w-56 mx-auto">
                                    <div
                                      class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"
                                    >
                                      <Lucide icon="Calendar" class="w-4 h-4" />
                                    </div>
                                    <Litepicker
                                      v-model="issuedate"
                                      :options="{
                                        autoApply: false,
                                        showWeekNumbers: true,
                                        dropdowns: {
                                          minYear: 1990,
                                          maxYear: null,
                                          months: true,
                                          years: true,
                                        },
                                      }"
                                      class="pl-12"
                                    />
                                  </div>
                                  `}}
                                </Preview.Highlight>
                              </Preview.Panel>
                          
                          </Preview>
                          <div class="flex justify-between">
                            <template v-if="validate.issue_date.$error">
                            <div v-for="(error, index) in validate.issue_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            <p class="text-right mt-2 w-full"> Required</p>
                          </div>
                      </div>
                    </FormInline>
                </div>
              </div>
              
              <div class="w-full md:w-1/2">
                <div class="p-4">
                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="w-full md:w-1/3">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium">PTW Time</div>
                            
                          </div>
                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                            Time of permit-to-work issuance.
                          </div>
                        </div>
                      </FormLabel>
                      <div class="w-full md:w-2/3 flex-1 ">
                        <FormInput id="crud-form-1" v-model.trim="validate.ptw_time.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_time.$error,}" placeholder="Input PTW Time"/>
                        <div class="flex justify-between">
                          <template v-if="validate.ptw_time.$error">
                          <div v-for="(error, index) in validate.ptw_time.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
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
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />To be done by permit issuer
          </div>
            <div class="flex flex-wrap items-center justify-between">
                <div class="w-full">
                    <div class="p-2">
                        <div class="flex flex-wrap">
                            <div class="w-full md:w-1/2">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">From (Dept. Name)</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <FormInput id="crud-form-1" v-model.trim="validate.ptw_from_dept_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_from_dept_name.$error,}" placeholder="Input dept name"/>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ptw_from_dept_name.$error">
                                            <div v-for="(error, index) in validate.ptw_from_dept_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium"> To: Internal Dept. or</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" v-model.trim="validate.ptw_to_dept_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_to_dept_name.$error,}" placeholder="Input dept name"/>
                                              <div class="font-medium px-1"> Dept</div>
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ptw_to_dept_name.$error">
                                            <div v-for="(error, index) in validate.ptw_to_dept_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">Work agency/Contractor</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <FormInput id="crud-form-1" v-model.trim="validate.ptw_work_agency.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_work_agency.$error,}" placeholder="Input Contractor name"/>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ptw_work_agency.$error">
                                            <div v-for="(error, index) in validate.ptw_work_agency.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium"> Description</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" v-model.trim="validate.ptw_description.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_description.$error,}" placeholder="Input Description"/>
                                              
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ptw_description.$error">
                                            <div v-for="(error, index) in validate.ptw_description.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium"> of</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" v-model.trim="validate.ptw_of_job.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_of_job.$error,}" placeholder="Input Description"/>
                                              
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ptw_of_job.$error">
                                            <div v-for="(error, index) in validate.ptw_of_job.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                                </div>
                            </div>
                            <div class="w-full">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap  items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">Job</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="flex-1 w-full mt-3 xl:mt-0">
                                          <ClassicEditor v-model="ptwjobData" :class="{ 'border-danger': validate.ptw_job.$error,}" :config="editorConfig" />
                                          
                                          <div class="flex justify-between">
                                            <template v-if="validate.ptw_job.$error">
                                            <div v-for="(error, index) in validate.ptw_job.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                          </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div>
                            <div class="w-full md:w-1/2">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">Name (Issuer)</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <FormInput id="crud-form-1" v-model.trim="validate.ptw_issuer.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_issuer.$error,}" placeholder="Input Issuer Name"/>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ptw_issuer.$error">
                                            <div v-for="(error, index) in validate.ptw_issuer.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium"> Signature</div>
                                            </div>
                                          </div>
                                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                            (Lead/In-charge/Team Member) 
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" class="w-full border" @change="handlePtwLeadSignature" multiple type="file" name="name"/>
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ptw_lead_signature.$error">
                                            <div v-for="(error, index) in validate.ptw_lead_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Hazards (Put tick mark)
          </div>
            <div class="flex flex-wrap items-center justify-between">
              <div class="mt-3">
                <div class="flex flex-wrap flex-col mt-2 sm:flex-row">
                  <FormCheck
                    v-for="(hazard, index) in hazardOptions"
                    :key="index"
                    class="mr-4 mt-4"
                  >
                    <FormCheck.Input
                      :id="`checkbox-switch-${index + 1}`"
                      type="checkbox"
                      :value="hazard"
                      v-model="formData.hazards"
                    />
                    <FormCheck.Label :htmlFor="`checkbox-switch-${index + 1}`">
                      {{ hazard }}
                    </FormCheck.Label>
                  </FormCheck>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
            <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />To be done by internal department or work agency or contractor
          </div>
            <div class="flex flex-wrap  items-center justify-between py-4 bg-theme-1 text-white rounded-md">
                <div class="md:w-1/5 w-full text-center">
                  Type
                </div>
                <div class="md:w-2/5 w-full text-center">
                  Hazard (put ✓ mark)
                </div>
                <div class="md:w-2/5 w-full text-center">
                  Control (put ✓ mark)
                </div>
            </div>
            <div class="flex flex-wrap  items-center justify-between border-b ">
                <div class="md:w-1/5 w-full text-center">
                  General
                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                            <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in generalHazardsOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-general-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.general_hazards"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-general-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                        </div>
                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                            <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in generalControlOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-control-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.general_control"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-control-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                        </div>

                </div>
              
            </div>
            <div class="flex flex-wrap  items-center justify-between border-b">
                <div class="md:w-1/5 w-full text-center">
                  Work at Height (6feet or above)
                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                      <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                        <div class="p-4">
                            <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in work_at_height_hazardsOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-work_at_height-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.work_at_height_hazards"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-work_at_height-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>

                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                    <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in work_at_height_controlOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-height_control-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.work_at_height_control"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-height_control-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                  </div>

                </div>
              
            </div>
            <div class="flex flex-wrap  items-center justify-between border-b">
                <div class="md:w-1/5 w-full text-center">
                  Confined Space
                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                    <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in confined_space_hazardsOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-confined_space_hazards-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.confined_space_hazards"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-confined_space_hazards-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                  </div>

                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                    <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in confined_space_controlOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-confined_space_control-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.confined_space_control"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-confined_space_control-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                  </div>

                </div>
                

            </div>
            <div class="flex flex-wrap  items-center justify-between border-b">
                <div class="md:w-1/5 w-full text-center">
                  Electrical Work
                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                    <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in electrical_work_hazardsOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-electrical_work_hazards-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.electrical_work_hazards"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-electrical_work_hazards-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
              </div>


                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                    <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in electrical_work_controlOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-electrical_work_control-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.electrical_work_control"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-electrical_work_control-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                </div>
                </div>
              
            </div>
           
            <div class="flex flex-wrap  items-center justify-between border-b">
                <div class="md:w-1/5 w-full text-center">
                  Hot Work
                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                    <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in hot_work_hazardsOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-hot_work_hazards-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.hot_work_hazards"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-hot_work_hazards-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
              </div>

                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                    <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in hot_work_controlOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-hot_work_control-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.hot_work_control"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-hot_work_control-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                  </div>
                </div>
              
            </div>
            <div class="flex flex-wrap  items-center justify-between border-b">
                <div class="md:w-1/5 w-full text-center">
                  Mechanical Work
                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                    <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in mechanical_work_hazardsOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-mechanical_work_hazards-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.mechanical_work_hazards"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-mechanical_work_hazards-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                </div>

                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                    <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in mechanical_work_controlOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-mechanical_work_control-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.mechanical_work_control"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-mechanical_work_control-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                </div>

                </div>
              
            </div>
            <div class="flex flex-wrap  items-center justify-between">
                <div class="md:w-1/5 w-full text-center">
                  Civil work/ Excavation/ Demolition
                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                    <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in civil_work_hazardsOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-civil_work_hazards-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.civil_work_hazards"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-civil_work_hazards-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                </div>


                </div>
                <div class="md:w-2/5 w-full text-center">
                  <div class="p-4">
                    <div class="flex flex-wrap flex-col mt-2 sm:flex-row rounded-md p-2">
                              <FormCheck
                                  v-for="(hazard, index) in civil_work_controlOptions"
                                  :key="index"
                                  class="mr-4 mt-4"
                                >
                                  <FormCheck.Input
                                    :id="`checkbox-civil_work_control-${index + 1}`"
                                    type="checkbox"
                                    :value="hazard"
                                    v-model="formData.civil_work_control"
                                  />
                                  <FormCheck.Label :htmlFor="`checkbox-civil_work_control-${index + 1}`">
                                    {{ hazard }}
                                  </FormCheck.Label>
                                </FormCheck>
                            </div>
                </div>

                </div>
              
            </div>
        </div>
      </div>
     
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Personal Protective Equipment (PPE)
          </div>
            <div class="flex flex-wrap items-center justify-between">
                <div class="w-full">
                    <div class="p-2">
                        <div class="flex flex-wrap">
                            <div class="w-full md:w-1/2">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">Please</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <FormInput id="crud-form-1" v-model.trim="validate.ppe_please.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ppe_please.$error,}" placeholder=""/>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ppe_please.$error">
                                            <div v-for="(error, index) in validate.ppe_please.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium"> isolate</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" v-model.trim="validate.ppe_isolate.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ppe_isolate.$error,}" placeholder="Input "/>
                                              
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ppe_isolate.$error">
                                            <div v-for="(error, index) in validate.ppe_isolate.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">the</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <FormInput id="crud-form-1" v-model.trim="validate.ppe_the.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ppe_the.$error,}" placeholder=""/>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ppe_the.$error">
                                            <div v-for="(error, index) in validate.ppe_the.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium"> equipment</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" v-model.trim="validate.ppe_equipment.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ppe_equipment.$error,}" placeholder="Input equipment"/>
                                              
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ppe_equipment.$error">
                                            <div v-for="(error, index) in validate.ppe_equipment.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                                </div>
                            </div>
                            <div class="w-full">
                                <div class="p-2 font-medium">
                                  Equipment/s has/have been isolated, locked and tagged out:
                                </div>
                            </div>
                            <!-- <div class="w-full md:w-1/2">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">Date</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <FormInput id="crud-form-1" v-model.trim="validate.ptw_issuer.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_issuer.$error,}" placeholder="Input dept name"/>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ptw_issuer.$error">
                                            <div v-for="(error, index) in validate.ptw_issuer.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div>
                            <div class="w-full md:w-1/2">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">Time</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <FormInput id="crud-form-1" v-model.trim="validate.ptw_issuer.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_issuer.$error,}" placeholder="Input dept name"/>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ptw_issuer.$error">
                                            <div v-for="(error, index) in validate.ptw_issuer.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div> -->
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium"> Signature</div>
                                            </div>
                                          </div>
                                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                            Engineer/electrician/mechanics
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" class="w-full border" @change="ppeEngineerSignature" multiple type="file" name="name"/>
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ppe_engineer_signature.$error">
                                            <div v-for="(error, index) in validate.ppe_engineer_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

                                </div>
                            </div>


                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium"> Signature</div>
                                            </div>
                                          </div>
                                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                            Lead/In-charge/Team Member
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" class="w-full border" @change="ppeLeadSignature" multiple type="file" name="name"/>
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ppe_lead_signature.$error">
                                            <div v-for="(error, index) in validate.ppe_lead_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Acceptance of Receiver: <span class="text-xs font-normal ml-2">To be completed by dept. who will execute this job.</span>
          </div>
            <div class="flex flex-wrap items-center justify-between">
                <div class="w-full">
                    <div class="p-2">
                        <div class="flex flex-wrap">
                            <div class="w-full md:w-1/2">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">Name of Receiver</div>
                                            </div>
                                          </div>
                                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                            (Lead/In-charge/Team Member)
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <FormInput id="crud-form-1" v-model.trim="validate.ppe_receiver_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ppe_receiver_name.$error,}" placeholder="Input dept name"/>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ppe_receiver_name.$error">
                                            <div v-for="(error, index) in validate.ppe_receiver_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div>
                          
                          
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium"> Signature</div>
                                            </div>
                                          </div>
                                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                            Engineer/electrician/mechanics
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" class="w-full border" @change="ppeReceiverSignature" multiple type="file" name="name"/>

                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ppe_receiver_signature.$error">
                                            <div v-for="(error, index) in validate.ppe_receiver_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium"> Date</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" v-model.trim="validate.ppe_receiver_date.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ppe_receiver_date.$error,}" placeholder="Input dept name"/>
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ppe_receiver_date.$error">
                                            <div v-for="(error, index) in validate.ppe_receiver_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Acknowledgement:  <span class="text-xs font-normal ml-2">Above safety measures have been explained to me. I have been informed about the type of job and risks from this task.</span>
          </div>
            <div class="flex flex-wrap items-center justify-between">
                <div class="w-full">
                    <div class="p-2">
                        <div class="flex flex-wrap">
                            <div class="w-full md:w-1/2">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">BSRM Supervisor’s Name</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <FormInput id="crud-form-1" v-model.trim="validate.ack_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ack_name.$error,}" placeholder="Input dept name"/>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ack_name.$error">
                                            <div v-for="(error, index) in validate.ack_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div>
                          
                            
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">BSRM Supervisor’s Signature</div>
                                            </div>
                                          </div>
                                          
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" class="w-full border" @change="ackSignature" multiple type="file" name="name"/>

                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ack_signature.$error">
                                            <div v-for="(error, index) in validate.ack_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">BSRM Supervisor’s Dept</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" v-model.trim="validate.ack_dept.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ack_dept.$error,}" placeholder="Input dept name"/>
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ack_dept.$error">
                                            <div v-for="(error, index) in validate.ack_dept.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

                                </div>
                            </div>
                           
                            <div class="w-full md:w-1/2">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">Contractor Supervisor’s Name:</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <FormInput id="crud-form-1" v-model.trim="validate.ack_supervisor_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ack_supervisor_name.$error,}" placeholder="Input dept name"/>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ack_supervisor_name.$error">
                                            <div v-for="(error, index) in validate.ack_supervisor_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div>
                           
                            
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">Contractor Supervisor’s Signature</div>
                                            </div>
                                          </div>
                                          
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" class="w-full border" @change="ackSupervisorSignature" multiple type="file" name="name"/>
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ack_supervisor_signature.$error">
                                            <div v-for="(error, index) in validate.ack_supervisor_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">Contractor Supervisor’s Dept</div>
                                            </div>
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" v-model.trim="validate.ack_supervisor_dept.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ack_supervisor_dept.$error,}" placeholder="Input dept name"/>
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ack_supervisor_dept.$error">
                                            <div v-for="(error, index) in validate.ack_supervisor_dept.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

                                </div>
                            </div>
                            <div class="w-full md:w-1/2">
                              <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">In-charge Name:</div>
                                            </div>
                                          </div>
                                          <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                            Location In-charge (Lead/ In-charge/ Team Member):
                                          </div>
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <FormInput id="crud-form-1" v-model.trim="validate.ack_approval_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ack_approval_name.$error,}" placeholder="Input dept name"/>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ack_approval_name.$error">
                                            <div v-for="(error, index) in validate.ack_approval_name.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>
                              </div>
                            </div>
                           
                             
                            <div class="w-full md:w-1/2">
                                <div class="p-2">
                                  <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel class="w-full md:w-40">
                                          <div class="text-left">
                                            <div class="flex items-center">
                                              <div class="font-medium">In-charge Signature</div>
                                            </div>
                                          </div>
                                          
                                        </FormLabel>
                                        <div class="w-full md:w-2/3 flex-1 ">
                                          <div class="flex items-center">
                                            <FormInput id="crud-form-1" class="w-full border" @change="ackApprovalSignature" multiple type="file" name="name"/>
                                          </div>
                                          <div class="flex justify-between">
                                            <template v-if="validate.ack_approval_signature.$error">
                                            <div v-for="(error, index) in validate.ack_approval_signature.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                              {{ error.$message }}
                                            </div>
                                          </template>
                                            </div>
                                        </div>
                                  </FormInline>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
      <!-- SOHAN -->
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /><span class="text-xs font-normal ml-2">Re-validity: A PTW will be validated max. of 5 days. If the work is extended after 5 days, another work permit will be issued. If there are no changes in site & location of work, only then re-validity is possible. Work agency, Receiver & location In-charge will sign at specific place of form every day before task.</span>
          </div>
            <div class="flex flex-wrap bg-theme-1 py-2 text-white items-center">
                <div class="w-full md:w-1/5 text-center">
                  Date
                </div>
                <div class="w-full md:w-1/5 text-center">
                  Work Agency
                </div>
                <div class="w-full md:w-1/5 text-center">
                  Receiver
                </div>
                <div class="w-full md:w-1/5 text-center">
                  Location In-Charge
                </div>
                <div class="w-full md:w-1/5 text-center">
                  Work after 6 pm (Location In-Charge)
                </div>
            </div>
            
            <div class="flex flex-wrap  py-4  items-center">
                <div class="w-full md:w-1/5 text-center">
                    <div class="p-2">
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                      <Preview class="intro-y box" v-slot="{ toggle }">
                        <Preview.Panel>
                            <div class="relative w-full mx-auto">
                              <div
                                class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                <Lucide icon="Calendar" class="w-4 h-4" />
                              </div>
                              <Litepicker
                                v-model="ptwdate1"
                                :options="{
                                  autoApply: false,
                                  showWeekNumbers: true,
                                  dropdowns: {
                                    minYear: 1990,
                                    maxYear: null,
                                    months: true,
                                    years: true,
                                  },
                                }"
                                class="pl-12"/>
                            </div>
                          </Preview.Panel>
                          <Preview.Panel type="source">
                            <Preview.Highlight>
                              {{`
                              <div class="relative w-56 mx-auto">
                                <div
                                  class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"
                                >
                                  <Lucide icon="Calendar" class="w-4 h-4" />
                                </div>
                                <Litepicker
                                  v-model="ptwdate1"
                                  :options="{
                                    autoApply: false,
                                    showWeekNumbers: true,
                                    dropdowns: {
                                      minYear: 1990,
                                      maxYear: null,
                                      months: true,
                                      years: true,
                                    },
                                  }"
                                  class="pl-12"
                                />
                              </div>
                              `}}
                            </Preview.Highlight>
                          </Preview.Panel>
                      
                      </Preview>
                
                <!-- <FormHelp class="text-right"> Required</FormHelp> -->
                <div class="flex justify-between">
                  <!-- <template v-if="validate.audit_date.$error">
                  <div v-for="(error, index) in validate.audit_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required</p> -->
                </div>
              </div>
                    </div>
                </div>
               
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_work_agency_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_work_agency_1.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_receiver_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_receiver_1.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_location_In_Charge_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_location_In_Charge_1.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_work_after_6pm_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_work_after_6pm_1.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
            </div>
            <div class="flex flex-wrap  py-4  items-center">
                <div class="w-full md:w-1/5 text-center">
                    <div class="p-2">
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                      <Preview class="intro-y box" v-slot="{ toggle }">
                        <Preview.Panel>
                            <div class="relative w-full mx-auto">
                              <div
                                class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                <Lucide icon="Calendar" class="w-4 h-4" />
                              </div>
                              <Litepicker
                                v-model="ptwdate2"
                                :options="{
                                  autoApply: false,
                                  showWeekNumbers: true,
                                  dropdowns: {
                                    minYear: 1990,
                                    maxYear: null,
                                    months: true,
                                    years: true,
                                  },
                                }"
                                class="pl-12"/>
                            </div>
                          </Preview.Panel>
                          <Preview.Panel type="source">
                            <Preview.Highlight>
                              {{`
                              <div class="relative w-56 mx-auto">
                                <div
                                  class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"
                                >
                                  <Lucide icon="Calendar" class="w-4 h-4" />
                                </div>
                                <Litepicker
                                  v-model="ptwdate2"
                                  :options="{
                                    autoApply: false,
                                    showWeekNumbers: true,
                                    dropdowns: {
                                      minYear: 1990,
                                      maxYear: null,
                                      months: true,
                                      years: true,
                                    },
                                  }"
                                  class="pl-12"
                                />
                              </div>
                              `}}
                            </Preview.Highlight>
                          </Preview.Panel>
                      
                      </Preview>
                
                <!-- <FormHelp class="text-right"> Required</FormHelp> -->
                <div class="flex justify-between">
                  <!-- <template v-if="validate.audit_date.$error">
                  <div v-for="(error, index) in validate.audit_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required</p> -->
                </div>
              </div>
                    </div>
                   
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_work_agency_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_work_agency_2.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_receiver_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_receiver_2.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_location_In_Charge_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_location_In_Charge_2.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_work_after_6pm_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_work_after_6pm_2.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
            </div>
            <div class="flex flex-wrap  py-4  items-center">
                <div class="w-full md:w-1/5 text-center">
                    <div class="p-2">
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                      <Preview class="intro-y box" v-slot="{ toggle }">
                        <Preview.Panel>
                            <div class="relative w-full mx-auto">
                              <div
                                class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                <Lucide icon="Calendar" class="w-4 h-4" />
                              </div>
                              <Litepicker
                                v-model="ptwdate3"
                                :options="{
                                  autoApply: false,
                                  showWeekNumbers: true,
                                  dropdowns: {
                                    minYear: 1990,
                                    maxYear: null,
                                    months: true,
                                    years: true,
                                  },
                                }"
                                class="pl-12"/>
                            </div>
                          </Preview.Panel>
                          <Preview.Panel type="source">
                            <Preview.Highlight>
                              {{`
                              <div class="relative w-56 mx-auto">
                                <div
                                  class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"
                                >
                                  <Lucide icon="Calendar" class="w-4 h-4" />
                                </div>
                                <Litepicker
                                  v-model="ptwdate3"
                                  :options="{
                                    autoApply: false,
                                    showWeekNumbers: true,
                                    dropdowns: {
                                      minYear: 1990,
                                      maxYear: null,
                                      months: true,
                                      years: true,
                                    },
                                  }"
                                  class="pl-12"
                                />
                              </div>
                              `}}
                            </Preview.Highlight>
                          </Preview.Panel>
                      
                      </Preview>
                
                <!-- <FormHelp class="text-right"> Required</FormHelp> -->
                <div class="flex justify-between">
                  <!-- <template v-if="validate.audit_date.$error">
                  <div v-for="(error, index) in validate.audit_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required</p> -->
                </div>
              </div>
               
                    </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_work_agency_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_work_agency_3.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_receiver_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_receiver_3.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_location_In_Charge_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_location_In_Charge_3.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_work_after_6pm_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_work_after_6pm_3.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
            </div>
            <div class="flex flex-wrap  py-4  items-center">
                <div class="w-full md:w-1/5 text-center">
                    <div class="p-2">
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                      <Preview class="intro-y box" v-slot="{ toggle }">
                        <Preview.Panel>
                            <div class="relative w-full mx-auto">
                              <div
                                class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                <Lucide icon="Calendar" class="w-4 h-4" />
                              </div>
                              <Litepicker
                                v-model="ptwdate4"
                                :options="{
                                  autoApply: false,
                                  showWeekNumbers: true,
                                  dropdowns: {
                                    minYear: 1990,
                                    maxYear: null,
                                    months: true,
                                    years: true,
                                  },
                                }"
                                class="pl-12"/>
                            </div>
                          </Preview.Panel>
                          <Preview.Panel type="source">
                            <Preview.Highlight>
                              {{`
                              <div class="relative w-56 mx-auto">
                                <div
                                  class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"
                                >
                                  <Lucide icon="Calendar" class="w-4 h-4" />
                                </div>
                                <Litepicker
                                  v-model="ptwdate4"
                                  :options="{
                                    autoApply: false,
                                    showWeekNumbers: true,
                                    dropdowns: {
                                      minYear: 1990,
                                      maxYear: null,
                                      months: true,
                                      years: true,
                                    },
                                  }"
                                  class="pl-12"
                                />
                              </div>
                              `}}
                            </Preview.Highlight>
                          </Preview.Panel>
                      
                      </Preview>
                
                <!-- <FormHelp class="text-right"> Required</FormHelp> -->
                <div class="flex justify-between">
                  <!-- <template v-if="validate.audit_date.$error">
                  <div v-for="(error, index) in validate.audit_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required</p> -->
                </div>
              </div>
               
                    </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_work_agency_4.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_work_agency_4.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_receiver_4.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_receiver_4.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_location_In_Charge_4.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_location_In_Charge_4.$error,}" placeholder="Input dept name"/>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/5 text-center">
                  <div class="p-2">
                    <div class="flex items-center">
                      <FormInput id="crud-form-1" v-model.trim="validate.ptw_work_after_6pm_4.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.ptw_work_after_6pm_4.$error,}" placeholder="Input dept name"/>
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
    <div class="hidden col-span-2 intro-y 2xl:block">
      <div class="sticky top-0 pt-10">
        <ul
          class="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]"
        >
          <li
            class="pl-5 mb-4 font-medium border-l-2 border-primary dark:border-primary text-primary"
          >
            <a href="">Insert Permit to Work Form</a>
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
              When filling out the Permit to Work Form report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium"> Permit to Work Form Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium"> Permit to Work Form Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>