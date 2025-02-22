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
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Calculators based on Indian Standards</h2>
  </div>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'fire-extinguisher-placement-calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Fire Extinguisher Placement Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'swl_of_wire_rope_calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="SWL of Wire Rope Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'stack_height_calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Stack Height Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'ip-ratings-checker-calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="IP Ratings Checker / Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'excavation-slope-calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Excavation Slope Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'fall-clearance-calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Fall Clearance Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'ladder-length-calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Ladder Length Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'fire-load-calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Fire Load Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'bulldog-grips-calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Bulldog grips or Wire rope grips Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'lost-time-injury-frequency-rate' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="LTI Frequency Rate Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'severity-rate-calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Severity Rate Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'incidence-rate-calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Incidence Rate Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'ambient-noise-level-calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Ambient Noise Level Calculator"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'generalized-anxiety-disorder-assessment' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Generalized Anxiety Disorder Assessment"
      />
    </div>
    <div class="w-full lg:w-1/3">
      <CalculatorCard 
      :to="{ name: 'daily-drinking-water-intake-calculator' }" 
      imgSrc="./src/assets/images/icon_02/calculator.png" 
      text="Daily Drinking Water Intake Calculator"
      />
    </div>
  </div>
</template>
