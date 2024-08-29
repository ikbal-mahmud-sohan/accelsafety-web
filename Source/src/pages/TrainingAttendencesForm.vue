<script setup lang="ts">
import { ref, reactive, toRefs,onMounted } from 'vue';
import axios from 'axios';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import Button from "@/components/Base/Button";
import { useRouter } from 'vue-router';
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
        serial_number:'',
        training_topic_id:'',
        iso_standard:'',
        venue:'',
        facilitator:'',
        training_date:'',
        training_duration:'',
        emp_id:'',
        title:'',
        function:'',
        business:'',
        signature: null as File | null,
});
const state = reactive({
  trainingTopicData: [] as Array<any>,
  employeeData: [] as Array<any>,

});
const router = useRouter();


const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    formData.signature = input.files[0]; // Assign the first file directly
  }
};

const rules = {
        serial_number: {required,integer},
        training_topic_id: {required,},
        iso_standard: {required,minLength: minLength(3),},
        venue: {required,minLength: minLength(3),},
        facilitator: {required,minLength: minLength(3),},
        training_date: {required},
        training_duration: {required,minLength: minLength(3),},
        emp_id: {required},
        title: {required,minLength: minLength(3),},
        function: {required,minLength: minLength(3),},
        business: {required,minLength: minLength(3),},
        signature: {required},
};

const validate = useVuelidate(rules, toRefs(formData));
const selectedtrainingTopic = ref("");
const selectedEmployee = ref("");


const submitForm = async () => {
  formData.emp_id = selectedEmployee.value;
  formData.training_topic_id = selectedtrainingTopic.value;
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
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
    } else {
                const form = new FormData();
                (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
                if (key !== 'signature') {
                form.append(key, formData[key] as string);
                  }
              });
              if (formData.signature instanceof File) {
                  form.append('signature', formData.signature);
              }
            try {
                let  url = config.baseURL+'/api/v1/trainingAttendence';
                const response = await axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                console.log('Form submitted successfully:', response.data);
                if (response.data !== undefined) {
                    router.push({ name: 'training-attendences-data-list' });
                }
        
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        
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
};

const fetchTrainingTopicData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/trainingTopics';
    const response = await axios.get(url);
    state.trainingTopicData = response.data.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchEmployeeData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/employee';
    const response = await axios.get(url);
    state.employeeData = response.data.data;

    console.log("sohan 1",state.employeeData)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
onMounted(() => {
  fetchTrainingTopicData();
  fetchEmployeeData();
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Attendence Training</h2>
  </div>
  <div class="flex flex-wrap items-center justify-between w-full">
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1" class="flex flex-col w-full sm:flex-row">Serial Number
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
            <FormLabel htmlFor="crud-form-6" class="flex flex-col w-full sm:flex-row">
              Employee
                <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required</span>
              </FormLabel>
              <select id="crud-form-6" v-model="selectedEmployee"  class="w-full border border-gray-300 rounded-lg">
                <option value="" disabled>Select Employee</option>
                <option v-for="(data, index) in state.employeeData" :key="index" :value="data.id">{{ data.name }}</option>
              </select>
              <template v-if="validate.emp_id.$error">
                <div v-for="(error, index) in validate.emp_id.$errors" :key="index" class="mt-2 text-danger">
                  {{ error.$message }}
                </div>
              </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
          <div class="px-4 py-2">
              <FormLabel htmlFor="crud-form-6" class="flex flex-col w-full sm:flex-row">
                Training Topic
                <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required</span>
              </FormLabel>
              <select id="crud-form-6" v-model="selectedtrainingTopic" class="w-full border border-gray-300 rounded-lg">
                <option value="" disabled>Select Training</option>
                <option v-for="(data, index) in state.trainingTopicData" :key="index" :value="data.id">{{ data.name }}</option>
              </select>
              <template v-if="validate.training_topic_id.$error">
                <div v-for="(error, index) in validate.training_topic_id.$errors" :key="index" class="mt-2 text-danger">
                  {{ error.$message }}
                </div>
              </template>
            </div>  
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-2" class="flex flex-col w-full sm:flex-row">Iso Standard
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required</span>
                </FormLabel>
                <FormInput id="crud-form-2" v-model.trim="validate.iso_standard.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.iso_standard.$error,}" placeholder="Input Iso Standard"/>
                <template v-if="validate.iso_standard.$error">
                  <div v-for="(error, index) in validate.iso_standard.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-4" class="flex flex-col w-full sm:flex-row">Venue
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required</span>
                </FormLabel>
                <FormInput id="crud-form-4" v-model.trim="validate.venue.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.venue.$error,}" placeholder="Input Venue"/>
                <template v-if="validate.venue.$error">
                  <div v-for="(error, index) in validate.venue.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-5" class="flex flex-col w-full sm:flex-row">Facilitator
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-5" v-model.trim="validate.facilitator.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.facilitator.$error,}" placeholder="Input Facilitator"/>
                <template v-if="validate.facilitator.$error">
                  <div v-for="(error, index) in validate.facilitator.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-5" class="flex flex-col w-full sm:flex-row">Training Date
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-5" v-model.trim="validate.training_date.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.training_date.$error,}" placeholder="Input Training Date"/>
                <template v-if="validate.training_date.$error">
                  <div v-for="(error, index) in validate.training_date.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-5" class="flex flex-col w-full sm:flex-row">Training Duration
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-5" v-model.trim="validate.training_duration.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.training_duration.$error,}" placeholder="Input Training Duration"/>
                <template v-if="validate.training_duration.$error">
                  <div v-for="(error, index) in validate.training_duration.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-5" class="flex flex-col w-full sm:flex-row">Title
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-5" v-model.trim="validate.title.$model" class="w-full" type="text" name="title":class="{ 'border-danger': validate.title.$error,}" placeholder="Input Title"/>
                <template v-if="validate.title.$error">
                  <div v-for="(error, index) in validate.title.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-5" class="flex flex-col w-full sm:flex-row">Function
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-5" v-model.trim="validate.function.$model" class="w-full" type="text" name="function":class="{ 'border-danger': validate.function.$error,}" placeholder="Input Function"/>
                <template v-if="validate.function.$error">
                  <div v-for="(error, index) in validate.function.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-5" class="flex flex-col w-full sm:flex-row">Business
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-5" v-model.trim="validate.business.$model" class="w-full" type="text" name="business":class="{ 'border-danger': validate.business.$error,}" placeholder="Input Business"/>
                <template v-if="validate.business.$error">
                  <div v-for="(error, index) in validate.business.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-13">Signature</FormLabel>
                <FormInput id="crud-form-13" type="file" class="w-full" placeholder="Input Signature"
                    multiple @change="handleFileChange" />
                <template v-if="validate.signature.$error">
                  <div v-for="(error, index) in validate.signature.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        
        <div class="mt-5 text-right px-4 py-2">
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
          <div class="font-medium">Training Attendence Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Training Attendence Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
