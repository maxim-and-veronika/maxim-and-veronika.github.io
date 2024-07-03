<template>
  <form @submit.prevent="submitForm">

    <div class="basic-text rsvp-headline">
      Пожалуйста, пройдите небольшой опрос, чтобы Ваше пребывание на торжестве было комфортным:
    </div>
    <label>
      ФИО
      <input class="text-input " type="text" v-model="name" required>
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
    <Transition>
      <div v-if="isParticipating">
        <label>
          Выберите горячее блюдо:
          <select v-model="meal" required>
            <option disabled value="">Пожалуйста, выберите один вариант</option>
            <option>Стейк из говяжей вырезки с печеным картофелем под соусом из лесных грибов</option>
            <option>Филе палтуса с овощным соте и соусом из печеного перца</option>
          </select>
        </label>
        <label class="question-container">
          Вы пьете алкоголь?
          <input type="checkbox" v-model="drinkAlcohol">
        </label>
        <Transition>
          <div v-if="drinkAlcohol">
            <div class="low-alco" >
              <p>Слабый алкоголь:</p>
              <div class="low-alco--selection">
                <label v-for="option in lowAlcoOptions" :key="option">
                  <input type="checkbox" :value="option" v-model="lowAlco" required>
                  {{ option }}
                </label>
              </div>
              <Transition>
                <div class="low-alco--selection" v-show="isDrinkingWine">
                  Укажите Ваши предпочтения
                  <label v-for="option in wineOptions" :key="option">
                    <input type="checkbox" :value="option" v-model="wineOption" required>
                    {{ option }}
                  </label>
                </div>
              </Transition>
            </div>
            <div>
              <p>Крепкий алкоголь:</p>
              <div class="low-alco--selection">
                <label v-for="option in alcoOptions" :key="option">
                  <input type="checkbox" :value="option" v-model="alco" required>
                  {{ option }}
                </label>
              </div>
            </div>
          </div>
        </Transition>

        <label>
          Уточнения по меню(опционально):
          <br/>
          аллергии/необходимость детского меню/свой вариант
          <br/>
          <textarea v-model="preferencesMenu"/>
        </label>
        <label>
          Особые пожелания(опционально)
          <textarea v-model="preferences"/>
        </label>
        <div class="rsvp-attention">
          <div>У каждого стола будет безлимитный чай, кофе и б/а напитки: лимонады, вода с лимоном, соки и пр.</div>
          <div>Для заказа/дозаказа обращайтесь в официантам🍋</div>
        </div>
      </div>
    </Transition>
    <button type="submit">Отправить</button>
  </form>
</template>

<script setup>
import {computed, ref} from 'vue';

const name = ref('');
const preferencesMenu = ref('');
const preferences = ref('');
const response = ref('');
const meal = ref('');
const lowAlco = ref([]);
const wineOption = ref([]);
const alco = ref([]);

const drinkAlcohol = ref(false);

const lowAlcoOptions = ['Белое вино', 'Красное вино', 'Шампанское', 'Джин-тоник', 'Ром-тоник'];
const wineOptions = ['Сухое', 'Полусухое', 'Полусладкое'];
const alcoOptions = ['Водка', 'Коньяк', 'Ром'];

const isParticipating = computed(() => {
  return !(response.value.includes('Нет') || response.value.includes('Только ЗАГС') || !response.value)
})

const isDrinkingWine = computed(() => {
  return (lowAlco.value.includes('Белое вино') || lowAlco.value.includes('Красное вино'))
})
const submitForm = () => {
  const formData = {
    name: name.value,
    preferences: preferences.value,
    preferencesMenu: preferencesMenu.value,
    response: response.value,
    meal: meal.value,
  };

  if (drinkAlcohol.value) {
    formData.alco = alco.value;
    formData.lowAlco = lowAlco.value;
    formData.wineOption = wineOption.value;
  }
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.low-alco {
  display: flex;
  flex-flow: column;
}

.low-alco--selection {
  label:last-child {
    margin-bottom: 0;
  }
  border-radius: 20px;
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
}

.rsvp-headline {
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
}

.rsvp-attention {
  display: flex;
  flex-flow: column;
  gap: 20px;
  text-align: center;
  font-size: 18px;
}

form {
  text-align: left;
  background-color: #F9F1E8;
  border-radius: 20px;
  padding: 20px;

  @media screen and (max-width: 660px) {
    text-align: center;
  }
}

form select {
  width: 100%;
  word-wrap: break-word;
}

.text-input {
  width: 100%;
  word-wrap: break-word;
}

form textarea {
  width: 100%;
  word-wrap: break-word;
  border-radius: 20px;
}

form label {
  display: block;
  margin-bottom: 1em;
}

form button {
  display: block;
  margin: 20px auto auto;
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0.5em 1em;
  border-radius: 8px;
}
</style>
