<template>
  <GoogleMap
      api-key="AIzaSyDTz0FfZ-1LuqhaNxgtVsHUQ88FCXSjbsA"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const center = { lat: 59.946570514203316, lng: 30.36914163107477  }
const apiKey = 'AIzaSyDTz0FfZ-1LuqhaNxgtVsHUQ88FCXSjbsA'
</script>

<style scoped>
div {
  margin-top: 20px;
}
</style>
