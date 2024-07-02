<template>
  <form @submit.prevent="submitForm">
    <div class="basic-text rsvp-headline">
      Пожалуйста, пройдите небольшой опрос, чтобы Ваше пребывание на торжестве было комфортным:
    </div>
    <label>
      ФИО
      <input type="text" v-model="name" required>
    </label>
    <label>
      Вы приедете на наше торжество?
      <select v-model="response" required>
        <option disabled value="">Пожалуйста, выберите один вариант</option>
        <option>Да!</option>
        <option>Только ЗАГС</option>
        <option>Только ресторан</option>
        <option>Нет :(</option>
      </select>
    </label>
    <label>
      Мясо или рыба
      <select v-model="response" required>
        <option disabled value="">Пожалуйста, выберите один вариант</option>
        <option>Мясо</option>
        <option>Рыба</option>
      </select>
    </label>
    <label>
      Слабый алкоголь
      <select v-model="response" required>
        <option disabled value="">Пожалуйста, выберите один вариант</option>
        <option>Мясо</option>
        <option>Рыба</option>
      </select>
    </label>
    <label>
      Крепкий алкоголь (можно выбрать несколько)
      <select v-model="response" required>
        <option disabled value="">Пожалуйста, выберите один вариант</option>
        <option>Мясо</option>
        <option>Рыба</option>
      </select>
    </label>
    <label>
      Пожелания
      <input type="text" v-model="text" required>
    </label>
    <!-- если не пью -- добавить информацию про безлимитный чай, кофе и б/а напитки-->

    <button type="submit">Отправить</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const text = ref('');
const response = ref('');

const submitForm = () => {
  // Here we'll handle the form submission
};
</script>

<style scoped>
.rsvp-headline {
  margin-bottom: 20px;
}
form {
  background-color: #F9F1E8;
  border-radius: 20px;
  padding: 20px
}
form label {
  display: block;
  margin-bottom: 1em;
}
form button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0.5em 1em;
  border-radius: 8px;
}
</style>