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
        <router-link :to="{ name: 'accident-investigation-form' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/15.Safety Harness.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Other</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-jcb-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/jcb.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">1-Backhoe Loader (JCB) Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-jcb-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/jcb.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">1-Backhoe Loader (JCB) List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-excavator-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/excavator.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">2-Excavator Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-excavator-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/excavator.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">2-Excavator List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-dumper-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/DUMPER.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">3-Dumper Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-dumper-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/DUMPER.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">3-Dumper List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-earth-compactors-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/EARTH-COMPACTOR.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">4-Earth Compactor Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-earth-compactors-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/EARTH-COMPACTOR.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">4-Earth Compactor List</p>
      </div>
    </div>
   
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-concrete-mixer-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Cement Mixer.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">5-Concrete Mixer Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-concrete-mixer-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/icon/Cement Mixer.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">5-Concrete Mixer List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-transit-mixers-checklists-create' }">
          <div class="inline-block">
              <img class="w-44 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/TRANSITMIXER.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">6-Transit Mixer Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-transit-mixers-checklists' }">
          <div class="inline-block">
              <img class="w-44 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/TRANSITMIXER.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">6-Transit Mixer List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-concrete-pump-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ConcretePump.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">7-Concrete Pump Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-concrete-pump-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ConcretePump.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">7-Concrete Pump List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-boom-placer-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/BoomPlacer.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">8-Boom Placer Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-boom-placer-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/BoomPlacer.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">8-Boom Placer List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-electrical-vibrator-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ElectricalVibrator.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">9-Electrical Vibrator Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-electrical-vibrator-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ElectricalVibrator.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">9-Electrical Vibrator List</p>
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
        <p class="text-center">10-Bar Cutting Machine Create</p>
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
        <p class="text-center">10-Bar Cutting Machine List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-bar-bending-machine-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Bar_Bending_Machine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">11-Bar Bending Machine Create</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-bar-bending-machine-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Bar_Bending_Machine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">11-Bar Bending Machine List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-breaker-checklists-create' }">
          <div class="inline-block">
              <img class="w-56 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Breaker.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">12-Breaker Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-breaker-checklists' }">
          <div class="inline-block">
              <img class="w-56 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Breaker.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">12-Breaker List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-drill-machine-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Drill_Machine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">13-Drill Machine Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-drill-machine-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Drill_Machine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">13-Drill Machine List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-hydra-checklists-create' }">
          <div class="inline-block">
              <img class="w-56 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Hydra.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">14-Hydra Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-hydra-checklists' }">
          <div class="inline-block">
              <img class="w-56 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Hydra.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">14-Hydra List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-mobile-crane-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Mobile_Crane.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">15-Mobile Crane Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-mobile-crane-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/Mobile_Crane.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">15-Mobile Crane List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-tower-crane-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/TOWER CRANE.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">16-Tower Crane Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-tower-crane-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/TOWER CRANE.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">16-Tower Crane List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'diesel-generator-checklists-create' }">
          <div class="inline-block">
              <img class="w-52 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/17DieselGenerato.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">17-Diesel Generator Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'diesel-generator-checklists' }">
          <div class="inline-block">
              <img class="w-52 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/17DieselGenerato.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">17-Diesel Generator List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'power-distribution-panel-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/SubDistribution.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">18-Power/Sub Distribution Panel Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'power-distribution-panel-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/SubDistribution.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">18-Power/Sub Distribution Panel List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'gas-cutting-set-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/GasCuttingSet.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">19-Gas Cutting Set Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'gas-cutting-set-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/GasCuttingSet.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">19-Gas Cutting Set List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'portable-grinder-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/PortableGrinder.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">20-Portable Grinder Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'portable-grinder-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/PortableGrinder.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">20-Portable Grinder List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'welding-machine-checklists-create' }">
          <div class="inline-block">
              <img class="w-52 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/WeldingMachine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">21-Welding Machine Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'welding-machine-checklists' }">
          <div class="inline-block">
              <img class="w-52 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/WeldingMachine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">21-Welding Machine List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'electrical-pump-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ElectricalPump.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">22-Electrical Pump/Motor Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'electrical-pump-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ElectricalPump.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">22-Electrical Pump/Motor List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'winch-machine-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/WinchMachine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">23-Winch Machine Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'winch-machine-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/WinchMachine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">23-Winch Machine List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'chain-pulley-block-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ChainPulleyBlock.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">24-Chain Pulley Block Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'chain-pulley-block-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/ChainPulleyBlock.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">24-Chain Pulley Block List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'lifting-tools-tackles-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/LiftingToolsTackles.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">25-Lifting Tools Tackles Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'lifting-tools-tackles-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/LiftingToolsTackles.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">25-Lifting Tools Tackles List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'air-compressor-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/AirCompressor.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">26 Air Compressor Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'air-compressor-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/AirCompressor.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">26 Air Compressor List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'sand-blasting-set-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/SandBlastingSet.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">27-Grit / Sand Blasting Set Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'sand-blasting-set-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/SandBlastingSet.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">27-Grit / Sand Blasting Set List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'fire-extinguisher-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/FireExtinguisher.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">28-Fire Extinguisher Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'fire-extinguisher-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/FireExtinguisher.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">28-Fire Extinguisher List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'bench-cutting-machine-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/BenchCuttingMachine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">29-Bench Cutting Machine Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'bench-cutting-machine-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/BenchCuttingMachine.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">29-Bench Cutting Machine List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'pedestal-grinder-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/PedestalGrinder.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">30-Pedestal Grinder Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'pedestal-grinder-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/PedestalGrinder.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">30-Pedestal Grinder List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'circular-saw-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/CircularSaw.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">31-Circular Saw Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'circular-saw-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/CircularSaw.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">31-Circular Saw List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'batching-plant-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/32BatchingPlant.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">32-Batching Plant Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'batching-plant-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/32BatchingPlant.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">32-Batching Plant List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'ambulance-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/33Ambulance.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">33-Ambulance Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'ambulance-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/33Ambulance.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">33-Ambulance List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'skidSteer-loader-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/34SkidSteerLoader.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">34-Skid Steer Loader Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'skidSteer-loader-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/34SkidSteerLoader.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">34-Skid Steer Loader List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'grader-checklists-create' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/35Grader.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">35-Grader Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'grader-checklists' }">
          <div class="inline-block">
              <img class="w-40 h-32 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" src="../assets/images/additional/35Grader.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">35-Grader List</p>
      </div>
    </div>
  
  </div>
</template>
