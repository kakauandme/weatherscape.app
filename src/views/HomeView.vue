<script setup>
// import TheWelcome from '../components/TheWelcome.vue'

import { ref } from 'vue'

const isLoading = ref(true)
const location = ref('')

async function init(url) {
  try {
    isLoading.value = true
    const response = await fetch(url)
    const actualData = await response.data
    location.value = actualData
  } catch (e) {
    console.error('Das ist der Catch Error: ', e)
    location.value = 'Error'
  } finally {
    isLoading.value = false
  }
}

init('/init')
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div v-if="!isLoading">
      {{ location }}
    </div>
    <div v-else>Loading...</div>
  </main>
</template>
