<template>
    <div class="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <!-- Title and subtitle -->
      <!-- <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800">{{ title }}</h2>
        <p class="text-gray-600 mt-1">{{ subtitle }}</p>
      </div> -->
  
      <!-- Heatmap container -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="p-2"></th>
              <th v-for="quarter in quarters" :key="quarter" class="p-2 text-center font-bold text-gray-700">
                {{ quarter }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="index">
              <td class="p-2 font-bold text-right text-gray-700 whitespace-nowrap">{{ category }}</td>
              <td 
                v-for="(quarter, qIndex) in quarters" 
                :key="`${index}-${qIndex}`"
                class="p-0 border border-white"
                :class="getCellColorClass(disruptionData[index][qIndex])"
              >
                <div 
                  class="h-12 w-24 md:h-8 md:w-16 flex items-center justify-center"
                  
                >
                  {{ disruptionData[index][qIndex] }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Legend -->
      <div class="mt-8">
        <p class="text-sm font-bold text-gray-700 mb-2">Severity Scale</p>
        <div class="flex">
          <div v-for="(color, index) in colorClasses" :key="index" class="flex flex-col items-center">
            <div :class="[color, 'h-6 w-8 border border-white']"></div>
            <span v-if="index === 0" class="text-xs text-gray-600 mt-1">Low</span>
            <span v-if="index === colorClasses.length - 1" class="text-xs text-gray-600 mt-1">High</span>
          </div>
        </div>
      </div>
  
      <!-- Key Findings -->
      <!-- <div class="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 class="font-bold text-gray-800 mb-2">Key Findings</h3>
        <ul class="list-disc pl-5 text-sm text-gray-700">
          <li>IT Systems disruptions show an increasing trend throughout the year</li>
          <li>Security breaches were highest in Q3 with 24 incidents</li>
          <li>Supply chain issues remained consistently high in Q2-Q4</li>
          <li>Regulatory disruptions had the lowest overall impact</li>
        </ul>
      </div> -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'BusinessDisruptionsHeatmap',
    props: {
      title: {
        type: String,
        default: 'Business Disruptions by Category'
      },
      subtitle: {
        type: String,
        default: 'Heatmap Analysis (2024)'
      },
      // You can provide custom data via props if needed
      customData: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        categories: [
          'IT Systems',
          'Supply Chain',
          'Workforce',
          'Natural Disasters',
          'Facility Issues',
          'Power Outages',
          'Regulatory',
          'Security Breach'
        ],
        // Default data - can be overridden with customData prop
        defaultData: [
          [12, 18, 23, 29], // IT Systems
          [9, 17, 22, 18],  // Supply Chain
          [7, 13, 10, 8],   // Workforce
          [3, 14, 10, 5],   // Natural Disasters
          [6, 9, 7, 10],    // Facility Issues
          [8, 4, 12, 9],    // Power Outages
          [2, 5, 7, 2],     // Regulatory
          [10, 14, 24, 19]  // Security Breach
        ],
        // Tailwind classes for the blue color gradient
        colorClasses: [
          'bg-blue-50', 
          'bg-blue-100', 
          'bg-blue-200', 
          'bg-blue-300', 
          'bg-blue-400', 
          'bg-blue-500', 
          'bg-blue-600', 
          'bg-blue-700'
        ]
      }
    },
    computed: {
      disruptionData() {
        return this.customData || this.defaultData
      },
      maxValue() {
        return Math.max(...this.disruptionData.flat())
      }
    },
    methods: {
      // Method to determine the color based on the value
      getCellColorClass(value) {
        const normalizedValue = value / this.maxValue
        const colorIndex = Math.min(
          Math.floor(normalizedValue * this.colorClasses.length),
          this.colorClasses.length - 1
        )
        
        const colorClass = this.colorClasses[colorIndex]
        // Add text color based on background darkness
        return {
          [colorClass]: true,
          'text-white': colorIndex >= 4, // White text for darker backgrounds
          'text-gray-800': colorIndex < 4 // Dark text for lighter backgrounds
        }
      }
    }
  }
  </script>