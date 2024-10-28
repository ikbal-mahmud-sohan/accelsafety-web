<script setup lang="ts">
import Lucide from "@/components/Base/Lucide";
</script>

<template>
  <div class="flex flex-wrap bg-theme-1 bg-opacity-20 px-4 py-4 rounded-md shadow-md">
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'hse-vehicle-safety' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="w-6 h-6"><path class="fa-secondary" opacity=".4" d="M96 432a80 80 0 1 0 160 0A80 80 0 1 0 96 432zm288 0a80 80 0 1 0 160 0 80 80 0 1 0 -160 0z"/><path class="fa-primary" d="M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l17.1 0c7.8-54.3 54.4-96 110.9-96s103.1 41.7 110.9 96l66.3 0c7.8-54.3 54.4-96 110.9-96s103.1 41.7 110.9 96l1.1 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96z"/></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6"><path d="M416 1.4l-192 16 0 48 192 0 0-64zm-176 112c0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16l-156.8 0c-1 5.2-1.6 10.5-1.6 16zM72 225.4l-40 0 0 80 40 0 152 0 0 89.4L393.4 225.4l-153.4 0-168 0zm356.7 9.9L246.6 417.4l169.4 0 0-46.3 53.6 90.6 20.3 34.4 68.9-40.7L538.4 421l-104-176-5.7-9.7zM224 449.4l0 64 192 0 0-64-192 0z"/></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6"><path d="M352 32L224 32l0 34.3L224 176 159.6 85.8C84.1 121.8 32 198.8 32 288l0 64 512 0 0-66.4c-.9-88.1-52.8-164.1-127.5-199.8L352 176l0-109.7L352 32zM0 408s80 72 288 72s288-72 288-72l0-24L0 384l0 24z"/></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6"><path d="M256 80C152 80 65.8 156.3 50.4 256l77.6 0 0 224L0 480l0-96 0-96C0 146.6 114.6 32 256 32s256 114.6 256 256l0 96 0 96-128 0 0-224 77.6 0C446.2 156.3 360 80 256 80z"/></svg>
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Sight and Hearing Protection</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'hse-work-height' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 h-6"><path d="M576 176c0 97.2-128.9 176-288 176c-14.9 0-29.6-.7-43.9-2c7.7 15.3 11.9 32.4 11.9 50.2C256 461.9 205.9 512 144.2 512L56 512c-13.3 0-24-10.7-24-24s10.7-24 24-24l88.2 0c35.2 0 63.8-28.6 63.8-63.8c0-24.9-14.5-47.5-37.1-57.9l-44.3-20.5C50.2 290.1 0 236.6 0 176C0 78.8 128.9 0 288 0S576 78.8 576 176zM288 304c132.5 0 240-57.3 240-128s-107.5-128-240-128S48 105.3 48 176s107.5 128 240 128z"/></svg>
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Working at Height</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'hse-safe-crane-operation' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <svg fill="#000000" class="w-6 h-6"  version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.194 471.194" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 471.194 471.194">
                <path d="m435.332,293.684v-74.847c0-6.904-5.597-12.5-12.5-12.5h-16.197v-55.5c0-6.904-5.596-12.5-12.5-12.5s-12.5,5.596-12.5,12.5v55.5h-51.185v-55.5c0-6.904-5.597-12.5-12.5-12.5h-73.884c-5.403,0-10.195,3.472-11.878,8.606l-3.278,9.999-178.158-81.425c-3.016-1.378-6.456-1.502-9.562-0.344-3.107,1.158-5.626,3.502-7.004,6.518l-19.3,42.24c-2.578,5.642-0.628,12.322 4.581,15.691l13.533,8.753v92.147c-19.028,5.446-33,22.986-33,43.74 0,25.089 20.411,45.5 45.5,45.5s45.5-20.412 45.5-45.5c0-20.754-13.972-38.294-33-43.74v-75.977l146.683,94.872v34.268c-20.836,7.139-35.862,26.908-35.862,50.133 0,29.219 23.771,52.99 52.99,52.99h196.392c29.219,0 52.99-23.771 52.99-52.99 0.001-23.226-15.025-42.995-35.861-50.134zm-369.332-9.422c0,11.304-9.196,20.5-20.5,20.5s-20.5-9.196-20.5-20.5 9.196-20.5 20.5-20.5 20.5,9.196 20.5,20.5zm251.949-52.925h92.382v59.49h-180.648v-45.49h41.917c6.903,0 12.5-5.596 12.5-12.5v-69.5h21.349v55.5c0,6.904 5.597,12.5 12.5,12.5zm-58.849-68v57h-24.665l18.687-57h5.978zm-207.371-59.886l169.343,77.397-15.767,48.095c-0.101,0.307-0.188,0.618-0.265,0.931l-162.926-105.378 9.615-21.045zm366.475,268.357h-196.392c-15.434,0-27.99-12.556-27.99-27.99 0-15.434 12.556-27.99 27.99-27.99h196.392c15.434,0 27.99,12.556 27.99,27.99 0,15.434-12.556,27.99-27.99,27.99z"/>
              </svg>
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Safe Crane Operation</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'hse-mobile-crane-safety-procedure' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <svg fill="#000000" class="w-6 h-6" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.453 451.453" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 451.453 451.453">
                <path d="m424.711,0h-94.453c-6.903,0-12.5,5.596-12.5,12.5v27.5h-291.016c-6.903,0-12.5,5.596-12.5,12.5v54.453c0,6.904 5.597,12.5 12.5,12.5h33.398v108.949c0,6.904 5.597,12.5 12.5,12.5 5.277,0 9.571,4.293 9.571,9.571s-4.294,9.571-9.571,9.571c-3.857,0-7.321-2.296-8.824-5.849-2.689-6.357-10.022-9.333-16.382-6.643-6.358,2.689-9.333,10.024-6.644,16.382 5.425,12.824 17.926,21.111 31.85,21.111 19.063,0 34.571-15.509 34.571-34.571 0-14.656-9.169-27.212-22.071-32.233v-98.786h252.617v319.5c0,6.904 5.597,12.5 12.5,12.5h54.453c6.903,0 12.5-5.596 12.5-12.5v-319.5h7.5c6.903,0 12.5-5.596 12.5-12.5v-94.455c0.001-6.904-5.596-12.5-12.499-12.5zm-12.5,94.453h-11.981v-69.453h11.981v69.453zm-69.453-69.453h32.472v69.453h-32.472v-69.453zm-25,69.453h-11.491l-33.273-29.453h44.764v29.453zm-172.237,0h-57.071l28.535-25.259 28.536,25.259zm4.444-29.453h57.07l-28.535,25.259-28.535-25.259zm90.05,4.194l28.535,25.259h-57.07l28.535-25.259zm-200.773-4.194h44.764l-33.273,29.453h-11.491v-29.453zm323.516,240.933l25.259,28.535-25.259,28.535v-57.07zm4.193-32.98l25.26-28.535v57.071l-25.26-28.536zm-4.193-32.98v-57.07l25.259,28.535-25.259,28.535zm0,186.48v-25.733l29.453-33.273v59.006h-29.453zm29.453-247.994l-29.453-33.273v-25.733h29.453v59.006z"/>
              </svg>
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Mobile Crane Safety Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'hse-confined-space' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM281.4 115.4c5.8-7.5 14.5-14.7 23.6-11.8c64.4 20.7 111 81.1 111 152.4s-46.6 131.7-111 152.4c-9 2.9-17.8-4.3-23.6-11.8c-5.8-7.6-15.1-12.6-25.4-12.6s-19.6 4.9-25.4 12.6c-5.8 7.5-14.5 14.7-23.6 11.8C142.6 387.7 96 327.3 96 256s46.6-131.7 111-152.4c9-2.9 17.8 4.3 23.6 11.8c5.8 7.6 15.1 12.6 25.4 12.6s19.6-4.9 25.4-12.6zM192 176a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm0 64a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm0 64a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm80-112a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm-32 64a16 16 0 1 0 32 0 16 16 0 1 0 -32 0zm32 64a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48-144a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm0 64a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm0 64a16 16 0 1 0 0 32 16 16 0 1 0 0-32z"/></svg>
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Entry into Confined Space</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'hse-pressure-vessel' }">
            <div class="px-4 py-4 bg-white shadow-md rounded-md inline-block">
              <svg class="w-6 h-6" viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
                <g transform="matrix(0.42 0 0 0.42 12 12)" >
                <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-25, -24.98)" d="M 12.90625 7.96875 C 12.875 7.976563 12.84375 7.988281 12.8125 8 L 12 8 C 11.96875 8 11.9375 8 11.90625 8 C 11.875 8 11.84375 8 11.8125 8 C 11.261719 8.050781 10.855469 8.542969 10.90625 9.09375 C 10.957031 9.644531 11.449219 10.050781 12 10 L 12 11 L 6 11 C 5.042969 11 4.246094 11.566406 3.65625 12.3125 C 3.066406 13.058594 2.605469 14.03125 2.21875 15.1875 C 1.445313 17.503906 1 20.597656 1 24 C 1 27.402344 1.445313 30.496094 2.21875 32.8125 C 2.605469 33.96875 3.066406 34.941406 3.65625 35.6875 C 4.246094 36.433594 5.042969 37 6 37 L 8 37 L 8 41 C 8 41.550781 8.449219 42 9 42 L 13 42 C 13.550781 42 14 41.550781 14 41 L 14 37 L 36 37 L 36 41 C 36 41.550781 36.449219 42 37 42 L 41 42 C 41.550781 42 42 41.550781 42 41 L 42 37 L 44 37 C 44.957031 37 45.753906 36.433594 46.34375 35.6875 C 46.933594 34.941406 47.394531 33.96875 47.78125 32.8125 C 48.554688 30.496094 49 27.402344 49 24 C 49 20.597656 48.554688 17.503906 47.78125 15.1875 C 47.394531 14.03125 46.933594 13.058594 46.34375 12.3125 C 45.753906 11.566406 44.957031 11 44 11 L 14 11 L 14 10 C 14.359375 10.003906 14.695313 9.816406 14.878906 9.503906 C 15.058594 9.191406 15.058594 8.808594 14.878906 8.496094 C 14.695313 8.183594 14.359375 7.996094 14 8 L 13.21875 8 C 13.117188 7.972656 13.011719 7.960938 12.90625 7.96875 Z M 6 13 L 44 13 C 44.148438 13 44.414063 13.09375 44.78125 13.5625 C 45.148438 14.03125 45.539063 14.832031 45.875 15.84375 C 46.550781 17.871094 47 20.777344 47 24 C 47 27.222656 46.550781 30.128906 45.875 32.15625 C 45.539063 33.167969 45.148438 33.96875 44.78125 34.4375 C 44.414063 34.90625 44.148438 35 44 35 L 42 35 L 42 33 C 42 32.449219 41.550781 32 41 32 L 37 32 C 36.96875 32 36.9375 32 36.90625 32 C 36.875 32 36.84375 32 36.8125 32 C 36.335938 32.089844 35.992188 32.511719 36 33 L 36 35 L 14 35 L 14 33 C 14 32.449219 13.550781 32 13 32 L 9 32 C 8.96875 32 8.9375 32 8.90625 32 C 8.875 32 8.84375 32 8.8125 32 C 8.335938 32.089844 7.992188 32.511719 8 33 L 8 35 L 6 35 C 5.851563 35 5.585938 34.90625 5.21875 34.4375 C 4.851563 33.96875 4.460938 33.167969 4.125 32.15625 C 3.449219 30.128906 3 27.222656 3 24 C 3 20.777344 3.449219 17.871094 4.125 15.84375 C 4.460938 14.832031 4.851563 14.03125 5.21875 13.5625 C 5.585938 13.09375 5.851563 13 6 13 Z M 25 15 C 22.328125 15 19.929688 16.175781 18.28125 18.03125 C 18.191406 18.007813 18.09375 17.996094 18 18 L 15 18 C 14.96875 18 14.9375 18 14.90625 18 C 14.875 18 14.84375 18 14.8125 18 C 14.261719 18.050781 13.855469 18.542969 13.90625 19.09375 C 13.957031 19.644531 14.449219 20.050781 15 20 L 16.96875 20 C 16.363281 21.207031 16 22.558594 16 24 C 16 25.441406 16.363281 26.792969 16.96875 28 L 15 28 C 14.96875 28 14.9375 28 14.90625 28 C 14.875 28 14.84375 28 14.8125 28 C 14.261719 28.050781 13.855469 28.542969 13.90625 29.09375 C 13.957031 29.644531 14.449219 30.050781 15 30 L 18 30 C 18.09375 30.003906 18.191406 29.992188 18.28125 29.96875 C 19.929688 31.824219 22.328125 33 25 33 C 29.957031 33 34 28.957031 34 24 C 34 19.042969 29.957031 15 25 15 Z M 25 17 C 28.878906 17 32 20.121094 32 24 C 32 27.878906 28.878906 31 25 31 C 21.121094 31 18 27.878906 18 24 C 18 20.121094 21.121094 17 25 17 Z M 25 18 C 24.449219 18 24 18.449219 24 19 C 24 19.550781 24.449219 20 25 20 C 25.550781 20 26 19.550781 26 19 C 26 18.449219 25.550781 18 25 18 Z M 21.46875 19.46875 C 21.210938 19.46875 20.945313 19.554688 20.75 19.75 C 20.359375 20.140625 20.359375 20.769531 20.75 21.15625 C 21.140625 21.546875 21.765625 21.546875 22.15625 21.15625 C 22.546875 20.765625 22.546875 20.140625 22.15625 19.75 C 21.960938 19.554688 21.726563 19.46875 21.46875 19.46875 Z M 28.53125 19.46875 C 28.273438 19.46875 28.039063 19.554688 27.84375 19.75 C 27.453125 20.140625 27.453125 20.765625 27.84375 21.15625 C 28.234375 21.546875 28.859375 21.546875 29.25 21.15625 C 29.640625 20.765625 29.640625 20.140625 29.25 19.75 C 29.054688 19.554688 28.789063 19.46875 28.53125 19.46875 Z M 20 23 C 19.449219 23 19 23.449219 19 24 C 19 24.550781 19.449219 25 20 25 C 20.550781 25 21 24.550781 21 24 C 21 23.449219 20.550781 23 20 23 Z M 30 23 C 29.449219 23 29 23.449219 29 24 C 29 24.550781 29.449219 25 30 25 C 30.550781 25 31 24.550781 31 24 C 31 23.449219 30.550781 23 30 23 Z M 21.46875 26.53125 C 21.210938 26.53125 20.945313 26.617188 20.75 26.8125 C 20.359375 27.203125 20.359375 27.859375 20.75 28.25 C 21.140625 28.640625 21.796875 28.640625 22.1875 28.25 C 22.578125 27.859375 22.578125 27.203125 22.1875 26.8125 C 21.992188 26.617188 21.726563 26.53125 21.46875 26.53125 Z M 28.53125 26.53125 C 28.273438 26.53125 28.007813 26.617188 27.8125 26.8125 C 27.425781 27.203125 27.425781 27.863281 27.8125 28.25 C 28.203125 28.640625 28.859375 28.640625 29.25 28.25 C 29.640625 27.859375 29.640625 27.203125 29.25 26.8125 C 29.054688 26.617188 28.789063 26.53125 28.53125 26.53125 Z M 25 28 C 24.449219 28 24 28.449219 24 29 C 24 29.550781 24.449219 30 25 30 C 25.550781 30 26 29.550781 26 29 C 26 28.449219 25.550781 28 25 28 Z M 10 34 L 12 34 L 12 35.53125 C 11.867188 35.808594 11.867188 36.128906 12 36.40625 L 12 40 L 10 40 L 10 36.1875 C 10.027344 36.054688 10.027344 35.914063 10 35.78125 Z M 38 34 L 40 34 L 40 35.8125 C 40 35.84375 40 35.875 40 35.90625 L 40 36 C 39.992188 36.074219 39.992188 36.144531 40 36.21875 L 40 40 L 38 40 L 38 36.1875 C 38.027344 36.054688 38.027344 35.914063 38 35.78125 Z" stroke-linecap="round" />
                </g>
                </svg>
            </div>
        </router-link>
      </div>
      <div class="py-1">
        <p class="text-center">Pressure Vessel Management Procedure</p>
      </div>
    </div>
    <div class="w-full lg:w-1/6 md:w-1/3">
      <div class="flex justify-center items-center p-4">
        <router-link :to="{ name: 'hse-compressed-gas-cylinder' }">
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
        <router-link :to="{ name: 'hse-chemical-handling' }">
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
        <router-link :to="{ name: 'hse-hot-work-procedure' }">
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
        <router-link :to="{ name: 'hse-management-fire-safety-system' }">
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
        <router-link :to="{ name: 'hse-material-handling-procedure' }">
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
        <router-link :to="{ name: 'hse-house-keeping' }">
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
