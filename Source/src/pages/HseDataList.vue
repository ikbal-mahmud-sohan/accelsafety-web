<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
</script>

<template>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'hse-vehicle-safety' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="CastIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Power Vehicle Safety</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'hse-control-visitors' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="CodepenIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Control Visitors</p>
      </div>
    </div>
    
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'hse-safety-power-tools' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="CloudLightningIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Safety of Power Tools</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'hse-sight-hearin-protection' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="CodepenIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Sight and Hearing Protection</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="CodesandboxIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Working at Height</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="CommandIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Safe Crane Operation</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="CpuIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Mobile Crane Safety Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="CrosshairIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Entry into Confined Space</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="DribbbleIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Pressure Vessel Management Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="DropletIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Compressed Gas Cylinder Handling</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="GitMergeIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Chemical Handling</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="GlobeIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Hot Work Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="HexagonIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Management of Fire Safety System</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="HelpCircleIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Material Handling Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="HomeIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">House Keeping</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="LifeBuoyIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Permit To Work</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="LoaderIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Elecrical Safety</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="MapIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Lockout Tagout (LOTO)</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="PackageIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Excavation Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="PieChartIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Personal Protective Equipment</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="RadioIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Safety Signage Management</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="SendIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">First Aid</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="TargetIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Accident Incident Investigation Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'accident-investigation-form' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <Lucide icon="TruckIcon" class="block mx-auto w-6 h-6" />
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Other</p>
      </div>
    </div>
  </div>
</template>
