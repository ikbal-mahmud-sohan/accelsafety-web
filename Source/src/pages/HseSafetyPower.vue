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
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Safety Power Tools</h2>
  </div>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'hse-safety-power-tools-doc' }">
              <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6"><path d="M352 32L224 32l0 34.3L224 176 159.6 85.8C84.1 121.8 32 198.8 32 288l0 64 512 0 0-66.4c-.9-88.1-52.8-164.1-127.5-199.8L352 176l0-109.7L352 32zM0 408s80 72 288 72s288-72 288-72l0-24L0 384l0 24z"/></svg>
              </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Safety of Power Tools</p>
        </div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'hse-safety-power-tools-create' }">
              <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6"><path d="M352 32L224 32l0 34.3L224 176 159.6 85.8C84.1 121.8 32 198.8 32 288l0 64 512 0 0-66.4c-.9-88.1-52.8-164.1-127.5-199.8L352 176l0-109.7L352 32zM0 408s80 72 288 72s288-72 288-72l0-24L0 384l0 24z"/></svg>
              </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Safety of Power Tools Create</p>
        </div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'hse-safety-power-tools-list' }">
              <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6"><path d="M352 32L224 32l0 34.3L224 176 159.6 85.8C84.1 121.8 32 198.8 32 288l0 64 512 0 0-66.4c-.9-88.1-52.8-164.1-127.5-199.8L352 176l0-109.7L352 32zM0 408s80 72 288 72s288-72 288-72l0-24L0 384l0 24z"/></svg>
              </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Safety of Power Tools List</p>
        </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
