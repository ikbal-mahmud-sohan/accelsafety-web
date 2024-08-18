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
      serial_number:'',
      employee_name:'',
      designation:'',
      department:'',
      special_training_need:'',
      employee_type:'',
      status:0,
      first_training_topic:'',
      first_training_date:'',
      first_training_status:0,
      second_training_topic:'',
      second_training_date:'',
      second_training_status:0,
      third_training_topic:'',
      third_training_date:'',
      third_training_status:0,
      fourth_training_topic:'',
      fourth_training_date:'',
      fourth_training_status:0,
      fifth_training_topic:'',
      fifth_training_date:'',
      fifth_training_status:0,
      additional_resources:'',
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
           serial_number:{required, minLength: minLength(3),},
           employee_name:{required, minLength: minLength(3),},
           designation:{required, minLength: minLength(3),},
           department:{required, minLength: minLength(3),},
           special_training_need:{required, minLength: minLength(3),},
           employee_type:{required, minLength: minLength(3),},
           status:{required},
           first_training_topic:{required, minLength: minLength(3),},
           first_training_date:{required},
           first_training_status:{required},
           second_training_topic:{required, minLength: minLength(3),},
           second_training_date:{required},
           second_training_status:{required},
           third_training_topic:{required, minLength: minLength(3),},
           third_training_date:{required},
           third_training_status:{required},
           fourth_training_topic:{required, minLength: minLength(3),},
           fourth_training_date:{required},
           fourth_training_status:{required},
           fifth_training_topic:{required, minLength: minLength(3),},
           fifth_training_date:{required},
           fifth_training_status:{required},
           additional_resources:{required, minLength: minLength(3),},
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
   let  url = config.baseURL+'/api/v1/training';
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
                <FormLabel htmlFor="crud-form-1" class="flex flex-col w-full sm:flex-row">Serial Number
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-1" v-model.trim="validate.serial_number.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.serial_number.$error,}" placeholder="Input Serial Number"/>
                <template v-if="validate.serial_number.$error">
                  <div v-for="(error, index) in validate.serial_number.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-4" class="flex flex-col w-full sm:flex-row">Employee Name
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-4" v-model.trim="validate.employee_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.employee_name.$error,}" placeholder="Input Employee Name"/>
                <template v-if="validate.employee_name.$error">
                  <div v-for="(error, index) in validate.employee_name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
            
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-5" class="flex flex-col w-full sm:flex-row">Designation
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-5" v-model.trim="validate.designation.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.designation.$error,}" placeholder="Input Designation"/>
                <template v-if="validate.designation.$error">
                  <div v-for="(error, index) in validate.designation.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-6" class="flex flex-col w-full sm:flex-row">Department
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-6" v-model.trim="validate.department.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.department.$error,}" placeholder="Input department"/>
                <template v-if="validate.department.$error">
                  <div v-for="(error, index) in validate.department.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
            
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-7" class="flex flex-col w-full sm:flex-row">Special Training Need
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-7" v-model.trim="validate.special_training_need.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.special_training_need.$error,}" placeholder="Input Special Training Need"/>
                <template v-if="validate.special_training_need.$error">
                  <div v-for="(error, index) in validate.special_training_need.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-8" class="flex flex-col w-full sm:flex-row">Employee Type
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-8" v-model.trim="validate.employee_type.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.employee_type.$error,}" placeholder="Input Employee Type"/>
                <template v-if="validate.employee_type.$error">
                  <div v-for="(error, index) in validate.employee_type.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-17" class="flex flex-col w-full sm:flex-row">Status
                </FormLabel>
                <FormSwitch.Input id="crud-form-17" v-model.trim="validate.status.$model" type="checkbox" />
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">First Training Topic
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.first_training_topic.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.first_training_topic.$error,}" placeholder="Input First Training Topic"/>
                <template v-if="validate.first_training_topic.$error">
                  <div v-for="(error, index) in validate.first_training_topic.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">First Training Date
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.first_training_date.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.first_training_date.$error,}" placeholder="Input First Training Date"/>
                <template v-if="validate.first_training_date.$error">
                  <div v-for="(error, index) in validate.first_training_date.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-17" class="flex flex-col w-full sm:flex-row">First Training Status
                </FormLabel>
                <FormSwitch.Input id="crud-form-17" v-model.trim="validate.first_training_status.$model" type="checkbox" />
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">Second Training Topic
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.second_training_topic.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.second_training_topic.$error,}" placeholder="Input Second Training Topic"/>
                <template v-if="validate.second_training_topic.$error">
                  <div v-for="(error, index) in validate.second_training_topic.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">Second Training Date
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.second_training_date.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.second_training_date.$error,}" placeholder="Input Second Training Date"/>
                <template v-if="validate.second_training_date.$error">
                  <div v-for="(error, index) in validate.second_training_date.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-17" class="flex flex-col w-full sm:flex-row">Second Training Status
                </FormLabel>
                <FormSwitch.Input id="crud-form-17" v-model.trim="validate.second_training_status.$model" type="checkbox" />
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">Third Training Topic
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.third_training_topic.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.third_training_topic.$error,}" placeholder="Input Third Training Topic"/>
                <template v-if="validate.third_training_topic.$error">
                  <div v-for="(error, index) in validate.third_training_topic.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">Third Training Date
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.third_training_date.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.third_training_date.$error,}" placeholder="Input Third Training Date"/>
                <template v-if="validate.third_training_date.$error">
                  <div v-for="(error, index) in validate.third_training_date.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-17" class="flex flex-col w-full sm:flex-row">Third Training Status
                </FormLabel>
                <FormSwitch.Input id="crud-form-17" v-model.trim="validate.third_training_status.$model" type="checkbox" />
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">Fourth Training Topic
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.fourth_training_topic.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.fourth_training_topic.$error,}" placeholder="Input Fourth Training Topic"/>
                <template v-if="validate.fourth_training_topic.$error">
                  <div v-for="(error, index) in validate.fourth_training_topic.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">Fourth Training Date
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.fourth_training_date.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.fourth_training_date.$error,}" placeholder="Input Fourth Training Date"/>
                <template v-if="validate.fourth_training_date.$error">
                  <div v-for="(error, index) in validate.fourth_training_date.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-17" class="flex flex-col w-full sm:flex-row">Fourth Training Status
                </FormLabel>
                <FormSwitch.Input id="crud-form-17" v-model.trim="validate.fourth_training_status.$model" type="checkbox" />
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">Fifth Training Topic
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.fifth_training_topic.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.fifth_training_topic.$error,}" placeholder="Input Fifth Training Topic"/>
                <template v-if="validate.fifth_training_topic.$error">
                  <div v-for="(error, index) in validate.fifth_training_topic.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">Fifth Training Date
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.fifth_training_date.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.fifth_training_date.$error,}" placeholder="Input Fifth Training Date"/>
                <template v-if="validate.fifth_training_date.$error">
                  <div v-for="(error, index) in validate.fifth_training_date.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-17" class="flex flex-col w-full sm:flex-row">Fifth Training Status
                </FormLabel>
                <FormSwitch.Input id="crud-form-17" v-model.trim="validate.fifth_training_status.$model" type="checkbox" />
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">Additional Resources
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.additional_resources.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.additional_resources.$error,}" placeholder="Input Fifth Training Date"/>
                <template v-if="validate.additional_resources.$error">
                  <div v-for="(error, index) in validate.additional_resources.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
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
