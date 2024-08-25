<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
import axios from 'axios';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import Button from "@/components/Base/Button";
import { useRouter,useRoute } from 'vue-router';
import Notification from "@/components/Base/Notification";
import Lucide from "@/components/Base/Lucide";
import config from "@/config";
import {
  FormInput,
  FormLabel,
} from "@/components/Base/Form";
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import Toastify from 'toastify-js';

const formData = reactive({
        name:'',
});
const router = useRouter();
const route = useRoute();


const rules = {
        name: {required}
};

const validate = useVuelidate(rules, toRefs(formData));


const submitForm = async () => {
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {
               
            try {
                let id = route.params.id;
                let sID =id.toString()
                let url = config.baseURL+'/api/v1/department/'+sID;
                
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                console.log('Form submitted successfully:', response.data);
                if (response.data !== undefined) {
                    router.push({ name: 'department-info-list' });
                }
        
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        
            SuccessPopUp();
    }
};

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
    <h2 class="mr-auto text-lg font-medium">Department Form</h2>
  </div>
  <div class="w-full">
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1" class="flex flex-col w-full sm:flex-row">Department Name
                </FormLabel>
                <FormInput id="crud-form-1" v-model.trim="validate.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name.$error,}" placeholder="Input Department Name"/>
                <template v-if="validate.name.$error">
                  <div v-for="(error, index) in validate.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>  
        </div>
        
        <div class="mt-5 text-left px-4 py-2">
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
          <div class="font-medium">Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
