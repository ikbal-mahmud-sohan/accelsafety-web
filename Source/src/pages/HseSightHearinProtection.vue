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
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Sight and Hearing Protection</h2>
  </div>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'hse-sight-hearin-protection-doc' }">
              <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6"><path d="M256 80C152 80 65.8 156.3 50.4 256l77.6 0 0 224L0 480l0-96 0-96C0 146.6 114.6 32 256 32s256 114.6 256 256l0 96 0 96-128 0 0-224 77.6 0C446.2 156.3 360 80 256 80z"/></svg>
              </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Sight and Hearing Protection documentation</p>
        </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
