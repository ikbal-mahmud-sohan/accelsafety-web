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
import Preview from "@/components/Base/Preview";
import Litepicker from "@/components/Base/Litepicker";


import {
  FormInput,
  FormLabel,
  FormSwitch,
  InputGroup,
} from "@/components/Base/Form";

const formData = reactive({
  month: '',
  date: '',
  name: '',
  designation: '',
  supervisor: '',
  department: '',
  type_of_accident: '',
  description: '',
  zone_location: '',
  precise_location: '',
  injury_type: '',
  affected_body_parts: '',
  property_damaged: 0,
  root_cause: '',
  action: '',
  days_lost: 0,
  type_of_victim_employee: '',
  responsible_name: '',
  deadline: '',
  type_of_employee:'',
  site_name:'',
  time_date:'',
  incident_category:'',
  immidiate_cause:'',
  incident_location:'',
  incident_descriptions:'',
  investigation_lead:'',
  attachment:[] as File[],
});
const router = useRouter();

const categories = ref(["1", "3"]);
const editorConfig = {
  toolbar: {
    items: ['heading','undo', 'redo', 'bold', 'italic', 'link', 'numberedList', 'bulletedList','fontsize'],
  },
};
interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const editorData = ref("");
const date = ref("");
const deadlinedate = ref("");
const time_date = ref("");
const selectedIncidentCategory = ref("");
const rules = {
        month: {required},
        date: {required,},
        // name: { required, minLength: minLength(3),},
        // designation: {required },
        // supervisor: {required },
        // department: {required, minLength: minLength(3) },
        type_of_accident: { required, minLength: minLength(3),},
        description: { required, minLength: minLength(3),},
        zone_location: { required, minLength: minLength(3),},
        precise_location: { required, minLength: minLength(3),},
        injury_type: { required, minLength: minLength(3),},
        affected_body_parts: { required, minLength: minLength(3),},
        property_damaged: { required},
        root_cause: { required, minLength: minLength(3),},
        action: { required, minLength: minLength(3),},
        days_lost: { required},
        type_of_victim_employee: { required, minLength: minLength(3),},
        responsible_name: { required, minLength: minLength(3),},
        deadline: { required},
        type_of_employee: { required},
        site_name: { required},
        time_date: { required},
        incident_category: { required},
        immidiate_cause: { required},
        incident_location: { required},
        incident_descriptions: { required},
        investigation_lead: { required},
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
  formData.date = date.value;
  formData.deadline = deadlinedate.value;
  formData.time_date = time_date.value;
  formData.description = editorData.value;
  formData.incident_category = selectedIncidentCategory.value;
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
        FailedPopUp();
    } else {

   try {
    const form = new FormData();
            (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
            if (key !== 'attachment') {
                form.append(key, formData[key] as string);
            }
            });
            formData.attachment.forEach((file, index) => {
            form.append(`attachment[${index}]`, file);
            });
            console.log("form",form)
   let  url = config.baseURL+'/api/v1/accident';
    const response = await axios.post(url, form);
    console.log('Form submitted successfully:', response.data);
    if(response.data != undefined){
        SuccessPopUp();
      router.push({ name: 'accident-data-list' });
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
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.attachment = Array.from(input.files);
  }
};
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Add Accident</h2>
  </div>

  <div class="flex flex-wrap items-center justify-between w-full">
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1" class="flex flex-col w-full sm:flex-row">Month
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-1" v-model.trim="validate.month.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.month.$error,}" placeholder="Input Month"/>
                <template v-if="validate.month.$error">
                  <div v-for="(error, index) in validate.month.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-2" class="flex flex-col w-full sm:flex-row">Date
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <!-- <FormInput id="crud-form-2" v-model.trim="validate.date.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.date.$error,}" placeholder="Input Date"/> -->
                <!-- sohan  -->
                <Preview class="intro-y box" v-slot="{ toggle }">
                  <Preview.Panel>
                      <div class="relative w-full mx-auto">
                        <div
                          class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                          <Lucide icon="Calendar" class="w-4 h-4" />
                        </div>
                        <Litepicker
                          v-model="date"
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
                            v-model="date"
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
                <!-- sohan  -->
                <template v-if="validate.date.$error">
                  <div v-for="(error, index) in validate.date.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <!-- <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-3" class="flex flex-col w-full sm:flex-row">Name
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-3" v-model.trim="validate.name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.name.$error,}" placeholder="Input Name"/>
                <template v-if="validate.name.$error">
                  <div v-for="(error, index) in validate.name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-4" class="flex flex-col w-full sm:flex-row">Designation
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-4" v-model.trim="validate.designation.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.designation.$error,}" placeholder="Input Designation"/>
                <template v-if="validate.designation.$error">
                  <div v-for="(error, index) in validate.designation.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
            
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-5" class="flex flex-col w-full sm:flex-row">Supervisor
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-5" v-model.trim="validate.supervisor.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.supervisor.$error,}" placeholder="Input Supervisor"/>
                <template v-if="validate.supervisor.$error">
                  <div v-for="(error, index) in validate.supervisor.$errors" :key="index" class="mt-2 text-danger">
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
            
        </div> -->
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-7" class="flex flex-col w-full sm:flex-row">Type Of Accident
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-7" v-model.trim="validate.type_of_accident.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.type_of_accident.$error,}" placeholder="Input Type Of Accident"/>
                <template v-if="validate.type_of_accident.$error">
                  <div v-for="(error, index) in validate.type_of_accident.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-8" class="flex flex-col w-full sm:flex-row">Zone Location
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-8" v-model.trim="validate.zone_location.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.zone_location.$error,}" placeholder="Input Zone Location"/>
                <template v-if="validate.zone_location.$error">
                  <div v-for="(error, index) in validate.zone_location.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">Precise Location
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.precise_location.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.precise_location.$error,}" placeholder="Input Precise Location"/>
                <template v-if="validate.precise_location.$error">
                  <div v-for="(error, index) in validate.precise_location.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-10" class="flex flex-col w-full sm:flex-row">Injury Type
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-10" v-model.trim="validate.injury_type.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.injury_type.$error,}" placeholder="Input Injury Type"/>
                <template v-if="validate.injury_type.$error">
                  <div v-for="(error, index) in validate.injury_type.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-11" class="flex flex-col w-full sm:flex-row">Affected Body Parts
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-11" v-model.trim="validate.affected_body_parts.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.affected_body_parts.$error,}" placeholder="Input Affected Body Parts"/>
                <template v-if="validate.affected_body_parts.$error">
                  <div v-for="(error, index) in validate.affected_body_parts.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
       
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-12" class="flex flex-col w-full sm:flex-row">Root Cause
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-12" v-model.trim="validate.root_cause.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.root_cause.$error,}" placeholder="Input Root Cause"/>
                <template v-if="validate.root_cause.$error">
                  <div v-for="(error, index) in validate.root_cause.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
       
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-12" class="flex flex-col w-full sm:flex-row">Action
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-12" v-model.trim="validate.action.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.action.$error,}" placeholder="Input Action"/>
                <template v-if="validate.action.$error">
                  <div v-for="(error, index) in validate.action.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>

        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-13" class="flex flex-col w-full sm:flex-row">Days Lost
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-13" v-model.trim="validate.days_lost.$model" class="w-full" type="number" name="name":class="{ 'border-danger': validate.days_lost.$error,}" placeholder="Input Root Cause"/>
                <template v-if="validate.days_lost.$error">
                  <div v-for="(error, index) in validate.days_lost.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-14" class="flex flex-col w-full sm:flex-row">Type Of Victim Employee
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-14" v-model.trim="validate.type_of_victim_employee.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.type_of_victim_employee.$error,}" placeholder="Input Type Of Victim Employee"/>
                <template v-if="validate.type_of_victim_employee.$error">
                  <div v-for="(error, index) in validate.type_of_victim_employee.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-15" class="flex flex-col w-full sm:flex-row">Responsible Name
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-15" v-model.trim="validate.responsible_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.responsible_name.$error,}" placeholder="Input Responsible Name"/>
                <template v-if="validate.responsible_name.$error">
                  <div v-for="(error, index) in validate.responsible_name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-16" class="flex flex-col w-full sm:flex-row">Deadline
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <!-- <FormInput id="crud-form-16" v-model.trim="validate.deadline.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.deadline.$error,}" placeholder="Input Deadline"/> -->
                <Preview class="intro-y box" v-slot="{ toggle }">
                  <Preview.Panel>
                      <div class="relative w-full mx-auto">
                        <div
                          class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                          <Lucide icon="Calendar" class="w-4 h-4" />
                        </div>
                        <Litepicker
                          v-model="deadlinedate"
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
                            v-model="date"
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
                <template v-if="validate.deadline.$error">
                  <div v-for="(error, index) in validate.deadline.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-16" class="flex flex-col w-full sm:flex-row">Type Of Employee
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-16" v-model.trim="validate.type_of_employee.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.type_of_employee.$error,}" placeholder="Input Type Of Employee"/>
                <template v-if="validate.type_of_employee.$error">
                  <div v-for="(error, index) in validate.type_of_employee.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-16" class="flex flex-col w-full sm:flex-row">Site Name
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-16" v-model.trim="validate.site_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.site_name.$error,}" placeholder="Input Site Name"/>
                <template v-if="validate.site_name.$error">
                  <div v-for="(error, index) in validate.site_name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-16" class="flex flex-col w-full sm:flex-row">Time Date
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <!-- <FormInput id="crud-form-16" v-model.trim="validate.time_date.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.time_date.$error,}" placeholder="Input Time Date"/> -->
                <Preview class="intro-y box" v-slot="{ toggle }">
                  <Preview.Panel>
                      <div class="relative w-full mx-auto">
                        <div
                          class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                          <Lucide icon="Calendar" class="w-4 h-4" />
                        </div>
                        <Litepicker
                          v-model="time_date"
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
                            v-model="date"
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
                <template v-if="validate.time_date.$error">
                  <div v-for="(error, index) in validate.time_date.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-16" class="flex flex-col w-full sm:flex-row">Incident Category
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <!-- <FormInput id="crud-form-16" v-model.trim="validate.incident_category.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.incident_category.$error,}" placeholder="Input Incident Category"/> -->
                <select id="crud-form-6" v-model="selectedIncidentCategory" class="w-full border border-gray-300 rounded-lg text-sm  dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80">
                  <option value="" disabled>Select Incident Category</option>
                  <option  value="Fatality">Fatality</option>
                  <option  value="Lts">Lts</option>
                  <option  value="Medica Trisect">Medica Trisect</option>
                  <option  value="Resistance Workdays">Resistance Workdays</option>
                  <option  value="First Aid">First Aid</option>
                </select>
                <template v-if="validate.incident_category.$error">
                  <div v-for="(error, index) in validate.incident_category.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-16" class="flex flex-col w-full sm:flex-row">Immidiate Cause
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-16" v-model.trim="validate.immidiate_cause.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.immidiate_cause.$error,}" placeholder="Input Immidiate Cause"/>
                <template v-if="validate.immidiate_cause.$error">
                  <div v-for="(error, index) in validate.immidiate_cause.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-16" class="flex flex-col w-full sm:flex-row">Incident Location
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-16" v-model.trim="validate.incident_location.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.incident_location.$error,}" placeholder="Input Incident Location"/>
                <template v-if="validate.incident_location.$error">
                  <div v-for="(error, index) in validate.incident_location.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-16" class="flex flex-col w-full sm:flex-row">Incident Descriptions
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-16" v-model.trim="validate.incident_descriptions.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.incident_descriptions.$error,}" placeholder="Input Incident Descriptions"/>
                <template v-if="validate.incident_descriptions.$error">
                  <div v-for="(error, index) in validate.incident_descriptions.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-16" class="flex flex-col w-full sm:flex-row">Investigation Lead
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-16" v-model.trim="validate.investigation_lead.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.investigation_lead.$error,}" placeholder="Input Investigation Lead"/>
                <template v-if="validate.investigation_lead.$error">
                  <div v-for="(error, index) in validate.investigation_lead.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-13">Attachment</FormLabel>
                <FormInput id="crud-form-13" type="file" class="w-full" placeholder="Input Attachment"
                    multiple @change="handleFileChange" />
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-17" class="flex flex-col w-full sm:flex-row">Property Damaged
                </FormLabel>
                <FormSwitch.Input id="crud-form-17" v-model.trim="validate.property_damaged.$model" type="checkbox" />
            </div>

        </div>
        <div class="w-full">
          <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-18" class="flex flex-col w-full sm:flex-row">Description
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <ClassicEditor v-model="editorData" :class="{ 'border-danger': validate.description.$error,}" :config="editorConfig" />
                <template v-if="validate.description.$error">
                  <div v-for="(error, index) in validate.description.$errors" :key="index" class="mt-2 text-danger">
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
          <div class="font-medium">Accident Create success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Accident Create failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
