<template>
  <div>
    <h2 class="fancy-text">{{ title }}</h2>
    <p class="basic-text">{{ info }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('Дорогой\n' +
    'Гость!');
const info = ref('Мы рады сообщить Вам, что состоится самое главное торжество в нашей жизни - день нашей свадьбы!\n' +
    'Приглашаем Вас разделить с нами радость этого незабываемого дня.');
</script>

<style scoped>
div {
  background-color: #f9cd47;
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;

}
h2 {
  margin-top: 0;
}
</style>
