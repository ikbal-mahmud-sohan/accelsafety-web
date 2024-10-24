<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

</script>

<template>
  <div class="pt-4 flex justify-end items-center">
    <router-link :to="{ name: 'hse-data-list' }">
        <Button variant="primary" class="w-32 mb-2 mr-2">
          <Lucide icon="ChevronsLeftIcon" class="w-4 h-4 mr-2" /> Back
        </Button>
    </router-link>
    
  </div>
  <div class="pb-8">
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Mobile Crane Safety Procedure</h2>
  </div>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'hse-mobile-crane-safety-procedure-doc' }">
              <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
                <svg fill="#000000" class="w-6 h-6" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.453 451.453" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 451.453 451.453">
                <path d="m424.711,0h-94.453c-6.903,0-12.5,5.596-12.5,12.5v27.5h-291.016c-6.903,0-12.5,5.596-12.5,12.5v54.453c0,6.904 5.597,12.5 12.5,12.5h33.398v108.949c0,6.904 5.597,12.5 12.5,12.5 5.277,0 9.571,4.293 9.571,9.571s-4.294,9.571-9.571,9.571c-3.857,0-7.321-2.296-8.824-5.849-2.689-6.357-10.022-9.333-16.382-6.643-6.358,2.689-9.333,10.024-6.644,16.382 5.425,12.824 17.926,21.111 31.85,21.111 19.063,0 34.571-15.509 34.571-34.571 0-14.656-9.169-27.212-22.071-32.233v-98.786h252.617v319.5c0,6.904 5.597,12.5 12.5,12.5h54.453c6.903,0 12.5-5.596 12.5-12.5v-319.5h7.5c6.903,0 12.5-5.596 12.5-12.5v-94.455c0.001-6.904-5.596-12.5-12.499-12.5zm-12.5,94.453h-11.981v-69.453h11.981v69.453zm-69.453-69.453h32.472v69.453h-32.472v-69.453zm-25,69.453h-11.491l-33.273-29.453h44.764v29.453zm-172.237,0h-57.071l28.535-25.259 28.536,25.259zm4.444-29.453h57.07l-28.535,25.259-28.535-25.259zm90.05,4.194l28.535,25.259h-57.07l28.535-25.259zm-200.773-4.194h44.764l-33.273,29.453h-11.491v-29.453zm323.516,240.933l25.259,28.535-25.259,28.535v-57.07zm4.193-32.98l25.26-28.535v57.071l-25.26-28.536zm-4.193-32.98v-57.07l25.259,28.535-25.259,28.535zm0,186.48v-25.733l29.453-33.273v59.006h-29.453zm29.453-247.994l-29.453-33.273v-25.733h29.453v59.006z"/>
              </svg>
              </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Mobile Crane Safety Procedure documentation</p>
        </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
