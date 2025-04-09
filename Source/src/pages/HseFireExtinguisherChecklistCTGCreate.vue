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
  
  isEditMode: false,
  entryId: null as string | null,
});
// const selectedActivity = ref("");
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
  tag_no:'',
  type:'',
  location:'',
      // date_conducted:'',
      // process_owner_or_department:'',
      // next_review_date:''
});

const rules = {
  tag_no:{required,},
  type:{required,},
  location:{required,},
        // date_conducted:{required,},
        // process_owner_or_department:{required,},
        // next_review_date:{required,},
};

const validate = useVuelidate(rules, toRefs(formData));


const submitForm = async () => {
    // formData.date_conducted = dateconducted.value;
    // formData.next_review_date = nextreviewdate.value;
    validate.value.$touch();
    console.log("shamim form data:", formData);
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {

            const form = new FormData();
            (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
              const value = formData[key];
              console.log(`Appending to FormData: key=${key}, value=${value}`);
              form.append(key, value as string);
            });
            
            try {
                let  url = state.isEditMode
                ? `${config.baseURL}/api/v1/fire-extinguisher-ctg/update/${state.entryId}`
                : `${config.baseURL}/api/v1/fire-extinguisher-ctg`;
                
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,
                },
              });
              console.log("fireExtTON_res: ", response.data);
              router.push({ name: 'hse-fire-extinguisher-ctg-list' });
                // selectedRiskRatingLikelihood.value = response.data.risk_rating_likelihood;
                // selectedRiskRatingSeverity.value = response.data.risk_rating_severity;
                // selectedRiskRatingOverall.value = response.data.risk_rating_overall;
                // selectedRevisedRiskRatingLikelihood.value = response.data.revised_risk_rating_likelihood;
                // selectedRevisedRiskRatingSeverity.value = response.data.revised_risk_rating_severity;
                // selectedRevisedRiskRatingOverall.value = response.data.revised_risk_rating_overall;
                // fetchData();
        
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        
            SuccessPopUp();
    }
};

// Fetch data from id
const fetchEntryData = async (id: string) => {
  try {
    const response = await axios.get(`${config.baseURL}/api/v1/fire-extinguisher-ctg/edit/${id}`, {
      headers: {
        'Authorization': state.token,
      },
    });

    const data = response.data.data;
    console.log('Fetched fireExtCTG Data:', data);

    Object.keys(formData).forEach((key) => {
      const formKey = key as keyof typeof formData;
      if (formKey in data) {
        formData[formKey] = data[formKey];
      }
    });
    
    console.log('Form Data after population:', formData);
  } catch (error) {
    console.error('Error fetching entry data:', error);
  }
};

