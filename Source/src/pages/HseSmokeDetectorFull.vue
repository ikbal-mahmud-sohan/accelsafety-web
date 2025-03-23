<script setup lang="ts">
import { ref, reactive, onMounted, toRefs, computed, onUnmounted } from 'vue';
import axios from 'axios';
import _ from 'lodash';
import Button from '@/components/Base/Button';
import Pagination from '@/components/Base/Pagination';
import { FormInput, FormSelect } from '@/components/Base/Form';
import Lucide from '@/components/Base/Lucide';
import Tippy from '@/components/Base/Tippy';
import { useRouter, useRoute } from 'vue-router';
import { Dialog, Menu } from '@/components/Base/Headless';
import Table from '@/components/Base/Table';
import config from "@/config";
import Toastify from 'toastify-js';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import Preview from "@/components/Base/Preview";
import Litepicker from "@/components/Base/Litepicker";
import Notification from "@/components/Base/Notification";
import { getToken } from './../auth/setToken'
import { Activity } from 'lucide-vue-next';


// Define your state using the reactive function
const state = reactive({
  viewData: [] as Array<any>,
  drpdwndata: [] as Array<any>,
  departmentData: [] as Array<any>,
  token: getToken(),
  ActivityData: [] as Array<any>,
  drpactivities: [] as Array<any>,
  drphazards: [] as Array<any>,
  drpexisting_control_measures: [] as Array<any>,
  drppersons_responsible: [] as Array<any>,
  drpadditionals_control_measures: [] as Array<any>,

});
// const selectedActivity = ref("");
const selectedPlacement = ref("");
const selectedPowerSource = ref("");
const selectedBatteryCheck = ref("");
const selectedTestButton = ref("");
const selectedCleanliness = ref("");
const selectedSensitivity = ref("");
const selectedInterconnectionWithRepeater = ref("");

// const selectedRiskRatingLikelihood = ref("");
// const selectedRiskRatingSeverity = ref("");
// const selectedRiskRatingOverall = ref("");
// const selectedRevisedRiskRatingLikelihood = ref("");
// const selectedRevisedRiskRatingSeverity = ref("");
// const selectedRevisedRiskRatingOverall = ref("");
const router = useRouter();
const route = useRoute();
// const dateconducted = ref("");
// const nextreviewdate = ref("");



const formData = reactive({
      // site_location:'',
      // activity_or_task:'',
      // risk_assessment_conducted_by:'',
      // date_conducted:'',
      // process_owner_or_department:'',
      // next_review_date:'',
      smoke_detector_id: '',
      placement: '',
      power_source: '',
      battery_check: '',
      test_button: '',
      cleanliness: '',
      sensitivity: '',
      interconnection_with_repeater: '',
      last_calibration_date: '',
      remarks: '',

      // hira_lites_assessment_id: '',
      // activity:'',
      // hazard:'',
      // existing_control_measures:'',
      // risk_rating_likelihood:'',
      // risk_rating_severity:'',
      // risk_rating_overall:'',
      // additional_control_measures:'',
      // revised_risk_rating_likelihood:'',
      // revised_risk_rating_severity:'',
      // revised_risk_rating_overall:'',
      // person_responsible:'',
      // completion_date:''
});

const rules = {
        // site_location:{required,},
        // activity_or_task:{required,},
        // risk_assessment_conducted_by:{required,},
        // date_conducted:{required,},
        // process_owner_or_department:{required,},
        // next_review_date:{required,},
        smoke_detector_id:{required,},
        placement:{required,},
        power_source:{required,},
        battery_check:{required,},
        test_button:{required,},
        cleanliness:{required,},
        sensitivity:{required,},
        interconnection_with_repeater:{required,},
        last_calibration_date:{required,},
        remarks:{required,},

        // hira_lites_assessment_id:{required,},
        // activity:{required,},
        // hazard:{required,},
        // existing_control_measures:{required,},
        // risk_rating_likelihood:{required,},
        // risk_rating_severity:{required,},
        // risk_rating_overall:{required,},
        // additional_control_measures:{required,},
        // revised_risk_rating_likelihood:{required,},
        // revised_risk_rating_severity:{required,},
        // revised_risk_rating_overall:{required,},
        // person_responsible:{required,},
        // completion_date:{required,},
};

