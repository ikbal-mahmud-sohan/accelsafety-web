<script setup lang="ts">
import _ from "lodash";
import Button from "@/components/Base/Button";
import { ref, reactive,toRefs,onMounted } from 'vue';
import {
  FormLabel,
} from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import FileIcon from "@/components/Base/FileIcon";
import axios, { AxiosError } from 'axios';
import config from "@/config";
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useRouter } from 'vue-router';
import Toastify from 'toastify-js';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import Alert from "@/components/Base/Alert";
import { getToken } from './../auth/setToken'



// Insert start
const editorConfig = {
  toolbar: {
    items: ['heading','undo', 'redo', 'bold', 'italic', 'link', 'numberedList', 'bulletedList','fontsize'],
  },
};
const editorData = ref("");
const updateeditorData = ref("");
const cvformData = reactive({
        id:'',
        descriptions:'',
        created_by:'',
});
const cvUpdateformData = reactive({
        id:'',
        descriptions:'',
        approved_by:'',
        updated_by:'',
});
const router = useRouter();
const rules = {
        descriptions: {required,minLength: minLength(3),},
};
const validate = useVuelidate(rules, toRefs(cvformData));
const validate2 = useVuelidate(rules, toRefs(cvUpdateformData));

const submitForm = async () => {
  cvformData.descriptions = editorData.value;
  cvformData.created_by = "1";
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
    } else {

            try {
                let  url = config.baseURL+'/api/v1/hse-safety-power-tools';
                const response = await axios.post(url, cvformData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,

                },
                });
                console.log('Form submitted successfully:', response.data);
                state.AddControlVisitorsHSE01 = false;
                fetchDropDownData()
        
            } catch (error) {
                console.error('Error submitting form:', error);
            }
    }
};
const updateForm = async () => {
  cvUpdateformData.descriptions = updateeditorData.value;
  cvUpdateformData.updated_by = "2";

    validate2.value.$touch();
    console.log(validate2.value)
    if (validate2.value.$invalid) {
    } else {

            try {
                let  url = config.baseURL+'/api/v1/hse-safety-power-tools/'+cvformData.id;
                const response = await axios.post(url, cvUpdateformData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,

                },
                });
                console.log('Form submitted successfully:', response.data);
                state.UpdateControlVisitorsHSE01 = false;
                fetchDropDownData()
        
            } catch (error) {
                console.error('Error submitting form:', error);
            }
    }
};
const ApprovedCv = async () => {
    cvUpdateformData.approved_by = "2";
  try {
                let  url = config.baseURL+'/api/v1/hse-vehicle-safety-status/'+cvformData.id;
                const response = await axios.post(url, cvUpdateformData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': state.token,

                },
                });
                console.log('Form submitted successfully:', response.data.data.id);
                cvUpdateformData.approved_by = response.data.data.id;
                fetchDropDownData();
        
            } catch (error) {
                console.error('Error submitting form:', error);
            }
};

// Insert end

const state = reactive({
  ControlVisitors: false,
  ControlVisitorsHSE01: false,
  AddControlVisitorsHSE01: false,
  UpdateControlVisitorsHSE01: false,
  viewData: [] as Array<any>,
  token: getToken(),

});

function CloseControlVisitorsHSE01 (){
  state.ControlVisitorsHSE01 = false;
  state.ControlVisitors = false;
  state.AddControlVisitorsHSE01 = false;
  state.UpdateControlVisitorsHSE01 = false;


}
function AddControlVisitorsHSE01 (){
  state.AddControlVisitorsHSE01 = true;
}

function BackControlVisitorsHSE01 (){
  state.AddControlVisitorsHSE01 = false;
  state.UpdateControlVisitorsHSE01 = false;
}

