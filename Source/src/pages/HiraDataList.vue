<script setup lang="ts">
import { ref, reactive, onMounted, toRefs } from 'vue';
import Button from '@/components/Base/Button';
import Pagination from '@/components/Base/Pagination';
import Lucide from '@/components/Base/Lucide';
import Tippy from '@/components/Base/Tippy';
import { Dialog, Menu,Popover } from '@/components/Base/Headless';
import Table from '@/components/Base/Table';
import config from "@/config";
import _, { sortBy } from "lodash";
import LoadingIcon from "@/components/Base/LoadingIcon";

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
import axios, { AxiosError } from 'axios';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import TomSelect from "@/components/Base/TomSelect";
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import Toastify from 'toastify-js';
import Notification from "@/components/Base/Notification";
import Preview from "@/components/Base/Preview";
import Litepicker from "@/components/Base/Litepicker";
import Alert from "@/components/Base/Alert";
import { stat } from 'fs';


const router = useRouter();
const subcategory = ref(["0"]);
const editorData = ref("");
const date = ref("");
const deadlinedate = ref("");
const time_date = ref("");
const selectedIncidentCategory = ref("");
const editorConfig = {
  toolbar: {
    items: ["bold", "italic", "link"],
  },
};

// Define your state using the reactive function
const state = reactive({
  viewData: [] as Array<any>,
  ProcessData: [] as Array<any>,
  ActivityData: [] as Array<any>,
  AdministrativeData: [] as Array<any>,
  CauseData: [] as Array<any>,
  TypeOfActivityData: [] as Array<any>,
  EventData: [] as Array<any>,
  EngineeringData: [] as Array<any>,
  ImpactData: [] as Array<any>,
  OccupationsData: [] as Array<any>,
  PPEData: [] as Array<any>,
  LocationData: [] as Array<any>,
});


