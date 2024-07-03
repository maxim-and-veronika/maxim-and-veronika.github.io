<template>
  <Transition appear>
    <div id="app">
      <!--    <flower-rain />-->
      <header class="header" :class="{ 'header__visible': true }">
        <navbar/>
      </header>
      <main class="main snap-container">
        <img class="main-picture snap-element" alt="Вы приглашены на свадьбу!" src="./assets/main.webp">
        <info-block class="snap-element" id="info"/>
        <div class="countdown" v-if="!isWeddingStarted">
          До начала торжества:
          <div>
            {{ days }} {{ pluralize(days, 'День', 'Дня', 'Дней') }}
            {{ hours }} {{ pluralize(hours, 'Час', 'Часа', 'Часов') }}
            {{ minutes }} {{ pluralize(minutes, 'Минута', 'Минуты', 'Минут') }}
            {{ seconds }} {{ pluralize(seconds, 'Секунда', 'Секунды', 'Секунд') }}
          </div>
        </div>
        <div class="countdown" v-else>
          <h1> Свадьба уже началась!</h1>
        </div>
        <r-s-v-p-form class="snap-element rsvp-form" id="rsvp"/>
        <div class="snap-element dress-code">
          <h2> Дресс-кода с цветовыми гаммами нет. Просто следуйте простым правилам:</h2>
          <ul>
            <li class="dress-code-list" v-for="rule in dressCode">
              {{ rule }}
            </li>
          </ul>
        </div>
        <div class="snap-element location">
          <h2>Блок что и где будет происходить + ссылки на карту</h2>
        </div>
        <div class="gifts">
          <h2> Не надо слов, не надо паники, и можно без цветов </h2>
          <img class="main-picture" alt="Мы копим на квартиру!" src="./assets/box1.jpg">
        </div>

        <div class="contacts" id="contacts">
          <a href='tel:+79110061647'>Жених: +79110061647</a>
          <a href='tel:+79119071174'>Невеста: +79119071174</a>
        </div>
      </main>
    </div>
  </Transition>
  <modal @closed="isSuccess = false" :show-modal="isSuccess"/>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import RSVPForm from "@/components/RSVPForm.vue";
import InfoBlock from "@/components/InfoBlock.vue";
/*import FlowerRain from "@/components/FlowerRain.vue";*/
import {onMounted, onUnmounted, ref, watch} from 'vue';
import Modal from "@/components/Modal.vue";
const isSuccess = ref(false)

const weddingDate = new Date('2024-09-22T15:00:00');
const dressCode = ['В центре внимания на свадьбе должны быть молодожёны', 'Одежда торжественная, без ярких или кислотных цветов', 'Избегаем спортивного стиля и вульгарных нарядов']
const isWeddingStarted = ref(false)

let timerId = null;
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

onMounted(() => {
  timerId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(timerId);
});

function pluralize(number, one, few, many) {
  let lastDigit = number % 10;
  let lastTwoDigits = number % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return one;
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return few;
  } else {
    return many;
  }
}

function updateCountdown() {
  const now = new Date();
  const timeLeft = weddingDate - now;

  days.value = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes.value = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (timeLeft <= 0) {
    isWeddingStarted.value = true;
    clearInterval(timerId);
  }
}

watch(window.location.hash, () => {
  if (window.location.hash === 'success') {
    isSuccess.value = true
  }
})

</script>

<style>
@font-face {
  font-family: Zhizn;
  src: url('./assets/fonts/ofont.ru_Zhizn.ttf');
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 45px;
}

/*.snap-container {
  scroll-snap-type: y proximity;
  overflow-y: scroll;
  max-height: calc(100vh - 45px);
}
.snap-element {
  scroll-snap-align: start;
}*/

body {
  font-family: Zhizn, serif;
  color: rgb(122, 84, 49);
  background-color: #fff;
  line-height: 22px;
  text-align: center;
}

h2 {
  margin-bottom: 12px;
}

.main {
  max-width: 100%;
  padding: 0 20%;;

  @media screen and (max-width: 1024px) {
    padding: 0 10%
  }

  @media screen and (max-width: 660px) {
    padding: 0;
  }
}

.countdown {
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  justify-content: center;
  background-color: #EED3BE;
  border-radius: 20px;
}

.dress-code {
  padding: 20px;
  margin-top: 20px;
  background-color: #F3EFD7;
  border-radius: 20px;
}

.dress-code-list {
  text-align: start;
}

.location {
  padding: 20px;
  margin-top: 20px;
  background-color: #fdfaf0;
  border-radius: 20px;
}

.gifts {
  padding: 20px;
  margin: 20px 0;
  background-color: #f6f9e9;
  border-radius: 20px;
}

.rsvp-form {
  padding: 20px;
  margin-top: 20px;
  border-radius: 20px;
}

.contacts {
  display: flex;
  flex-flow: column;
  padding: 20px;
  margin-top: 20px;
  border-radius: 20px;
}

.header {
  position: sticky;
  top: 0;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

.main-picture {
  width: 100%;
  height: auto;
  object-fit: cover;

  @media screen and (max-width: 660px) {
    height: 104vw;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
