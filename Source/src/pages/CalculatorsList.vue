<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
</script>

<template>
  <div class="flex flex-wrap bg-theme-1  bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'calculator-on-indian-standards' }">
          <div class="inline-block">
              <img class="w-24 h-24 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/calculator.png" alt="calculator">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Calculators based on Indian Standards</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-excavator' }">
          <div class="inline-block">
              <img class="w-24 h-24 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/calculator_01.png" alt="calculator">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Calculators based on OSHA / Other Countries</p>
      </div>
    </div>
  </div>
</template>