// Call fetchData when the component is mounted
onMounted(() => {
  const entryId = route.params.id as string;
  if (entryId) {
    state.isEditMode = true;
    state.entryId = entryId;
    fetchEntryData(entryId);
  }
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

const isDropdownVisible = ref(false);
const ishazards = ref(false);
const isexisting_control_measures = ref(false);
const ispersons_responsible = ref(false);
const isadditionals_control_measures = ref(false);

// const showDropdown = () => {
//   isDropdownVisible.value = true;
// };

// const showishazards = () => {
//   console.log("showishazards")
//   ishazards.value = true;
// };

// const showisexisting_control_measures = () => {
//   isexisting_control_measures.value = true;
// };

// const showispersons_responsible = () => {
//   ispersons_responsible.value = true;
// };

// const showadditionals_control_measures = () => {
//   isadditionals_control_measures.value = true;
// };


// const selectItem = (value: string) => {
//   formData.activity = value;
//   isDropdownVisible.value = false;
// };

// const selectishazards = (value: string) => {
//   formData.hazard = value;
//   ishazards.value = false;
// };

// const selectisexisting_control_measures = (value: string) => {
//   formData.existing_control_measures = value;
//   isexisting_control_measures.value = false;
// };

// const selectispersons_responsible = (value: string) => {
//   formData.person_responsible = value;
//   ispersons_responsible.value = false;
// };

// const selectadditionals_control_measures = (value: string) => {
//   formData.additional_control_measures = value;
//   isadditionals_control_measures.value = false;
// };

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
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="grid grid-cols-12 gap-6 mt-5">
    
    <!-- BEGIN: Data List -->
    <div class="col-span-12   overflow-y-auto ">
        <div class="risk-form-head">
            <div class="py-4 bg-theme-1">
                <p class=" text-base font-semibold uppercase text-center text-white">{{ state.isEditMode ? 'Fire Extinguisher CTG FORM Edit' : 'Fire Extinguisher CTG FORM' }}</p>
            </div>
            <div class="box mt-8 py-5">
              <div class="flex flex-wrap">
                  <div class="md:w-1/2 w-full">
                      <div class="px-4 py-2">
                        <FormInline class="flex flex-col flex-wrap md:flex-nowrap  pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                          <FormLabel class="xl:w-48 xl:!mr-10">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3">Tag No.</div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                                <div class="flex flex-col items-center justify-center w-full space-y-4">
                                  <div class="flex-1 w-full mt-3 xl:mt-0">
                                          <FormInput id="crud-form-9" v-model="formData.tag_no" class="w-full" type="text" name="name" placeholder="Input Tag No."/>   
                                  </div>
                                </div>
                          </div>
                        </FormInline>
                      </div>
                  </div>
                  <div class="md:w-1/2 w-full">
                      <div class="px-4 py-2">
                        <FormInline class="flex flex-col flex-wrap md:flex-nowrap  pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                          <FormLabel class="xl:w-48 xl:!mr-10">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3">Type</div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                                <div class="flex flex-col items-center justify-center w-full space-y-4">
                                  <div class="flex-1 w-full mt-3 xl:mt-0">
                                    <FormInput id="crud-form-9" v-model="formData.type" class="w-full" type="text" name="name" placeholder="Input Type"/> 
                                  </div>
                                </div>
                          </div>
                        </FormInline>
                      </div>
                  </div>
                  <div class="md:w-1/2 w-full">
                      <div class="px-4 py-2">
                        <FormInline class="flex flex-col flex-wrap md:flex-nowrap  pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                          <FormLabel class="xl:w-48 xl:!mr-10">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3">Location</div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                                <div class="flex flex-col items-center justify-center w-full space-y-4">
                                  <div class="flex-1 w-full mt-3 xl:mt-0">
                                    <FormInput id="crud-form-9" v-model="formData.location" class="w-full" type="text" name="name" placeholder="Input Location"/>
                                  </div>
                                </div>
                          </div>
                        </FormInline>
                      </div>
                  </div>
                  <!-- <div class="md:w-1/2 w-full">
                      <div class="px-4 py-2">
                        <FormInline class="flex flex-col flex-wrap md:flex-nowrap  pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                          <FormLabel class="xl:w-48 xl:!mr-10">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3"> 
                                    Process Owner / Department
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                                <div class="flex flex-col items-center justify-center w-full space-y-4">
                                  <div class="flex-1 w-full mt-3 xl:mt-0">
                                    <FormInput id="crud-form-9" v-model="formData.process_owner_or_department" class="w-full" type="text" name="name" placeholder="Input process Owner r Department"/>
                                  </div>
                                </div>
                          </div>
                        </FormInline>
                      </div>
                  </div>
                  <div class="md:w-1/2 w-full">
                      <div class="px-4 py-2">
                        <FormInline class="flex flex-col flex-wrap md:flex-nowrap  pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                          <FormLabel class="xl:w-48 xl:!mr-10">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3"> 
                                  Date Conducted
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                                <div class="flex flex-col items-center justify-center w-full space-y-4">
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
                          </div>
                                </div>
                          </div>
                        </FormInline>
                      </div>
                  </div>
                  <div class="md:w-1/2 w-full">
                      <div class="px-4 py-2">
                        <FormInline class="flex flex-col flex-wrap md:flex-nowrap  pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                          <FormLabel class="xl:w-48 xl:!mr-10">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium text-sm text-nowrap flex mt-6 xl:mt-3"> 
                                  Next Review Date
                                </div>
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                                <div class="flex flex-col items-center justify-center w-full space-y-4">
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
                          </div>
                                </div>
                          </div>
                        </FormInline>
                      </div>
                  </div> -->
              </div>
              <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row px-4 pt-8">
                <Button
                  type="button"class="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52">
                  Cancel
                </Button>
                <Button variant="primary" type="button" class="w-full py-3 md:w-52" @click="submitForm">
                  Save
                </Button>
              </div>
            </div>
        </div>
    </div>
    <!-- END: Data List -->
  </div>
     <!-- BEGIN: Success Notification Content -->
   <Notification id="success-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium text-nowrap">Fire Extinguisher CTG {{ state.isEditMode ? 'Editing' : 'Create' }} success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium text-nowrap">Fire Extinguisher CTG {{ state.isEditMode ? 'Edit' : 'Create' }} failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
