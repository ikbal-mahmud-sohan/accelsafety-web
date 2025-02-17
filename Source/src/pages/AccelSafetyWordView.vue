<script setup lang="ts">
import _ from "lodash";
import fakerData from "@/utils/faker";
import {
    FormInput,
    FormInline,
    FormSelect,
    FormLabel,
    FormHelp,
} from "@/components/Base/Form";
import { ref, reactive, toRefs, onMounted } from 'vue';
import axios, { AxiosError } from 'axios';
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { useRouter, useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, integer, maxLength } from '@vuelidate/validators';
import config from "@/config";
import Tippy from '@/components/Base/Tippy';
import Toastify from 'toastify-js';
import Notification from "@/components/Base/Notification";
import Alert from "@/components/Base/Alert";
import { getToken } from './../auth/setToken'




const router = useRouter();
const route = useRoute();

let id = route.params.id;
let sID = id.toString()



const formData = reactive({
    status: '',

});
const selectedStatus = ref("");

const state = reactive({
    viewData: [] as Array<any>,
    token: getToken(),
    descriptions: ''

});

interface BackendErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}
const rules = {
    status: { required },
};

const validate = useVuelidate(rules, toRefs(formData));
const backendErrors = reactive<{
    message: string;
    errors: { [key: string]: string[] };
}>({
    message: '',
    errors: {}
});



const fetchData = async () => {
    try {
        let url = config.baseURL + '/api/v1/accel-safety-words/' + sID;
        const response = await axios.get(url, {
            headers: {
                'Authorization': state.token,
            },
        });
        state.viewData = response.data;
        state.descriptions = response.data.descriptions;

        console.log("state.viewData", state.viewData)

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
// Ext Function 

function FailedPopUp() {
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
function SuccessPopUp() {

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
onMounted(() => {
    fetchData();
});
</script>

<template>
    <div class="flex items-center mt-8 intro-y">
        <h2 class="mr-auto text-lg font-medium">Accel Safety Word</h2>
    </div>
    <div class="grid grid-cols-11 pb-20 mt-5 gap-x-6">

        <div class="col-span-11 intro-y ">
            <!-- BEGIN: Uplaod Product -->

            <!-- BEGIN: Product Information -->
            <div class="p-5 mt-5 intro-y box">
                <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                    <div
                        class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                        <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Data
                    </div>
                    <div class="mt-5">
                        <div class="flex flex-wrap">
                            <div class="md:w-1/5 w-full">
                                <div class="p-2">
                                    <div class="py-2 font-medium uppercase">id</div>
                                    <div class="py-2">{{ state.viewData.id }}</div>
                                </div>
                            </div>
                            <div class="md:w-1/5 w-full">
                                <div class="p-2">
                                    <div class="py-2 font-medium uppercase">Number</div>
                                    <div class="py-2">{{ state.viewData.number }}</div>
                                </div>
                            </div>
                            <div class="md:w-1/5 w-full">
                                <div class="p-2">
                                    <div class="py-2 font-medium uppercase">Version</div>
                                    <div class="py-2">{{ state.viewData.version }}</div>
                                </div>
                            </div>
                            <div class="md:w-1/5 w-full">
                                <div class="p-2">
                                    <div class="py-2 font-medium uppercase">Title</div>
                                    <div class="py-2">{{ state.viewData.title }}</div>
                                </div>
                            </div>
                            <div class="md:w-1/5 w-full">
                                <div class="p-2">
                                    <div class="py-2 font-medium uppercase">Records Date</div>
                                    <div class="py-2">{{ state.viewData.records_date }}</div>
                                </div>
                            </div>
                            <div class="w-full">
                                <div class="p-2">
                                    <div class="py-2 font-medium uppercase">Descriptions</div>
                                    <div class="py-2" v-html="state.descriptions"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
