<script setup lang="ts">
import { ref, reactive,toRefs,onMounted } from 'vue';
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
import { Menu, Popover } from "@/components/Base/Headless";
import Alert from "@/components/Base/Alert";
import Litepicker from "@/components/Base/Litepicker";
import { getToken } from '../auth/setToken'



// Define your state using the reactive function

import {
  FormInput,
  FormLabel,
  FormCheck,
} from "@/components/Base/Form";

const formData = reactive({
      project_name:'',
      project_code:'',
      checklist_no:'',
      date:'',
      make:'',
      model:'',
      isgec:'',
      concrete_mixer_des_1:'',
      concrete_mixer_des_2:'',
      concrete_mixer_des_3:'',
      concrete_mixer_des_4:'',
      concrete_mixer_des_5:'',
      concrete_mixer_des_6:'',
      concrete_mixer_des_7:'',
      concrete_mixer_des_8:'',
      concrete_mixer_des_9:'',
      concrete_mixer_des_10:'',
      concrete_mixer_des_11:'',
      concrete_mixer_des_12:'',
      concrete_mixer_des_13:'',
      concrete_mixer_des_14:'',
      is_concrete_mixer_1:'',
      is_concrete_mixer_2:'',
      is_concrete_mixer_3:'',
      is_concrete_mixer_4:'',
      is_concrete_mixer_5:'',
      is_concrete_mixer_6:'',
      is_concrete_mixer_7:'',
      is_concrete_mixer_8:'',
      is_concrete_mixer_9:'',
      is_concrete_mixer_10:'',
      is_concrete_mixer_11:'',
      is_concrete_mixer_12:'',
      is_concrete_mixer_13:'',
      is_concrete_mixer_14:'',
      concrete_mixer_remarks_1:'',
      concrete_mixer_remarks_2:'',
      concrete_mixer_remarks_3:'',
      concrete_mixer_remarks_4:'',
      concrete_mixer_remarks_5:'',
      concrete_mixer_remarks_6:'',
      concrete_mixer_remarks_7:'',
      concrete_mixer_remarks_8:'',
      concrete_mixer_remarks_9:'',
      concrete_mixer_remarks_10:'',
      concrete_mixer_remarks_11:'',
      concrete_mixer_remarks_12:'',
      concrete_mixer_remarks_13:'',
      concrete_mixer_remarks_14:'',
      fit:'',
      checked_by: '',
      reviewed_by: '',
      checked_by_date: '',
      reviewed_by_date: '',
      checked_by_signature: [] as File[],
      reviewed_by_signature: [] as File[],
});
const router = useRouter();
const checkedbydate = ref("");
const reviewedbydate = ref("");
const jcbdate = ref("");
const ishvcomplied1 = ref("");
const ishvcomplied2 = ref("");
const ishvcomplied3 = ref("");
const ishvcomplied4 = ref("");
const ishvcomplied5 = ref("");
const ishvcomplied6 = ref("");
const ishvcomplied7 = ref("");
const ishvcomplied8 = ref("");
const ishvcomplied9 = ref("");
const ishvcomplied10 = ref("");
const ishvcomplied11 = ref("");
const ishvcomplied12 = ref("");
const ishvcomplied13 = ref("");
const ishvcomplied14 = ref("");
const fitUnfit = ref("");
const isgeccon = ref("");


interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const selectedtrainingTopic = ref("");
const selectedEmployee = ref("");

const rules = {
      project_name:{required},
      project_code:{required},
      checklist_no:{required},
      date:{required},
      make:{required},
      model:{required},
      isgec:{required},
      checked_by:{required},
      reviewed_by:{required},
      checked_by_date:{required},
      reviewed_by_date:{required},
      checked_by_signature:{required},
      reviewed_by_signature:{required},
       
};
const state = reactive({
  token: getToken(),

});

const validate = useVuelidate(rules, toRefs(formData));
const backendErrors = reactive<{
    message: string;
    errors: { [key: string]: string[] };
}>({
    message: '',
    errors: {}
});

const checkedbysignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.checked_by_signature = Array.from(input.files);
  }
};
const reviewedbysignature = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.reviewed_by_signature = Array.from(input.files);
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

