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
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Control of Visitors</h2>
  </div>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'control-visitors-data' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Racer.png" alt="">
            </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Visitor SOP</p>
        </div>
        </div>
      </div>
    </div>
    <!-- <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'visitor-log' }">
              <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6"><path d="M160 16l0 48 192 0 0-64L160 16zm17.6 80c-1 5.2-1.6 10.5-1.6 16c0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16L177.6 96zM176 224l-6.1 0L352 484.1l0-114.4 53.6 90.6 20.3 34.4 68.9-40.7-20.3-34.4-81.6-138 52.4-90.8L416 173.9 479.4 64l-13.9-8L437.9 40 424 32 408 59.7l13.9 8L331.6 224 176 224zm-34.4 19.7l-104 176L17.2 454.1l68.9 40.7 20.3-34.4L160 369.7 160 512l172.5 0L143 241.3l-1.4 2.4zM296 272a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
              </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Visitor Log</p>
        </div>
        </div>
      </div>
    </div> -->
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'hse-visitors-entry-create' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Racer.png" alt="">
            </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Visitors Entry Create</p>
        </div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'hse-visitors-entry-list' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Racer.png" alt="">
            </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Visitors Entry List</p>
        </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
