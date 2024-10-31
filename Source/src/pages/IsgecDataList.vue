<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
</script>

<template>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'isgec-backhoe-loader' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="w-6 h-6"><path class="fa-secondary" opacity=".4" d="M96 432a80 80 0 1 0 160 0A80 80 0 1 0 96 432zm288 0a80 80 0 1 0 160 0 80 80 0 1 0 -160 0z"/><path class="fa-primary" d="M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l17.1 0c7.8-54.3 54.4-96 110.9-96s103.1 41.7 110.9 96l66.3 0c7.8-54.3 54.4-96 110.9-96s103.1 41.7 110.9 96l1.1 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96z"/></svg>
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">BACKHOE LOADER (JCB)</p>
      </div>
    </div>
    
  </div>
</template>
