<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import CalculatorCard from "@/components/Custom/CalculatorCard.vue";

</script>

<template>
  <div class="py-4 flex justify-between items-center">
    <div class="w-full">
    <h2 class="text-2xl font-medium intro-y text-center uppercase">Calculators based on Indian Standards</h2>
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
        <router-link :to="{ name: 'fire-extinguisher-placement-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/fire_extinguisher.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Fire Extinguisher Placement Calculator</p>

      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'swl_of_wire_rope_calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/SWL_of_Wire_Rope.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">SWL of Wire Rope Calculator</p>

      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'stack_height_calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/stack_height.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Stack Height Calculator</p>

      </div>
    </div>
    
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'ip-ratings-checker-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/ip_ratings_checker.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">IP Ratings Checker / Calculator</p>

      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'excavation-slope-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/excavation_slope.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Excavation Slope Calculator</p>

      </div>
    </div>
   
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'fall-clearance-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/fall_clearance.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Fall Clearance Calculator</p>

      </div>
    </div>
   
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'ladder-length-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/ladder_length.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Ladder Length Calculator</p>

      </div>
    </div>
   
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'fire-load-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/fire_load.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Fire Load Calculator</p>

      </div>
    </div>
   
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'bulldog-grips-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/wire_rope_grips.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Bulldog grips or Wire rope grips Calculator</p>

      </div>
    </div>
   
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'lost-time-injury-frequency-rate' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/LTI_frequency.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">LTI Frequency Rate Calculator</p>

      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'severity-rate-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/Severity_Rate.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Severity Rate Calculator</p>

      </div>
    </div>


    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'incidence-rate-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/Incidence_Rate.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Incidence Rate Calculator</p>

      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'ambient-noise-level-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/Ambient_Noise.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Ambient Noise Level Calculator</p>

      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'generalized-anxiety-disorder-assessment' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/Anxiety.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Anxiety Disorder Assessment</p>

      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'daily-drinking-water-intake-calculator' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon_02/cal_3d/Daily_Drinking_Water.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Daily Drinking Water Intake Calculator</p>

      </div>
    </div>
   
  </div>
</template>
