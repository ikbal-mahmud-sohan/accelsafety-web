<script setup lang="ts">
import _ from "lodash"; // Lodash utility library, useful for data manipulation
import fakerData from "@/utils/faker"; // Faker for generating random data
import {
  FormInput,
  FormInline,
  FormSelect,
  FormLabel,
  FormHelp,
  FormCheck,
  InputGroup,
  FormSwitch,
} from "@/components/Base/Form"; // Form-related components
import Tippy from "@/components/Base/Tippy"; // Tooltip component
import Table from "@/components/Base/Table"; // Table component
import { ref,onMounted } from 'vue'; // Vue's reactivity API
import axios, { AxiosError } from 'axios'; // Axios for HTTP requests
import { useRouter } from 'vue-router'; // Router for navigation
import useVuelidate from '@vuelidate/core'; // Vuelidate for form validation
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators'; // Validators from Vuelidate
import config from "@/config"; // Configuration file
import Toastify from 'toastify-js'; // Toast notifications
import Notification from "@/components/Base/Notification"; // Notification component
import Preview from "@/components/Base/Preview"; // Preview component
import Litepicker from "@/components/Base/Litepicker"; // Date picker component
import Alert from "@/components/Base/Alert"; // Alert component

// Vue Router instance
const router = useRouter();

// Sample items for checkboxes
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

// Reactive array to hold selected checkbox values
const selectedItems = ref<string[]>([]);

// Function to handle checkbox state change
const handleCheckboxChange = (event: { target: { value: string; checked: boolean; }; }) => {
  const value = event.target.value;
  if (event.target.checked) {
    selectedItems.value.push(value);
  } else {
    selectedItems.value = selectedItems.value.filter(item => item !== value);
  }
  console.log("selectedItems",selectedItems.value)
};

onMounted(() => {
  // Any logic that should run when the component mounts can be placed here
});
</script>

<template>
  <div>
    <h3>Select Items:</h3>
    <!-- Loop through items array to create checkboxes -->
    <div v-for="item in items" :key="item">
      <label>
        <input 
          type="checkbox" 
          :value="item" 
          @change="handleCheckboxChange"
        />
        {{ item }}
      </label>
    </div>

    <h4>Selected Items:</h4>
    <!-- Display selected items -->
    <ul>
      <li v-for="(selectedItem, index) in selectedItems" :key="index">
        {{ selectedItem }}
      </li>
    </ul>
  </div>
</template>
