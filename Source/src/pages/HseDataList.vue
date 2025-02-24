<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
</script>

<template>
  <div class="flex flex-wrap bg-theme-1  bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-vehicle-safety' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Grader.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Power Vehicle Safety</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-control-visitors' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Racer.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Control Visitors</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-safety-power-tools' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Safety of Power Tools .png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Safety of Power Tools</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-sight-hearin-protection' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Light & Hearing Protection .png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Sight and Hearing Protection</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-work-height' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Work At Height .png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Working at Height</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-safe-crane-operation' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/crane.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Safe Crane Operation</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-mobile-crane-safety-procedure' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Dragline excavator.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Mobile Crane Safety Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-confined-space' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/24.Emergency Exit.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Entry into Confined Space</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-pressure-vessel' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/2.Hazard.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Pressure Vessel Management Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-compressed-gas-cylinder' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Take Compressed cylinder and pressure vessel from Here.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Compressed Gas Cylinder Handling</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-chemical-handling' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Chemical Management .webp" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Chemical Handling</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-hot-work-procedure' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Hot_Work_1.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Hot Work Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-management-fire-safety-system' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/fes.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Management of Fire Safety System</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-material-handling-procedure' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Material Handling.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Material Handling Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-house-keeping' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/house.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">House Keeping</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-permit-work' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Permit to Work Icon.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Permit To Work</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-electrical-safety' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/28.Don’t Touch.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Elecrical Safety</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-loto' }">
            <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/LOTO_ICOn1.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Lockout Tagout (LOTO)</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-excavation-procedure' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Excavator.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Excavation Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-personal-protective-equipment' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/ppm.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Personal Protective Equipment</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-safety-signage-management' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Caution.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Safety Signage Management</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-first-aid' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/First Aid Kit.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">First Aid</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-job-safety-analysis' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/jobSafety.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Job Safety Analysis</p>
      </div>
    </div>
   
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-jcb' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/jcb.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Backhoe Loader (JCB)</p>
      </div>
    </div>
   
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-excavator' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/excavator.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Excavator</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-dumper' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/DUMPER.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Dumper Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-earth-compactors' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/EARTH-COMPACTOR.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Earth Compactor</p>
      </div>
    </div>
   
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-concrete-mixer' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Cement Mixer.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Concrete Mixer</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-transit-mixer' }">
          <div class="inline-block">
              <img class="w-44 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/TRANSITMIXER.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Transit Mixer</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-concrete-pump' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ConcretePump.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Concrete Pump</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-boom-placer' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/BoomPlacer.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Boom Placer</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-electrical-vibrator' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ElectricalVibrator.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Electrical Vibrator</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-bar-cutting-machine-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/BarCutting.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Bar Cutting Machine Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-bar-cutting-machine-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/BarCutting.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Bar Cutting Machine List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-bar-bending-machine' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Bar_Bending_Machine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Bar Bending Machine</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-breaker' }">
          <div class="inline-block">
              <img class="w-56 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Breaker.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Breaker</p>
      </div>
    </div>
   
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-drill-machine' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Drill_Machine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Drill Machine</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-hydra' }">
          <div class="inline-block">
              <img class="w-56 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Hydra.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Hydra</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-mobile-crane' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Mobile_Crane.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Mobile Crane</p>
      </div>
    </div>
   
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-tower-crane' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/TOWER CRANE.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Tower Crane</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-diesel-generator' }">
          <div class="inline-block">
              <img class="w-52 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/17DieselGenerato.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Diesel Generator</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-distribution-panel' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/SubDistribution.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Power/Sub Distribution Panel</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-gas-cutting-set' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/GasCuttingSet.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Gas Cutting Set</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-portable-grinder' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/PortableGrinder.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Portable Grinder</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-welding-machine' }">
          <div class="inline-block">
              <img class="w-52 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/WeldingMachine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Welding Machine</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-electrical-pump' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ElectricalPump.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Electrical Pump/Motor</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-winch-machine' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/WinchMachine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Winch Machine</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-chain-pulley-block' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ChainPulleyBlock.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Chain Pulley Block</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-lifting-tools-tackles' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/LiftingToolsTackles.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Lifting Tools Tackles</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-air-compressor' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/AirCompressor.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Air Compressor</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-sand-blasting-set' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/SandBlastingSet.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Grit / Sand Blasting Set</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-fire-extinguisher' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/FireExtinguisher.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Fire Extinguisher</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-bench-cutting-machine' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/BenchCuttingMachine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Bench Cutting Machine</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-pedestal-grinder' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/PedestalGrinder.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Pedestal Grinder</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-circular-saw' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/CircularSaw.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Circular Saw</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-batching-plant' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/32BatchingPlant.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Batching Plant</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-ambulance' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/33Ambulance.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Ambulance</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-skidSteer-loader' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/34SkidSteerLoader.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Skid Steer Loader</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-grader' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/35Grader.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Grader Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'gantry-crane-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/36GantryCrane.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Gantry Crane Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'gantry-crane-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/36GantryCrane.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Gantry Crane List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-eot-crane' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/37EotCrane.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Eot Crane</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-trailer' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/39Trailer.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Trailer</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-four-wheeler' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/40FourWheeler.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Four Wheeler</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-bus' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/41Bus.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Bus</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-diesel-tanker' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/42DieselTanker.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Diesel Tanker</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'water-tanker-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/43WaterTanker.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Water Tanker Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'water-tanker-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/43WaterTanker.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Water Tanker List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-bike' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/71Bike.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Bike</p>
      </div>
    </div>
  
  </div>
</template>
