<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

</script>

<template>
  <div class="pt-4 flex justify-end items-center">
    <router-link :to="{ name: 'calculators-list' }">
        <Button variant="primary" class="w-32 mb-2 mr-2">
          <Lucide icon="ChevronsLeftIcon" class="w-4 h-4 mr-2" /> Back
        </Button>
    </router-link>
    
  </div>
  <div class="pb-8">
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Calculators based on Indian Standards</h2>
  </div>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'fire-extinguisher-placement-calculator' }">
            <div class="inline-block">
              <img class="w-24 h-24 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/fire_extinguisher.png" alt="Fire_Extenguisher">
            </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Fire Extinguisher Placement Calculator</p>
        </div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'swl_of_wire_rope_calculator' }">
            <div class="inline-block">
              <img class="w-24 h-24 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/copper_wire.png" alt="Wire">
            </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">SWL of Wire Rope Calculator</p>
        </div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/3">
      <div class="p-4">
        <div class="border py-2">
          <div class="flex justify-center items-center p-4">
          <router-link :to="{ name: 'stack_height_calculator' }">
            <div class="inline-block">
              <img class="w-24 h-24 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/height.png" alt="Height">
            </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">Stack Height Calculator</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
