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
        <option>Нет</option>
      </select>
    </label>
    <template v-if="willParticipate">
      <label>
        Горячее
        <select v-model="meal" required>
          <option disabled value="">Пожалуйста, выберите один вариант</option>
          <option>Стейк из говяжей вырезки с печеным картофелем под соусом из лесных грибов</option>
          <option>Филе палтуса с овощным соте и соусом из печеного перца</option>
        </select>
      </label>
      <label>
        Вы пьете алкоголь?
        <input type="checkbox" v-model="drinkAlcohol">
      </label>
      <div v-if="drinkAlcohol">
        <p>Слабый алкоголь</p>
        <label v-for="option in lowAlcoOptions" :key="option">
          <input type="checkbox" :value="option" v-model="lowAlco" required>
          {{ option }}
        </label>
      </div>
      <div v-if="drinkAlcohol">
        <p>Крепкий алкоголь</p>
        <label v-for="option in alcoOptions" :key="option">
          <input type="checkbox" :value="option" v-model="alco" required>
          {{ option }}
        </label>
      </div>
      <label>
        Уточнения по меню:
        <br />
        аллергии/необходимость детского меню/другое
        <input type="text" v-model="preferences">
      </label>
      <label>
        Особые пожелания
        <input type="text" v-model="preferences">
      </label>
     <div class="rsvp-attention"> У каждого стола будет безлимитный чай, кофе и б/а напитки: лимонады, вода с лимоном, соки и пр.
       <br />
       Официанты в вашем полном распоряжении
     </div>
    </template>


    <button type="submit">Отправить</button>
  </form>
</template>

<script setup>
import {computed, ref} from 'vue';

const name = ref('');
const preferences = ref('');
const response = ref('');
const meal = ref('');
const lowAlco = ref([]);
const alco = ref([]);
const lowAlcoOptions = ['Белое вино', 'Красное вино', 'Шампанское', 'Джин-тоник', 'Ром-тоник'];
const alcoOptions = ['Водка', 'Коньяк', 'Ром'];
const drinkAlcohol = ref(false);

const willParticipate = computed( () => {
  return !(response.value.includes('Нет') || response.value.includes('Только ЗАГС'))
})
const submitForm = () => {
  // Here we'll handle the form submission
  // Make sure to only include alco and lowAlco if drinkAlcohol is true
  const formData = {
    name: name.value,
    preferences: preferences.value,
    response: response.value,
    meal: meal.value,
    // ... other form data ...
  };

  if (drinkAlcohol.value) {
    formData.alco = alco.value;
    formData.lowAlco = lowAlco.value;
  }

  // Now you can send formData
};
</script>

<style scoped>
.rsvp-headline {
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
}
.rsvp-attention {
  text-align: center;
  font-size: 18px;
}
form {
  text-align: left;
  background-color: #F9F1E8;
  border-radius: 20px;
  padding: 20px
}
form select {
  width: 100%;
  word-wrap: break-word;
}
form label {
  display: block;
  margin-bottom: 1em;
}
form button {
  display: block;
  margin: auto;
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0.5em 1em;
  border-radius: 8px;
}
</style>