const validate = useVuelidate(rules, toRefs(formData));


// Helper function to format the date
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};


const submitForm = async () => {
    // Format the last_calibration_date to d-m-Y
    const formattedDate = formatDate(formData.last_calibration_date);

    formData.last_calibration_date = formattedDate;

    let id = route.params.id;
    let sID =id.toString()
    formData.smoke_detector_id = sID;
    
    formData.placement = selectedPlacement.value;
    formData.power_source = selectedPowerSource.value;
    formData.battery_check = selectedBatteryCheck.value;
    formData.test_button = selectedTestButton.value;
    formData.cleanliness = selectedCleanliness.value;
    formData.sensitivity = selectedSensitivity.value;
    formData.interconnection_with_repeater = selectedInterconnectionWithRepeater.value;
    
    // formData.hira_lites_assessment_id = sID;
    // formData.activity = selectedActivity.value;
    // formData.risk_rating_likelihood = selectedRiskRatingLikelihood.value;
    // formData.risk_rating_severity = selectedRiskRatingSeverity.value;
    // formData.risk_rating_overall = selectedRiskRatingOverall.value;
    // formData.revised_risk_rating_likelihood = selectedRevisedRiskRatingLikelihood.value;
    // formData.revised_risk_rating_severity = selectedRevisedRiskRatingSeverity.value;
    // formData.revised_risk_rating_overall = selectedRevisedRiskRatingOverall.value;
    // formData.date_conducted = dateconducted.value;
    // formData.next_review_date = nextreviewdate.value;
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {
            try {
                let  url = config.baseURL+'/api/v1/smoke-detector-checklist';
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,
                },
                });

                selectedPlacement.value = response.data.placement;
                selectedPowerSource.value = response.data.power_source;
                selectedBatteryCheck.value = response.data.battery_check;
                selectedTestButton.value = response.data.test_button;
                selectedCleanliness.value = response.data.cleanliness;
                selectedSensitivity.value = response.data.sensitivity;
                selectedInterconnectionWithRepeater.value = response.data.interconnection_with_repeater;
                formData.last_calibration_date = response.data.last_calibration_date;
                formData.remarks = response.data.remarks;

                // formData.activity = response.data.activity;
                // formData.hazard = response.data.hazard;
                // formData.existing_control_measures = response.data.existing_control_measures;
                // selectedRiskRatingLikelihood.value = response.data.risk_rating_likelihood;
                // selectedRiskRatingSeverity.value = response.data.risk_rating_severity;
                // selectedRiskRatingOverall.value = response.data.risk_rating_overall;
                // formData.additional_control_measures = response.data.additional_control_measures;
                // selectedRevisedRiskRatingLikelihood.value = response.data.revised_risk_rating_likelihood;
                // selectedRevisedRiskRatingSeverity.value = response.data.revised_risk_rating_severity;
                // selectedRevisedRiskRatingOverall.value = response.data.revised_risk_rating_overall;
                // formData.person_responsible = response.data.person_responsible;
                // formData.completion_date = response.data.completion_date;
                // fetchData();
        
            } catch (error) {
                console.error('Error submitting form:', error);
            }
            
            await fetchData();

            SuccessPopUp();
    }
};

// Fetch data from the API and update the state
const fetchData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/smoke-detector-checklist';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.viewData = response.data.data;
    console.log("shamim.state.viewData",state.viewData)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
// const fetchDrpDwnData = async () => {
//   try {
//    let  url = config.baseURL+'/api/v1/hira-lites-drop-down';
//     const response = await axios.get(url,{
//                 headers: {
//                     'Authorization': state.token,
//                 },
//                 });
//     state.drpdwndata = response.data;
//     state.drpactivities = response.data.activities;
//     state.drphazards = response.data.hazards;
//     state.drpexisting_control_measures = response.data.existing_control_measures;
//     state.drppersons_responsible = response.data.persons_responsible;
//     state.drpadditionals_control_measures = response.data.additionals_control_measures;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

