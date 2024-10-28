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
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Work at Height</h2>
  </div>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'hse-work-height-doc' }">
              <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6"><path d="M576 176c0 97.2-128.9 176-288 176c-14.9 0-29.6-.7-43.9-2c7.7 15.3 11.9 32.4 11.9 50.2C256 461.9 205.9 512 144.2 512L56 512c-13.3 0-24-10.7-24-24s10.7-24 24-24l88.2 0c35.2 0 63.8-28.6 63.8-63.8c0-24.9-14.5-47.5-37.1-57.9l-44.3-20.5C50.2 290.1 0 236.6 0 176C0 78.8 128.9 0 288 0S576 78.8 576 176zM288 304c132.5 0 240-57.3 240-128s-107.5-128-240-128S48 105.3 48 176s107.5 128 240 128z"/></svg>
              </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Work at Height documentation</p>
        </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