const submitForm = async () => {
   formData.concrete_mixer_des_1 = 'Engine and rotating part should be properly covered';
   formData.concrete_mixer_des_2 = 'Track frame should be in good and working condition';
   formData.concrete_mixer_des_3 = 'Crawler belt and shoes should be in good condition';
   formData.concrete_mixer_des_4 = 'Boom and arm should be free from defects like corrosion, bend, etc.';
   formData.concrete_mixer_des_5 = 'Hydraulic cylinder and hoses should be in good';
   formData.concrete_mixer_des_6 = 'Bucket, cutter pins should be Bucket, cutter pins should be free from defects, e.g. free from defects, e.g.,';
   formData.concrete_mixer_des_7 = 'Teeth should be free from defects, e.g., damage, corrosion, bend, etc';
   formData.concrete_mixer_des_8 = 'Side mirror should be in good condition';
   formData.concrete_mixer_des_9 = 'Head & tail light and indicators are in working condition';
   formData.concrete_mixer_des_10 = 'Wind shield/glass should be in proper condition';
   formData.concrete_mixer_des_11 = 'Wiper should be in running condition.';
   formData.concrete_mixer_des_12 = 'Swing horn should be in good condition.';
   formData.concrete_mixer_des_13 = 'Fire extinguisher in operator cabin.';
   formData.concrete_mixer_des_14 = 'Operator have suitable licence/experience certificate.';
  formData.checked_by_date = checkedbydate.value;
  formData.reviewed_by_date = reviewedbydate.value;
  formData.date = jcbdate.value;
  formData.is_concrete_mixer_1 = ishvcomplied1.value;
  formData.is_concrete_mixer_2 = ishvcomplied2.value;
  formData.is_concrete_mixer_3 = ishvcomplied3.value;
  formData.is_concrete_mixer_4 = ishvcomplied4.value;
  formData.is_concrete_mixer_5 = ishvcomplied5.value;
  formData.is_concrete_mixer_6 = ishvcomplied6.value;
  formData.is_concrete_mixer_7 = ishvcomplied7.value;
  formData.is_concrete_mixer_8 = ishvcomplied8.value;
  formData.is_concrete_mixer_9 = ishvcomplied9.value;
  formData.is_concrete_mixer_10 = ishvcomplied10.value;
  formData.is_concrete_mixer_11 = ishvcomplied11.value;
  formData.is_concrete_mixer_12 = ishvcomplied12.value;
  formData.is_concrete_mixer_13 = ishvcomplied13.value;
  formData.is_concrete_mixer_14 = ishvcomplied14.value;
  formData.fit = fitUnfit.value;
  formData.isgec = isgeccon.value;

  validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
      FailedPopUp();
    } else {
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
             if (value instanceof File) {
              form.append(key, value);
            } else if (Array.isArray(value)) {
              value.forEach((item) => {
                form.append(`${key}[]`, item);
              });
            } else {
              form.append(key, String(value));
            }
          });
            try {
                let  url = config.baseURL+'/api/v1/concrete-pump-checklists';
                const response = await axios.post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,
                },
                });
                SuccessPopUp();
                if (response.data !== undefined) {
                    router.push({ name: 'hse-concrete-pump-checklists' });
                }
        
            } catch (error) {
              FailedPopUp();
                console.error('Error submitting form:', error);
            }
        
    }
};

// Fetch data from the API and update the state

