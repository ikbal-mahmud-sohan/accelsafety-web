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
import { getToken } from './../auth/setToken'
import Table from '@/components/Base/Table';



// Define your state using the reactive function
const state = reactive({
  employeeData: [] as Array<any>,
  trainingTopicData: [] as Array<any>,
  isTraining: true,
  isQuestionAns: false,
  viewData: [] as Array<any>,
  getTrainingData: '',
  token: getToken(),
});

import {
  FormInput,
  FormLabel,
  FormSwitch,
  InputGroup,
} from "@/components/Base/Form";

const formData = reactive({
    training_topic_id:'',
    questions:'',
    answer:'',
    fake_answer_1:'',
    fake_answer_2:'',
    fake_answer_3:'',
});
const router = useRouter();

interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const selectedtrainingTopic = ref("");

const rules = {
  
      training_topic_id: {required},
      questions: {required},
      answer: {required},
      fake_answer_1: {required},
      fake_answer_2: {required},
      fake_answer_3: {required},
       
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
  if (validate.value.$invalid) {
    FailedPopUp();
  } else {
    try {
      const url = config.baseURL + '/api/v1/question-answer';
      const response = await axios.post(url, formData,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if (response.data != undefined) {
        SuccessPopUp();
        fetchData();
      }
    } catch (err) {
      FailedPopUp();
      const error = err as AxiosError<BackendErrorResponse>;
      if (error.response) {
        const backendError = error.response.data;
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

function selectTraining(){
  formData.training_topic_id = String(selectedtrainingTopic.value);;
  state.isTraining = false
  state.isQuestionAns = true
  fetchData();
  fetchTraininng();
}

const fetchTrainingTopicData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/trainingTopics';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.trainingTopicData = response.data.data;
    console.log("sohan 2",state.trainingTopicData)

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchData = async () => {
  try {
   let  url = `${config.baseURL}/api/v1/question-answer-list-trn-id/${formData.training_topic_id}`;
    const response = await axios.get(url, {
                headers: {
                    'Authorization': state.token,
                },
                });
    state.viewData = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchTraininng = async () => {
  try {
   let  url = `${config.baseURL}/api/v1/trainingTopics/${formData.training_topic_id}`;
    const response = await axios.get(url, {
                headers: {
                    'Authorization': state.token,
                },
                });
    state.getTrainingData = response.data.data.name;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchTrainingTopicData();
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Question Answer</h2>
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
          Please create some thoughtful and well-structured questions for the exam.
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
    <div v-if="state.isTraining" class="col-span-11 intro-y 2xl:col-span-9">
      
      <div class="p-5 mt-5 intro-y box">
        <div
          class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400 uppercase">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Select the training topic
          </div>
          <div class="mt-5">
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Training Topic</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    The unique ID of the training topic assigned to the employee.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <select id="crud-form-6" v-model="selectedtrainingTopic" class="w-full border border-gray-300 rounded-lg text-sm">
                  <option value="" disabled>Select Training</option>
                  <option v-for="(data, index) in state.trainingTopicData" :key="index" :value="data.id">{{ data.name }}</option>
                  <!-- Add more options as needed -->
                </select>
              </div>
            </FormInline>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <router-link :to="{ name: 'dashboard-overview-1' }">
                  <Button type="button" class="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52">
                    Cancel
                  </Button>
                </router-link>
        <Button variant="primary" type="button" class="w-full py-3 md:w-52" @click="selectTraining">
          Next
        </Button>
      </div>
    </div>
    <div v-if="state.isQuestionAns" class="col-span-11 intro-y 2xl:col-span-9">
      <div class="p-5 mt-5 intro-y box">
        <div v-if="Array.isArray(state.viewData) && state.viewData.length !== 0" class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 my-4" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Question List
          </div>
          <div class="mt-5">
            <Table class="border-spacing-y-[10px] border-separate -mt-2">
        <Table.Thead>
          <Table.Tr>
            <Table.Th class="text-left border-b-0 whitespace-nowrap">No.</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap">Questions</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap">Answer</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap">Fake Answer 1</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap">Fake Answer 2</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap">Fake Answer 3</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr v-for="(data, index) in state.viewData" :key="index" class="intro-x">
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ index + 1 }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ data.questions }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ data.answer }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ data.fake_answer_1 }}
            </Table.Td>
            <Table.Td class="box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ data.fake_answer_2 }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ data.fake_answer_3 }}
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>     
          </div>
        </div>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-sm font-medium border-b border-slate-200/60 dark:border-darkmode-400 uppercase">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Make a smart question for
            <span class="ml-1 text-gray-400 font-semibold">{{ state.getTrainingData }}</span>
          </div>
          <div class="mt-5">
            <div class="flex flex-wrap">
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap">
                          <FormLabel class="xl:w-40 ">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium">Training Topic</div>
                              </div>
                              <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                Enter the question for the exam
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0 cursor-not-allowed">
                            <FormInput id="crud-form-12" disabled="true" v-model.trim="validate.training_topic_id.$model" class="w-full cursor-not-allowed" type="text" name="name" :class="{ 'border-danger': validate.training_topic_id.$error,}"/>
                            <p class="text-right mt-2 text-gray-500"> Required, at least 3 characters </p>
                          </div>
                        </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap">
                          <FormLabel class="xl:w-40 ">
                            <div class="text-left">
                              <div class="flex items-center">
                                <div class="font-medium">Question</div>
                              </div>
                              <div class="mt-3 text-xs leading-relaxed text-slate-500">
                                Enter the question for the exam
                              </div>
                            </div>
                          </FormLabel>
                          <div class="flex-1 w-full mt-3 xl:mt-0">
                            <FormInput id="crud-form-12" v-model.trim="validate.questions.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.questions.$error,}" placeholder="Input Questions"/>
                            <template v-if="validate.questions.$error">
                              <div v-for="(error, index) in validate.questions.$errors" :key="index" class="mt-2 text-danger">
                                {{ error.$message }}
                              </div>
                            </template>
                            <p class="text-right mt-2 text-gray-500"> Required, at least 3 characters </p>
                          </div>
                        </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap">
                        <FormLabel class="xl:w-40 ">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">Answer</div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Enter the right answer
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.answer.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.answer.$error,}" placeholder="Input answer"/>
                          <template v-if="validate.answer.$error">
                            <div v-for="(error, index) in validate.answer.$errors" :key="index" class="mt-2 text-danger">
                              {{ error.$message }}
                            </div>
                          </template>
                          <p class="text-right mt-2 text-gray-500"> Required, at least 3 characters </p>
                        </div>
                      </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap">
                        <FormLabel class="xl:w-40 ">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">Fake Answer 1</div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Fake answer for options
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.fake_answer_1.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.fake_answer_1.$error,}" placeholder="Input fake answer 1"/>
                          <template v-if="validate.fake_answer_1.$error">
                            <div v-for="(error, index) in validate.fake_answer_1.$errors" :key="index" class="mt-2 text-danger">
                              {{ error.$message }}
                            </div>
                          </template>
                          <p class="text-right mt-2 text-gray-500"> Required, at least 3 characters </p>
                        </div>
                      </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap">
                        <FormLabel class="xl:w-40 ">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">fake answer 2</div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Fake answer for options
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.fake_answer_2.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.fake_answer_2.$error,}" placeholder="Input fake answer 2"/>
                          <template v-if="validate.fake_answer_2.$error">
                            <div v-for="(error, index) in validate.fake_answer_2.$errors" :key="index" class="mt-2 text-danger">
                              {{ error.$message }}
                            </div>
                          </template>
                          <p class="text-right mt-2 text-gray-500"> Required, at least 3 characters </p>
                        </div>
                      </FormInline>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap">
                        <FormLabel class="xl:w-40 ">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">fake answer 3</div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Fake answer for options
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <FormInput id="crud-form-12" v-model.trim="validate.fake_answer_3.$model" class="w-full" type="text" name="name":class="{ 'border-danger': validate.fake_answer_3.$error,}" placeholder="Input fake answer 3"/>
                          <template v-if="validate.fake_answer_3.$error">
                            <div v-for="(error, index) in validate.fake_answer_3.$errors" :key="index" class="mt-2 text-danger">
                              {{ error.$message }}
                            </div>
                          </template>
                          <p class="text-right mt-2 text-gray-500"> Required, at least 3 characters </p>
                        </div>
                      </FormInline>
                    </div>
                </div>
                
                
            </div> 
            
          </div>
        </div>
      </div>
     
      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <router-link :to="{ name: 'dashboard-overview-1' }">
                  <Button type="button" class="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52">
                    Exit
                  </Button>
                </router-link>
        
        <Button variant="primary" type="button" class="w-full py-3 md:w-52" @click="submitForm">
          Add Question
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
            <a href="">Add Questions and Answer</a>
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
              To create effective questions, focus on a single concept and ensure clarity to avoid confusion.
            </div>
            <div class="mt-2">
              Use concise language that encourages critical thinking and engagement.
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
          <div class="font-medium">Questions and answer success!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Questions and answer failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
