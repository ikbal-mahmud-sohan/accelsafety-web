<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
import axios, { AxiosError } from 'axios';
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
    remarks: '',
    verified_image:[] as File[]
});
const router = useRouter();
const route = useRoute();
const editorData = ref("");

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

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.verified_image = Array.from(input.files);
  }
};

const rules = {
    remarks: {required,minLength: minLength(3),},
    verified_image: {required,},
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
    formData.remarks = editorData.value;
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
        FailedPopUp()
    } else {
        const form = new FormData();
            (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
            if (key !== 'verified_image') {
                form.append(key, formData[key] as string);
            }
            });
            formData.verified_image.forEach((file, index) => {
            form.append(`verified_image[${index}]`, file);
            });
            let id = route.params.id;
            let sID =id.toString()
            let url = config.baseURL+'/api/v1/accident/'+sID;
            try {
                const response = await axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                if (response.data !== undefined) {
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
       
    }
};

// Ext Function 
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
    <h2 class="mr-auto text-lg font-medium">Update Accident</h2>
  </div>

  <div class="flex flex-wrap items-center justify-between w-full">
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-13">Corrective Image</FormLabel>
                <FormInput id="crud-form-13" type="file" class="w-full" placeholder="Input Corrective Image"
                    multiple @change="handleFileChange" />
                <template v-if="validate.verified_image.$error">
                  <div v-for="(error, index) in validate.verified_image.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div>
        </div>
        <div class="w-full">
          <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-5" class="flex flex-col w-full sm:flex-row">Remarks
                  <span class="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">Required, at least 3 characters</span>
                </FormLabel>
                <ClassicEditor v-model="editorData" :class="{ 'border-danger': validate.remarks.$error,}" :config="editorConfig" />
                <template v-if="validate.remarks.$error">
                  <div v-for="(error, index) in validate.remarks.$errors" :key="index" class="mt-2 text-danger">
                    {{ error.$message }}
                  </div>
                </template>
            </div> 
        </div>
        <div class="w-full px-4 py-4">
        <p v-if="backendErrors.message" class="text-red-500 text-sm">{{ backendErrors.message }}</p>
        <template v-if="backendErrors.errors">
            <div v-for="(messages, field) in backendErrors.errors" :key="field" class="mt-2 text-danger">
            <p><strong>{{ field }}:</strong></p>
            <ul>
                <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
            </ul>
            </div>
        </template>
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
  <Notification id="success-notification-content" class="flex hidden">
        <Lucide icon="CheckCircle" class="text-success" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Safety Observationt Update success!</div>
        </div>
      </Notification>
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Safety Observationt Update failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
</template>