onMounted(() => {
  
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium"> Assessment of Generalized Anxiety Disorder</h2>
  </div>
  <div class="grid grid-cols-11 pb-20 mt-5 gap-x-6">
    <!-- BEGIN: Notification -->
    <Alert
      variant="primary"
      dismissible
      class="col-span-11 mb-6 intro-y box dark:border-darkmode-600"
      v-slot="{ dismiss }"
    >
      <div class="flex items-start">
        <span>
          <Lucide icon="Info" class="w-4 h-4 mr-2 mt-0.5" />
        </span>
        <span calss="space-y-1">
          <p class="pb-2"><strong>Important Note:</strong></p>
          <p>This tool is intended to help you begin to explore whether the feelings, thoughts, or behaviors you may be experiencing could be anxiety.</p>
          <p>It is not intended to take the place of a professional evaluation or to serve as a diagnosis.</p>
          <p>It does not replace medical advice from your health care provider because your experience may differ from that of the typical patient.</p>
          <p>This assessment tool is made from Depression Toolkit from University of Michigan Depression Center</p>
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
      <div class="p-0 md:p-5 mt-5 intro-y box">
        <div
          class=""
        >
          
          <div class="p-0 md:p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Generalized Anxiety Disorder Assessment
          </div>
          <div class="mt-5">
              <div class="flex flex-wrap items-center">
                <div class="px-2 w-full">
                    <div class="px-4 pt-4">
                      <div class="font-medium">
                        1. Feeling nervous, anxious, or on edge
                      </div>
                    </div>
                </div>
                
                <div class="px-2 w-full">
                    <div class="px-4 p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied1" type="radio" name="1" value="" />
                              <FormCheck.Label htmlFor="radio-switch-1">
                                Not at all
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied1" type="radio" name="1" value="" />
                              <FormCheck.Label htmlFor="radio-switch-2">
                                Several days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="1" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                More than half the days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="1" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                Nearly every day
                              </FormCheck.Label>
                          </FormCheck>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="px-2 w-full">
                    <div class="px-4 pt-4">
                      <div class="font-medium">
                        2. Not being able to stop or control worrying 
                      </div>
                    </div>
                </div>
                
                <div class="px-2 w-full">
                    <div class="px-4 p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied1" type="radio" name="2" value="" />
                              <FormCheck.Label htmlFor="radio-switch-1">
                                Not at all
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied1" type="radio" name="2" value="" />
                              <FormCheck.Label htmlFor="radio-switch-2">
                                Several days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="2" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                More than half the days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="2" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                Nearly every day
                              </FormCheck.Label>
                          </FormCheck>
                      </div>
                    </div>
                </div>
              </div> 
              <div class="flex flex-wrap items-center">
                <div class="px-2 w-full">
                    <div class="px-4 pt-4">
                      <div class="font-medium">
                        3. Worrying too much about different things
                      </div>
                    </div>
                </div>
                
                <div class="px-2 w-full">
                    <div class="px-4 p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied1" type="radio" name="3" value="" />
                              <FormCheck.Label htmlFor="radio-switch-1">
                                Not at all
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied1" type="radio" name="3" value="" />
                              <FormCheck.Label htmlFor="radio-switch-2">
                                Several days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="3" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                More than half the days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="3" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                Nearly every day
                              </FormCheck.Label>
                          </FormCheck>
                      </div>
                    </div>
                </div>
              </div>
              <div class="flex flex-wrap items-center">
                <div class="px-2 w-full">
                    <div class="px-4 pt-4">
                      <div class="font-medium">
                        4. Trouble relaxing 
                      </div>
                    </div>
                </div>
                
                <div class="px-2 w-full">
                    <div class="px-4 p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied1" type="radio" name="4" value="" />
                              <FormCheck.Label htmlFor="radio-switch-1">
                                Not at all
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied1" type="radio" name="4" value="" />
                              <FormCheck.Label htmlFor="radio-switch-2">
                                Several days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="4" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                More than half the days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="4" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                Nearly every day
                              </FormCheck.Label>
                          </FormCheck>
                      </div>
                    </div>
                </div>
              </div>
              <div class="flex flex-wrap items-center">
                <div class="px-2 w-full">
                    <div class="px-4 pt-4">
                      <div class="font-medium">
                        5. Being so restless that it’s hard to sit still
                      </div>
                    </div>
                </div>
                
                <div class="px-2 w-full">
                    <div class="px-4 p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied1" type="radio" name="5" value="" />
                              <FormCheck.Label htmlFor="radio-switch-1">
                                Not at all
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied1" type="radio" name="5" value="" />
                              <FormCheck.Label htmlFor="radio-switch-2">
                                Several days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="5" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                More than half the days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="5" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                Nearly every day
                              </FormCheck.Label>
                          </FormCheck>
                      </div>
                    </div>
                </div>
              </div>
              <div class="flex flex-wrap items-center">
                <div class="px-2 w-full">
                    <div class="px-4 pt-4">
                      <div class="font-medium">
                        6. Becoming easily annoyed or irritable 
                      </div>
                    </div>
                </div>
                
                <div class="px-2 w-full">
                    <div class="px-4 p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied1" type="radio" name="6" value="" />
                              <FormCheck.Label htmlFor="radio-switch-1">
                                Not at all
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied1" type="radio" name="6" value="" />
                              <FormCheck.Label htmlFor="radio-switch-2">
                                Several days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="6" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                More than half the days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="6" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                Nearly every day
                              </FormCheck.Label>
                          </FormCheck>
                      </div>
                    </div>
                </div>
              </div>
              <div class="flex flex-wrap items-center">
                <div class="px-2 w-full">
                    <div class="px-4 pt-4">
                      <div class="font-medium">
                        7. Feeling afraid as if something awful might happen 
                      </div>
                    </div>
                </div>
                
                <div class="px-2 w-full">
                    <div class="px-4 p-4">
                      <div class="flex flex-col justify-between mt-2 sm:flex-row">
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-1" v-model="ishvcomplied1" type="radio" name="7" value="" />
                              <FormCheck.Label htmlFor="radio-switch-1">
                                Not at all
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="mr-2">
                              <FormCheck.Input id="radio-switch-2" v-model="ishvcomplied1" type="radio" name="7" value="" />
                              <FormCheck.Label htmlFor="radio-switch-2">
                                Several days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="7" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                More than half the days
                              </FormCheck.Label>
                          </FormCheck>
                          <FormCheck class="">
                              <FormCheck.Input id="radio-switch-3" v-model="ishvcomplied1" type="radio" name="7" value="" />
                              <FormCheck.Label htmlFor="radio-switch-3">
                                Nearly every day
                              </FormCheck.Label>
                          </FormCheck>
                      </div>
                    </div>
                </div>
              </div>
          </div>
          <div class="mt-5 flex justify-center items-center">
            <img class="w-1/3 pt-10 sm:pt-16 lg:pt-20" src="../assets/images/icon_02/depression.png" alt="">
          </div>
        </div>
      </div>
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
      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <Button
          type="button"class="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52">
          Cancel
        </Button>
        <Button variant="primary" type="button" class="w-full py-3 md:w-52" @click="submitForm">
          Submit
        </Button>
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
            <a href="">Concrete Pump</a>
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
              When filling out the Concrete Pump report, be specific and clear with details, using the correct date format and precise descriptions..
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
          <div class="font-medium">Concrete Pump success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Concrete Pump failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
