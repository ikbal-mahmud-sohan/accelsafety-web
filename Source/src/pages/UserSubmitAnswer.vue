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


interface QuestionData {
  questions: string;
  choices: string[];
}

// Define your state using the reactive function
const state = reactive({
  employeeData: [] as Array<any>,
  trainingTopicData: [] as Array<any>,
  answerQuestionData: [] as QuestionData[],
  scoreData: '',
  selectedAnswers: {} as Record<string, string>,
  isTraining: true,
  isQuestionAns: false,
  isScore: false,
  getTrainingData: '',
  token: getToken(),
});

import {
  FormInput,
  FormCheck,
  FormLabel,
  FormSwitch,
  InputGroup,
} from "@/components/Base/Form";

const formData = reactive({
    training_topic_id:'',
    emp_id:'',
    question_answers: {} as Record<string, string>,
});
const router = useRouter();

interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const selectedtrainingTopic = ref("");
const selectedEmployee = ref("");


const rules = {
  
      training_topic_id: {required},
      emp_id: {required},
      question_answers: {required},
       
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
  formData.emp_id = selectedEmployee.value;
  formData.question_answers = state.selectedAnswers;
  validate.value.$touch();
  if (validate.value.$invalid) {
    FailedPopUp();
  } else {
    try {
      const url = config.baseURL + '/api/v1/user-submit-answer';
      const response = await axios.post(url, formData,{
                headers: {
                    'Authorization': state.token,
                },
                });
      if (response.data != undefined) {
        SuccessPopUp();
        state.isTraining = false
        state.isQuestionAns = false
        state.isScore = true
        state.scoreData = response.data.score
        // router.push({ name: 'user-results' });
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
  formData.training_topic_id = String(selectedtrainingTopic.value);
  state.isTraining = false
  state.isQuestionAns = true
  fetchAnswerQuestion();
  fetchTraininng();
}

const fetchEmployeeData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/employee';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.employeeData = response.data.data;

    console.log("sohan 1",state.employeeData)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
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

const fetchAnswerQuestion = async () => {
  try {
    const url = `${config.baseURL}/api/v1/question-answer-list/${formData.training_topic_id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: state.token,
      },
    });

    state.answerQuestionData = response.data;

    // Initialize question_answers in formData as an object
    formData.question_answers = {};
    state.answerQuestionData.forEach((question: any) => {
      formData.question_answers[question.questions] = ''; // Default answer is an empty string
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
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
  fetchEmployeeData();
  fetchTrainingTopicData();
});
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Attend Your Exam</h2>
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
          Stay calm, read each question carefully, and manage your time wisely during the exam.
         
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
            <FormInline class="flex flex-wrap pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center pr-4">
                    <div class="font-medium text-sm text-nowrap flex mt-5 xl:mt-2">Training Topic
                      <span class="relative group cursor-pointer ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                          The unique ID of the training topic assigned to the employee
                        </div>
                      </span>
                    </div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md mt-5 xl:mt-2">
                      Required
                    </div>
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
        <Button variant="primary" type="button" class="w-full py-3 md:w-52" @click="selectTraining">
          Next
        </Button>
      </div>
    </div>
    <div v-if="state.isQuestionAns" class="col-span-11 intro-y 2xl:col-span-9">
      <div class="p-5 mt-5 intro-y box">
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-sm font-medium border-b border-slate-200/60 dark:border-darkmode-400 uppercase">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Choose the correct answer for
            <span class="mx-1 text-gray-400 font-semibold">{{ state.getTrainingData }}</span>
            exam.
          </div>
          <div class="mt-5">
            <div class="flex flex-wrap">
                
                <div class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex flex-wrap">
                        <FormLabel class="xl:w-64 xl:!mr-10">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">Examinee Name</div>
                              <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                Required
                              </div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Enter the full name of the examinee
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                            <select id="crud-form-6" v-model="selectedEmployee"  class="w-full border border-gray-300 rounded-lg text-sm">
                            <option value="" disabled>Select Employee</option>
                            <option v-for="(data, index) in state.employeeData" :key="index" :value="data.emp_id">{{ data.name }}</option>
                          </select>
                          <div class="flex justify-between">
                            <template v-if="validate.emp_id.$error">
                              <div v-for="(error, index) in validate.emp_id.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                                {{ error.$message }}
                              </div>
                            </template>
                          <p class="text-right mt-2 w-full"> Required, at least 3 characters</p>
                        </div>
                      </div>
                        </FormInline>
                    </div>
                </div>
                <div  v-for="(question, index) in state.answerQuestionData" :key="index" class="md:w-1/2 w-full">
                    <div class="px-4 py-2">
                      <FormInline class="flex xl:flex-nowrap flex-wrap">
                        <FormLabel class="xl:w-40 ">
                          <div class="text-left">
                            <div class="flex items-center">
                              <div class="font-medium">{{ question.questions }}</div>
                            </div>
                            <div class="mt-3 text-xs leading-relaxed text-slate-500">
                              Select the answer
                            </div>
                          </div>
                        </FormLabel>
                        <div class="flex-1 w-full mt-3 xl:mt-0">
                          <div class="flex flex-col mt-2 sm:flex-row">
                            <div v-for="(choice, choiceIndex) in question.choices" :key="choiceIndex">
                              <FormCheck  class="mr-2">
                                <FormCheck.Input :id="`question-${index}-choice-${choiceIndex}`" v-model="state.selectedAnswers[question.questions]" type="radio"  :value="choice" />
                                <FormCheck.Label :for="`question-${index}-choice-${choiceIndex}`" >
                                  {{ choice }}
                                </FormCheck.Label>
                            </FormCheck>
                            </div>
                            
                        </div>
                        </div>
                      </FormInline>
                    </div>
                </div>  
                
                
            </div> 
            
          </div>
        </div>
      </div>
     
      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <Button variant="primary" type="button" class="w-full py-3 md:w-52" @click="submitForm">
          Submit
        </Button>
      </div>
      
    </div>
    <div v-if="state.isScore" class="col-span-11 intro-y 2xl:col-span-9">
      
      <div class="p-5 mt-5 intro-y box">
          <p class="text-3xl text-center uppercase">Your Score</p>
          <p class="text-center text-green-600 text-2xl font-semibold py-2">{{ state.scoreData }}</p>
          <div class="flex justify-center">
                <router-link :to="{ name: 'dashboard-overview-1' }">
                  <Button variant="primary" class="mr-2 shadow-md">
                    Back to home
                  </Button>
                </router-link>
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
            <a href="">Examinations</a>
          </li>
          <li
            class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent"
          >
            <a href="" class="text-red-500 font-semibold">5 marks per question.</a>
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
              Don’t spend too much time on any one question; move on and return if needed.
            </div>
            <div class="mt-2">
              Stay focused and avoid distractions to maintain exam flow.
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
          <div class="font-medium">Answer Submited!</div>
        </div>
      </Notification>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <Notification id="failed-notification-content" class="flex items-center hidden">
        <Lucide icon="XCircle" class="text-danger" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Answer Submited failed!</div>
          <div class="mt-1 text-slate-500">Please check the fileld form.</div>
        </div>
      </Notification>
      <!-- END: Failed Notification Content -->
</template>
