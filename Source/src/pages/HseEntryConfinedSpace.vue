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
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Entry into Confined Space </h2>
  </div>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'hse-confined-space-doc' }">
              <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM281.4 115.4c5.8-7.5 14.5-14.7 23.6-11.8c64.4 20.7 111 81.1 111 152.4s-46.6 131.7-111 152.4c-9 2.9-17.8-4.3-23.6-11.8c-5.8-7.6-15.1-12.6-25.4-12.6s-19.6 4.9-25.4 12.6c-5.8 7.5-14.5 14.7-23.6 11.8C142.6 387.7 96 327.3 96 256s46.6-131.7 111-152.4c9-2.9 17.8 4.3 23.6 11.8c5.8 7.6 15.1 12.6 25.4 12.6s19.6-4.9 25.4-12.6zM192 176a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm0 64a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm0 64a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm80-112a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm-32 64a16 16 0 1 0 32 0 16 16 0 1 0 -32 0zm32 64a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48-144a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm0 64a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm0 64a16 16 0 1 0 0 32 16 16 0 1 0 0-32z"/></svg>
              </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Entry into Confined Space  documentation</p>
        </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
