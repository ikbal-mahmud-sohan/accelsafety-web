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
import { ref, reactive,toRefs,onMounted } from 'vue';
import axios, { AxiosError } from 'axios';
import Lucide from "@/components/Base/Lucide";
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import config from "@/config";
import Toastify from 'toastify-js';
import Notification from "@/components/Base/Notification";
import Alert from "@/components/Base/Alert";
import HiraService from "./services/hira/hira";
import { getToken } from './../auth/setToken'



const editorConfig = {
  toolbar: {
    items: ['heading','undo', 'redo', 'bold', 'italic', 'link', 'numberedList', 'bulletedList','fontsize'],
  },
};


const formDataProcess = reactive({
  name: '',
});
const formDataActivity = reactive({
  name: '',
});
const formDataLocation = reactive({
  name: '',
});
const formDataOccupations = reactive({
  name: '',
});
const formDataEvent = reactive({
  name: '',
});
const formDataCause = reactive({
  name: '',
});
const formDataImpact = reactive({
  name: '',
});
const formDataEngineering = reactive({
  name: '',
});
const formDataAdministrative = reactive({
  name: '',
});
const formDataPPE = reactive({
  name: '',
});
const state = reactive({
  hiraProcess: [] as Array<any>,
  hiraActivity: [] as Array<any>,
  hiraLocation: [] as Array<any>,
  hiraOccupations: [] as Array<any>,
  hiraEvent: [] as Array<any>,
  hiraCause: [] as Array<any>,
  hiraImpact: [] as Array<any>,
  hiraEngineering: [] as Array<any>,
  hiraAdministrative: [] as Array<any>,
  hiraPPE: [] as Array<any>,
  token: getToken(),

});

interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const rules = {
    name: {minLength: minLength(1)},
};

