<script setup>
// import TheWelcome from '../components/TheWelcome.vue'

import {ref} from 'vue';

const isLoading = ref(true);
const location = ref({city: "NYC, USA"});

async function init(url) {
  try {
    isLoading.value = true;
    const response = await fetch(url);

    const actualData = await response.json();

    location.value = actualData
    
  } catch(e) {
    console.error('Error: ', e)
  
  } finally {
    isLoading.value = false;
  }
};

init('/init')

</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div v-if="!isLoading">
      {{ location.city }}
    </div>
    <div v-else>
      Loading...
    </div>
  </main>
</template>
