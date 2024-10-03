<script setup lang="ts">
import _ from "lodash";
import Button from "@/components/Base/Button";
import Pagination from "@/components/Base/Pagination";
import { ref, reactive,toRefs,onMounted } from 'vue';
import {
  FormCheck,
  FormInput,
  FormLabel,
  FormSelect,
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


// Insert start
const editorConfig = {
  toolbar: {
    items: ["bold", "italic", "link"],
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
                let  url = config.baseURL+'/api/v1/hse-vehicle-safety-doc';
                const response = await axios.post(url, cvformData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
                let  url = config.baseURL+'/api/v1/hse-vehicle-safety-doc/'+cvformData.id;
                const response = await axios.post(url, cvUpdateformData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

});

function OpenControlVisitors (){
  state.ControlVisitors = true;
}
function CloseControlVisitors (){
  state.ControlVisitors = false;
}

function OpenControlVisitorsHSE01 (){

    if(state.viewData.length == 0){
      state.ControlVisitorsHSE01 = true;
      state.AddControlVisitorsHSE01 = true;
    }else{
      state.ControlVisitorsHSE01 = true;
    }
}
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
   let  url = config.baseURL+'/api/v1/hse-vehicle-safety-doc';
    const response = await axios.get(url);
    state.viewData = response.data.data;
    cvformData.id = response.data.data.map((item: any) => item.id).join(',');
    fetchcvUpdateData();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const fetchcvUpdateData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hse-vehicle-safety-doc/'+cvformData.id;
    const response = await axios.get(url);
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
    
    <div class="col-span-12">
      <!-- BEGIN: File Manager Filter -->
      <div class="flex flex-col-reverse items-center intro-y sm:flex-row">
        <div class="relative w-full mt-3 mr-auto sm:w-auto sm:mt-0">
          <Lucide
            icon="Search"
            class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-500"
          />
          <FormInput
            type="text"
            class="w-full px-10 sm:w-64 !box"
            placeholder="Search files"
          />
          <Menu class="absolute inset-y-0 right-0 flex items-center mr-3">
            <Menu.Button as="a" role="button" class="block w-4 h-4" href="#">
              <Lucide
                icon="ChevronDown"
                class="w-4 h-4 cursor-pointer text-slate-500"
              />
            </Menu.Button>
            <Menu.Items
              placement="bottom-start"
              class="pt-2 w-[478px] -ml-[228px] -mt-0.5"
            >
              <div class="grid grid-cols-12 gap-4 p-3 gap-y-3">
                <div class="col-span-6">
                  <FormLabel htmlFor="input-filter-1" class="text-xs">
                    File Name
                  </FormLabel>
                  <FormInput
                    id="input-filter-1"
                    type="text"
                    class="flex-1"
                    placeholder="Type the file name"
                  />
                </div>
                <div class="col-span-6">
                  <FormLabel htmlFor="input-filter-2" class="text-xs">
                    Shared With
                  </FormLabel>
                  <FormInput
                    id="input-filter-2"
                    type="text"
                    class="flex-1"
                    placeholder="example@gmail.com"
                  />
                </div>
                <div class="col-span-6">
                  <FormLabel htmlFor="input-filter-3" class="text-xs">
                    Created At
                  </FormLabel>
                  <FormInput
                    id="input-filter-3"
                    type="text"
                    class="flex-1"
                    placeholder="Important Meeting"
                  />
                </div>
                <div class="col-span-6">
                  <FormLabel htmlFor="input-filter-4" class="text-xs">
                    Size
                  </FormLabel>
                  <FormSelect id="input-filter-4" class="flex-1">
                    <option>10</option>
                    <option>25</option>
                    <option>35</option>
                    <option>50</option>
                  </FormSelect>
                </div>
                <div class="flex items-center col-span-12 mt-3">
                  <Button variant="secondary" class="w-32 ml-auto">
                    Create Filter
                  </Button>
                  <Button variant="primary" class="w-32 ml-2"> Search </Button>
                </div>
              </div>
            </Menu.Items>
          </Menu>
        </div>
        <div class="flex w-full sm:w-auto">
          <Button variant="primary" class="mr-2 shadow-md">
            Upload New Files
          </Button>
          <Menu>
            <Menu.Button :as="Button" class="px-2 !box">
              <span class="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" class="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items class="w-40">
              <Menu.Item>
                <Lucide icon="File" class="w-4 h-4 mr-2" /> Share Files
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Settings" class="w-4 h-4 mr-2" /> Settings
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <!-- END: File Manager Filter -->
      <!-- BEGIN: Directory & Files -->
      <div class="grid grid-cols-12 gap-3 mt-5 intro-y sm:gap-6">
        <div  class="col-span-6 intro-y sm:col-span-4 md:col-span-3 2xl:col-span-2 relative">
          <div class="relative px-3 pt-8 pb-5 rounded-md file box sm:px-5 zoom-in">
            <FileIcon  class="w-3/5 mx-auto" variant="empty-directory" @click="OpenControlVisitors" />
            <a href="" class="block mt-4 font-medium text-center truncate">
              Control of Visitors 
            </a>
            <!-- <div class="text-slate-500 text-xs text-center mt-0.5">
              10kb
            </div> -->
          </div>
          <div v-if="state.ControlVisitors" class="absolute bg-white w-full top-0 left-0">
            <div class="py-2 px-2 flex justify-end">
              <svg @click="CloseControlVisitors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <ul class="w-full bg-gray-100">
              <li @click="OpenControlVisitorsHSE01" class="py-4 px-2 border-b text-center text-xs cursor-pointer">HSE-SOP-01 Control of Visitors</li>
              <li class="py-4 px-2 border-b text-center text-xs cursor-pointer">HSE-SOP-01-F-01 Visitor Log</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- END: Directory & Files -->
      <!-- BEGIN: Pagination -->
      <div
        class="flex flex-wrap items-center mt-6 intro-y sm:flex-row sm:flex-nowrap"
      >
        <Pagination class="w-full sm:w-auto sm:mr-auto">
          <Pagination.Link>
            <Lucide icon="ChevronsLeft" class="w-4 h-4" />
          </Pagination.Link>
          <Pagination.Link>
            <Lucide icon="ChevronLeft" class="w-4 h-4" />
          </Pagination.Link>
          <Pagination.Link>...</Pagination.Link>
          <Pagination.Link>1</Pagination.Link>
          <Pagination.Link active>2</Pagination.Link>
          <Pagination.Link>3</Pagination.Link>
          <Pagination.Link>...</Pagination.Link>
          <Pagination.Link>
            <Lucide icon="ChevronRight" class="w-4 h-4" />
          </Pagination.Link>
          <Pagination.Link>
            <Lucide icon="ChevronsRight" class="w-4 h-4" />
          </Pagination.Link>
        </Pagination>
        <FormSelect class="w-20 mt-3 !box sm:mt-0">
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
        </FormSelect>
      </div>
      <!-- END: Pagination -->
    </div>
    <div v-if="state.ControlVisitorsHSE01" class="absolute top-0 left-0 bg-white z-50 shadow-md rounded-md p-4 w-full h-807 overflow-y-auto">
      <div class="py-2 px-2 flex justify-between items-center">
          <div class="flex">
            <Button v-if="!state.AddControlVisitorsHSE01 && state.viewData.length == 0" variant="primary" class="mr-2 shadow-md" @click="AddControlVisitorsHSE01">
              Add Control of Visitors
            </Button>
            <div v-for="( data , index) in state.viewData">
              <Button v-if="state.viewData.length != 0 && !state.UpdateControlVisitorsHSE01" variant="primary" class="mr-2 shadow-md" @click="UpdateControlVisitorsHSE01(data.id)">
              Update Control of Visitors
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
           <svg @click="CloseControlVisitorsHSE01" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer">
             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
           </svg>
      </div>
      <div class="p-4" v-if="!state.AddControlVisitorsHSE01 && !state.UpdateControlVisitorsHSE01">
       <div class="flex justify-between">
          <div class="py-4 px-4">
            <P class="text-xl font-bold">Standard Operating Procedure</P>
            <p class="text-sm font-semibold">Title: Control of Visitors </p>
          </div>
          <div class="py-4 px-4">
            <Button variant="primary" class="w-32 mb-2 mr-2" @click="ApprovedCv">
                <Lucide icon="Check" class="w-4 h-4 mr-2" /> Approved
            </Button>
          </div>
       </div>
        <div  v-for="( data , index) in state.viewData" :key="index">
          <div class="p-4" v-html="data.descriptions"></div>
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
        
      </div>
      <div class="p-4" v-if="state.AddControlVisitorsHSE01">
        <div class="p-5 mt-5 intro-y box">
        <div class="py-4"><h2 class="mr-auto text-xl text-center font-medium uppercase">Insert Control of Visitors</h2></div>
          <Alert variant="primary" dismissible class="col-span-11 mb-6 intro-y box dark:border-darkmode-600" v-slot="{ dismiss }">
              <div class="flex items-center">
                <span>
                  <Lucide icon="Info" class="w-4 h-4 mr-2" />
                </span>
                <span>
                  Ensure accurate online Control of Visitors with correct date formats and file uploads in the specified format and size.
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
        <div class="py-4"><h2 class="mr-auto text-xl text-center font-medium uppercase">Update Control of Visitors</h2></div>
          <Alert variant="primary" dismissible class="col-span-11 mb-6 intro-y box dark:border-darkmode-600" v-slot="{ dismiss }">
              <div class="flex items-center">
                <span>
                  <Lucide icon="Info" class="w-4 h-4 mr-2" />
                </span>
                <span>
                  Ensure accurate online Control of Visitors with correct date formats and file uploads in the specified format and size.
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
