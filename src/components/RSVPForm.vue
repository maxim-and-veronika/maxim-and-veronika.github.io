<template>
  <form action="https://api.web3forms.com/submit" method="POST">
    <input type="hidden" name="access_key" value="c7ea2334-fdd3-4e2e-b0d0-681da5779edb">
    <div class="basic-text rsvp-headline">
      Пожалуйста, пройдите небольшой опрос, чтобы Ваше пребывание на торжестве было комфортным:
    </div>
    <label>
      ФИО
      <input :placeholder="currentTypingWordValue" class="text-input" name="name" type="text" v-model="name" required>
    </label>
    <label>
      Вы приедете на наше торжество?
      <select name="response" v-model="response" required>
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
          <select name="meal" v-model="meal" required>
            <option disabled value="">Пожалуйста, выберите один вариант</option>
            <option>Стейк из говяжей вырезки с печеным картофелем под соусом из лесных грибов</option>
            <option>Филе палтуса с овощным соте и соусом из печеного перца</option>
          </select>
        </label>
        <label class="question-container">
          Вы пьете алкоголь?
          <input type="checkbox" name="alco-checkbox" v-model="drinkAlcohol">
        </label>
        <Transition>
          <div v-if="drinkAlcohol">
            <div class="low-alco">
              <p>Слабый алкоголь:</p>
              <div class="low-alco--selection">
                <label v-for="option in lowAlcoOptions" :key="option">
                  <input type="checkbox" :name="`low-alco-option-${option}` + option" :value="option" v-model="lowAlco">
                  {{ option }}
                </label>
              </div>
              <Transition>
                <div class="low-alco--selection" v-show="isDrinkingWine">
                  Укажите Ваши предпочтения
                  <label v-for="option in wineOptions" :key="option">
                    <input type="checkbox" :name="`wine-option-${option}`" :value="option" v-model="wineOption">
                    {{ option }}
                  </label>
                </div>
              </Transition>
            </div>
            <div>
              <p>Крепкий алкоголь:</p>
              <div class="low-alco--selection">
                <label v-for="option in alcoOptions" :key="option">
                  <input type="checkbox" :name="`alco-option-${option}`" :value="option" v-model="alco">
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
          <textarea name="preferencesMenu" v-model="preferencesMenu"/>
        </label>
        <label>
          Особые пожелания(опционально)
          <textarea name="preferences" v-model="preferences"/>
        </label>
        <div class="rsvp-attention">
          <div>У каждого стола будет безлимитный чай, кофе и б/а напитки: лимонады, вода с лимоном, соки и пр.</div>
          <div>Для заказа/дозаказа обращайтесь в официантам🍋</div>
        </div>
      </div>
    </Transition>
    <button type="submit">Отправить</button>
    <input type="hidden" name="redirect" value="https://maxim-and-veronika.github.io/wedding-invitation/#success">
  </form>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {useSearchInput} from "@/composables/input-typer.js";

const name = ref('');
const preferencesMenu = ref('');
const preferences = ref('');
const response = ref('');
const meal = ref('');
const lowAlco = ref([]);
const wineOption = ref([]);
const alco = ref([]);

const {
  startAutoTyping,
  stopAutoTyping,
  currentTypingWordValue,
} = useSearchInput()


const drinkAlcohol = ref(false);

const lowAlcoOptions = ['Белое вино', 'Красное вино', 'Шампанское', 'Джин-тоник', 'Ром-тоник'];
const wineOptions = ['Сухое', 'Полусухое', 'Полусладкое'];
const alcoOptions = ['Водка', 'Коньяк', 'Ром'];

const isParticipating = computed(() => {
  return !(response.value.includes('Нет') || response.value.includes('Только ЗАГС') || !response.value)
})

const isDrinkingWine = computed(() => {
  return (lowAlco.value.includes('Белое вино') || lowAlco.value.includes('Красное вино') || lowAlco.value.includes('Шампанское'))
})

onMounted(() => {
  startAutoTyping()
})
onUnmounted(() => {
  stopAutoTyping()
})
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
  border-radius: 10px;
  border: none;
  padding-left: 10px;
}

.text-input {
  width: 100%;
  word-wrap: break-word;
  border-radius: 10px;
  border: none;
  padding-left: 10px;
}

form textarea {
  width: 100%;
  word-wrap: break-word;
  border-radius: 12px;
  padding-left: 10px;
  padding-top: 10px;
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
