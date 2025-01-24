<script setup lang="ts">
import { ref, reactive, onMounted, toRefs } from 'vue';
import axios from 'axios';
import _ from 'lodash';
import Button from '@/components/Base/Button';
import Pagination from '@/components/Base/Pagination';
import { FormInput, FormSelect } from '@/components/Base/Form';
import Lucide from '@/components/Base/Lucide';
import Tippy from '@/components/Base/Tippy';
import { useRouter } from 'vue-router';
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


// Define your state using the reactive function
const state = reactive({
  viewData: [] as Array<any>,
  departmentData: [] as Array<any>,
  token: getToken(),
  ActivityData: [] as Array<any>,

});
const selectedActivity = ref("");
const selectedRiskRatingLikelihood = ref("");
const selectedRiskRatingSeverity = ref("");
const selectedRiskRatingOverall = ref("");
const selectedRevisedRiskRatingLikelihood = ref("");
const selectedRevisedRiskRatingSeverity = ref("");
const selectedRevisedRiskRatingOverall = ref("");
const router = useRouter();
const dateconducted = ref("");
const nextreviewdate = ref("");



const formData = reactive({
      site_location:'',
      activity_or_task:'',
      risk_assessment_conducted_by:'',
      date_conducted:'',
      process_owner_or_department:'',
      next_review_date:'',
      activity:'',
      hazard:'',
      existing_control_measures:'',
      risk_rating_likelihood:'',
      risk_rating_severity:'',
      risk_rating_overall:'',
      additional_control_measures:'',
      revised_risk_rating_likelihood:'',
      revised_risk_rating_severity:'',
      revised_risk_rating_overall:'',
      person_responsible:'',
      completion_date:''
});

const rules = {
        site_location:{required,},
        activity_or_task:{required,},
        risk_assessment_conducted_by:{required,},
        date_conducted:{required,},
        process_owner_or_department:{required,},
        next_review_date:{required,},
        activity:{required,},
        hazard:{required,},
        existing_control_measures:{required,},
        risk_rating_likelihood:{required,},
        risk_rating_severity:{required,},
        risk_rating_overall:{required,},
        additional_control_measures:{required,},
        revised_risk_rating_likelihood:{required,},
        revised_risk_rating_severity:{required,},
        revised_risk_rating_overall:{required,},
        person_responsible:{required,},
        completion_date:{required,},
};

const validate = useVuelidate(rules, toRefs(formData));


const submitForm = async () => {
    formData.activity = selectedActivity.value;
    formData.risk_rating_likelihood = selectedRiskRatingLikelihood.value;
    formData.risk_rating_severity = selectedRiskRatingSeverity.value;
    formData.risk_rating_overall = selectedRiskRatingOverall.value;
    formData.revised_risk_rating_likelihood = selectedRevisedRiskRatingLikelihood.value;
    formData.revised_risk_rating_severity = selectedRevisedRiskRatingSeverity.value;
    formData.revised_risk_rating_overall = selectedRevisedRiskRatingOverall.value;
    formData.date_conducted = dateconducted.value;
    formData.next_review_date = nextreviewdate.value;
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {
            try {
                let  url = config.baseURL+'/api/v1/hira-lites';
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,
                },
                });
                fetchData();
        
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        
            SuccessPopUp();
    }
};

