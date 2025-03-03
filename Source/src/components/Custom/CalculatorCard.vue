  <!-- src/components/Custom/CalculatorCard.vue -->
  <template>
    <div class="p-4">
      <div class="py-2 h-full">
        <div class="flex justify-center items-center p-4">
          <router-link :to="to">
            <div class="inline-block">
              <img 
                class="w-24 h-24 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" 
                :src="imgSrc" 
                :alt="altText"
              >
            </div>
          </router-link>
        </div>
        <div class="py-1">
          <p class="text-center">{{ text }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      to: {
        type: Object,
        required: true
      },
      imgSrc: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    },
    computed: {
      altText() {
        return this.text || 'image';
      }
    }
  };
  </script>