// Fetch data from the API and update the state
const fetchData = async () => {
  let payload = ""
  if (selectedSort.value != "" && filterValue.value != ""){
    payload = selectedSort.value+'&'+filterValue.value
  }
  if (selectedSort.value != ""){
    payload = selectedSort.value
  }
  if(filterValue.value != ""){
    payload = filterValue.value
  }
  try {
   let  url = config.baseURL+'/api/v1/hira?'+payload;
    const response = await axios.get(url);
    state.viewData = response.data.data;
    console.log("viewData",state.viewData)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/hira/"+sID;
    const response = await axios.delete(url);
    state.viewData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const selectedSort = ref("");
const filterValue = ref("");

function filterProcess(){
  if(filterValue.value != ""){
    filterValue.value = "process="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterSerial(){
  if(filterValue.value != ""){
    filterValue.value = "id="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterActivity(){
  if(filterValue.value != ""){
    filterValue.value = "activity="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterLocation(){
  if(filterValue.value != ""){
    filterValue.value = "location="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterType_of_activity(){
  if(filterValue.value != ""){
    filterValue.value = "type_of_activity="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterOccupations(){
  if(filterValue.value != ""){
    filterValue.value = "occupations="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterEvent(){
  if(filterValue.value != ""){
    filterValue.value = "event="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterCause(){
  if(filterValue.value != ""){
    filterValue.value = "cause="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterImpact(){
  if(filterValue.value != ""){
    filterValue.value = "impact="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterHazard_type(){
  if(filterValue.value != ""){
    filterValue.value = "hazard_type="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterLikelihood(){
  if(filterValue.value != ""){
    filterValue.value = "likelihood="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterImpact_rating_factors_regulatory(){
  if(filterValue.value != ""){
    filterValue.value = "impact_rating_factors_regulatory="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterImpact_rating_factors_safety(){
  if(filterValue.value != ""){
    filterValue.value = "impact_rating_factors_safety="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterImpact_score(){
  if(filterValue.value != ""){
    filterValue.value = "impact_score="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterOverall_risk_score(){
  if(filterValue.value != ""){
    filterValue.value = "overall_risk_score="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterOperational_control_elimination(){
  if(filterValue.value != ""){
    filterValue.value = "operational_control_elimination="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterOperational_control_substitution(){
  if(filterValue.value != ""){
    filterValue.value = "operational_control_substitution="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterOperational_control_engineering(){
  if(filterValue.value != ""){
    filterValue.value = "operational_control_engineering="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterOperational_control_administrative(){
  if(filterValue.value != ""){
    filterValue.value = "operational_control_administrative="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterPpe(){
  if(filterValue.value != ""){
    filterValue.value = "ppe="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterRisk_evaluation_control_type(){
  if(filterValue.value != ""){
    filterValue.value = "risk_evaluation_control_type="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterRisk_evaluation_effectiveness(){
  if(filterValue.value != ""){
    filterValue.value = "risk_evaluation_effectiveness="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterRisk_evaluation_likelihood(){
  if(filterValue.value != ""){
    filterValue.value = "risk_evaluation_likelihood="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterRisk_evaluation_impact_score(){
  if(filterValue.value != ""){
    filterValue.value = "risk_evaluation_impact_score="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterRisk_evaluation_overall_risk_score(){
  if(filterValue.value != ""){
    filterValue.value = "risk_evaluation_overall_risk_score="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterRisk_evaluation_level_of_significance(){
  if(filterValue.value != ""){
    filterValue.value = "risk_evaluation_level_of_significance="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterMitigation(){
  if(filterValue.value != ""){
    filterValue.value = "mitigation="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function filterType_of_mitigation(){
  if(filterValue.value != ""){
    filterValue.value = "type_of_mitigation="+filterValue.value
  }
  fetchData();
  filterValue.value = ""
}
function clearFilter(){
  selectedSort.value = ""
  filterValue.value = ""
  fetchData();
}
const filterData = reactive({
    sortByCoulmn: '',
    sortBy: ''
})

// form 

const formData = reactive({
      process: '',
      activity: '',
      location: '',
      type_of_activity: [] as string[],
      occupations: '',
      event: '',
      cause: '',
      impact: '',
      hazard_type: '',
      likelihood: '',
      impact_rating_factors_regulatory: '',
      impact_rating_factors_safety: '',
      impact_score: '',
      overall_risk_score: '',
      operational_control_elimination: [] as string[],
      operational_control_substitution: [] as string[],
      operational_control_engineering: [] as string[],
      operational_control_administrative: [] as string[],
      ppe: [] as string[],
      risk_evaluation_control_type: '',
      risk_evaluation_effectiveness: '',
      risk_evaluation_likelihood: '',
      risk_evaluation_impact_score: '',
      risk_evaluation_overall_risk_score: '',
      risk_evaluation_level_of_significance: '',
      mitigation: '',
      type_of_mitigation: '',
      status: '',
});

const selectedSubstitution = ref("");
const selectedElimination = ref("");
const selectedProcess = ref("");
const selectedActivity = ref("");
const selectedAdministrative = ref("");
const selectedCause = ref("");
const selectedTypeOfActivity = ref("");
const selectedEvent = ref("");
const selectedEngineering = ref("");
const selectedImpact = ref("");
const selectedOccupations = ref("");
const selectedPPE = ref("");
const selectedLocation = ref("");


interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const rules = {
        process: {required},
        activity: {required},
        location: {required},
        type_of_activity: {required},
        occupations: {required},
        event: {required},
        cause: {required},
        impact: {required},
        hazard_type: {required},
        likelihood: {required},
        impact_rating_factors_regulatory: {required},
        impact_rating_factors_safety: {required},
        impact_score: {required},
        overall_risk_score: {required},
        operational_control_elimination: {required},
        operational_control_substitution: {required},
        operational_control_engineering: {required},
        operational_control_administrative: {required},
        ppe: {required},
        risk_evaluation_control_type: {required},
        risk_evaluation_effectiveness: {required},
        risk_evaluation_likelihood: {required},
        risk_evaluation_impact_score: {required},
        risk_evaluation_overall_risk_score: {required},
        risk_evaluation_level_of_significance: {required},
        mitigation: {required},
        type_of_mitigation: {required},
        status: {required},
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
        formData.operational_control_administrative.push(selectedAdministrative.value);
        formData.type_of_activity.push(selectedTypeOfActivity.value);
        formData.operational_control_engineering.push(selectedEngineering.value);
        formData.ppe.push(selectedPPE.value);
        formData.operational_control_substitution.push(selectedSubstitution.value);
        formData.operational_control_elimination.push(selectedElimination.value);
         formData.process = selectedProcess.value
         formData.activity = selectedActivity.value
         formData.cause = selectedCause.value
         formData.event = selectedEvent.value
         formData.impact = selectedImpact.value
         formData.occupations = selectedOccupations.value
         formData.location = selectedLocation.value


    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {
               
            try {
                let  url = config.baseURL+'/api/v1/hira';
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                console.log('Form submitted successfully:', response.data);
                if (response.data !== undefined) {
                      formData.process = ''
                      formData.activity = ''
                      formData.location = ''
                      formData.type_of_activity = []
                      formData.occupations = ''
                      formData.event = ''
                      formData.cause = ''
                      formData.impact = ''
                      formData.hazard_type = ''
                      formData.likelihood = ''
                      formData.impact_rating_factors_regulatory = ''
                      formData.impact_rating_factors_safety = ''
                      formData.impact_score = ''
                      formData.overall_risk_score = ''
                      formData.operational_control_elimination = []
                      formData.operational_control_substitution = []
                      formData.operational_control_engineering = []
                      formData.operational_control_administrative = []
                      formData.ppe = []
                      formData.risk_evaluation_control_type = ''
                      formData.risk_evaluation_effectiveness = ''
                      formData.risk_evaluation_likelihood = ''
                      formData.risk_evaluation_impact_score = ''
                      formData.risk_evaluation_overall_risk_score = ''
                      formData.risk_evaluation_level_of_significance = ''
                      formData.mitigation = ''
                      formData.type_of_mitigation = ''
                      fetchData();
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
        
            SuccessPopUp();
    }
};

const fetchProcess = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-process';
    const response = await axios.get(url);
    state.ProcessData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchLocation = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-location';
    const response = await axios.get(url);
    state.LocationData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchActivity = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-activity';
    const response = await axios.get(url);
    state.ActivityData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchAdministrative = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-administrative';
    const response = await axios.get(url);
    state.AdministrativeData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchCause = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-cause';
    const response = await axios.get(url);
    state.CauseData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchTypeOfActivity = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-type-of-Activity';
    const response = await axios.get(url);
    state.TypeOfActivityData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchEvent = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-event';
    const response = await axios.get(url);
    state.EventData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchEngineering = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-engineering';
    const response = await axios.get(url);
    state.EngineeringData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchImpact = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-impact';
    const response = await axios.get(url);
    state.ImpactData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchOccupations = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-occupations';
    const response = await axios.get(url);
    state.OccupationsData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchPPE = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-ppe';
    const response = await axios.get(url);
    state.PPEData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
// Ext Function 
function riskScore(){
   let lh = parseInt(formData.risk_evaluation_likelihood, 10);
   let rs = parseInt(formData.risk_evaluation_impact_score, 10);
   let res = lh*rs;
   formData.risk_evaluation_overall_risk_score = res.toString();
   if(res <= 5){
    formData.risk_evaluation_level_of_significance = "Low"
   }else if(res > 5 && res <= 12){
    formData.risk_evaluation_level_of_significance = "Medium"
   }else if (res > 12){
    formData.risk_evaluation_level_of_significance = "High"
   }else{
    formData.risk_evaluation_level_of_significance = ""
   }
}

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

// Call fetchData when the component is mounted
onMounted(() => {
  fetchData();
  fetchProcess();
  fetchActivity();
  fetchAdministrative();
  fetchCause();
  fetchTypeOfActivity();
  fetchEvent();
  fetchEngineering();
  fetchImpact();
  fetchOccupations();
  fetchPPE();
  fetchLocation();
});

</script>

<template>
  <h2 class="mt-10 text-2xl font-medium intro-y text-center uppercase">Hazard Identification and Risk Assessment Register</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    
    <!-- BEGIN: Data List -->
    <div class="col-span-12 overflow-auto intro-y ">
      <Table class="border-spacing-y-[10px] border-separate -mt-2">
        <Table.Thead>
          <Table.Tr>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">
              <div class="flex items-center justify-center">
                <div class="px-1"> serial number</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=id&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=id&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterSerial"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
            </Table.Th>
            <Table.Th class=" min-h-40   text-center border whitespace-nowrap uppercase">
              <div class="flex items-center justify-center">
                <div class="px-1"> Process</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=process&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=process&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterProcess"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
            </Table.Th>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">
              <div class="flex items-center justify-center">
                <div class="px-1"> Activity/Sub Activity</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=activity&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=activity&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterActivity"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
            </Table.Th>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">
              <div class="flex items-center justify-center">
                <div class="px-1"> Location</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=location&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=location&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterLocation"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
            </Table.Th>
            <Table.Th class=" min-h-40 text-center border uppercase"> 
              <div class="flex items-center justify-center">
                <div class="px-1"> <span class="whitespace-nowrap">Type of Activity</span> <br> <span class="whitespace-nowrap">(Normal-N Abnormal-A Emergency-E)</span></div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=type_of_activity&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=type_of_activity&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterType_of_activity"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
            </Table.Th>
            <Table.Th class=" min-h-40 text-center border uppercase"> 
              <div class="flex items-center justify-center">
                <div class="px-1"> <span class="whitespace-nowrap">Occupations/Who is at Risk</span> <br> <span class="whitespace-nowrap">(Specific Role or Person)</span></div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=occupations&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=occupations&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterOccupations"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
            </Table.Th>
            <div class=" min-h-40 font-medium  dark:border-darkmode-300 text-center uppercase border-t border-b">
              <div class="font-medium px-5 py-3 dark:border-darkmode-300 text-center  uppercase min-h-16 flex items-center justify-center">Hazard (Cause-Event-Impact)</div>
              <div class="flex  min-h-20 border-t">
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class=" w-56 text-center border-none uppercase">
                  <div class="flex items-center justify-center">
                <div class="px-1"> Event</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=event&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=event&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterEvent"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class=" w-56 text-center border-none uppercase">
                  <div class="flex items-center justify-center">
                <div class="px-1"> Cause</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=cause&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=cause&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterCause"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
                <div class="whitespace-nowrap flex items-center justify-center"><Table.Th class=" w-56 text-center border-none uppercase">
                  <div class="flex items-center justify-center">
                <div class="px-1"> Impact</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=impact&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=impact&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterImpact"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
                
              </div>
            </div>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">
              <div class="flex items-center justify-center">
                <div class="px-1"> Hazard Type</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=hazard_type&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=hazard_type&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterHazard_type"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
            </Table.Th>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">
              <div class="flex items-center justify-center">
                <div class="px-1"> Likelihood</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=likelihood&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=likelihood&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterLikelihood"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
            </Table.Th>
            
            <div class=" min-h-40 font-medium  dark:border-darkmode-300 text-center uppercase border-t border-b">
              <div class="font-medium px-5 py-3 dark:border-darkmode-300 text-center  uppercase min-h-16 flex items-center justify-center">Impact Rating Factors</div>
              <div class="flex  min-h-20 border-t">
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-56 text-center border-none uppercase"> 
                  <div class="flex items-center justify-center">
                <div class="px-1"> <span class="whitespace-nowrap">Regulatory</span> <br> <span class="whitespace-nowrap">Compliance</span></div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=impact_rating_factors_regulatory&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=impact_rating_factors_regulatory&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterImpact_rating_factors_regulatory"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
                <div class="whitespace-nowrap"><Table.Th class="w-56 text-center border-none  uppercase">
                  <div class="flex items-center justify-center">
                <div class="px-1"> <span class="whitespace-nowrap">Safety /Occupational</span> <br> <span class="whitespace-nowrap">health</span></div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=impact_rating_factors_safety&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=impact_rating_factors_safety&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterImpact_rating_factors_safety"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
              </div>
            </div>
           
            <Table.Th class=" min-h-40 w-56 text-center border uppercase">
              <div class="flex items-center justify-center">
                <div class="px-1"> <span class="whitespace-nowrap">Impact Score</span> <br> <span class="whitespace-nowrap">(Worst Rating)</span></div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=impact_score&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=impact_score&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterImpact_score"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
             </Table.Th>
            <Table.Th class=" min-h-40 w-56 text-center border uppercase">
              <div class="flex items-center justify-center">
                <div class="px-1"> <span class="whitespace-nowrap">Overall Risk Score</span> <br> <span class="whitespace-nowrap">(Inherent)</span></div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=overall_risk_score&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=overall_risk_score&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterOverall_risk_score"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
            </Table.Th>
            <div class=" min-h-40 font-medium  dark:border-darkmode-300 text-center uppercase border-t border-b">
              <div class="font-medium px-5 py-3 dark:border-darkmode-300 text-center  uppercase min-h-16 flex items-center justify-center">Operational Control/Additional control proposed</div>
              <div class="flex  min-h-20 border-t">
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-56 text-center border-none uppercase">
                  <div class="flex items-center justify-center">
                <div class="px-1"> Elimination</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=operational_control_elimination&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=operational_control_elimination&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterOperational_control_elimination"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-56 text-center border-none uppercase">
                  <div class="flex items-center justify-center">
                <div class="px-1"> Substitution</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=operational_control_substitution&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=operational_control_substitution&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterOperational_control_substitution"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-56 text-center border-none uppercase">
                  <div class="flex items-center justify-center">
                <div class="px-1"> Engineering</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=operational_control_engineering&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=operational_control_engineering&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterOperational_control_engineering"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-56 text-center border-none uppercase">
                  <div class="flex items-center justify-center">
                <div class="px-1"> Administrative</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=operational_control_administrative&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=operational_control_administrative&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterOperational_control_administrative"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
                <div class="whitespace-nowrap flex items-center justify-center"><Table.Th class="w-56 text-center border-none uppercase">
                  <div class="flex items-center justify-center">
                <div class="px-1"> PPE</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=ppe&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=ppe&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterPpe"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
              
              </div>
            </div>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">
              <div class="flex items-center justify-center">
                <div class="px-1"> Mitigation</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=mitigation&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=mitigation&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterMitigation"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
            </Table.Th>
             
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">
              <div class="flex items-center justify-center">
                <div class="px-1"> Type of Mitigation</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=type_of_mitigation&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=type_of_mitigation&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterType_of_mitigation"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
            </Table.Th>
            <div class=" min-h-40 font-medium  dark:border-darkmode-300 text-center uppercase border-t border-b">
              <div class="font-medium px-5 py-3 dark:border-darkmode-300 text-center  uppercase min-h-16 flex items-center justify-center">Risk Evaluation</div>
              <div class="flex  min-h-20 border-t">
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-56 text-center border-none uppercase">
                   <div class="flex items-center justify-center">
                <div class="px-1"> Control Type</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=risk_evaluation_control_type&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=risk_evaluation_control_type&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterRisk_evaluation_control_type"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>

                </Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-56 text-center border-none uppercase">
                   <div class="flex items-center justify-center">
                <div class="px-1"> Effectiveness</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=risk_evaluation_effectiveness&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=risk_evaluation_effectiveness&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterRisk_evaluation_effectiveness"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>

                </Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-56 text-center border-none uppercase">
                   <div class="flex items-center justify-center">
                <div class="px-1"> Likelihood</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=risk_evaluation_likelihood&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=risk_evaluation_likelihood&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterRisk_evaluation_likelihood"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>

                </Table.Th></div>
                <div class="border-r whitespace-nowrap"><Table.Th class="w-56 text-center border-none uppercase">
                   <div class="flex items-center justify-center">
                <div class="px-1"> <span class="whitespace-nowrap">Impact Score</span> <br> <span class="whitespace-nowrap">(Worst Rating)</span></div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=risk_evaluation_impact_score&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=risk_evaluation_impact_score&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterRisk_evaluation_impact_score"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
                <div class="whitespace-nowrap"><Table.Th class="w-56 text-center border-none  uppercase">
                   <div class="flex items-center justify-center">
                <div class="px-1"> <span class="whitespace-nowrap">Overall Risk</span> <br> <span class="whitespace-nowrap">Score (Residual)</span></div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=risk_evaluation_overall_risk_score&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=risk_evaluation_overall_risk_score&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterRisk_evaluation_overall_risk_score"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>
                </Table.Th></div>
              </div>
            </div>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">
               <div class="flex items-center justify-center">
                <div class="px-1"> Level of Significance</div>
                <div class="px-1">
                  <Preview.Panel>
                    <div class="text-center">
                      <Popover class="inline-block" v-slot="{ close }">
                        <Popover.Button :as="Button" variant="" class="border-none outline-none p-0 shadow-none  focus:ring-opacity-0">
                          <Lucide icon="ChevronDown" class="w-4 h-4 ml-2 mt-1" />
                        </Popover.Button>
                        <Popover.Panel placement="bottom-start">
                          <div class="p-2">
                            <div>
                              <FormCheck class="mt-2">
                                  <FormCheck.Input id="radio-switch-1" type="radio" v-model="selectedSort" name="vertical_radio_button" value="sortBy=risk_evaluation_level_of_significance&sortDirection=asc" />
                                  <FormCheck.Label htmlFor="radio-switch-1">
                                      Sort A to Z
                                  </FormCheck.Label>
                              </FormCheck>
                              <FormCheck class="mt-2" >
                                  <FormCheck.Input id="radio-switch-2" type="radio" v-model="selectedSort" name="vertical_radio_button"  value="sortBy=risk_evaluation_level_of_significance&sortDirection=desc" />
                                  <FormCheck.Label htmlFor="radio-switch-2">
                                    Sort Z to A
                                  </FormCheck.Label>
                              </FormCheck>
                          </div>
                            <div class="mt-3">
                              <div class="text-xs text-left">Filter by values</div>
                              <FormInput type="text" class="flex-1 mt-2" v-model="filterValue" placeholder="" />
                            </div>
                            <div class="flex items-center mt-3">
                              <Button variant="secondary" @click="() => {close(); }" class="w-32 ml-auto">
                                Close
                              </Button>
                              <Button variant="primary" class="w-32 ml-2" @click="filterRisk_evaluation_level_of_significance"> Filter </Button>
                            </div>
                          </div>
                          <div class="py-2">
                            <Button variant="danger" class="mb-2 mr-1 w-full uppercase font-semibold" @click="clearFilter">
                              Clear Filter
                              <LoadingIcon icon="puff" color="white" class="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                  </Preview.Panel>
                </div>
              </div>

            </Table.Th>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">Status</Table.Th>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">ACTIONS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr v-for="(data, index) in state.viewData" :key="index" class="intro-x bg-white">
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center">
              {{ data.id }}
            </Table.Td>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center ">
              {{ data.process }}
            </Table.Td>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center ">
              {{ data.activity }}
            </Table.Td>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center">
              {{ data.location }}
            </Table.Td>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 w-full text-center">
              <span v-for="(da, index) in data.type_of_activity" class="bg-gray-200 inline-block px-3 py-1 rounded-sm">{{da}}</span>
            </Table.Td>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center ">
              {{ data.occupations }}
            </Table.Td>
            <div class="uppercase min-h-20 py-3">
              <div class="flex items-center  w-full h-full min-h-20">
                <Table.Td class="w-56 border-r border-b-0 min-h-20   flex items-center justify-center">
                  {{ data.event }}
                </Table.Td>
                <Table.Td class="w-56 border-r border-b-0 min-h-20   flex items-center justify-center">
                  {{ data.cause }}
                </Table.Td>
                <Table.Td class="w-56 border-r border-b-0 min-h-20   flex items-center justify-center">
                  {{ data.impact }}
                </Table.Td>
              </div>
            </div>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center">
              {{ data.hazard_type }}
            </Table.Td>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center">
              {{ data.likelihood }}
            </Table.Td>
            <div class="uppercase min-h-20 py-3">
              <div class="flex items-center  w-full h-full min-h-20">
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center ">
                  {{ data.impact_rating_factors_regulatory }}
                </Table.Td>
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center ">
                  {{ data.impact_rating_factors_safety }}
                </Table.Td>
              </div>
            </div>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center">
              {{ data.impact_score }}
            </Table.Td>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center">
              {{ data.overall_risk_score }}
            </Table.Td>
            <div class="uppercase min-h-20 py-3">
              <div class="flex items-center  w-full h-full min-h-20">
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center">
                  <span v-for="(da, index) in data.operational_control_elimination" class="bg-gray-200 inline-block px-3 py-1 rounded-md">{{da}}</span>
                  
                </Table.Td>
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center">
                  <span v-for="(da, index) in data.operational_control_substitution" class="bg-gray-200 inline-block px-3 py-1 rounded-md">{{da}}</span>
                  
                </Table.Td>
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center">
                  <span v-for="(da, index) in data.operational_control_engineering" class="bg-gray-200 inline-block px-3 py-1 rounded-md">{{da}}</span>
                 
                </Table.Td>
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center">
                  <span v-for="(da, index) in data.operational_control_administrative" class="bg-gray-200 inline-block px-3 py-1 rounded-md">{{da}}</span>

                </Table.Td>
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center">
                  <span v-for="(da, index) in data.ppe" class="bg-gray-200 inline-block px-3 py-1 rounded-md">{{da}}</span>
                </Table.Td>
              </div>
            </div>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center">
              {{ data.mitigation }}
            </Table.Td>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center">
              {{ data.type_of_mitigation }}
            </Table.Td>
            <div class="uppercase min-h-20 py-3">
              <div class="flex items-center  w-full h-full min-h-2">
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center">
                  {{ data.risk_evaluation_control_type }}
                </Table.Td>
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center">
                  {{ data.risk_evaluation_effectiveness }}
                </Table.Td>
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center">
                  {{ data.risk_evaluation_likelihood }}
                </Table.Td>
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center">
                  {{ data.risk_evaluation_impact_score }}
                </Table.Td>
                <Table.Td class="w-56 border-r border-b-0 min-h-20  flex items-center justify-center">
                  {{ data.risk_evaluation_overall_risk_score }}
                </Table.Td>
              </div>
            </div>
            <Table.Td class="w-56 border-r border-b-0 min-h-20 text-center">
              {{ data.risk_evaluation_level_of_significance }}
            </Table.Td>
            <Table.Td class="w-56 border-r border-b-0  min-h-20 text-center">
              {{ data.status }}
            </Table.Td>
            <Table.Td
              :class="[
                'border-b-0 ',
                'before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400',
              ]"
            >
              <div class="flex items-center justify-center">
                <a
                  class="flex items-center text-danger"
                  href="javascript:;"
                  @click="deleteData(data.id)">
                  <Lucide icon="Trash2" class="w-4 h-4 mr-1" /> Delete
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
          <!-- form  -->
          <Table.Tr  class="intro-x">
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <Lucide icon="FilePlus" class="block mx-auto" />
            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <!-- <FormInput id="crud-form-16" v-model.trim="validate.process.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.process.$error,}"  placeholder="Input process" style="width: 200px !important;"/> -->
              <select style="width: 180px !important;" id="crud-form-6" v-model="selectedProcess"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Process</option>
                    <option v-for="(data, index) in state.ProcessData" :key="index" :value="data.name">{{ data.name }}</option>
              </select>
            </Table.Td>

            <Table.Td class="box text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <select style="width: 180px !important;" id="crud-form-6" v-model="selectedActivity"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Activity</option>
                    <option v-for="(data, index) in state.ActivityData" :key="index" :value="data.name">{{ data.name }}</option>
              </select>
            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <select style="width: 180px !important;" id="crud-form-6" v-model="selectedLocation"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Location</option>
                    <option v-for="(data, index) in state.LocationData" :key="index" :value="data.name">{{ data.name }}</option>
              </select>
            </Table.Td>
            
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <select style="width: 180px !important;" id="crud-form-6" v-model="selectedTypeOfActivity"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select type of activity</option>
                    <option v-for="(data, index) in state.TypeOfActivityData" :key="index" :value="data.name">{{ data.name }}</option>
              </select>
            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <select style="width: 180px !important;" id="crud-form-6" v-model="selectedOccupations"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Occupations</option>
                    <option v-for="(data, index) in state.OccupationsData" :key="index" :value="data.name">{{ data.name }}</option>
              </select>
            </Table.Td>
            <div class="uppercase bg-white">
              <div class="flex w-full ">
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                  <select style="width: 180px !important;" id="crud-form-6" v-model="selectedEvent"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Event</option>
                    <option v-for="(data, index) in state.EventData" :key="index" :value="data.name">{{ data.name }}</option>
              </select>
                </Table.Td>
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                  <select style="width: 180px !important;" id="crud-form-6" v-model="selectedCause"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Cause</option>
                    <option v-for="(data, index) in state.CauseData" :key="index" :value="data.name">{{ data.name }}</option>
              </select>
                </Table.Td>
         
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                  <select style="width: 180px !important;" id="crud-form-6" v-model="selectedImpact"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Impact</option>
                    <option v-for="(data, index) in state.ImpactData" :key="index" :value="data.name">{{ data.name }}</option>
              </select>
                </Table.Td>
              </div>
            </div>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <select style="width: 180px !important;" id="crud-form-6" v-model="formData.hazard_type"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Hazard Type</option>
                    <option value="Physical">Physical</option>
                    <option value="Bological">Bological</option>
                    <option value="Chemical">Chemical</option>
                    <option value="Ergonomic">Ergonomic</option>
                    <option value="Psychosocial">Psychosocial</option>
              </select>
            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <select style="width: 180px !important;" id="crud-form-6" v-model="formData.likelihood"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Likelihood</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
              </select>
            </Table.Td>
            <div class="uppercase">
              <div class="flex w-full ">
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                  <select style="width: 180px !important;" id="crud-form-6" v-model="formData.impact_rating_factors_regulatory"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Regulatory  Compliance</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
              </select>
                </Table.Td>
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                  <select style="width: 180px !important;" id="crud-form-6" v-model="formData.impact_rating_factors_safety"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Occupational health</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                </Table.Td>
              </div>
            </div>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <select style="width: 180px !important;" id="crud-form-6" v-model="formData.impact_score"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Impact Score</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
              </select>
            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <select style="width: 180px !important;" id="crud-form-6" v-model="formData.overall_risk_score"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Risk Score</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
              </select>
            </Table.Td>
            <div class="uppercase">
              <div class="flex w-full ">
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                  <select style="width: 180px !important;" id="crud-form-6" v-model="selectedElimination"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Elimination</option>
                    <option value="NA">NA</option>
              </select>
                </Table.Td>
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                  <select style="width: 180px !important;" id="crud-form-6" v-model="selectedSubstitution"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Substitution</option>
                    <option value="NA">NA</option>
              </select>
                </Table.Td>
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                 <select style="width: 180px !important;" id="crud-form-6" v-model="selectedEngineering"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Engineering</option>
                    <option v-for="(data, index) in state.EngineeringData" :key="index" :value="data.name">{{ data.name }}</option>
              </select>
                </Table.Td>
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                 <select style="width: 180px !important;" id="crud-form-6" v-model="selectedAdministrative"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Administrative</option>
                    <option v-for="(data, index) in state.AdministrativeData" :key="index" :value="data.name">{{ data.name }}</option>
              </select>
                </Table.Td>
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                 <select style="width: 180px !important;" id="crud-form-6" v-model="selectedPPE"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select PPE</option>
                    <option v-for="(data, index) in state.PPEData" :key="index" :value="data.name">{{ data.name }}</option>
              </select> 
                </Table.Td>
              </div>
            </div>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <select style="width: 180px !important;" id="crud-form-6" v-model="formData.mitigation"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Mitigation</option>
                    <option value="NA">NA</option>
              </select>
            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <select style="width: 180px !important;" id="crud-form-6" v-model="formData.type_of_mitigation"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Type of Mitigation</option>
                    <option value="Control">Control</option>
                    <option value="Avoid">Avoid</option>
                    <option value="Accept">Accept</option>
                    <option value="Share">Share</option>
              </select>
            </Table.Td>




            <div class="uppercase">
              <div class="flex w-full ">
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                  <select style="width: 180px !important;" id="crud-form-6" v-model="formData.risk_evaluation_control_type"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Control Type</option>
                    <option value="NC">NC</option>
                    <option value="LC">LC</option>
                    <option value="FC">FC</option>
              </select>
                </Table.Td>
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                  <select style="width: 180px !important;" id="crud-form-6" v-model="formData.risk_evaluation_effectiveness"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Effectiveness</option>
                    <option value="Good">Good</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Bad">Bad</option>
              </select>
                </Table.Td>
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                  <select style="width: 180px !important;" id="crud-form-6" v-model="formData.risk_evaluation_likelihood"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Likelihood</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
              </select>
                </Table.Td>
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                  <select style="width: 180px !important;" id="crud-form-6" v-model="formData.risk_evaluation_impact_score" :onChange="riskScore()"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Impact Score </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
              </select> 
                </Table.Td>
                <Table.Td class="box w-full text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
                   <FormInput id="crud-form-16" v-model.trim="formData.risk_evaluation_overall_risk_score" class="w-full" type="text" name="name":class="{ 'border-danger': validate.process.$error,}"  placeholder="Input process" style="width: 180px !important;"/>

                </Table.Td>
              </div>
            </div>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <FormInput id="crud-form-16" v-model.trim="formData.risk_evaluation_level_of_significance" class="w-full" type="text" name="name":class="{ 'border-danger': validate.process.$error,}"  placeholder="Input process" style="width: 180px !important;"/>

            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 min-h-20 ">
              <select style="width: 180px !important;" id="crud-form-6" v-model="formData.status"  class="border py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Select Status </option>
                    <option value="Proposed">Proposed</option>
                    <option value="Existing">Existing</option>
              </select> 
            </Table.Td>
            <Table.Td
              :class="[
                'box w-56 rounded-l-none rounded-r-none border-x-0 min-h-20 ',
                'before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400',
              ]"
            >
            <Button variant="primary" class="w-32 mb-2 mr-2" @click="submitForm">
                <Lucide icon="Activity" class="w-4 h-4 mr-2" /> Add Item
            </Button>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>

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
          <div class="font-medium">Hira Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