// Fetch data from the API and update the state
const fetchData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-lites';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.viewData = response.data;
    console.log("state.viewData",state.viewData)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const deleteData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/department/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.viewData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchActivity = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-activity';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.ActivityData = response.data.data;
    console.log("sss",response.data.data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call fetchData when the component is mounted
onMounted(() => {
  fetchData();
  fetchActivity();
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
</script>

<template>
  <div class="grid grid-cols-12 gap-6 mt-5">
    
    <!-- BEGIN: Data List -->
    <div class="col-span-12   overflow-y-auto ">
        <div class="risk-form-head">
            <div class="py-4 bg-theme-1">
                <p class=" text-base font-semibold uppercase text-center text-white">RISK ASSESSMENT FORM</p>
            </div>
            <div class="flex flex-wrap">
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border-l border-b flex items-center">
                  Station / Site Location: 
                  (Code and Address)
                </div>
                <div class="w-full md:w-2/5 px-4 py-2 border-gray-300 border-l border-b flex items-center">
                    <div class="flex-1 w-full mt-3 xl:mt-0">
                            <FormInput id="crud-form-9" v-model.trim="validate.site_location.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.site_location.$error,}" placeholder="Input Site Location"/>
                            <template v-if="validate.site_location.$error">
                              <div v-for="(error, index) in validate.site_location.$errors" :key="index" class="mt-2 text-danger">
                                {{ error.$message }}
                              </div>
                            </template>
                            <p class="text-right"> Required, at least 3 characters </p>
                    </div>
                </div>
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border-l">
                  
                </div>
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border-l border-r">
                  
                </div>
            </div>
            <div class="flex flex-wrap">
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border-l border-b flex items-center">
                  Activity or Task:
                </div>
                <div class="w-full md:w-2/5 px-4 py-2 border-gray-300 border-l border-b flex items-center">
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                            <FormInput id="crud-form-9" v-model.trim="validate.activity_or_task.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.activity_or_task.$error,}" placeholder="Input Activity or Task"/>
                            <template v-if="validate.activity_or_task.$error">
                              <div v-for="(error, index) in validate.activity_or_task.$errors" :key="index" class="mt-2 text-danger">
                                {{ error.$message }}
                              </div>
                            </template>
                            <p class="text-right"> Required, at least 3 characters </p>
                    </div>
                </div>
                
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border-l flex items-center">
                  Process Owner / Department:
                </div>
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border-l border-r flex items-center">
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                            <FormInput id="crud-form-9" v-model.trim="validate.process_owner_or_department.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.process_owner_or_department.$error,}" placeholder="Input process Owner r Department"/>
                            <template v-if="validate.process_owner_or_department.$error">
                              <div v-for="(error, index) in validate.process_owner_or_department.$errors" :key="index" class="mt-2 text-danger">
                                {{ error.$message }}
                              </div>
                            </template>
                            <p class="text-right"> Required, at least 3 characters </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap">
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border-l border-b flex items-center">
                  Risk Assessment Conducted by:
                  Name(s) / Designation / Signature
                </div>
                <div class="w-full md:w-2/5 px-4 py-2 border-gray-300 border-l border-b flex items-center">
                   <div class="flex-1 w-full mt-3 xl:mt-0">
                            <FormInput id="crud-form-9" v-model.trim="validate.risk_assessment_conducted_by.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.risk_assessment_conducted_by.$error,}" placeholder="Input process Owner r Department"/>
                            <template v-if="validate.risk_assessment_conducted_by.$error">
                              <div v-for="(error, index) in validate.risk_assessment_conducted_by.$errors" :key="index" class="mt-2 text-danger">
                                {{ error.$message }}
                              </div>
                            </template>
                            <p class="text-right"> Required, at least 3 characters </p>
                    </div>
                </div>
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border-l">
                  
                </div>
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border-l border-r">
                  
                </div>
            </div>
            <div class="flex flex-wrap">
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border-l border-b flex items-center">
                  Date Conducted:
                </div>
                <div class="w-full md:w-2/5 px-4 py-2 border-gray-300 border-l border-b flex items-center">
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                          <Preview class="intro-y box" v-slot="{ toggle }">
                            <Preview.Panel>
                                <div class="relative w-full mx-auto">
                                  <div
                                    class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                    <Lucide icon="Calendar" class="w-4 h-4" />
                                  </div>
                                  <Litepicker
                                    v-model="dateconducted"
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
                                      v-model="dateconducted"
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
                            <template v-if="validate.date_conducted.$error">
                            <div v-for="(error, index) in validate.date_conducted.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            <p class="text-right mt-2 w-full"> Required</p>
                          </div>
                        </div>
                </div>
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border-l border-b border-t flex items-center">
                  Next Review Date:
                </div>
                <div class="w-full md:w-1/5 px-4 py-2 border-gray-300 border flex items-center">
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                          <Preview class="intro-y box" v-slot="{ toggle }">
                            <Preview.Panel>
                                <div class="relative w-full mx-auto">
                                  <div
                                    class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                    <Lucide icon="Calendar" class="w-4 h-4" />
                                  </div>
                                  <Litepicker
                                    v-model="nextreviewdate"
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
                                      v-model="next_review_date"
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
                            <template v-if="validate.next_review_date.$error">
                            <div v-for="(error, index) in validate.next_review_date.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                              {{ error.$message }}
                            </div>
                          </template>
                            <p class="text-right mt-2 w-full"> Required</p>
                          </div>
                        </div>
                </div>
            </div>
        </div>
        <div class="insert-list-head py-4">
            <div class="flex items-center text-xs uppercase font-semibold bg-theme-1 text-white border shadow-sm">
               <div class="head flex items-center justify-center w-1/11 h-24 p-2 border">S/No.</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">ACTIVITY</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">HAZARD</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">EXISTING CONTROL MEASURES</div>
               <div class="head text-center w-2/11 h-24">
                <div class=" h-12 border px-2 py-1 flex items-center justify-center">
                  RISK RATING
                </div>
                <div class="flex w-full ">
                  <div class="h-12 w-1/3 border py-1 flex items-center justify-center">Likelihood</div>
                  <div class="h-12 w-1/3 border py-1 flex items-center justify-center">Severity</div>
                  <div class="h-12 w-1/3 border py-1 flex items-center justify-center">Overall</div>
                </div>

               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">ADDITIONAL CONTROL MEASURES</div>
               <div class="head text-center w-2/11 h-24">
                <div class=" h-12 border px-2 py-1 flex items-center justify-center">
                  REVISED RISK RATING
                </div>
                <div class="flex w-full ">
                  <div class="h-12 w-1/3 border py-1 flex items-center justify-center">Likelihood</div>
                  <div class="h-12 w-1/3 border py-1 flex items-center justify-center">Severity</div>
                  <div class="h-12 w-1/3 border py-1 flex items-center justify-center">Overall</div>
                </div>

               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t"> PERSON RESPONSIBLE</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-24 p-2 border-r border-b border-t">COMPLETION DATE</div>
            </div>
        </div>
        <div class="insert-list-body">
          <div  class="flex items-center text-xs my-4 shadow-sm bg-white rounded-sm">
               <div class="head flex items-center justify-center w-1/11 h-14 p-2 border border-gray-100">
                <Button variant="primary" class="mr-2 shadow-md uppercase rounded-none" @click="submitForm()">
                    Add
                </Button>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100">
                <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedActivity"   class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                    <option value="" disabled>Activity</option>
                    <option v-for="(data, index) in state.ActivityData" :key="index" :value="data.name">{{ data.name }}</option>
              </select>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100">
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput id="crud-form-1" v-model.trim="validate.hazard.$model" class="w-full py-3 text-xs" type="text" name="name":class="{ 'border-danger': validate.hazard.$error,}" placeholder="Hazard" />
                  </div>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100">
                <div class="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput id="crud-form-1" v-model.trim="validate.existing_control_measures.$model" class="w-full text-xs" type="text" name="name":class="{ 'border-danger': validate.existing_control_measures.$error,}" placeholder="Hazard" />
                  </div>
               </div>
               <div class="head text-center w-2/11 h-14">
                <div class="flex w-full ">
                  <div class="h-14 w-1/3 p-1 flex items-center justify-center border-r border-b border-t border-gray-100">
                    <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedRiskRatingLikelihood"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                          <option value="" disabled>select</option>
                          <option value="Almost Certain">Almost Certain</option>
                          <option value="Likely">Likely</option>
                          <option value="Possible">Possible</option>
                          <option value="Unlikely">Unlikely</option>
                          <option value="Rare">Rare</option>
                    </select>
                  </div>
                  <div class="h-14 w-1/3 p-1 flex items-center justify-center border-r border-b border-t border-gray-100">
                    <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedRiskRatingSeverity"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                          <option value="" disabled>select</option>
                          <option value="Severe">Severe</option>
                          <option value="Major">Major</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Minor">Minor</option>
                          <option value="Minimal">Minimal</option>
                    </select>
                  </div>
                  <div class="h-14 w-1/3 p-1 flex items-center justify-center border-r border-b border-t border-gray-100">
                    <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedRiskRatingOverall"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                          <option value="" disabled>select</option>
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Low">Low</option>  
                    </select>
                  </div>
                </div>

               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100">
                <div class="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput id="crud-form-1" v-model.trim="validate.additional_control_measures.$model" class="w-full text-xs" type="text" name="name":class="{ 'border-danger': validate.additional_control_measures.$error,}" placeholder="Hazard" />
                  </div>
               </div>
               <div class="head text-center w-2/11 h-14">
                <div class="flex w-full ">
                  <div class="h-14 w-1/3 p-1 flex items-center justify-center border-r border-b border-t border-gray-100">
                    <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedRevisedRiskRatingLikelihood"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                          <option value="" disabled>select</option>
                          <option value="Almost Certain">Almost Certain</option>  
                          <option value="Likely">Likely</option>  
                          <option value="Possible">Possible</option>  
                          <option value="Unlikely">Unlikely</option>  
                          <option value="Rare">Rare</option>    
                    </select>
                  </div>
                  <div class="h-14 w-1/3 p-1 flex items-center justify-center border-r border-b border-t border-gray-100">
                    <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedRevisedRiskRatingSeverity"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                          <option value="" disabled>select</option>
                          <option value="Severe">Severe</option>
                          <option value="Major">Major</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Minor">Minor</option>
                          <option value="Minimal">Minimal</option>
                    </select>
                  </div>
                  <div class="h-14 w-1/3 p-1 flex items-center justify-center border-r border-b border-t border-gray-100">
                    <select id="crud-form-6" style="padding-right: 24px !important;" v-model="selectedRevisedRiskRatingOverall"  class="border text-gray-400 py-3 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-xs border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-100 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 ">
                          <option value="" disabled>select</option>
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Low">Low</option> 
                    </select>
                  </div>
                </div>

               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100"> 
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-1" v-model.trim="validate.person_responsible.$model" class="w-full text-xs" type="text" name="name":class="{ 'border-danger': validate.person_responsible.$error,}" placeholder="Hazard" />
                    </div>
               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-14 p-2 border-r border-b border-t border-gray-100">
                <div class="flex-1 w-full mt-3 xl:mt-0">
                        <FormInput id="crud-form-1" v-model.trim="validate.completion_date.$model" class="w-full text-xs" type="date" name="name":class="{ 'border-danger': validate.person_responsible.$error,}" placeholder="Hazard" />
                    </div>
               </div>
            </div>
          <div v-for="(data, index) in state.viewData" :key="index" class="flex items-center text-xs my-4 shadow-sm bg-white rounded-sm">
               <div class="head flex items-center justify-center w-1/11 h-16 p-2 border border-gray-100">{{data.id}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.activity}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.hazard}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.existing_control_measures}}</div>
               <div class="head text-center w-2/11 h-16">
                <div class="flex w-full ">
                  <div class="h-16 w-1/3 p-2 flex items-center justify-center border-r border-b border-t border-gray-100">{{data.risk_rating_likelihood}}</div>
                  <div class="h-16 w-1/3 p-2 flex items-center justify-center border-r border-b border-t border-gray-100">{{data.risk_rating_severity}}</div>
                  <div class="h-16 w-1/3 p-2 flex items-center justify-center border-r border-b border-t border-gray-100">{{data.risk_rating_overall}}</div>
                </div>

               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.additional_control_measures}}</div>
               <div class="head text-center w-2/11 h-16">
                <div class="flex w-full ">
                  <div class="h-16 w-1/3 p-2 flex items-center justify-center border-r border-b border-t border-gray-100">{{data.revised_risk_rating_likelihood}}</div>
                  <div class="h-16 w-1/3 p-2 flex items-center justify-center border-r border-b border-t border-gray-100">{{data.revised_risk_rating_severity}}</div>
                  <div class="h-16 w-1/3 p-2 flex items-center justify-center border-r border-b border-t border-gray-100">{{data.revised_risk_rating_overall}}</div>
                </div>

               </div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100"> {{data.person_responsible}}</div>
               <div class="head flex items-center justify-center text-center w-1/11 h-16 p-2 border-r border-b border-t border-gray-100">{{data.completion_date}}</div>
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
