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
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Permit to Work</h2>
  </div>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'hse-electrical-safety-doc' }">
              <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
                <Lucide icon="SunriseIcon" class="block mx-auto w-6 h-6" />
              </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Elecrical Safety</p>
        </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
