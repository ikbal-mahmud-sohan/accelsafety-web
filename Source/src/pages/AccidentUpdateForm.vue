<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios';
import { ClassicEditor } from "@/components/Base/Ckeditor";
import TomSelect from "@/components/Base/TomSelect";
import Button from "@/components/Base/Button";
import { useRouter } from 'vue-router';
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
  deadline: ''
});
const router = useRouter();

const categories = ref(["1", "3"]);
const editorConfig = {
  toolbar: {
    items: ["bold", "italic", "link"],
  },
};
const editorData = ref("");

const submitForm = async () => {
  formData.description = editorData.value; // Use the editor data for the description field

  try {
    const response = await axios.post('http://accelsafety.test/api/v1/accident', formData);
    console.log('Form submitted successfully:', response.data);
    if(response.data != undefined){
      router.push({ name: 'accident-data-list' });
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    // Handle error (e.g., show an error message)
  }
};
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Accident Form</h2>
  </div>

  <div class="flex flex-wrap items-center justify-center w-full">
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
              <FormLabel htmlFor="crud-form-4">Month</FormLabel>
              <FormInput v-model="formData.month" id="crud-form-1" type="text" class="w-full" placeholder="Input Month"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Date</FormLabel>
                <FormInput v-model="formData.date" id="crud-form-2" type="date" class="w-full" placeholder="Input Date"/> 
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Name</FormLabel>
                <FormInput v-model="formData.name" id="crud-form-3" type="text" class="w-full" placeholder="Input Name"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Designation</FormLabel>
                <FormInput v-model="formData.designation" id="crud-form-4" type="text" class="w-full" placeholder="Input Designation"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Supervisor</FormLabel>
                <FormInput v-model="formData.supervisor" id="crud-form-5" type="text" class="w-full" placeholder="Input Supervisor"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Department</FormLabel>
                <FormInput v-model="formData.department" id="crud-form-6" type="text" class="w-full" placeholder="Input Department"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Type of Accident</FormLabel>
                <FormInput v-model="formData.type_of_accident" id="crud-form-7" type="text" class="w-full" placeholder="Input Type of Accident"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Zone Location</FormLabel>
                <FormInput v-model="formData.zone_location" id="crud-form-8" type="text" class="w-full" placeholder="Input Zone Location"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Precise Location</FormLabel>
                <FormInput v-model="formData.precise_location" id="crud-form-9" type="text" class="w-full" placeholder="Input Precise Location"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Injury Type</FormLabel>
                <FormInput v-model="formData.injury_type" id="crud-form-10" type="text" class="w-full" placeholder="Input Injury Type"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Affected Body Parts</FormLabel>
                <FormInput v-model="formData.affected_body_parts" id="crud-form-11" type="text" class="w-full" placeholder="Input Affected Body Parts"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <label>Property Damaged</label>
                <FormSwitch class="mt-2">
            <FormSwitch.Input v-model="formData.property_damaged" type="checkbox" />
          </FormSwitch>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Root Cause</FormLabel>
                <FormInput v-model="formData.root_cause" id="crud-form-13" type="text" class="w-full" placeholder="Input Root Cause"/>
            </div>
        </div>

        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Days Lost</FormLabel>
                <FormInput v-model="formData.days_lost" id="crud-form-14" type="number" class="w-full" placeholder="Input Days Lost"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Type Of Victim Employee</FormLabel>
                <FormInput v-model="formData.type_of_victim_employee" id="crud-form-15" type="text" class="w-full" placeholder="Input Type Of Victim Employee"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Responsible Name</FormLabel>
                <FormInput v-model="formData.responsible_name" id="crud-form-17" type="text" class="w-full" placeholder="Input Responsible Name"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Deadline</FormLabel>
                <FormInput v-model="formData.deadline" id="crud-form-18" type="date" class="w-full" placeholder="Input Deadline"/>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="px-4 py-2">
                <FormLabel htmlFor="crud-form-1">Action</FormLabel>
                <FormInput v-model="formData.action" id="crud-form-19" type="text" class="w-full" placeholder="Input Action"/>
            </div>
        </div>
        <div class="w-full">
          <div class="px-4 py-2">
                <FormLabel>Description</FormLabel>
                <div class="mt-2">
            <ClassicEditor v-model="editorData" :config="editorConfig" />
          </div>
          </div>
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
</template>
