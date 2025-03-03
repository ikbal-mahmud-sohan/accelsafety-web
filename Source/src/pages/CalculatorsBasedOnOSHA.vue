<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import CalculatorCard from "@/components/Custom/CalculatorCard.vue";

</script>

<template>
  <div class="pt-4 flex justify-between items-center">
    <div class="py-4 w-full">
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Calculators based on OSHA / Other Countries</h2>
  </div>
    <router-link :to="{ name: 'calculators-list' }">
      <Button variant="primary" class="w-32 mb-2 mr-2">
        <Lucide icon="ChevronsLeftIcon" class="w-4 h-4 mr-2" /> Back
      </Button>
    </router-link>

  </div>
  
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'osha-total-recordable-incident-rate-trir-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/calculator/cal18.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">OSHA Total Recordable Incident Rate (TRIR) Calculator</p>

      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'osha-dart-rate-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/calculator/cal19.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">OSHA DART Rate Calculator</p>

      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'nema-ratings-and-ip-equivalency-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/calculator/cal20.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">NEMA Ratings and IP Ratings Equivalency Calculator</p>

      </div>
    </div>
  </div>
</template>
