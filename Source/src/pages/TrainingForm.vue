<script setup lang="ts">
import { ref, reactive,toRefs } from 'vue';
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


import {
  FormInput,
  FormLabel,
  FormSwitch,
  InputGroup,
} from "@/components/Base/Form";

const formData = reactive({
      name:'',
      descriptions:'',
});
const router = useRouter();

const categories = ref(["1", "3"]);
const editorConfig = {
  toolbar: {
    items: ["bold", "italic", "link"],
  },
};
interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const editorData = ref("");

const rules = {
          name:{required, minLength: minLength(3),},
};

const validate = useVuelidate(rules, toRefs(formData));
const backendErrors = reactive<{
    message: string;
    errors: { [key: string]: string[] };
}>({
    message: '',
    errors: {}
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

const submitForm = async () => {
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
        FailedPopUp();
    } else {

   try {
   let  url = config.baseURL+'/api/v1/trainingTopics';
    const response = await axios.post(url, formData);
    console.log('Form submitted successfully:', response.data);
    if(response.data != undefined){
        SuccessPopUp();
      router.push({ name: 'training-data-list' });
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
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Training Form</h2>
  </div>

  <div class="flex flex-wrap items-center justify-between w-full">
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1" class="flex flex-col w-full sm:flex-row">Name
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-1" v-model.trim="validate.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name.$error,}" placeholder="Input Name"/>
                <template v-if="validate.name.$error">
                  <div v-for="(error, index) in validate.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1" class="flex flex-col w-full sm:flex-row">Descriptions
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-1" v-model="formData.descriptions" class="w-full" type="text" name="descriptions" placeholder="Input Descriptions"/>
                
            </div> 
        </div>
        
        
        <div class="w-full px-4 py-4">
        <!-- <p v-if="backendErrors.message" class="text-red-500 text-sm">{{ backendErrors.message }}</p> -->
        <template v-if="backendErrors.errors">
            <div v-for="(messages, field) in backendErrors.errors" :key="field" class="mt-2 text-danger flex">
            <p class=" capitalize mr-2"><strong>{{ field }}:</strong></p>
            <ul>
                <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
            </ul>
            </div>
        </template>
        </div>
        <div class="mt-5 text-right">
          <Button type="button" variant="outline-secondary" class="w-24 mr-4">
            Cancel
          </Button>
          <Button type="button" variant="primary" class="w-24" @click="submitForm">
            Save
          </Button>
        </div>

  </div>
  <!-- BEGIN: Success Notification Content -->
  <Notification id="success-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Safety Observationt Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Safety Observationt Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
