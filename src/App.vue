<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

import { ref } from 'vue'

const isLoading = ref(true)
const weather = ref({ city: 'NYC, USA' })

async function init() {
  try {
    isLoading.value = true
    const response = await fetch('/init')

    const data = await response.json()
    console.log(data)
    weather.value = data
  } catch (e) {
    console.error('Error: ', e)
  } finally {
    isLoading.value = false
  }
}

init()
</script>

<template>
  <section>
    <!--   :style="{
      backgroundImage:
        'url(https://oaidalleapiprodscus.blob.core.windows.net/private/org-3JJFLeQrgLzFGLfpxBymIgbP/user-isZWgxZCdTm7QSnqHJdb2nTO/img-EseXp18F63b2M7shKGLjQA3G.png?st=2023-11-14T12%3A57%3A18Z&se=2023-11-14T14%3A57%3A18Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-13T16%3A44%3A29Z&ske=2023-11-14T16%3A44%3A29Z&sks=b&skv=2021-08-06&sig=MoIDKXgfq/EHT5AhL2bNkQugLlLPZEzZA5A74Ss5uaE%3D)'
    }" -->
    <header>
      <p>WeatherScape</p>
    </header>
    <main v-if="!isLoading">
      <h4>{{ weather.city }}</h4>
      <p>{{ weather.region }}, {{ weather.country }}</p>
      <img class="icon" :src="weather.icon" alt="Weather icon" width="100" height="100" />
      <h1>{{ weather.temp }}°{{ weather.symbol }}</h1>
      <p class="description">{{ weather.description }}</p>
    </main>
    <!-- <RouterView /> -->
    <footer>
      <p>
        Made by
        <a href="https://twitter.com/KaKaUandME" target="_blank" title="Twitter">@kakauandme</a> |
        Copyright {{ new Date().getFullYear() }} ©
      </p>
    </footer>
  </section>
</template>

<style>
section {
  background-size: cover;
  background-position: center;
  height: 100vh;

  /* grid container settings */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';
}

section > * {
  padding: 1rem;
  /* background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.25rem);
  border: 1px solid rgba(255, 255, 255, 0.25); */
}

section > * > p {
  margin: 0;
}

section > header {
  grid-area: header;
}

section > main {
  grid-area: main;
  overflow: auto;

  border-radius: 0.5rem;
  margin: auto;
  text-align: center;

  /* From https://css.glass */
}

section > footer {
  grid-area: footer;

  text-align: right;
}

.description::first-letter {
  text-transform: uppercase;
}
</style>
