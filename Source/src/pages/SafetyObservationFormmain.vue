<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
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
        auditor:'',
        plant_name:'',
        location:'',
        audit_date:'',
        category:'',
        problem_description:'',
        problematic_progressive_images:[] as File[],
        root_cause:'',
        resp_department:'',
        owner_department:'',
        improvement_actions:'',
        due_date:'',
        priority_type:'',
});
const router = useRouter();


const categories = ref(["1", "3"]);
const editorConfig = {
  toolbar: {
    items: ["bold", "italic", "link"],
  },
};
const editorData = ref("");

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.problematic_progressive_images = Array.from(input.files);
  }
};

const rules = {
        auditor: {required,minLength: minLength(3),},
        plant_name: {required,},
        location: { required, minLength: minLength(3),},
        audit_date: {required },
        problematic_progressive_images: {required },
        category: { required, minLength: minLength(3),},
        problem_description: { required, minLength: minLength(3),},
        root_cause: { required, minLength: minLength(3),},
        resp_department: { required, minLength: minLength(3),},
        owner_department: { required, minLength: minLength(3),},
        improvement_actions: { required, minLength: minLength(3),},
        due_date: { required, minLength: minLength(3),},
        priority_type: { required, minLength: minLength(3),},
};

const validate = useVuelidate(rules, toRefs(formData));


const submitForm = async () => {
    formData.problem_description = editorData.value;
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
            if (key !== 'problematic_progressive_images') {
                form.append(key, formData[key] as string);
            }
            });
            formData.problematic_progressive_images.forEach((file, index) => {
            form.append(`problematic_progressive_images[${index}]`, file);
            });

            try {
                let  url = config.baseURL+'/api/v1/safety';
                const response = await axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                console.log('Form submitted successfully:', response.data);
                if (response.data !== undefined) {
                    router.push({ name: 'safety-observation-data-list' });
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

</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Add Safety Observationt</h2>
  </div>

  <div class="flex flex-wrap items-center justify-between w-full">
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1" class="flex flex-col w-full sm:flex-row">Auditor
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-1" v-model.trim="validate.auditor.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.auditor.$error,}" placeholder="Input Auditor"/>
                <template v-if="validate.auditor.$error">
                  <div v-for="(error, index) in validate.auditor.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>  
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-2" class="flex flex-col w-full sm:flex-row">Plant Name
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required</span>
                </FormLabel>
                <FormInput id="crud-form-2" v-model.trim="validate.plant_name.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.plant_name.$error,}" placeholder="Input Plant Name"/>
                <template v-if="validate.plant_name.$error">
                  <div v-for="(error, index) in validate.plant_name.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
            
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-3" class="flex flex-col w-full sm:flex-row">Location
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-3" v-model.trim="validate.location.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.location.$error,}" placeholder="Input Location"/>
                <template v-if="validate.location.$error">
                  <div v-for="(error, index) in validate.location.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-4" class="flex flex-col w-full sm:flex-row">Audit Date
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required</span>
                </FormLabel>
                <FormInput id="crud-form-4" v-model.trim="validate.audit_date.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.audit_date.$error,}" placeholder="Input Audit Date"/>
                <template v-if="validate.audit_date.$error">
                  <div v-for="(error, index) in validate.audit_date.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-5" class="flex flex-col w-full sm:flex-row">Category
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-5" v-model.trim="validate.category.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.category.$error,}" placeholder="Input Category"/>
                <template v-if="validate.category.$error">
                  <div v-for="(error, index) in validate.category.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-7" class="flex flex-col w-full sm:flex-row">Resp Department
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-7" v-model.trim="validate.resp_department.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.resp_department.$error,}" placeholder="Input Resp Department"/>
                <template v-if="validate.resp_department.$error">
                  <div v-for="(error, index) in validate.resp_department.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-8" class="flex flex-col w-full sm:flex-row">Owner Department
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-8" v-model.trim="validate.owner_department.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.owner_department.$error,}" placeholder="Input Owner Department"/>
                <template v-if="validate.owner_department.$error">
                  <div v-for="(error, index) in validate.owner_department.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-9" class="flex flex-col w-full sm:flex-row">Improvement Actions
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-9" v-model.trim="validate.improvement_actions.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.improvement_actions.$error,}" placeholder="Input Improvement Actions"/>
                <template v-if="validate.improvement_actions.$error">
                  <div v-for="(error, index) in validate.improvement_actions.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-10" class="flex flex-col w-full sm:flex-row">Due Date
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-10" v-model.trim="validate.due_date.$model" class="w-full" type="date" name="name":class="{ 'border-danger': validate.due_date.$error,}" placeholder="Input Due Date"/>
                <template v-if="validate.due_date.$error">
                  <div v-for="(error, index) in validate.due_date.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-11" class="flex flex-col w-full sm:flex-row">Priority Type
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <FormInput id="crud-form-11" v-model.trim="validate.priority_type.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.priority_type.$error,}" placeholder="Input Priority Type"/>
                <template v-if="validate.priority_type.$error">
                  <div v-for="(error, index) in validate.priority_type.$errors" :key="index" class="mt-2 text-danger">
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
                <FormLabel htmlFor="crud-form-13">Problematic Progressive Images</FormLabel>
                <FormInput id="crud-form-13" type="file" class="w-full" placeholder="Input Problematic Progressive Images"
                    multiple @change="handleFileChange" />
                <template v-if="validate.problematic_progressive_images.$error">
                  <div v-for="(error, index) in validate.problematic_progressive_images.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full">
          <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-5" class="flex flex-col w-full sm:flex-row">Problem Description
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <ClassicEditor v-model="editorData" :class="{ 'border-danger': validate.problem_description.$error,}" :config="editorConfig" />
                <template v-if="validate.problem_description.$error">
                  <div v-for="(error, index) in validate.problem_description.$errors" :key="index" class="mt-2 text-danger">
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
