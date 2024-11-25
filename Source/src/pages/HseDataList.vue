<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
</script>

<template>
  <div class="flex flex-wrap bg-theme-1  bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-vehicle-safety' }">
            <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Grader.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/Racer.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/crane.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/Dragline excavator.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/24.Emergency Exit.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/2.Hazard.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/fes.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/house.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/Excavator.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/ppm.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/Caution.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/First Aid Kit.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/jobSafety.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/15.Safety Harness.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">BACKHOE LOADER (JCB) Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-jcb-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">BACKHOE LOADER (JCB) List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-excavator-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">EXCAVATOR Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-excavator-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">EXCAVATOR List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-earth-compactors-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">EARTH COMPACTOR Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-earth-compactors-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">EARTH COMPACTOR List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-dumper-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">DUMPER Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-dumper-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">DUMPER List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-dumper-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">DUMPER Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-dumper-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">DUMPER List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-concrete-mixer-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Cement Mixer.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">CONCRETE MIXER Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-concrete-mixer-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Cement Mixer.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">CONCRETE MIXER List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-transit-mixers-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">TRANSIT MIXER Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-transit-mixers-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">TRANSIT MIXER List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-concrete-pump-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Concrete Pump Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-concrete-pump-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Concrete Pump List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-boom-placer-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Boom Placer Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-boom-placer-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Boom Placer List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-electrical-vibrator-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Electrical Vibrator Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-electrical-vibrator-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Electrical Vibrator List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-bar-cutting-machine-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
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
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Bar Cutting Machine List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-bar-bending-machine-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Bar Bending Machine Create</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-bar-bending-machine-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Bar Bending Machine List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-breaker-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Breaker Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-breaker-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Breaker List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-drill-machine-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Drill Machine Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-drill-machine-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Drill Machine List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-hydra-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Hydra Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-hydra-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Hydra List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-mobile-crane-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Mobile Crane Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-mobile-crane-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Mobile Crane List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-tower-crane-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">16 Tower Crane Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'hse-tower-crane-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">16 Tower Crane List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'diesel-generator-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">17 Diesel Generator Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'diesel-generator-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">17 Diesel Generator List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'power-distribution-panel-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">18 Power/Sub Distribution Panel Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'power-distribution-panel-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">18 Power/Sub Distribution Panel List</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'gas-cutting-set-checklists-create' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Blueprint.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">19 Gas Cutting Set Create</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-1">
        <router-link :to="{ name: 'gas-cutting-set-checklists' }">
          <div class="inline-block">
              <img class="w-32 h-32" src="../assets/images/icon/Construction Barrier.png" alt="">
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">19 Gas Cutting Set List</p>
      </div>
    </div>
  
  </div>
</template>