async function UpdateControlVisitorsHSE01 (ID:any){
  state.UpdateControlVisitorsHSE01 = true;

}
const fetchDropDownData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hse-safety-power-tools';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.viewData = response.data.data;
    cvformData.id = response.data.data.map((item: any) => item.id).join(',');
    fetchcvUpdateData();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchcvUpdateData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hse-safety-power-tools/'+cvformData.id;
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    cvUpdateformData.descriptions = response.data.data.descriptions;
    updateeditorData.value = response.data.data.descriptions;
    
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchDropDownData();
});
</script>

<template>
  <div class="grid grid-cols-12 gap-6 mt-8 relative">
    
    <div class="absolute top-0 left-0 bg-white z-50 shadow-md rounded-md p-4 w-full">
      <div class="pt-4 px-4 flex justify-start items-center">
        <router-link :to="{ name: 'hse-safety-power-tools' }">
            <Button variant="primary" class="w-32 mb-2 mr-2">
              <Lucide icon="ChevronsLeftIcon" class="w-4 h-4 mr-2" /> Back
            </Button>
        </router-link>
        
      </div>
      <div  class="py-2 px-2 flex justify-between items-center">
          <div class="flex w-full justify-between items-center">
              <div class="flex">
                <Button v-if="!state.AddControlVisitorsHSE01 && state.viewData.length == 0" variant="primary" class="mr-2 shadow-md" @click="AddControlVisitorsHSE01">
              Add Safety Power
            </Button>
            <div v-for="( data , index) in state.viewData">
              <Button v-if="state.viewData.length != 0 && !state.UpdateControlVisitorsHSE01" variant="primary" class="mr-2 shadow-md" @click="UpdateControlVisitorsHSE01(data.id)">
              Update Safety Power
            </Button>
            </div>
            <Button v-if="state.AddControlVisitorsHSE01 || state.UpdateControlVisitorsHSE01" variant="primary" class="mr-2 shadow-md" @click="BackControlVisitorsHSE01">
              <Lucide icon="ChevronsLeft" class="block mx-auto" />
              Back
            </Button>
              <Menu v-if="!state.AddControlVisitorsHSE01">
              <Menu.Button :as="Button" class="px-2 !box">
                <span class="flex items-center justify-center w-5 h-5">
                  <Lucide icon="Plus" class="w-4 h-4" />
                </span>
              </Menu.Button>
              <Menu.Items class="w-40">
                <Menu.Item>
                  <Lucide icon="Printer" class="w-4 h-4 mr-2" /> Print
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Export to Excel
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Export to PDF
                </Menu.Item>
              </Menu.Items>
            </Menu>
              </div>
            <div v-if="state.viewData.length != 0" class="py-4 px-4">
            <Button variant="primary" class="w-32" @click="ApprovedCv">
                <Lucide icon="Check" class="w-4 h-4 mr-2" /> Approved
            </Button>
          </div>
          </div>
           
      </div>
      <div class="p-4" v-if="!state.AddControlVisitorsHSE01 && !state.UpdateControlVisitorsHSE01">
      
        <div v-if="state.viewData.length != 0"  v-for="( data , index) in state.viewData" :key="index">
          <div  class="p-4" v-html="data.descriptions"></div>
            <div>
                <ul class="py-4">
                  <li v-if="data.approved_by != null" class="p-2">
                      <span class="font-bold mr-2">Approved By</span> 
                      <span>{{ data.approved_by.name }}</span>
                  </li>
                  <li v-if="data.updated_by != null" class="p-2">
                      <span class="font-bold mr-2">Updated By</span> 
                      <span>{{ data.updated_by.name }}</span>
                  </li>
                  <li v-if="data.created_by != null" class="p-2">
                      <span class="font-bold mr-2">Created By</span> 
                      <span>{{ data.created_by.name }}</span>
                  </li>
              </ul>
            </div>
        </div>
        <div v-else class=" text-xl text-center p-4">No Data</div>
        
      </div>
      <div class="p-4" v-if="state.AddControlVisitorsHSE01">
        <div class="p-5 mt-5 intro-y box">
        <div class="py-4"><h2 class="mr-auto text-xl text-center font-medium uppercase">Insert Safety Power</h2></div>
          <Alert variant="primary" dismissible class="col-span-11 mb-6 intro-y box dark:border-darkmode-600" v-slot="{ dismiss }">
              <div class="flex items-center">
                <span>
                  <Lucide icon="Info" class="w-4 h-4 mr-2" />
                </span>
                <span>
                  Ensure accurate online Safety Power with correct date formats and file uploads in the specified format and size.
                </span>
                <Alert.DismissButton class="text-white" @click="dismiss" aria-label="Close">
                  <Lucide icon="X" class="w-4 h-4" />
                </Alert.DismissButton>
              </div>
          </Alert>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Descriptions
          </div>
          <div class="mt-5">
            
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Problem Descriptions</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    A brief summary of the accident details.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <ClassicEditor v-model="editorData" :class="{ 'border-danger': validate.descriptions.$error,}" :config="editorConfig" />
                
                <div class="flex justify-between">
                  <template v-if="validate.descriptions.$error">
                  <div v-for="(error, index) in validate.descriptions.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 character</p>
                </div>
              </div>
            </FormInline>
            
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <Button
          @click="CloseControlVisitorsHSE01"
          type="button"class="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52" >
          Cancel
        </Button>
        <Button variant="primary" type="button" class="w-full py-3 md:w-52" @click="submitForm">
          Save
        </Button>
      </div>
        
      </div>
      <div class="p-4" v-if="state.UpdateControlVisitorsHSE01">
        <div class="p-5 mt-5 intro-y box">
        <div class="py-4"><h2 class="mr-auto text-xl text-center font-medium uppercase">Update Safety Power</h2></div>
          <Alert variant="primary" dismissible class="col-span-11 mb-6 intro-y box dark:border-darkmode-600" v-slot="{ dismiss }">
              <div class="flex items-center">
                <span>
                  <Lucide icon="Info" class="w-4 h-4 mr-2" />
                </span>
                <span>
                  Ensure accurate online Safety Power with correct date formats and file uploads in the specified format and size.
                </span>
                <Alert.DismissButton class="text-white" @click="dismiss" aria-label="Close">
                  <Lucide icon="X" class="w-4 h-4" />
                </Alert.DismissButton>
              </div>
          </Alert>
        <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400" >
          <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
            <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" />Descriptions
          </div>
          <div class="mt-5">
            
            <FormInline class="flex flex-wrap items-center pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
              <FormLabel class="xl:w-64 xl:!mr-10">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Problem Descriptions</div>
                    <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div>
                  </div>
                  <div class="mt-3 text-xs leading-relaxed text-slate-500">
                    A brief summary of the accident details.
                  </div>
                </div>
              </FormLabel>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <ClassicEditor v-model="updateeditorData" :class="{ 'border-danger': validate2.descriptions.$error,}" :config="editorConfig" />
                
                <div class="flex justify-between">
                  <template v-if="validate2.descriptions.$error">
                  <div v-for="(error, index) in validate2.descriptions.$errors" :key="index" class="mt-2 text-danger whitespace-nowrap">
                    {{ error.$message }}
                  </div>
                </template>
                  <p class="text-right mt-2 w-full"> Required, at least 3 character</p>
                </div>
              </div>
            </FormInline>
            
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-end gap-2 mt-5 md:flex-row">
        <Button
          type="button"class="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52" @click="CloseControlVisitorsHSE01">
          Cancel
        </Button>
        <Button variant="primary" type="button" class="w-full py-3 md:w-52" @click="updateForm">
          Save
        </Button>
      </div>
        
      </div>
  </div>
  </div>
</template>
<style>
.h-807{
  height: 810px
}
td{
  border: 1px solid grey;
  padding: 16px 16px;
}
th{
  border: 1px solid grey;
  padding: 16px 16px;
  background-color: #edf2f7;
}
</style>
