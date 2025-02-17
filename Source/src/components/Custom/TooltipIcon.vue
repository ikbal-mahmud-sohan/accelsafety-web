<!-- src/components/TooltipIcon.vue -->
<template>
    <div class="relative group cursor-pointer ml-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
      <div
        class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md"
      >
        {{ tooltipText }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tooltipText: {
        type: String,
        required: true
      }
    }
  };
  </script>
  