const deleteData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/smoke-detector-checklist/delete/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    // state.viewData = response.data;
    console.log('del msg: ', response.data);
    
    await fetchData();
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
// const fetchActivity = async () => {
//   try {
//    let  url = config.baseURL+'/api/v1/hira-activity';
//     const response = await axios.get(url,{
//                 headers: {
//                     'Authorization': state.token,
//                 },
//                 });
//     state.ActivityData = response.data.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

const formDataById = ref({
  tag_no: "",
  type: "",
  location: "",
});

// Fetching Smoke Detector Form Data with id
const fetchDataById = async () => {
  try {
    const id = route.params.id;
    const url = `${config.baseURL}/api/v1/smoke-detector/edit/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: state.token,
      },
    });

    // Update formData with the API response
    const data = response.data.data;
    // console.log("Data: ", data);

    formDataById.value = {
      tag_no: data.tag_no,
      type: data.type,
      location: data.location,
    };
    // console.log("dataPopulated: ", formDataById)
  } catch (error) {
    console.error('Error fetching data by ID:', error);
  }
};

// Call fetchData when the component is mounted
onMounted(() => {
  fetchDataById();
  fetchData();
  // fetchActivity();
  // fetchDrpDwnData();
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

// const bgColor = computed(() => {
//     switch (selectedRevisedRiskRatingOverall.value) {
//         case 'Critical':
//             return 'bg-red-500 text-white';
//         case 'High':
//             return 'bg-yellow-600 text-white';
//         case 'Moderate':
//             return 'bg-yellow-400 text-black';
//         case 'Low':
//             return 'bg-green-500 text-white';
//         default:
//             return 'bg-white text-gray-400';
//     }
// });
// const riskbgcolor = computed(() => {
//     switch (selectedRiskRatingOverall.value) {
//         case 'Critical':
//             return 'bg-red-500 text-white';
//         case 'High':
//             return 'bg-yellow-600 text-white';
//         case 'Moderate':
//             return 'bg-yellow-400 text-black';
//         case 'Low':
//             return 'bg-green-500 text-white';
//         default:
//             return 'bg-white text-gray-400';
//     }
// });

// const severityColor = computed(() => {
//     switch (selectedRiskRatingSeverity.value) {
//         case 'Severe':
//             return 'bg-red-500 text-white'; // Red for high severity
//         case 'Major':
//             return 'bg-yellow-600 text-white'; // Orange for major severity
//         case 'Moderate':
//             return 'bg-yellow-400 text-black'; // Yellow for moderate severity
//         case 'Minor':
//             return 'bg-yellow-200 text-black'; // Green for minor severity
//         case 'Minimal':
//             return 'bg-green-500 text-white'; // Blue for minimal severity
//         default:
//             return 'bg-white text-gray-400'; // Default color for unselected
//     }
// });
// const severityColor2 = computed(() => {
//     switch (selectedRevisedRiskRatingSeverity.value) {
//         case 'Severe':
//             return 'bg-red-500 text-white'; // Red for high severity
//         case 'Major':
//             return 'bg-yellow-600 text-white'; // Orange for major severity
//         case 'Moderate':
//             return 'bg-yellow-400 text-black'; // Yellow for moderate severity
//         case 'Minor':
//             return 'bg-yellow-200 text-black'; // Green for minor severity
//         case 'Minimal':
//             return 'bg-green-500 text-white'; // Blue for minimal severity
//         default:
//             return 'bg-white text-gray-400'; // Default color for unselected
//     }
// });

// const likelihoodColor = computed(() => {
//     switch (selectedRiskRatingLikelihood.value) {
//         case 'Almost Certain': return 'bg-red-500 text-white'; // High probability
//         case 'Likely': return 'bg-yellow-600 text-white'; // Likely to happen
//         case 'Possible': return 'bg-yellow-400 text-black'; // Possible occurrence
//         case 'Unlikely': return 'bg-yellow-200 text-black'; // Unlikely to happen
//         case 'Rare': return 'bg-green-500 text-white'; // Rare occurrence
//         default: return 'bg-white text-gray-400'; // Default color
//     }
// });
// const likelihoodColor2 = computed(() => {
//     switch (selectedRevisedRiskRatingLikelihood.value) {
//         case 'Almost Certain': return 'bg-red-500 text-white'; // High probability
//         case 'Likely': return 'bg-yellow-600 text-white'; // Likely to happen
//         case 'Possible': return 'bg-yellow-400 text-black'; // Possible occurrence
//         case 'Unlikely': return 'bg-yellow-200 text-black'; // Unlikely to happen
//         case 'Rare': return 'bg-green-500 text-white'; // Rare occurrence
//         default: return 'bg-white text-gray-400'; // Default color
//     }
// });
const isDropdownVisible = ref(false);
const ishazards = ref(false);
const isexisting_control_measures = ref(false);
const ispersons_responsible = ref(false);
const isadditionals_control_measures = ref(false);

const showDropdown = () => {
  isDropdownVisible.value = true;
};

const showishazards = () => {
  console.log("showishazards")
  ishazards.value = true;
};

const showisexisting_control_measures = () => {
  isexisting_control_measures.value = true;
};

const showispersons_responsible = () => {
  ispersons_responsible.value = true;
};

const showadditionals_control_measures = () => {
  isadditionals_control_measures.value = true;
};


const selectItem = (value: string) => {
  formData.activity = value;
  isDropdownVisible.value = false;
};

const selectishazards = (value: string) => {
  formData.hazard = value;
  ishazards.value = false;
};

const selectisexisting_control_measures = (value: string) => {
  formData.existing_control_measures = value;
  isexisting_control_measures.value = false;
};

const selectispersons_responsible = (value: string) => {
  formData.person_responsible = value;
  ispersons_responsible.value = false;
};

const selectadditionals_control_measures = (value: string) => {
  formData.additional_control_measures = value;
  isadditionals_control_measures.value = false;
};

const handleClickOutside = (event: Event) => {
  const dropdown = document.getElementById("activityid");
  const hazardid = document.getElementById("hazardid");
  const isexistingmeasuresid = document.getElementById("isexistingmeasuresid");
  const responsibleid = document.getElementById("responsibleid");
  const additionalid = document.getElementById("additionalid");
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownVisible.value = false;
  }
  if (hazardid && !hazardid.contains(event.target as Node)) {
    ishazards.value = false;
  }
  if (isexistingmeasuresid && !isexistingmeasuresid.contains(event.target as Node)) {
    isexisting_control_measures.value = false;
  }
  if (responsibleid && !responsibleid.contains(event.target as Node)) {
    ispersons_responsible.value = false;
  }
  if (additionalid && !additionalid.contains(event.target as Node)) {
    isadditionals_control_measures.value = false;
  }

};
onMounted(() => {
  // Log the id to ensure it's available
  console.log("Route ID:", route.params.id);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="grid grid-cols-12 gap-6 mt-5">
    
    <!-- BEGIN: Data List -->
    <div class="col-span-12 overflow-y-auto ">
        <div class="risk-form-head">
          <div class="py-4 bg-theme-1">
              <p class=" text-base font-semibold uppercase text-center text-white">Smoke Detector FORM</p>
          </div>
          <div class="flex flex-wrap pt-4">
              <div class="md:w-1/2 w-full">
                  <div class="px-4 py-2">
                    <FormInline class="flex flex-wrap items-center md:flex-nowrap  pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="xl:w-48 xl:!mr-10">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium text-sm text-nowrap">Tag No.</div>
                          </div>
                        </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                            <div class="flex flex-col items-center justify-center w-full space-y-4">
                              <div class="flex-1 w-full mt-3 xl:mt-0">
                                      <FormInput id="crud-form-9" v-model="formDataById.tag_no" class="w-full" type="text" name="name" placeholder="Input Tag No. Location" disabled/>   
                              </div>
                            </div>
                      </div>
                    </FormInline>
                  </div>
              </div>
              <div class="md:w-1/2 w-full">
                  <div class="px-4 py-2">
                    <FormInline class="flex flex-wrap items-center md:flex-nowrap  pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="xl:w-48 xl:!mr-10">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium text-sm text-nowrap">Type</div>
                          </div>
                        </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                            <div class="flex flex-col items-center justify-center w-full space-y-4">
                              <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput id="crud-form-9" v-model="formDataById.type" class="w-full" type="text" name="name" placeholder="Input Type" disabled/> 
                              </div>
                            </div>
                      </div>
                    </FormInline>
                  </div>
              </div>
              <div class="md:w-1/2 w-full">
                  <div class="px-4 py-2">
                    <FormInline class="flex flex-wrap items-center md:flex-nowrap  pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                      <FormLabel class="xl:w-48 xl:!mr-10">
                        <div class="text-left">
                          <div class="flex items-center">
                            <div class="font-medium text-sm text-nowrap">Location</div>
                          </div>
                        </div>
                      </FormLabel>
                      <div class="flex-1 w-full mt-3 xl:mt-0">
                            <div class="flex flex-col items-center justify-center w-full space-y-4">
                              <div class="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput id="crud-form-9" v-model="formDataById.location" class="w-full" type="text" name="name" placeholder="Input Location" disabled/>
                              </div>
                            </div>
                      </div>
                    </FormInline>
                  </div>
              </div>
          </div>
        </div>
        <div class=" overflow-x-auto">
          <div class="insert-list-head py-4 w-full">
            <div class="flex items-center text-xs uppercase font-semibold bg-theme-1 text-white border-x-2 border-t shadow-sm py-2 justify-center">
              Checking Point
            </div>
            <div class="flex items-center text-xs uppercase font-semibold bg-theme-1 text-white border shadow-sm">
               <div class="head flex items-center justify-center w-1/11 h-24 p-2 border">S/No.</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Placement</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Power Source</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Battery Check</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Test Button</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Cleaniness</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Sensivity</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Inter - connection with Repeater</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Last Callibration Date</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Remarks</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Action</div>
            </div>
        </div>
        <div class="insert-list-body w-full">
          <div  class="flex items-center text-xs my-4 shadow-sm bg-white rounded-sm">
               <div class="head flex items-center justify-center w-1/11 h-14 p-2 border border-gray-100">
                <Button variant="primary" class="mr-2 shadow-md uppercase rounded-none" @click="submitForm()">
                    Add
                </Button>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedPlacement"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedPowerSource"   class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedBatteryCheck" class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedTestButton"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedCleanliness"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedSensitivity"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedInterconnectionWithRepeater" class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div> 
               
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100">
                <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-1" v-model.trim="validate.last_calibration_date.$model" class="w-full text-xs" type="date" name="name" placeholder="Last Calibration Date" pattern="\d{2}-\d{2}-\d{4}" />
                    </div>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100">
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="crud-form-1" v-model.trim="validate.remarks.$model" class="w-full text-xs" type="text" name="name" placeholder="Remarks" />
                  </div>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100">
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    Action
                  </div>
               </div>
            </div>
          <div v-for="(data, index) in state.viewData" :key="index" class="flex items-center text-xs my-4 shadow-sm bg-white rounded-sm">
               <div class="head flex items-center justify-center w-1/11 h-16 p-2 border border-gray-100">{{data.id}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.placement}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.power_source}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.battery_check}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.test_button}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.cleanliness}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.sensitivity}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.interconnection_with_repeater}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.last_calibration_date}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.remarks}}</div>
               
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">
                <a
                  class="flex items-center text-danger"
                  href="javascript:;"
                  @click="deleteData(data.id)">
                  <Lucide icon="Trash2" class="w-4 h-4 mr-1" /> Delete
                </a>
               </div>
            </div>
          
        </div>
        </div>
      

    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->
    <div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
      <Pagination class="w-full sm:w-auto sm:mr-auto">
        <Pagination.Link>
          <Lucide icon="ChevronsLeft" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronLeft" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>...</Pagination.Link>
        <Pagination.Link>1</Pagination.Link>
        <Pagination.Link active>2</Pagination.Link>
        <Pagination.Link>3</Pagination.Link>
        <Pagination.Link>...</Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronRight" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronsRight" class="w-4 h-4" />
        </Pagination.Link>
      </Pagination>
      <FormSelect class="w-20 mt-3 !box sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </FormSelect>
    </div>
    <!-- END: Pagination -->
  </div>
     <!-- BEGIN: Success Notification Content -->
   <Notification id="success-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium text-nowrap">Risk Assessment Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium text-nowrap">Risk Assessment Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
