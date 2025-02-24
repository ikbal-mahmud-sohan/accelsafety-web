<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import CalculatorCard from "@/components/Custom/CalculatorCard.vue";

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
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Calculators based on OSHA / Other Countries</h2>
  </div>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/3">
      <CalculatorCard class="h-full"
        :to="{ name: 'osha-total-recordable-incident-rate-trir-calculator' }" 
        imgSrc="/src/assets/images/icon_02/calculator_01.png" 
        text="OSHA Total Recordable Incident Rate (TRIR) Calculator" 
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard class="h-full"
        :to="{ name: 'osha-dart-rate-calculator' }" 
        imgSrc="/src/assets/images/icon_02/calculator_01.png" 
        text="OSHA DART Rate Calculator" 
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard class="h-full"
        :to="{ name: 'nema-ratings-and-ip-equivalency-calculator' }" 
        imgSrc="/src/assets/images/icon_02/calculator_01.png" 
        text="NEMA Ratings and IP Ratings Equivalency Calculator" 
      />
    </div>
  </div>
</template>