const validate = useVuelidate(rules, toRefs(formDataProcess));
const validate1 = useVuelidate(rules, toRefs(formDataActivity));
const validate2 = useVuelidate(rules, toRefs(formDataLocation));
const validate3 = useVuelidate(rules, toRefs(formDataOccupations));
const validate4 = useVuelidate(rules, toRefs(formDataEvent));
const validate5 = useVuelidate(rules, toRefs(formDataCause));
const validate6 = useVuelidate(rules, toRefs(formDataImpact));
const validate7 = useVuelidate(rules, toRefs(formDataEngineering));
const validate8 = useVuelidate(rules, toRefs(formDataAdministrative));
const validate9 = useVuelidate(rules, toRefs(formDataPPE));
const backendErrors = reactive<{
    message: string;
    errors: { [key: string]: string[] };
}>({
    message: '',
    errors: {}
});


  const submitForm = async () => {
      validate.value.$touch();
      if (validate.value.$invalid) {
      new HiraService().FailedPopUp();
  } else {

  try {
      let  url = config.baseURL+'/api/v1/hira-process';
      const response = await axios.post(url, formDataProcess,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if(response.data != undefined){
        new HiraService().SuccessPopUp();

          state.hiraProcess = response.data.data;
          formDataProcess.name = " ";
      }
  } catch (err) {
      new HiraService().FailedPopUp();
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
  const submitActivityForm = async () => {
      validate1.value.$touch();
      if (validate1.value.$invalid) {
      new HiraService().FailedTypePopUp();
  } else {

  try {
      let  url = config.baseURL+'/api/v1/hira-activity';
      const response = await axios.post(url, formDataActivity,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if(response.data != undefined){
          new HiraService().SuccessTypePopUp();
          state.hiraActivity = response.data.data;
          formDataActivity.name = " "
      }
  } catch (err) {
      new HiraService().FailedTypePopUp();
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
  const submitLocationForm = async () => {
      validate2.value.$touch();
      if (validate2.value.$invalid) {
      new HiraService().FailedInjuryTypePopUp();
  } else {

  try {
      let  url = config.baseURL+'/api/v1/hira-location';
      const response = await axios.post(url, formDataLocation,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if(response.data != undefined){
         new HiraService().SuccessInjuryTypePopUp();
          state.hiraLocation = response.data.data;
          formDataLocation.name = " "
      }
  } catch (err) {
      new HiraService().FailedInjuryTypePopUp();
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
  const submitOccupationsForm = async () => {
      validate3.value.$touch();
      if (validate3.value.$invalid) {
      new HiraService().FailedOccupationsPopUp();
  } else {

  try {
      let  url = config.baseURL+'/api/v1/hira-occupations';
      const response = await axios.post(url, formDataOccupations,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if(response.data != undefined){
        new HiraService().SuccessOccupationsPopUp();
          state.hiraOccupations = response.data.data;
          formDataOccupations.name = " "
      }
  } catch (err) {
      new HiraService().FailedOccupationsPopUp();
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
  const submitEventForm = async () => {
      validate4.value.$touch();
      if (validate4.value.$invalid) {
      new HiraService().FailedEventPopUp();
  } else {

  try {
      let  url = config.baseURL+'/api/v1/hira-event';
      const response = await axios.post(url, formDataEvent,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if(response.data != undefined){
        new HiraService().SuccessEventPopUp();
          state.hiraEvent = response.data.data;
          formDataEvent.name = " "
      }
  } catch (err) {
      new HiraService().FailedEventPopUp();
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
  const submitCauseForm = async () => {
      validate5.value.$touch();
      if (validate5.value.$invalid) {
      new HiraService().FailedCausePopUp();
  } else {

  try {
      let  url = config.baseURL+'/api/v1/hira-cause';
      const response = await axios.post(url, formDataCause,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if(response.data != undefined){
        new HiraService().SuccessCausePopUp();
          state.hiraCause = response.data.data;
          formDataCause.name = " "
      }
  } catch (err) {
      new HiraService().FailedCausePopUp();
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
  const submitImpactForm = async () => {
      validate6.value.$touch();
      if (validate6.value.$invalid) {
      new HiraService().FailedEventPopUp();
  } else {

  try {
      let  url = config.baseURL+'/api/v1/hira-impact';
      const response = await axios.post(url, formDataImpact,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if(response.data != undefined){
        new HiraService().SuccessImpactPopUp();
          state.hiraImpact = response.data.data;
          formDataImpact.name = " "
      }
  } catch (err) {
      new HiraService().FailedImpactPopUp();
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
  const submitEngineeringForm = async () => {
      validate6.value.$touch();
      if (validate6.value.$invalid) {
      new HiraService().FailedEventPopUp();
  } else {

  try {
      let  url = config.baseURL+'/api/v1/hira-engineering';
      const response = await axios.post(url, formDataEngineering,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if(response.data != undefined){
        new HiraService().SuccessEngineeringPopUp();
          state.hiraEngineering = response.data.data;
          formDataEngineering.name = " "
      }
  } catch (err) {
      new HiraService().FailedEngineeringPopUp();
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
  const submitAdministrativeForm = async () => {
      validate6.value.$touch();
      if (validate6.value.$invalid) {
      new HiraService().FailedEventPopUp();
  } else {

  try {
      let  url = config.baseURL+'/api/v1/hira-administrative';
      const response = await axios.post(url, formDataAdministrative,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if(response.data != undefined){
        new HiraService().SuccessAdministrativePopUp();
          state.hiraAdministrative = response.data.data;
          formDataAdministrative.name = " "
      }
  } catch (err) {
      new HiraService().FailedAdministrativePopUp();
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
  const submitPPEForm = async () => {
      validate6.value.$touch();
      if (validate6.value.$invalid) {
      new HiraService().FailedPPEPopUp();
  } else {

  try {
      let  url = config.baseURL+'/api/v1/hira-ppe';
      const response = await axios.post(url, formDataPPE,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if(response.data != undefined){
        new HiraService().SuccessPPEPopUp();
          state.hiraPPE = response.data.data;
          formDataPPE.name = " "
      }
  } catch (err) {
      new HiraService().FailedPPEPopUp();
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

const fetchProcess = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-process';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraProcess = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchActivityData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-activity';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraActivity = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchAccidentInjuryTypeData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-location';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraLocation = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchOccupationsData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-occupations';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraOccupations = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchEventData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-event';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraEvent = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchCauseData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-cause';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraCause = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchImpactData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-impact';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraImpact = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchEngineeringData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-engineering';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraEngineering = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchAdministrativeData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-administrative';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraAdministrative = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchPPEData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira-ppe';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraPPE = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/hira-process/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraProcess = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteAcTypeData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/hira-activity/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraActivity = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteInjuryAcTypeData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/hira-location/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraLocation = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteOccupationsData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/hira-occupations/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraOccupations = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteEventData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/hira-event/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraEvent = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteCauseData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/hira-cause/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraCause = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteImpactData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/hira-impact/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraImpact = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteEngineeringData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/hira-engineering/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraEngineering = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteAdministrativeData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/hira-administrative/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraAdministrative = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deletePPEData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/hira-ppe/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.hiraPPE = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
// Ext Function 


onMounted(() => {
  fetchProcess();
  fetchActivityData();
  fetchAccidentInjuryTypeData();
  fetchOccupationsData();
  fetchEventData();
  fetchCauseData();
  fetchImpactData();
  fetchEngineeringData();
  fetchAdministrativeData();
  fetchPPEData();
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Add Hira</h2>
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
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Hira Process
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
                    Enter the name of the Hira Process (e.g.,     Plumbing Work , Gardening).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name.$error,}" placeholder="Ex: APC Dust delivery" @keydown.enter="submitForm"/>
                <template v-if="validate.name.$error">
                  <div v-for="(error, index) in validate.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
                <FormHelp class="text-right"> Required, at least 3 characters </FormHelp>
              </div>
            </FormInline>
            
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 flex flex-wrap h-96 overflow-y-auto" >
          <ul v-for="(data, index) in state.hiraProcess" :key="index" class="">
            <li class="p-2">
              <span class=" inline-block px-4 py-3 bg-gray-100 rounded-sm min-w-52 md:min-w-36 text-center"> 
              {{data.name}}
              <a class="ml-2"  href="javascript:;" @click="deleteData(data.id)">×</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Hira Activity
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
                    Enter the name of the hira activity (e.g., Vehicle movement).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate1.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate1.name.$error,}" placeholder="Ex: Vehicle movement" @keydown.enter="submitActivityForm"/>
                <template v-if="validate1.name.$error">
                  <div v-for="(error, index) in validate1.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
                <FormHelp class="text-right"> Required, at least 3 characters </FormHelp>
              </div>
            </FormInline>
            
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 flex flex-wrap h-96 overflow-y-auto" >
          <ul v-for="(data, index) in state.hiraActivity" :key="index" class="">
            <li class="p-2">
              <span class=" inline-block px-4 py-3 bg-gray-100 rounded-sm min-w-52 md:min-w-36 text-center"> 
              {{data.name}}
              <a class="ml-2"  href="javascript:;" @click="deleteAcTypeData(data.id)">×</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Hira Location
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
                    Enter the name of the hira location (e.g., Store).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate2.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate2.name.$error,}" placeholder="Ex: Dining room" @keydown.enter="submitLocationForm"/>
                <template v-if="validate2.name.$error">
                  <div v-for="(error, index) in validate2.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
                <FormHelp class="text-right"> Required, at least 3 characters </FormHelp>
              </div>
            </FormInline>
            
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 flex flex-wrap h-96 overflow-y-auto" >
          <ul v-for="(data, index) in state.hiraLocation" :key="index" class="">
            <li class="p-2">
              <span class=" inline-block px-4 py-3 bg-gray-100 rounded-sm min-w-52 md:min-w-36 text-center"> 
              {{data.name}}
              <a class="ml-2"  href="javascript:;" @click="deleteInjuryAcTypeData(data.id)">×</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Hira Occupations
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
                    Enter the name of the hira Occupations (e.g., Daily labor).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate3.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate3.name.$error,}" placeholder="Ex: Daily labors" @keydown.enter="submitOccupationsForm"/>
                <template v-if="validate3.name.$error">
                  <div v-for="(error, index) in validate3.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
                <FormHelp class="text-right"> Required, at least 3 characters </FormHelp>
              </div>
            </FormInline>
            
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 flex flex-wrap h-96 overflow-y-auto" >
          <ul v-for="(data, index) in state.hiraOccupations" :key="index" class="">
            <li class="p-2">
              <span class=" inline-block px-4 py-3 bg-gray-100 rounded-sm min-w-52 md:min-w-36 text-center"> 
              {{data.name}}
              <a class="ml-2"  href="javascript:;" @click="deleteOccupationsData(data.id)">×</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Hira Event
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
                    Enter the name of the hira Event (e.g., slag splash).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate4.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate4.name.$error,}" placeholder="Ex: Hot work " @keydown.enter="submitEventForm"/>
                <template v-if="validate4.name.$error">
                  <div v-for="(error, index) in validate4.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
                <FormHelp class="text-right"> Required, at least 3 characters </FormHelp>
              </div>
            </FormInline>
            
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 flex flex-wrap h-96 overflow-y-auto" >
          <ul v-for="(data, index) in state.hiraEvent" :key="index" class="">
            <li class="p-2">
              <span class=" inline-block px-4 py-3 bg-gray-100 rounded-sm min-w-52 md:min-w-36 text-center"> 
              {{data.name}}
              <a class="ml-2"  href="javascript:;" @click="deleteEventData(data.id)">×</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Hira Cause
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
                    Enter the name of the hira Cause (e.g., Less awareness).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate5.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate5.name.$error,}" placeholder="Ex: Less awareness" @keydown.enter="submitCauseForm"/>
                <template v-if="validate5.name.$error">
                  <div v-for="(error, index) in validate5.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
                <FormHelp class="text-right"> Required, at least 3 characters </FormHelp>
              </div>
            </FormInline>
            
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 flex flex-wrap h-96 overflow-y-auto" >
          <ul v-for="(data, index) in state.hiraCause" :key="index" class="">
            <li class="p-2">
              <span class=" inline-block px-4 py-3 bg-gray-100 rounded-sm min-w-52 md:min-w-36 text-center"> 
              {{data.name}}
              <a class="ml-2"  href="javascript:;" @click="deleteCauseData(data.id)">×</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Hira Impact
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
                    Enter the name of the hira Impact (e.g., allergic problems).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate6.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate6.name.$error,}" placeholder="Ex:  allergic problems" @keydown.enter="submitImpactForm"/>
                <template v-if="validate6.name.$error">
                  <div v-for="(error, index) in validate6.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
                <FormHelp class="text-right"> Required, at least 3 characters </FormHelp>
              </div>
            </FormInline>
            
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 flex flex-wrap h-96 overflow-y-auto" >
          <ul v-for="(data, index) in state.hiraImpact" :key="index" class="">
            <li class="p-2">
              <span class=" inline-block px-4 py-3 bg-gray-100 rounded-sm min-w-52 md:min-w-36 text-center"> 
              {{data.name}}
              <a class="ml-2"  href="javascript:;" @click="deleteImpactData(data.id)">×</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Hira Engineering
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
                    Enter the name of the hira Engineering (e.g., allergic problems).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate7.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate7.name.$error,}" placeholder="Ex:  Traffice Signal Light" @keydown.enter="submitEngineeringForm"/>
                <template v-if="validate7.name.$error">
                  <div v-for="(error, index) in validate7.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
                <FormHelp class="text-right"> Required, at least 3 characters </FormHelp>
              </div>
            </FormInline>
            
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 flex flex-wrap h-96 overflow-y-auto" >
          <ul v-for="(data, index) in state.hiraEngineering" :key="index" class="">
            <li class="p-2">
              <span class=" inline-block px-4 py-3 bg-gray-100 rounded-sm min-w-52 md:min-w-36 text-center"> 
              {{data.name}}
              <a class="ml-2"  href="javascript:;" @click="deleteEngineeringData(data.id)">×</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Hira Administrative
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
                    Enter the name of the hira administrative (e.g., allergic problems).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate8.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate8.name.$error,}" placeholder="Ex:  Traffice Signal Light" @keydown.enter="submitAdministrativeForm"/>
                <template v-if="validate8.name.$error">
                  <div v-for="(error, index) in validate8.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
                <FormHelp class="text-right"> Required, at least 3 characters </FormHelp>
              </div>
            </FormInline>
            
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 flex flex-wrap h-96 overflow-y-auto" >
          <ul v-for="(data, index) in state.hiraAdministrative" :key="index" class="">
            <li class="p-2">
              <span class=" inline-block px-4 py-3 bg-gray-100 rounded-sm min-w-52 md:min-w-36 text-center"> 
              {{data.name}}
              <a class="ml-2"  href="javascript:;" @click="deleteAdministrativeData(data.id)">×</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Hira PPE
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
                    Enter the name of the hira PPE (e.g., allergic problems).
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput id="crud-form-1" v-model.trim="validate9.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate9.name.$error,}" placeholder="Ex:  Traffice Signal Light" @keydown.enter="submitPPEForm"/>
                <template v-if="validate9.name.$error">
                  <div v-for="(error, index) in validate9.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
                <FormHelp class="text-right"> Required, at least 3 characters </FormHelp>
              </div>
            </FormInline>
            
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 flex flex-wrap h-96 overflow-y-auto" >
          <ul v-for="(data, index) in state.hiraPPE" :key="index" class="">
            <li class="p-2">
              <span class=" inline-block px-4 py-3 bg-gray-100 rounded-sm min-w-52 md:min-w-36 text-center"> 
              {{data.name}}
              <a class="ml-2"  href="javascript:;" @click="deletePPEData(data.id)">×</a>
              </span>
            </li>
          </ul>
        </div>
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
            <a href="">Insert Accident</a>
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
              When filling out the accident report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">Hira Process Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Process Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
   <Notification id="success-type-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Accident Type Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-type-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Accident Type Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
   <Notification id="success-injury-type-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Accident Injury Type Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-injury-type-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Accident Injury Type Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
   <Notification id="success-occupations-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Occupations Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-occupations-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Occupations Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
   <Notification id="success-event-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Event Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-event-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Event Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
   <Notification id="success-cause-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Cause Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-cause-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Cause Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
   <Notification id="success-impact-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Impact Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-impact-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Impact Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
   <Notification id="success-engineering-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Engineering Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-engineering-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Engineering Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
   <Notification id="success-administrative-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Administrative Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-administrative-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira Administrative Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
   <Notification id="success-PPE-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira PPE Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-PPE-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Hira PPE Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
