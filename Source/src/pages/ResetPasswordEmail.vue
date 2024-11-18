<script setup lang="ts">
import ThemeSwitcher from "@/components/ThemeSwitcher";
import logoUrl from "@/assets/images/accsaeftylogo.jpeg";
import illustrationUrl from "@/assets/images/illustration.svg";
import { FormInput, FormCheck } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import { ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import config from "@/config";
import axios, { AxiosError } from 'axios';




const formData = reactive({
     email:'',
});
const router = useRouter();


const rules = {
        email: {required,email},
};
const validate = useVuelidate(rules, toRefs(formData));
const backendErrors = reactive<{
    message: string;
    errors: { [key: string]: string[] };
}>({
    message: '',
    errors: {}
});
interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}


const submitForm = async () => {
    validate.value.$touch();
    console.log(validate.value)
    if (validate.value.$invalid) {
    } else {
               
            try {
                let  url = config.baseURL+'/api/auth/reset/email';
                const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                console.log('Form submitted successfully:', response.data);
                if (response !== undefined) {
                  router.push({ name: 'email-notifications' });
                }
        
            } catch (err) {
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
</script>

<template>
  <div
    :class="[
      'p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
      'before:hidden before:xl:block before:content-[\'\'] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400',
      'after:hidden after:xl:block after:content-[\'\'] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700',
    ]"
  >
    <ThemeSwitcher />
    <div class="container relative z-10 sm:px-10">
      <div class="block grid-cols-2 gap-4 xl:grid">
        <!-- BEGIN: Login Info -->
        <div class="flex-col hidden min-h-screen xl:flex">
          <a href="/" class="flex items-center pt-5 -intro-x">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="w-20"
              :src="logoUrl"
            />
          </a>
          <div class="my-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="w-1/2 -mt-16 -intro-x"
              :src="illustrationUrl"
            />
            <div
              class="mt-10 text-4xl font-medium leading-tight text-white -intro-x"
            >
              A few more clicks to <br />
              sign in to your account.
            </div>
            <div
              class="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400"
            >
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Reset Form -->
        <div  class="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
          <div
            class="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left"
            >
              Reset Password
            </h2>
            <div class="mt-2 text-center intro-x text-slate-400 xl:hidden">
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div>
            <div class="mt-8 intro-x">
              <FormInput
                type="text"
                class="block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px]"
                v-model.trim="validate.email.$model" name="email":class="{ 'border-danger': validate.email.$error,}"
                placeholder="Email"/>
                <template v-if="validate.email.$error">
                    <div v-for="(error, index) in validate.email.$errors" :key="index" class="mt-2 text-danger">
                      {{ error.$message }}
                    </div>
                </template>
            </div>
            
            <div class="mt-5 text-center intro-x xl:mt-8 xl:text-left">
              <Button
                variant="primary"
                class="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                @click="submitForm"
              >
                reset
              </Button>
             
            </div>
            <div class="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                  <p class="text-red-500">{{ backendErrors.message }}</p>
            </div>
            
          </div>
        </div>
      
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>
