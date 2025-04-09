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

const SelectedSoundCondition = ref("");
const SelectedMakeOfPosition = ref("");
const SelectedAlarmSensor = ref("");
const SelectedBatteryBackupCondition = ref("");
const SelectedRecordOfAlarm = ref("");
const SelectedNamePlateAndOperatingInstruction = ref("");
const SelectedPhysicalDamage = ref("");


const router = useRouter();
const route = useRoute();



const formData = reactive({

      emergency_alarm_audible_id: '',
      sound_condition: '',
      make_of_position: '',
      alarm_sensor: '',
      battery_backup_condition: '',
      record_of_alarm: '',
      name_plate_and_operating_instruction: '',
      physical_damage: '',
      last_maintenance_date: '',
      remarks: '',

});

const rules = {

        emergency_alarm_audible_id:{required,},
        sound_condition:{required,},
        make_of_position:{required,},
        alarm_sensor:{required,},
        battery_backup_condition:{required,},
        record_of_alarm:{required,},
        name_plate_and_operating_instruction:{required,},
        physical_damage:{required,},
        last_maintenance_date:{required,},
        remarks:{required,},
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

    const formattedDate = formatDate(formData.last_maintenance_date);
    formData.last_maintenance_date = formattedDate;

    let id = route.params.id;
    let sID =id.toString()
    formData.emergency_alarm_audible_id = sID;

    formData.sound_condition = SelectedSoundCondition.value,
    formData.make_of_position = SelectedMakeOfPosition.value,
    formData.alarm_sensor = SelectedAlarmSensor.value,
    formData.battery_backup_condition = SelectedBatteryBackupCondition.value,
    formData.record_of_alarm = SelectedRecordOfAlarm.value,
    formData.name_plate_and_operating_instruction = SelectedNamePlateAndOperatingInstruction.value,
    formData.physical_damage = SelectedPhysicalDamage.value,


    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {
            try {
                let  url = config.baseURL+'/api/v1/emergency-alarm-audible-checklist';
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,
                },
                });

                SelectedSoundCondition.value = response.data.sound_condition;
                SelectedMakeOfPosition.value = response.data.make_of_position;
                SelectedAlarmSensor.value = response.data.alarm_sensor;
                SelectedBatteryBackupCondition.value = response.data.battery_backup_condition;
                SelectedRecordOfAlarm.value = response.data.record_of_alarm;
                SelectedNamePlateAndOperatingInstruction.value = response.data.name_plate_and_operating_instruction;
                SelectedPhysicalDamage.value = response.data.physical_damage;
                formData.last_maintenance_date = response.data.last_maintenance_date;
                formData.remarks = response.data.remarks;
        
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
   let  url = config.baseURL+'/api/v1/emergency-alarm-audible-checklist';
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
    let url = config.baseURL+"/api/v1/emergency-alarm-audible-checklist/delete/"+sID;
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

// Fetching Emergency Alarm Audible Form Data with id
const fetchDataById = async () => {
  try {
    const id = route.params.id;
    const url = `${config.baseURL}/api/v1/emergency-alarm-audible/edit/${id}`;
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
              <p class=" text-base font-semibold uppercase text-center text-white">Emergency Alarm Audible FORM</p>
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
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Sound Condition</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Mark of Position</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Alarm Sensor</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Battery Backup Condition</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Record of Alarm</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Name Plate & Operating Instruction</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Physical Damage</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">Last Maintenance Date</div>
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
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="SelectedSoundCondition"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="SelectedMakeOfPosition"   class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="SelectedAlarmSensor" class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="SelectedBatteryBackupCondition"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="SelectedRecordOfAlarm"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="SelectedNamePlateAndOperatingInstruction"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100 relative">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="SelectedPhysicalDamage" class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
               </div> 
               
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100">
                <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-1" v-model.trim="validate.last_maintenance_date.$model" class="w-full text-xs" type="date" name="name" placeholder="Last Calibration Date" pattern="\d{2}-\d{2}-\d{4}" />
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
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.sound_condition ? 'Yes' : 'No'}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.make_of_position ? 'Yes' : 'No'}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.alarm_sensor ? 'Yes' : 'No'}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.battery_backup_condition ? 'Yes' : 'No'}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.record_of_alarm ? 'Yes' : 'No'}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.name_plate_and_operating_instruction ? 'Yes' : 'No'}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.physical_damage ? 'Yes' : 'No'}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.last_maintenance_date}}</div>
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
          <div class="font-medium text-nowrap">Emergency Alarm Audible Checklist Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium text-nowrap">Emergency Alarm Audible Checklist Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
